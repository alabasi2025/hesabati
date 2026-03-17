import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import crypto from 'node:crypto';
import fs from 'node:fs';

// إصلاح #14: إزالة مفتاح JWT الاحتياطي الثابت واستبداله بمفتاح عشوائي
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ JWT_SECRET مطلوب في الإنتاج. أعد تشغيل الخادم بعد تعيين المتغير.');
    process.exit(1);
  }
  const devSecretPath = new URL('../../.jwt-dev-secret', import.meta.url);
  try {
    if (fs.existsSync(devSecretPath)) {
      const existing = fs.readFileSync(devSecretPath, 'utf8').trim();
      if (existing.length >= 32) {
        console.warn('⚠️ JWT_SECRET غير موجود في البيئة. تم استخدام مفتاح تطوير محفوظ لضمان استمرار الجلسات.');
        return existing;
      }
    }
    const generated = crypto.randomBytes(64).toString('hex');
    fs.writeFileSync(devSecretPath, generated, { encoding: 'utf8' });
    console.warn('⚠️ JWT_SECRET غير موجود في البيئة. تم إنشاء مفتاح تطوير محلي ثابت.');
    console.warn('⚠️ لتجاوز ذلك، عيّن JWT_SECRET في ملف البيئة.');
    return generated;
  } catch {
    const generated = crypto.randomBytes(64).toString('hex');
    console.warn('⚠️ تعذر حفظ مفتاح تطوير JWT. سيتم استخدام مفتاح مؤقت وقد تنتهي الجلسات بعد إعادة التشغيل.');
    return generated;
  }
})();

export interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

export function authMiddleware() {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return c.json({ error: 'غير مصرح - يرجى تسجيل الدخول' }, 401);
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as JwtPayload;
      c.set('user', decoded);
      await next();
    } catch {
      return c.json({ error: 'الجلسة منتهية - يرجى تسجيل الدخول مجدداً' }, 401);
    }
  };
}

/** يسمح فقط للمستخدمين بدور admin */
export function adminMiddleware() {
  return async (c: Context, next: Next) => {
    const user = c.get('user') as JwtPayload | undefined;
    if (!user || user.role !== 'admin') {
      return c.json({ error: 'غير مصرح - يتطلب دور مسؤول' }, 403);
    }
    await next();
  };
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

/** التحقق من الـ token واستخراج البيانات (للاستخدام خارج HTTP مثل WebSocket). */
export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ["HS256"] }) as JwtPayload;
  } catch {
    return null;
  }
}
