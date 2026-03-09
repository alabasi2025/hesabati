import { and, eq, or } from "drizzle-orm";
import { db } from "../src/db/index.ts";
import {
  accounts,
  accountingTypes,
  businessPartners,
  departments,
  eWalletTypes,
  employees,
  funds,
  fundTypes,
  supplierTypes,
  suppliers,
} from "../src/db/schema/index.ts";
import {
  TYPE_PREFIXES,
  generateItemCode,
  getNextAccountSequence,
  getNextSequence,
  getNextSubTypeSequence,
} from "../src/middleware/sequencing.ts";

type Counters = {
  partnersNormalized: number;
  suppliersNormalized: number;
  employeesNormalized: number;
  partnersCreated: number;
  partnersLinked: number;
  suppliersCreated: number;
  suppliersLinked: number;
  employeesCreated: number;
  fundsNormalized: number;
  fundsNumbered: number;
  fundTypesCreated: number;
  fundTypeSeqFixed: number;
  legacyAccountsMigrated: number;
  supplierAccountsSynced: number;
  employeeAccountsSynced: number;
  partnerAccountsSynced: number;
};

function roleToSubTypeId(role: string): number {
  let hash = 0;
  for (let i = 0; i < role.length; i += 1) {
    const code = role.codePointAt(i) ?? 0;
    hash = Math.trunc(((hash << 5) - hash) + code);
  }
  return Math.abs(hash) + 1;
}

const LEGACY_FUND_TYPE_META: Record<string, { name: string; icon: string; color: string }> = {
  collection: { name: "تحصيل وتوريد", icon: "savings", color: "#4CAF50" },
  salary_advance: { name: "سلف", icon: "request_quote", color: "#FF9800" },
  custody: { name: "عهدة", icon: "lock", color: "#607D8B" },
  safe: { name: "خزنة", icon: "account_balance_wallet", color: "#009688" },
  expense: { name: "مصروفات", icon: "payments", color: "#E91E63" },
  deposit: { name: "إيداع", icon: "move_to_inbox", color: "#2196F3" },
  personal: { name: "شخصي", icon: "person", color: "#795548" },
};

function isValidFundTypeKey(key: string): boolean {
  return Object.hasOwn(LEGACY_FUND_TYPE_META, key);
}

async function ensureFundTypeForBusiness(
  businessId: number,
  subTypeKey: string,
  counters: Counters,
): Promise<number> {
  const [existing] = await db
    .select()
    .from(fundTypes)
    .where(and(eq(fundTypes.businessId, businessId), eq(fundTypes.subTypeKey, subTypeKey)));
  if (existing) return existing.id;

  const meta = LEGACY_FUND_TYPE_META[subTypeKey] ?? LEGACY_FUND_TYPE_META.collection;
  const sequenceNumber = await getNextSubTypeSequence(businessId, "fund");
  const [created] = await db
    .insert(fundTypes)
    .values({
      businessId,
      name: meta.name,
      subTypeKey,
      sequenceNumber,
      description: "تم إنشاؤه تلقائيًا لمواءمة بيانات الصناديق القديمة",
      icon: meta.icon,
      color: meta.color,
      isActive: true,
    })
    .returning();
  counters.fundTypesCreated += 1;
  return created.id;
}

async function allocateUniqueFundNumber(
  businessId: number,
  typeId: number,
  currentFundId: number,
): Promise<{ sequenceNumber: number; code: string }> {
  while (true) {
    const seq = await getNextSequence(businessId, "fund_in_type", typeId, 0);
    const code = generateItemCode(TYPE_PREFIXES.fund || "FND", seq);
    const conflicts = await db
      .select({ id: funds.id })
      .from(funds)
      .where(
        and(
          eq(funds.businessId, businessId),
          or(
            eq(funds.code, code),
            and(eq(funds.subTypeId, typeId), eq(funds.sequenceNumber, seq)),
          ),
        ),
      );
    const hasConflict = conflicts.some((c) => c.id !== currentFundId);
    if (!hasConflict) return { sequenceNumber: seq, code };
  }
}

