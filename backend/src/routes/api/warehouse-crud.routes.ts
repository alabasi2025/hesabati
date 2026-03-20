/**
 * warehouse-crud.routes.ts — Phase 9
 * CRUD المخازن: إضافة + تعديل + حذف + جلب
 */
/**
 * مسارات المخازن (CRUD) والعمليات المخزنية (warehouse-operations) وجلب المخزون والملخصات
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, sql, and } from 'drizzle-orm';
import {
  warehouses,
  warehouseOperations,
  warehouseOperationItems,
  operationTypes,
  inventoryItems,
  warehouseTypes,
  accounts,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { warehouseSchema, validateBody } from '../../middleware/validation.ts';
import { checkPermission, validateConstraints } from '../../middleware/permissions.ts';
import { safeHandler, parseId, toErrorMessage, getBody } from '../../middleware/helpers.ts';
import { getNextSequence, getNextItemInCategorySequence, generateWarehouseOpFullSequence } from '../../middleware/sequencing.ts';
import { postTransaction } from '../../engines/transaction.engine.ts';
import { processStockMovement } from '../../services/inventory.service.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { normalizeDbResult, getFirstRow } from './_shared/db-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const warehouseRoutes = new Hono();

// ===================== المخازن (CRUD) =====================

warehouseRoutes.get('/businesses/:bizId/warehouses', bizAuthMiddleware(), safeHandler('جلب المخازن', async (c) => {
  const bizId = getBizId(c);
  const includeCustody = c.req.query('includeCustody') === 'true';
  // نستخدم مقارنة نصية لتفادي خطأ قواعد بيانات قديمة لا تحتوي قيمة enum (custody) بعد.
  const whereCondition = includeCustody
    ? eq(warehouses.businessId, bizId)
    : and(
      eq(warehouses.businessId, bizId),
      sql`${warehouses.warehouseType}::text <> 'custody'`,
    );
  const rows = await db.select().from(warehouses).where(whereCondition).orderBy(warehouses.id);
  return c.json(rows);
}));

warehouseRoutes.post('/businesses/:bizId/warehouses', bizAuthMiddleware(), safeHandler('إضافة مخزن', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(warehouseSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as Record<string, unknown> & { name?: string; warehouseType?: string; subType?: unknown; subTypeId?: number; sequenceNumber?: number; code?: string };
  const subTypeRaw = data.subType ?? data.subTypeId;
  if (subTypeRaw != null && typeof subTypeRaw !== 'object') {
    const subTypeId = typeof subTypeRaw === 'number' ? subTypeRaw : Number.parseInt(String(subTypeRaw), 10);
    if (!Number.isNaN(subTypeId)) {
      data.subTypeId = subTypeId;
      const { sequenceNumber, code } = await getNextItemInCategorySequence(bizId, 'warehouse', subTypeId);
      data.sequenceNumber = sequenceNumber;
      data.code = code;
    }
  }
  const name = (data.name ?? '') as string;
  const warehouseType = (['main', 'station', 'sub'].includes(String(data.warehouseType ?? '')) ? data.warehouseType : 'main') as 'main' | 'station' | 'sub';
  const subType = typeof data.subType === 'string' ? data.subType : null;
  const [created] = await db.insert(warehouses).values({ ...data, businessId: bizId, name, warehouseType, subType }).returning();
  return c.json(created, 201);
}));

warehouseRoutes.get('/warehouses/:id', safeHandler('جلب مخزن بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  const [warehouse] = await db.select().from(warehouses).where(eq(warehouses.id, id));
  const err = await requireResourceOwnership(c, warehouse ?? null);
  if (err) return err;
  return c.json(warehouse);
}));

warehouseRoutes.put('/warehouses/:id', safeHandler('تعديل مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  const [warehouse] = await db.select().from(warehouses).where(eq(warehouses.id, id));
  const err = await requireResourceOwnership(c, warehouse ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(warehouses).set({ ...body, updatedAt: new Date() }).where(eq(warehouses.id, id)).returning();
  if (!updated) return c.json({ error: 'مخزن غير موجود' }, 404);

  if (updated.accountId) {
    await db.update(accounts).set({
      name: updated.name,
      subTypeId: updated.subTypeId,
      subType: updated.subType,
      code: updated.code,
      sequenceNumber: updated.sequenceNumber,
      responsiblePerson: updated.responsiblePerson,
      notes: updated.notes,
      isActive: updated.isActive,
      updatedAt: new Date(),
    }).where(eq(accounts.id, updated.accountId));
  }

  return c.json(updated);
}));

warehouseRoutes.delete('/warehouses/:id', safeHandler('حذف مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  const [warehouse] = await db.select().from(warehouses).where(eq(warehouses.id, id));
  const err = await requireResourceOwnership(c, warehouse ?? null);
  if (err) return err;
  await db.delete(warehouses).where(eq(warehouses.id, id));
  return c.json({ success: true });
}));

// جلب عمليات مخزن معين

export { warehouseRoutes as warehouseCrudRoutes };
