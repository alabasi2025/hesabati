import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { businesses, businessPartners, stations, employees, accounts, funds, suppliers, vouchers, pendingAccounts, warehouses } from '../db/schema/index.ts';
import { eq, sql, count } from 'drizzle-orm';

const dashboardRoutes = new Hono();

// دالة مساعدة لاستخراج العدد بأمان
const num = (arr: any[], def = 0): number => {
  try {
    return Number(arr?.[0]?.count) || def;
  } catch {
    return def;
  }
};

// إصلاح #8: N+1 - استعلام واحد مجمع
dashboardRoutes.get('/stats', async (c) => {
  try {
    // استخدام استعلامات Drizzle المنفصلة لكن بشكل متوازي
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
      totalSalaries: salaryResult?.[0]?.total || '0',
    });
  } catch (error) {
    console.error('خطأ في جلب إحصائيات لوحة التحكم:', error);
    return c.json({
      error: 'حدث خطأ في جلب الإحصائيات',
      details: error instanceof Error ? error.message : 'خطأ غير معروف',
      location: 'dashboard/stats',
    }, 500);
  }
});

export default dashboardRoutes;
