/**
 * تطبيق التغييرات على قاعدة البيانات بشكل آمن
 * يتحقق من وجود الجداول والأعمدة قبل إنشائها
 */

import { db } from "../src/db/index.ts";
import { sql } from "drizzle-orm";

async function checkTableExists(tableName: string): Promise<boolean> {
  const result = await db.execute(sql`
    SELECT EXISTS (
      SELECT FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = ${tableName}
    )
  `);
  const rows = Array.isArray(result) ? result : (result as any).rows || [];
  return rows[0]?.exists === true;
}

async function checkColumnExists(tableName: string, columnName: string): Promise<boolean> {
  const result = await db.execute(sql`
    SELECT EXISTS (
      SELECT FROM information_schema.columns
      WHERE table_schema = 'public' AND table_name = ${tableName} AND column_name = ${columnName}
    )
  `);
  const rows = Array.isArray(result) ? result : (result as any).rows || [];
  return rows[0]?.exists === true;
}

async function checkConstraintExists(tableName: string, constraintName: string): Promise<boolean> {
  const result = await db.execute(sql`
    SELECT EXISTS (
      SELECT FROM information_schema.table_constraints
      WHERE table_schema = 'public' AND table_name = ${tableName} AND constraint_name = ${constraintName}
    )
  `);
  const rows = Array.isArray(result) ? result : (result as any).rows || [];
  return rows[0]?.exists === true;
}

