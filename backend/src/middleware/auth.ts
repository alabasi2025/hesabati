import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'hesabati-secret-key-2026';

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
