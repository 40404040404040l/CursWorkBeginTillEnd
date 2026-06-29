<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/products_repository.php';

require_method('GET');

$pdo = Database::connection();
$productId = query_int('productId');
$slug = trim((string)($_GET['slug'] ?? ''));

if ($productId === null && $slug === '') {
    api_error(422, 'Нужен productId или slug');
}

if ($productId === null) {
    $stmt = $pdo->prepare('SELECT id FROM products WHERE slug = :slug AND is_active = TRUE LIMIT 1');
    $stmt->execute(['slug' => $slug]);
    $productId = (int)($stmt->fetchColumn() ?: 0);
}

if ($productId <= 0) {
    api_error(404, 'Товар не найден');
}

$variants = fetch_product_variants($pdo, $productId);

json_response([
    'ok' => true,
    'data' => [
        'defaultVariant' => choose_default_variant($variants),
        'options' => build_variant_options($variants),
        'variants' => $variants,
    ],
]);
