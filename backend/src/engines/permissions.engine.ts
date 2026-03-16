/**
 * محرك الصلاحيات (Permissions Engine) - Middleware
 * ====================================
 * حسب الخطة التنفيذية - محرك 6
 * 
 * checkPermission(resource, action) → middleware يتحقق من صلاحية المستخدم
 * يعمل مع جداول: roles, rolePermissions, userRoles
 * يدعم constraints: {maxAmount, stationIds, operationTypeIds, accountIds}
 * 
 * admin يتجاوز كل الصلاحيات
 */

import { Context, Next } from 'hono';
import { db } from '../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { roles, rolePermissions, userRoles } from '../db/schema/index.ts';

// ===================== واجهات =====================

interface PermissionConstraints {
  maxAmount?: number;
  stationIds?: number[];
  operationTypeIds?: number[];
  accountIds?: number[];
}

interface UserPermission {
  resource: string;
  action: string;
  constraints: PermissionConstraints;
}

// ===================== كاش الصلاحيات =====================

const permissionsCache = new Map<string, { permissions: UserPermission[]; maxVoucherAmount: number | null; maxDailyAmount: number | null; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 دقائق

function getCacheKey(userId: number, bizId: number): string {
  return `${userId}:${bizId}`;
}

/**
 * جلب صلاحيات المستخدم لعمل معين (مع كاش)
 */
async function getUserPermissions(userId: number, bizId: number): Promise<{
  permissions: UserPermission[];
  maxVoucherAmount: number | null;
  maxDailyAmount: number | null;
}> {
  const cacheKey = getCacheKey(userId, bizId);
  const cached = permissionsCache.get(cacheKey);
  
  if (cached && (Date.now() - cached.timestamp) < CACHE_TTL) {
    return cached;
  }

  // جلب أدوار المستخدم في هذا العمل
  const userRolesList = await db.select({
    roleId: userRoles.roleId,
    maxVoucherAmount: roles.maxVoucherAmount,
    maxDailyAmount: roles.maxDailyAmount,
  })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(and(
      eq(userRoles.userId, userId),
      eq(userRoles.businessId, bizId),
      eq(roles.isActive, true)
    ));

  if (userRolesList.length === 0) {
    const result = { permissions: [], maxVoucherAmount: null, maxDailyAmount: null, timestamp: Date.now() };
    permissionsCache.set(cacheKey, result);
    return result;
  }

  // جلب صلاحيات كل الأدوار
  const roleIds = userRolesList.map(r => r.roleId);
  const allPermissions: UserPermission[] = [];

  for (const roleId of roleIds) {
    const perms = await db.select({
      resource: rolePermissions.resource,
      action: rolePermissions.action,
      constraints: rolePermissions.constraints,
    })
      .from(rolePermissions)
      .where(eq(rolePermissions.roleId, roleId));

    for (const p of perms) {
      allPermissions.push({
        resource: p.resource,
        action: p.action,
        constraints: (p.constraints || {}) as PermissionConstraints,
      });
    }
  }

  // أخذ أعلى حد مبلغ من كل الأدوار
  const maxVoucherAmount = userRolesList.reduce((max, r) => {
    const val = r.maxVoucherAmount ? Number(r.maxVoucherAmount) : null;
    if (val === null) return max;
    if (max === null) return val;
    return Math.max(max, val);
  }, null as number | null);

  const maxDailyAmount = userRolesList.reduce((max, r) => {
    const val = r.maxDailyAmount ? Number(r.maxDailyAmount) : null;
    if (val === null) return max;
    if (max === null) return val;
    return Math.max(max, val);
  }, null as number | null);

  const result = { permissions: allPermissions, maxVoucherAmount, maxDailyAmount, timestamp: Date.now() };
  permissionsCache.set(cacheKey, result);
  return result;
}

// ===================== مسح الكاش =====================

export function clearPermissionsCache(userId?: number, bizId?: number) {
  if (userId && bizId) {
    permissionsCache.delete(getCacheKey(userId, bizId));
  } else {
    permissionsCache.clear();
  }
}

// ===================== Middleware الرئيسي =====================

/**
 * middleware يتحقق من أن المستخدم لديه صلاحية (resource, action) على العمل الحالي
 * 
 * الاستخدام:
 * api.post('/businesses/:bizId/vouchers', bizAuthMiddleware(), checkPermission('vouchers', 'create'), handler)
 */
export function checkPermission(resource: string, action: string) {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as { userId: number; role: string } | undefined;
    if (!user) {
      return c.json({ error: 'غير مصرح' }, 401);
    }

    // admin يتجاوز كل الصلاحيات
    if (user.role === 'admin') {
      c.set('userPermissions', { isAdmin: true, constraints: {} });
      await next();
      return;
    }

    const bizId = c.get('bizId') as number;
    if (!bizId) {
      return c.json({ error: 'لم يتم تحديد العمل' }, 400);
    }

    const { permissions, maxVoucherAmount, maxDailyAmount } = await getUserPermissions(user.userId, bizId);

    // البحث عن الصلاحية المطلوبة
    const matchingPerms = permissions.filter(p => p.resource === resource && p.action === action);

    if (matchingPerms.length === 0) {
      return c.json({ 
        error: 'ليس لديك صلاحية لهذا الإجراء',
        required: { resource, action },
      }, 403);
    }

    // دمج constraints من كل الأدوار (أوسع نطاق)
    const mergedConstraints: PermissionConstraints = {};
    
    for (const perm of matchingPerms) {
      if (perm.constraints.maxAmount) {
        mergedConstraints.maxAmount = Math.max(mergedConstraints.maxAmount || 0, perm.constraints.maxAmount);
      }
      if (perm.constraints.stationIds) {
        mergedConstraints.stationIds = [...new Set([...(mergedConstraints.stationIds || []), ...perm.constraints.stationIds])];
      }
      if (perm.constraints.operationTypeIds) {
        mergedConstraints.operationTypeIds = [...new Set([...(mergedConstraints.operationTypeIds || []), ...perm.constraints.operationTypeIds])];
      }
      if (perm.constraints.accountIds) {
        mergedConstraints.accountIds = [...new Set([...(mergedConstraints.accountIds || []), ...perm.constraints.accountIds])];
      }
    }

    // تخزين الصلاحيات في context لاستخدامها في الـ handler
    c.set('userPermissions', {
      isAdmin: false,
      constraints: mergedConstraints,
      maxVoucherAmount,
      maxDailyAmount,
    });

    await next();
  };
}

