/**
 * محرك المخزون (Inventory Engine)
 * ====================================
 * حسب الخطة التنفيذية - محرك 7
 * 
 * DB: إضافة costingMethod + costLayers في inventoryStock
 * Backend: calculateCOGS(item, quantity) FIFO + تكامل مع transaction.service
 * 
 * الدوال:
 * - processStockMovement(bizId, data) → تسجيل حركة مخزون + تحديث المخزون
 * - calculateCOGS(stockRecord, quantity) → حساب تكلفة البضاعة المباعة (FIFO/WeightedAvg)
 * - getStockLevels(bizId, warehouseId?) → أرصدة المخزون
 * - getLowStockAlerts(bizId) → تنبيهات المخزون المنخفض
 * - getStockValuation(bizId, warehouseId?) → تقييم المخزون
 * - getItemMovementHistory(bizId, itemId) → سجل حركات صنف
 */

import { db } from '../db/index.ts';
import { eq, and, desc } from 'drizzle-orm';
import {
  inventoryItems, inventoryStock, inventoryMovements, warehouses,
} from '../db/schema/index.ts';

// ===================== واجهات =====================

interface CostLayer {
  qty: number;
  unitCost: number;
  date: string;
}

interface StockMovementData {
  itemId: number;
  warehouseId: number;
  movementType: string;
  quantity: number;
  unitCost?: number;
  toWarehouseId?: number;
  supplierId?: number;
  stationId?: number;
  reference?: string;
  description?: string;
  movementDate: string;
  createdBy?: number;
  currencyId?: number;
}

// ===================== حساب تكلفة البضاعة المباعة =====================

/**
 * حساب COGS بطريقة FIFO
 * يستهلك من أقدم طبقات التكلفة أولاً
 */
function calculateCOGS_FIFO(costLayers: CostLayer[], quantity: number): { cogs: number; remainingLayers: CostLayer[] } {
  let remaining = quantity;
  let totalCost = 0;
  const newLayers: CostLayer[] = [];

  for (const layer of costLayers) {
    if (remaining <= 0) {
      newLayers.push(layer);
      continue;
    }

    if (layer.qty <= remaining) {
      totalCost += layer.qty * layer.unitCost;
      remaining -= layer.qty;
    } else {
      totalCost += remaining * layer.unitCost;
      newLayers.push({
        qty: layer.qty - remaining,
        unitCost: layer.unitCost,
        date: layer.date,
      });
      remaining = 0;
    }
  }

  return {
    cogs: Math.round(totalCost * 100) / 100,
    remainingLayers: newLayers,
  };
}

/**
 * حساب COGS بطريقة المتوسط المرجح
 */
function calculateCOGS_WeightedAvg(avgCost: number, quantity: number): number {
  return Math.round(avgCost * quantity * 100) / 100;
}

/**
 * حساب تكلفة البضاعة المباعة حسب طريقة التكلفة المحددة
 */
export function calculateCOGS(
  stockRecord: { avgCost: number | null; costingMethod: string | null; costLayers: CostLayer[] | null },
  quantity: number
): { cogs: number; remainingLayers: CostLayer[] } {
  const method = stockRecord.costingMethod || 'weighted_avg';
  const layers = stockRecord.costLayers || [];

  if (method === 'fifo') {
    return calculateCOGS_FIFO(layers, quantity);
  }

  const avgCost = stockRecord.avgCost ? Number(stockRecord.avgCost) : 0;
  return {
    cogs: calculateCOGS_WeightedAvg(avgCost, quantity),
    remainingLayers: layers,
  };
}

// ===================== تسجيل حركة مخزون =====================

/**
 * تسجيل حركة مخزون + تحديث أرصدة المخزون + تحديث طبقات التكلفة
 */
