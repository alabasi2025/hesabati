/**
 * مسارات الحسابات المعلقة والتصفيات (reconciliations)
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, and } from 'drizzle-orm';
import { pendingAccounts, reconciliations, accounts, accountSubNatures } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { pendingAccountSchema, settlementSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
import { generateLeafAccountCode } from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const pendingSettlementsRoutes = new Hono();

// ===================== الحسابات المعلقة =====================
pendingSettlementsRoutes.get('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات المعلقة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select({
      id: pendingAccounts.id,
      businessId: pendingAccounts.businessId,
      accountId: pendingAccounts.accountId,
      personOrEntity: pendingAccounts.personOrEntity,
      description: pendingAccounts.description,
      status: pendingAccounts.status,
      estimatedAmount: pendingAccounts.estimatedAmount,
      currencyId: pendingAccounts.currencyId,
      notes: pendingAccounts.notes,
      createdAt: pendingAccounts.createdAt,
      updatedAt: pendingAccounts.updatedAt,
      // إضافة الكود من الحساب المرتبط
      accountCode: accounts.code,
      accountSequence: accounts.sequenceNumber,
    })
    .from(pendingAccounts)
    .leftJoin(accounts, eq(pendingAccounts.accountId, accounts.id))
    .where(eq(pendingAccounts.businessId, bizId));
  return c.json(rows);
}));

pendingSettlementsRoutes.post('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), safeHandler('إضافة حساب معلق', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(pendingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const d = validation.data as Record<string, unknown> & { 
    personOrEntity?: string;
    estimatedAmount?: string | number | null;
  };
  
  const [created] = await db.transaction(async (tx) => {
    // إنشاء حساب مالي فعلي من نوع "معلق"
    const [pendingNature] = await tx
      .select({ id: accountSubNatures.id })
      .from(accountSubNatures)
      .where(and(
        eq(accountSubNatures.businessId, bizId),
        eq(accountSubNatures.natureKey, 'pending')
      ))
      .limit(1);
    
    if (!pendingNature) {
      throw new Error('النوع الفرعي "معلق" غير موجود');
    }
    
    const { code, sequenceNumber } = await generateLeafAccountCode(bizId, 'pending', tx as any);
    
    const [account] = await tx.insert(accounts).values({
      businessId: bizId,
      name: `حساب معلق - ${d.personOrEntity || 'غير معروف'}`,
      accountType: 'pending',
      accountSubNatureId: pendingNature.id,
      isLeafAccount: true,
      code,
      sequenceNumber,
      isActive: true,
    }).returning();
    
    // إنشاء السجل في pending_accounts مع ربطه بالحساب
    return tx.insert(pendingAccounts).values({
      ...validation.data,
      businessId: bizId,
      accountId: account.id,
      estimatedAmount: d.estimatedAmount != null ? String(d.estimatedAmount) : null,
    }).returning();
  });
  
  return c.json(created, 201);
}));

pendingSettlementsRoutes.put('/pending-accounts/:id', safeHandler('تعديل حساب معلق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب المعلق غير صالح' }, 400);
  const [pending] = await db.select().from(pendingAccounts).where(eq(pendingAccounts.id, id));
  const err = await requireResourceOwnership(c, pending ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(pendingAccounts).set({ ...body, updatedAt: new Date() }).where(eq(pendingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب معلق غير موجود' }, 404);
  return c.json(updated);
}));

pendingSettlementsRoutes.delete('/pending-accounts/:id', safeHandler('حذف حساب معلق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب المعلق غير صالح' }, 400);
  const [pending] = await db.select().from(pendingAccounts).where(eq(pendingAccounts.id, id));
  const err = await requireResourceOwnership(c, pending ?? null);
  if (err) return err;
  await db.delete(pendingAccounts).where(eq(pendingAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== التصفيات =====================
pendingSettlementsRoutes.get('/businesses/:bizId/settlements', bizAuthMiddleware(), safeHandler('جلب التصفيات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(reconciliations).where(eq(reconciliations.businessId, bizId)).orderBy(desc(reconciliations.createdAt));
  return c.json(rows);
}));

pendingSettlementsRoutes.post('/businesses/:bizId/settlements', bizAuthMiddleware(), safeHandler('إضافة تصفية', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(settlementSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as Record<string, unknown> & {
    reconciliationType?: string; type?: string; expectedAmount?: unknown; actualAmount?: unknown;
  };
  const allowedTypes = ['accountant', 'manager', 'exchange', 'custody', 'supplier'] as const;
  const reconType = (data.reconciliationType ?? data.type ?? 'accountant') as string;
  const title = String(data.title ?? '');
  const [created] = await db.insert(reconciliations).values({
    ...data,
    businessId: bizId,
    title,
    reconciliationType: allowedTypes.includes(reconType as typeof allowedTypes[number]) ? reconType as typeof allowedTypes[number] : 'accountant',
    expectedAmount: data.expectedAmount != null ? String(data.expectedAmount) : null,
    actualAmount: data.actualAmount != null ? String(data.actualAmount) : null,
  }).returning();
  return c.json(created, 201);
}));

pendingSettlementsRoutes.put('/settlements/:id', safeHandler('تعديل تصفية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصفية غير صالح' }, 400);
  const [rec] = await db.select().from(reconciliations).where(eq(reconciliations.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(reconciliations).set({ ...body, updatedAt: new Date() }).where(eq(reconciliations.id, id)).returning();
  if (!updated) return c.json({ error: 'تصفية غير موجودة' }, 404);
  return c.json(updated);
}));

pendingSettlementsRoutes.delete('/settlements/:id', safeHandler('حذف تصفية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصفية غير صالح' }, 400);
  const [rec] = await db.select().from(reconciliations).where(eq(reconciliations.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(reconciliations).where(eq(reconciliations.id, id));
  return c.json({ success: true });
}));

export default pendingSettlementsRoutes;
