import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { employees, stations } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { employeeSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import type { AppContext } from './_shared/types.ts';

const employeesRoutes = new Hono();

employeesRoutes.get('/businesses/:bizId/employees', bizAuthMiddleware(), safeHandler('جلب الموظفين', async (c: AppContext) => {
  const bizId = getBizId(c);
  const rows = await db
    .select({
      id: employees.id,
      fullName: employees.fullName,
      jobTitle: employees.jobTitle,
      stationId: employees.stationId,
      department: employees.department,
      salary: employees.salary,
      salaryCurrency: employees.salaryCurrency,
      phone: employees.phone,
      status: employees.status,
      notes: employees.notes,
      isManager: employees.isManager,
      createdAt: employees.createdAt,
      stationName: stations.name,
    })
    .from(employees)
    .leftJoin(stations, eq(employees.stationId, stations.id))
    .where(eq(employees.businessId, bizId))
    .orderBy(employees.stationId, employees.fullName);
  return c.json(rows);
}));

employeesRoutes.post('/businesses/:bizId/employees', bizAuthMiddleware(), safeHandler('إضافة موظف', async (c: AppContext) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(employeeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as typeof employees.$inferInsert;
  const [created] = await db.insert(employees).values({ ...data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

employeesRoutes.put('/businesses/:bizId/employees/:id', bizAuthMiddleware(), safeHandler('تعديل موظف', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(employees).set({ ...body, updatedAt: new Date() }).where(eq(employees.id, id)).returning();
  return c.json(updated);
}));

employeesRoutes.delete('/businesses/:bizId/employees/:id', bizAuthMiddleware(), safeHandler('حذف موظف', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
}));

employeesRoutes.put('/employees/:id', safeHandler('تعديل موظف (legacy)', async (c: AppContext) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(employees).set({ ...body, updatedAt: new Date() }).where(eq(employees.id, id)).returning();
  if (!updated) return c.json({ error: 'موظف غير موجود' }, 404);
  return c.json(updated);
}));

employeesRoutes.delete('/employees/:id', safeHandler('حذف موظف (legacy)', async (c: AppContext) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
}));

export default employeesRoutes;
