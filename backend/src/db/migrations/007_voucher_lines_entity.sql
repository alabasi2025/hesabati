-- إضافة حقول الكيان في سطور السندات لربط دفتر الأستاذ الفرعي
ALTER TABLE voucher_lines ADD COLUMN IF NOT EXISTS entity_type VARCHAR(50);
ALTER TABLE voucher_lines ADD COLUMN IF NOT EXISTS entity_id INTEGER;

-- فهرس للبحث السريع بالكيان
CREATE INDEX IF NOT EXISTS idx_voucher_lines_entity ON voucher_lines(entity_type, entity_id) WHERE entity_type IS NOT NULL;
