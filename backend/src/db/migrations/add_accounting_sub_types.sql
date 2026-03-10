-- إضافة جدول التصنيفات الفرعية للأنواع الرئيسية المرنة (accounting)
CREATE TABLE IF NOT EXISTS accounting_sub_types (
  id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(id),
  main_type_id INTEGER NOT NULL REFERENCES accounting_types(id),
  name VARCHAR(200) NOT NULL,
  sub_type_key VARCHAR(100) NOT NULL,
  sequence_number INTEGER,
  description TEXT,
  icon VARCHAR(100) DEFAULT 'label',
  color VARCHAR(50) DEFAULT '#14b8a6',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'accounting_sub_types_biz_key_unique'
  ) THEN
    ALTER TABLE accounting_sub_types
      ADD CONSTRAINT accounting_sub_types_biz_key_unique UNIQUE (business_id, sub_type_key);
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'accounting_sub_types_biz_main_seq_unique'
  ) THEN
    ALTER TABLE accounting_sub_types
      ADD CONSTRAINT accounting_sub_types_biz_main_seq_unique UNIQUE (business_id, main_type_id, sequence_number);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_accounting_sub_types_business_id ON accounting_sub_types (business_id);
CREATE INDEX IF NOT EXISTS idx_accounting_sub_types_main_type_id ON accounting_sub_types (main_type_id);
