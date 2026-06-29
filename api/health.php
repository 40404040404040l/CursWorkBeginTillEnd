<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

require_method('GET');

$pdo = Database::connection();
$version = $pdo->query('SELECT version() AS version')->fetchColumn();

json_response([
    'ok' => true,
    'php' => PHP_VERSION,
    'database' => $version,
]);
