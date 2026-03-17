import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { stations, employees, funds } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import { getNextStationSequence } from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';
import type { AppContext } from './_shared/types.ts';
import { auditCreate, auditUpdate, auditDelete, makeAuditCtx } from '../../engines/audit-middleware.engine.ts';

const stationsRoutes = new Hono();

stationsRoutes.get('/businesses/:bizId/stations', bizAuthMiddleware(), safeHandler('جلب المحطات', async (c: AppContext) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(stations).where(eq(stations.businessId, bizId)).orderBy(stations.id);
  return c.json(rows);
}));

stationsRoutes.get('/businesses/:bizId/stations/:id', bizAuthMiddleware(), safeHandler('جلب تفاصيل محطة', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const [station] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!station) return c.json({ error: 'محطة غير موجودة' }, 404);
  const emps = await db.select().from(employees).where(eq(employees.stationId, id));
  const stationFunds = await db.select().from(funds).where(eq(funds.stationId, id));
  return c.json({ ...station, employees: emps, funds: stationFunds });
}));

stationsRoutes.post('/businesses/:bizId/stations', bizAuthMiddleware(), safeHandler('إضافة محطة', async (c: AppContext) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  if (!body.name) return c.json({ error: 'اسم المحطة مطلوب' }, 400);
  if (!body.code) return c.json({ error: 'كود المحطة مطلوب' }, 400);
  const sequenceNumber =
    typeof body.sequenceNumber === 'number'
      ? body.sequenceNumber
      : await getNextStationSequence(bizId);
  const [created] = await db
    .insert(stations)
    .values({ ...body, businessId: bizId, sequenceNumber })
    .returning();
  return c.json(created, 201);
}));

stationsRoutes.delete('/businesses/:bizId/stations/:id', bizAuthMiddleware(), safeHandler('حذف محطة', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const [existing] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!existing) return c.json({ error: 'محطة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  await db.delete(stations).where(eq(stations.id, id));
  return c.json({ success: true });
}));

stationsRoutes.put('/businesses/:bizId/stations/:id', bizAuthMiddleware(), safeHandler('تعديل محطة', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const [existing] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!existing) return c.json({ error: 'محطة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  const body = await getBody(c);
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  return c.json(updated);
}));

// ⚠️ DEPRECATED - legacy route removed (IDOR vulnerability fixed in Phase 5)
// Use: PUT /businesses/:bizId/stations/:id instead
stationsRoutes.put('/stations/:id', safeHandler('تعديل محطة (legacy - deprecated)', async (c: AppContext) => {
  // Phase 5 IDOR Fix: Legacy route now requires authentication
  const user = c.get('user') as { userId: number; role: string } | undefined;
  if (!user) return c.json({ error: 'غير مصرح - يجب تسجيل الدخول' }, 401);
  
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  
  // Verify ownership: get station first, then check user can access its business
  const [station] = await db.select().from(stations).where(eq(stations.id, id));
  if (!station) return c.json({ error: 'محطة غير موجودة' }, 404);
  
  // Import bizAuth check inline
  const { userCanAccessBusiness } = await import('../../middleware/bizAuth.ts');
  const allowed = await userCanAccessBusiness(user.userId, user.role, station.businessId);
  if (!allowed) return c.json({ error: 'غير مصرح - لا صلاحية على هذا العمل' }, 403);
  
  const body = await getBody(c);
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  return c.json({ ...updated, _deprecated: 'استخدم /businesses/:bizId/stations/:id' });
}));

export default stationsRoutes;
