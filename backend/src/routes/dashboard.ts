import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { businesses, businessPartners, stations, employees, accounts, funds, suppliers, vouchers, pendingAccounts, warehouses } from '../db/schema/index.ts';
import { eq, sql, count } from 'drizzle-orm';

const dashboardRoutes = new Hono();

dashboardRoutes.get('/stats', async (c) => {
  try {
    const [bizCount] = await db.select({ count: count() }).from(businesses).where(eq(businesses.isActive, true));
    const [stationCount] = await db.select({ count: count() }).from(stations).where(eq(stations.isActive, true));
    const [employeeCount] = await db.select({ count: count() }).from(employees).where(eq(employees.status, 'active'));
    const [accountCount] = await db.select({ count: count() }).from(accounts).where(eq(accounts.isActive, true));
    const [fundCount] = await db.select({ count: count() }).from(funds).where(eq(funds.isActive, true));
    const [supplierCount] = await db.select({ count: count() }).from(suppliers).where(eq(suppliers.isActive, true));
    const [partnerCount] = await db.select({ count: count() }).from(businessPartners);
    const [voucherCount] = await db.select({ count: count() }).from(vouchers);
    const [pendingCount] = await db.select({ count: count() }).from(pendingAccounts).where(eq(pendingAccounts.status, 'pending'));
    const [warehouseCount] = await db.select({ count: count() }).from(warehouses).where(eq(warehouses.isActive, true));

    const salaryResult = await db.select({
      total: sql<string>`COALESCE(SUM(CAST(salary AS numeric)), 0)`,
    }).from(employees).where(eq(employees.status, 'active'));

    return c.json({
      businesses: bizCount.count,
      stations: stationCount.count,
      employees: employeeCount.count,
      accounts: accountCount.count,
      funds: fundCount.count,
      suppliers: supplierCount.count,
      partners: partnerCount.count,
      vouchers: voucherCount.count,
      pendingAccounts: pendingCount.count,
      warehouses: warehouseCount.count,
      totalSalaries: salaryResult[0]?.total || '0',
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return c.json({ error: 'حدث خطأ في جلب الإحصائيات' }, 500);
  }
});

export default dashboardRoutes;
