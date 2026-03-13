/**
 * مسارات الشركاء والموردين
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { and, eq } from 'drizzle-orm';
import { accounts, businessPartners, suppliers } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { partnerSchema, supplierSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import {
  TYPE_PREFIXES,
  generateItemCode,
  generateLeafAccountCode,
  getNextAccountSequence,
  getNextBusinessPartnerSequence,
  getNextSupplierSequence,
} from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const partnersRoutes = new Hono();

function roleToSubTypeId(role: string): number {
  // Deterministic positive id derived from role text.
  let hash = 0;
  for (let i = 0; i < role.length; i += 1) {
    const code = role.codePointAt(i) ?? 0;
    hash = Math.trunc(((hash << 5) - hash) + code);
  }
  return Math.abs(hash) + 1;
}

// ===================== الشركاء =====================
partnersRoutes.get('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('جلب الشركاء', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(businessPartners).where(eq(businessPartners.businessId, bizId));
  return c.json(rows);
}));

partnersRoutes.post('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('إضافة شريك', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(partnerSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const d = validation.data as Record<string, unknown> & { fullName?: string | null; sharePercentage?: string | number | null; role?: string | null; notes?: string | null };
  const partnerFullName = typeof d.fullName === 'string' ? d.fullName : '';
  const partnerNotes = typeof d.notes === 'string' ? d.notes : null;
  const partnerRole = typeof d.role === 'string' ? d.role.trim() : '';
  if (!partnerRole) {
    return c.json({ error: 'تصنيف الشريك (الدور) مطلوب' }, 400);
  }
  const partnerSubTypeId = roleToSubTypeId(partnerRole);
  const partnerSharePercentage =
    typeof d.sharePercentage === 'number' || typeof d.sharePercentage === 'string'
      ? String(d.sharePercentage)
      : null;
  const [created] = await db.transaction(async (tx) => {
    const partnerSeq = await getNextBusinessPartnerSequence(bizId, tx);
    
    // استخدام آلية الترقيم الصحيحة حسب النوع الفرعي
    const { code, sequenceNumber } = await generateLeafAccountCode(bizId, 'partner', tx as any);
    
    const [account] = await tx.insert(accounts).values({
      businessId: bizId,
      name: `حساب شريك - ${partnerFullName}`.trim(),
      accountType: 'partner',
      subType: partnerRole,
      subTypeId: partnerSubTypeId,
      sequenceNumber,
      code,
      isActive: true,
      notes: partnerNotes,
    }).returning();

    return tx.insert(businessPartners).values({
      ...validation.data,
      businessId: bizId,
      sequenceNumber: partnerSeq,
      code: generateItemCode('PRT', partnerSeq),
      accountId: account.id,
      sharePercentage: partnerSharePercentage,
    }).returning();
  });
  return c.json(created, 201);
}));

partnersRoutes.put('/partners/:id', safeHandler('تعديل شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  const [partner] = await db.select().from(businessPartners).where(eq(businessPartners.id, id));
  const err = await requireResourceOwnership(c, partner ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.transaction(async (tx) => {
    const [u] = await tx
      .update(businessPartners)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(businessPartners.id, id))
      .returning();

    if (u.accountId) {
      const roleText = typeof u.role === 'string' && u.role.trim() ? u.role.trim() : 'default';
      const roleSubTypeId = roleText === 'default' ? 1 : roleToSubTypeId(roleText);
      await tx
        .update(accounts)
        .set({
          name: `حساب شريك - ${u.fullName}`.trim(),
          subType: roleText,
          subTypeId: roleSubTypeId,
          notes: u.notes ?? null,
          updatedAt: new Date(),
        })
        .where(eq(accounts.id, u.accountId));
    }

    return [u];
  });
  if (!updated) return c.json({ error: 'شريك غير موجود' }, 404);
  return c.json(updated);
}));

partnersRoutes.delete('/partners/:id', safeHandler('حذف شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  const [partner] = await db.select().from(businessPartners).where(eq(businessPartners.id, id));
  const err = await requireResourceOwnership(c, partner ?? null);
  if (err) return err;
  if (partner?.accountId) await db.delete(accounts).where(eq(accounts.id, partner.accountId));
  await db.delete(businessPartners).where(eq(businessPartners.id, id));
  return c.json({ success: true });
}));

// ===================== الموردين =====================
partnersRoutes.get('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('جلب الموردين', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(suppliers).where(eq(suppliers.businessId, bizId)).orderBy(suppliers.id);
  return c.json(rows);
}));

partnersRoutes.post('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('إضافة مورد', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(supplierSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const d = validation.data as Record<string, unknown> & { category?: string | null; name?: string | null; notes?: string | null };
  const supplierTypeId = typeof (body as { supplierTypeId?: unknown }).supplierTypeId === 'number'
    ? (body as { supplierTypeId: number }).supplierTypeId
    : Number.NaN;
  if (!Number.isInteger(supplierTypeId) || supplierTypeId <= 0) {
    return c.json({ error: 'تصنيف المورد (supplierTypeId) مطلوب' }, 400);
  }
  const [created] = await db.transaction(async (tx) => {
    const supplierSeq = await getNextSupplierSequence(bizId, supplierTypeId, tx);
    
    // استخدام آلية الترقيم الصحيحة حسب النوع الفرعي
    const { code, sequenceNumber } = await generateLeafAccountCode(bizId, 'supplier', tx as any);
    
    const [account] = await tx.insert(accounts).values({
      businessId: bizId,
      name: `حساب مورد - ${String(d.name ?? '')}`.trim(),
      accountType: 'supplier',
      subType: d.category ? String(d.category) : 'default',
      subTypeId: supplierTypeId,
      sequenceNumber,
      code,
      isActive: true,
      notes: d.notes ? String(d.notes) : null,
    }).returning();

    return tx.insert(suppliers).values({
      ...validation.data,
      businessId: bizId,
      supplierTypeId,
      sequenceNumber: supplierSeq,
      code: generateItemCode('SUP', supplierSeq),
      accountId: account.id,
    }).returning();
  });
  return c.json(created, 201);
}));

partnersRoutes.put('/suppliers/:id', safeHandler('تعديل مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
  const err = await requireResourceOwnership(c, supplier ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const supplierTypeId =
    typeof (body as { supplierTypeId?: unknown }).supplierTypeId === 'number'
      ? (body as { supplierTypeId: number }).supplierTypeId
      : supplier?.supplierTypeId ?? Number.NaN;
  if (!Number.isInteger(supplierTypeId) || supplierTypeId <= 0) {
    return c.json({ error: 'تصنيف المورد (supplierTypeId) مطلوب' }, 400);
  }
  const [updated] = await db.transaction(async (tx) => {
    const [u] = await tx
      .update(suppliers)
      .set({ ...body, supplierTypeId, updatedAt: new Date() })
      .where(eq(suppliers.id, id))
      .returning();

    if (u.accountId) {
      const accountSubType =
        typeof u.category === 'string' && u.category.trim() ? u.category : 'default';
      await tx
        .update(accounts)
        .set({
          name: `حساب مورد - ${u.name}`.trim(),
          subType: accountSubType,
          subTypeId: supplierTypeId,
          code: u.code,
          sequenceNumber: u.sequenceNumber,
          notes: u.notes ?? null,
          isActive: u.isActive,
          updatedAt: new Date(),
        })
        .where(and(eq(accounts.id, u.accountId), eq(accounts.accountType, 'supplier')));
    }

    return [u];
  });
  if (!updated) return c.json({ error: 'مورد غير موجود' }, 404);
  return c.json(updated);
}));

partnersRoutes.delete('/suppliers/:id', safeHandler('حذف مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
  const err = await requireResourceOwnership(c, supplier ?? null);
  if (err) return err;
  if (supplier?.accountId) await db.delete(accounts).where(eq(accounts.id, supplier.accountId));
  await db.delete(suppliers).where(eq(suppliers.id, id));
  return c.json({ success: true });
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/suppliers بدلاً من هذا المسار
partnersRoutes.get('/suppliers', safeHandler('جلب الموردين (legacy)', async (c) => {
  const rows = await db.select().from(suppliers).orderBy(suppliers.id);
  return c.json(rows);
}));

export default partnersRoutes;
