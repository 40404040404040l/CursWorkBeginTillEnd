<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/products_repository.php';

require_method('GET');

$slug = trim((string)($_GET['slug'] ?? ''));

if ($slug === '') {
    api_error(422, 'Параметр slug обязателен');
}

$product = fetch_product_by_slug(Database::connection(), $slug);

if ($product === null) {
    api_error(404, 'Товар не найден');
}

json_response([
    'ok' => true,
    'data' => $product,
]);
