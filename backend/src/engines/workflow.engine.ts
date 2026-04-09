/**
 * ══════════════════════════════════════════════════════════════
 * Workflow Engine — محرك سير العمل
 * ══════════════════════════════════════════════════════════════
 * 
 * المسؤوليات:
 * - إدارة حالات السندات (unreviewed → reviewed → confirmed)
 * - تنفيذ الانتقالات بين الحالات مع تسجيل التاريخ
 * - التكامل مع محرك المعاملات عند التأكيد
 * - إعداد سير عمل افتراضي لأنواع العمليات
 * 
 * التكامل:
 *   workflow.engine ←→ transaction.engine (عند التأكيد المالي)
 *   workflow.engine ←→ audit.engine      (تسجيل التغييرات)
 * 
 * @module engines/workflow.engine
 * @since Phase 3
 */

import { db } from '../db/index.ts';
import {
  workflowTransitions,
  workflowHistory,
  vouchers,
  operationTypes,
} from '../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';

// ── Re-exports من workflow.service للتوافق الكامل ──────────────────────────
export type { WorkflowConfig, TransitionInfo, TransitionResult } from '../services/workflow.service.ts';

export {
  getWorkflowConfig,
  getAvailableTransitions,
  canTransition,
  executeTransition,
  getWorkflowHistory,
  setupDefaultWorkflow,
  getOperationTypeTransitions,
  addTransition,
  deleteTransition,
} from '../services/workflow.service.ts';

// ── وظائف إضافية في محرك الـ Workflow ──────────────────────────────────────

/**
 * الحصول على الحالة الحالية للسند
 */
export async function getVoucherStatus(bizId: number, voucherId: number): Promise<{
  status: string;
  voucherType: string;
  operationTypeId: number | null;
} | null> {
  const result = await db
    .select({
      status: vouchers.status,
      voucherType: vouchers.voucherType,
      operationTypeId: vouchers.operationTypeId,
    })
    .from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)))
    .limit(1);

  return result[0] ?? null;
}

/**
 * التحقق من إمكانية إلغاء سند (يجب أن يكون unreviewed)
 */
export async function canCancelWorkflow(bizId: number, voucherId: number): Promise<{
  allowed: boolean;
  reason?: string;
}> {
  const voucher = await getVoucherStatus(bizId, voucherId);
  if (!voucher) return { allowed: false, reason: 'السند غير موجود' };
  if (voucher.status === 'cancelled') return { allowed: false, reason: 'السند ملغى مسبقاً' };
  if (voucher.status === 'confirmed') return { allowed: false, reason: 'لا يمكن إلغاء سند مؤكد' };
  return { allowed: true };
}

/**
 * إحصائيات سير العمل لعمل معين
 */
export async function getWorkflowStats(bizId: number): Promise<{
  totalVouchers: number;
  byStatus: Record<string, number>;
  pendingReview: number;
}> {
  const all = await db
    .select({ status: vouchers.status })
    .from(vouchers)
    .where(eq(vouchers.businessId, bizId));

  const byStatus: Record<string, number> = {};
  all.forEach(v => {
    byStatus[v.status] = (byStatus[v.status] ?? 0) + 1;
  });

  return {
    totalVouchers: all.length,
    byStatus,
    pendingReview: byStatus['draft'] ?? 0,
  };
}

/**
 * جلب سجل تاريخ workflow مع تفاصيل المستخدم
 */
export async function getDetailedWorkflowHistory(bizId: number, voucherId: number) {
  const history = await db
    .select()
    .from(workflowHistory)
    .where(
      and(
        eq(workflowHistory.voucherId, voucherId),
        eq(workflowHistory.businessId, bizId)
      )
    )
    .orderBy(workflowHistory.createdAt);

  return history;
}

/**
 * إعادة تعيين سند إلى حالة unreviewed (للحالات الاستثنائية)
 */
export async function resetVoucherToUnreviewed(
  bizId: number,
  voucherId: number,
  userId: number,
  reason: string
): Promise<{ success: boolean; message: string }> {
  const voucher = await getVoucherStatus(bizId, voucherId);
  if (!voucher) return { success: false, message: 'السند غير موجود' };
  if (voucher.status === 'confirmed') {
    return { success: false, message: 'لا يمكن إعادة تعيين سند مؤكد مالياً' };
  }

  await db
    .update(vouchers)
    .set({ status: 'draft' })
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  // تسجيل في التاريخ
  await db.insert(workflowHistory).values({
    voucherId,
    businessId: bizId,
    userId,
    fromStatus: voucher.status,
    toStatus: 'draft',
    notes: `إعادة تعيين: ${reason}`,
    createdAt: new Date(),
  } as typeof workflowHistory.$inferInsert);

  return { success: true, message: 'تم إعادة تعيين السند إلى غير مراجع' };
}

/**
 * جلب انتقالات متاحة لنوع عملية معين (مع التخزين المؤقت)
 */
const transitionCache = new Map<number, { data: unknown; expires: number }>();

export async function getCachedTransitions(operationTypeId: number) {
  const now = Date.now();
  const cached = transitionCache.get(operationTypeId);
  if (cached && cached.expires > now) return cached.data;

  const transitions = await db
    .select()
    .from(workflowTransitions)
    .where(eq(workflowTransitions.operationTypeId, operationTypeId))
    .orderBy(workflowTransitions.id);

  transitionCache.set(operationTypeId, {
    data: transitions,
    expires: now + 5 * 60 * 1000, // 5 دقائق
  });

  return transitions;
}

/**
 * مسح تخزين الـ transitions المؤقت
 */
export function clearTransitionCache(): void {
  transitionCache.clear();
}
