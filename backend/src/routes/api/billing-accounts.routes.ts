/**
 * billing-accounts.routes.ts â€” Phase 15
 * ط­ط³ط§ط¨ط§طھ ط§ظ„ظپظˆطھط±ط© ظ„ظ„ظ…ظˆط¸ظپظٹظ† (employee-billing-accounts CRUD)
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and } from 'drizzle-orm';
import {
  businesses, employeeBillingAccounts, billingAccountTypes,
  accounts, employees,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

const billingAccountsApi = new Hono();

billingAccountsApi.get('/businesses/:bizId/employee-billing-accounts', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط­ط³ط§ط¨ط§طھ ط§ظ„ظپظˆطھط±ط©', async (c) => {
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
  const body = await getBody(c);
  const validation = validateBody(employeeBillingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const employeeId = validation.data?.employeeId;
  if (!employeeId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ظ…ظˆط¸ظپ ظ…ط·ظ„ظˆط¨' }, 400);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  if (!employee) return c.json({ error: 'ط§ظ„ظ…ظˆط¸ظپ ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  const bizId = employee.businessId;

  const [station] = await db.select({ id: stations.id }).from(stations)
    .where(and(eq(stations.id, validation.data.stationId), eq(stations.businessId, bizId)));
  if (!station) return c.json({ error: 'ط§ظ„ظ…ط­ط·ط© ظ„ط§ طھظ†طھظ…ظٹ ظ„ظ‡ط°ظ‡ ط§ظ„ظ…ظ†ط´ط£ط©' }, 400);

  const [billingSystem] = await db.select({ id: billingSystemsConfig.id }).from(billingSystemsConfig)
    .where(and(eq(billingSystemsConfig.id, validation.data.billingSystemId), eq(billingSystemsConfig.businessId, bizId)));
  if (!billingSystem) return c.json({ error: 'ظ†ط¸ط§ظ… ط§ظ„ظپظˆطھط±ط© ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ‡ط°ظ‡ ط§ظ„ظ…ظ†ط´ط£ط©' }, 400);

  const [created] = await db.insert(employeeBillingAccounts).values(validation.data as any).returning();
  return c.json(created, 201);
}));

billingAccountsApi.put('/employee-billing-accounts/:id', safeHandler('طھط¹ط¯ظٹظ„ ط­ط³ط§ط¨ ظپظˆطھط±ط©', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط­ط³ط§ط¨ ط§ظ„ظپظˆطھط±ط© ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [rec] = await db.select({ employeeId: employeeBillingAccounts.employeeId }).from(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  if (!rec) return c.json({ error: 'ط­ط³ط§ط¨ ظپظˆطھط±ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, rec.employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  if (!employee) return c.json({ error: 'ط§ظ„ظ…ظˆط¸ظپ ط§ظ„ظ…ط±طھط¨ط· ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  const bizId = employee.businessId;
  const body = await getBody(c);
  const payload = body as { employeeId?: number; stationId?: number; billingSystemId?: number };

  if (payload.employeeId) {
    const [targetEmployee] = await db.select({ id: employees.id }).from(employees)
      .where(and(eq(employees.id, payload.employeeId), eq(employees.businessId, bizId)));
    if (!targetEmployee) return c.json({ error: 'ط§ظ„ظ…ظˆط¸ظپ ط§ظ„ط¬ط¯ظٹط¯ ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ‡ط°ظ‡ ط§ظ„ظ…ظ†ط´ط£ط©' }, 400);
  }
  if (payload.stationId) {
    const [station] = await db.select({ id: stations.id }).from(stations)
      .where(and(eq(stations.id, payload.stationId), eq(stations.businessId, bizId)));
    if (!station) return c.json({ error: 'ط§ظ„ظ…ط­ط·ط© ظ„ط§ طھظ†طھظ…ظٹ ظ„ظ‡ط°ظ‡ ط§ظ„ظ…ظ†ط´ط£ط©' }, 400);
  }
  if (payload.billingSystemId) {
    const [billingSystem] = await db.select({ id: billingSystemsConfig.id }).from(billingSystemsConfig)
      .where(and(eq(billingSystemsConfig.id, payload.billingSystemId), eq(billingSystemsConfig.businessId, bizId)));
    if (!billingSystem) return c.json({ error: 'ظ†ط¸ط§ظ… ط§ظ„ظپظˆطھط±ط© ظ„ط§ ظٹظ†طھظ…ظٹ ظ„ظ‡ط°ظ‡ ط§ظ„ظ…ظ†ط´ط£ط©' }, 400);
  }
  const [updated] = await db.update(employeeBillingAccounts).set(body).where(eq(employeeBillingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'ط­ط³ط§ط¨ ظپظˆطھط±ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  return c.json(updated);
}));

billingAccountsApi.delete('/employee-billing-accounts/:id', safeHandler('ط­ط°ظپ ط­ط³ط§ط¨ ظپظˆطھط±ط©', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط­ط³ط§ط¨ ط§ظ„ظپظˆطھط±ط© ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const [rec] = await db.select({ employeeId: employeeBillingAccounts.employeeId }).from(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  if (!rec) return c.json({ error: 'ط­ط³ط§ط¨ ظپظˆطھط±ط© ط؛ظٹط± ظ…ظˆط¬ظˆط¯' }, 404);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, rec.employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  await db.delete(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  return c.json({ success: true });
}));



export { billingAccountsApi };

