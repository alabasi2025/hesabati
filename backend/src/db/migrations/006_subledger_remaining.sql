-- 006: إضافة account_id للجداول الناقصة + حذف accounting من enum
-- custody_records
ALTER TABLE custody_records ADD COLUMN IF NOT EXISTS account_id INTEGER REFERENCES accounts(id);

-- expense_budget
ALTER TABLE expense_budget ADD COLUMN IF NOT EXISTS account_id INTEGER REFERENCES accounts(id);

-- حذف accounting من account_type enum
-- PostgreSQL لا يدعم حذف قيمة من enum مباشرة، لذلك نتركه ونمنعه من الكود فقط
-- ALTER TYPE account_type ... (غير مدعوم — التعامل من الكود)