export async function processStockMovement(bizId: number, data: StockMovementData) {
  return db.transaction(async (tx) => {
    // 1. تسجيل الحركة
    const [movement] = await tx.insert(inventoryMovements).values({
      businessId: bizId,
      itemId: data.itemId,
      warehouseId: data.warehouseId,
      movementType: data.movementType,
      quantity: String(data.quantity),
      unitCost: data.unitCost ? String(data.unitCost) : null,
      currencyId: data.currencyId || null,
      toWarehouseId: data.toWarehouseId || null,
      supplierId: data.supplierId || null,
      stationId: data.stationId || null,
      reference: data.reference || null,
      description: data.description || null,
      movementDate: data.movementDate,
      createdBy: data.createdBy || null,
    }).returning();

    // 2. جلب أو إنشاء سجل المخزون
    let [stock] = await tx.select()
      .from(inventoryStock)
      .where(and(
        eq(inventoryStock.itemId, data.itemId),
        eq(inventoryStock.warehouseId, data.warehouseId)
      ));

    if (!stock) {
      [stock] = await tx.insert(inventoryStock).values({
        itemId: data.itemId,
        warehouseId: data.warehouseId,
        quantity: '0',
        avgCost: '0',
        costingMethod: 'weighted_avg',
        costLayers: [],
        currencyId: data.currencyId || null,
      }).returning();
    }

    const currentQty = Number(stock.quantity || 0);
    const currentAvgCost = Number(stock.avgCost || 0);
    const currentLayers: CostLayer[] = (stock.costLayers as CostLayer[]) || [];

    // 3. تحديث المخزون حسب نوع الحركة
    let newQty: number;
    let newAvgCost: number = currentAvgCost;
    let newLayers: CostLayer[] = [...currentLayers];
    let cogs: number = 0;

    const isInbound = ['in', 'supply_invoice', 'supply_order', 'receive_transfer'].includes(data.movementType);
    const isOutbound = ['out', 'dispatch', 'transfer_out'].includes(data.movementType);

    if (isInbound) {
      newQty = currentQty + data.quantity;
      
      if (data.unitCost) {
        const totalOldCost = currentQty * currentAvgCost;
        const totalNewCost = data.quantity * data.unitCost;
        newAvgCost = newQty > 0 ? (totalOldCost + totalNewCost) / newQty : data.unitCost;
        
        newLayers.push({
          qty: data.quantity,
          unitCost: data.unitCost,
          date: data.movementDate,
        });
      }
    } else if (isOutbound) {
      newQty = currentQty - data.quantity;
      
      if (newQty < 0) {
        throw new Error(`الكمية المتاحة (${currentQty}) أقل من الكمية المطلوبة (${data.quantity})`);
      }

      const cogsResult = calculateCOGS(
        { avgCost: currentAvgCost, costingMethod: stock.costingMethod, costLayers: currentLayers },
        data.quantity
      );
      cogs = cogsResult.cogs;
      newLayers = cogsResult.remainingLayers;
    } else if (data.movementType === 'transfer') {
      newQty = currentQty - data.quantity;
      if (newQty < 0) {
        throw new Error(`الكمية المتاحة (${currentQty}) أقل من الكمية المطلوبة (${data.quantity})`);
      }

      const cogsResult = calculateCOGS(
        { avgCost: currentAvgCost, costingMethod: stock.costingMethod, costLayers: currentLayers },
        data.quantity
      );
      cogs = cogsResult.cogs;
      newLayers = cogsResult.remainingLayers;

      // إضافة للمخزن الوجهة
      if (data.toWarehouseId) {
        let [destStock] = await tx.select()
          .from(inventoryStock)
          .where(and(
            eq(inventoryStock.itemId, data.itemId),
            eq(inventoryStock.warehouseId, data.toWarehouseId)
          ));

        if (!destStock) {
          await tx.insert(inventoryStock).values({
            itemId: data.itemId,
            warehouseId: data.toWarehouseId,
            quantity: String(data.quantity),
            avgCost: String(cogs / data.quantity),
            costingMethod: stock.costingMethod || 'weighted_avg',
            costLayers: [{ qty: data.quantity, unitCost: cogs / data.quantity, date: data.movementDate }],
            currencyId: data.currencyId || null,
          });
        } else {
          const destQty = Number(destStock.quantity || 0);
          const destAvgCost = Number(destStock.avgCost || 0);
          const transferUnitCost = cogs / data.quantity;
          const newDestQty = destQty + data.quantity;
          const newDestAvgCost = newDestQty > 0 ? ((destQty * destAvgCost) + (data.quantity * transferUnitCost)) / newDestQty : transferUnitCost;
          const destLayers: CostLayer[] = (destStock.costLayers as CostLayer[]) || [];
          destLayers.push({ qty: data.quantity, unitCost: transferUnitCost, date: data.movementDate });

          await tx.update(inventoryStock).set({
            quantity: String(newDestQty),
            avgCost: String(Math.round(newDestAvgCost * 100) / 100),
            costLayers: destLayers,
            updatedAt: new Date(),
          }).where(eq(inventoryStock.id, destStock.id));
        }
      }
    } else if (data.movementType === 'adjustment') {
      newQty = data.quantity;
    } else {
      newQty = currentQty;
    }

    // 4. تحديث سجل المخزون
    await tx.update(inventoryStock).set({
      quantity: String(Math.round(newQty * 100) / 100),
      avgCost: String(Math.round(newAvgCost * 100) / 100),
      costLayers: newLayers,
      updatedAt: new Date(),
    }).where(eq(inventoryStock.id, stock.id));

    return {
      movement,
      stockAfter: {
        quantity: newQty,
        avgCost: newAvgCost,
        cogs,
      },
    };
  });
}

