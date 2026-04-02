/**
 * employees-write.routes.ts — Phase 12
 * مسارات كتابة الموظفين: إنشاء + تعديل + حذف
 * نمط: Control Account (EMP-01) + Subledger متعدد (EMP-01/1, EMP-01/2, ...)
 * حساب تحكم واحد يدعم موظفين متعددين تحته
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import { accounts, employees, employeeBalances, accountCurrencies } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import { getNextEmployeeSequence } from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { getFirstRow } from './_shared/db-helpers.ts';
import type { AppContext } from './_shared/types.ts';

const employeesWriteRoutes = new Hono();

type EmployeeColumnSupport = { departmentId: boolean; jobTitleId: boolean };
let columnSupportCache: EmployeeColumnSupport | null = null;

async function getColumnSupport(): Promise<EmployeeColumnSupport> {
  if (columnSupportCache) return columnSupportCache;
  const result = await db.execute(sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'employees'
      AND column_name IN ('department_id', 'job_title_id')
  `);
  const rows = Array.isArray((result as any)?.rows) ? (result as any).rows : [];
  const names = new Set(rows.map((r: any) => String(r?.column_name ?? '')));
  columnSupportCache = { departmentId: names.has('department_id'), jobTitleId: names.has('job_title_id') };
  return columnSupportCache;
}

employeesWriteRoutes.post(
  '/businesses/:bizId/employees',
  bizAuthMiddleware(),
  safeHandler('إضافة موظف', async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;

    // الحساب المرتبط إلزامي — حساب تحكم واحد يدعم موظفين متعددين
    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالموظف من دليل الحسابات' }, 400);

    const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
    if (!fullName) return c.json({ error: 'اسم الموظف مطلوب' }, 400);

    const [acc] = await db
      .select({ id: accounts.id, sequenceNumber: accounts.sequenceNumber, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    // كود مركّب: كود الحساب/رقم فرعي (EMP-01/1, EMP-01/2, ...)
    const existingCount = await db
      .select({ id: employees.id })
      .from(employees)
      .where(and(eq(employees.businessId, bizId), eq(employees.accountId, accountId)));
    const subSeq = existingCount.length + 1;
    const employeeCode = `${acc.code}/${subSeq}`;

    const departmentId = body.departmentId != null && Number(body.departmentId) > 0
      ? Number(body.departmentId)
      : 0;

    // تحديد العملة الافتراضية
    let defaultCurrencyId: number | null = null;
    if (body.defaultCurrencyId && Number(body.defaultCurrencyId) > 0) {
      defaultCurrencyId = Number(body.defaultCurrencyId);
    }

    const [created] = await db.transaction(async (tx) => {
      const employeeSeq = departmentId > 0
        ? await getNextEmployeeSequence(bizId, departmentId, tx)
        : await getNextEmployeeSequence(bizId, 1, tx);

      const insertResult = await tx.execute(sql`
        INSERT INTO employees (
          business_id, account_id, default_currency_id, sequence_number, code, full_name, station_id,
          department, job_title, salary, salary_currency, phone, status, notes, is_manager
        ) VALUES (
          ${bizId}, ${accountId}, ${defaultCurrencyId}, ${employeeSeq}, ${employeeCode}, ${fullName},
          ${body.stationId ?? null}, ${body.department ?? null}, ${body.jobTitle ?? null},
          ${body.salary ?? '0'}, ${body.salaryCurrency ?? 'YER'}, ${body.phone ?? null},
          ${body.status ?? 'active'}, ${body.notes ?? null}, ${body.isManager ?? false}
        )
        RETURNING *
      `);
      const newEmployee = getFirstRow<any>(insertResult);
      if (!newEmployee) throw new Error('فشل إنشاء الموظف');

      // إنشاء أرصدة بالعملات المحددة أو عملات الحساب
      let currencyIdsToAdd: number[] = [];
      if (body.currencyIds && Array.isArray(body.currencyIds) && body.currencyIds.length > 0) {
        currencyIdsToAdd = body.currencyIds.map((id: any) => Number(id)).filter((id: number) => id > 0);
      } else {
        const accCurrRows = await tx
          .select({ currencyId: accountCurrencies.currencyId })
          .from(accountCurrencies)
          .where(eq(accountCurrencies.accountId, accountId));
        currencyIdsToAdd = accCurrRows.map((ac) => ac.currencyId);
      }
      if (currencyIdsToAdd.length > 0) {
        await tx.insert(employeeBalances).values(
          currencyIdsToAdd.map((currencyId) => ({
            employeeId: newEmployee.id,
            currencyId,
            balance: '0',
            updatedAt: new Date(),
          }))
        );
      }

      return [newEmployee];
    });
    return c.json(created, 201);
  }),
);

employeesWriteRoutes.put(
  '/businesses/:bizId/employees/:id',
  bizAuthMiddleware(),
  safeHandler('تعديل موظف', async (c: AppContext) => {
    const bizId = getBizId(c);
    const columnSupport = await getColumnSupport();
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(employees)
      .where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
    if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    // حماية: لا يمكن تغيير الحساب أو الكود بعد الإنشاء
    delete body.code;
    delete body.accountId;
    const updatePayload: Record<string, unknown> = {
      updatedAt: new Date(),
      fullName: body.fullName,
      stationId: body.stationId,
      department: body.department,
      jobTitle: body.jobTitle,
      salary: body.salary,
      salaryCurrency: body.salaryCurrency,
      phone: body.phone,
      status: body.status,
      notes: body.notes,
      isManager: body.isManager,
    };
    if (columnSupport.departmentId) updatePayload.departmentId = body.departmentId ?? body.department_id;
    if (columnSupport.jobTitleId) updatePayload.jobTitleId = body.jobTitleId ?? body.job_title_id;

    const [updated] = await db
      .update(employees)
      .set(updatePayload as any)
      .where(eq(employees.id, id))
      .returning();
    if (!updated) return c.json({ error: 'موظف غير موجود' }, 404);
    return c.json(updated);
  }),
);

employeesWriteRoutes.delete(
  '/businesses/:bizId/employees/:id',
  bizAuthMiddleware(),
  safeHandler('حذف موظف', async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
    const [existing] = await db
      .select()
      .from(employees)
      .where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
    if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
    await db.delete(employees).where(eq(employees.id, id));
    return c.json({ success: true });
  }),
);

export { employeesWriteRoutes };
