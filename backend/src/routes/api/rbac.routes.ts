/**
 * RBAC Routes — مسارات نظام الصلاحيات
 * @module routes/api/rbac.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { roles, rolePermissions, userRoles, users } from '../../db/schema/core.ts';
import { eq, and, inArray, count } from 'drizzle-orm';
import { getUserMaxAmounts, checkResourceLimit } from '../../engines/permissions.engine.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

export const rbacRoutes = new Hono();
const api = rbacRoutes;

// ===================== نظام الصلاحيات RBAC =====================
api.get('/businesses/:bizId/roles', bizAuthMiddleware(), safeHandler('جلب الأدوار', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(roles).where(eq(roles.businessId, bizId)).orderBy(roles.name);
  // جلب الصلاحيات لكل دور
  const roleIds = rows.map(r => r.id);
  let perms: any[] = [];
  if (roleIds.length > 0) {
    perms = await db.select().from(rolePermissions).where(inArray(rolePermissions.roleId, roleIds));
  }
  const permMap: Record<number, any[]> = {};
  for (const p of perms) {
    if (!permMap[p.roleId]) permMap[p.roleId] = [];
    permMap[p.roleId].push(p);
  }
  // جلب عدد المستخدمين لكل دور
  let userCounts: any[] = [];
  if (roleIds.length > 0) {
    userCounts = await db.select({ roleId: userRoles.roleId, count: count() })
      .from(userRoles).where(inArray(userRoles.roleId, roleIds)).groupBy(userRoles.roleId);
  }
  const countMap: Record<number, number> = {};
  for (const uc of userCounts) { countMap[uc.roleId] = Number(uc.count); }
  return c.json(rows.map(r => ({ ...r, permissions: permMap[r.id] || [], userCount: countMap[r.id] || 0 })));
}));

api.post('/businesses/:bizId/roles', bizAuthMiddleware(), safeHandler('إنشاء دور', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.name) return c.json({ error: 'اسم الدور مطلوب' }, 400);
  const [created] = await db.insert(roles).values({
    businessId: bizId, name: body.name, description: body.description || null,
    color: body.color || '#3b82f6',
    maxVoucherAmount: body.maxVoucherAmount ? String(body.maxVoucherAmount) : null,
    maxDailyAmount: body.maxDailyAmount ? String(body.maxDailyAmount) : null,
  }).returning();
  // إضافة الصلاحيات
  if (body.permissions && Array.isArray(body.permissions)) {
    for (const p of body.permissions) {
      await db.insert(rolePermissions).values({ roleId: created.id, resource: p.resource, action: p.action });
    }
  }
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/roles/:id', bizAuthMiddleware(), safeHandler('تعديل دور', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(roles).set({
    name: body.name, description: body.description, color: body.color,
    maxVoucherAmount: body.maxVoucherAmount ? String(body.maxVoucherAmount) : null,
    maxDailyAmount: body.maxDailyAmount ? String(body.maxDailyAmount) : null,
    updatedAt: new Date(),
  }).where(and(eq(roles.id, id), eq(roles.businessId, bizId))).returning();
  if (!updated) return c.json({ error: 'الدور غير موجود' }, 404);
  // تحديث الصلاحيات
  if (body.permissions !== undefined) {
    await db.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
    if (body.permissions && Array.isArray(body.permissions)) {
      for (const p of body.permissions) {
        await db.insert(rolePermissions).values({ roleId: id, resource: p.resource, action: p.action });
      }
    }
  }
  return c.json(updated);
}));

api.delete('/businesses/:bizId/roles/:id', bizAuthMiddleware(), safeHandler('حذف دور', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [role] = await db.select().from(roles).where(and(eq(roles.id, id), eq(roles.businessId, bizId)));
  if (!role) return c.json({ error: 'الدور غير موجود' }, 404);
  if (role.isSystem) return c.json({ error: 'لا يمكن حذف دور النظام' }, 400);
  await db.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
  await db.delete(userRoles).where(eq(userRoles.roleId, id));
  await db.delete(roles).where(eq(roles.id, id));
  return c.json({ success: true });
}));

// تعيين دور لمستخدم
api.post('/businesses/:bizId/user-roles', bizAuthMiddleware(), safeHandler('تعيين دور لمستخدم', async (c) => {
  const bizId = getBizId(c);
  const assignedBy = getUserId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.userId || !body.roleId) return c.json({ error: 'userId و roleId مطلوبان' }, 400);
  // حذف الدور القديم إن وجد
  await db.delete(userRoles).where(and(eq(userRoles.userId, body.userId), eq(userRoles.businessId, bizId)));
  const [created] = await db.insert(userRoles).values({
    userId: body.userId, roleId: body.roleId, businessId: bizId, assignedBy,
  }).returning();
  return c.json(created, 201);
}));

api.get('/businesses/:bizId/user-roles', bizAuthMiddleware(), safeHandler('جلب أدوار المستخدمين', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select({
    id: userRoles.id, userId: userRoles.userId, roleId: userRoles.roleId,
    userName: users.username, roleName: roles.name, roleColor: roles.color,
    createdAt: userRoles.createdAt,
  }).from(userRoles)
    .leftJoin(users, eq(userRoles.userId, users.id))
    .leftJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(userRoles.businessId, bizId));
  return c.json(rows);
}));

api.delete('/businesses/:bizId/user-roles/:userId', bizAuthMiddleware(), safeHandler('إزالة دور مستخدم', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);
  await db.delete(userRoles).where(and(eq(userRoles.userId, userId), eq(userRoles.businessId, bizId)));
  return c.json({ success: true });
}));

