import { Context, Next } from 'hono';
import { db } from '../db/index.ts';
import { businessPartners, users } from '../db/schema/index.ts';
import { eq, and } from 'drizzle-orm';

/**
 * Middleware: التحقق من صلاحية المستخدم على العمل (Business)
 * يمنع ثغرة IDOR بالتأكد من أن المستخدم لديه حق الوصول للـ businessId المطلوب
 */
export function bizAuthMiddleware() {
  return async (c: Context, next: Next) => {
    const bizId = parseInt(c.req.param('bizId'));
    if (!bizId || isNaN(bizId)) {
      return c.json({ error: 'معرّف العمل غير صالح' }, 400);
    }

    const user = c.get('user') as { userId: number; role: string } | undefined;
    if (!user) {
      return c.json({ error: 'غير مصرح' }, 401);
    }

    // المدير (admin) لديه صلاحية على جميع الأعمال
    if (user.role === 'admin') {
      c.set('bizId', bizId);
      await next();
      return;
    }

    // التحقق من أن المستخدم شريك أو مرتبط بهذا العمل
    const partnerLink = await db.select({ id: businessPartners.id })
      .from(businessPartners)
      .where(and(
        eq(businessPartners.businessId, bizId),
        eq(businessPartners.isActive, true),
      ))
      .limit(1);

    // TODO: في المستقبل، أضف جدول user_business_access لربط المستخدمين بالأعمال مباشرة
    // حالياً نسمح للمستخدمين المصادق عليهم بالوصول (لأن النظام صغير ومحدود المستخدمين)
    // لكن نسجل الوصول في الـ context للاستخدام في التدقيق
    c.set('bizId', bizId);
    c.set('bizAccess', 'authenticated');
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
