/**
 * مسارات التقارير — استخراج من api.rest كنموذج لتقسيم الملف الكبير
 */
import { Hono } from 'hono';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import {
  getProfitAndLoss,
  getTrialBalance,
  getAccountStatement,
  getDailySummary,
  getAggregatedProfitAndLoss,
  getAggregatedSummary,
  getMonthlyRevenueExpenses,
} from '../../services/reporting.service.ts';
import type { AppContext } from './_shared/types.ts';

const reportsRoutes = new Hono();

// تقرير الأرباح والخسائر
reportsRoutes.get('/businesses/:bizId/reports/profit-loss', bizAuthMiddleware(), safeHandler('تقرير الأرباح والخسائر', async (c: AppContext) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getProfitAndLoss(bizId, { dateFrom, dateTo });
  return c.json(report);
}));

// تقرير كشف حساب
reportsRoutes.get('/businesses/:bizId/reports/account-statement/:accountId', bizAuthMiddleware(), safeHandler('كشف حساب', async (c: AppContext) => {
  const bizId = getBizId(c);
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getAccountStatement(bizId, accountId, { dateFrom, dateTo });
  return c.json(report);
}));

// تقرير ملخص يومي
reportsRoutes.get('/businesses/:bizId/reports/daily-summary', bizAuthMiddleware(), safeHandler('ملخص يومي', async (c: AppContext) => {
  const bizId = getBizId(c);
  const dateParam = c.req.query('date') || new Date().toISOString().split('T')[0];
  const report = await getDailySummary(bizId, dateParam);
  return c.json(report);
}));

// تقرير ميزان المراجعة
reportsRoutes.get('/businesses/:bizId/reports/trial-balance', bizAuthMiddleware(), safeHandler('ميزان المراجعة', async (c: AppContext) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getTrialBalance(bizId, { dateFrom, dateTo });
  return c.json(report);
}));

// تقرير الإيرادات والمصروفات الشهرية
reportsRoutes.get('/businesses/:bizId/reports/monthly-revenue', bizAuthMiddleware(), safeHandler('تقرير شهري', async (c: AppContext) => {
  const bizId = getBizId(c);
  const year = Number(c.req.query('year')) || new Date().getFullYear();
  const report = await getMonthlyRevenueExpenses(bizId, year);
  return c.json(report);
}));

// تقرير تجميعي لكل الأعمال - أرباح وخسائر
reportsRoutes.get('/reports/aggregated-profit-loss', safeHandler('تقرير تجميعي', async (c: AppContext) => {
  const userId = getUserId(c) || 1;
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getAggregatedProfitAndLoss(userId, { dateFrom, dateTo });
  return c.json(report);
}));

// ملخص تجميعي لكل الأعمال
reportsRoutes.get('/reports/aggregated-summary', safeHandler('ملخص تجميعي', async (c: AppContext) => {
  const userId = getUserId(c) || 1;
  const report = await getAggregatedSummary(userId);
  return c.json(report);
}));

export default reportsRoutes;