async function normalizeLegacyFunds(counters: Counters) {
  const rows = await db.select().from(funds);
  for (const row of rows) {
    const rawKey = String((row as any).fundType || "").trim();
    const normalizedKey = isValidFundTypeKey(rawKey) ? rawKey : "collection";
    const typeId = await ensureFundTypeForBusiness(row.businessId, normalizedKey, counters);

    const updates: Record<string, unknown> = {};
    if (rawKey !== normalizedKey) {
      updates.fundType = normalizedKey;
      counters.fundsNormalized += 1;
    }
    if (!Number.isInteger(row.subTypeId) || Number(row.subTypeId) <= 0) {
      updates.subTypeId = typeId;
    }

    const currentSeq = Number(row.sequenceNumber);
    const hasValidSeq = Number.isInteger(currentSeq) && currentSeq > 0;
    const hasCode = typeof row.code === "string" && row.code.trim().length > 0;
    if (!hasValidSeq) {
      const allocated = await allocateUniqueFundNumber(row.businessId, typeId, row.id);
      updates.sequenceNumber = allocated.sequenceNumber;
      updates.code = allocated.code;
      counters.fundsNumbered += 1;
    } else if (!hasCode) {
      const candidate = generateItemCode(TYPE_PREFIXES.fund || "FND", currentSeq);
      const existingCode = await db
        .select({ id: funds.id })
        .from(funds)
        .where(and(eq(funds.businessId, row.businessId), eq(funds.code, candidate)));
      const codeTaken = existingCode.some((c) => c.id !== row.id);
      if (codeTaken) {
        const allocated = await allocateUniqueFundNumber(row.businessId, typeId, row.id);
        updates.sequenceNumber = allocated.sequenceNumber;
        updates.code = allocated.code;
      } else {
        updates.code = candidate;
      }
      counters.fundsNumbered += 1;
    }

    if (Object.keys(updates).length > 0) {
      updates.updatedAt = new Date();
      await db.update(funds).set(updates as any).where(eq(funds.id, row.id));
    }
  }
}

async function normalizeFundTypeSequences(counters: Counters) {
  const rows = await db.select().from(fundTypes);
  const byBusiness = new Map<number, typeof rows>();
  for (const row of rows) {
    if (!byBusiness.has(row.businessId)) byBusiness.set(row.businessId, []);
    byBusiness.get(row.businessId)!.push(row);
  }

  for (const [, types] of byBusiness) {
    const sorted = [...types].sort((a, b) => {
      const aSeq = Number.isInteger(a.sequenceNumber) ? Number(a.sequenceNumber) : Number.MAX_SAFE_INTEGER;
      const bSeq = Number.isInteger(b.sequenceNumber) ? Number(b.sequenceNumber) : Number.MAX_SAFE_INTEGER;
      if (aSeq !== bSeq) return aSeq - bSeq;
      return a.id - b.id;
    });

    let nextSeq = 1;
    for (const row of sorted) {
      if (row.sequenceNumber !== nextSeq) {
        await db
          .update(fundTypes)
          .set({ sequenceNumber: nextSeq, updatedAt: new Date() })
          .where(eq(fundTypes.id, row.id));
        counters.fundTypeSeqFixed += 1;
      }
      nextSeq += 1;
    }
  }
}

async function ensureEWalletTypeForBusiness(
  businessId: number,
  subTypeKey: string,
): Promise<number> {
  const [existing] = await db
    .select()
    .from(eWalletTypes)
    .where(and(eq(eWalletTypes.businessId, businessId), eq(eWalletTypes.subTypeKey, subTypeKey)));
  if (existing) return existing.id;

  const seq = await getNextSubTypeSequence(businessId, "e_wallet");
  const [created] = await db
    .insert(eWalletTypes)
    .values({
      businessId,
      name: "محفظة خدمة - قديم",
      subTypeKey,
      sequenceNumber: seq,
      description: "تم إنشاؤه تلقائيًا لترحيل نوع service القديم",
      icon: "account_balance_wallet",
      color: "#8b5cf6",
      isActive: true,
    })
    .returning();
  return created.id;
}

