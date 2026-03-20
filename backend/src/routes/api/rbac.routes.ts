/**
 * RBAC Routes â€” ظ…ط³ط§ط±ط§طھ ظ†ط¸ط§ظ… ط§ظ„طµظ„ط§ط­ظٹط§طھ
 * @module routes/api/rbac.routes
 * @since Phase 3
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { roles, rolePermissions, userRoles, users } from '../../db/schema/core.ts';
import { eq, and } from 'drizzle-orm';
import { getUserMaxAmounts, checkResourceLimit } from '../../engines/permissions.engine.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

export const rbacRoutes = new Hono();
const api = rbacRoutes;

// ===================== ظ†ط¸ط§ظ… ط§ظ„طµظ„ط§ط­ظٹط§طھ RBAC =====================
api.get('/businesses/:bizId/roles', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط§ظ„ط£ط¯ظˆط§ط±', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(roles).where(eq(roles.businessId, bizId)).orderBy(roles.name);
  // ط¬ظ„ط¨ ط§ظ„طµظ„ط§ط­ظٹط§طھ ظ„ظƒظ„ ط¯ظˆط±
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
  // ط¬ظ„ط¨ ط¹ط¯ط¯ ط§ظ„ظ…ط³طھط®ط¯ظ…ظٹظ† ظ„ظƒظ„ ط¯ظˆط±
  let userCounts: any[] = [];
  if (roleIds.length > 0) {
    userCounts = await db.select({ roleId: userRoles.roleId, count: count() })
      .from(userRoles).where(inArray(userRoles.roleId, roleIds)).groupBy(userRoles.roleId);
  }
  const countMap: Record<number, number> = {};
  for (const uc of userCounts) { countMap[uc.roleId] = Number(uc.count); }
  return c.json(rows.map(r => ({ ...r, permissions: permMap[r.id] || [], userCount: countMap[r.id] || 0 })));
}));

api.post('/businesses/:bizId/roles', bizAuthMiddleware(), safeHandler('ط¥ظ†ط´ط§ط، ط¯ظˆط±', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.name) return c.json({ error: 'ط§ط³ظ… ط§ظ„ط¯ظˆط± ظ…ط·ظ„ظˆط¨' }, 400);
  const [created] = await db.insert(roles).values({
    businessId: bizId, name: body.name, description: body.description || null,
    color: body.color || '#3b82f6',
    maxVoucherAmount: body.maxVoucherAmount ? String(body.maxVoucherAmount) : null,
    maxDailyAmount: body.maxDailyAmount ? String(body.maxDailyAmount) : null,
  }).returning();
  // ط¥ط¶ط§ظپط© ط§ظ„طµظ„ط§ط­ظٹط§طھ
  if (body.permissions && Array.isArray(body.permissions)) {
    for (const p of body.permissions) {
      await db.insert(rolePermissions).values({ roleId: created.id, resource: p.resource, action: p.action });
    }
  }
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/roles/:id', bizAuthMiddleware(), safeHandler('طھط¹ط¯ظٹظ„ ط¯ظˆط±', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(roles).set({
    name: body.name, description: body.description, color: body.color,
    maxVoucherAmount: body.maxVoucherAmount ? String(body.maxVoucherAmount) : null,
    maxDailyAmount: body.maxDailyAmount ? String(body.maxDailyAmount) : null,
    updatedAt: new Date(),
  }).where(and(eq(roles.id, id), eq(roles.businessId, bizId))).returning();
  if (!updated) return c.json({ error: 'ط§ظ„ط¯ظˆط± ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  // طھط­ط¯ظٹط« ط§ظ„طµظ„ط§ط­ظٹط§طھ
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

api.delete('/businesses/:bizId/roles/:id', bizAuthMiddleware(), safeHandler('ط­ط°ظپ ط¯ظˆط±', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [role] = await db.select().from(roles).where(and(eq(roles.id, id), eq(roles.businessId, bizId)));
  if (!role) return c.json({ error: 'ط§ظ„ط¯ظˆط± ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  if (role.isSystem) return c.json({ error: 'ظ„ط§ ظٹظ…ظƒظ† ط­ط°ظپ ط¯ظˆط± ط§ظ„ظ†ط¸ط§ظ…' }, 400);
  await db.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
  await db.delete(userRoles).where(eq(userRoles.roleId, id));
  await db.delete(roles).where(eq(roles.id, id));
  return c.json({ success: true });
}));

// طھط¹ظٹظٹظ† ط¯ظˆط± ظ„ظ…ط³طھط®ط¯ظ…
api.post('/businesses/:bizId/user-roles', bizAuthMiddleware(), safeHandler('طھط¹ظٹظٹظ† ط¯ظˆط± ظ„ظ…ط³طھط®ط¯ظ…', async (c) => {
  const bizId = getBizId(c);
  const assignedBy = getUserId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.userId || !body.roleId) return c.json({ error: 'userId ظˆ roleId ظ…ط·ظ„ظˆط¨ط§ظ†' }, 400);
  // ط­ط°ظپ ط§ظ„ط¯ظˆط± ط§ظ„ظ‚ط¯ظٹظ… ط¥ظ† ظˆط¬ط¯
  await db.delete(userRoles).where(and(eq(userRoles.userId, body.userId), eq(userRoles.businessId, bizId)));
  const [created] = await db.insert(userRoles).values({
    userId: body.userId, roleId: body.roleId, businessId: bizId, assignedBy,
  }).returning();
  return c.json(created, 201);
}));

api.get('/businesses/:bizId/user-roles', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط£ط¯ظˆط§ط± ط§ظ„ظ…ط³طھط®ط¯ظ…ظٹظ†', async (c) => {
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

api.delete('/businesses/:bizId/user-roles/:userId', bizAuthMiddleware(), safeHandler('ط¥ط²ط§ظ„ط© ط¯ظˆط± ظ…ط³طھط®ط¯ظ…', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ظ…ط³طھط®ط¯ظ… ط؛ظٹط± طµط§ظ„ط­' }, 400);
  await db.delete(userRoles).where(and(eq(userRoles.userId, userId), eq(userRoles.businessId, bizId)));
  return c.json({ success: true });
}));


