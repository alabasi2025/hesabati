/**
 * forensic.routes.ts — مسارات التحليل الجنائي المالي
 */
import { Hono } from 'hono';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import {
  getForensicSummary,
  getSuspiciousTransactions,
  getDuplicateEntries,
  getLargeTransactions,
  getUnreviewedVouchers,
} from '../../services/forensic.service.ts';

const forensicRoutes = new Hono();

// ── ملخص التحليل الجنائي ──────────────────────────────────────
forensicRoutes.get('/businesses/:bizId/forensic/summary', bizAuthMiddleware(), safeHandler('ملخص التحليل الجنائي', async (c) => {
  const bizId   = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo   = c.req.query('dateTo');
  const result   = await getForensicSummary(bizId, { dateFrom, dateTo });
  return c.json(result);
}));

// ── المعاملات المشبوهة ────────────────────────────────────────
forensicRoutes.get('/businesses/:bizId/forensic/suspicious', bizAuthMiddleware(), safeHandler('المعاملات المشبوهة', async (c) => {
  const bizId   = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo   = c.req.query('dateTo');
  const result   = await getSuspiciousTransactions(bizId, { dateFrom, dateTo });
  return c.json(result);
}));

// ── الإدخالات المكررة ─────────────────────────────────────────
forensicRoutes.get('/businesses/:bizId/forensic/duplicates', bizAuthMiddleware(), safeHandler('الإدخالات المكررة', async (c) => {
  const bizId   = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo   = c.req.query('dateTo');
  const result   = await getDuplicateEntries(bizId, { dateFrom, dateTo });
  return c.json(result);
}));

// ── المعاملات الكبيرة غير المعتادة ───────────────────────────
forensicRoutes.get('/businesses/:bizId/forensic/large-transactions', bizAuthMiddleware(), safeHandler('المعاملات الكبيرة', async (c) => {
  const bizId   = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo   = c.req.query('dateTo');
  const result   = await getLargeTransactions(bizId, { dateFrom, dateTo });
  return c.json(result);
}));

// ── السندات غير المراجعة ──────────────────────────────────────
forensicRoutes.get('/businesses/:bizId/forensic/unreviewed', bizAuthMiddleware(), safeHandler('السندات غير المراجعة', async (c) => {
  const bizId   = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo   = c.req.query('dateTo');
  const result   = await getUnreviewedVouchers(bizId, { dateFrom, dateTo });
  return c.json(result);
}));

export default forensicRoutes;
