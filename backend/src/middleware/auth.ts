import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// إصلاح #14: إزالة مفتاح JWT الاحتياطي الثابت واستبداله بمفتاح عشوائي
const JWT_SECRET = process.env.JWT_SECRET || (() => {
  const generated = crypto.randomBytes(64).toString('hex');
  console.warn('⚠️ تحذير: لم يتم تعيين JWT_SECRET في متغيرات البيئة. تم توليد مفتاح عشوائي مؤقت.');
  console.warn('⚠️ سيتم إبطال جميع الجلسات عند إعادة تشغيل الخادم.');
  return generated;
})();

export interface JwtPayload {
  userId: number;
  username: string;
  role: string;
}

export function authMiddleware() {
  return async (c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'غير مصرح - يرجى تسجيل الدخول' }, 401);
    }

    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      c.set('user', decoded);
      await next();
    } catch {
      return c.json({ error: 'الجلسة منتهية - يرجى تسجيل الدخول مجدداً' }, 401);
    }
  };
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
