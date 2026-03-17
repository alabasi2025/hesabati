import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and, inArray, asc, count } from 'drizzle-orm';
import {
  operationTypes, operationTypeAccounts, accounts, accountBalances,
  sidebarSections, sidebarItems, userSidebarConfig,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
  users, vouchers, currencies, operationCategories,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, getBody, parseId, toErrorMessage } from '../middleware/helpers.ts';
import { checkPermission } from '../middleware/permissions.ts';
import { getNextSequence, getNextItemInCategorySequence } from '../middleware/sequencing.ts';
import { normalizeDbResult } from '../utils/db-result.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';

const operationEnhRouter = new Hono();

// ===================== تحسينات أنواع العمليات =====================

// 6. نسخ/استنساخ نوع عملية
operationEnhRouter.post('/businesses/:bizId/operation-types/:id/clone', bizAuthMiddleware(), safeHandler('نسخ نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);

  const [original] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!original) return c.json({ error: 'نوع العملية غير موجود' }, 404);

  const body = await getBody(c);
  const newName = body.name || `${original.name} (نسخة)`;
  const normalizedCategoryId = Number.isInteger(original.categoryId) && Number(original.categoryId) > 0
    ? Number(original.categoryId)
    : 0;
  const { sequenceNumber: seqNum } = await getNextItemInCategorySequence(
    bizId,
    'operation',
    normalizedCategoryId,
  );

  let categoryPrefix = String(original.code || 'OT').split('-')[0] || 'OT';
  if (normalizedCategoryId > 0) {
    const [cat] = await db
      .select({ name: operationCategories.name })
      .from(operationCategories)
      .where(and(eq(operationCategories.id, normalizedCategoryId), eq(operationCategories.businessId, bizId)))
      .limit(1);
    if (cat?.name) {
      categoryPrefix = String(cat.name).substring(0, 3).toUpperCase();
    }
  }
  const autoCode = `${categoryPrefix}-${String(seqNum).padStart(3, '0')}`;

  // إنشاء النسخة
  const [cloned] = await db.insert(operationTypes).values({
    businessId: bizId,
    name: newName,
    description: original.description,
    icon: original.icon,
    color: original.color,
    categoryId: original.categoryId,
    sequenceNumber: seqNum,
    code: autoCode,
    voucherType: original.voucherType,
    paymentMethod: original.paymentMethod,
    sourceAccountId: original.sourceAccountId,
    sourceFundId: original.sourceFundId,
    screens: original.screens,
    requiresAttachment: original.requiresAttachment,
    hasMultiLines: original.hasMultiLines,
    sortOrder: original.sortOrder,
    isActive: true,
    notes: `نسخة من: ${original.name}`,
  }).returning();

  // نسخ الحسابات المرتبطة
  const linkedAccounts = await db.select().from(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  if (linkedAccounts.length > 0) {
    await db.insert(operationTypeAccounts).values(
      linkedAccounts.map(la => ({
        operationTypeId: cloned.id,
        accountId: la.accountId,
        employeeBillingAccountId: la.employeeBillingAccountId,
        label: la.label,
        permission: la.permission,
        sortOrder: la.sortOrder,
        isActive: la.isActive,
      }))
    );
  }

  return c.json(cloned, 201);
}));

// 7. تفعيل/تعطيل نوع عملية
operationEnhRouter.post('/businesses/:bizId/operation-types/:id/toggle', bizAuthMiddleware(), safeHandler('تفعيل/تعطيل نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);

  const [existing] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!existing) return c.json({ error: 'نوع العملية غير موجود' }, 404);

  // منع تفعيل قالب غير مكتمل: يجب تحديد الخزينة والحسابات المرتبطة أولاً
  const nextIsActive = !existing.isActive;
  if (nextIsActive) {
    const vt = String(existing.voucherType ?? '').trim();
    if (vt === 'receipt' || vt === 'payment') {
      const pm = String(existing.paymentMethod ?? '').trim();
      if (!pm) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد وسيلة الدفع والخزينة' }, 400);
      if (pm === 'cash') {
        if (!existing.sourceFundId) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد الخزينة (الصندوق)' }, 400);
      } else {
        if (!existing.sourceAccountId) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل تحديد الخزينة (حساب بنك/صراف/محفظة)' }, 400);
      }
      const [cntRow] = await db.select({ cnt: count() }).from(operationTypeAccounts)
        .where(eq(operationTypeAccounts.operationTypeId, id));
      if (!cntRow?.cnt) return c.json({ error: 'لا يمكن تفعيل هذا القالب قبل إضافة حساب واحد على الأقل في الحسابات المرتبطة' }, 400);
    }
  }

  const [updated] = await db.update(operationTypes).set({
    isActive: !existing.isActive, updatedAt: new Date(),
  }).where(eq(operationTypes.id, id)).returning();

  return c.json(updated);
}));

// 8. إحصائيات استخدام أنواع العمليات
operationEnhRouter.get('/businesses/:bizId/operation-types-stats', bizAuthMiddleware(), safeHandler('إحصائيات أنواع العمليات', async (c) => {
  const bizId = getBizId(c);

  const result = await db.execute(sql`
    SELECT
      ot.id, ot.name, ot.icon, ot.color, ot.category_id, ot.voucher_type, ot.is_active,
      COUNT(v.id) as usage_count,
      COALESCE(SUM(CAST(v.amount AS NUMERIC)), 0) as total_amount,
      MAX(v.created_at) as last_used_at
    FROM operation_types ot
    LEFT JOIN vouchers v ON v.operation_type_id = ot.id
    WHERE ot.business_id = ${bizId}
    GROUP BY ot.id, ot.name, ot.icon, ot.color, ot.category_id, ot.voucher_type, ot.is_active
    ORDER BY usage_count DESC
  `);
  const rows = normalizeDbResult(result);
  return c.json(rows);
}));

// 9. التحقق من تكرار اسم نوع العملية
operationEnhRouter.get('/businesses/:bizId/operation-types/check-name', bizAuthMiddleware(), safeHandler('التحقق من تكرار اسم', async (c) => {
  const bizId = getBizId(c);
  const name = c.req.query('name');
  const excludeId = c.req.query('excludeId');
  if (!name) return c.json({ error: 'الاسم مطلوب' }, 400);

  let conditions = sql`business_id = ${bizId} AND LOWER(name) = LOWER(${name})`;
  if (excludeId) conditions = sql`${conditions} AND id != ${parseInt(excludeId)}`;

  const result = await db.execute(sql`SELECT COUNT(*) as cnt FROM operation_types WHERE ${conditions}`);
  const first = getFirstRow<{ cnt: string }>(result);
  const exists = Number(first?.cnt ?? 0) > 0;

  return c.json({ exists, name });
}));


export default operationEnhRouter;
