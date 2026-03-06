-- =====================================================
-- إعادة بناء نظام الترقيم
-- الهيكل: عمل → تصنيف → خزينة/مخزن → سنة → نوع → تسلسل
-- =====================================================

-- 1. إضافة sequenceNumber للتصنيفات (إذا لم يكن موجوداً)
ALTER TABLE fund_types ADD COLUMN IF NOT EXISTS sequence_number INTEGER;
ALTER TABLE bank_types ADD COLUMN IF NOT EXISTS sequence_number INTEGER;
ALTER TABLE exchange_types ADD COLUMN IF NOT EXISTS sequence_number INTEGER;
ALTER TABLE e_wallet_types ADD COLUMN IF NOT EXISTS sequence_number INTEGER;
ALTER TABLE warehouse_types ADD COLUMN IF NOT EXISTS sequence_number INTEGER;
ALTER TABLE journal_entry_categories ADD COLUMN IF NOT EXISTS sequence_number INTEGER;

-- 2. إضافة حقل الرقم المنسق الكامل (full_sequence_number) للسندات والقيود وعمليات المخازن
ALTER TABLE vouchers ADD COLUMN IF NOT EXISTS full_sequence_number VARCHAR(100);
ALTER TABLE journal_entries ADD COLUMN IF NOT EXISTS full_sequence_number VARCHAR(100);
ALTER TABLE warehouse_operations ADD COLUMN IF NOT EXISTS full_sequence_number VARCHAR(100);

-- 3. إضافة حقل category_id للخزائن (funds) إذا لم يكن موجوداً (ربط بالتصنيف)
-- funds.subType يربط بـ fundTypes.subTypeKey (نص)
-- accounts.subType يربط بـ bankTypes/exchangeTypes/eWalletTypes.subTypeKey (نص)
-- نضيف subTypeId كمعرف رقمي مباشر
ALTER TABLE funds ADD COLUMN IF NOT EXISTS sub_type_id INTEGER;
ALTER TABLE accounts ADD COLUMN IF NOT EXISTS sub_type_id INTEGER;
ALTER TABLE warehouses ADD COLUMN IF NOT EXISTS sub_type_id INTEGER;

-- 4. تنظيف وإعادة بناء جدول sequence_counters
-- حذف البيانات القديمة (إن وجدت)
TRUNCATE TABLE sequence_counters;

-- إضافة UNIQUE constraint (المفتاح الأساسي للـ UPSERT)
ALTER TABLE sequence_counters DROP CONSTRAINT IF EXISTS sequence_counters_unique;
ALTER TABLE sequence_counters ADD CONSTRAINT sequence_counters_unique 
  UNIQUE (business_id, counter_type, entity_id, year);

-- إنشاء فهرس للبحث السريع
CREATE INDEX IF NOT EXISTS idx_seq_counters_lookup 
  ON sequence_counters (business_id, counter_type, entity_id, year);

-- 5. إنشاء PostgreSQL sequences للسندات (النظام القديم - للتوافق المؤقت)
CREATE SEQUENCE IF NOT EXISTS voucher_receipt_seq START 1;
CREATE SEQUENCE IF NOT EXISTS voucher_payment_seq START 1;
CREATE SEQUENCE IF NOT EXISTS voucher_transfer_seq START 1;
