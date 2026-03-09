import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import { accounts, employees, stations } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { employeeSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, getBody, parseId } from '../../middleware/helpers.ts';
import { TYPE_PREFIXES, generateItemCode, getNextAccountSequence, getNextEmployeeSequence } from '../../middleware/sequencing.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { getFirstRow } from './_shared/db-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';
import type { AppContext } from './_shared/types.ts';

const employeesRoutes = new Hono();

type EmployeeColumnSupport = { departmentId: boolean; jobTitleId: boolean };
let employeeColumnSupportCache: EmployeeColumnSupport | null = null;

async function getEmployeeColumnSupport(): Promise<EmployeeColumnSupport> {
  if (employeeColumnSupportCache) return employeeColumnSupportCache;
  const result = await db.execute(sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'employees'
      AND column_name IN ('department_id', 'job_title_id')
  `);
  const rows = Array.isArray((result as any)?.rows) ? (result as any).rows : [];
  const names = new Set(rows.map((r: any) => String(r?.column_name ?? '')));
  employeeColumnSupportCache = {
    departmentId: names.has('department_id'),
    jobTitleId: names.has('job_title_id'),
  };
  return employeeColumnSupportCache;
}

employeesRoutes.get('/businesses/:bizId/employees', bizAuthMiddleware(), safeHandler('جلب الموظفين', async (c: AppContext) => {
  const bizId = getBizId(c);
  const columnSupport = await getEmployeeColumnSupport();
  const rows = await db
    .select({
      id: employees.id,
      fullName: employees.fullName,
      departmentId: columnSupport.departmentId ? employees.departmentId : sql<number | null>`NULL`,
      jobTitleId: columnSupport.jobTitleId ? employees.jobTitleId : sql<number | null>`NULL`,
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
  const body = await getBody(c);
  const validation = validateBody(employeeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as typeof employees.$inferInsert & { departmentId?: number | null };
  const departmentId = typeof data.departmentId === 'number' ? data.departmentId : Number.NaN;
  if (!Number.isInteger(departmentId) || departmentId <= 0) {
    return c.json({ error: 'تصنيف الموظف (departmentId) مطلوب لإنشاء الحساب المرتبط' }, 400);
  }
  const [created] = await db.transaction(async (tx) => {
    const employeeSeq = await getNextEmployeeSequence(bizId, departmentId, tx);
    const insertResult = await tx.execute(sql`
      INSERT INTO employees (
        business_id, sequence_number, code, full_name, station_id, department, job_title,
        salary, salary_currency, phone, status, notes, is_manager
      ) VALUES (
        ${bizId}, ${employeeSeq}, ${generateItemCode('EMP', employeeSeq)}, ${data.fullName},
        ${data.stationId ?? null}, ${data.department ?? null}, ${data.jobTitle ?? null},
        ${data.salary ?? '0'}, ${data.salaryCurrency ?? 'YER'}, ${data.phone ?? null},
        ${data.status ?? 'active'}, ${data.notes ?? null}, ${data.isManager ?? false}
      )
      RETURNING *
    `);
    const newEmployee = getFirstRow<any>(insertResult);
    if (!newEmployee) throw new Error('فشل إنشاء الموظف');
    const seq = await getNextAccountSequence(bizId, 'employee', departmentId, tx);
    await tx.insert(accounts).values({
      businessId: bizId,
      name: `حساب موظف - ${newEmployee.fullName}`.trim(),
      accountType: 'employee',
      subType: data.department || 'default',
      subTypeId: departmentId,
      linkedEmployeeId: newEmployee.id,
      sequenceNumber: seq,
      code: generateItemCode(TYPE_PREFIXES.employee || 'EMP', seq),
      isActive: true,
      notes: data.notes ?? null,
    });
    return [newEmployee];
  });
  return c.json(created, 201);
}));

employeesRoutes.put('/businesses/:bizId/employees/:id', bizAuthMiddleware(), safeHandler('تعديل موظف', async (c: AppContext) => {
  const bizId = getBizId(c);
  const columnSupport = await getEmployeeColumnSupport();
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = await getBody(c);
  const updatePayload: Record<string, unknown> = {
    updatedAt: new Date(),
    fullName: body?.fullName,
    stationId: body?.stationId,
    department: body?.department,
    jobTitle: body?.jobTitle,
    salary: body?.salary,
    salaryCurrency: body?.salaryCurrency,
    phone: body?.phone,
    status: body?.status,
    notes: body?.notes,
    isManager: body?.isManager,
  };
  if (columnSupport.departmentId) updatePayload.departmentId = body?.departmentId ?? body?.department_id;
  if (columnSupport.jobTitleId) updatePayload.jobTitleId = body?.jobTitleId ?? body?.job_title_id;
  const [updated] = await db.transaction(async (tx) => {
    const [u] = await tx
      .update(employees)
      .set(updatePayload as any)
      .where(eq(employees.id, id))
      .returning();

    const accountName = `حساب موظف - ${u.fullName}`.trim();
    const accountSubType =
      typeof u.department === 'string' && u.department.trim() ? u.department : 'default';
    const accountNotes = u.notes ?? null;

    await tx
      .update(accounts)
      .set({
        name: accountName,
        subType: accountSubType,
        notes: accountNotes,
        isActive: u.status === 'active',
        updatedAt: new Date(),
      })
      .where(and(eq(accounts.businessId, bizId), eq(accounts.accountType, 'employee'), eq(accounts.linkedEmployeeId, id)));

    return [u];
  });
  return c.json(updated);
}));

employeesRoutes.delete('/businesses/:bizId/employees/:id', bizAuthMiddleware(), safeHandler('حذف موظف', async (c: AppContext) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(accounts).where(and(eq(accounts.businessId, bizId), eq(accounts.accountType, 'employee'), eq(accounts.linkedEmployeeId, id)));
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
}));

employeesRoutes.put('/employees/:id', safeHandler('تعديل موظف (legacy)', async (c: AppContext) => {
  const columnSupport = await getEmployeeColumnSupport();
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(eq(employees.id, id));
  const err = await requireResourceOwnership(c, existing ?? null);
  if (err) return err;
  const body = await getBody(c);
  const updatePayload: Record<string, unknown> = {
    updatedAt: new Date(),
    fullName: body?.fullName,
    stationId: body?.stationId,
    department: body?.department,
    jobTitle: body?.jobTitle,
    salary: body?.salary,
    salaryCurrency: body?.salaryCurrency,
    phone: body?.phone,
    status: body?.status,
    notes: body?.notes,
    isManager: body?.isManager,
  };
  if (columnSupport.departmentId) updatePayload.departmentId = body?.departmentId ?? body?.department_id;
  if (columnSupport.jobTitleId) updatePayload.jobTitleId = body?.jobTitleId ?? body?.job_title_id;
  const [updated] = await db.transaction(async (tx) => {
    const [u] = await tx
      .update(employees)
      .set(updatePayload as any)
      .where(eq(employees.id, id))
      .returning();

    const accountName = `حساب موظف - ${u.fullName}`.trim();
    const accountSubType =
      typeof u.department === 'string' && u.department.trim() ? u.department : 'default';
    const accountNotes = u.notes ?? null;

    await tx
      .update(accounts)
      .set({
        name: accountName,
        subType: accountSubType,
        notes: accountNotes,
        isActive: u.status === 'active',
        updatedAt: new Date(),
      })
      .where(and(eq(accounts.accountType, 'employee'), eq(accounts.linkedEmployeeId, id)));

    return [u];
  });
  if (!updated) return c.json({ error: 'موظف غير موجود' }, 404);
  return c.json(updated);
}));

employeesRoutes.delete('/employees/:id', safeHandler('حذف موظف (legacy)', async (c: AppContext) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(eq(employees.id, id));
  const err = await requireResourceOwnership(c, existing ?? null);
  if (err) return err;
  await db.delete(accounts).where(and(eq(accounts.accountType, 'employee'), eq(accounts.linkedEmployeeId, id)));
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
}));

export default employeesRoutes;
