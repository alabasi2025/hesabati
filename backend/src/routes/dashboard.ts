import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { stations, employees, accounts, funds, suppliers, transactions, partners } from '../db/schema/index.ts';
import { eq, sql, count } from 'drizzle-orm';

const dashboardRoutes = new Hono();

dashboardRoutes.get('/stats', async (c) => {
  try {
    const [stationCount] = await db.select({ count: count() }).from(stations).where(eq(stations.isActive, true));
    const [employeeCount] = await db.select({ count: count() }).from(employees).where(eq(employees.status, 'active'));
    const [accountCount] = await db.select({ count: count() }).from(accounts).where(eq(accounts.isActive, true));
    const [fundCount] = await db.select({ count: count() }).from(funds).where(eq(funds.isActive, true));
    const [supplierCount] = await db.select({ count: count() }).from(suppliers).where(eq(suppliers.isActive, true));
    const [partnerCount] = await db.select({ count: count() }).from(partners).where(eq(partners.isActive, true));
    const [transactionCount] = await db.select({ count: count() }).from(transactions);

    // حساب إجمالي الرواتب
    const salaryResult = await db.select({
      total: sql<string>`COALESCE(SUM(CAST(salary AS numeric)), 0)`,
    }).from(employees).where(eq(employees.status, 'active'));

    return c.json({
      stations: stationCount.count,
      employees: employeeCount.count,
      accounts: accountCount.count,
      funds: fundCount.count,
      suppliers: supplierCount.count,
      partners: partnerCount.count,
      transactions: transactionCount.count,
      totalSalaries: salaryResult[0]?.total || '0',
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return c.json({ error: 'حدث خطأ في جلب الإحصائيات' }, 500);
  }
});

dashboardRoutes.get('/stations', async (c) => {
  try {
    const result = await db.select().from(stations).where(eq(stations.isActive, true));
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'حدث خطأ' }, 500);
  }
});

dashboardRoutes.get('/employees', async (c) => {
  try {
    const result = await db.select().from(employees).where(eq(employees.status, 'active'));
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'حدث خطأ' }, 500);
  }
});

dashboardRoutes.get('/accounts', async (c) => {
  try {
    const result = await db.select().from(accounts);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'حدث خطأ' }, 500);
  }
});

dashboardRoutes.get('/funds', async (c) => {
  try {
    const result = await db.select().from(funds);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'حدث خطأ' }, 500);
  }
});

dashboardRoutes.get('/suppliers', async (c) => {
  try {
    const result = await db.select().from(suppliers);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'حدث خطأ' }, 500);
  }
});

dashboardRoutes.get('/partners', async (c) => {
  try {
    const result = await db.select().from(partners);
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'حدث خطأ' }, 500);
  }
});

export default dashboardRoutes;
