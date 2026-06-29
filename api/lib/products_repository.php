<?php

declare(strict_types=1);

function product_card_select(): string
{
    return "
        SELECT
            p.id,
            p.name,
            p.slug,
            p.description,
            p.main_image AS \"mainImage\",
            p.is_popular AS \"isPopular\",
            p.is_new AS \"isNew\",
            p.is_hit AS \"isHit\",
            c.id AS \"categoryId\",
            c.name AS \"categoryName\",
            c.slug AS \"categorySlug\",
            MIN(v.price) FILTER (WHERE v.is_active = TRUE AND v.stock > 0) AS \"minPrice\"
        FROM products p
        JOIN categories c ON c.id = p.category_id
        LEFT JOIN product_variants v ON v.product_id = p.id
        WHERE p.is_active = TRUE
    ";
}

function fetch_product_cards(PDO $pdo, ?string $categorySlug = null, bool $popularOnly = false): array
{
    $sql = product_card_select();
    $params = [];

    if ($categorySlug !== null && $categorySlug !== '') {
        $sql .= ' AND c.slug = :category';
        $params['category'] = $categorySlug;
    }

    if ($popularOnly) {
        $sql .= ' AND p.is_popular = TRUE';
    }

    $sql .= '
        GROUP BY p.id, c.id
        ORDER BY p.sort_order ASC, p.id ASC
    ';

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);

    return array_map('normalize_product_card', $stmt->fetchAll());
}

function fetch_product_card(PDO $pdo, int $productId): ?array
{
    $sql = product_card_select() . '
        AND p.id = :id
        GROUP BY p.id, c.id
        LIMIT 1
    ';
    $stmt = $pdo->prepare($sql);
    $stmt->execute(['id' => $productId]);
    $row = $stmt->fetch();

    return $row ? normalize_product_card($row) : null;
}

function normalize_product_card(array $row): array
{
    return [
        'id' => (int)$row['id'],
        'categoryId' => (int)$row['categoryId'],
        'category' => [
            'id' => (int)$row['categoryId'],
            'name' => $row['categoryName'],
            'slug' => $row['categorySlug'],
        ],
        'name' => $row['name'],
        'slug' => $row['slug'],
        'description' => $row['description'],
        'mainImage' => $row['mainImage'],
        'mainImageSources' => build_image_sources((string)$row['mainImage']),
        'isPopular' => (bool)$row['isPopular'],
        'isNew' => (bool)$row['isNew'],
        'isHit' => (bool)$row['isHit'],
        'minPrice' => $row['minPrice'] === null ? null : (int)$row['minPrice'],
    ];
}

function fetch_product_by_slug(PDO $pdo, string $slug): ?array
{
    $stmt = $pdo->prepare('
        SELECT
            p.id,
            p.category_id AS "categoryId",
            c.name AS "categoryName",
            c.slug AS "categorySlug",
            p.name,
            p.slug,
            p.description,
            p.advantages,
            p.main_image AS "mainImage",
            p.is_popular AS "isPopular",
            p.is_new AS "isNew",
            p.is_hit AS "isHit"
        FROM products p
        JOIN categories c ON c.id = p.category_id
        WHERE p.slug = :slug AND p.is_active = TRUE
        LIMIT 1
    ');
    $stmt->execute(['slug' => $slug]);
    $product = $stmt->fetch();

    if (!$product) {
        return null;
    }

    $images = fetch_product_images($pdo, (int)$product['id']);
    $variants = fetch_product_variants($pdo, (int)$product['id']);
    $defaultVariant = choose_default_variant($variants);

    return [
        'id' => (int)$product['id'],
        'categoryId' => (int)$product['categoryId'],
        'category' => [
            'id' => (int)$product['categoryId'],
            'name' => $product['categoryName'],
            'slug' => $product['categorySlug'],
        ],
        'name' => $product['name'],
        'slug' => $product['slug'],
        'description' => $product['description'],
        'advantages' => decode_json_array($product['advantages']),
        'mainImage' => $product['mainImage'],
        'mainImageSources' => build_image_sources((string)$product['mainImage']),
        'images' => $images,
        'isPopular' => (bool)$product['isPopular'],
        'isNew' => (bool)$product['isNew'],
        'isHit' => (bool)$product['isHit'],
        'minPrice' => $defaultVariant['price'] ?? null,
        'defaultVariant' => $defaultVariant,
        'variants' => $variants,
        'options' => build_variant_options($variants),
    ];
}

function fetch_product_images(PDO $pdo, int $productId): array
{
    $stmt = $pdo->prepare('
        SELECT image_path AS "imagePath", alt, sort_order AS "sortOrder"
        FROM product_images
        WHERE product_id = :productId
        ORDER BY sort_order ASC, id ASC
    ');
    $stmt->execute(['productId' => $productId]);

    return array_map(static fn (array $row): array => [
        'imagePath' => $row['imagePath'],
        'sources' => build_image_sources((string)$row['imagePath']),
        'alt' => $row['alt'],
        'sortOrder' => (int)$row['sortOrder'],
    ], $stmt->fetchAll());
}

function build_image_sources(string $imagePath): array
{
    if ($imagePath === '') {
        return [];
    }

    $projectRoot = dirname(__DIR__, 2);
    $pathInfo = pathinfo($imagePath);
    $directory = ($pathInfo['dirname'] ?? '.') === '.' ? '' : $pathInfo['dirname'] . '/';
    $filename = preg_replace('/@\dx$/', '', $pathInfo['filename'] ?? '');
    $fallbackExtension = strtolower($pathInfo['extension'] ?? 'png');
    $formats = array_values(array_unique(['webp', $fallbackExtension]));
    $sources = [];

    foreach ($formats as $format) {
        $entries = [];

        foreach ([['', '1x'], ['@2x', '2x'], ['@3x', '3x']] as [$suffix, $density]) {
            $candidate = $directory . $filename . $suffix . '.' . $format;

            if (is_file($projectRoot . '/' . $candidate)) {
                $entries[] = [
                    'path' => $candidate,
                    'density' => $density,
                ];
            }
        }

        if ($entries !== []) {
            $sources[$format] = $entries;
        }
    }

    return $sources;
}

function fetch_product_variants(PDO $pdo, int $productId): array
{
    $stmt = $pdo->prepare('
        SELECT id, product_id AS "productId", sku, price, stock, parameters
        FROM product_variants
        WHERE product_id = :productId AND is_active = TRUE
        ORDER BY price ASC, id ASC
    ');
    $stmt->execute(['productId' => $productId]);

    return array_map('normalize_variant', $stmt->fetchAll());
}

function normalize_variant(array $row): array
{
    return [
        'id' => (int)$row['id'],
        'productId' => (int)$row['productId'],
        'sku' => $row['sku'],
        'price' => (int)$row['price'],
        'stock' => (int)$row['stock'],
        'parameters' => decode_json_array($row['parameters']),
    ];
}

function choose_default_variant(array $variants): ?array
{
    foreach ($variants as $variant) {
        if ($variant['stock'] > 0) {
            return $variant;
        }
    }

    return $variants[0] ?? null;
}

function build_variant_options(array $variants): array
{
    $options = [];

    foreach ($variants as $variant) {
        foreach ($variant['parameters'] as $key => $value) {
            $value = (string)$value;
            $options[$key] ??= [];

            if (!in_array($value, $options[$key], true)) {
                $options[$key][] = $value;
            }
        }
    }

    return $options;
}

function decode_json_array(?string $json): array
{
    if ($json === null || $json === '') {
        return [];
    }

    $data = json_decode($json, true);

    return is_array($data) ? $data : [];
}
