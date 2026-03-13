import "dotenv/config";
import { and, eq, isNotNull, or, sql } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import { accounts, funds, suppliers, warehouses } from "../src/db/schema/index.ts";

async function syncFundCodesAndSequences() {
  const rows = await db
    .select({
      accountId: funds.accountId,
      fundName: funds.name,
      fundCode: funds.code,
      fundSeq: funds.sequenceNumber,
      accountCode: accounts.code,
      accountSeq: accounts.sequenceNumber,
      accountName: accounts.name,
    })
    .from(funds)
    .leftJoin(accounts, eq(accounts.id, funds.accountId))
    .where(
      and(
        isNotNull(funds.accountId),
        or(
          sql`${funds.code} IS DISTINCT FROM ${accounts.code}`,
          sql`${funds.sequenceNumber} IS DISTINCT FROM ${accounts.sequenceNumber}`,
          sql`${funds.name} IS DISTINCT FROM ${accounts.name}`,
        ),
      ),
    );

  let synced = 0;
  for (const row of rows) {
    if (!row.accountId) continue;
    await db
      .update(accounts)
      .set({
        name: row.fundName,
        code: row.fundCode,
        sequenceNumber: row.fundSeq,
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, row.accountId));
    synced++;
  }

  return { synced, mismatches: rows.length };
}

async function syncSupplierCodesAndSequences() {
  const rows = await db
    .select({
      accountId: suppliers.accountId,
      supplierName: suppliers.name,
      supplierCode: suppliers.code,
      supplierSeq: suppliers.sequenceNumber,
      accountCode: accounts.code,
      accountSeq: accounts.sequenceNumber,
      accountName: accounts.name,
    })
    .from(suppliers)
    .leftJoin(accounts, eq(accounts.id, suppliers.accountId))
    .where(
      and(
        isNotNull(suppliers.accountId),
        or(
          sql`${suppliers.code} IS DISTINCT FROM ${accounts.code}`,
          sql`${suppliers.sequenceNumber} IS DISTINCT FROM ${accounts.sequenceNumber}`,
        ),
      ),
    );

  let synced = 0;
  for (const row of rows) {
    if (!row.accountId) continue;
    await db
      .update(accounts)
      .set({
        code: row.supplierCode,
        sequenceNumber: row.supplierSeq,
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, row.accountId));
    synced++;
  }

  return { synced, mismatches: rows.length };
}

async function syncWarehouseCodesAndSequences() {
  const rows = await db
    .select({
      accountId: warehouses.accountId,
      warehouseName: warehouses.name,
      warehouseCode: warehouses.code,
      warehouseSeq: warehouses.sequenceNumber,
      accountCode: accounts.code,
      accountSeq: accounts.sequenceNumber,
      accountName: accounts.name,
    })
    .from(warehouses)
    .leftJoin(accounts, eq(accounts.id, warehouses.accountId))
    .where(
      and(
        isNotNull(warehouses.accountId),
        or(
          sql`${warehouses.code} IS DISTINCT FROM ${accounts.code}`,
          sql`${warehouses.sequenceNumber} IS DISTINCT FROM ${accounts.sequenceNumber}`,
          sql`${warehouses.name} IS DISTINCT FROM ${accounts.name}`,
        ),
      ),
    );

  let synced = 0;
  for (const row of rows) {
    if (!row.accountId) continue;
    await db
      .update(accounts)
      .set({
        name: row.warehouseName,
        code: row.warehouseCode,
        sequenceNumber: row.warehouseSeq,
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, row.accountId));
    synced++;
  }

  return { synced, mismatches: rows.length };
}

async function run() {
  console.log("🔄 مزامنة الأكواد والتسلسلات بين الجداول...\n");

  const fundsResult = await syncFundCodesAndSequences();
  console.log(`✅ الصناديق: ${fundsResult.synced} حساب تمت مزامنته (${fundsResult.mismatches} عدم تطابق)`);

  const suppliersResult = await syncSupplierCodesAndSequences();
  console.log(`✅ الموردين: ${suppliersResult.synced} حساب تمت مزامنته (${suppliersResult.mismatches} عدم تطابق)`);

  const warehousesResult = await syncWarehouseCodesAndSequences();
  console.log(`✅ المخازن: ${warehousesResult.synced} حساب تمت مزامنته (${warehousesResult.mismatches} عدم تطابق)`);

  console.log(
    `\n📊 الإجمالي: ${fundsResult.synced + suppliersResult.synced + warehousesResult.synced} حساب تمت مزامنته`,
  );
}

try {
  await run();
} catch (error) {
  console.error("❌ فشلت المزامنة:", error);
  process.exit(1);
}
