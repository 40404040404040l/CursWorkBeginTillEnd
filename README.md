# THEOSK STORE

THEOSK STORE is a drawing-style web store for Apple devices. The project combines a custom hand-drawn visual system with a working PHP backend, PostgreSQL database, cart, favorites, checkout flow, and special-order form.

Production URL:

```text
https://se.ifmo.ru/~s373327/theosk/
```

Repository name:

```text
theosk_store_drawing
```

## Features

- Catalog with categories: iPhone, AirPods, MacBook, iPad.
- Product pages with pretty URLs, for example `/theosk/catalog/iphone-air/`.
- Product variants with parameters such as color, memory, storage, SIM, chip, and connection type.
- Favorites bound to a PHP session.
- Cart bound to a PHP session.
- Checkout form that creates an order in PostgreSQL.
- Special-order form for custom requests.
- Custom 404 page.
- Desktop and mobile layouts.
- Local fonts, SVG interface graphics, WebP images, and `srcset` for high-density screens.

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- PHP 8
- PostgreSQL
- Apache `.htaccess` rewrites
- Docker Compose for local development

## Project Structure

```text
.
├── api/                  PHP JSON API
│   ├── lib/              shared database, HTTP, bootstrap helpers
│   ├── cart.php
│   ├── favorites.php
│   ├── orders.php
│   ├── product.php
│   ├── products.php
│   └── special-orders.php
├── Assets/               product images, fonts, UI assets
├── DesignEkran/          SVG interface graphics
├── pages/                inner HTML pages
├── scripts/home.js       frontend interaction logic
├── styles/base.css       visual system and responsive layout
├── sql/schema.sql        PostgreSQL schema
├── sql/seed.sql          seed catalog data
├── .htaccess             pretty URL routing for Helios deployment
└── docker-compose.yml    local web + PostgreSQL environment
```

## Backend

The backend is a PHP JSON API. All endpoints return one common response shape.

Successful response:

```json
{
  "ok": true,
  "data": {}
}
```

Error response:

```json
{
  "ok": false,
  "error": {
    "message": "Error message"
  }
}
```

Database access is implemented with PDO in `api/lib/database.php`. SQL queries use prepared statements. Orders are created in a transaction: the API writes the main order to `orders`, writes products to `order_items`, and then clears `cart_items`.

Main API endpoints:

```text
GET  api/health.php
GET  api/categories.php
GET  api/products.php?category=iphone
GET  api/products/popular.php
GET  api/product.php?slug=iphone-air
GET  api/favorites.php
POST api/favorites.php
GET  api/cart.php
POST api/cart.php
POST api/orders.php
POST api/special-orders.php
```

## Database Tables

The project uses these PostgreSQL tables:

```text
categories
products
product_images
product_variants
favorite_items
cart_items
orders
order_items
special_orders
```

## Local Run

Start the local environment:

```bash
docker compose up -d --build
```

Open the local site:

```text
http://localhost:8080/
```

Useful local API checks:

```text
http://localhost:8080/api/health.php
http://localhost:8080/api/categories.php
http://localhost:8080/api/products.php?category=iphone
http://localhost:8080/api/product.php?slug=iphone-air
```

PostgreSQL is exposed on port `55433`:

```bash
psql -h localhost -p 55433 -U theosk -d theosk_store
```

Local Docker credentials are development-only and are defined in `docker-compose.yml`.

To recreate the database from `sql/schema.sql` and `sql/seed.sql`:

```bash
docker compose down -v
docker compose up -d --build
```

## Helios Deployment

On Helios the project is deployed into a child folder:

```text
/home/studs/s373327/public_html/theosk
```

The public URL stays:

```text
https://se.ifmo.ru/~s373327/theosk/
```

The root `public_html/.htaccess` redirects `/~s373327/` to `/~s373327/theosk/`, so other projects can live next to `theosk` inside `public_html`.

The database config is intentionally not committed:

```text
api/config.local.php
```

Use `api/config.example.php` as a template for private deployment config.

## Validation

Typical checks:

```bash
php -l api/*.php
php -l api/lib/*.php
node --check scripts/home.js
```

Production smoke checks:

```text
https://se.ifmo.ru/~s373327/theosk/
https://se.ifmo.ru/~s373327/theosk/catalog/
https://se.ifmo.ru/~s373327/theosk/catalog/iphone-air/
https://se.ifmo.ru/~s373327/theosk/cart/
https://se.ifmo.ru/~s373327/theosk/api/health.php
```

## Notes

This is a coursework project focused on a custom visual identity, full user flow, and server-side persistence. It avoids frontend frameworks on purpose: the UI is built with semantic HTML, CSS, and vanilla JavaScript.
