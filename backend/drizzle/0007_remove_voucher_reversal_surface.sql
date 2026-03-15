-- Remove reversal-specific DB surface from vouchers.
ALTER TABLE "vouchers" DROP COLUMN IF EXISTS "reversal_status";
ALTER TABLE "vouchers" DROP COLUMN IF EXISTS "reversed_voucher_id";
ALTER TABLE "vouchers" DROP COLUMN IF EXISTS "reversal_reason";
ALTER TABLE "vouchers" DROP COLUMN IF EXISTS "reversed_at";
ALTER TABLE "vouchers" DROP COLUMN IF EXISTS "reversed_by";

DROP INDEX IF EXISTS "idx_vouchers_reversed_by";

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'voucher_reversal_status'
  ) THEN
    DROP TYPE "public"."voucher_reversal_status";
  END IF;
END $$;
