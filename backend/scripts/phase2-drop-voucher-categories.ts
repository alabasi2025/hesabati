import { sql } from "drizzle-orm";
import { db } from "../src/db/index.ts";

async function main() {
  console.log("=== Phase 2: Drop deprecated voucher_categories table ===");

  await db.execute(sql.raw(`
    ALTER TABLE IF EXISTS "vouchers"
    DROP CONSTRAINT IF EXISTS "vouchers_category_id_voucher_categories_id_fk";
  `));

  await db.execute(sql.raw(`
    ALTER TABLE IF EXISTS "vouchers"
    DROP COLUMN IF EXISTS "category_id";
  `));

  await db.execute(sql.raw(`
    DROP TABLE IF EXISTS "voucher_categories";
  `));

  console.log("✅ Dropped voucher_categories (if it existed)");
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("❌ Failed to drop voucher_categories:", err);
  process.exit(1);
}