// ===================== دالة مساعدة للتحقق من القيود =====================

/**
 * التحقق من أن العملية تتوافق مع قيود الصلاحيات
 * تُستدعى من داخل الـ handler بعد checkPermission
 */
export function validateConstraints(
  userPermissions: any,
  data: {
    amount?: number;
    stationId?: number;
    operationTypeId?: number;
    accountId?: number;
  }
): { valid: boolean; error?: string } {
  if (userPermissions.isAdmin) return { valid: true };

  const constraints = userPermissions.constraints as PermissionConstraints;

  // التحقق من حد المبلغ
  if (data.amount) {
    if (constraints.maxAmount && data.amount > constraints.maxAmount) {
      return { valid: false, error: `المبلغ ${data.amount} يتجاوز الحد المسموح ${constraints.maxAmount}` };
    }
    if (userPermissions.maxVoucherAmount && data.amount > userPermissions.maxVoucherAmount) {
      return { valid: false, error: `المبلغ ${data.amount} يتجاوز حد السند المسموح ${userPermissions.maxVoucherAmount}` };
    }
  }

  // التحقق من المحطة
  if (data.stationId && constraints.stationIds && constraints.stationIds.length > 0) {
    if (!constraints.stationIds.includes(data.stationId)) {
      return { valid: false, error: 'ليس لديك صلاحية على هذه المحطة' };
    }
  }

  // التحقق من نوع العملية
  if (data.operationTypeId && constraints.operationTypeIds && constraints.operationTypeIds.length > 0) {
    if (!constraints.operationTypeIds.includes(data.operationTypeId)) {
      return { valid: false, error: 'ليس لديك صلاحية على هذا النوع من العمليات' };
    }
  }

  // التحقق من الحساب
  if (data.accountId && constraints.accountIds && constraints.accountIds.length > 0) {
    if (!constraints.accountIds.includes(data.accountId)) {
      return { valid: false, error: 'ليس لديك صلاحية على هذا الحساب' };
    }
  }

  return { valid: true };
}

// ── دوال إضافية (Phase 2) ─────────────────────────────────────────────────

/**
 * جلب حدود المبالغ لمستخدم معين في عمل معين
 * تُستدعى قبل إنشاء سند للتحقق من الحدود
 */
export async function getUserMaxAmounts(
  userId: number,
  bizId: number,
): Promise<{
  maxVoucherAmount: number | null;
  maxDailyAmount: number | null;
  hasAnyRole: boolean;
}> {
  const userRolesList = await db.select({
    maxVoucherAmount: roles.maxVoucherAmount,
    maxDailyAmount: roles.maxDailyAmount,
    isAdmin: roles.isAdmin,
  })
    .from(userRoles)
    .innerJoin(roles, eq(userRoles.roleId, roles.id))
    .where(and(
      eq(userRoles.userId, userId),
      eq(userRoles.businessId, bizId),
      eq(roles.isActive, true),
    ));

  if (userRolesList.length === 0) {
    return { maxVoucherAmount: null, maxDailyAmount: null, hasAnyRole: false };
  }

  // إذا كان أي دور admin → لا حدود
  if (userRolesList.some((r) => r.isAdmin)) {
    return { maxVoucherAmount: null, maxDailyAmount: null, hasAnyRole: true };
  }

  // دمج الحدود (الأعلى قيمة = الأوسع صلاحية)
  let maxVoucher: number | null = null;
  let maxDaily: number | null = null;

  for (const r of userRolesList) {
    if (r.maxVoucherAmount) {
      maxVoucher = maxVoucher === null
        ? Number(r.maxVoucherAmount)
        : Math.max(maxVoucher, Number(r.maxVoucherAmount));
    }
    if (r.maxDailyAmount) {
      maxDaily = maxDaily === null
        ? Number(r.maxDailyAmount)
        : Math.max(maxDaily, Number(r.maxDailyAmount));
    }
  }

  return { maxVoucherAmount: maxVoucher, maxDailyAmount: maxDaily, hasAnyRole: true };
}

/**
 * التحقق من أن مبلغ السند لا يتجاوز حد المستخدم
 */
export async function checkResourceLimit(
  userId: number,
  bizId: number,
  amount: number,
): Promise<{ allowed: boolean; reason?: string }> {
  const limits = await getUserMaxAmounts(userId, bizId);

  if (!limits.hasAnyRole) {
    return { allowed: false, reason: 'المستخدم ليس لديه أي دور في هذا العمل' };
  }

  if (limits.maxVoucherAmount !== null && amount > limits.maxVoucherAmount) {
    return {
      allowed: false,
      reason: `المبلغ ${amount} يتجاوز الحد المسموح للسند (${limits.maxVoucherAmount})`,
    };
  }

  return { allowed: true };
}
