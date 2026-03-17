/**
 * billing-accounts.routes.ts — Phase 15
 * حسابات الفوترة للموظفين (employee-billing-accounts CRUD)
 */
import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, and } from 'drizzle-orm';
import {
  businesses, employeeBillingAccounts, billingAccountTypes,
  accounts, employees,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, parseId, normalizeBody } from '../middleware/helpers.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';

const billingAccountsApi = new Hono();

billingAccountsApi.get('/businesses/:bizId/employee-billing-accounts', bizAuthMiddleware(), safeHandler('جلب حسابات الفوترة', async (c) => {
  const bizId = getBizId(c);
  const stationId = c.req.query('stationId');
  const employeeId = c.req.query('employeeId');
  
  const rows = await db.select({
    id: employeeBillingAccounts.id,
    employeeId: employeeBillingAccounts.employeeId,
    stationId: employeeBillingAccounts.stationId,
    billingSystemId: employeeBillingAccounts.billingSystemId,
    billingSystemKey: billingSystemsConfig.systemKey,
    billingSystemName: billingSystemsConfig.name,
    collectionMethod: employeeBillingAccounts.collectionMethod,
    label: employeeBillingAccounts.label,
    sortOrder: employeeBillingAccounts.sortOrder,
    isActive: employeeBillingAccounts.isActive,
    notes: employeeBillingAccounts.notes,
    employeeName: employees.fullName,
    stationName: stations.name,
  }).from(employeeBillingAccounts)
    .leftJoin(employees, eq(employeeBillingAccounts.employeeId, employees.id))
    .leftJoin(stations, eq(employeeBillingAccounts.stationId, stations.id))
    .leftJoin(billingSystemsConfig, eq(employeeBillingAccounts.billingSystemId, billingSystemsConfig.id))
    .where(eq(employees.businessId, bizId))
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId, employeeBillingAccounts.sortOrder);
  
  let filtered = rows;
  if (stationId) filtered = filtered.filter(r => r.stationId === Number.parseInt(stationId));
  if (employeeId) filtered = filtered.filter(r => r.employeeId === Number.parseInt(employeeId));
  return c.json(filtered);
}));

billingAccountsApi.post('/employee-billing-accounts', safeHandler('إضافة حساب فوترة', async (c) => {
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(employeeBillingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const employeeId = validation.data?.employeeId;
  if (!employeeId) return c.json({ error: 'معرّف الموظف مطلوب' }, 400);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  if (!employee) return c.json({ error: 'الموظف غير موجود' }, 404);
  const bizId = employee.businessId;

  const [station] = await db.select({ id: stations.id }).from(stations)
    .where(and(eq(stations.id, validation.data.stationId), eq(stations.businessId, bizId)));
  if (!station) return c.json({ error: 'المحطة لا تنتمي لهذه المنشأة' }, 400);

  const [billingSystem] = await db.select({ id: billingSystemsConfig.id }).from(billingSystemsConfig)
    .where(and(eq(billingSystemsConfig.id, validation.data.billingSystemId), eq(billingSystemsConfig.businessId, bizId)));
  if (!billingSystem) return c.json({ error: 'نظام الفوترة لا ينتمي لهذه المنشأة' }, 400);

  const [created] = await db.insert(employeeBillingAccounts).values(validation.data as any).returning();
  return c.json(created, 201);
}));

billingAccountsApi.put('/employee-billing-accounts/:id', safeHandler('تعديل حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف حساب الفوترة غير صالح' }, 400);
  const [rec] = await db.select({ employeeId: employeeBillingAccounts.employeeId }).from(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  if (!rec) return c.json({ error: 'حساب فوترة غير موجود' }, 404);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, rec.employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  if (!employee) return c.json({ error: 'الموظف المرتبط غير موجود' }, 404);
  const bizId = employee.businessId;
  const body = normalizeBody(await c.req.json());
  const payload = body as { employeeId?: number; stationId?: number; billingSystemId?: number };

  if (payload.employeeId) {
    const [targetEmployee] = await db.select({ id: employees.id }).from(employees)
      .where(and(eq(employees.id, payload.employeeId), eq(employees.businessId, bizId)));
    if (!targetEmployee) return c.json({ error: 'الموظف الجديد لا ينتمي لهذه المنشأة' }, 400);
  }
  if (payload.stationId) {
    const [station] = await db.select({ id: stations.id }).from(stations)
      .where(and(eq(stations.id, payload.stationId), eq(stations.businessId, bizId)));
    if (!station) return c.json({ error: 'المحطة لا تنتمي لهذه المنشأة' }, 400);
  }
  if (payload.billingSystemId) {
    const [billingSystem] = await db.select({ id: billingSystemsConfig.id }).from(billingSystemsConfig)
      .where(and(eq(billingSystemsConfig.id, payload.billingSystemId), eq(billingSystemsConfig.businessId, bizId)));
    if (!billingSystem) return c.json({ error: 'نظام الفوترة لا ينتمي لهذه المنشأة' }, 400);
  }
  const [updated] = await db.update(employeeBillingAccounts).set(body).where(eq(employeeBillingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب فوترة غير موجود' }, 404);
  return c.json(updated);
}));

billingAccountsApi.delete('/employee-billing-accounts/:id', safeHandler('حذف حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف حساب الفوترة غير صالح' }, 400);
  const [rec] = await db.select({ employeeId: employeeBillingAccounts.employeeId }).from(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  if (!rec) return c.json({ error: 'حساب فوترة غير موجود' }, 404);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, rec.employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  await db.delete(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  return c.json({ success: true });
}));



export { billingAccountsApi };
