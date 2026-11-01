-- Admin role upgrade for Startup Academy
ALTER TABLE users MODIFY COLUMN role ENUM('user','admin','super_admin') NOT NULL DEFAULT 'user';
UPDATE users SET role = 'super_admin' WHERE LOWER(email) = 'admin@startupacademy.com';
