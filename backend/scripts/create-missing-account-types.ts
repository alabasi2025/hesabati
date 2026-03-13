import "dotenv/config";
import { and, eq, isNull } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import {
  accounts,
  warehouses,
  warehouseTypes,
  bankTypes,
  exchangeTypes,
  eWalletTypes,
} from "../src/db/schema/index.ts";
import { getNextCategorySequence } from "../src/middleware/sequencing.ts";

async function createWarehouseTypes() {
  const orphanWarehouses = await db
    .select({
      id: warehouses.id,
      businessId: warehouses.businessId,
      subType: warehouses.subType,
      subTypeId: warehouses.subTypeId,
    })
    .from(warehouses)
    .where(isNull(warehouses.subTypeId));

  let updated = 0;
  const created = new Map<string, number>();

  for (const wh of orphanWarehouses) {
    const subType =
      typeof wh.subType === 'string' && wh.subType.trim() ? wh.subType.trim() : 'default_warehouse';

    const cacheKey = `${wh.businessId}-${subType}`;
    let typeId = created.get(cacheKey);

    if (!typeId) {
      const [existing] = await db
        .select({ id: warehouseTypes.id })
        .from(warehouseTypes)
        .where(and(eq(warehouseTypes.businessId, wh.businessId), eq(warehouseTypes.subTypeKey, subType)))
        .limit(1);

      if (existing) {
        typeId = Number(existing.id);
      } else {
        const seq = await getNextCategorySequence(wh.businessId, 'warehouse', db as any);
        const [createdType] = await db
          .insert(warehouseTypes)
          .values({
            businessId: wh.businessId,
            name: subType,
            subTypeKey: subType,
            sequenceNumber: seq,
            icon: 'warehouse',
            color: '#4CAF50',
            isActive: true,
            description: 'تم إنشاؤه تلقائياً من البيانات القديمة',
          })
          .returning({ id: warehouseTypes.id });
        typeId = Number(createdType.id);
      }

      created.set(cacheKey, typeId);
    }

    await db
      .update(warehouses)
      .set({ subTypeId: typeId, updatedAt: new Date() })
      .where(eq(warehouses.id, wh.id));
    updated++;
  }

  return { updated, typesCreated: created.size };
}

async function createBankingTypes() {
  const bankAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      accountType: accounts.accountType,
      subType: accounts.subType,
    })
    .from(accounts)
    .where(and(eq(accounts.accountType, 'bank' as any), eq(accounts.isLeafAccount, true), isNull(accounts.subTypeId)));

  let bankTypesCreated = 0;
  const created = new Map<string, number>();

  for (const acc of bankAccounts) {
    const subType =
      typeof acc.subType === 'string' && acc.subType.trim() ? acc.subType.trim() : 'default_bank';

    const cacheKey = `${acc.businessId}-${subType}`;
    let typeId = created.get(cacheKey);

    if (!typeId) {
      const [existing] = await db
        .select({ id: bankTypes.id })
        .from(bankTypes)
        .where(and(eq(bankTypes.businessId, acc.businessId), eq(bankTypes.subTypeKey, subType)))
        .limit(1);

      if (existing) {
        typeId = Number(existing.id);
      } else {
        const seq = await getNextCategorySequence(acc.businessId, 'bank', db as any);
        const [createdType] = await db
          .insert(bankTypes)
          .values({
            businessId: acc.businessId,
            name: subType,
            subTypeKey: subType,
            sequenceNumber: seq,
            icon: 'account_balance',
            color: '#2196F3',
            isActive: true,
            description: 'تم إنشاؤه تلقائياً من البيانات القديمة',
          })
          .returning({ id: bankTypes.id });
        typeId = Number(createdType.id);
      }

      created.set(cacheKey, typeId);
    }

    await db
      .update(accounts)
      .set({ subTypeId: typeId, updatedAt: new Date() })
      .where(eq(accounts.id, acc.id));
    bankTypesCreated++;
  }

  const walletAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      accountType: accounts.accountType,
      subType: accounts.subType,
    })
    .from(accounts)
    .where(and(eq(accounts.accountType, 'e_wallet' as any), eq(accounts.isLeafAccount, true), isNull(accounts.subTypeId)));

  let walletTypesCreated = 0;

  for (const acc of walletAccounts) {
    const subType =
      typeof acc.subType === 'string' && acc.subType.trim() ? acc.subType.trim() : 'default_wallet';

    const cacheKey = `${acc.businessId}-${subType}`;
    let typeId = created.get(cacheKey);

    if (!typeId) {
      const [existing] = await db
        .select({ id: eWalletTypes.id })
        .from(eWalletTypes)
        .where(and(eq(eWalletTypes.businessId, acc.businessId), eq(eWalletTypes.subTypeKey, subType)))
        .limit(1);

      if (existing) {
        typeId = Number(existing.id);
      } else {
        const seq = await getNextCategorySequence(acc.businessId, 'e_wallet', db as any);
        const [createdType] = await db
          .insert(eWalletTypes)
          .values({
            businessId: acc.businessId,
            name: subType,
            subTypeKey: subType,
            sequenceNumber: seq,
            icon: 'account_balance_wallet',
            color: '#00BCD4',
            isActive: true,
            description: 'تم إنشاؤه تلقائياً من البيانات القديمة',
          })
          .returning({ id: eWalletTypes.id });
        typeId = Number(createdType.id);
      }

      created.set(cacheKey, typeId);
    }

    await db
      .update(accounts)
      .set({ subTypeId: typeId, updatedAt: new Date() })
      .where(eq(accounts.id, acc.id));
    walletTypesCreated++;
  }

  return { bankTypesCreated, walletTypesCreated, uniqueTypesEnsured: created.size };
}

async function run() {
  const warehouseResult = await createWarehouseTypes();
  const bankingResult = await createBankingTypes();
  const syncResult = await import("./sync-accounts-subtypes.ts");

  console.log(
    JSON.stringify(
      {
        warehouses: warehouseResult,
        banking: bankingResult,
      },
      null,
      2,
    ),
  );
}

try {
  await run();
} catch (error) {
  console.error("Failed to create missing account types:", error);
  process.exit(1);
}
