/**
 * محرك سير العمل (Workflow Engine)
 * ====================================
 * حسب الخطة التنفيذية - محرك 1
 * 
 * تطوير من محرك أنواع العمليات الموجود
 * 
 * الدوال:
 * - getAvailableTransitions(bizId, voucherId) → الانتقالات المتاحة للسند حسب حالته الحالية
 * - canTransition(bizId, voucherId, transitionId) → هل يمكن تنفيذ هذا الانتقال
 * - executeTransition(bizId, voucherId, transitionId, userId, note) → تنفيذ الانتقال وتسجيله
 * - getWorkflowHistory(bizId, voucherId) → سجل كل الانتقالات
 * - getWorkflowConfig(operationTypeId) → إعدادات سير العمل لنوع العملية
 * - setupDefaultWorkflow(bizId, operationTypeId) → إنشاء سير عمل افتراضي
 */

import { db } from '../db/index.ts';
import { eq, and, sql, desc } from 'drizzle-orm';
import {
  vouchers, operationTypes, workflowTransitions, workflowHistory,
} from '../db/schema/index.ts';
import { normalizeDbResult } from '../utils/db-result.ts';

// ===================== أنواع البيانات =====================

export interface WorkflowConfig {
  enabled: boolean;
  initialStatus: string;
  statuses: string[];
}

export interface TransitionInfo {
  id: number;
  fromStatus: string;
  toStatus: string;
  actionName: string;
  actionIcon: string;
  actionColor: string;
  requiredRole: string | null;
  requiresNote: boolean;
}

export interface TransitionResult {
  success: boolean;
  voucherId: number;
  fromStatus: string;
  toStatus: string;
  actionName: string;
  historyId: number;
}

// ===================== الحالات الافتراضية =====================

const DEFAULT_STATUSES = ['unreviewed', 'reviewed'];

const DEFAULT_TRANSITIONS = [
  { fromStatus: 'unreviewed', toStatus: 'reviewed', actionName: 'مراجعة', actionIcon: 'check_circle', actionColor: '#22c55e' },
  { fromStatus: 'reviewed', toStatus: 'unreviewed', actionName: 'إلغاء المراجعة', actionIcon: 'undo', actionColor: '#f59e0b' },
  { fromStatus: 'pending_approval', toStatus: 'approved', actionName: 'اعتماد', actionIcon: 'verified', actionColor: '#22c55e' },
  { fromStatus: 'pending_approval', toStatus: 'rejected', actionName: 'رفض', actionIcon: 'block', actionColor: '#ef4444' },
];

// ===================== جلب إعدادات سير العمل =====================

export async function getWorkflowConfig(operationTypeId: number): Promise<WorkflowConfig | null> {
  const [opType] = await db.select({
    workflowConfig: operationTypes.workflowConfig,
  }).from(operationTypes).where(eq(operationTypes.id, operationTypeId));

  if (!opType || !opType.workflowConfig) return null;
  const config = opType.workflowConfig as any;
  if (!config.enabled) return null;
  return config as WorkflowConfig;
}

// ===================== جلب الانتقالات المتاحة =====================

export async function getAvailableTransitions(bizId: number, voucherId: number): Promise<TransitionInfo[]> {
  const [voucher] = await db.select({
    id: vouchers.id,
    status: vouchers.status,
    operationTypeId: vouchers.operationTypeId,
    businessId: vouchers.businessId,
  }).from(vouchers).where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!voucher) throw new Error('السند غير موجود أو لا ينتمي لهذا العمل');

  if (!voucher.operationTypeId) return [];
  const config = await getWorkflowConfig(voucher.operationTypeId);
  if (!config) return [];

  const transitions = await db.select({
    id: workflowTransitions.id,
    fromStatus: workflowTransitions.fromStatus,
    toStatus: workflowTransitions.toStatus,
    actionName: workflowTransitions.actionName,
    actionIcon: workflowTransitions.actionIcon,
    actionColor: workflowTransitions.actionColor,
    requiredRole: workflowTransitions.requiredRole,
    requiresNote: workflowTransitions.requiresNote,
  }).from(workflowTransitions)
    .where(and(
      eq(workflowTransitions.businessId, bizId),
      eq(workflowTransitions.operationTypeId, voucher.operationTypeId),
      eq(workflowTransitions.fromStatus, voucher.status),
      eq(workflowTransitions.isActive, true),
    ))
    .orderBy(workflowTransitions.sortOrder);

  return transitions as TransitionInfo[];
}

// ===================== التحقق من إمكانية الانتقال =====================

export async function canTransition(bizId: number, voucherId: number, transitionId: number): Promise<{ allowed: boolean; reason?: string }> {
  const [voucher] = await db.select({
    id: vouchers.id,
    status: vouchers.status,
    operationTypeId: vouchers.operationTypeId,
    businessId: vouchers.businessId,
  }).from(vouchers).where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)));

  if (!voucher) return { allowed: false, reason: 'السند غير موجود' };

  const [transition] = await db.select()
    .from(workflowTransitions)
    .where(and(
      eq(workflowTransitions.id, transitionId),
      eq(workflowTransitions.businessId, bizId),
      eq(workflowTransitions.isActive, true),
    ));

  if (!transition) return { allowed: false, reason: 'الانتقال غير موجود' };
  if (transition.fromStatus !== voucher.status) return { allowed: false, reason: `الحالة الحالية (${voucher.status}) لا تتوافق مع الانتقال المطلوب (من ${transition.fromStatus})` };
  if (voucher.operationTypeId !== transition.operationTypeId) return { allowed: false, reason: 'الانتقال لا ينتمي لنوع عملية هذا السند' };

  return { allowed: true };
}

