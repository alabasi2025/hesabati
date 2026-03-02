import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { businesses, businessPartners, stations, employees, accounts, funds, suppliers, vouchers, pendingAccounts, warehouses } from '../db/schema/index.ts';
import { eq, sql, count } from 'drizzle-orm';

const dashboardRoutes = new Hono();

// إصلاح #8: N+1 - استعلام واحد مجمع
dashboardRoutes.get('/stats', async (c) => {
  try {
    const [
      bizCount,
      stationCount,
      employeeCount,
      accountCount,
      fundCount,
      supplierCount,
      partnerCount,
      voucherCount,
      pendingCount,
      warehouseCount,
      salaryResult,
    ] = await Promise.all([
      db.select({ count: count() }).from(businesses).where(eq(businesses.isActive, true)),
      db.select({ count: count() }).from(stations).where(eq(stations.isActive, true)),
      db.select({ count: count() }).from(employees).where(eq(employees.status, 'active')),
      db.select({ count: count() }).from(accounts).where(eq(accounts.isActive, true)),
      db.select({ count: count() }).from(funds).where(eq(funds.isActive, true)),
      db.select({ count: count() }).from(suppliers).where(eq(suppliers.isActive, true)),
      db.select({ count: count() }).from(businessPartners),
      db.select({ count: count() }).from(vouchers),
      db.select({ count: count() }).from(pendingAccounts).where(eq(pendingAccounts.status, 'pending')),
      db.select({ count: count() }).from(warehouses).where(eq(warehouses.isActive, true)),
      db.select({ total: sql<string>`COALESCE(SUM(CAST(salary AS numeric)), 0)` }).from(employees).where(eq(employees.status, 'active')),
    ]);

    const num = (arr: { count: number }[], def = 0) => (arr && arr[0] != null ? Number(arr[0].count) : def);
    const totalSalaries = (salaryResult && salaryResult[0] != null && salaryResult[0].total != null)
      ? String(salaryResult[0].total)
      : '0';

    return c.json({
      businesses: num(bizCount),
      stations: num(stationCount),
      employees: num(employeeCount),
      accounts: num(accountCount),
      funds: num(fundCount),
      suppliers: num(supplierCount),
      partners: num(partnerCount),
      vouchers: num(voucherCount),
      pendingAccounts: num(pendingCount),
      warehouses: num(warehouseCount),
      totalSalaries,
    });
  } catch (error: any) {
    console.error('Dashboard stats error:', error?.message || error);
    if (process.env.NODE_ENV === 'development' && error?.stack) console.error(error.stack);
    return c.json({ error: 'حدث خطأ في جلب الإحصائيات' }, 500);
  }
});

export default dashboardRoutes;
