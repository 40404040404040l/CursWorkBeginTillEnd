<?php

declare(strict_types=1);

final class Database
{
    private static ?PDO $pdo = null;

    public static function connection(): PDO
    {
        if (self::$pdo instanceof PDO) {
            return self::$pdo;
        }

        $config = self::config();
        $dsn = sprintf(
            'pgsql:host=%s;port=%s;dbname=%s',
            $config['host'],
            $config['port'],
            $config['name'],
        );

        self::$pdo = new PDO($dsn, $config['user'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        if ($config['schema'] !== '') {
            self::$pdo->exec('SET search_path TO ' . self::quoteIdentifier($config['schema']) . ', public');
        }

        return self::$pdo;
    }

    private static function quoteIdentifier(string $identifier): string
    {
        return '"' . str_replace('"', '""', $identifier) . '"';
    }

    private static function config(): array
    {
        $localConfigPath = dirname(__DIR__) . '/config.local.php';
        $configCandidates = [
            dirname(__DIR__, 4) . '/theosk_private/config.local.php',
            dirname(__DIR__, 3) . '/theosk_private/config.local.php',
            $localConfigPath,
        ];
        $configPath = $localConfigPath;

        foreach ($configCandidates as $candidate) {
            if (is_file($candidate)) {
                $configPath = $candidate;
                break;
            }
        }

        $localConfig = is_file($configPath) ? require $configPath : [];
        $dbConfig = $localConfig['db'] ?? [];

        return [
            'host' => (string)($dbConfig['host'] ?? getenv('PGHOST') ?: 'localhost'),
            'port' => (string)($dbConfig['port'] ?? getenv('PGPORT') ?: '5432'),
            'name' => (string)($dbConfig['name'] ?? getenv('PGDATABASE') ?: 'theosk_store'),
            'user' => (string)($dbConfig['user'] ?? getenv('PGUSER') ?: 'postgres'),
            'password' => (string)($dbConfig['password'] ?? getenv('PGPASSWORD') ?: ''),
            'schema' => (string)($dbConfig['schema'] ?? getenv('PGSCHEMA') ?: ''),
        ];
    }
}
