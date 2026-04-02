-- Migration 005: إضافة account_id لجدول billing_systems_config
-- كل نظام فوترة يرتبط بحساب تحكم في دليل الحسابات (نمط Control Account)

ALTER TABLE billing_systems_config
  ADD COLUMN IF NOT EXISTS account_id INTEGER REFERENCES accounts(id);
