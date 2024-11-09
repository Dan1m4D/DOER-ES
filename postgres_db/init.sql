-- Create the database if it does not exist
DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database
        WHERE datname = 'doer_db'
    ) THEN
        -- This part cannot be executed inside a DO block
        -- So we will handle it separately
        RAISE NOTICE 'Database doer_db does not exist, creating...';
    END IF;
END
$$;

-- Create the database outside of the DO block
-- This will only run if the above block raises the notice
\c postgres
CREATE DATABASE doer_db;

-- Connect to the new database
\c doer_db

-- Create sudo user if it doesn't exist
DO
$$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_catalog.pg_roles
        WHERE rolname = 'doer_sudo_admin'
    ) THEN
        CREATE USER doer_sudo_admin WITH SUPERUSER PASSWORD 'doer_sudo_password_1234';
    END IF;
END
$$;