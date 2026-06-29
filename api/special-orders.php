<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

require_method('POST');

$body = read_json_body();
$name = required_string($body, 'name');
$phone = required_string($body, 'phone');
$request = required_string($body, 'request');
$telegram = optional_string($body, 'telegram');

$stmt = Database::connection()->prepare('
    INSERT INTO special_orders (name, phone, telegram, request_text)
    VALUES (:name, :phone, :telegram, :requestText)
    RETURNING id, created_at AS "createdAt"
');
$stmt->execute([
    'name' => $name,
    'phone' => $phone,
    'telegram' => $telegram,
    'requestText' => $request,
]);

$specialOrder = $stmt->fetch();

json_response([
    'ok' => true,
    'data' => [
        'id' => (int)$specialOrder['id'],
        'createdAt' => $specialOrder['createdAt'],
    ],
], 201);
