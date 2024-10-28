
-- Create database if it doesn't exist
DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database
        WHERE datname = 'doer_db'
    ) THEN
        CREATE DATABASE doer_db;
    END IF;
END
$$;

-- Create sudo user if it doesn't exist
DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_user
        WHERE username = 'doer_sudo_admin'
    ) THEN
        CREATE USER doer_sudo_admin WITH SUPERUSER PASSWORD 'doer_sudo_password_1234';
    END IF;
END
$$;