<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';
require __DIR__ . '/lib/products_repository.php';

require_method('GET');

$category = isset($_GET['category']) ? trim((string)$_GET['category']) : null;
$popularOnly = query_bool('popular');
$products = fetch_product_cards(Database::connection(), $category, $popularOnly);

json_response([
    'ok' => true,
    'data' => $products,
]);
