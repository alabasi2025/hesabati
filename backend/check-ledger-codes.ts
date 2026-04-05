import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { eq, and, inArray } from "drizzle-orm";
import postgres from "postgres";
import { accounts } from "./src/db/schema/index.ts";

const connectionString = process.env.DATABASE_URL || "postgresql://postgres:774424555@localhost:5432/hesabati";
const client = postgres(connectionString);
const db = drizzle(client, { schema: { accounts } });

async function checkLedgerCodes() {
  console.log("📊 فحص رموز الحسابات المحاسبية\n");
  console.log("=" .repeat(80));

  // الحسابات التحليلية (XXX-YYY-ZZZ)
  const analyticalAccounts = await db
    .select({
      accountType: accounts.accountType,
      ledgerCode: accounts.ledgerCode,
      name: accounts.name,
    })
    .from(accounts)
    .where(
      and(
        eq(accounts.businessId, 1),
        inArray(accounts.accountType, ["fund", "bank", "wallet", "exchanger", "supplier"])
      )
    )
    .orderBy(accounts.accountType, accounts.ledgerCode)
    .limit(30);

  console.log("\n🔍 الحسابات التحليلية (XXX-YYY-ZZZ):");
  console.log("-".repeat(80));
  
  const byType: Record<string, typeof analyticalAccounts> = {};
  for (const acc of analyticalAccounts) {
    const type = acc.accountType || "unknown";
    if (!byType[type]) byType[type] = [];
    byType[type].push(acc);
  }

  for (const [type, accs] of Object.entries(byType)) {
    console.log(`\n📁 ${type.toUpperCase()}:`);
    accs.forEach((acc, i) => {
      const parts = acc.ledgerCode?.split("-") || [];
      const isAnalytical = parts.length === 3;
      const emoji = isAnalytical ? "✅" : "❌";
      console.log(`  ${emoji} ${acc.ledgerCode?.padEnd(15)} | ${acc.name}`);
    });
  }

  // حسابات التحكم (XXX-YYY)
  const controlAccounts = await db
    .select({
      accountType: accounts.accountType,
      ledgerCode: accounts.ledgerCode,
      name: accounts.name,
    })
    .from(accounts)
    .where(
      and(
        eq(accounts.businessId, 1),
        inArray(accounts.accountType, ["partner", "employee", "warehouse", "custody", "budget"])
      )
    )
    .orderBy(accounts.accountType, accounts.ledgerCode)
    .limit(20);

  console.log("\n\n🎯 حسابات التحكم (XXX-YYY):");
  console.log("-".repeat(80));

  const controlByType: Record<string, typeof controlAccounts> = {};
  for (const acc of controlAccounts) {
    const type = acc.accountType || "unknown";
    if (!controlByType[type]) controlByType[type] = [];
    controlByType[type].push(acc);
  }

  for (const [type, accs] of Object.entries(controlByType)) {
    console.log(`\n📁 ${type.toUpperCase()}:`);
    accs.forEach((acc) => {
      const parts = acc.ledgerCode?.split("-") || [];
      const isControl = parts.length === 2;
      const emoji = isControl ? "✅" : "❌";
      console.log(`  ${emoji} ${acc.ledgerCode?.padEnd(15)} | ${acc.name}`);
    });
  }

  // إحصائيات
  console.log("\n\n📈 الإحصائيات:");
  console.log("-".repeat(80));
  
  const stats = await db
    .select({
      accountType: accounts.accountType,
      count: accounts.id,
    })
    .from(accounts)
    .where(eq(accounts.businessId, 1));

  const typeCounts: Record<string, number> = {};
  for (const s of stats) {
    const type = s.accountType || "other";
    typeCounts[type] = (typeCounts[type] || 0) + 1;
  }

  console.log("\nعدد الحسابات حسب النوع:");
  for (const [type, count] of Object.entries(typeCounts)) {
    console.log(`  • ${type.padEnd(20)}: ${count}`);
  }

  await client.end();
  console.log("\n✅ اكتمل الفحص");
}

checkLedgerCodes().catch(console.error);
