-- المهمة 7: تحويل الفوترة لديناميكية
-- إضافة حقل system_key لجدول billing_systems_config
ALTER TABLE "billing_systems_config" ADD COLUMN "system_key" varchar(100);--> statement-breakpoint

-- تعبئة system_key من أسماء الأنظمة الموجودة
UPDATE "billing_systems_config" SET "system_key" = 'moghrabi_v1' WHERE "name" LIKE '%الدهمية%' AND "system_key" IS NULL;--> statement-breakpoint
UPDATE "billing_systems_config" SET "system_key" = 'moghrabi_v2' WHERE "name" LIKE '%الصبالية%' AND "system_key" IS NULL;--> statement-breakpoint
UPDATE "billing_systems_config" SET "system_key" = 'moghrabi_v3' WHERE "name" LIKE '%غليل%' AND "system_key" IS NULL;--> statement-breakpoint
UPDATE "billing_systems_config" SET "system_key" = 'support_fund' WHERE "name" = 'صندوق الدعم' AND "system_key" IS NULL;--> statement-breakpoint
UPDATE "billing_systems_config" SET "system_key" = 'support_fund_west' WHERE "name" LIKE '%الساحل%' AND "system_key" IS NULL;--> statement-breakpoint
UPDATE "billing_systems_config" SET "system_key" = 'prepaid' WHERE "name" LIKE '%المسبق%' AND "system_key" IS NULL;--> statement-breakpoint
UPDATE "billing_systems_config" SET "system_key" = LOWER(REPLACE("name", ' ', '_')) WHERE "system_key" IS NULL;--> statement-breakpoint

-- جعل system_key NOT NULL بعد تعبئته
ALTER TABLE "billing_systems_config" ALTER COLUMN "system_key" SET NOT NULL;--> statement-breakpoint

-- إضافة unique constraint على (business_id, system_key)
ALTER TABLE "billing_systems_config" ADD CONSTRAINT "billing_systems_config_biz_key_unique" UNIQUE("business_id", "system_key");--> statement-breakpoint

-- إضافة حقل billing_system_id لجدول employee_billing_accounts
ALTER TABLE "employee_billing_accounts" ADD COLUMN "billing_system_id" integer;--> statement-breakpoint

-- ربط billing_system_id بالأنظمة الموجودة استناداً إلى billing_system enum
UPDATE "employee_billing_accounts"
SET "billing_system_id" = sub.bsc_id
FROM (
  SELECT eba2.id AS eba_id, bsc.id AS bsc_id
  FROM "employee_billing_accounts" eba2
  JOIN "employees" emp ON emp.id = eba2."employee_id"
  JOIN "billing_systems_config" bsc ON bsc."business_id" = emp."business_id" AND bsc."system_key" = eba2."billing_system"::text
  WHERE eba2."billing_system_id" IS NULL
) sub
WHERE "employee_billing_accounts".id = sub.eba_id;--> statement-breakpoint

-- إضافة foreign key constraint
ALTER TABLE "employee_billing_accounts" ADD CONSTRAINT "employee_billing_accounts_billing_system_id_billing_systems_config_id_fk" FOREIGN KEY ("billing_system_id") REFERENCES "billing_systems_config"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint

-- حذف عمود billing_system القديم (enum)
ALTER TABLE "employee_billing_accounts" DROP COLUMN IF EXISTS "billing_system";--> statement-breakpoint

-- نفس العملية لجدول billing_periods
ALTER TABLE "billing_periods" ADD COLUMN "billing_system_id" integer;--> statement-breakpoint

UPDATE "billing_periods"
SET "billing_system_id" = sub.bsc_id
FROM (
  SELECT bp2.id AS bp_id, bsc.id AS bsc_id
  FROM "billing_periods" bp2
  JOIN "billing_systems_config" bsc ON bsc."business_id" = bp2."business_id" AND bsc."system_key" = bp2."billing_system"::text
  WHERE bp2."billing_system_id" IS NULL
) sub
WHERE "billing_periods".id = sub.bp_id;--> statement-breakpoint

ALTER TABLE "billing_periods" ADD CONSTRAINT "billing_periods_billing_system_id_billing_systems_config_id_fk" FOREIGN KEY ("billing_system_id") REFERENCES "billing_systems_config"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint

ALTER TABLE "billing_periods" DROP COLUMN IF EXISTS "billing_system";
