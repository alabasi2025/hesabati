/**
 * ══════════════════════════════════════════════════════════════
 * Ownership Middleware — فحص ملكية الموارد
 * ══════════════════════════════════════════════════════════════
 *
 * يحل مشكلة IDOR (Insecure Direct Object Reference) بشكل مركزي.
 * بدلاً من تكرار فحص الملكية في كل route، يُستخدم هذا الملف.
 *
 * الاستخدام:
 *   import { verifyOwnership, assertBelongsToBiz } from '../middleware/ownership.ts';
 *
 *   // في route handler:
 *   const record = await assertBelongsToBiz(db, vouchers, id, bizId, 'السند');
 *   if (!record) return c.json({ error: 'غير موجود أو غير مصرح' }, 404);
 *
 * @module middleware/ownership
 * @since Phase 5
 */

import { db } from '../db/index.ts';
import { eq, and } from 'drizzle-orm';
import type { PgTable } from 'drizzle-orm/pg-core';

// ── نوع السياق العام ────────────────────────────────────────────────────────
export interface OwnershipCheckResult<T = Record<string, unknown>> {
  found: boolean;
  record: T | null;
  error?: string;
}

/**
 * التحقق من أن سجلاً معيناً ينتمي لعمل محدد
 * يفحص حقل businessId أو bizId في الجدول
 */
export async function verifyOwnership<T extends Record<string, unknown>>(
  table: PgTable,
  id: number,
  bizId: number,
  businessIdField: string = 'businessId'
): Promise<OwnershipCheckResult<T>> {
  try {
    const result = await db
      .select()
      .from(table)
      .where(
        and(
          eq((table as unknown as Record<string, unknown>)[businessIdField] as Parameters<typeof eq>[0], bizId),
          eq((table as unknown as Record<string, unknown>)['id'] as Parameters<typeof eq>[0], id)
        )
      )
      .limit(1);

    if (result.length === 0) {
      return { found: false, record: null, error: 'السجل غير موجود أو لا تملك صلاحية الوصول إليه' };
    }

    return { found: true, record: result[0] as T };
  } catch {
    return { found: false, record: null, error: 'خطأ في التحقق من الملكية' };
  }
}

/**
 * نسخة مبسطة — تُرجع السجل مباشرة أو null
 * الأكثر استخداماً في routes
 */
export async function assertBelongsToBiz<T extends Record<string, unknown>>(
  table: PgTable,
  id: number,
  bizId: number,
  entityName: string = 'السجل',
  businessIdField: string = 'businessId'
): Promise<T | null> {
  const result = await verifyOwnership<T>(table, id, bizId, businessIdField);
  return result.found ? result.record : null;
}

/**
 * التحقق من ملكية موارد متعددة دفعة واحدة
 */
export async function verifyMultipleOwnership(
  checks: Array<{ table: PgTable; id: number; bizId: number; field?: string }>
): Promise<{ allValid: boolean; failedIndex: number | null }> {
  for (let i = 0; i < checks.length; i++) {
    const { table, id, bizId, field = 'businessId' } = checks[i];
    const result = await verifyOwnership(table, id, bizId, field);
    if (!result.found) return { allValid: false, failedIndex: i };
  }
  return { allValid: true, failedIndex: null };
}

/**
 * Middleware factory — يُضاف على route كـ middleware
 * يضع نتيجة الفحص في c.set للاستخدام في handler
 */
export function ownershipMiddleware(
  table: PgTable,
  paramName: string = 'id',
  bizIdGetter: (c: { req: { param: (k: string) => string } }) => number,
  businessIdField: string = 'businessId'
) {
  return async (c: Record<string, unknown>, next: () => Promise<void>) => {
    const ctx = c as { req: { param: (k: string) => string }; json: (d: unknown, s: number) => unknown; set: (k: string, v: unknown) => void };
    const id = parseInt(ctx.req.param(paramName));
    const bizId = bizIdGetter(ctx);

    if (!id || isNaN(id)) {
      return ctx.json({ error: 'معرّف غير صالح' }, 400);
    }

    const result = await verifyOwnership(table, id, bizId, businessIdField);
    if (!result.found) {
      return ctx.json({ error: result.error ?? 'غير مصرح بالوصول' }, 404);
    }

    ctx.set('ownedRecord', result.record);
    await next();
  };
}

/**
 * فحص سريع بدون DB — للحالات التي يكون فيها bizId مُضمَّن في المسار
 * يتحقق أن المورد المطلوب ينتمي لنفس bizId في المسار
 */
export function validateBizContext(resourceBizId: number | null | undefined, requestBizId: number): boolean {
  if (resourceBizId === null || resourceBizId === undefined) return false;
  return resourceBizId === requestBizId;
}

/**
 * رسالة خطأ موحدة لـ IDOR
 */
export const IDOR_ERROR = { error: 'السجل غير موجود أو لا تملك صلاحية الوصول إليه' } as const;
export const INVALID_ID_ERROR = { error: 'معرّف غير صالح' } as const;
