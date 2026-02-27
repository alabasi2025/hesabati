import { Context, Next } from 'hono';

/**
 * Rate Limiter بسيط يعتمد على الذاكرة
 * يحد من عدد الطلبات لكل IP خلال فترة زمنية محددة
 */
interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// تنظيف دوري للذاكرة كل 5 دقائق
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (entry.resetAt < now) {
      store.delete(key);
    }
  }
}, 5 * 60 * 1000);

export function rateLimitMiddleware(options: {
  windowMs?: number;  // نافذة الوقت بالملي ثانية (افتراضي: دقيقة)
  maxRequests?: number; // أقصى عدد طلبات (افتراضي: 100)
} = {}) {
  const windowMs = options.windowMs || 60 * 1000;
  const maxRequests = options.maxRequests || 100;

  return async (c: Context, next: Next) => {
    const ip = c.req.header('x-forwarded-for') || c.req.header('x-real-ip') || 'unknown';
    const path = c.req.path;
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
      return c.json({ error: 'تم تجاوز الحد الأقصى للطلبات - حاول مرة أخرى لاحقاً' }, 429);
    }

    await next();
  };
}

/**
 * Rate Limiter مشدد لنقاط تسجيل الدخول
 */
export function loginRateLimitMiddleware() {
  return rateLimitMiddleware({
    windowMs: 15 * 60 * 1000, // 15 دقيقة
    maxRequests: 10, // 10 محاولات فقط
  });
}
