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
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { warehouseSchema, validateBody } from '../../middleware/validation.ts';
import { checkPermission, validateConstraints } from '../../middleware/permissions.ts';
import { safeHandler, normalizeBody, parseId, toErrorMessage } from '../../middleware/helpers.ts';
import { getNextSequence, getNextItemInCategorySequence, generateWarehouseOpFullSequence } from '../../middleware/sequencing.ts';
import { postTransaction } from '../../services/transaction.service.ts';
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
warehouseRoutes.get('/businesses/:bizId/warehouses/:warehouseId/operations', bizAuthMiddleware(), safeHandler('جلب عمليات المخزن', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = parseId(c.req.param('warehouseId'));
  if (!warehouseId) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);

  const rows = await db.select({
    id: warehouseOperations.id,
    operationType: warehouseOperations.operationType,
    operationNumber: warehouseOperations.operationNumber,
    warehouseSequence: warehouseOperations.warehouseSequence,
    templateSequence: warehouseOperations.templateSequence,
    operationDate: warehouseOperations.operationDate,
    description: warehouseOperations.description,
    status: warehouseOperations.status,
    totalCost: warehouseOperations.totalCost,
    totalItems: warehouseOperations.totalItems,
    operationTypeName: operationTypes.name,
    operationTypeIcon: operationTypes.icon,
    operationTypeColor: operationTypes.color,
  }).from(warehouseOperations)
    .leftJoin(operationTypes, eq(warehouseOperations.operationTypeId, operationTypes.id))
    .where(and(
      eq(warehouseOperations.businessId, bizId),
      sql`(${warehouseOperations.sourceWarehouseId} = ${warehouseId} OR ${warehouseOperations.destinationWarehouseId} = ${warehouseId})`
    ))
    .orderBy(desc(warehouseOperations.operationDate), desc(warehouseOperations.id));

  return c.json(rows);
}));