async function ensureAccountingTypeForBusiness(
  businessId: number,
  subTypeKey: string,
): Promise<number> {
  const [existing] = await db
    .select()
    .from(accountingTypes)
    .where(and(eq(accountingTypes.businessId, businessId), eq(accountingTypes.subTypeKey, subTypeKey)));
  if (existing) return existing.id;

  const seq = await getNextSubTypeSequence(businessId, "operation");
  const [created] = await db
    .insert(accountingTypes)
    .values({
      businessId,
      name: "نوع محاسبي - ترحيل قديم",
      subTypeKey,
      sequenceNumber: seq,
      description: "تم إنشاؤه تلقائيًا لترحيل intermediary القديم",
      icon: "book",
      color: "#14b8a6",
      isActive: true,
    })
    .returning();
  return created.id;
}

async function allocateUniqueAccountNumber(
  businessId: number,
  accountType: string,
  subTypeId: number,
  currentAccountId: number,
): Promise<{ sequenceNumber: number; code: string }> {
  while (true) {
    const sequenceNumber = await getNextAccountSequence(businessId, accountType, subTypeId);
    const code = generateItemCode(TYPE_PREFIXES[accountType] || "ACC", sequenceNumber);
    const conflicts = await db
      .select({ id: accounts.id })
      .from(accounts)
      .where(
        and(
          eq(accounts.businessId, businessId),
          or(
            eq(accounts.code, code),
            and(eq(accounts.accountType, accountType as any), eq(accounts.subTypeId, subTypeId), eq(accounts.sequenceNumber, sequenceNumber)),
          ),
        ),
      );
    const hasConflict = conflicts.some((c) => c.id !== currentAccountId);
    if (!hasConflict) return { sequenceNumber, code };
  }
}

async function normalizeLegacyAccountTypes(counters: Counters) {
  const rows = await db.select().from(accounts);
  for (const row of rows as any[]) {
    const legacyType = String(row.accountType || "").trim();
    if (!["cash", "service", "intermediary"].includes(legacyType)) continue;

    let newType = legacyType;
    let newSubTypeKey = "";
    let newSubTypeId = 0;

    if (legacyType === "cash") {
      newType = "fund";
      const subTypeText = String(row.subType || "").toLowerCase();
      newSubTypeKey = subTypeText.includes("خزن") ? "safe" : "collection";
      newSubTypeId = await ensureFundTypeForBusiness(row.businessId, newSubTypeKey, counters);
    } else if (legacyType === "service") {
      newType = "e_wallet";
      newSubTypeKey = "legacy_service_wallet";
      newSubTypeId = await ensureEWalletTypeForBusiness(row.businessId, newSubTypeKey);
    } else if (legacyType === "intermediary") {
      newType = "accounting";
      newSubTypeKey = "legacy_intermediary";
      newSubTypeId = await ensureAccountingTypeForBusiness(row.businessId, newSubTypeKey);
    }

    const numbering = await allocateUniqueAccountNumber(row.businessId, newType, newSubTypeId, row.id);
    await db
      .update(accounts)
      .set({
        accountType: newType as any,
        subType: newSubTypeKey,
        subTypeId: newSubTypeId,
        sequenceNumber: numbering.sequenceNumber,
        code: numbering.code,
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, row.id));

    counters.legacyAccountsMigrated += 1;
  }
}

async function ensureLegacySupplierType(businessId: number): Promise<number> {
  const [existing] = await db
    .select()
    .from(supplierTypes)
    .where(and(eq(supplierTypes.businessId, businessId), eq(supplierTypes.subTypeKey, "legacy_supplier")));
  if (existing) return existing.id;

  const [created] = await db
    .insert(supplierTypes)
    .values({
      businessId,
      name: "تصنيف قديم - مورد عام",
      subTypeKey: "legacy_supplier",
      description: "تم إنشاؤه تلقائيًا لمعالجة البيانات القديمة وإلزام التصنيف",
      icon: "local_shipping",
      color: "#f97316",
      isActive: true,
    })
    .returning();
  return created.id;
}

async function ensureLegacyDepartment(businessId: number): Promise<number> {
  const [existing] = await db
    .select()
    .from(departments)
    .where(and(eq(departments.businessId, businessId), eq(departments.code, "LEGACY")));
  if (existing) return existing.id;

  const [created] = await db
    .insert(departments)
    .values({
      businessId,
      name: "قسم قديم - عام",
      code: "LEGACY",
      description: "تم إنشاؤه تلقائيًا لمعالجة البيانات القديمة وإلزام التصنيف",
      icon: "groups",
      color: "#06b6d4",
      isActive: true,
    })
    .returning();
  return created.id;
}

