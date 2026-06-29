<?php

declare(strict_types=1);

final class ApiException extends RuntimeException
{
    public function __construct(
        private readonly int $statusCode,
        string $message,
        private readonly array $details = [],
    ) {
        parent::__construct($message);
    }

    public function statusCode(): int
    {
        return $this->statusCode;
    }

    public function details(): array
    {
        return $this->details;
    }
}

function json_response(array $payload, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function api_error(int $status, string $message, array $details = []): never
{
    throw new ApiException($status, $message, $details);
}

function require_method(string ...$allowedMethods): void
{
    if (!in_array($_SERVER['REQUEST_METHOD'] ?? 'GET', $allowedMethods, true)) {
        header('Allow: ' . implode(', ', $allowedMethods));
        api_error(405, 'Метод не поддерживается');
    }
}

function read_json_body(): array
{
    $raw = file_get_contents('php://input');

    if ($raw === false || trim($raw) === '') {
        return $_POST ?: [];
    }

    $data = json_decode($raw, true);

    if (!is_array($data)) {
        api_error(400, 'Некорректный JSON в теле запроса');
    }

    return $data;
}

function required_string(array $data, string $key): string
{
    $value = trim((string)($data[$key] ?? ''));

    if ($value === '') {
        api_error(422, "Поле {$key} обязательно");
    }

    return $value;
}

function optional_string(array $data, string $key): ?string
{
    if (!array_key_exists($key, $data) || $data[$key] === null) {
        return null;
    }

    $value = trim((string)$data[$key]);

    return $value === '' ? null : $value;
}

function required_int(array $data, string $key, int $min = 1): int
{
    $value = parse_int_value($data[$key] ?? null);

    if ($value === null || $value < $min) {
        api_error(422, "Поле {$key} должно быть числом не меньше {$min}");
    }

    return $value;
}

function query_int(string $key, ?int $default = null): ?int
{
    if (!isset($_GET[$key]) || $_GET[$key] === '') {
        return $default;
    }

    $value = parse_int_value($_GET[$key]);

    if ($value === null) {
        api_error(422, "Параметр {$key} должен быть числом");
    }

    return $value;
}

function query_bool(string $key, bool $default = false): bool
{
    if (!isset($_GET[$key]) || $_GET[$key] === '') {
        return $default;
    }

    return parse_bool_value($_GET[$key]);
}

function parse_int_value(mixed $value): ?int
{
    if (is_int($value)) {
        return $value;
    }

    if (!is_string($value) && !is_float($value)) {
        return null;
    }

    $value = trim((string)$value);

    if (!preg_match('/^-?\d+$/', $value)) {
        return null;
    }

    return (int)$value;
}

function parse_bool_value(mixed $value): bool
{
    if (is_bool($value)) {
        return $value;
    }

    $value = strtolower(trim((string)$value));

    return in_array($value, ['1', 'true', 'yes', 'on'], true);
}

function session_key(): string
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }

    return session_id();
}
