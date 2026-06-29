<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

require_method('GET');

$stmt = Database::connection()->query('
    SELECT id, name, slug
    FROM categories
    ORDER BY sort_order ASC, id ASC
');

$categories = array_map(static fn (array $row): array => [
    'id' => (int)$row['id'],
    'name' => $row['name'],
    'slug' => $row['slug'],
], $stmt->fetchAll());

json_response([
    'ok' => true,
    'data' => $categories,
]);