async function normalizeLegacyPartyData(counters: Counters) {
  const supplierRows = await db.select().from(suppliers);
  for (const row of supplierRows) {
    if (Number.isInteger(row.supplierTypeId) && Number(row.supplierTypeId) > 0) continue;
    const legacyTypeId = await ensureLegacySupplierType(row.businessId);
    await db
      .update(suppliers)
      .set({
        supplierTypeId: legacyTypeId,
        category: row.category?.trim() ? row.category : "legacy_supplier",
        updatedAt: new Date(),
      })
      .where(eq(suppliers.id, row.id));
    counters.suppliersNormalized += 1;
  }

  const employeeRows = await db.select().from(employees);
  for (const row of employeeRows) {
    if (Number.isInteger(row.departmentId) && Number(row.departmentId) > 0) continue;
    const legacyDepartmentId = await ensureLegacyDepartment(row.businessId);
    await db
      .update(employees)
      .set({
        departmentId: legacyDepartmentId,
        department: row.department?.trim() ? row.department : "legacy_department",
        updatedAt: new Date(),
      })
      .where(eq(employees.id, row.id));
    counters.employeesNormalized += 1;
  }

  const partnerRows = await db.select().from(businessPartners);
  for (const row of partnerRows) {
    const role = (row.role || "").trim();
    if (role) continue;
    await db
      .update(businessPartners)
      .set({
        role: "legacy_partner",
      })
      .where(eq(businessPartners.id, row.id));
    counters.partnersNormalized += 1;
  }
}

async function ensureSupplierAccounts(counters: Counters) {
  const rows = await db.select().from(suppliers);
  for (const supplier of rows) {
    const supplierTypeId = Number(supplier.supplierTypeId);
    if (!Number.isInteger(supplierTypeId) || supplierTypeId <= 0) continue;

    const existingById = supplier.accountId
      ? await db
          .select()
          .from(accounts)
          .where(and(eq(accounts.id, supplier.accountId), eq(accounts.businessId, supplier.businessId), eq(accounts.accountType, "supplier")))
      : [];

    if (existingById.length === 0) {
      const [created] = await db.transaction(async (tx) => {
        const seq = await getNextAccountSequence(supplier.businessId, "supplier", supplierTypeId, tx);
        const [newAccount] = await tx
          .insert(accounts)
          .values({
            businessId: supplier.businessId,
            name: `حساب مورد - ${supplier.name}`.trim(),
            accountType: "supplier",
            subType: supplier.category || "legacy_supplier",
            subTypeId: supplierTypeId,
            sequenceNumber: seq,
            code: generateItemCode(TYPE_PREFIXES.supplier || "SUP", seq),
            isActive: supplier.isActive,
            notes: supplier.notes ?? null,
          })
          .returning();

        await tx
          .update(suppliers)
          .set({ accountId: newAccount.id, updatedAt: new Date() })
          .where(eq(suppliers.id, supplier.id));

        return [newAccount] as const;
      });

      if (created) {
        counters.suppliersCreated += 1;
        counters.suppliersLinked += 1;
      }
      continue;
    }

    await db
      .update(accounts)
      .set({
        name: `حساب مورد - ${supplier.name}`.trim(),
        subType: supplier.category || "legacy_supplier",
        subTypeId: supplierTypeId,
        notes: supplier.notes ?? null,
        isActive: supplier.isActive,
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, existingById[0].id));
    counters.supplierAccountsSynced += 1;
  }
}

