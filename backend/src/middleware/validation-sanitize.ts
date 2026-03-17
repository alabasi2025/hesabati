/**
 * validation-sanitize.ts — Phase 11
 * دوال تنظيف المدخلات (XSS protection)
 */
import { Context, Next } from 'hono';
import { z } from 'zod';

/**
 * سياسة التحقق: كل مسار يعدّل بيانات (POST/PUT/PATCH) يجب أن يمرّر body عبر
 * validateBody(schema, body) قبل الاستخدام. الـ schemas المعرّفة أدناه تغطي
 * معظم الكيانات؛ للمسارات الجديدة أضف schema هنا واستخدمه في الـ handler.
 * انظر ARCHITECTURE.md — تحقق المدخلات.
 */

/**
 * XSS Sanitizer: تنظيف المدخلات النصية من أكواد HTML/JS الخبيثة
 */

export function sanitizeString(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * تنظيف كائن كامل من XSS بشكل عميق (recursive)
 */
export function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') return sanitizeString(obj);
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  if (obj !== null && typeof obj === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(obj)) {
      cleaned[key] = sanitizeObject(value);
    }
    return cleaned;
  }
  return obj;
}

/**
 * Middleware: تنظيف جميع المدخلات من XSS
 */
export function xssSanitizeMiddleware() {
  return async (c: Context, next: Next) => {
    if (['POST', 'PUT', 'PATCH'].includes(c.req.method)) {
      try {
        const body = await c.req.json();
        const sanitized = sanitizeObject(body);
        // نخزن النسخة المنظفة في الـ context
        c.set('sanitizedBody', sanitized);
      } catch {
        // إذا لم يكن هناك body أو ليس JSON، نتجاهل
      }
    }
    await next();
  };
}

// ===================== Zod Schemas =====================

