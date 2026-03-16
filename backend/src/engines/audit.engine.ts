/**
 * =====================================================================
 * محرك سجل التدقيق (Audit Engine)
 * =====================================================================
 * Phase 2 — بناء من الصفر (كان db.insert مباشر فقط)
 * 
 * يوحّد منطق سجل التدقيق:
 *   - logAction()        → تسجيل حدث في audit_log
 *   - getAuditLog()      → جلب سجل التدقيق مع فلاتر
 *   - getRecordHistory() → جلب تاريخ سجل معين
 *   - exportAuditReport()→ تصدير تقرير التدقيق (JSON)
 *   - purgeOldLogs()     → حذف سجلات قديمة (maintenance)
 */

import { db } from '../db/index.ts';
import { eq, and, gte, lte, desc, like } from 'drizzle-orm';
import { auditLog } from '../db/schema/index.ts';

// ── واجهات ────────────────────────────────────────────────────────────────

export type AuditAction = 'create' | 'update' | 'delete' | 'cancel' | 'confirm' | 'approve' | 'login' | 'logout' | 'export' | 'import';

export interface AuditLogInput {
  bizId: number;
  userId: number;
  action: AuditAction | string;
  tableName: string;
  recordId: number | null;
  oldData?: Record<string, unknown> | null;
  newData?: Record<string, unknown> | null;
  description?: string | null;
  ipAddress?: string | null;
}

export interface AuditLogEntry {
  id: number;
  businessId: number;
  userId: number | null;
  action: string;
  tableName: string;
  recordId: number | null;
  oldData: Record<string, unknown> | null;
  newData: Record<string, unknown> | null;
  description: string | null;
  createdAt: Date | null;
}

export interface AuditLogFilters {
  tableName?: string;
  recordId?: number;
  userId?: number;
  action?: string;
  fromDate?: string;
  toDate?: string;
  limit?: number;
  offset?: number;
}

export interface AuditReport {
  generatedAt: string;
  bizId: number;
  filters: AuditLogFilters;
  totalRecords: number;
  entries: AuditLogEntry[];
}

// ── الدوال الأساسية ───────────────────────────────────────────────────────

/**
 * تسجيل حدث في سجل التدقيق
 * تُستدعى من جميع عمليات التعديل/الإنشاء/الحذف
 */
export async function logAction(input: AuditLogInput): Promise<void> {
  try {
    await db.insert(auditLog).values({
      businessId: input.bizId,
      userId: input.userId,
      action: input.action,
      tableName: input.tableName,
      recordId: input.recordId,
      oldData: input.oldData ? JSON.stringify(input.oldData) : null,
      newData: input.newData ? JSON.stringify(input.newData) : null,
      description: input.description ?? null,
      createdAt: new Date(),
    });
  } catch {
    // سجل التدقيق لا يجب أن يوقف العمليات الرئيسية
    console.error('[AuditEngine] فشل تسجيل حدث:', input.action, input.tableName, input.recordId);
  }
}

/**
 * جلب سجل التدقيق مع فلاتر متعددة
 */
export async function getAuditLog(
  bizId: number,
  filters: AuditLogFilters = {},
): Promise<AuditLogEntry[]> {
  const conditions = [eq(auditLog.businessId, bizId)];

  if (filters.tableName) conditions.push(eq(auditLog.tableName, filters.tableName));
  if (filters.recordId !== undefined) conditions.push(eq(auditLog.recordId, filters.recordId));
  if (filters.userId !== undefined) conditions.push(eq(auditLog.userId, filters.userId));
  if (filters.action) conditions.push(eq(auditLog.action, filters.action));
  if (filters.fromDate) conditions.push(gte(auditLog.createdAt, new Date(filters.fromDate)));
  if (filters.toDate) conditions.push(lte(auditLog.createdAt, new Date(filters.toDate)));

  const limit = filters.limit ?? 100;
  const offset = filters.offset ?? 0;

  const rows = await db
    .select()
    .from(auditLog)
    .where(and(...conditions))
    .orderBy(desc(auditLog.createdAt))
    .limit(limit)
    .offset(offset);

  return rows.map((r) => ({
    id: r.id,
    businessId: r.businessId,
    userId: r.userId ?? null,
    action: r.action ?? '',
    tableName: r.tableName ?? '',
    recordId: r.recordId ?? null,
    oldData: r.oldData ? JSON.parse(r.oldData as string) : null,
    newData: r.newData ? JSON.parse(r.newData as string) : null,
    description: r.description ?? null,
    createdAt: r.createdAt ?? null,
  }));
}

/**
 * جلب تاريخ تعديلات سجل معين (مرتب من الأحدث)
 */
export async function getRecordHistory(
  bizId: number,
  tableName: string,
  recordId: number,
): Promise<AuditLogEntry[]> {
  return getAuditLog(bizId, { tableName, recordId, limit: 50 });
}

/**
 * تصدير تقرير التدقيق كـ JSON
 */
export async function exportAuditReport(
  bizId: number,
  filters: AuditLogFilters = {},
): Promise<AuditReport> {
  const entries = await getAuditLog(bizId, { ...filters, limit: 10000 });

  return {
    generatedAt: new Date().toISOString(),
    bizId,
    filters,
    totalRecords: entries.length,
    entries,
  };
}

/**
 * حذف سجلات التدقيق الأقدم من N يوم (للصيانة)
 * تُستدعى في maintenance scripts فقط
 */
export async function purgeOldLogs(bizId: number, olderThanDays: number): Promise<number> {
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - olderThanDays);

  const deleted = await db
    .delete(auditLog)
    .where(
      and(
        eq(auditLog.businessId, bizId),
        lte(auditLog.createdAt, cutoff),
      ),
    )
    .returning({ id: auditLog.id });

  return deleted.length;
}

/**
 * إحصائيات سريعة لسجل التدقيق
 */
export async function getAuditStats(
  bizId: number,
  fromDate?: string,
): Promise<{ total: number; byAction: Record<string, number>; byTable: Record<string, number> }> {
  const filters: AuditLogFilters = { limit: 10000 };
  if (fromDate) filters.fromDate = fromDate;

  const entries = await getAuditLog(bizId, filters);

  const byAction: Record<string, number> = {};
  const byTable: Record<string, number> = {};

  for (const e of entries) {
    byAction[e.action] = (byAction[e.action] || 0) + 1;
    byTable[e.tableName] = (byTable[e.tableName] || 0) + 1;
  }

  return { total: entries.length, byAction, byTable };
}
