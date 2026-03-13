import "dotenv/config";
import { and, eq, isNotNull, isNull, inArray } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import {
  accounts,
  funds,
  fundTypes,
  suppliers,
  supplierTypes,
  warehouses,
  warehouseTypes,
  bankTypes,
  exchangeTypes,
  eWalletTypes,
} from "../src/db/schema/index.ts";
import { getNextCategorySequence } from "../src/middleware/sequencing.ts";

async function syncFundSubTypes() {
  const rows = await db
    .select({
      accountId: funds.accountId,
      fundTypeId: funds.subTypeId,
      fundTypeKey: funds.fundType,
      businessId: funds.businessId,
    })
    .from(funds)
    .where(isNotNull(funds.accountId));

  let synced = 0;
  for (const row of rows) {
    if (!row.accountId) continue;
    let subTypeId = row.fundTypeId && Number.isInteger(row.fundTypeId) ? Number(row.fundTypeId) : null;
    let subType = typeof row.fundTypeKey === 'string' && row.fundTypeKey.trim() ? row.fundTypeKey.trim() : null;

    if (!subTypeId && subType) {
      const [fundTypeRow] = await db
        .select({ id: fundTypes.id })
        .from(fundTypes)
        .where(and(eq(fundTypes.businessId, row.businessId), eq(fundTypes.subTypeKey, subType)))
        .limit(1);
      if (fundTypeRow) {
        subTypeId = Number(fundTypeRow.id);
        await db.update(funds).set({ subTypeId, updatedAt: new Date() }).where(eq(funds.accountId, row.accountId));
      }
    }

    if (subTypeId || subType) {
      await db
        .update(accounts)
        .set({ subTypeId, subType, updatedAt: new Date() })
        .where(and(eq(accounts.id, row.accountId), eq(accounts.accountType, "fund")));
      synced++;
    }
  }

  return synced;
}

async function syncSupplierSubTypes() {
  const rows = await db
    .select({
      accountId: suppliers.accountId,
      supplierTypeId: suppliers.supplierTypeId,
      category: suppliers.category,
      businessId: suppliers.businessId,
    })
    .from(suppliers)
    .where(isNotNull(suppliers.accountId));

  let synced = 0;
  for (const row of rows) {
    if (!row.accountId) continue;
    let subTypeId =
      row.supplierTypeId && Number.isInteger(row.supplierTypeId) ? Number(row.supplierTypeId) : null;
    const subType = typeof row.category === 'string' && row.category.trim() ? row.category.trim() : null;

    if (!subTypeId && subType) {
      const [st] = await db
        .select({ id: supplierTypes.id })
        .from(supplierTypes)
        .where(and(eq(supplierTypes.businessId, row.businessId), eq(supplierTypes.subTypeKey, subType)))
        .limit(1);
      if (st) {
        subTypeId = Number(st.id);
        await db.update(suppliers).set({ supplierTypeId: subTypeId, updatedAt: new Date() }).where(eq(suppliers.accountId, row.accountId));
      }
    }

    if (subTypeId || subType) {
      await db
        .update(accounts)
        .set({ subTypeId, subType, updatedAt: new Date() })
        .where(and(eq(accounts.id, row.accountId), eq(accounts.accountType, "supplier")));
      synced++;
    }
  }

  const orphanSupplierAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      subType: accounts.subType,
    })
    .from(accounts)
    .leftJoin(suppliers, eq(suppliers.accountId, accounts.id))
    .where(and(eq(accounts.accountType, "supplier"), eq(accounts.isLeafAccount, true), isNull(accounts.subTypeId), isNull(suppliers.id)));

  for (const acc of orphanSupplierAccounts) {
    const subType = typeof acc.subType === 'string' && acc.subType.trim() ? acc.subType.trim() : 'legacy_supplier';
    let [st] = await db
      .select({ id: supplierTypes.id })
      .from(supplierTypes)
      .where(and(eq(supplierTypes.businessId, acc.businessId), eq(supplierTypes.subTypeKey, subType)))
      .limit(1);

    if (!st) {
      const seq = await getNextCategorySequence(acc.businessId, 'fund', db as any);
      [st] = await db
        .insert(supplierTypes)
        .values({
          businessId: acc.businessId,
          name: subType,
          subTypeKey: subType,
          sequenceNumber: seq,
          icon: 'local_shipping',
          color: '#f97316',
          isActive: true,
        })
        .returning({ id: supplierTypes.id });
    }

    if (st) {
      await db.update(accounts).set({ subTypeId: st.id, subType, updatedAt: new Date() }).where(eq(accounts.id, acc.id));
      synced++;
    }
  }

  return synced;
}

