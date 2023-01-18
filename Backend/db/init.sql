SELECT 'CREATE DATABASE social-wires'
WHERE NOT EXISTS (
        SELECT
        FROM pg_database
        WHERE datname = 'social-wires'
    ) \ gexec