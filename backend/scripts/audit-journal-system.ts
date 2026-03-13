import "dotenv/config";
import { and, eq, isNull, isNotNull, count, sql } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import {
  journalEntries,
  journalEntryLines,
  journalEntryCategories,
  accounts,
  operationTypes,
} from "../src/db/schema/index.ts";

async function run() {
  console.log("🔍 فحص نظام القيود اليومية...\n");

  const [totalEntries] = await db.select({ c: count() }).from(journalEntries);
  const [totalLines] = await db.select({ c: count() }).from(journalEntryLines);
  const [totalCats] = await db.select({ c: count() }).from(journalEntryCategories);

  console.log("📊 الإحصائيات:");
  console.log(JSON.stringify({
    totalJournalEntries: Number(totalEntries?.c || 0),
    totalJournalLines: Number(totalLines?.c || 0),
    totalJournalCategories: Number(totalCats?.c || 0),
  }, null, 2));

  // فحص القيود بدون سطور
  const entriesWithoutLines = await db.execute(sql`
    SELECT je.id, je.entry_number, je.description
    FROM journal_entries je
    LEFT JOIN journal_entry_lines jel ON jel.journal_entry_id = je.id
    WHERE jel.id IS NULL
  `);

  console.log(`\n⚠️ قيود بدون سطور: ${(entriesWithoutLines as any).rows?.length || 0}`);

  // فحص القيود غير المتوازنة
  const [unbalanced] = await db
    .select({ c: count() })
    .from(journalEntries)
    .where(eq(journalEntries.isBalanced, false));

  console.log(`⚠️ قيود غير متوازنة: ${Number(unbalanced?.c || 0)}`);

  // فحص السطور بحسابات محذوفة
  const linesWithInvalidAccounts = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM journal_entry_lines jel
    LEFT JOIN accounts a ON a.id = jel.account_id
    WHERE a.id IS NULL
  `);

  console.log(`⚠️ سطور بحسابات محذوفة: ${(linesWithInvalidAccounts as any).rows?.[0]?.c || 0}`);

  // فحص القيود بقوالب محذوفة
  const entriesWithInvalidTemplate = await db.execute(sql`
    SELECT COUNT(*) as c
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.operation_type_id IS NOT NULL AND ot.id IS NULL
  `);

  console.log(`⚠️ قيود بقوالب محذوفة: ${(entriesWithInvalidTemplate as any).rows?.[0]?.c || 0}`);

  // فحص توزيع القيود حسب التصنيف
  const entriesByCategory = await db.execute(sql`
    SELECT
      COALESCE(jc.name, 'بدون تصنيف') as category_name,
      COUNT(*) as c
    FROM journal_entries je
    LEFT JOIN journal_entry_categories jc ON jc.category_key = je.category
    GROUP BY jc.name
    ORDER BY c DESC
  `);

  console.log("\n📋 توزيع القيود حسب التصنيف:");
  for (const row of (entriesByCategory as any).rows || []) {
    console.log(`   - ${row.category_name}: ${row.c}`);
  }

  // فحص القيود بدون تصنيف
  const [noCategory] = await db.select({ c: count() }).from(journalEntries).where(isNull(journalEntries.category));
  console.log(`\n⚠️ قيود بدون تصنيف: ${Number(noCategory?.c || 0)}`);

  console.log("\n" + "=".repeat(60));
}

try {
  await run();
} catch (error) {
  console.error("❌ فشل فحص نظام القيود:", error);
  process.exit(1);
}
