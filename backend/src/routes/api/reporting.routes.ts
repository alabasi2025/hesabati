/**
 * مسارات التقارير — فصل عن api.rest لتحسين قابلية الصيانة
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
  getMonthlyRevenueExpenses,
  getAggregatedProfitAndLoss,
  getAggregatedSummary,
} from '../../services/reporting.service.ts';

const reportingRoutes = new Hono();

// ===================== تقارير مرتبطة بعمل (bizId) =====================

reportingRoutes.get('/businesses/:bizId/reports/profit-loss', bizAuthMiddleware(), safeHandler('تقرير الأرباح والخسائر', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getProfitAndLoss(bizId, { dateFrom, dateTo });
  return c.json(report);
}));

reportingRoutes.get('/businesses/:bizId/reports/account-statement/:accountId', bizAuthMiddleware(), safeHandler('كشف حساب', async (c) => {
  const bizId = getBizId(c);
  const accountId = parseId(c.req.param('accountId'));
  if (!accountId) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getAccountStatement(bizId, accountId, { dateFrom, dateTo });
  return c.json(report);
}));

reportingRoutes.get('/businesses/:bizId/reports/daily-summary', bizAuthMiddleware(), safeHandler('ملخص يومي', async (c) => {
  const bizId = getBizId(c);
  const dateParam = c.req.query('date') || new Date().toISOString().split('T')[0];
  const report = await getDailySummary(bizId, dateParam);
  return c.json(report);
}));

reportingRoutes.get('/businesses/:bizId/reports/trial-balance', bizAuthMiddleware(), safeHandler('ميزان المراجعة', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getTrialBalance(bizId, { dateFrom, dateTo });
  return c.json(report);
}));

reportingRoutes.get('/businesses/:bizId/reports/monthly-revenue', bizAuthMiddleware(), safeHandler('تقرير شهري', async (c) => {
  const bizId = getBizId(c);
  const year = Number(c.req.query('year')) || new Date().getFullYear();
  const report = await getMonthlyRevenueExpenses(bizId, year);
  return c.json(report);
}));

// ===================== تقارير تجميعية (كل الأعمال) =====================

reportingRoutes.get('/reports/aggregated-profit-loss', safeHandler('تقرير تجميعي', async (c) => {
  const userId = getUserId(c) || 1;
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const report = await getAggregatedProfitAndLoss(userId, { dateFrom, dateTo });
  return c.json(report);
}));

reportingRoutes.get('/reports/aggregated-summary', safeHandler('ملخص تجميعي', async (c) => {
  const userId = getUserId(c) || 1;
  const report = await getAggregatedSummary(userId);
  return c.json(report);
}));

export default reportingRoutes;
