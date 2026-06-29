<?php

declare(strict_types=1);

error_reporting(E_ALL);
ini_set('display_errors', '0');

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'OPTIONS') {
    header('Access-Control-Allow-Methods: GET, POST, PATCH, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

session_name('THEOSK_SESSION');
session_start();

require_once __DIR__ . '/http.php';
require_once __DIR__ . '/database.php';

set_exception_handler(static function (Throwable $exception): void {
    if ($exception instanceof ApiException) {
        json_response([
            'ok' => false,
            'error' => [
                'message' => $exception->getMessage(),
                'details' => $exception->details(),
            ],
        ], $exception->statusCode());
    }

    json_response([
        'ok' => false,
        'error' => [
            'message' => 'Внутренняя ошибка сервера',
        ],
    ], 500);
});
