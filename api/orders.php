<?php

declare(strict_types=1);

require __DIR__ . '/lib/bootstrap.php';

require_method('POST');

$pdo = Database::connection();
$sessionKey = session_key();
$body = read_json_body();
$customer = $body['customer'] ?? $body;

if (!is_array($customer)) {
    api_error(422, 'Данные покупателя должны быть объектом');
}

$name = required_string($customer, 'name');
$phone = required_string($customer, 'phone');
$email = optional_string($customer, 'email');
$telegram = optional_string($customer, 'telegram');
$city = optional_string($customer, 'city');
$address = optional_string($customer, 'address');
$postalCode = optional_string($customer, 'postalCode') ?? optional_string($customer, 'postal-code');
$deliveryType = optional_string($body, 'delivery') ?? optional_string($customer, 'delivery') ?? 'standard';
$comment = optional_string($body, 'comment') ?? optional_string($customer, 'comment');
$deliveryPrice = $deliveryType === 'express' ? 500 : 0;

$pdo->beginTransaction();

try {
    $stmt = $pdo->prepare('
        SELECT
            ci.product_id,
            ci.variant_id,
            ci.quantity,
            ci.selected_parameters,
            ci.fixed_price,
            p.name AS product_name,
            p.main_image,
            v.sku
        FROM cart_items ci
        JOIN products p ON p.id = ci.product_id
        JOIN product_variants v ON v.id = ci.variant_id
        WHERE ci.session_key = :sessionKey
        ORDER BY ci.created_at ASC, ci.id ASC
    ');
    $stmt->execute(['sessionKey' => $sessionKey]);
    $cartItems = $stmt->fetchAll();

    if (!$cartItems) {
        api_error(409, 'Корзина пустая');
    }

    $subtotal = 0;
    foreach ($cartItems as $item) {
        $subtotal += (int)$item['fixed_price'] * (int)$item['quantity'];
    }
    $total = $subtotal + $deliveryPrice;

    $stmt = $pdo->prepare('
        INSERT INTO orders (
            session_key,
            customer_name,
            customer_phone,
            customer_email,
            customer_telegram,
            city,
            address,
            postal_code,
            delivery_type,
            delivery_price,
            subtotal,
            total,
            comment
        )
        VALUES (
            :sessionKey,
            :name,
            :phone,
            :email,
            :telegram,
            :city,
            :address,
            :postalCode,
            :deliveryType,
            :deliveryPrice,
            :subtotal,
            :total,
            :comment
        )
        RETURNING id, public_id
    ');
    $stmt->execute([
        'sessionKey' => $sessionKey,
        'name' => $name,
        'phone' => $phone,
        'email' => $email,
        'telegram' => $telegram,
        'city' => $city,
        'address' => $address,
        'postalCode' => $postalCode,
        'deliveryType' => $deliveryType,
        'deliveryPrice' => $deliveryPrice,
        'subtotal' => $subtotal,
        'total' => $total,
        'comment' => $comment,
    ]);
    $order = $stmt->fetch();

    $itemStmt = $pdo->prepare('
        INSERT INTO order_items (
            order_id,
            product_id,
            variant_id,
            product_name,
            sku,
            image_path,
            selected_parameters,
            fixed_price,
            quantity,
            line_total
        )
        VALUES (
            :orderId,
            :productId,
            :variantId,
            :productName,
            :sku,
            :imagePath,
            :selectedParameters,
            :fixedPrice,
            :quantity,
            :lineTotal
        )
    ');

    foreach ($cartItems as $item) {
        $fixedPrice = (int)$item['fixed_price'];
        $quantity = (int)$item['quantity'];
        $itemStmt->execute([
            'orderId' => (int)$order['id'],
            'productId' => (int)$item['product_id'],
            'variantId' => (int)$item['variant_id'],
            'productName' => $item['product_name'],
            'sku' => $item['sku'],
            'imagePath' => $item['main_image'],
            'selectedParameters' => $item['selected_parameters'],
            'fixedPrice' => $fixedPrice,
            'quantity' => $quantity,
            'lineTotal' => $fixedPrice * $quantity,
        ]);
    }

    $stmt = $pdo->prepare('DELETE FROM cart_items WHERE session_key = :sessionKey');
    $stmt->execute(['sessionKey' => $sessionKey]);

    $pdo->commit();

    json_response([
        'ok' => true,
        'data' => [
            'id' => (int)$order['id'],
            'publicId' => $order['public_id'],
            'subtotal' => $subtotal,
            'deliveryPrice' => $deliveryPrice,
            'total' => $total,
        ],
    ], 201);
} catch (Throwable $exception) {
    $pdo->rollBack();
    throw $exception;
}
