/**
 * مسارات محرك المخزون (قراءة أرصدة، تنبيهات، تقييم، حركات) — فصل عن api.rest
 */
import { Hono } from 'hono';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import {
  getStockLevels,
  getLowStockAlerts,
  getStockValuation,
  getItemMovementHistory,
  processStockMovement,
} from '../../services/inventory.service.ts';

const inventoryRoutes = new Hono();

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
  const body = normalizeBody(await c.req.json());

  if (!body.itemId || !body.warehouseId || !body.movementType || !body.quantity || !body.movementDate) {
    return c.json({ error: 'البيانات المطلوبة: itemId, warehouseId, movementType, quantity, movementDate' }, 400);
  }

  const result = await processStockMovement(bizId, {
    ...body,
    createdBy: userId,
  });
  return c.json(result, 201);
}));

export default inventoryRoutes;
