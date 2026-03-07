/**
 * مسارات تصنيفات السندات، تصنيفات المصروفات، ميزانية المصروفات، وسجلات الرواتب
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc } from 'drizzle-orm';
import {
  voucherCategories,
  expenseCategories,
  expenseBudget,
  salaryRecords,
  employees,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const categoriesExpensesRoutes = new Hono();

// ===================== تصنيفات السندات =====================
categoriesExpensesRoutes.get('/businesses/:bizId/voucher-categories', bizAuthMiddleware(), safeHandler('جلب تصنيفات السندات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(voucherCategories).where(eq(voucherCategories.businessId, bizId)).orderBy(voucherCategories.type, voucherCategories.name);
  return c.json(rows);
}));

// ===================== تصنيفات المصروفات =====================
categoriesExpensesRoutes.get('/businesses/:bizId/expense-categories', bizAuthMiddleware(), safeHandler('جلب تصنيفات المصروفات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(expenseCategories).where(eq(expenseCategories.businessId, bizId)).orderBy(expenseCategories.sortOrder, expenseCategories.name);
  return c.json(rows);
}));

categoriesExpensesRoutes.post('/businesses/:bizId/expense-categories', bizAuthMiddleware(), safeHandler('إضافة تصنيف مصروفات', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const [created] = await db.insert(expenseCategories).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
}));

categoriesExpensesRoutes.put('/expense-categories/:id', safeHandler('تعديل تصنيف مصروفات', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseCategories).where(eq(expenseCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(expenseCategories).set({ ...body, updatedAt: new Date() }).where(eq(expenseCategories.id, id)).returning();
  if (!updated) return c.json({ error: 'تصنيف غير موجود' }, 404);
  return c.json(updated);
}));

categoriesExpensesRoutes.delete('/expense-categories/:id', safeHandler('حذف تصنيف مصروفات', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseCategories).where(eq(expenseCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(expenseCategories).where(eq(expenseCategories.id, id));
  return c.json({ success: true });
}));

// ===================== ميزانية المصروفات =====================
categoriesExpensesRoutes.get('/businesses/:bizId/expense-budget', bizAuthMiddleware(), safeHandler('جلب ميزانية المصروفات', async (c) => {
  const bizId = getBizId(c);
  const month = c.req.query('month');
  const year = c.req.query('year');
  const rows = await db.select().from(expenseBudget).where(eq(expenseBudget.businessId, bizId)).orderBy(desc(expenseBudget.createdAt));
  let result = rows;
  if (month) result = result.filter((r) => r.month === Number.parseInt(month));
  if (year) result = result.filter((r) => r.year === Number.parseInt(year));
  return c.json(result);
}));

categoriesExpensesRoutes.post('/businesses/:bizId/expense-budget', bizAuthMiddleware(), safeHandler('إضافة بند ميزانية', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
  const [created] = await db.insert(expenseBudget).values({
    businessId: bizId,
    name: body.name,
    stationId: body.stationId || null,
    amount: String(body.amount ?? 0),
    currencyId: body.currencyId ?? 1,
    expenseType: body.expenseType || 'variable',
    month: body.month ?? null,
    year: body.year ?? null,
    notes: body.notes ?? null,
  }).returning();
  return c.json(created, 201);
}));

categoriesExpensesRoutes.put('/expense-budget/:id', safeHandler('تعديل بند ميزانية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseBudget).where(eq(expenseBudget.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
  const [updated] = await db.update(expenseBudget).set({
    name: body.name,
    stationId: body.stationId ?? null,
    amount: body.amount == null ? undefined : String(body.amount),
    currencyId: body.currencyId,
    expenseType: body.expenseType,
    month: body.month ?? null,
    year: body.year ?? null,
    notes: body.notes ?? null,
  }).where(eq(expenseBudget.id, id)).returning();
  if (updated) return c.json(updated);
  return c.json({ error: 'بند غير موجود' }, 404);
}));

categoriesExpensesRoutes.delete('/expense-budget/:id', safeHandler('حذف بند ميزانية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseBudget).where(eq(expenseBudget.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(expenseBudget).where(eq(expenseBudget.id, id));
  return c.json({ success: true });
}));

// ===================== سجلات الرواتب =====================
categoriesExpensesRoutes.get('/businesses/:bizId/salaries', bizAuthMiddleware(), safeHandler('جلب سجلات الرواتب', async (c) => {
  const bizId = getBizId(c);
  const month = c.req.query('month');
  const year = c.req.query('year');
  const rows = await db.select({
    id: salaryRecords.id,
    businessId: salaryRecords.businessId,
    employeeId: salaryRecords.employeeId,
    month: salaryRecords.month,
    year: salaryRecords.year,
    baseSalary: salaryRecords.baseSalary,
    advance: salaryRecords.advance,
    deductions: salaryRecords.deductions,
    netSalary: salaryRecords.netSalary,
    currencyId: salaryRecords.currencyId,
    isPaid: salaryRecords.isPaid,
    paidDate: salaryRecords.paidDate,
    attendanceDays: salaryRecords.attendanceDays,
    notes: salaryRecords.notes,
    createdAt: salaryRecords.createdAt,
    employeeName: employees.fullName,
  }).from(salaryRecords)
    .leftJoin(employees, eq(salaryRecords.employeeId, employees.id))
    .where(eq(salaryRecords.businessId, bizId))
    .orderBy(desc(salaryRecords.year), desc(salaryRecords.month), employees.fullName);
  let result = rows;
  if (month) result = result.filter((r) => r.month === Number.parseInt(month));
  if (year) result = result.filter((r) => r.year === Number.parseInt(year));
  return c.json(result);
}));

categoriesExpensesRoutes.post('/businesses/:bizId/salaries', bizAuthMiddleware(), safeHandler('إضافة سجل راتب', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
  const baseSalary = Number(body.baseSalary ?? 0);
  const advance = Number(body.advance ?? 0);
  const deductions = Number(body.deductions ?? 0);
  const netSalary = baseSalary - advance - deductions;
  const [created] = await db.insert(salaryRecords).values({
    businessId: bizId,
    employeeId: body.employeeId,
    month: body.month,
    year: body.year,
    baseSalary: String(baseSalary),
    advance: String(advance),
    deductions: String(deductions),
    netSalary: String(netSalary),
    currencyId: body.currencyId ?? 1,
    isPaid: body.isPaid ?? false,
    attendanceDays: body.attendanceDays ?? null,
    notes: body.notes ?? null,
  }).returning();
  return c.json(created, 201);
}));

categoriesExpensesRoutes.put('/salaries/:id', safeHandler('تعديل سجل راتب', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(salaryRecords).where(eq(salaryRecords.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
  const baseSalary = Number(body.baseSalary ?? 0);
  const advance = Number(body.advance ?? 0);
  const deductions = Number(body.deductions ?? 0);
  const netSalary = baseSalary - advance - deductions;
  const [updated] = await db.update(salaryRecords).set({
    baseSalary: String(baseSalary),
    advance: String(advance),
    deductions: String(deductions),
    netSalary: String(netSalary),
    isPaid: body.isPaid ?? undefined,
    paidDate: body.paidDate ?? undefined,
    attendanceDays: body.attendanceDays ?? undefined,
    notes: body.notes ?? undefined,
  }).where(eq(salaryRecords.id, id)).returning();
  if (!updated) return c.json({ error: 'سجل غير موجود' }, 404);
  return c.json(updated);
}));

categoriesExpensesRoutes.delete('/salaries/:id', safeHandler('حذف سجل راتب', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(salaryRecords).where(eq(salaryRecords.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(salaryRecords).where(eq(salaryRecords.id, id));
  return c.json({ success: true });
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/voucher-categories
categoriesExpensesRoutes.get('/voucher-categories', safeHandler('جلب تصنيفات السندات (legacy)', async (c) => {
  const rows = await db.select().from(voucherCategories).orderBy(voucherCategories.type, voucherCategories.name);
  return c.json(rows);
}));

export default categoriesExpensesRoutes;