async function main() {
  console.log("🔄 بدء تطبيق التغييرات على قاعدة البيانات...\n");

  // 1. إنشاء الجداول الجديدة إن لم تكن موجودة
  const tablesToCreate = [
    { name: 'operation_categories', sql: `
      CREATE TABLE IF NOT EXISTS "operation_categories" (
        "id" serial PRIMARY KEY NOT NULL,
        "business_id" integer NOT NULL REFERENCES "businesses"("id"),
        "name" varchar(200) NOT NULL,
        "category_key" varchar(100) NOT NULL,
        "sequence_number" integer,
        "code" varchar(30),
        "description" text,
        "icon" varchar(50) DEFAULT 'category',
        "color" varchar(20) DEFAULT '#6366f1',
        "sort_order" integer DEFAULT 0,
        "is_active" boolean DEFAULT true NOT NULL,
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `},
    { name: 'voucher_lines', sql: `
      CREATE TABLE IF NOT EXISTS "voucher_lines" (
        "id" serial PRIMARY KEY NOT NULL,
        "voucher_id" integer NOT NULL REFERENCES "vouchers"("id"),
        "account_id" integer NOT NULL REFERENCES "accounts"("id"),
        "amount" numeric(20, 2) NOT NULL,
        "description" text,
        "currency_id" integer REFERENCES "currencies"("id"),
        "exchange_rate" numeric(15, 4),
        "sort_order" integer DEFAULT 0,
        "created_at" timestamp DEFAULT now() NOT NULL
      )
    `},
    { name: 'purchase_invoices', sql: `
      CREATE TABLE IF NOT EXISTS "purchase_invoices" (
        "id" serial PRIMARY KEY NOT NULL,
        "business_id" integer NOT NULL REFERENCES "businesses"("id"),
        "invoice_number" varchar(50) NOT NULL,
        "supplier_id" integer NOT NULL REFERENCES "suppliers"("id"),
        "supplier_account_id" integer REFERENCES "accounts"("id"),
        "warehouse_id" integer REFERENCES "warehouses"("id"),
        "currency_id" integer NOT NULL REFERENCES "currencies"("id"),
        "subtotal" numeric(20, 2) DEFAULT '0' NOT NULL,
        "tax" numeric(20, 2) DEFAULT '0' NOT NULL,
        "discount" numeric(20, 2) DEFAULT '0' NOT NULL,
        "total_amount" numeric(20, 2) DEFAULT '0' NOT NULL,
        "payment_method" varchar(20) DEFAULT 'credit' NOT NULL,
        "paid_amount" numeric(20, 2) DEFAULT '0' NOT NULL,
        "remaining_amount" numeric(20, 2) DEFAULT '0' NOT NULL,
        "voucher_id" integer REFERENCES "vouchers"("id"),
        "warehouse_operation_id" integer,
        "status" varchar(20) DEFAULT 'draft' NOT NULL,
        "invoice_date" timestamp DEFAULT now() NOT NULL,
        "due_date" timestamp,
        "external_reference" varchar(100),
        "notes" text,
        "received_quantity" numeric(20, 4) DEFAULT '0' NOT NULL,
        "received_status" varchar(20) DEFAULT 'pending' NOT NULL,
        "sequence_number" integer,
        "full_sequence_number" varchar(100),
        "created_by" integer REFERENCES "users"("id"),
        "created_at" timestamp DEFAULT now() NOT NULL,
        "updated_at" timestamp DEFAULT now() NOT NULL
      )
    `},
    { name: 'purchase_invoice_items', sql: `
      CREATE TABLE IF NOT EXISTS "purchase_invoice_items" (
        "id" serial PRIMARY KEY NOT NULL,
        "invoice_id" integer NOT NULL REFERENCES "purchase_invoices"("id"),
        "inventory_item_id" integer NOT NULL REFERENCES "inventory_items"("id"),
        "quantity" numeric(20, 4) NOT NULL,
        "unit_cost" numeric(20, 2) NOT NULL,
        "total_cost" numeric(20, 2) NOT NULL,
        "tax" numeric(20, 2) DEFAULT '0' NOT NULL,
        "discount" numeric(20, 2) DEFAULT '0' NOT NULL,
        "received_quantity" numeric(20, 4) DEFAULT '0' NOT NULL,
        "sort_order" integer DEFAULT 0,
        "notes" text,
        "created_at" timestamp DEFAULT now() NOT NULL
      )
    `},
  ];

  for (const table of tablesToCreate) {
    const exists = await checkTableExists(table.name);
    if (!exists) {
      console.log(`📦 إنشاء جدول ${table.name}...`);
      await db.execute(sql.raw(table.sql));
      console.log(`   ✅ تم إنشاء ${table.name}`);
    } else {
      console.log(`   ⏭️  جدول ${table.name} موجود مسبقاً`);
    }
  }

  // 2. إضافة الأعمدة الجديدة
  const columnsToAdd = [
    { table: 'business_partners', column: 'sequence_number', sql: 'ALTER TABLE "business_partners" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'business_partners', column: 'code', sql: 'ALTER TABLE "business_partners" ADD COLUMN IF NOT EXISTS "code" varchar(30)' },
    { table: 'business_partners', column: 'account_id', sql: 'ALTER TABLE "business_partners" ADD COLUMN IF NOT EXISTS "account_id" integer' },
    { table: 'stations', column: 'sequence_number', sql: 'ALTER TABLE "stations" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'accounts', column: 'sub_type_id', sql: 'ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "sub_type_id" integer' },
    { table: 'accounts', column: 'sequence_number', sql: 'ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'accounts', column: 'linked_employee_id', sql: 'ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "linked_employee_id" integer REFERENCES "employees"("id")' },
    { table: 'accounts', column: 'code', sql: 'ALTER TABLE "accounts" ADD COLUMN IF NOT EXISTS "code" varchar(30)' },
    { table: 'employee_billing_accounts', column: 'billing_system_id', sql: 'ALTER TABLE "employee_billing_accounts" ADD COLUMN IF NOT EXISTS "billing_system_id" integer' },
    { table: 'billing_systems_config', column: 'system_key', sql: 'ALTER TABLE "billing_systems_config" ADD COLUMN IF NOT EXISTS "system_key" varchar(100)' },
    { table: 'billing_periods', column: 'billing_system_id', sql: 'ALTER TABLE "billing_periods" ADD COLUMN IF NOT EXISTS "billing_system_id" integer' },
    { table: 'funds', column: 'sub_type', sql: 'ALTER TABLE "funds" ADD COLUMN IF NOT EXISTS "sub_type" varchar(100)' },
    { table: 'funds', column: 'sub_type_id', sql: 'ALTER TABLE "funds" ADD COLUMN IF NOT EXISTS "sub_type_id" integer' },
    { table: 'funds', column: 'sequence_number', sql: 'ALTER TABLE "funds" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'funds', column: 'code', sql: 'ALTER TABLE "funds" ADD COLUMN IF NOT EXISTS "code" varchar(30)' },
    { table: 'warehouses', column: 'sub_type', sql: 'ALTER TABLE "warehouses" ADD COLUMN IF NOT EXISTS "sub_type" varchar(100)' },
    { table: 'warehouses', column: 'sub_type_id', sql: 'ALTER TABLE "warehouses" ADD COLUMN IF NOT EXISTS "sub_type_id" integer' },
    { table: 'warehouses', column: 'sequence_number', sql: 'ALTER TABLE "warehouses" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'warehouses', column: 'code', sql: 'ALTER TABLE "warehouses" ADD COLUMN IF NOT EXISTS "code" varchar(30)' },
    { table: 'operation_types', column: 'category_id', sql: 'ALTER TABLE "operation_types" ADD COLUMN IF NOT EXISTS "category_id" integer REFERENCES "operation_categories"("id")' },
    { table: 'operation_categories', column: 'name', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "name" varchar(200)' },
    { table: 'operation_categories', column: 'sequence_number', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'operation_categories', column: 'code', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "code" varchar(30)' },
    { table: 'operation_categories', column: 'description', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "description" text' },
    { table: 'operation_categories', column: 'icon', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "icon" varchar(50) DEFAULT \'category\'' },
    { table: 'operation_categories', column: 'color', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "color" varchar(20) DEFAULT \'#6366f1\'' },
    { table: 'operation_categories', column: 'sort_order', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "sort_order" integer DEFAULT 0' },
    { table: 'operation_categories', column: 'is_active', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "is_active" boolean DEFAULT true NOT NULL' },
    { table: 'operation_categories', column: 'updated_at', sql: 'ALTER TABLE "operation_categories" ADD COLUMN IF NOT EXISTS "updated_at" timestamp DEFAULT now() NOT NULL' },
    { table: 'operation_types', column: 'sequence_number', sql: 'ALTER TABLE "operation_types" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'operation_types', column: 'code', sql: 'ALTER TABLE "operation_types" ADD COLUMN IF NOT EXISTS "code" varchar(30)' },
    { table: 'vouchers', column: 'has_multiple_lines', sql: 'ALTER TABLE "vouchers" ADD COLUMN IF NOT EXISTS "has_multiple_lines" boolean DEFAULT false NOT NULL' },
    { table: 'warehouse_operations', column: 'purchase_invoice_id', sql: 'ALTER TABLE "warehouse_operations" ADD COLUMN IF NOT EXISTS "purchase_invoice_id" integer REFERENCES "purchase_invoices"("id")' },
    { table: 'warehouse_operations', column: 'account_id', sql: 'ALTER TABLE "warehouse_operations" ADD COLUMN IF NOT EXISTS "account_id" integer REFERENCES "accounts"("id")' },
    // Note: old databases may not have supplier_types table yet, so keep this nullable without FK.
    { table: 'suppliers', column: 'supplier_type_id', sql: 'ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "supplier_type_id" integer' },
    { table: 'suppliers', column: 'sequence_number', sql: 'ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "sequence_number" integer' },
    { table: 'suppliers', column: 'code', sql: 'ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "code" varchar(30)' },
    { table: 'suppliers', column: 'account_id', sql: 'ALTER TABLE "suppliers" ADD COLUMN IF NOT EXISTS "account_id" integer' },
    { table: 'purchase_invoices', column: 'supplier_sequence_number', sql: 'ALTER TABLE "purchase_invoices" ADD COLUMN IF NOT EXISTS "supplier_sequence_number" varchar(100)' },
  ];

  console.log("\n📝 إضافة الأعمدة الجديدة...");
  for (const col of columnsToAdd) {
    const exists = await checkColumnExists(col.table, col.column);
    if (!exists) {
      try {
        await db.execute(sql.raw(col.sql));
        console.log(`   ✅ أضيف ${col.table}.${col.column}`);
      } catch (e: any) {
        console.log(`   ⚠️ خطأ في إضافة ${col.table}.${col.column}: ${e.message}`);
      }
    } else {
      console.log(`   ⏭️  ${col.table}.${col.column} موجود`);
    }
  }

  // 2.5 تنظيف أعمدة legacy بعد الانتقال إلى الحقول الجديدة
  const columnsToDrop = [
    { table: 'employee_billing_accounts', column: 'billing_system' },
    { table: 'billing_periods', column: 'billing_system' },
  ];
  console.log("\n🧹 حذف أعمدة legacy...");
  for (const col of columnsToDrop) {
    try {
      await db.execute(sql.raw(`ALTER TABLE "${col.table}" DROP COLUMN IF EXISTS "${col.column}"`));
      console.log(`   ✅ حذف (إن وجد) ${col.table}.${col.column}`);
    } catch (e: any) {
      console.log(`   ⚠️ خطأ في حذف ${col.table}.${col.column}: ${e.message}`);
    }
  }

  // 3. إضافة UNIQUE constraints
  const constraintsToAdd = [
    { table: 'accounts', name: 'accounts_biz_code_unique', sql: 'ALTER TABLE "accounts" ADD CONSTRAINT "accounts_biz_code_unique" UNIQUE("business_id","code")' },
    { table: 'funds', name: 'funds_biz_code_unique', sql: 'ALTER TABLE "funds" ADD CONSTRAINT "funds_biz_code_unique" UNIQUE("business_id","code")' },
    { table: 'warehouses', name: 'warehouses_biz_code_unique', sql: 'ALTER TABLE "warehouses" ADD CONSTRAINT "warehouses_biz_code_unique" UNIQUE("business_id","code")' },
    { table: 'operation_types', name: 'operation_types_biz_code_unique', sql: 'ALTER TABLE "operation_types" ADD CONSTRAINT "operation_types_biz_code_unique" UNIQUE("business_id","code")' },
    { table: 'operation_categories', name: 'op_categories_biz_key_unique', sql: 'ALTER TABLE "operation_categories" ADD CONSTRAINT "op_categories_biz_key_unique" UNIQUE("business_id","category_key")' },
    { table: 'operation_categories', name: 'op_categories_biz_code_unique', sql: 'ALTER TABLE "operation_categories" ADD CONSTRAINT "op_categories_biz_code_unique" UNIQUE("business_id","code")' },
    { table: 'purchase_invoices', name: 'purchase_invoices_biz_num_unique', sql: 'ALTER TABLE "purchase_invoices" ADD CONSTRAINT "purchase_invoices_biz_num_unique" UNIQUE("business_id","invoice_number")' },
  ];

  console.log("\n🔒 إضافة UNIQUE constraints...");
  for (const constraint of constraintsToAdd) {
    const exists = await checkConstraintExists(constraint.table, constraint.name);
    if (!exists) {
      try {
        await db.execute(sql.raw(constraint.sql));
        console.log(`   ✅ أضيف ${constraint.name}`);
      } catch (e: any) {
        if (e.message.includes('already exists') || e.message.includes('duplicate key')) {
          console.log(`   ⏭️  ${constraint.name} موجود أو يوجد تكرار في البيانات`);
        } else {
          console.log(`   ⚠️ خطأ: ${e.message}`);
        }
      }
    } else {
      console.log(`   ⏭️  ${constraint.name} موجود`);
    }
  }

  console.log("\n✅ اكتمل تطبيق التغييرات!");
  process.exit(0);
}

main().catch((err) => {
  console.error("❌ خطأ:", err);
  process.exit(1);
});