async function syncWarehouseSubTypes() {
  const rows = await db
    .select({
      accountId: warehouses.accountId,
      warehouseTypeId: warehouses.subTypeId,
      subType: warehouses.subType,
      businessId: warehouses.businessId,
    })
    .from(warehouses)
    .where(isNotNull(warehouses.accountId));

  let synced = 0;
  for (const row of rows) {
    if (!row.accountId) continue;
    let subTypeId =
      row.warehouseTypeId && Number.isInteger(row.warehouseTypeId) ? Number(row.warehouseTypeId) : null;
    const subType = typeof row.subType === 'string' && row.subType.trim() ? row.subType.trim() : null;

    if (!subTypeId && subType) {
      const [wt] = await db
        .select({ id: warehouseTypes.id })
        .from(warehouseTypes)
        .where(and(eq(warehouseTypes.businessId, row.businessId), eq(warehouseTypes.subTypeKey, subType)))
        .limit(1);
      if (wt) {
        subTypeId = Number(wt.id);
        await db.update(warehouses).set({ subTypeId, updatedAt: new Date() }).where(eq(warehouses.accountId, row.accountId));
      }
    }

    if (subTypeId || subType) {
      await db
        .update(accounts)
        .set({ subTypeId, subType, updatedAt: new Date() })
        .where(and(eq(accounts.id, row.accountId), eq(accounts.accountType, "warehouse")));
      synced++;
    }
  }

  const orphanWarehouseAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      subType: accounts.subType,
    })
    .from(accounts)
    .leftJoin(warehouses, eq(warehouses.accountId, accounts.id))
    .where(and(eq(accounts.accountType, "warehouse"), eq(accounts.isLeafAccount, true), isNull(accounts.subTypeId), isNull(warehouses.id)));

  for (const acc of orphanWarehouseAccounts) {
    const subType = typeof acc.subType === 'string' && acc.subType.trim() ? acc.subType.trim() : 'default_warehouse';
    let [wt] = await db
      .select({ id: warehouseTypes.id })
      .from(warehouseTypes)
      .where(and(eq(warehouseTypes.businessId, acc.businessId), eq(warehouseTypes.subTypeKey, subType)))
      .limit(1);

    if (!wt) {
      const seq = await getNextCategorySequence(acc.businessId, 'warehouse', db as any);
      [wt] = await db
        .insert(warehouseTypes)
        .values({
          businessId: acc.businessId,
          name: subType,
          subTypeKey: subType,
          sequenceNumber: seq,
          icon: 'warehouse',
          color: '#4CAF50',
          isActive: true,
        })
        .returning({ id: warehouseTypes.id });
    }

    if (wt) {
      await db.update(accounts).set({ subTypeId: wt.id, subType, updatedAt: new Date() }).where(eq(accounts.id, acc.id));
      synced++;
    }
  }

  return synced;
}

async function syncBankingSubTypes() {
  const bankingAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      accountType: accounts.accountType,
      subType: accounts.subType,
      subTypeId: accounts.subTypeId,
    })
    .from(accounts)
    .where(
      and(
        inArray(accounts.accountType, ["bank", "exchange", "e_wallet"] as any),
        eq(accounts.isLeafAccount, true),
        isNull(accounts.subTypeId),
      ),
    );

  let synced = 0;
  for (const acc of bankingAccounts) {
    if (!acc.subType || typeof acc.subType !== 'string' || !acc.subType.trim()) continue;
    const subTypeKey = acc.subType.trim();
    let resolvedId: number | null = null;

    if (acc.accountType === "bank") {
      const [bt] = await db
        .select({ id: bankTypes.id })
        .from(bankTypes)
        .where(and(eq(bankTypes.businessId, acc.businessId), eq(bankTypes.subTypeKey, subTypeKey)))
        .limit(1);
      resolvedId = bt ? Number(bt.id) : null;
    } else if (acc.accountType === "exchange") {
      const [et] = await db
        .select({ id: exchangeTypes.id })
        .from(exchangeTypes)
        .where(and(eq(exchangeTypes.businessId, acc.businessId), eq(exchangeTypes.subTypeKey, subTypeKey)))
        .limit(1);
      resolvedId = et ? Number(et.id) : null;
    } else if (acc.accountType === "e_wallet") {
      const [wt] = await db
        .select({ id: eWalletTypes.id })
        .from(eWalletTypes)
        .where(and(eq(eWalletTypes.businessId, acc.businessId), eq(eWalletTypes.subTypeKey, subTypeKey)))
        .limit(1);
      resolvedId = wt ? Number(wt.id) : null;
    }

    if (resolvedId) {
      await db
        .update(accounts)
        .set({ subTypeId: resolvedId, updatedAt: new Date() })
        .where(eq(accounts.id, acc.id));
      synced++;
    }
  }

  return synced;
}

async function run() {
  const fundsSynced = await syncFundSubTypes();
  const suppliersSynced = await syncSupplierSubTypes();
  const warehousesSynced = await syncWarehouseSubTypes();
  const bankingSynced = await syncBankingSubTypes();

  console.log(
    JSON.stringify(
      {
        fundAccountsSynced: fundsSynced,
        supplierAccountsSynced: suppliersSynced,
        warehouseAccountsSynced: warehousesSynced,
        bankingAccountsSynced: bankingSynced,
        total: fundsSynced + suppliersSynced + warehousesSynced + bankingSynced,
      },
      null,
      2,
    ),
  );
}

try {
  await run();
} catch (error) {
  console.error("Failed to sync accounts subTypes:", error);
  process.exit(1);
}
