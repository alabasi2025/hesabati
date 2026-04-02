/**
 * warehouses-write.routes.ts — Phase 12
 * مسارات كتابة المخازن: إنشاء + تعديل + حذف
 * نمط: Control Account (WHS-01) + Subledger (WHS-01/1, WHS-01/2)
 * الحساب يُنشأ أولاً من صفحة الحسابات، ثم يُنشأ المخزن مرتبطاً به
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { accounts, warehouses, warehouseBalances, accountCurrencies } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getBizId } from './_shared/context-helpers.ts';

const warehousesWriteRoutes = new Hono();

warehousesWriteRoutes.post(
  '/businesses/:bizId/warehouses',
  bizAuthMiddleware(),
  checkPermission('warehouses', 'create'),
  safeHandler('إضافة مخزن', async (c) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    // الحساب المرتبط إلزامي — يُنشأ أولاً من صفحة الحسابات
    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالمخزن من دليل الحسابات' }, 400);

    const warehouseName = typeof body.name === 'string' ? body.name.trim() : '';
    if (!warehouseName) return c.json({ error: 'اسم المخزن مطلوب' }, 400);

    const [acc] = await db
      .select({ id: accounts.id, sequenceNumber: accounts.sequenceNumber, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    // كود مركّب: كود الحساب/رقم فرعي (WHS-01/1, WHS-01/2)
    const existingWarehouses = await db
      .select({ id: warehouses.id })
      .from(warehouses)
      .where(and(eq(warehouses.businessId, bizId), eq(warehouses.accountId, accountId)));
    const subSeq = existingWarehouses.length + 1;
    const warehouseCode = `${acc.code}/${subSeq}`;

    const warehouseType = (['main', 'station', 'sub', 'custody'].includes(String(body.warehouseType ?? ''))
      ? body.warehouseType
      : 'sub') as 'main' | 'station' | 'sub' | 'custody';

    let defaultCurrencyId: number | null = null;
    if (body.defaultCurrencyId && Number(body.defaultCurrencyId) > 0) {
      defaultCurrencyId = Number(body.defaultCurrencyId);
    }

    const [created] = await db.transaction(async (tx) => {
      const [newWarehouse] = await tx
        .insert(warehouses)
        .values({
          businessId: bizId,
          name: warehouseName,
          accountId,
          warehouseType,
          sequenceNumber: acc.sequenceNumber,
          code: warehouseCode,
          subType: typeof body.subType === 'string' ? body.subType || null : null,
          subTypeId: typeof body.subTypeId === 'number' ? body.subTypeId : null,
          responsiblePerson: typeof body.responsiblePerson === 'string' ? body.responsiblePerson.trim() || null : null,
          notes: typeof body.notes === 'string' ? body.notes.trim() || null : null,
          isActive: body.isActive !== false,
          defaultCurrencyId,
        })
        .returning();

      // إنشاء أرصدة بالعملات المحددة أو عملات الحساب
      let currencyIdsToAdd: number[] = [];
      if (body.currencyIds && Array.isArray(body.currencyIds) && body.currencyIds.length > 0) {
        currencyIdsToAdd = body.currencyIds.map((id: any) => Number(id)).filter((id: number) => id > 0);
      } else {
        const accCurrRows = await tx
          .select({ currencyId: accountCurrencies.currencyId })
          .from(accountCurrencies)
          .where(eq(accountCurrencies.accountId, accountId));
        currencyIdsToAdd = accCurrRows.map((ac) => ac.currencyId);
      }
      if (currencyIdsToAdd.length > 0) {
        await tx.insert(warehouseBalances).values(
          currencyIdsToAdd.map((currencyId) => ({
            warehouseId: newWarehouse.id,
            currencyId,
            balance: '0',
            updatedAt: new Date(),
          }))
        );
      }

      return [newWarehouse];
    });
    return c.json(created, 201);
  }),
);

warehousesWriteRoutes.put(
  '/businesses/:bizId/warehouses/:id',
  bizAuthMiddleware(),
  safeHandler('تعديل مخزن', async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(warehouses)
      .where(and(eq(warehouses.id, id), eq(warehouses.businessId, bizId)));
    if (!existing) return c.json({ error: 'مخزن غير موجود أو لا ينتمي لهذا العمل' }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    // حماية: لا يمكن تغيير الحساب أو الكود بعد الإنشاء
    delete body.accountId;
    delete body.code;
    const [updated] = await db
      .update(warehouses)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(warehouses.id, id))
      .returning();
    return c.json(updated);
  }),
);

warehousesWriteRoutes.delete(
  '/businesses/:bizId/warehouses/:id',
  bizAuthMiddleware(),
  checkPermission('warehouses', 'delete'),
  safeHandler('حذف مخزن', async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(warehouses)
      .where(and(eq(warehouses.id, id), eq(warehouses.businessId, bizId)));
    if (!existing) return c.json({ error: 'مخزن غير موجود أو لا ينتمي لهذا العمل' }, 404);
    await db.delete(warehouses).where(eq(warehouses.id, id));
    return c.json({ success: true });
  }),
);

export { warehousesWriteRoutes };
