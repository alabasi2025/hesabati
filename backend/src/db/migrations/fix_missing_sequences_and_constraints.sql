-- إصلاح sequences و constraints مفقودة
-- تاريخ: 2026-03-03

-- 1. إنشاء sequences السندات المفقودة
CREATE SEQUENCE IF NOT EXISTS voucher_receipt_seq START 1;
CREATE SEQUENCE IF NOT EXISTS voucher_payment_seq START 1;
CREATE SEQUENCE IF NOT EXISTS voucher_transfer_seq START 1;

-- 2. إضافة unique constraint على sequence_counters
CREATE UNIQUE INDEX IF NOT EXISTS sequence_counters_unique_idx 
  ON sequence_counters (business_id, counter_type, entity_id, year);

-- 3. إضافة unique constraints على balances
CREATE UNIQUE INDEX IF NOT EXISTS account_balances_unique_idx 
  ON account_balances (account_id, currency_id);
CREATE UNIQUE INDEX IF NOT EXISTS fund_balances_unique_idx 
  ON fund_balances (fund_id, currency_id);
