-- Migration: تحويل حالات السندات من (draft/confirmed/cancelled) إلى (unreviewed/reviewed)

-- 1. إنشاء enum جديد
CREATE TYPE "voucher_status_new" AS ENUM('unreviewed', 'reviewed');

-- 2. تحويل القيم الموجودة: confirmed → reviewed ، draft/cancelled → unreviewed
ALTER TABLE "vouchers"
  ALTER COLUMN "status" TYPE "voucher_status_new"
  USING CASE
    WHEN "status"::text = 'reviewed'   THEN 'reviewed'::voucher_status_new
    WHEN "status"::text = 'confirmed'  THEN 'reviewed'::voucher_status_new
    ELSE 'unreviewed'::voucher_status_new
  END;

-- 3. تعيين القيمة الافتراضية
ALTER TABLE "vouchers" ALTER COLUMN "status" SET DEFAULT 'unreviewed';

-- 4. حذف enum القديم وإعادة التسمية
DROP TYPE "voucher_status";
ALTER TYPE "voucher_status_new" RENAME TO "voucher_status";
