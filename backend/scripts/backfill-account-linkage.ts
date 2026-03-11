import 'dotenv/config';
import { and, eq, isNull } from 'drizzle-orm';
import { db } from '../src/db/index.ts';
import { accountSubNatures, accounts, funds, suppliers, employeeBillingAccounts, warehouses, businessPartners, employees } from '../src/db/schema/index.ts';

async function getNatureId(businessId: number, natureKey: string): Promise<number | null> {
  const [row] = await db.select({ id: accountSubNatures.id }).from(accountSubNatures).where(and(eq(accountSubNatures.businessId, businessId), eq(accountSubNatures.natureKey, natureKey))).limit(1);
  return row?.id ?? null;
}

async function createLinkedAccount(businessId: number, name: string, accountType: any, code?: string | null, sequenceNumber?: number | null, accountSubNatureId?: number | null) {
  const [row] = await db.insert(accounts).values({ businessId, name, accountType, accountSubNatureId: accountSubNatureId ?? null, isLeafAccount: true, code: code || null, sequenceNumber: sequenceNumber || null }).returning();
  return row;
}

async function run() {
  const missingFunds = await db.select().from(funds).where(isNull(funds.accountId));
  for (const f of missingFunds) {
    const natureId = await getNatureId(f.businessId, 'fund');
    const acc = await createLinkedAccount(f.businessId, f.name, 'fund', f.code, f.sequenceNumber, natureId);
    await db.update(funds).set({ accountId: acc.id, updatedAt: new Date() }).where(eq(funds.id, f.id));
  }

  const missingSuppliers = await db.select().from(suppliers).where(isNull(suppliers.accountId));
  for (const s of missingSuppliers) {
    const natureId = await getNatureId(s.businessId, 'supplier');
    const acc = await createLinkedAccount(s.businessId, s.name, 'supplier', s.code, s.sequenceNumber, natureId);
    await db.update(suppliers).set({ accountId: acc.id, updatedAt: new Date() }).where(eq(suppliers.id, s.id));
  }

  const missingWarehouses = await db.select().from(warehouses).where(isNull(warehouses.accountId));
  for (const w of missingWarehouses) {
    const natureId = await getNatureId(w.businessId, 'warehouse');
    const acc = await createLinkedAccount(w.businessId, w.name, 'warehouse', w.code, w.sequenceNumber, natureId);
    await db.update(warehouses).set({ accountId: acc.id, updatedAt: new Date() }).where(eq(warehouses.id, w.id));
  }

  const billingRows = await db.select().from(employeeBillingAccounts).where(isNull(employeeBillingAccounts.accountId));
  for (const b of billingRows) {
    const [employeeRow] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, b.employeeId)).limit(1);
    const businessId = employeeRow?.businessId;
    if (!businessId) continue;
    const natureId = await getNatureId(businessId, 'billing');
    const acc = await createLinkedAccount(businessId, b.label, 'billing', null, null, natureId);
    await db.update(employeeBillingAccounts).set({ accountId: acc.id }).where(eq(employeeBillingAccounts.id, b.id));
  }

  const partnerRows = await db.select().from(businessPartners).where(isNull(businessPartners.accountId));
  for (const p of partnerRows) {
    const natureId = await getNatureId(p.businessId, 'partner');
    const acc = await createLinkedAccount(p.businessId, p.fullName, 'partner', p.code, p.sequenceNumber, natureId);
    await db.update(businessPartners).set({ accountId: acc.id }).where(eq(businessPartners.id, p.id));
  }

  console.log('backfill-account-linkage completed');
}

run().catch((err) => { console.error(err); process.exit(1); });