async function ensureEmployeeAccounts(counters: Counters) {
  const rows = await db.select().from(employees);
  for (const employee of rows) {
    const departmentId = Number(employee.departmentId);
    if (!Number.isInteger(departmentId) || departmentId <= 0) {
      continue;
    }
    const existing = await db
      .select()
      .from(accounts)
      .where(
        and(
          eq(accounts.businessId, employee.businessId),
          eq(accounts.accountType, "employee"),
          eq(accounts.linkedEmployeeId, employee.id),
        ),
      );

    if (existing.length === 0) {
      await db.transaction(async (tx) => {
        const seq = await getNextAccountSequence(employee.businessId, "employee", departmentId, tx);
        await tx.insert(accounts).values({
          businessId: employee.businessId,
          name: `حساب موظف - ${employee.fullName}`.trim(),
          accountType: "employee",
          subType: employee.department || "legacy_department",
          subTypeId: departmentId,
          linkedEmployeeId: employee.id,
          sequenceNumber: seq,
          code: generateItemCode(TYPE_PREFIXES.employee || "EMP", seq),
          isActive: employee.status === "active",
          notes: employee.notes ?? null,
        });
      });
      counters.employeesCreated += 1;
      continue;
    }

    await db
      .update(accounts)
      .set({
        name: `حساب موظف - ${employee.fullName}`.trim(),
        subType: employee.department || "legacy_department",
        subTypeId: departmentId,
        notes: employee.notes ?? null,
        isActive: employee.status === "active",
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, existing[0].id));
    counters.employeeAccountsSynced += 1;
  }
}

async function ensurePartnerAccounts(counters: Counters) {
  const rows = await db.select().from(businessPartners);
  for (const partner of rows) {
    const roleText = (partner.role || "").trim();
    if (!roleText) continue;

    const existingById = partner.accountId
      ? await db
          .select()
          .from(accounts)
          .where(and(eq(accounts.id, partner.accountId), eq(accounts.businessId, partner.businessId), eq(accounts.accountType, "partner")))
      : [];

    const roleSubTypeId = roleToSubTypeId(roleText);

    if (existingById.length === 0) {
      const [created] = await db.transaction(async (tx) => {
        const seq = await getNextAccountSequence(partner.businessId, "partner", roleSubTypeId, tx);
        const [newAccount] = await tx
          .insert(accounts)
          .values({
            businessId: partner.businessId,
            name: `حساب شريك - ${partner.fullName}`.trim(),
            accountType: "partner",
            subType: roleText,
            subTypeId: roleSubTypeId,
            sequenceNumber: seq,
            code: generateItemCode(TYPE_PREFIXES.partner || "PRT", seq),
            isActive: partner.isActive,
            notes: partner.notes ?? null,
          })
          .returning();

        await tx
          .update(businessPartners)
          .set({ accountId: newAccount.id })
          .where(eq(businessPartners.id, partner.id));

        return [newAccount] as const;
      });

      if (created) {
        counters.partnersCreated += 1;
        counters.partnersLinked += 1;
      }
      continue;
    }

    await db
      .update(accounts)
      .set({
        name: `حساب شريك - ${partner.fullName}`.trim(),
        subType: roleText,
        subTypeId: roleSubTypeId,
        notes: partner.notes ?? null,
        isActive: partner.isActive,
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, existingById[0].id));
    counters.partnerAccountsSynced += 1;
  }
}

async function main() {
  const counters: Counters = {
    partnersNormalized: 0,
    suppliersNormalized: 0,
    employeesNormalized: 0,
    partnersCreated: 0,
    partnersLinked: 0,
    suppliersCreated: 0,
    suppliersLinked: 0,
    employeesCreated: 0,
    fundsNormalized: 0,
    fundsNumbered: 0,
    fundTypesCreated: 0,
    fundTypeSeqFixed: 0,
    legacyAccountsMigrated: 0,
    supplierAccountsSynced: 0,
    employeeAccountsSynced: 0,
    partnerAccountsSynced: 0,
  };

  await normalizeLegacyPartyData(counters);
  await normalizeLegacyFunds(counters);
  await normalizeFundTypeSequences(counters);
  await normalizeLegacyAccountTypes(counters);
  await ensureSupplierAccounts(counters);
  await ensureEmployeeAccounts(counters);
  await ensurePartnerAccounts(counters);

  console.log("Legacy classification + linked accounts migration completed:");
  console.log(JSON.stringify(counters, null, 2));
}

try {
  await main();
  process.exit(0);
} catch (error) {
  console.error("Failed to backfill linked accounts:", error);
  process.exit(1);
}
