import { Context, Next } from 'hono';

/**
 * Rate Limiter بسيط يعتمد على الذاكرة
 * يحد من عدد الطلبات لكل IP خلال فترة زمنية محددة
 * 
 * تم تعديل الإعدادات لتكون مناسبة للاستخدام العادي:
 * - API عام: 1000 طلب/دقيقة (بدلاً من 500)
 * - تسجيل الدخول: 20 محاولة/15 دقيقة (بدلاً من 10)
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// تنظيف دوري للذاكرة كل 5 دقائق
setInterval(() => {
  const now = Date.now();
  for (const [storeKey, entry] of store) {
    if (entry.resetAt < now) {
      store.delete(storeKey);
    }
  }
}, 5 * 60 * 1000);

export function rateLimitMiddleware(options: {
  windowMs?: number;  // نافذة الوقت بالملي ثانية (افتراضي: دقيقة)
  maxRequests?: number; // أقصى عدد طلبات (افتراضي: 1000)
} = {}) {
  const windowMs = options.windowMs || 60 * 1000;
  const maxRequests = options.maxRequests || 1000;

  return async (c: Context, next: Next) => {
    const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const key = `${ip}:${windowMs}:${maxRequests}`;
    const now = Date.now();

    let entry = store.get(key);
    if (!entry || entry.resetAt < now) {
      entry = { count: 0, resetAt: now + windowMs };
      store.set(key, entry);
    }

    entry.count++;

    // إضافة headers معيارية
    c.header('X-RateLimit-Limit', String(maxRequests));
    c.header('X-RateLimit-Remaining', String(Math.max(0, maxRequests - entry.count)));
    c.header('X-RateLimit-Reset', String(Math.ceil(entry.resetAt / 1000)));

    if (entry.count > maxRequests) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      c.header('Retry-After', String(retryAfter));
      return c.json({ 
        error: 'تم تجاوز الحد الأقصى للطلبات - حاول مرة أخرى لاحقاً',
        retryAfter: retryAfter,
      }, 429);
    }

    await next();
  };
}

/**
 * Rate Limiter مشدد لنقاط تسجيل الدخول
 * 20 محاولة خلال 15 دقيقة
 */
export function loginRateLimitMiddleware() {
  return rateLimitMiddleware({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    maxRequests: 20, // 20 محاولة (بدلاً من 10)
  });
}

/** تسجيل مستخدم جديد: 10 محاولات / 15 دقيقة */
export function registerRateLimitMiddleware() {
  return rateLimitMiddleware({
    windowMs: 15 * 60 * 1000,
    maxRequests: 10,
  });
}
