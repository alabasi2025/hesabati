/**
 * ══════════════════════════════════════════════════════════════
 * Notification Engine — محرك الإشعارات الفورية
 * ══════════════════════════════════════════════════════════════
 * 
 * المسؤوليات:
 * - إرسال إشعارات WebSocket للمستخدمين والأعمال
 * - إشعارات السندات الجديدة والمعاملات المالية
 * - إشعارات تحديث الشاشات الديناميكية
 * - إدارة قائمة الاتصالات النشطة
 * 
 * التكامل:
 *   notification.engine ← transaction.engine (سند جديد)
 *   notification.engine ← workflow.engine    (تغيير حالة)
 *   notification.engine ← screens.engine     (تحديث شاشة)
 * 
 * @module engines/notification.engine
 * @since Phase 3
 */

// ── Re-exports من websocket.service ────────────────────────────────────────
export { wsService } from '../services/websocket.service.ts';

// ── واجهات الإشعارات ────────────────────────────────────────────────────────
export interface NotificationPayload {
  type: 'new_voucher' | 'status_change' | 'screen_update' | 'low_stock' | 'salary_due' | 'system';
  bizId: number;
  data: Record<string, unknown>;
  timestamp?: string;
  priority?: 'low' | 'normal' | 'high' | 'urgent';
}

export interface VoucherNotification {
  voucherId: number;
  voucherType: string;
  amount: number;
  currency: string;
  createdBy: string;
  bizId: number;
}

export interface StatusChangeNotification {
  voucherId: number;
  fromStatus: string;
  toStatus: string;
  changedBy: string;
  bizId: number;
}

export interface LowStockNotification {
  itemId: number;
  itemName: string;
  currentStock: number;
  minimumStock: number;
  warehouseId: number;
  bizId: number;
}

// ── وظائف الإشعار المتخصصة ──────────────────────────────────────────────────
import { wsService } from '../services/websocket.service.ts';

/**
 * إشعار بسند جديد لجميع مستخدمي العمل
 */
export async function notifyNewVoucher(payload: VoucherNotification): Promise<void> {
  wsService.notifyBusiness(payload.bizId, {
    type: 'new_voucher',
    voucherId: payload.voucherId,
    voucherType: payload.voucherType,
    amount: payload.amount,
    currency: payload.currency,
    createdBy: payload.createdBy,
    timestamp: new Date().toISOString(),
  });
}

/**
 * إشعار بتغيير حالة سند
 */
export async function notifyStatusChange(payload: StatusChangeNotification): Promise<void> {
  wsService.notifyBusiness(payload.bizId, {
    type: 'status_change',
    voucherId: payload.voucherId,
    fromStatus: payload.fromStatus,
    toStatus: payload.toStatus,
    changedBy: payload.changedBy,
    timestamp: new Date().toISOString(),
  });
}

/**
 * إشعار بتحديث شاشة مخصصة
 */
export async function notifyScreenUpdate(bizId: number, screenId: number): Promise<void> {
  wsService.notifyScreenUpdate(bizId, screenId);
}

/**
 * إشعار بمخزون منخفض
 */
export async function notifyLowStock(payload: LowStockNotification): Promise<void> {
  wsService.notifyBusiness(payload.bizId, {
    type: 'low_stock',
    itemId: payload.itemId,
    itemName: payload.itemName,
    currentStock: payload.currentStock,
    minimumStock: payload.minimumStock,
    warehouseId: payload.warehouseId,
    priority: 'high',
    timestamp: new Date().toISOString(),
  });
}

/**
 * إشعار بموعد رواتب
 */
export async function notifySalaryDue(bizId: number, month: number, year: number, count: number): Promise<void> {
  wsService.notifyBusiness(bizId, {
    type: 'salary_due',
    month,
    year,
    unpaidCount: count,
    priority: 'normal',
    timestamp: new Date().toISOString(),
  });
}

/**
 * إشعار نظامي عام
 */
export async function notifySystem(bizId: number, message: string, priority: NotificationPayload['priority'] = 'normal'): Promise<void> {
  wsService.notifyBusiness(bizId, {
    type: 'system',
    message,
    priority,
    timestamp: new Date().toISOString(),
  });
}

/**
 * إشعار مستخدم واحد بشكل مباشر
 */
export async function notifyUser(userId: number, payload: Record<string, unknown>): Promise<void> {
  wsService.notifyUser(userId, {
    ...payload,
    timestamp: new Date().toISOString(),
  });
}

/**
 * الحصول على عدد الاتصالات النشطة
 */
export function getActiveConnections(): number {
  return wsService.getConnectedCount();
}

/**
 * إشعار دفعي لعدة أعمال في نفس الوقت
 */
export async function broadcastToBusinesses(
  bizIds: number[],
  payload: Omit<NotificationPayload, 'bizId'>
): Promise<void> {
  for (const bizId of bizIds) {
    wsService.notifyBusiness(bizId, { ...payload, bizId });
  }
}
