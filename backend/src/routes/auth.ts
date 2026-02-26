import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { users } from '../db/schema/index.ts';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/auth.ts';

const authRoutes = new Hono();

authRoutes.post('/login', async (c) => {
  try {
    const { username, password } = await c.req.json();

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
  } catch (error) {
    console.error('Login error:', error);
    return c.json({ error: 'حدث خطأ في تسجيل الدخول' }, 500);
  }
});

authRoutes.post('/register', async (c) => {
  try {
    const { username, password, fullName, role } = await c.req.json();

    const existing = await db.select().from(users).where(eq(users.username, username)).limit(1);
    if (existing.length > 0) {
      return c.json({ error: 'اسم المستخدم مستخدم بالفعل' }, 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUser] = await db.insert(users).values({
      username,
      password: hashedPassword,
      fullName,
      role: role || 'viewer',
    }).returning();

    return c.json({
      user: {
        id: newUser.id,
        username: newUser.username,
        fullName: newUser.fullName,
        role: newUser.role,
      },
    }, 201);
  } catch (error) {
    console.error('Register error:', error);
    return c.json({ error: 'حدث خطأ في التسجيل' }, 500);
  }
});

export default authRoutes;
