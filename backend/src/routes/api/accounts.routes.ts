import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import {
  accounts,
  accountSubNatures,
  funds,
  suppliers,
  warehouses,
  employeeBillingAccounts,
  businessPartners,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import { generateTreeAccountCode, getNextChildAccountSequence } from '../../middleware/sequencing.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getBizId } from './_shared/context-helpers.ts';

const accountsRoutes = new Hono();

const NATURE_TO_ACCOUNT_TYPE: Record<string, string> = {
  fund: 'fund', bank: 'bank', e_wallet: 'e_wallet', exchange: 'exchange',
  custody: 'custody', warehouse: 'warehouse', supplier: 'supplier',
  employee: 'employee', partner: 'partner', billing: 'billing',
  budget: 'budget', settlement: 'settlement', pending: 'pending',
};

function toAccountTypeFromNature(natureKey: string): string {
  return NATURE_TO_ACCOUNT_TYPE[natureKey] || 'accounting';
}

accountsRoutes.get('/businesses/:bizId/accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(accounts).where(eq(accounts.businessId, bizId)).orderBy(accounts.code, accounts.name);
  return c.json(rows);
}));

accountsRoutes.post('/businesses/:bizId/accounts', bizAuthMiddleware(), checkPermission('accounts', 'create'), safeHandler('إضافة حساب', async (c) => {
  const bizId = getBizId(c);
  const body = ((await getBody(c)) || {}) as Record<string, unknown>;
  const isLeafAccount = body.isLeafAccount !== false;
  const parentAccountId = body.parentAccountId == null ? null : Number(body.parentAccountId);
  const accountSubNatureId = body.accountSubNatureId == null ? null : Number(body.accountSubNatureId);
  const accountName = typeof body.name === 'string' ? body.name.trim() : '';

  if (!accountName) return c.json({ error: 'اسم الحساب مطلوب' }, 400);
  if (isLeafAccount && (!Number.isInteger(accountSubNatureId) || Number(accountSubNatureId) <= 0)) {
    return c.json({ error: 'النوع الفرعي للحساب مطلوب' }, 400);
  }

  const [parent] = parentAccountId
    ? await db.select().from(accounts).where(and(eq(accounts.id, parentAccountId), eq(accounts.businessId, bizId))).limit(1)
    : [null];
  if (parentAccountId && !parent) return c.json({ error: 'الحساب الأب غير موجود' }, 400);

  const [subNature] = accountSubNatureId
    ? await db.select({ id: accountSubNatures.id, natureKey: accountSubNatures.natureKey }).from(accountSubNatures).where(and(eq(accountSubNatures.id, accountSubNatureId), eq(accountSubNatures.businessId, bizId))).limit(1)
    : [null];
  if (accountSubNatureId && !subNature) return c.json({ error: 'نوع الحساب الفرعي غير موجود' }, 400);

  const sequenceNumber = await getNextChildAccountSequence(bizId, parentAccountId, db);
  const generatedCode = generateTreeAccountCode(parent?.code ?? null, sequenceNumber);
  const accountType = subNature ? toAccountTypeFromNature(String(subNature.natureKey)) : (typeof body.accountType === 'string' ? body.accountType : 'accounting');
  
  const payload: Record<string, unknown> = {
    ...body,
    businessId: bizId,
    name: accountName,
    accountType,
    parentAccountId,
    accountSubNatureId,
    isLeafAccount,
    sequenceNumber,
    code: typeof body.code === 'string' && body.code.trim().length > 0 ? body.code.trim() : generatedCode,
    updatedAt: new Date(),
  };
  delete payload.linkedEntityType;
  delete payload.linkedEntityId;

  const [created] = await db.insert(accounts).values(payload as typeof accounts.$inferInsert).returning();

  if (created && body.linkedEntityId && body.linkedEntityType) {
    const linkedEntityId = Number(body.linkedEntityId);
    const linkedEntityType = String(body.linkedEntityType);
    if (linkedEntityType === 'fund') {
      await db.update(funds).set({ accountId: created.id, updatedAt: new Date() }).where(and(eq(funds.id, linkedEntityId), eq(funds.businessId, bizId)));
    } else if (linkedEntityType === 'supplier') {
      await db.update(suppliers).set({ accountId: created.id, updatedAt: new Date() }).where(and(eq(suppliers.id, linkedEntityId), eq(suppliers.businessId, bizId)));
    } else if (linkedEntityType === 'billing') {
      await db.update(employeeBillingAccounts).set({ accountId: created.id }).where(eq(employeeBillingAccounts.id, linkedEntityId));
    } else if (linkedEntityType === 'warehouse') {
      await db.update(warehouses).set({ accountId: created.id, updatedAt: new Date() }).where(and(eq(warehouses.id, linkedEntityId), eq(warehouses.businessId, bizId)));
    } else if (linkedEntityType === 'partner') {
      await db.update(businessPartners).set({ accountId: created.id }).where(and(eq(businessPartners.id, linkedEntityId), eq(businessPartners.businessId, bizId)));
    }
  }

  return c.json(created, 201);
}));

accountsRoutes.put('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), safeHandler('تعديل حساب', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = ((await getBody(c)) || {}) as Record<string, unknown>;
  const [updated] = await db.update(accounts).set({ ...body, updatedAt: new Date() }).where(eq(accounts.id, id)).returning();
  return c.json(updated);
}));

accountsRoutes.delete('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), checkPermission('accounts', 'delete'), safeHandler('حذف حساب', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
}));

export default accountsRoutes;
