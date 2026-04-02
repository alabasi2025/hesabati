/**
 * employees-read.routes.ts — Phase 12
 * قراءة الموظفين: قائمة + تفاصيل مع join للمحطة وحساب التحكم
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, count, sql } from 'drizzle-orm';
import { accounts, employees, stations } from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { getPaginationParams, paginatedResult } from '../../middleware/pagination.ts';
import { getBizId } from './_shared/context-helpers.ts';
import type { AppContext } from './_shared/types.ts';

const employeesReadRoutes = new Hono();

type EmployeeColSupport = { departmentId: boolean; jobTitleId: boolean };
let colSupportCache: EmployeeColSupport | null = null;

async function getColSupport(): Promise<EmployeeColSupport> {
  if (colSupportCache) return colSupportCache;
  const result = await db.execute(sql`
    SELECT column_name FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'employees'
      AND column_name IN ('department_id', 'job_title_id')
  `);
  const rows = Array.isArray((result as any)?.rows) ? (result as any).rows : [];
  const names = new Set(rows.map((r: any) => String(r?.column_name ?? '')));
  colSupportCache = { departmentId: names.has('department_id'), jobTitleId: names.has('job_title_id') };
  return colSupportCache;
}

employeesReadRoutes.get(
  '/businesses/:bizId/employees',
  bizAuthMiddleware(),
  safeHandler('جلب الموظفين', async (c: AppContext) => {
    const bizId = getBizId(c);
    const usePagination = c.req.query('page') !== undefined;
    const stationId = c.req.query('stationId') ? Number(c.req.query('stationId')) : null;
    const accountId = c.req.query('accountId') ? Number(c.req.query('accountId')) : null;
    const cs = await getColSupport();

    const buildWhere = () => {
      const conditions: any[] = [eq(employees.businessId, bizId)];
      if (stationId) conditions.push(eq(employees.stationId, stationId));
      if (accountId) conditions.push(eq(employees.accountId, accountId));
      return conditions.length === 1 ? conditions[0] : and(...conditions as [any, ...any[]]);
    };

    const selectFields = {
      id: employees.id,
      fullName: employees.fullName,
      code: employees.code,
      sequenceNumber: employees.sequenceNumber,
      accountId: employees.accountId,
      jobTitle: employees.jobTitle,
      departmentId: cs.departmentId ? employees.departmentId : sql<number | null>`NULL`,
      jobTitleId: cs.jobTitleId ? employees.jobTitleId : sql<number | null>`NULL`,
      stationId: employees.stationId,
      department: employees.department,
      salary: employees.salary,
      salaryCurrency: employees.salaryCurrency,
      monthlyAllowance: employees.monthlyAllowance,
      phone: employees.phone,
      status: employees.status,
      isManager: employees.isManager,
      notes: employees.notes,
      createdAt: employees.createdAt,
      // من المحطة
      stationName: stations.name,
      // من حساب التحكم
      accountName: accounts.name,
      accountCode: accounts.code,
    };

    if (usePagination) {
      const params = getPaginationParams(c);
      const [{ total }] = await db.select({ total: count() }).from(employees).where(buildWhere());
      const rows = await db
        .select(selectFields)
        .from(employees)
        .leftJoin(stations, eq(stations.id, employees.stationId))
        .leftJoin(accounts, eq(accounts.id, employees.accountId))
        .where(buildWhere())
        .orderBy(employees.stationId, employees.fullName)
        .limit(params.limit)
        .offset(params.offset);
      return c.json(paginatedResult(rows, total, params));
    }

    const rows = await db
      .select(selectFields)
      .from(employees)
      .leftJoin(stations, eq(stations.id, employees.stationId))
      .leftJoin(accounts, eq(accounts.id, employees.accountId))
      .where(buildWhere())
      .orderBy(employees.stationId, employees.fullName);
    return c.json(rows);
  }),
);

employeesReadRoutes.get(
  '/businesses/:bizId/employees/:id',
  bizAuthMiddleware(),
  safeHandler('جلب تفاصيل موظف', async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param('id'));
    if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
    const cs = await getColSupport();

    const [row] = await db
      .select({
        id: employees.id,
        fullName: employees.fullName,
        code: employees.code,
        sequenceNumber: employees.sequenceNumber,
        accountId: employees.accountId,
        jobTitle: employees.jobTitle,
        departmentId: cs.departmentId ? employees.departmentId : sql<number | null>`NULL`,
        jobTitleId: cs.jobTitleId ? employees.jobTitleId : sql<number | null>`NULL`,
        stationId: employees.stationId,
        department: employees.department,
        salary: employees.salary,
        salaryCurrency: employees.salaryCurrency,
        monthlyAllowance: employees.monthlyAllowance,
        phone: employees.phone,
        status: employees.status,
        isManager: employees.isManager,
        notes: employees.notes,
        createdAt: employees.createdAt,
        stationName: stations.name,
        accountName: accounts.name,
        accountCode: accounts.code,
      })
      .from(employees)
      .leftJoin(stations, eq(stations.id, employees.stationId))
      .leftJoin(accounts, eq(accounts.id, employees.accountId))
      .where(and(eq(employees.id, id), eq(employees.businessId, bizId)))
      .limit(1);

    if (!row) return c.json({ error: 'موظف غير موجود' }, 404);
    return c.json(row);
  }),
);

export { employeesReadRoutes };
