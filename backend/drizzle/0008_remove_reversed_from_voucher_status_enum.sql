-- Remove 'reversed' value from voucher_status enum.
-- Existing rows with status = 'reversed' are normalized to 'cancelled'.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_enum e ON e.enumtypid = t.oid
    WHERE t.typname = 'voucher_status'
      AND e.enumlabel = 'reversed'
  ) THEN
    ALTER TYPE "public"."voucher_status" RENAME TO "voucher_status_old";

    CREATE TYPE "public"."voucher_status" AS ENUM (
      'draft',
      'confirmed',
      'cancelled',
      'pending_approval',
      'approved',
      'rejected'
    );

    ALTER TABLE "vouchers" ALTER COLUMN "status" DROP DEFAULT;
    ALTER TABLE "vouchers"
      ALTER COLUMN "status" TYPE "public"."voucher_status"
      USING (
        CASE
          WHEN "status"::text = 'reversed' THEN 'cancelled'
          ELSE "status"::text
        END
      )::"public"."voucher_status";
    ALTER TABLE "vouchers" ALTER COLUMN "status" SET DEFAULT 'confirmed';

    DROP TYPE "public"."voucher_status_old";
  END IF;
END $$;
