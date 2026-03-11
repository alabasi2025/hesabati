-- إنشاء جدول أنواع الحسابات الفرعية الوظيفية
CREATE TABLE IF NOT EXISTS account_sub_natures (
  id SERIAL PRIMARY KEY,
  business_id INTEGER NOT NULL REFERENCES businesses(id),
  name VARCHAR(200) NOT NULL,
  nature_key VARCHAR(100) NOT NULL,
  is_system BOOLEAN NOT NULL DEFAULT TRUE,
  icon VARCHAR(100) DEFAULT 'category',
  color VARCHAR(50) DEFAULT '#64748b',
  sequence_number INTEGER,
  requires_station BOOLEAN NOT NULL DEFAULT FALSE,
  requires_employee BOOLEAN NOT NULL DEFAULT FALSE,
  requires_provider BOOLEAN NOT NULL DEFAULT FALSE,
  requires_account_number BOOLEAN NOT NULL DEFAULT FALSE,
  requires_supplier_type BOOLEAN NOT NULL DEFAULT FALSE,
  supports_cash_operations BOOLEAN NOT NULL DEFAULT TRUE,
  can_receive_payment BOOLEAN NOT NULL DEFAULT TRUE,
  can_make_payment BOOLEAN NOT NULL DEFAULT TRUE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
  CONSTRAINT account_sub_natures_biz_key_unique UNIQUE (business_id, nature_key),
  CONSTRAINT account_sub_natures_biz_seq_unique UNIQUE (business_id, sequence_number)
);

CREATE INDEX IF NOT EXISTS idx_account_sub_natures_business_id ON account_sub_natures (business_id);
