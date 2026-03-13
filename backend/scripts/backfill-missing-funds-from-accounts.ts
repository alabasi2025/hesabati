import "dotenv/config";
import { and, desc, eq, isNull } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import { accounts, fundTypes, funds, suppliers, warehouses } from "../src/db/schema/index.ts";
import {
  generateItemCode,
  getNextItemInCategorySequence,
  getNextSupplierSequence,
  TYPE_PREFIXES,
} from "../src/middleware/sequencing.ts";

type FundTypeRow = {
  id: number;
  subTypeKey: string;
  isActive: boolean;
  sequenceNumber: number | null;
};

async function ensureDefaultFundType(businessId: number): Promise<FundTypeRow> {
  const [firstType] = await db
    .select({
      id: fundTypes.id,
      subTypeKey: fundTypes.subTypeKey,
      isActive: fundTypes.isActive,
      sequenceNumber: fundTypes.sequenceNumber,
    })
    .from(fundTypes)
    .where(eq(fundTypes.businessId, businessId))
    .orderBy(fundTypes.sequenceNumber, fundTypes.sortOrder, fundTypes.id)
    .limit(1);
  if (firstType) return firstType;

  const [created] = await db
    .insert(fundTypes)
    .values({
      businessId,
      name: "صندوق",
      subTypeKey: "default_fund",
      sequenceNumber: 1,
      sortOrder: 1,
      icon: "savings",
      color: "#4CAF50",
      isActive: true,
      description: "تم إنشاؤه تلقائياً لربط حسابات الصناديق القديمة",
    })
    .returning({
      id: fundTypes.id,
      subTypeKey: fundTypes.subTypeKey,
      isActive: fundTypes.isActive,
      sequenceNumber: fundTypes.sequenceNumber,
    });

  return created;
}

async function getNextFundSequence(businessId: number, typeId: number): Promise<number> {
  const [last] = await db
    .select({ seq: funds.sequenceNumber })
    .from(funds)
    .where(and(eq(funds.businessId, businessId), eq(funds.subTypeId, typeId)))
    .orderBy(desc(funds.sequenceNumber), desc(funds.id))
    .limit(1);
  return (Number(last?.seq) || 0) + 1;
}

async function run() {
  const missingFundAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      name: accounts.name,
      subType: accounts.subType,
      code: accounts.code,
      responsiblePerson: accounts.responsiblePerson,
      notes: accounts.notes,
      isActive: accounts.isActive,
    })
    .from(accounts)
    .leftJoin(funds, eq(funds.accountId, accounts.id))
    .where(
      and(
        eq(accounts.accountType, "fund"),
        eq(accounts.isLeafAccount, true),
        isNull(funds.id),
      ),
    )
    .orderBy(accounts.businessId, accounts.id);

  let createdFundsCount = 0;
  for (const account of missingFundAccounts) {
    const types = await db
      .select({
        id: fundTypes.id,
        subTypeKey: fundTypes.subTypeKey,
        isActive: fundTypes.isActive,
        sequenceNumber: fundTypes.sequenceNumber,
      })
      .from(fundTypes)
      .where(eq(fundTypes.businessId, account.businessId))
      .orderBy(fundTypes.sequenceNumber, fundTypes.sortOrder, fundTypes.id);

    const preferredBySubtype = types.find((t) => t.subTypeKey === (account.subType || "").trim());
    const firstActive = types.find((t) => t.isActive);
    const selectedType =
      preferredBySubtype || firstActive || (types[0] ?? (await ensureDefaultFundType(account.businessId)));

    const nextSequence = await getNextFundSequence(account.businessId, selectedType.id);

    await db.insert(funds).values({
      businessId: account.businessId,
      name: account.name,
      accountId: account.id,
      fundType: selectedType.subTypeKey,
      subType: selectedType.subTypeKey,
      subTypeId: selectedType.id,
      sequenceNumber: nextSequence,
      code: account.code || null,
      responsiblePerson: account.responsiblePerson,
      notes: account.notes,
      isActive: account.isActive,
    });

    createdFundsCount += 1;
  }

  const missingSupplierAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      name: accounts.name,
      subType: accounts.subType,
      subTypeId: accounts.subTypeId,
      notes: accounts.notes,
      isActive: accounts.isActive,
    })
    .from(accounts)
    .leftJoin(suppliers, eq(suppliers.accountId, accounts.id))
    .where(
      and(
        eq(accounts.accountType, "supplier"),
        eq(accounts.isLeafAccount, true),
        isNull(suppliers.id),
      ),
    )
    .orderBy(accounts.businessId, accounts.id);

  let createdSuppliersCount = 0;
  for (const account of missingSupplierAccounts) {
    const supplierTypeId = Number(account.subTypeId);
    const hasSupplierTypeId = Number.isInteger(supplierTypeId) && supplierTypeId > 0;
    const supplierSequence = hasSupplierTypeId
      ? await getNextSupplierSequence(account.businessId, supplierTypeId, db)
      : null;

    await db.insert(suppliers).values({
      businessId: account.businessId,
      name: account.name,
      supplierTypeId: hasSupplierTypeId ? supplierTypeId : null,
      category: typeof account.subType === "string" && account.subType.trim().length > 0 ? account.subType.trim() : null,
      sequenceNumber: supplierSequence,
      code: supplierSequence ? generateItemCode(TYPE_PREFIXES.supplier || "SUP", supplierSequence) : null,
      accountId: account.id,
      notes: account.notes,
      isActive: account.isActive,
    });

    createdSuppliersCount += 1;
  }

  const missingWarehouseAccounts = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      name: accounts.name,
      subType: accounts.subType,
      subTypeId: accounts.subTypeId,
      responsiblePerson: accounts.responsiblePerson,
      notes: accounts.notes,
      isActive: accounts.isActive,
    })
    .from(accounts)
    .leftJoin(warehouses, eq(warehouses.accountId, accounts.id))
    .where(
      and(
        eq(accounts.accountType, "warehouse"),
        eq(accounts.isLeafAccount, true),
        isNull(warehouses.id),
      ),
    )
    .orderBy(accounts.businessId, accounts.id);

  let createdWarehousesCount = 0;
  for (const account of missingWarehouseAccounts) {
    const subTypeId = Number(account.subTypeId);
    const hasSubTypeId = Number.isInteger(subTypeId) && subTypeId > 0;
    const numbering = hasSubTypeId
      ? await getNextItemInCategorySequence(account.businessId, "warehouse", subTypeId, db)
      : null;

    await db.insert(warehouses).values({
      businessId: account.businessId,
      name: account.name,
      accountId: account.id,
      warehouseType: "sub",
      subType: typeof account.subType === "string" && account.subType.trim().length > 0 ? account.subType.trim() : null,
      subTypeId: hasSubTypeId ? subTypeId : null,
      sequenceNumber: numbering?.sequenceNumber ?? null,
      code: numbering?.code ?? null,
      responsiblePerson: account.responsiblePerson,
      notes: account.notes,
      isActive: account.isActive,
    });

    createdWarehousesCount += 1;
  }

  console.log(
    JSON.stringify(
      {
        scannedFunds: missingFundAccounts.length,
        createdFunds: createdFundsCount,
        scannedSuppliers: missingSupplierAccounts.length,
        createdSuppliers: createdSuppliersCount,
        scannedWarehouses: missingWarehouseAccounts.length,
        createdWarehouses: createdWarehousesCount,
      },
      null,
      2,
    ),
  );
}

try {
  await run();
} catch (error) {
  console.error("Failed to backfill missing funds from accounts:", error);
  process.exit(1);
}
