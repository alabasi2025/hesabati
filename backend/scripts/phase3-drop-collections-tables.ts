import { sql } from "drizzle-orm";
import { db } from "../src/db/index.ts";

async function main() {
  console.log("=== Phase 3: Drop deprecated collections tables ===");

  await db.execute(sql.raw(`
    DROP TABLE IF EXISTS "delivery_records";
    DROP TABLE IF EXISTS "collection_details";
    DROP TABLE IF EXISTS "daily_collections";
  `));

  console.log("✅ Dropped delivery_records, collection_details, daily_collections (if existed)");
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("❌ Failed to drop collections tables:", err);
  process.exit(1);
}

