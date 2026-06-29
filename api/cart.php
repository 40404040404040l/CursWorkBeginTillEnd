<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require_once __DIR__ . '/lib/products_repository.php';

$pdo = Database::connection();
$sessionKey = session_key();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

function fetch_cart(PDO $pdo, string $sessionKey): array
{
    $stmt = $pdo->prepare('
        SELECT
            ci.id,
            ci.product_id AS "productId",
            ci.variant_id AS "variantId",
            ci.quantity,
            ci.selected_parameters AS "selectedParameters",
            ci.fixed_price AS "fixedPrice",
            p.name AS "productName",
            p.slug AS "productSlug",
            p.main_image AS "mainImage",
            v.stock
        FROM cart_items ci
        JOIN products p ON p.id = ci.product_id
        JOIN product_variants v ON v.id = ci.variant_id
        WHERE ci.session_key = :sessionKey
        ORDER BY ci.created_at ASC, ci.id ASC
    ');
    $stmt->execute(['sessionKey' => $sessionKey]);

    $items = [];
    $total = 0;

    foreach ($stmt->fetchAll() as $row) {
        $quantity = (int)$row['quantity'];
        $price = (int)$row['fixedPrice'];
        $lineTotal = $price * $quantity;
        $selectedParameters = decode_cart_json($row['selectedParameters']);
        $image = cart_item_image(
            $pdo,
            (int)$row['productId'],
            (string)$row['mainImage'],
            $selectedParameters
        );
        $total += $lineTotal;

        $items[] = [
            'id' => (int)$row['id'],
            'productId' => (int)$row['productId'],
            'variantId' => (int)$row['variantId'],
            'productName' => $row['productName'],
            'productSlug' => $row['productSlug'],
            'mainImage' => $image['imagePath'],
            'mainImageSources' => $image['sources'],
            'selectedParameters' => $selectedParameters,
            'fixedPrice' => $price,
            'quantity' => $quantity,
            'stock' => (int)$row['stock'],
            'lineTotal' => $lineTotal,
        ];
    }

    return [
        'items' => $items,
        'total' => $total,
        'count' => array_sum(array_column($items, 'quantity')),
    ];
}

function cart_item_image(PDO $pdo, int $productId, string $fallbackImage, array $parameters): array
{
    $color = trim((string)($parameters['color'] ?? ''));

    if ($color !== '') {
        foreach (fetch_product_images($pdo, $productId) as $image) {
            if (cart_image_matches_color($image, $color)) {
                return $image;
            }
        }
    }

    return [
        'imagePath' => $fallbackImage,
        'sources' => build_image_sources($fallbackImage),
    ];
}

function cart_image_matches_color(array $image, string $color): bool
{
    $needle = normalize_cart_image_text($color);
    $haystack = normalize_cart_image_text(($image['alt'] ?? '') . ' ' . ($image['imagePath'] ?? ''));

    if ($needle !== '' && str_contains($haystack, $needle)) {
        return true;
    }

    foreach (preg_split('/\s+/', $color) ?: [] as $word) {
        $word = normalize_cart_image_text($word);

        if (strlen($word) > 2 && str_contains($haystack, $word)) {
            return true;
        }
    }

    return false;
}

function normalize_cart_image_text(string $value): string
{
    $value = str_replace('ё', 'е', $value);
    $value = function_exists('mb_strtolower') ? mb_strtolower($value) : strtolower($value);

    return preg_replace('/[^a-z0-9а-я]+/u', '', $value) ?? '';
}

function decode_cart_json(?string $json): array
{
    if ($json === null || $json === '') {
        return [];
    }

    $data = json_decode($json, true);

    return is_array($data) ? $data : [];
}

if ($method === 'GET') {
    json_response([
        'ok' => true,
        'data' => fetch_cart($pdo, $sessionKey),
    ]);
}

if ($method === 'POST') {
    $body = read_json_body();
    $action = trim((string)($body['action'] ?? 'add'));

    if ($action === 'update') {
        $itemId = required_int($body, 'itemId');
        $quantity = required_int($body, 'quantity');

        $stmt = $pdo->prepare('
            UPDATE cart_items
            SET quantity = :quantity, updated_at = NOW()
            WHERE id = :itemId AND session_key = :sessionKey
        ');
        $stmt->execute([
            'quantity' => $quantity,
            'itemId' => $itemId,
            'sessionKey' => $sessionKey,
        ]);

        json_response([
            'ok' => true,
            'data' => fetch_cart($pdo, $sessionKey),
        ]);
    }

    if ($action === 'delete' || $action === 'remove') {
        $itemId = required_int($body, 'itemId');

        $stmt = $pdo->prepare('
            DELETE FROM cart_items
            WHERE id = :itemId AND session_key = :sessionKey
        ');
        $stmt->execute([
            'itemId' => $itemId,
            'sessionKey' => $sessionKey,
        ]);

        json_response([
            'ok' => true,
            'data' => fetch_cart($pdo, $sessionKey),
        ]);
    }

    $productId = required_int($body, 'productId');
    $variantId = required_int($body, 'variantId');
    $quantity = required_int($body, 'quantity');

    $stmt = $pdo->prepare('
        SELECT product_id, price, stock, parameters
        FROM product_variants
        WHERE id = :variantId AND is_active = TRUE
        LIMIT 1
    ');
    $stmt->execute(['variantId' => $variantId]);
    $variant = $stmt->fetch();

    if (!$variant || (int)$variant['product_id'] !== $productId) {
        api_error(422, 'Вариант товара не найден или не принадлежит товару');
    }

    if ((int)$variant['stock'] < $quantity) {
        api_error(409, 'Недостаточно товара в наличии');
    }

    $stmt = $pdo->prepare('
        INSERT INTO cart_items (session_key, product_id, variant_id, quantity, selected_parameters, fixed_price)
        VALUES (:sessionKey, :productId, :variantId, :quantity, :selectedParameters, :fixedPrice)
        ON CONFLICT (session_key, variant_id)
        DO UPDATE SET
            quantity = cart_items.quantity + EXCLUDED.quantity,
            selected_parameters = EXCLUDED.selected_parameters,
            fixed_price = EXCLUDED.fixed_price,
            updated_at = NOW()
    ');
    $stmt->execute([
        'sessionKey' => $sessionKey,
        'productId' => $productId,
        'variantId' => $variantId,
        'quantity' => $quantity,
        'selectedParameters' => $variant['parameters'],
        'fixedPrice' => (int)$variant['price'],
    ]);

    json_response([
        'ok' => true,
        'data' => fetch_cart($pdo, $sessionKey),
    ], 201);
}

if ($method === 'PATCH') {
    $body = read_json_body();
    $itemId = required_int($body, 'itemId');
    $quantity = required_int($body, 'quantity');

    $stmt = $pdo->prepare('
        UPDATE cart_items
        SET quantity = :quantity, updated_at = NOW()
        WHERE id = :itemId AND session_key = :sessionKey
    ');
    $stmt->execute([
        'quantity' => $quantity,
        'itemId' => $itemId,
        'sessionKey' => $sessionKey,
    ]);

    json_response([
        'ok' => true,
        'data' => fetch_cart($pdo, $sessionKey),
    ]);
}

if ($method === 'DELETE') {
    $body = read_json_body();
    $itemId = query_int('itemId') ?? required_int($body, 'itemId');

    $stmt = $pdo->prepare('
        DELETE FROM cart_items
        WHERE id = :itemId AND session_key = :sessionKey
    ');
    $stmt->execute([
        'itemId' => $itemId,
        'sessionKey' => $sessionKey,
    ]);

    json_response([
        'ok' => true,
        'data' => fetch_cart($pdo, $sessionKey),
    ]);
}

require_method('GET', 'POST', 'PATCH', 'DELETE');
