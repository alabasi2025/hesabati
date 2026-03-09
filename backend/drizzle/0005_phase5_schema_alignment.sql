-- Phase 5: schema alignment for legacy databases
-- - Normalize billing columns
-- - Remove deprecated collections/voucher-categories tables
-- - Ensure missing compatibility columns exist

-- ===================== Billing normalization =====================
ALTER TABLE "employee_billing_accounts"
  ADD COLUMN IF NOT EXISTS "billing_system_id" integer;

ALTER TABLE "billing_systems_config"
  ADD COLUMN IF NOT EXISTS "system_key" varchar(100);

ALTER TABLE "billing_periods"
  ADD COLUMN IF NOT EXISTS "billing_system_id" integer;

ALTER TABLE "employee_billing_accounts"
  DROP COLUMN IF EXISTS "billing_system";

ALTER TABLE "billing_periods"
  DROP COLUMN IF EXISTS "billing_system";

-- ===================== Operation categories backfill columns =====================
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "name" varchar(200);
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "sequence_number" integer;
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "code" varchar(30);
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "description" text;
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "icon" varchar(50) DEFAULT 'category';
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "color" varchar(20) DEFAULT '#6366f1';
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0;
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true NOT NULL;
ALTER TABLE "operation_categories"
  ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL;

-- ===================== Deprecated voucher categories =====================
ALTER TABLE IF EXISTS "vouchers"
  DROP CONSTRAINT IF EXISTS "vouchers_category_id_voucher_categories_id_fk";
ALTER TABLE IF EXISTS "vouchers"
  DROP COLUMN IF EXISTS "category_id";

DROP TABLE IF EXISTS "voucher_categories";

-- ===================== Deprecated collections tables =====================
DROP TABLE IF EXISTS "delivery_records";
DROP TABLE IF EXISTS "collection_details";
DROP TABLE IF EXISTS "daily_collections";