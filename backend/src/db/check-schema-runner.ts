/**
 * check-schema-runner.ts — Phase 12
 * دوال المقارنة والتحقق والتشغيل الرئيسي
 * (مستخرجة من check-schema-match.ts)
 * تشغيل: npx tsx src/db/check-schema-runner.ts
 */
import "dotenv/config";
import postgres from "postgres";
import { expectedTables } from './check-schema-tables.ts';

const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://postgres:774424555@localhost:5432/hesabati";

async function compareTableColumns(
  sql: ReturnType<typeof postgres>,
  table: string,
  expectedCols: string[],
): Promise<ColumnDiff | null> {
  const colsInDb = await sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = ${table}
    ORDER BY ordinal_position
  `;
  const dbCols = new Set(
    (colsInDb as { column_name: string }[]).map((r) => r.column_name),
  );
  const expectedSet = new Set(expectedCols);
  const missingCols = expectedCols.filter((c) => !dbCols.has(c));
  const extraCols = [...dbCols].filter((c) => !expectedSet.has(c));
  if (missingCols.length || extraCols.length) {
    return { table, missing: missingCols, extra: extraCols };
  }
  return null;
}

function findExtraTables(dbTableNames: Set<string>): string[] {
  return [...dbTableNames].filter(
    (t) => !t.startsWith("__") && !expectedTables[t],
  );
}

function printResults(
  missing: string[],
  extraTables: string[],
  columnIssues: ColumnDiff[],
) {
  console.log(
    "\n=== فحص الجداول والأعمدة (السكما مقابل قاعدة البيانات) ===\n",
  );

  if (missing.length) {
    console.log("❌ جداول ناقصة في قاعدة البيانات:", missing.join(", "));
  } else {
    console.log("✅ كل الجداول المعرّفة في السكما موجودة في قاعدة البيانات.");
  }

  if (extraTables.length) {
    console.log(
      "ℹ️  جداول إضافية في DB (خارج السكما):",
      extraTables.join(", "),
    );
  }

  if (columnIssues.length) {
    console.log("\n❌ فروقات في الأعمدة:");
    for (const { table, missing: m, extra: e } of columnIssues) {
      if (m.length)
        console.log("   " + table + ": أعمدة ناقصة: " + m.join(", "));
      if (e.length)
        console.log("   " + table + ": أعمدة زائدة في DB: " + e.join(", "));
    }
  } else if (!missing.length) {
    console.log("✅ كل الأعمدة المتوقعة موجودة ولا توجد أعمدة ناقصة.");
  }

  console.log("");
}

async function main() {
  const sql = postgres(connectionString, { max: 1 });
  const missing: string[] = [];
  const columnIssues: ColumnDiff[] = [];

  try {
    const tablesInDb = await sql`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    const dbTableNames = new Set(
      (tablesInDb as { table_name: string }[]).map((r) => r.table_name),
    );

    for (const [table, expectedCols] of Object.entries(expectedTables)) {
      if (!dbTableNames.has(table)) {
        missing.push(table);
        continue;
      }
      const diff = await compareTableColumns(sql, table, expectedCols);
      if (diff) columnIssues.push(diff);
    }

    const extraTables = findExtraTables(dbTableNames);
    printResults(missing, extraTables, columnIssues);
  } finally {
    await sql.end();
  }
}

try {
  await main();
} catch (e: unknown) {
  const message = e instanceof Error ? e.message : JSON.stringify(e);
  console.error("خطأ في الاتصال بقاعدة البيانات:", message);
  process.exit(1);
}

