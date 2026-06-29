<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/products_repository.php';

$pdo = Database::connection();
$sessionKey = session_key();
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $stmt = $pdo->prepare('
        SELECT product_id
        FROM favorite_items
        WHERE session_key = :sessionKey
        ORDER BY created_at DESC
    ');
    $stmt->execute(['sessionKey' => $sessionKey]);

    $items = [];
    foreach ($stmt->fetchAll() as $row) {
        $product = fetch_product_card($pdo, (int)$row['product_id']);
        if ($product !== null) {
            $items[] = $product;
        }
    }

    json_response([
        'ok' => true,
        'data' => $items,
    ]);
}

if ($method === 'POST') {
    $body = read_json_body();
    $action = trim((string)($body['action'] ?? 'add'));
    $productId = required_int($body, 'productId');

    if ($action === 'delete' || $action === 'remove') {
        $stmt = $pdo->prepare('
            DELETE FROM favorite_items
            WHERE session_key = :sessionKey AND product_id = :productId
        ');
        $stmt->execute([
            'sessionKey' => $sessionKey,
            'productId' => $productId,
        ]);

        json_response([
            'ok' => true,
            'data' => ['productId' => $productId],
        ]);
    }

    $product = fetch_product_card($pdo, $productId);

    if ($product === null) {
        api_error(404, 'Товар не найден');
    }

    $stmt = $pdo->prepare('
        INSERT INTO favorite_items (session_key, product_id)
        VALUES (:sessionKey, :productId)
        ON CONFLICT (session_key, product_id) DO NOTHING
    ');
    $stmt->execute([
        'sessionKey' => $sessionKey,
        'productId' => $productId,
    ]);

    json_response([
        'ok' => true,
        'data' => $product,
    ], 201);
}

if ($method === 'DELETE') {
    $body = read_json_body();
    $productId = query_int('productId') ?? required_int($body, 'productId');

    $stmt = $pdo->prepare('
        DELETE FROM favorite_items
        WHERE session_key = :sessionKey AND product_id = :productId
    ');
    $stmt->execute([
        'sessionKey' => $sessionKey,
        'productId' => $productId,
    ]);

    json_response([
        'ok' => true,
        'data' => ['productId' => $productId],
    ]);
}

require_method('GET', 'POST', 'DELETE');
