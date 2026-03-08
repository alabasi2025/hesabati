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
    const username = body?.username;
    const password = body?.password;

    if (!username || !password) {
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
    console.error('Login error:', error);
    return c.json({ error: 'حدث خطأ في تسجيل الدخول' }, 500);
  }
});

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