// ===================== أرصدة المخزون =====================

export async function getStockLevels(bizId: number, warehouseId?: number) {
  const items = await db.select({
    itemId: inventoryItems.id,
    itemName: inventoryItems.name,
    itemCode: inventoryItems.code,
    category: inventoryItems.category,
    unit: inventoryItems.unit,
    minQuantity: inventoryItems.minQuantity,
  })
    .from(inventoryItems)
    .where(and(eq(inventoryItems.businessId, bizId), eq(inventoryItems.isActive, true)));

  const result = [];
  for (const item of items) {
    const stockConditions = [eq(inventoryStock.itemId, item.itemId)];
    if (warehouseId) stockConditions.push(eq(inventoryStock.warehouseId, warehouseId));

    const stockRows = await db.select({
      warehouseId: inventoryStock.warehouseId,
      warehouseName: warehouses.name,
      quantity: inventoryStock.quantity,
      avgCost: inventoryStock.avgCost,
      costingMethod: inventoryStock.costingMethod,
    })
      .from(inventoryStock)
      .innerJoin(warehouses, eq(inventoryStock.warehouseId, warehouses.id))
      .where(and(...stockConditions));

    const totalQty = stockRows.reduce((sum, s) => sum + Number(s.quantity || 0), 0);
    const isLow = item.minQuantity ? totalQty <= Number(item.minQuantity) : false;

    result.push({
      ...item,
      stocks: stockRows,
      totalQuantity: totalQty,
      isLowStock: isLow,
    });
  }

  return result;
}

// ===================== تنبيهات المخزون المنخفض =====================

export async function getLowStockAlerts(bizId: number) {
  const allStock = await getStockLevels(bizId);
  return allStock.filter(item => item.isLowStock);
}

// ===================== تقييم المخزون =====================

export async function getStockValuation(bizId: number, warehouseId?: number) {
  const stockLevels = await getStockLevels(bizId, warehouseId);
  
  let totalValue = 0;
  const valuationItems = stockLevels.map(item => {
    const itemValue = item.stocks.reduce((sum, s) => {
      const qty = Number(s.quantity || 0);
      const cost = Number(s.avgCost || 0);
      return sum + (qty * cost);
    }, 0);
    totalValue += itemValue;

    return {
      itemId: item.itemId,
      itemName: item.itemName,
      itemCode: item.itemCode,
      totalQuantity: item.totalQuantity,
      avgCost: item.stocks.length > 0 ? Number(item.stocks[0].avgCost || 0) : 0,
      totalValue: Math.round(itemValue * 100) / 100,
    };
  });

  return {
    items: valuationItems,
    totalValue: Math.round(totalValue * 100) / 100,
    itemCount: valuationItems.length,
  };
}

// ===================== سجل حركات صنف =====================

export async function getItemMovementHistory(bizId: number, itemId: number, limit: number = 50) {
  return db.select()
    .from(inventoryMovements)
    .where(and(
      eq(inventoryMovements.businessId, bizId),
      eq(inventoryMovements.itemId, itemId)
    ))
    .orderBy(desc(inventoryMovements.createdAt))
    .limit(limit);
}
