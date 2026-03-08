import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { stations, employees, funds } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, getBody, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import type { AppContext } from './_shared/types.ts';

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
  const [created] = await db.insert(stations).values({ ...body, businessId: bizId }).returning();
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

stationsRoutes.put('/stations/:id', safeHandler('تعديل محطة (legacy)', async (c: AppContext) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const body = await getBody(c);
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  if (!updated) return c.json({ error: 'محطة غير موجودة' }, 404);
  return c.json(updated);
}));

export default stationsRoutes;