// إنشاء عملية مخزنية
warehouseRoutes.post('/businesses/:bizId/warehouse-operations', bizAuthMiddleware(), checkPermission('inventory', 'create'), safeHandler('إنشاء عملية مخزنية', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c) ?? 0;
  const body = normalizeBody(await c.req.json());

  let opTemplate: Record<string, unknown> | null = null;
  if (body.operationTypeId) {
    const otRows = await db.execute(sql`SELECT * FROM operation_types WHERE id = ${body.operationTypeId} AND business_id = ${bizId}`);
    opTemplate = getFirstRow<Record<string, unknown>>(otRows) ?? null;
    if (opTemplate) {
      if (!body.operationType && opTemplate.voucher_type) body.operationType = opTemplate.voucher_type;
      if (!body.sourceWarehouseId && opTemplate.source_warehouse_id) body.sourceWarehouseId = opTemplate.source_warehouse_id;
      if (!body.description && opTemplate.name) body.description = opTemplate.name;
    }
  }

  if (!body.operationTypeId) return c.json({ error: 'معرّف نوع العملية (القالب) مطلوب' }, 400);
  if (!body.operationType) return c.json({ error: 'نوع العملية المخزنية مطلوب' }, 400);

  const userPermissions = c.get('userPermissions') as { isAdmin?: boolean; constraints?: unknown } | undefined;
  const constraintsCheck = validateConstraints(userPermissions ?? {}, { operationTypeId: body.operationTypeId });
  if (!constraintsCheck.valid) return c.json({ error: constraintsCheck.error }, 403);

  if (!body.sourceWarehouseId && !body.destinationWarehouseId) {
    return c.json({ error: 'يجب تحديد مخزن مصدر أو مخزن وجهة' }, 400);
  }
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return c.json({ error: 'يجب إضافة صنف واحد على الأقل' }, 400);
  }

  if (body.sourceWarehouseId) {
    const [srcWh] = await db.select().from(warehouses).where(and(eq(warehouses.id, body.sourceWarehouseId), eq(warehouses.businessId, bizId)));
    if (!srcWh) return c.json({ error: 'المخزن المصدر غير موجود أو لا ينتمي لهذا العمل' }, 400);
  }
  if (body.destinationWarehouseId) {
    const [destWh] = await db.select().from(warehouses).where(and(eq(warehouses.id, body.destinationWarehouseId), eq(warehouses.businessId, bizId)));
    if (!destWh) return c.json({ error: 'المخزن الوجهة غير موجود أو لا ينتمي لهذا العمل' }, 400);
  }

  const validTypes = ['supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer'];
  if (!validTypes.includes(body.operationType)) {
    return c.json({ error: `نوع العملية غير صالح. الأنواع المتاحة: ${validTypes.join(', ')}` }, 400);
  }
  if (body.operationType === 'receive_transfer' && !body.relatedOperationId) {
    return c.json({ error: 'استلام التحويل يتطلب تحديد عملية التحويل المرتبطة (relatedOperationId)' }, 400);
  }

  let totalCost = 0;
  let totalItems = 0;
  for (const item of body.items) {
    totalCost += (Number(item.quantity) || 0) * (Number(item.unitCost) || 0);
    totalItems += Number(item.quantity) || 0;
  }

  const year = new Date().getFullYear();
  const mainWarehouseId = body.sourceWarehouseId || body.destinationWarehouseId;
  const [mainWh] = await db.select().from(warehouses).where(eq(warehouses.id, mainWarehouseId));
  let categorySeqNum = 1;
  let warehouseSeqNum = mainWh?.sequenceNumber || 1;
  if (mainWh?.subTypeId) {
    const [whCategory] = await db.select({ sequenceNumber: warehouseTypes.sequenceNumber })
      .from(warehouseTypes).where(eq(warehouseTypes.id, mainWh.subTypeId));
    categorySeqNum = whCategory?.sequenceNumber || 1;
  }

  const whSeqResult = await generateWarehouseOpFullSequence(
    bizId, categorySeqNum, warehouseSeqNum,
    body.operationType, mainWarehouseId, year
  );
  const operationNumber = whSeqResult.fullSequenceNumber;
  const whSeq = whSeqResult.sequentialNumber;
  let tmplSeq: number | null = null;
  if (body.operationTypeId) {
    tmplSeq = await getNextSequence(bizId, 'template', body.operationTypeId, year);
  }

  const [created] = await db.insert(warehouseOperations).values({
    businessId: bizId,
    operationType: body.operationType,
    operationNumber,
    sourceWarehouseId: body.sourceWarehouseId || null,
    destinationWarehouseId: body.destinationWarehouseId || null,
    operationTypeId: body.operationTypeId || null,
    operationDate: body.operationDate || new Date().toISOString().split('T')[0],
    description: body.description || null,
    reference: body.reference || null,
    supplierId: body.supplierId || null,
    relatedOperationId: body.relatedOperationId || null,
    relatedVoucherId: body.relatedVoucherId || null,
    status: body.status || 'confirmed',
    totalCost: String(totalCost),
    totalItems,
    warehouseSequence: whSeq,
    templateSequence: tmplSeq,
    fullSequenceNumber: operationNumber,
    createdBy: userId,
  }).returning();

  if (body.items.length > 0) {
    await db.insert(warehouseOperationItems).values(
      body.items.map((item: any, i: number) => ({
        operationId: created.id,
        itemName: item.itemName || item.name,
        itemCode: item.itemCode || null,
        quantity: String(item.quantity),
        unitCost: String(item.unitCost || 0),
        totalCost: String((Number(item.quantity) || 0) * (Number(item.unitCost) || 0)),
        unit: item.unit || null,
        notes: item.notes || null,
        sortOrder: i,
      }))
    );
  }

  const inventoryResults: unknown[] = [];
  for (const item of body.items) {
    const itemName = item.itemName || item.name;
    const itemCode = item.itemCode || null;
    let inventoryItemId: number;
    const existingItems = await db.select().from(inventoryItems)
      .where(and(
        eq(inventoryItems.businessId, bizId),
        itemCode ? eq(inventoryItems.code, itemCode) : eq(inventoryItems.name, itemName)
      ));
    if (existingItems.length > 0) {
      inventoryItemId = existingItems[0].id;
      if (typeof item.itemTypeId === 'number' && existingItems[0].itemTypeId !== item.itemTypeId) {
        await db
          .update(inventoryItems)
          .set({ itemTypeId: item.itemTypeId })
          .where(eq(inventoryItems.id, inventoryItemId));
      }
    } else {
      const autoCode = itemCode || `${itemName.substring(0, 3).toUpperCase()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
      const [newItem] = await db.insert(inventoryItems).values({
        businessId: bizId,
        name: itemName,
        code: autoCode,
        itemTypeId: typeof item.itemTypeId === 'number' ? item.itemTypeId : null,
        unit: item.unit || null,
      }).returning();
      inventoryItemId = newItem.id;
    }
    try {
      const warehouseId = body.sourceWarehouseId || body.destinationWarehouseId;
      if (['supply_invoice', 'supply_order', 'receive_transfer'].includes(body.operationType)) {
        const result = await processStockMovement(bizId, {
          itemId: inventoryItemId,
          warehouseId,
          movementType: body.operationType,
          quantity: Number(item.quantity),
          unitCost: Number(item.unitCost || 0),
          reference: operationNumber,
          description: body.description || '',
          supplierId: body.supplierId || null,
        });
        inventoryResults.push(result);
      } else if (['dispatch', 'transfer_out'].includes(body.operationType)) {
        const result = await processStockMovement(bizId, {
          itemId: inventoryItemId,
          warehouseId,
          movementType: body.operationType,
          quantity: -Number(item.quantity),
          unitCost: Number(item.unitCost || 0),
          reference: operationNumber,
          description: body.description || '',
          toWarehouseId: body.destinationWarehouseId || null,
        });
        inventoryResults.push(result);
      }
    } catch (invErr: unknown) {
      console.error(`تحذير: فشل تحديث المخزون للصنف ${itemName}:`, toErrorMessage(invErr));
    }
  }

  let relatedVoucherId: number | null = null;
  const sourceAccountId = opTemplate ? (opTemplate.source_account_id as number | undefined) : undefined;
  if (opTemplate?.auto_journal === true && sourceAccountId) {
    try {
      const txResult = await postTransaction(bizId, userId, {
        voucherType: body.operationType === 'dispatch' ? 'payment' : 'receipt',
        amount: totalCost,
        currencyId: body.currencyId || 1,
        description: `${body.description || body.operationType} - ${operationNumber}`,
        operationTypeId: body.operationTypeId || null,
        debitAccountId: sourceAccountId,
        creditAccountId: null,
      });
      if (txResult?.voucher) {
        relatedVoucherId = txResult.voucher.id;
        await db.update(warehouseOperations)
          .set({ relatedVoucherId })
          .where(eq(warehouseOperations.id, created.id));
      }
    } catch (txErr: unknown) {
      console.error('تحذير: فشل إنشاء القيد المحاسبي:', toErrorMessage(txErr));
    }
  }

  return c.json({ ...created, inventoryUpdated: inventoryResults.length > 0, inventoryResults, relatedVoucherId }, 201);
}));

// جلب تفاصيل عملية مخزنية مع الأصناف
warehouseRoutes.get('/warehouse-operations/:id', safeHandler('جلب تفاصيل عملية مخزنية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العملية غير صالح' }, 400);
  const [operation] = await db.select().from(warehouseOperations).where(eq(warehouseOperations.id, id));
  if (!operation) return c.json({ error: 'العملية المخزنية غير موجودة' }, 404);
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

// جلب مخزون مخزن
warehouseRoutes.get('/businesses/:bizId/warehouses/:warehouseId/inventory', bizAuthMiddleware(), safeHandler('جلب مخزون المخزن', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = parseId(c.req.param('warehouseId'));
  if (!warehouseId) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
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

// جلب كل العمليات المخزنية للعمل
warehouseRoutes.get('/businesses/:bizId/warehouse-operations', bizAuthMiddleware(), safeHandler('جلب كل العمليات المخزنية', async (c) => {
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

// ملخص مخزون عدة مخازن
warehouseRoutes.get('/businesses/:bizId/inventory-summary', bizAuthMiddleware(), safeHandler('ملخص مخزون عدة مخازن', async (c) => {
  const bizId = getBizId(c);
  const warehouseIdsParam = c.req.query('warehouseIds');
  if (!warehouseIdsParam) return c.json({ error: 'يجب تحديد المخازن' }, 400);
  const warehouseIds = warehouseIdsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n) && n > 0);
  if (warehouseIds.length === 0) return c.json({ error: 'معرّفات المخازن غير صالحة' }, 400);
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

// ملخص العمليات المخزنية
warehouseRoutes.get('/businesses/:bizId/warehouse-operations-summary', bizAuthMiddleware(), safeHandler('ملخص العمليات المخزنية', async (c) => {
  const bizId = getBizId(c);
  const from = c.req.query('from') || c.req.query('dateFrom');
  const to = c.req.query('to') || c.req.query('dateTo');
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (from && !dateRegex.test(from)) return c.json({ error: 'تنسيق تاريخ البداية غير صالح (YYYY-MM-DD)' }, 400);
  if (to && !dateRegex.test(to)) return c.json({ error: 'تنسيق تاريخ النهاية غير صالح (YYYY-MM-DD)' }, 400);
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

export default warehouseRoutes;
