-- تحويل fund_type من enum ثابت إلى نص ديناميكي
-- حتى يقبل القيم القادمة من جدول fund_types.sub_type_key

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'funds'
      AND column_name = 'fund_type'
      AND udt_name = 'fund_type'
  ) THEN
    ALTER TABLE funds
      ALTER COLUMN fund_type TYPE varchar(100)
      USING fund_type::text;
  END IF;
END $$;

