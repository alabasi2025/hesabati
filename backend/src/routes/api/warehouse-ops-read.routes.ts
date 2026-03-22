/**
 * warehouse-ops-read.routes.ts â€” Phase 15
 * ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ…ط®ط²ظ†: ظ‚ط±ط§ط،ط© ظˆطھظ‚ط§ط±ظٹط±
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql, desc, asc } from 'drizzle-orm';
import {
  businesses, warehouses, warehouseOperations, warehouseOperationItems,
  inventoryItems, inventoryStock, inventoryMovements,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';

const warehouseOpsReadRoutes = new Hono();

warehouseOpsReadRoutes.get('/warehouse-operations/:id', safeHandler('ط¬ظ„ط¨ طھظپط§طµظٹظ„ ط¹ظ…ظ„ظٹط© ظ…ط®ط²ظ†ظٹط©', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ط¹ظ…ظ„ظٹط© ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [operation] = await db.select().from(warehouseOperations).where(eq(warehouseOperations.id, id));
  if (!operation) return c.json({ error: 'ط§ظ„ط¹ظ…ظ„ظٹط© ط§ظ„ظ…ط®ط²ظ†ظٹط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ط©' }, 404);
  const opErr = await requireResourceOwnership(c, operation);
  if (opErr) return opErr;
  const items = await db.select().from(warehouseOperationItems)
    .where(eq(warehouseOperationItems.operationId, id))
    .orderBy(warehouseOperationItems.sortOrder);
  let operationType = null;
  if (operation.operationTypeId) {
    const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, operation.operationTypeId));
    operationType = ot || null;
  }
  let sourceWarehouse = null, destinationWarehouse = null;
  if (operation.sourceWarehouseId) {
    const [w] = await db.select().from(warehouses).where(eq(warehouses.id, operation.sourceWarehouseId));
    sourceWarehouse = w || null;
  }
  if (operation.destinationWarehouseId) {
    const [w] = await db.select().from(warehouses).where(eq(warehouses.id, operation.destinationWarehouseId));
    destinationWarehouse = w || null;
  }
  return c.json({ ...operation, items, operationType, sourceWarehouse, destinationWarehouse });
}));

// ط¬ظ„ط¨ ظ…ط®ط²ظˆظ† ظ…ط®ط²ظ†
warehouseOpsReadRoutes.get('/businesses/:bizId/warehouses/:warehouseId/inventory', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ظ…ط®ط²ظˆظ† ط§ظ„ظ…ط®ط²ظ†', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = parseId(c.req.param('warehouseId'));
  if (!warehouseId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ظ…ط®ط²ظ† ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const result = await db.execute(sql`
    SELECT
      woi.item_name,
      woi.item_code,
      woi.unit,
      SUM(CASE
        WHEN wo.destination_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN CAST(woi.quantity AS NUMERIC)
        WHEN wo.source_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN -CAST(woi.quantity AS NUMERIC)
        ELSE 0
      END) as current_quantity,
      SUM(CASE
        WHEN wo.destination_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN CAST(woi.total_cost AS NUMERIC)
        WHEN wo.source_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN -CAST(woi.total_cost AS NUMERIC)
        ELSE 0
      END) as total_cost,
      MAX(wo.operation_date) as last_movement_date
    FROM warehouse_operation_items woi
    JOIN warehouse_operations wo ON wo.id = woi.operation_id
    WHERE wo.business_id = ${bizId}
    AND (wo.source_warehouse_id = ${warehouseId} OR wo.destination_warehouse_id = ${warehouseId})
    GROUP BY woi.item_name, woi.item_code, woi.unit
    HAVING SUM(CASE
      WHEN wo.destination_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
        THEN CAST(woi.quantity AS NUMERIC)
      WHEN wo.source_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
        THEN -CAST(woi.quantity AS NUMERIC)
      ELSE 0
    END) > 0
    ORDER BY woi.item_name
  `);
  const rows = normalizeDbResult(result);
  const filteredRows = (rows as any[]).filter((r: any) => {
    if (!r.item_name || r.item_name.trim() === '') return false;
    const qty = Number.parseFloat(String(r.current_quantity || 0));
    return qty > 0;
  });
  return c.json(filteredRows);
}));

// ط¬ظ„ط¨ ظƒظ„ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ…ط®ط²ظ†ظٹط© ظ„ظ„ط¹ظ…ظ„
warehouseOpsReadRoutes.get('/businesses/:bizId/warehouse-operations', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ظƒظ„ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ…ط®ط²ظ†ظٹط©', async (c) => {
  const bizId = getBizId(c);
  const opType = c.req.query('type');
  const warehouseId = c.req.query('warehouseId');
  const conditions = [eq(warehouseOperations.businessId, bizId)];
  if (opType) conditions.push(eq(warehouseOperations.operationType, opType as any));
  if (warehouseId) {
    const whId = Number.parseInt(warehouseId, 10);
    conditions.push(sql`(${warehouseOperations.sourceWarehouseId} = ${whId} OR ${warehouseOperations.destinationWarehouseId} = ${whId})`);
  }
  const rows = await db.select({
    id: warehouseOperations.id,
    operationType: warehouseOperations.operationType,
    operationNumber: warehouseOperations.operationNumber,
    operationDate: warehouseOperations.operationDate,
    description: warehouseOperations.description,
    status: warehouseOperations.status,
    totalCost: warehouseOperations.totalCost,
    totalItems: warehouseOperations.totalItems,
    operationTypeName: operationTypes.name,
    operationTypeIcon: operationTypes.icon,
  }).from(warehouseOperations)
    .leftJoin(operationTypes, eq(warehouseOperations.operationTypeId, operationTypes.id))
    .where(and(...conditions))
    .orderBy(desc(warehouseOperations.operationDate), desc(warehouseOperations.id));
  return c.json(rows);
}));

// ظ…ظ„ط®طµ ظ…ط®ط²ظˆظ† ط¹ط¯ط© ظ…ط®ط§ط²ظ†
warehouseOpsReadRoutes.get('/businesses/:bizId/inventory-summary', bizAuthMiddleware(), safeHandler('ظ…ظ„ط®طµ ظ…ط®ط²ظˆظ† ط¹ط¯ط© ظ…ط®ط§ط²ظ†', async (c) => {
  const bizId = getBizId(c);
  const warehouseIdsParam = c.req.query('warehouseIds');
  if (!warehouseIdsParam) return c.json({ error: 'ظٹط¬ط¨ طھط­ط¯ظٹط¯ ط§ظ„ظ…ط®ط§ط²ظ†' }, 400);
  const warehouseIds = warehouseIdsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n) && n > 0);
  if (warehouseIds.length === 0) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپط§طھ ط§ظ„ظ…ط®ط§ط²ظ† ط؛ظٹط± طµط§ظ„ط­ط©' }, 400);
  const allInventory: any[] = [];
  for (const whId of warehouseIds) {
    const result = await db.execute(sql`
      SELECT
        ${whId} as warehouse_id,
        woi.item_name,
        woi.item_code,
        woi.unit,
        SUM(CASE
          WHEN wo.destination_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN CAST(woi.quantity AS NUMERIC)
          WHEN wo.source_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN -CAST(woi.quantity AS NUMERIC)
          ELSE 0
        END) as current_quantity,
        SUM(CASE
          WHEN wo.destination_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN CAST(woi.total_cost AS NUMERIC)
          WHEN wo.source_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN -CAST(woi.total_cost AS NUMERIC)
          ELSE 0
        END) as total_cost,
        MAX(wo.operation_date) as last_movement_date
      FROM warehouse_operation_items woi
      JOIN warehouse_operations wo ON wo.id = woi.operation_id
      WHERE wo.business_id = ${bizId}
      AND (wo.source_warehouse_id = ${whId} OR wo.destination_warehouse_id = ${whId})
      GROUP BY woi.item_name, woi.item_code, woi.unit
      HAVING SUM(CASE
        WHEN wo.destination_warehouse_id = ${whId} AND wo.status = 'confirmed'
          THEN CAST(woi.quantity AS NUMERIC)
        WHEN wo.source_warehouse_id = ${whId} AND wo.status = 'confirmed'
          THEN -CAST(woi.quantity AS NUMERIC)
        ELSE 0
      END) > 0
      ORDER BY woi.item_name
    `);
    const rows = normalizeDbResult(result);
    const filtered = (rows as any[]).filter((r: any) => {
      if (!r.item_name || r.item_name.trim() === '') return false;
      const qty = Number.parseFloat(String(r.current_quantity || 0));
      return qty > 0;
    });
    allInventory.push(...filtered);
  }
  const totalItems = allInventory.length;
  const totalQuantity = allInventory.reduce((sum, r) => sum + Number(r.current_quantity || 0), 0);
  const totalCost = allInventory.reduce((sum, r) => sum + Number(r.total_cost || 0), 0);
  return c.json({ items: allInventory, summary: { totalItems, totalQuantity, totalCost, warehouseCount: warehouseIds.length } });
}));

// ظ…ظ„ط®طµ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ…ط®ط²ظ†ظٹط©
warehouseOpsReadRoutes.get('/businesses/:bizId/warehouse-operations-summary', bizAuthMiddleware(), safeHandler('ظ…ظ„ط®طµ ط§ظ„ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ…ط®ط²ظ†ظٹط©', async (c) => {
  const bizId = getBizId(c);
  const from = c.req.query('from') || c.req.query('dateFrom');
  const to = c.req.query('to') || c.req.query('dateTo');
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (from && !dateRegex.test(from)) return c.json({ error: 'طھظ†ط³ظٹظ‚ طھط§ط±ظٹط® ط§ظ„ط¨ط¯ط§ظٹط© ط؛ظٹط± طµط§ظ„ط­ (YYYY-MM-DD)' }, 400);
  if (to && !dateRegex.test(to)) return c.json({ error: 'طھظ†ط³ظٹظ‚ طھط§ط±ظٹط® ط§ظ„ظ†ظ‡ط§ظٹط© ط؛ظٹط± طµط§ظ„ط­ (YYYY-MM-DD)' }, 400);
  let query = sql`
    SELECT
      wo.operation_type,
      COUNT(*) as operation_count,
      SUM(CAST(wo.total_cost AS NUMERIC)) as total_cost,
      SUM(wo.total_items) as total_items
    FROM warehouse_operations wo
    WHERE wo.business_id = ${bizId} AND wo.status = 'confirmed'
  `;
  if (from) query = sql`${query} AND wo.operation_date >= ${from}`;
  if (to) query = sql`${query} AND wo.operation_date <= ${to}`;
  query = sql`${query} GROUP BY wo.operation_type ORDER BY operation_count DESC`;
  const result = await db.execute(query);
  const rows = normalizeDbResult(result);
  return c.json(rows);
}));

export default warehouseOpsReadRoutes;



export { warehouseOpsReadRoutes };

