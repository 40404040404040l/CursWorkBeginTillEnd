# Локальный запуск бэка

## Docker

```bash
docker compose up -d --build
```

Сайт и API будут доступны здесь:

```text
http://localhost:8080/
http://localhost:8080/api/health.php
http://localhost:8080/api/categories.php
http://localhost:8080/api/products.php
http://localhost:8080/api/product.php?slug=iphone-air
```

PostgreSQL снаружи доступен на порту `55433`:

```bash
psql -h localhost -p 55433 -U theosk -d theosk_store
```

Пароль для локального Docker-окружения:

```text
theosk_password
```

Если нужно пересоздать базу с нуля:

```bash
docker compose down -v
docker compose up -d --build
```
