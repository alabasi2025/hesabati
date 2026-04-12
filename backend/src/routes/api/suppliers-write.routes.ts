/**
 * suppliers-write.routes.ts — Phase 12
 * مسارات كتابة الموردين: إنشاء + تعديل + حذف
 * نمط: كل نوع مورد = حساب تحكم في الدليل → الموردون تحته SUP-01/1, SUP-01/2
 * المستخدم يختار supplierTypeId فقط — الحساب يأتي تلقائياً من نوع المورد
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { accounts, suppliers, supplierTypes, supplierBalances, accountCurrencies } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import { getNextSupplierSequence } from '../../middleware/sequencing.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getBizId } from './_shared/context-helpers.ts';

const suppliersWriteRoutes = new Hono();

suppliersWriteRoutes.post(
  '/businesses/:bizId/suppliers',
  bizAuthMiddleware(),
  checkPermission('suppliers', 'create'),
  safeHandler('إضافة مورد', async (c) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    const supplierName = typeof body.name === 'string' ? body.name.trim() : '';
    if (!supplierName) return c.json({ error: 'اسم المورد مطلوب' }, 400);

    // نوع المورد إلزامي — الحساب يأتي منه تلقائياً
    const supplierTypeId = body.supplierTypeId != null && Number(body.supplierTypeId) > 0
      ? Number(body.supplierTypeId) : null;
    if (!supplierTypeId) return c.json({ error: 'نوع المورد (supplierTypeId) مطلوب' }, 400);

    const [supType] = await db
      .select({ id: supplierTypes.id, accountId: supplierTypes.accountId, name: supplierTypes.name })
      .from(supplierTypes)
      .where(and(eq(supplierTypes.id, supplierTypeId), eq(supplierTypes.businessId, bizId)))
      .limit(1);
    if (!supType) return c.json({ error: 'نوع المورد غير موجود' }, 400);
    if (!supType.accountId) return c.json({ error: 'نوع المورد لا يمتلك حساباً في الدليل — يرجى إضافة حساب له أولاً' }, 400);

    const [acc] = await db
      .select({ id: accounts.id, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, supType.accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'حساب نوع المورد غير موجود' }, 400);

    // كود مركّب: كود حساب النوع/رقم فرعي (SUP-01/1, SUP-01/2, ...)
    const existingSuppliers = await db
      .select({ id: suppliers.id })
      .from(suppliers)
      .where(and(eq(suppliers.businessId, bizId), eq(suppliers.accountId, acc.id)));
    const subSeq = existingSuppliers.length + 1;
    const supplierCode = `${acc.code}/${String(subSeq).padStart(2, "0")}`;

    // إنشاء حساب تحليلي خاص بالمورد
    const [supNature] = await db.select({ id: accountSubNatures.id }).from(accountSubNatures)
      .where(and(eq(accountSubNatures.businessId, bizId), eq(accountSubNatures.natureKey, 'supplier'))).limit(1);
    const [analyticalAccount] = await db.insert(accounts).values({
      businessId: bizId,
      name: supplierName,
      accountType: 'supplier' as any,
      accountSubNatureId: supNature?.id ?? null,
      isLeafAccount: true,
      parentAccountId: acc.id,
      code: supplierCode,
      sequenceNumber: subSeq,
    }).returning();

    let defaultCurrencyId: number | null = null;
    if (body.defaultCurrencyId && Number(body.defaultCurrencyId) > 0) {
      defaultCurrencyId = Number(body.defaultCurrencyId);
    }

    const [created] = await db.transaction(async (tx) => {
      const supplierSeq = await getNextSupplierSequence(bizId, supplierTypeId, tx);
      const [newSupplier] = await tx.insert(suppliers).values({
        businessId: bizId,
        name: supplierName,
        supplierTypeId,
        sequenceNumber: supplierSeq,
        code: supplierCode,
        accountId: analyticalAccount.id,
        phone: typeof body.phone === 'string' ? body.phone.trim() || null : null,
        category: typeof body.category === 'string' ? body.category.trim() || null : null,
        notes: typeof body.notes === 'string' ? body.notes.trim() || null : null,
        isActive: body.isActive !== false,
        defaultCurrencyId,
      }).returning();

      // إنشاء أرصدة بالعملات المحددة أو عملات الحساب
      let currencyIdsToAdd: number[] = [];
      if (body.currencyIds && Array.isArray(body.currencyIds) && body.currencyIds.length > 0) {
        currencyIdsToAdd = body.currencyIds.map((id: any) => Number(id)).filter((id: number) => id > 0);
      } else {
        const accCurrRows = await tx
          .select({ currencyId: accountCurrencies.currencyId })
          .from(accountCurrencies)
          .where(eq(accountCurrencies.accountId, acc.id));
        currencyIdsToAdd = accCurrRows.map((ac) => ac.currencyId);
      }
      if (currencyIdsToAdd.length > 0) {
        await tx.insert(supplierBalances).values(
          currencyIdsToAdd.map((currencyId) => ({
            supplierId: newSupplier.id,
            currencyId,
            balance: '0',
            updatedAt: new Date(),
          }))
        );
      }

      return [newSupplier];
    });
    return c.json(created, 201);
  }),
);

suppliersWriteRoutes.put(
  '/businesses/:bizId/suppliers/:id',
  bizAuthMiddleware(),
  safeHandler('تعديل مورد', async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(suppliers)
      .where(and(eq(suppliers.id, id), eq(suppliers.businessId, bizId)));
    if (!existing) return c.json({ error: 'مورد غير موجود أو لا ينتمي لهذا العمل' }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    // حماية: لا يمكن تغيير الحساب أو الكود بعد الإنشاء
    delete body.accountId;
    delete body.code;
    const [updated] = await db
      .update(suppliers)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(suppliers.id, id))
      .returning();
    return c.json(updated);
  }),
);

suppliersWriteRoutes.delete(
  '/businesses/:bizId/suppliers/:id',
  bizAuthMiddleware(),
  checkPermission('suppliers', 'delete'),
  safeHandler('حذف مورد', async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(suppliers)
      .where(and(eq(suppliers.id, id), eq(suppliers.businessId, bizId)));
    if (!existing) return c.json({ error: 'مورد غير موجود أو لا ينتمي لهذا العمل' }, 404);
    await db.delete(suppliers).where(eq(suppliers.id, id));
    return c.json({ success: true });
  }),
);

export { suppliersWriteRoutes };
