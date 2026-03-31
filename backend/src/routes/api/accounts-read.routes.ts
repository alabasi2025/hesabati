/**
 * accounts-read.routes.ts — Phase 11
 * مسارات قراءة الحسابات (قائمة + حسابات خاصة)
 */
import { Hono } from 'hono';
import { PostgresError } from 'postgres';
import { db } from '../../db/index.ts';
import { eq, and, isNotNull, desc } from 'drizzle-orm';
import {
  accounts,
  accountSubNatures,
  funds,
  suppliers,
  warehouses,
  employeeBillingAccounts,
  businessPartners,
  employees,
  billingSystemsConfig,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import {
  generateItemCode,
  generateTreeAccountCode,
  generateLeafAccountCode,
  getNextChildAccountSequence,
  getNextItemInCategorySequence,
  getNextSupplierSequence,
  TYPE_PREFIXES,
} from '../../middleware/sequencing.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { auditCreate, auditUpdate, auditDelete, makeAuditCtx } from '../../engines/audit-middleware.engine.ts';

const accountsReadRoutes = new Hono();

const NATURE_TO_ACCOUNT_TYPE: Record<string, string> = {
  fund: 'fund', bank: 'bank', e_wallet: 'e_wallet', exchange: 'exchange',
  custody: 'custody', warehouse: 'warehouse', supplier: 'supplier',
  employee: 'employee', partner: 'partner', billing: 'billing',
  intermediary: 'intermediary', budget: 'budget', settlement: 'settlement', pending: 'pending',
};

function toAccountTypeFromNature(natureKey: string): string {
  return NATURE_TO_ACCOUNT_TYPE[natureKey] || 'accounting';
}

// ===================== Endpoints مخصصة للأداء =====================


accountsReadRoutes.get('/businesses/:bizId/custody-accounts', bizAuthMiddleware(), safeHandler('جلب حسابات العهد', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(accounts)
    .innerJoin(accountSubNatures, eq(accounts.accountSubNatureId, accountSubNatures.id))
    .where(and(
      eq(accounts.businessId, bizId),
      eq(accountSubNatures.natureKey, 'custody'),
      eq(accounts.isLeafAccount, true)
    ))
    .orderBy(accounts.code);
  return c.json(rows.map(r => r.accounts));
}));

accountsReadRoutes.get('/businesses/:bizId/intermediary-accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات الوسيطة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(accounts)
    .innerJoin(accountSubNatures, eq(accounts.accountSubNatureId, accountSubNatures.id))
    .where(and(
      eq(accounts.businessId, bizId),
      eq(accountSubNatures.natureKey, 'intermediary'),
      eq(accounts.isLeafAccount, true)
    ))
    .orderBy(accounts.code);
  return c.json(rows.map(r => r.accounts));
}));

accountsReadRoutes.get('/businesses/:bizId/pending-accounts-list', bizAuthMiddleware(), safeHandler('جلب الحسابات المعلقة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(accounts)
    .innerJoin(accountSubNatures, eq(accounts.accountSubNatureId, accountSubNatures.id))
    .where(and(
      eq(accounts.businessId, bizId),
      eq(accountSubNatures.natureKey, 'pending'),
      eq(accounts.isLeafAccount, true)
    ))
    .orderBy(accounts.code);
  return c.json(rows.map(r => r.accounts));
}));

accountsReadRoutes.get('/businesses/:bizId/accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(accounts).where(eq(accounts.businessId, bizId)).orderBy(accounts.code, accounts.name);
  const allMode = c.req.query('all') === 'true';
  if (!allMode) return c.json(rows);

  const billingLinks = await db
    .select({
      accountId: employeeBillingAccounts.accountId,
      billingSystemKey: billingSystemsConfig.systemKey,
      billingSystemName: billingSystemsConfig.name,
    })
    .from(employeeBillingAccounts)
    .leftJoin(employees, eq(employeeBillingAccounts.employeeId, employees.id))
    .leftJoin(billingSystemsConfig, eq(employeeBillingAccounts.billingSystemId, billingSystemsConfig.id))
    .where(and(eq(employees.businessId, bizId), isNotNull(employeeBillingAccounts.accountId)));

  const billingByAccountId = new Map<number, { billingSystemKey: string | null; billingSystemName: string | null }>();
  for (const row of billingLinks) {
    if (!row.accountId) continue;
    if (!billingByAccountId.has(row.accountId)) {
      billingByAccountId.set(row.accountId, {
        billingSystemKey: row.billingSystemKey ?? null,
        billingSystemName: row.billingSystemName ?? null,
      });
    }
  }

  const normalizedAccounts = rows.map((acc) => {
    if (acc.accountType !== 'billing') return acc;
    const billing = billingByAccountId.get(acc.id);
    return {
      ...acc,
      subType: acc.subType ?? billing?.billingSystemName ?? null,
      billingSystemKey: billing?.billingSystemKey ?? null,
      _source: 'billing',
    };
  });

  return c.json({ accounts: normalizedAccounts, stations: [] });
}));


export default accountsReadRoutes;
