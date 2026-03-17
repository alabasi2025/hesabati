/**
 * screens-permissions.routes.ts — Phase 10
 * صلاحيات الشاشات المخصصة
 */
/**
 * screens-core.routes.ts — Phase 7
 * إدارة الشاشات المخصصة: CRUD + Widgets + Templates + Sidebar + User screens
 */
/**
 * Screens Routes — مسارات الشاشات المخصصة والـ Widgets
 * @module routes/api/screens.routes
 * @since Phase 4
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import {
  screenTemplates, screenWidgets, screenWidgetTemplates,
  screenWidgetAccounts, screenPermissions, customScreenConfig,
  sidebarItems, sidebarSections, uiPages, uiComponents
} from '../../db/schema/core.ts';
import { eq, and, inArray, desc } from 'drizzle-orm';
import { bizAuthMiddleware, getBizId, getUserId, safeHandler, normalizeBody, parseId } from '../../middleware/auth.ts';
import * as ScreensEng from '../../engines/screens.engine.ts';

export const screensRoutes = new Hono();
const api = screensRoutes;



// ===================== صلاحيات الشاشات =====================
api.get('/screens/:screenId/permissions', safeHandler('جلب صلاحيات الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const rows = await db.select({
    id: screenPermissions.id, screenId: screenPermissions.screenId,
    userId: screenPermissions.userId, permission: screenPermissions.permission,
    sortOrder: screenPermissions.sortOrder,
    username: users.username, fullName: users.fullName,
  }).from(screenPermissions)
    .leftJoin(users, eq(screenPermissions.userId, users.id))
    .where(eq(screenPermissions.screenId, screenId));
  return c.json(rows);
}));

api.post('/screens/:screenId/permissions', safeHandler('تعيين صلاحيات الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.userId) return c.json({ error: 'معرّف المستخدم مطلوب' }, 400);
  const [created] = await db.insert(screenPermissions).values({
    screenId,
    userId: body.userId,
    permission: body.permission || body.canView ? 'view' : 'execute',
    sortOrder: body.sortOrder || 0,
  }).returning();
  return c.json(created, 201);
}));

api.put('/screen-permissions/:id', safeHandler('تعديل صلاحية شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصلاحية غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const updateData: any = {};
  if (body.permission !== undefined) updateData.permission = body.permission;
  if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
  // تحويل canView/canEdit/canDelete إلى permission
  if (body.canView !== undefined || body.canEdit !== undefined || body.canDelete !== undefined) {
    if (body.canEdit || body.canDelete) updateData.permission = 'execute';
    else if (body.canView) updateData.permission = 'view';
  }
  const [updated] = await db.update(screenPermissions).set(updateData).where(eq(screenPermissions.id, id)).returning();
  if (!updated) return c.json({ error: 'صلاحية غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/screen-permissions/:id', safeHandler('حذف صلاحية شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصلاحية غير صالح' }, 400);
  await db.delete(screenPermissions).where(eq(screenPermissions.id, id));
  return c.json({ success: true });
}));

api.put('/screens/:screenId/permissions/batch', safeHandler('تحديث صلاحيات دفعة واحدة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const { permissions } = body;
  if (!permissions || !Array.isArray(permissions)) return c.json({ error: 'قائمة الصلاحيات مطلوبة' }, 400);
  
  for (const p of permissions) {
    const permission = (p.canEdit || p.canDelete) ? 'execute' : (p.permission || 'view');
    if (p.id) {
      await db.update(screenPermissions).set({ permission }).where(eq(screenPermissions.id, p.id));
    } else if (p.userId) {
      await db.insert(screenPermissions).values({
        screenId, userId: p.userId, permission, sortOrder: p.sortOrder || 0,
      });
    }
  }
  return c.json({ success: true });
}));


export { screensRoutes as screensPermRoutes };