// ===================== تنفيذ الانتقال =====================

export async function executeTransition(
  bizId: number,
  voucherId: number,
  transitionId: number,
  userId: number,
  note?: string
): Promise<TransitionResult> {
  const check = await canTransition(bizId, voucherId, transitionId);
  if (!check.allowed) throw new Error(check.reason || 'لا يمكن تنفيذ الانتقال');

  const [transition] = await db.select()
    .from(workflowTransitions)
    .where(eq(workflowTransitions.id, transitionId));

  const [voucher] = await db.select({ status: vouchers.status })
    .from(vouchers).where(eq(vouchers.id, voucherId));

  const fromStatus = voucher.status;
  const toStatus = transition.toStatus;

  // تحديث حالة السند
  await db.update(vouchers)
    .set({ status: toStatus as any, updatedAt: new Date() })
    .where(eq(vouchers.id, voucherId));

  // تسجيل في سجل سير العمل
  const [historyEntry] = await db.insert(workflowHistory).values({
    businessId: bizId,
    voucherId,
    transitionId,
    fromStatus,
    toStatus,
    actionName: transition.actionName,
    note: note || null,
    executedBy: userId,
  }).returning({ id: workflowHistory.id });

  return {
    success: true,
    voucherId,
    fromStatus,
    toStatus,
    actionName: transition.actionName,
    historyId: historyEntry.id,
  };
}

// ===================== سجل سير العمل =====================

export async function getWorkflowHistory(bizId: number, voucherId: number) {
  const history = await db.execute(sql`
    SELECT
      wh.id, wh.from_status, wh.to_status, wh.action_name, wh.note,
      wh.executed_at, u.full_name as executed_by_name
    FROM workflow_history wh
    LEFT JOIN users u ON u.id = wh.executed_by
    WHERE wh.business_id = ${bizId} AND wh.voucher_id = ${voucherId}
    ORDER BY wh.executed_at ASC
  `);
  const rows = normalizeDbResult(history);
  return rows;
}

// ===================== إنشاء سير عمل افتراضي =====================

export async function setupDefaultWorkflow(bizId: number, operationTypeId: number): Promise<void> {
  await db.update(operationTypes)
    .set({
      workflowConfig: {
        enabled: true,
        initialStatus: 'unreviewed',
        statuses: DEFAULT_STATUSES,
      } as any,
      updatedAt: new Date(),
    })
    .where(and(eq(operationTypes.id, operationTypeId), eq(operationTypes.businessId, bizId)));

  // حذف الانتقالات القديمة
  await db.delete(workflowTransitions)
    .where(and(
      eq(workflowTransitions.businessId, bizId),
      eq(workflowTransitions.operationTypeId, operationTypeId),
    ));

  // إنشاء الانتقالات الافتراضية
  for (let i = 0; i < DEFAULT_TRANSITIONS.length; i++) {
    const t = DEFAULT_TRANSITIONS[i];
    await db.insert(workflowTransitions).values({
      businessId: bizId,
      operationTypeId,
      fromStatus: t.fromStatus,
      toStatus: t.toStatus,
      actionName: t.actionName,
      actionIcon: t.actionIcon,
      actionColor: t.actionColor,
      sortOrder: i,
    });
  }
}

// ===================== جلب انتقالات نوع عملية =====================

export async function getOperationTypeTransitions(bizId: number, operationTypeId: number) {
  const transitions = await db.select()
    .from(workflowTransitions)
    .where(and(
      eq(workflowTransitions.businessId, bizId),
      eq(workflowTransitions.operationTypeId, operationTypeId),
      eq(workflowTransitions.isActive, true),
    ))
    .orderBy(workflowTransitions.sortOrder);

  return transitions;
}

// ===================== إضافة/حذف انتقال =====================

export async function addTransition(bizId: number, operationTypeId: number, data: {
  fromStatus: string;
  toStatus: string;
  actionName: string;
  actionIcon?: string;
  actionColor?: string;
  requiredRole?: string;
  requiresNote?: boolean;
}) {
  const [transition] = await db.insert(workflowTransitions).values({
    businessId: bizId,
    operationTypeId,
    fromStatus: data.fromStatus,
    toStatus: data.toStatus,
    actionName: data.actionName,
    actionIcon: data.actionIcon || 'check_circle',
    actionColor: data.actionColor || '#3b82f6',
    requiredRole: data.requiredRole || null,
    requiresNote: data.requiresNote || false,
  }).returning();

  return transition;
}

export async function deleteTransition(bizId: number, transitionId: number) {
  await db.delete(workflowTransitions)
    .where(and(
      eq(workflowTransitions.id, transitionId),
      eq(workflowTransitions.businessId, bizId),
    ));
}
