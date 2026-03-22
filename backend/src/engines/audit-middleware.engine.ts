/**
 * 🔍 Audit Middleware Engine - Phase 5
 * 
 * وسيط مساعد لدمج audit.engine في جميع المسارات بسهولة
 * يوفر دوال مختصرة لتسجيل CRUD operations
 */

import { logAction, type AuditAction } from './audit.engine.ts';

export interface AuditContext {
  userId: number;
  bizId: number;
  tableName: string;
}

/**
 * تسجيل عملية إنشاء
 */
export async function auditCreate(
  ctx: AuditContext,
  recordId: number,
  newData: Record<string, unknown>,
  details?: string
): Promise<void> {
  try {
    await logAction({
      userId: ctx.userId,
      bizId: ctx.bizId,
      action: 'create',
      tableName: ctx.tableName,
      recordId,
      newData,
      details,
    });
  } catch {
    // Audit failures should NOT block main operations
  }
}

/**
 * تسجيل عملية تحديث
 */
export async function auditUpdate(
  ctx: AuditContext,
  recordId: number,
  oldData: Record<string, unknown>,
  newData: Record<string, unknown>,
  details?: string
): Promise<void> {
  try {
    await logAction({
      userId: ctx.userId,
      bizId: ctx.bizId,
      action: 'update',
      tableName: ctx.tableName,
      recordId,
      oldData,
      newData,
      details,
    });
  } catch {
    // Audit failures should NOT block main operations
  }
}

/**
 * تسجيل عملية حذف
 */
export async function auditDelete(
  ctx: AuditContext,
  recordId: number,
  oldData: Record<string, unknown>,
  details?: string
): Promise<void> {
  try {
    await logAction({
      userId: ctx.userId,
      bizId: ctx.bizId,
      action: 'delete',
      tableName: ctx.tableName,
      recordId,
      oldData,
      details,
    });
  } catch {
    // Audit failures should NOT block main operations
  }
}

/**
 * تسجيل عملية مخصصة
 */
export async function auditAction(
  ctx: AuditContext,
  action: AuditAction,
  recordId: number,
  data?: Record<string, unknown>,
  details?: string
): Promise<void> {
  try {
    await logAction({
      userId: ctx.userId,
      bizId: ctx.bizId,
      action,
      tableName: ctx.tableName,
      recordId,
      newData: data,
      details,
    });
  } catch {
    // Audit failures should NOT block main operations
  }
}

/**
 * Helper: إنشاء AuditContext من معلومات المسار
 */
export function makeAuditCtx(userId: number, bizId: number, tableName: string): AuditContext {
  return { userId, bizId, tableName };
}
