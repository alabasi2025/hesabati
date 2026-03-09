import { sql } from "drizzle-orm";
import { db } from "../src/db/index.ts";

const statements = [
  `
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'accounts_biz_type_subtype_seq_unique') THEN
      ALTER TABLE "accounts"
      ADD CONSTRAINT "accounts_biz_type_subtype_seq_unique"
      UNIQUE ("business_id","account_type","sub_type_id","sequence_number");
    END IF;
  END $$;
  `,
  `
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'funds_biz_subtype_seq_unique') THEN
      ALTER TABLE "funds"
      ADD CONSTRAINT "funds_biz_subtype_seq_unique"
      UNIQUE ("business_id","sub_type_id","sequence_number");
    END IF;
  END $$;
  `,
  `
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'warehouses_biz_subtype_seq_unique') THEN
      ALTER TABLE "warehouses"
      ADD CONSTRAINT "warehouses_biz_subtype_seq_unique"
      UNIQUE ("business_id","sub_type_id","sequence_number");
    END IF;
  END $$;
  `,
  `
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'inventory_items_biz_code_unique') THEN
      ALTER TABLE "inventory_items"
      ADD CONSTRAINT "inventory_items_biz_code_unique"
      UNIQUE ("business_id","code");
    END IF;
  END $$;
  `,
  `
  DO $$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'operation_types_biz_cat_seq_unique') THEN
      ALTER TABLE "operation_types"
      ADD CONSTRAINT "operation_types_biz_cat_seq_unique"
      UNIQUE ("business_id","category_id","sequence_number");
    END IF;
  END $$;
  `,
];

async function main() {
  console.log("=== Phase 0 Apply: missing UNIQUE constraints ===");
  for (const s of statements) {
    await db.execute(sql.raw(s));
  }
  console.log("✅ Phase 0 UNIQUE constraints applied");
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("❌ Failed to apply phase 0 unique constraints:", err);
  process.exit(1);
}

