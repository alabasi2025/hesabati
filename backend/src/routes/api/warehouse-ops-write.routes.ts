/**
 * warehouse-ops-write.routes.ts — Phase 15
 * عمليات المخزن: إنشاء + جلب تفصيلي
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql, inArray, desc } from 'drizzle-orm';
import {
  businesses, warehouses, warehouseOperations, warehouseOperationItems,
  inventoryItems, inventoryStock, inventoryMovements,
  accounts, accountBalances, operationTypes, operationTypeAccounts,
  journalEntries, journalEntryLines, auditLog,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId, toErrorMessage, getBody } from '../../middleware/helpers.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getNextSequence } from '../../middleware/sequencing.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { logAction } from '../../engines/audit.engine.ts';

const warehouseOpsWriteRoutes = new Hono();

warehouseOpsWriteRoutes.get('/businesses/:bizId/warehouses/:warehouseId/operations', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط¹ظ…ظ„ظٹط§طھ ط§ظ„ظ…ط®ط²ظ†', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = parseId(c.req.param('warehouseId'));
  if (!warehouseId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ظ…ط®ط²ظ† ط؛ظٹط± طµط§ظ„ط­' }, 400);

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

// ط¥ظ†ط´ط§ط، ط¹ظ…ظ„ظٹط© ظ…ط®ط²ظ†ظٹط©
warehouseOpsWriteRoutes.post('/businesses/:bizId/warehouse-operations', bizAuthMiddleware(), checkPermission('inventory', 'create'), safeHandler('ط¥ظ†ط´ط§ط، ط¹ظ…ظ„ظٹط© ظ…ط®ط²ظ†ظٹط©', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c) ?? 0;
  const body = await getBody(c);

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

  if (!body.operationTypeId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© (ط§ظ„ظ‚ط§ظ„ط¨) ظ…ط·ظ„ظˆط¨' }, 400);
  if (!body.operationType) return c.json({ error: 'ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© ط§ظ„ظ…ط®ط²ظ†ظٹط© ظ…ط·ظ„ظˆط¨' }, 400);

  const userPermissions = c.get('userPermissions') as { isAdmin?: boolean; constraints?: unknown } | undefined;
  const constraintsCheck = validateConstraints(userPermissions ?? {}, { operationTypeId: body.operationTypeId });
  if (!constraintsCheck.valid) return c.json({ error: constraintsCheck.error }, 403);

  if (!body.sourceWarehouseId && !body.destinationWarehouseId) {
    return c.json({ error: 'ظٹط¬ط¨ طھط­ط¯ظٹط¯ ظ…ط®ط²ظ† ظ…طµط¯ط± ط£ظˆ ظ…ط®ط²ظ† ظˆط¬ظ‡ط©' }, 400);
  }
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return c.json({ error: 'ظٹط¬ط¨ ط¥ط¶ط§ظپط© طµظ†ظپ ظˆط§ط­ط¯ ط¹ظ„ظ‰ ط§ظ„ط£ظ‚ظ„' }, 400);
  }

  if (body.sourceWarehouseId) {
    const [srcWh] = await db.select().from(warehouses).where(and(eq(warehouses.id, body.sourceWarehouseId), eq(warehouses.businessId, bizId)));
    if (!srcWh) return c.json({ error: 'ط§ظ„ظ…ط®ط²ظ† ط§ظ„ظ…طµط¯ط± ط؛ظٹط± ظ…ظˆط¬ظˆط¯ ط£ظˆ ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ‡ط°ط§ ط§ظ„ط¹ظ…ظ„' }, 400);
  }
  if (body.destinationWarehouseId) {
    const [destWh] = await db.select().from(warehouses).where(and(eq(warehouses.id, body.destinationWarehouseId), eq(warehouses.businessId, bizId)));
    if (!destWh) return c.json({ error: 'ط§ظ„ظ…ط®ط²ظ† ط§ظ„ظˆط¬ظ‡ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯ ط£ظˆ ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ‡ط°ط§ ط§ظ„ط¹ظ…ظ„' }, 400);
  }

  const validTypes = ['supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer'];
  if (!validTypes.includes(body.operationType)) {
    return c.json({ error: `ظ†ظˆط¹ ط§ظ„ط¹ظ…ظ„ظٹط© ط؛ظٹط± طµط§ظ„ط­. ط§ظ„ط£ظ†ظˆط§ط¹ ط§ظ„ظ…طھط§ط­ط©: ${validTypes.join(', ')}` }, 400);
  }
  if (body.operationType === 'receive_transfer' && !body.relatedOperationId) {
    return c.json({ error: 'ط§ط³طھظ„ط§ظ… ط§ظ„طھط­ظˆظٹظ„ ظٹطھط·ظ„ط¨ طھط­ط¯ظٹط¯ ط¹ظ…ظ„ظٹط© ط§ظ„طھط­ظˆظٹظ„ ط§ظ„ظ…ط±طھط¨ط·ط© (relatedOperationId)' }, 400);
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
      console.error(`طھط­ط°ظٹط±: ظپط´ظ„ طھط­ط¯ظٹط« ط§ظ„ظ…ط®ط²ظˆظ† ظ„ظ„طµظ†ظپ ${itemName}:`, toErrorMessage(invErr));
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
      console.error('طھط­ط°ظٹط±: ظپط´ظ„ ط¥ظ†ط´ط§ط، ط§ظ„ظ‚ظٹط¯ ط§ظ„ظ…ط­ط§ط³ط¨ظٹ:', toErrorMessage(txErr));
    }
  }

  return c.json({ ...created, inventoryUpdated: inventoryResults.length > 0, inventoryResults, relatedVoucherId }, 201);
}));

// ط¬ظ„ط¨ طھظپط§طµظٹظ„ ط¹ظ…ظ„ظٹط© ظ…ط®ط²ظ†ظٹط© ظ…ط¹ ط§ظ„ط£طµظ†ط§ظپ

export { warehouseOpsWriteRoutes };

