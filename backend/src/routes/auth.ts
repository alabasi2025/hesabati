import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { users } from '../db/schema/index.ts';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { generateToken, authMiddleware } from '../middleware/auth.ts';
import { getBody } from '../middleware/helpers.ts';

const authRoutes = new Hono();

authRoutes.post('/login', async (c) => {
  try {
    const body = await getBody(c);
    const username = body?.username?.trim();
    const password = body?.password?.trim();

    if (!username || !password?.trim()) {
      return c.json({ error: 'اسم المستخدم وكلمة المرور مطلوبان' }, 400);
    }

    const [user] = await db.select().from(users).where(eq(users.username, username)).limit(1);

    if (!user) {
      return c.json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }, 401);
    }

    if (!user.isActive) {
      return c.json({ error: 'الحساب معطل - تواصل مع المسؤول' }, 403);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return c.json({ error: 'اسم المستخدم أو كلمة المرور غير صحيحة' }, 401);
    }

    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role,
    });

    return c.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error('Login error:', msg, error);
    return c.json({
      error: process.env.NODE_ENV === 'development' ? `حدث خطأ في تسجيل الدخول: ${msg}` : 'حدث خطأ في تسجيل الدخول',
    }, 500);
  }
});

/** التحقق من قوة كلمة المرور: 8 أحرف على الأقل، حرف واحد ورقم واحد على الأقل */
function isPasswordStrong(pwd: string): { valid: boolean; error?: string } {
  if (!pwd || typeof pwd !== 'string') return { valid: false, error: 'كلمة المرور مطلوبة' };
  if (pwd.length < 8) return { valid: false, error: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' };
  if (!/[a-zA-Z]/.test(pwd)) return { valid: false, error: 'كلمة المرور يجب أن تحتوي على حرف واحد على الأقل' };
  if (!/\d/.test(pwd)) return { valid: false, error: 'كلمة المرور يجب أن تحتوي على رقم واحد على الأقل' };
  return { valid: true };
}

authRoutes.post('/register', async (c) => {
  try {
    const body = await getBody(c);
    const username = body?.username;
    const password = body?.password;
    const fullName = body?.fullName;
    // ⚠️ أمان: لا نسمح للمستخدم بتعيين دوره - دائماً viewer
    // لتغيير الدور، يجب أن يقوم مسؤول بذلك من لوحة التحكم

    if (!username || !password || !fullName) {
      return c.json({ error: 'اسم المستخدم وكلمة المرور والاسم الكامل مطلوبان' }, 400);
    }

    if (!username || typeof username !== 'string' || username.trim().length === 0) {
      return c.json({ error: 'اسم المستخدم مطلوب' }, 400);
    }

    const pwdCheck = isPasswordStrong(password);
    if (!pwdCheck.valid) {
      return c.json({ error: pwdCheck.error }, 400);
    }

    const existing = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (existing.length > 0) {
      return c.json({ error: 'اسم المستخدم مستخدم بالفعل' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await db.insert(users).values({
      username,
      password: hashedPassword,
      fullName,
      role: 'viewer', // دائماً viewer - لا يمكن للمستخدم تعيين دوره
    }).returning();

    return c.json({
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        role: newUser.role,
      },
    }, 201);
  } catch (error: unknown) {
    console.error('Register error:', error);
    return c.json({ error: 'حدث خطأ في التسجيل' }, 500);
  }
});

// === GET /me - جلب بيانات المستخدم الحالي ===
authRoutes.get('/me', authMiddleware(), async (c: any) => {
  try {
    const decoded = c.get('user') as { userId: number; role: string } | undefined;
    if (!decoded?.userId) return c.json({ error: 'توكن غير صالح' }, 401);

    const [user] = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    if (!user) return c.json({ error: 'المستخدم غير موجود' }, 404);

    return c.json({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role,
      isActive: user.isActive,
    });
  } catch (error: unknown) {
    console.error('Auth me error:', error);
    return c.json({ error: 'حدث خطأ في جلب بيانات المستخدم' }, 500);
  }
});

export default authRoutes;
