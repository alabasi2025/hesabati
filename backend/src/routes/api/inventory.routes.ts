/**
 * مسارات محرك المخزون (قراءة أرصدة، تنبيهات، تقييم، حركات) — فصل عن api.rest
 */
import { Hono } from 'hono';
import { eq, and } from 'drizzle-orm';
import { getNextSequence } from '../../middleware/sequencing.ts';
import { db } from '../../db/index.ts';
import { inventoryItems } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import {
  getStockLevels,
  getLowStockAlerts,
  getStockValuation,
  getItemMovementHistory,
  processStockMovement,
} from '../../services/inventory.service.ts';

const inventoryRoutes = new Hono();

// ===================== أصناف المخزون =====================
inventoryRoutes.get('/businesses/:bizId/inventory-items', bizAuthMiddleware(), safeHandler('جلب أصناف المخزون', async (c) => {
  const bizId = getBizId(c);
  const rows = await db
    .select()
    .from(inventoryItems)
    .where(eq(inventoryItems.businessId, bizId))
    .orderBy(inventoryItems.name);
  return c.json(rows);
}));

inventoryRoutes.get('/businesses/:bizId/stock-levels', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('أرصدة المخزون', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = c.req.query('warehouseId') ? Number.parseInt(c.req.query('warehouseId'), 10) : undefined;
  const result = await getStockLevels(bizId, warehouseId);
  return c.json(result);
}));

inventoryRoutes.get('/businesses/:bizId/stock-alerts', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('تنبيهات المخزون', async (c) => {
  const bizId = getBizId(c);
  const alerts = await getLowStockAlerts(bizId);
  return c.json(alerts);
}));

inventoryRoutes.get('/businesses/:bizId/stock-valuation', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('تقييم المخزون', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = c.req.query('warehouseId') ? Number.parseInt(c.req.query('warehouseId'), 10) : undefined;
  const result = await getStockValuation(bizId, warehouseId);
  return c.json(result);
}));

inventoryRoutes.get('/businesses/:bizId/items/:itemId/movements', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('حركات صنف', async (c) => {
  const bizId = getBizId(c);
  const itemId = parseId(c.req.param('itemId'));
  if (!itemId) return c.json({ error: 'معرّف الصنف غير صالح' }, 400);
  const limit = c.req.query('limit') ? Number.parseInt(c.req.query('limit'), 10) : 50;
  const movements = await getItemMovementHistory(bizId, itemId, limit);
  return c.json(movements);
}));

inventoryRoutes.post('/businesses/:bizId/stock-movements', bizAuthMiddleware(), checkPermission('inventory', 'create'), safeHandler('تسجيل حركة مخزون', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);

  if (!body.itemId || !body.warehouseId || !body.movementType || !body.quantity || !body.movementDate) {
    return c.json({ error: 'البيانات المطلوبة: itemId, warehouseId, movementType, quantity, movementDate' }, 400);
  }

  const result = await processStockMovement(bizId, {
    ...body,
    createdBy: userId,
  });
  return c.json(result, 201);
}));

// ===================== CRUD الأصناف =====================

inventoryRoutes.post('/businesses/:bizId/inventory-items', bizAuthMiddleware(), safeHandler('إضافة صنف', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c) as { name?: string; itemNumber?: string; category?: string; itemTypeId?: number; unit?: string; minQuantity?: number; notes?: string; isActive?: boolean };

  if (!body.name?.trim()) return c.json({ error: 'اسم الصنف مطلوب' }, 400);
  const itemNum = (body.itemNumber || body.category || '').toString().trim();
  if (!itemNum) return c.json({ error: 'رقم الصنف مطلوب' }, 400);

  // توليد رقم الكود تلقائياً
  const seq = await getNextSequence(bizId, 'inventory_item', 0, 0);
  const autoCode = `ITM-${String(seq).padStart(4, '0')}`;

  const [created] = await db.insert(inventoryItems).values({
    businessId: bizId,
    name: body.name.trim(),
    code: autoCode,
    category: itemNum,           // رقم الصنف اليدوي
    itemTypeId: body.itemTypeId || null,
    unit: body.unit || null,
    minQuantity: body.minQuantity ? String(body.minQuantity) : null,
    notes: body.notes || null,
    isActive: body.isActive !== false,
    sequenceNumber: seq,
  }).returning();
  return c.json(created, 201);
}));

inventoryRoutes.put('/inventory-items/:id', bizAuthMiddleware(), safeHandler('تعديل صنف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصنف غير صالح' }, 400);

  const body = await getBody(c) as { name?: string; itemNumber?: string; category?: string; itemTypeId?: number; unit?: string; minQuantity?: number; notes?: string; isActive?: boolean };
  if (!body.name?.trim()) return c.json({ error: 'اسم الصنف مطلوب' }, 400);
  const itemNum = (body.itemNumber || body.category || '').toString().trim();
  if (!itemNum) return c.json({ error: 'رقم الصنف مطلوب' }, 400);

  const [updated] = await db.update(inventoryItems).set({
    name: body.name.trim(),
    category: itemNum,           // رقم الصنف اليدوي — الكود لا يتغير
    itemTypeId: body.itemTypeId ?? null,
    unit: body.unit ?? null,
    minQuantity: body.minQuantity != null ? String(body.minQuantity) : null,
    notes: body.notes ?? null,
    isActive: body.isActive !== false,
  }).where(eq(inventoryItems.id, id)).returning();

  if (!updated) return c.json({ error: 'الصنف غير موجود' }, 404);
  return c.json(updated);
}));

inventoryRoutes.delete('/inventory-items/:id', bizAuthMiddleware(), safeHandler('حذف صنف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصنف غير صالح' }, 400);
  await db.delete(inventoryItems).where(eq(inventoryItems.id, id));
  return c.json({ success: true });
}));

export default inventoryRoutes;
