import { sql } from "drizzle-orm";
import { db } from "../src/db/index.ts";

type Row = Record<string, unknown>;

const TARGET_CONSTRAINTS: Array<{ table: string; name: string }> = [
  { table: "accounts", name: "accounts_biz_code_unique" },
  { table: "accounts", name: "accounts_biz_type_subtype_seq_unique" },
  { table: "funds", name: "funds_biz_code_unique" },
  { table: "funds", name: "funds_biz_subtype_seq_unique" },
  { table: "warehouses", name: "warehouses_biz_code_unique" },
  { table: "warehouses", name: "warehouses_biz_subtype_seq_unique" },
  { table: "inventory_items", name: "inventory_items_biz_code_unique" },
  { table: "operation_types", name: "operation_types_biz_code_unique" },
  { table: "operation_types", name: "operation_types_biz_cat_seq_unique" },
];

const DUPLICATE_CHECKS: Array<{ key: string; sqlText: string }> = [
  {
    key: "accounts.code by (business_id, code)",
    sqlText: `
      SELECT business_id, code, COUNT(*) AS dup_count
      FROM accounts
      WHERE code IS NOT NULL AND code <> ''
      GROUP BY business_id, code
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "accounts.sequence_number by (business_id, account_type, sub_type_id, sequence_number)",
    sqlText: `
      SELECT business_id, account_type, sub_type_id, sequence_number, COUNT(*) AS dup_count
      FROM accounts
      WHERE sequence_number IS NOT NULL
      GROUP BY business_id, account_type, sub_type_id, sequence_number
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "funds.code by (business_id, code)",
    sqlText: `
      SELECT business_id, code, COUNT(*) AS dup_count
      FROM funds
      WHERE code IS NOT NULL AND code <> ''
      GROUP BY business_id, code
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "funds.sequence_number by (business_id, sub_type_id, sequence_number)",
    sqlText: `
      SELECT business_id, sub_type_id, sequence_number, COUNT(*) AS dup_count
      FROM funds
      WHERE sequence_number IS NOT NULL
      GROUP BY business_id, sub_type_id, sequence_number
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "warehouses.code by (business_id, code)",
    sqlText: `
      SELECT business_id, code, COUNT(*) AS dup_count
      FROM warehouses
      WHERE code IS NOT NULL AND code <> ''
      GROUP BY business_id, code
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "warehouses.sequence_number by (business_id, sub_type_id, sequence_number)",
    sqlText: `
      SELECT business_id, sub_type_id, sequence_number, COUNT(*) AS dup_count
      FROM warehouses
      WHERE sequence_number IS NOT NULL
      GROUP BY business_id, sub_type_id, sequence_number
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "inventory_items.code by (business_id, code)",
    sqlText: `
      SELECT business_id, code, COUNT(*) AS dup_count
      FROM inventory_items
      WHERE code IS NOT NULL AND code <> ''
      GROUP BY business_id, code
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "operation_types.code by (business_id, code)",
    sqlText: `
      SELECT business_id, code, COUNT(*) AS dup_count
      FROM operation_types
      WHERE code IS NOT NULL AND code <> ''
      GROUP BY business_id, code
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
  {
    key: "operation_types.sequence_number by (business_id, category_id, sequence_number)",
    sqlText: `
      SELECT business_id, category_id, sequence_number, COUNT(*) AS dup_count
      FROM operation_types
      WHERE sequence_number IS NOT NULL AND category_id IS NOT NULL
      GROUP BY business_id, category_id, sequence_number
      HAVING COUNT(*) > 1
      ORDER BY dup_count DESC, business_id
      LIMIT 20
    `,
  },
];

function rowsOf(result: unknown): Row[] {
  if (Array.isArray(result)) return result as Row[];
  const maybeRows = (result as { rows?: Row[] } | null)?.rows;
  return Array.isArray(maybeRows) ? maybeRows : [];
}

async function main() {
  console.log("=== Phase 0 Audit: UNIQUE Constraints & Duplicates ===\n");

  console.log("1) Constraint status");
  for (const c of TARGET_CONSTRAINTS) {
    const res = await db.execute(sql.raw(`
      SELECT 1
      FROM pg_constraint pc
      JOIN pg_class t ON t.oid = pc.conrelid
      JOIN pg_namespace n ON n.oid = t.relnamespace
      WHERE n.nspname = 'public'
        AND t.relname = '${c.table}'
        AND pc.conname = '${c.name}'
      LIMIT 1
    `));
    const exists = rowsOf(res).length > 0;
    console.log(` - ${exists ? "OK  " : "MISS"} ${c.table}.${c.name}`);
  }

  console.log("\n2) Duplicate data checks");
  let hasDuplicates = false;
  for (const check of DUPLICATE_CHECKS) {
    const res = await db.execute(sql.raw(check.sqlText));
    const rows = rowsOf(res);
    if (rows.length === 0) {
      console.log(` - OK   ${check.key}`);
      continue;
    }
    hasDuplicates = true;
    console.log(` - DUP  ${check.key} -> ${rows.length} group(s) (showing first rows):`);
    for (const r of rows.slice(0, 3)) {
      console.log(`       ${JSON.stringify(r)}`);
    }
  }

  console.log(`\nResult: ${hasDuplicates ? "duplicates found (cleanup required)" : "no duplicates found"}`);
}

try {
  await main();
  process.exit(0);
} catch (err) {
  console.error("Phase 0 audit failed:", err);
  process.exit(1);
}

