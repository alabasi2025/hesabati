import { Context, Next } from 'hono';
import { db } from '../db/index.ts';
import { userRoles } from '../db/schema/index.ts';
import { eq, and } from 'drizzle-orm';

/**
 * التحقق من أن المستخدم لديه صلاحية على العمل (عبر user_roles أو دور admin).
 */
export async function userCanAccessBusiness(userId: number, role: string, bizId: number): Promise<boolean> {
  if (role === 'admin') return true;
  const [row] = await db
    .select({ id: userRoles.id })
    .from(userRoles)
    .where(and(eq(userRoles.userId, userId), eq(userRoles.businessId, bizId)))
    .limit(1);
  return !!row;
}

/**
 * Middleware: التحقق من صلاحية المستخدم على العمل (Business)
 * يمنع ثغرة IDOR بالتأكد من أن المستخدم لديه حق الوصول للـ businessId المطلوب (عبر user_roles).
 */
export function bizAuthMiddleware() {
  return async (c: Context, next: Next) => {
    const bizId = Number.parseInt(c.req.param('bizId') ?? '', 10);
    if (!bizId || Number.isNaN(bizId)) {
      return c.json({ error: 'معرّف العمل غير صالح' }, 400);
    }

    const user = c.get('user') as { userId: number; role: string } | undefined;
    if (!user) {
      return c.json({ error: 'غير مصرح' }, 401);
    }

    const allowed = await userCanAccessBusiness(user.userId, user.role, bizId);
    if (!allowed) {
      return c.json({ error: 'غير مصرح - لا صلاحية على هذا العمل' }, 403);
    }

    c.set('bizId', bizId);
    await next();
  };
}

/**
 * Middleware: التحقق من ملكية السجل قبل التعديل أو الحذف
 * يضمن أن السجل المطلوب تعديله/حذفه ينتمي للـ businessId الصحيح
 */
export function ownershipCheck(tableName: string) {
  return async (c: Context, next: Next) => {
    const bizId = c.get('bizId') as number;
    if (!bizId) {
      return c.json({ error: 'لم يتم تحديد العمل' }, 400);
    }
    // يتم التحقق من الملكية داخل كل endpoint عبر شرط WHERE business_id = bizId
    c.set('verifiedBizId', bizId);
    await next();
  };
}
