-- إنشاء قاعدة البيانات باسم النظام (حساباتي)
-- شغّل من pgAdmin (Query Tool على قاعدة postgres) أو: psql -U postgres -f create-database.sql

-- 1) تعيين كلمة مرور المستخدم postgres
ALTER USER postgres WITH PASSWORD '774424555';

-- 2) إنشاء قاعدة البيانات hesabati
CREATE DATABASE hesabati WITH OWNER = postgres ENCODING = 'UTF8';
