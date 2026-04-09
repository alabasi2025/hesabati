/**
 * Fiscal Routes — مسارات السنوات المالية والفترات المحاسبية
 * @module routes/api/fiscal.routes
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { fiscalYears, fiscalPeriods } from '../../db/schema/index.ts';
import { eq, and, desc } from 'drizzle-orm';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';

export const fiscalRoutes = new Hono();

// ===================== السنوات المالية =====================
fiscalRoutes.get('/businesses/:bizId/fiscal-years', bizAuthMiddleware(), safeHandler('جلب السنوات المالية', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(fiscalYears).where(eq(fiscalYears.businessId, bizId)).orderBy(desc(fiscalYears.year));
  return c.json(rows);
}));

fiscalRoutes.post('/businesses/:bizId/fiscal-years', bizAuthMiddleware(), safeHandler('إنشاء سنة مالية', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  if (!body.year) return c.json({ error: 'السنة مطلوبة' }, 400);

  const year = Number(body.year);
  const existing = await db.select({ id: fiscalYears.id }).from(fiscalYears)
    .where(and(eq(fiscalYears.businessId, bizId), eq(fiscalYears.year, year))).limit(1);
  if (existing.length > 0) return c.json({ error: `السنة ${year} موجودة مسبقاً` }, 400);

  const [fy] = await db.insert(fiscalYears).values({
    businessId: bizId,
    year,
    startDate: `${year}-01-01`,
    endDate: `${year}-12-31`,
  }).returning();

  // إنشاء 12 فترة شهرية تلقائياً
  const periods = [];
  for (let m = 1; m <= 12; m++) {
    const lastDay = new Date(year, m, 0).getDate();
    periods.push({
      businessId: bizId,
      fiscalYearId: fy.id,
      month: m,
      startDate: `${year}-${String(m).padStart(2, '0')}-01`,
      endDate: `${year}-${String(m).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`,
    });
  }
  await db.insert(fiscalPeriods).values(periods);

  return c.json(fy, 201);
}));

// إنشاء مجموعة سنوات دفعة واحدة
fiscalRoutes.post('/businesses/:bizId/fiscal-years/bulk', bizAuthMiddleware(), safeHandler('إنشاء سنوات مالية دفعة واحدة', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  if (!body.startYear || !body.endYear) return c.json({ error: 'startYear و endYear مطلوبان' }, 400);

  const startYear = Number(body.startYear);
  const endYear = Number(body.endYear);
  if (startYear > endYear) return c.json({ error: 'startYear يجب أن يكون أصغر من endYear' }, 400);

  const created = [];
  for (let y = startYear; y <= endYear; y++) {
    const existing = await db.select({ id: fiscalYears.id }).from(fiscalYears)
      .where(and(eq(fiscalYears.businessId, bizId), eq(fiscalYears.year, y))).limit(1);
    if (existing.length > 0) continue;

    const [fy] = await db.insert(fiscalYears).values({
      businessId: bizId,
      year: y,
      startDate: `${y}-01-01`,
      endDate: `${y}-12-31`,
    }).returning();

    const periods = [];
    for (let m = 1; m <= 12; m++) {
      const lastDay = new Date(y, m, 0).getDate();
      periods.push({
        businessId: bizId,
        fiscalYearId: fy.id,
        month: m,
        startDate: `${y}-${String(m).padStart(2, '0')}-01`,
        endDate: `${y}-${String(m).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`,
      });
    }
    await db.insert(fiscalPeriods).values(periods);
    created.push(fy);
  }

  return c.json({ created: created.length, years: created }, 201);
}));

// ===================== الفترات المحاسبية =====================
fiscalRoutes.get('/businesses/:bizId/fiscal-years/:yearId/periods', bizAuthMiddleware(), safeHandler('جلب فترات سنة مالية', async (c) => {
  const bizId = getBizId(c);
  const yearId = parseId(c.req.param('yearId'));
  if (!yearId) return c.json({ error: 'معرّف السنة غير صالح' }, 400);

  const rows = await db.select().from(fiscalPeriods)
    .where(and(eq(fiscalPeriods.businessId, bizId), eq(fiscalPeriods.fiscalYearId, yearId)))
    .orderBy(fiscalPeriods.month);
  return c.json(rows);
}));

// إقفال فترة شهرية
fiscalRoutes.post('/businesses/:bizId/fiscal-periods/:periodId/close', bizAuthMiddleware(), safeHandler('إقفال فترة محاسبية', async (c) => {
  const bizId = getBizId(c);
  const periodId = parseId(c.req.param('periodId'));
  const userId = getUserId(c);
  if (!periodId) return c.json({ error: 'معرّف الفترة غير صالح' }, 400);

  const [period] = await db.select().from(fiscalPeriods)
    .where(and(eq(fiscalPeriods.id, periodId), eq(fiscalPeriods.businessId, bizId))).limit(1);
  if (!period) return c.json({ error: 'الفترة غير موجودة' }, 404);
  if (period.isClosed) return c.json({ error: 'الفترة مقفلة مسبقاً' }, 400);

  // التحقق الترتيبي: لا يمكن إقفال فترة إذا فيه فترة قبلها مفتوحة
  const earlierOpen = await db.select({ id: fiscalPeriods.id, month: fiscalPeriods.month }).from(fiscalPeriods)
    .where(and(
      eq(fiscalPeriods.fiscalYearId, period.fiscalYearId),
      eq(fiscalPeriods.isClosed, false),
    ));
  const earlier = earlierOpen.filter(p => p.month < period.month);
  if (earlier.length > 0) {
    const minMonth = Math.min(...earlier.map(p => p.month));
    return c.json({ error: `لا يمكن إقفال هذه الفترة — أقفل الشهر ${minMonth} أولاً` }, 400);
  }

  // فحص فروقات العملة غير المسوّاة
  const { previewRevaluation } = await import('../../engines/revaluation.engine.ts');
  const revalPreview = await previewRevaluation(bizId, period.endDate);
  const hasUnsettledDiffs = revalPreview.lines.some(l => Math.abs(l.difference) >= 0.01);
  if (hasUnsettledDiffs) {
    return c.json({ 
      error: 'لا يمكن إقفال الفترة — يوجد فروقات عملة غير مسوّاة. قم بإعادة التقييم أولاً',
      revaluation: revalPreview,
    }, 400);
  }

  const [updated] = await db.update(fiscalPeriods).set({
    isClosed: true,
    closedAt: new Date(),
    closedBy: userId,
  }).where(eq(fiscalPeriods.id, periodId)).returning();

  return c.json(updated);
}));

// إقفال سنة مالية
fiscalRoutes.post('/businesses/:bizId/fiscal-years/:yearId/close', bizAuthMiddleware(), safeHandler('إقفال سنة مالية', async (c) => {
  const bizId = getBizId(c);
  const yearId = parseId(c.req.param('yearId'));
  const userId = getUserId(c);
  if (!yearId) return c.json({ error: 'معرّف السنة غير صالح' }, 400);

  const [fy] = await db.select().from(fiscalYears)
    .where(and(eq(fiscalYears.id, yearId), eq(fiscalYears.businessId, bizId))).limit(1);
  if (!fy) return c.json({ error: 'السنة غير موجودة' }, 404);
  if (fy.isClosed) return c.json({ error: 'السنة مقفلة مسبقاً' }, 400);

  // التحقق من إقفال جميع الفترات
  const openPeriods = await db.select({ id: fiscalPeriods.id }).from(fiscalPeriods)
    .where(and(eq(fiscalPeriods.fiscalYearId, yearId), eq(fiscalPeriods.isClosed, false)));
  if (openPeriods.length > 0) {
    return c.json({ error: `يجب إقفال جميع الفترات الشهرية أولاً (${openPeriods.length} فترة مفتوحة)` }, 400);
  }

  const [updated] = await db.update(fiscalYears).set({
    isClosed: true,
    closedAt: new Date(),
    closedBy: userId,
  }).where(eq(fiscalYears.id, yearId)).returning();

  return c.json(updated);
}));

// ===================== فتح فترة محاسبية =====================
fiscalRoutes.post('/businesses/:bizId/fiscal-periods/:periodId/reopen', bizAuthMiddleware(), safeHandler('فتح فترة محاسبية', async (c) => {
  const bizId = getBizId(c);
  const periodId = parseId(c.req.param('periodId'));
  const userId = getUserId(c);
  if (!periodId) return c.json({ error: 'معرّف الفترة غير صالح' }, 400);

  const [period] = await db.select().from(fiscalPeriods)
    .where(and(eq(fiscalPeriods.id, periodId), eq(fiscalPeriods.businessId, bizId))).limit(1);
  if (!period) return c.json({ error: 'الفترة غير موجودة' }, 404);
  if (!period.isClosed) return c.json({ error: 'الفترة مفتوحة مسبقاً' }, 400);

  // التحقق الترتيبي: لا يمكن فتح فترة إذا فيه فترة بعدها مقفلة
  const laterClosed = await db.select({ id: fiscalPeriods.id, month: fiscalPeriods.month }).from(fiscalPeriods)
    .where(and(
      eq(fiscalPeriods.fiscalYearId, period.fiscalYearId),
      eq(fiscalPeriods.isClosed, true),
    ));
  const laterPeriods = laterClosed.filter(p => p.month > period.month);
  if (laterPeriods.length > 0) {
    const maxMonth = Math.max(...laterPeriods.map(p => p.month));
    return c.json({ error: `لا يمكن فتح هذه الفترة — افتح الشهر ${maxMonth} أولاً` }, 400);
  }

  const [updated] = await db.update(fiscalPeriods).set({
    isClosed: false,
    closedAt: null,
    closedBy: null,
  }).where(eq(fiscalPeriods.id, periodId)).returning();

  return c.json(updated);
}));

// ===================== فتح سنة مالية =====================
fiscalRoutes.post('/businesses/:bizId/fiscal-years/:yearId/reopen', bizAuthMiddleware(), safeHandler('فتح سنة مالية', async (c) => {
  const bizId = getBizId(c);
  const yearId = parseId(c.req.param('yearId'));
  if (!yearId) return c.json({ error: 'معرّف السنة غير صالح' }, 400);

  const [fy] = await db.select().from(fiscalYears)
    .where(and(eq(fiscalYears.id, yearId), eq(fiscalYears.businessId, bizId))).limit(1);
  if (!fy) return c.json({ error: 'السنة غير موجودة' }, 404);
  if (!fy.isClosed) return c.json({ error: 'السنة مفتوحة مسبقاً' }, 400);

  // التحقق: لا يمكن فتح سنة إذا فيه سنة بعدها مقفلة
  const laterYears = await db.select({ id: fiscalYears.id, year: fiscalYears.year }).from(fiscalYears)
    .where(and(eq(fiscalYears.businessId, bizId), eq(fiscalYears.isClosed, true)));
  const later = laterYears.filter(y => y.year > fy.year);
  if (later.length > 0) {
    const maxYear = Math.max(...later.map(y => y.year));
    return c.json({ error: `لا يمكن فتح هذه السنة — افتح السنة ${maxYear} أولاً` }, 400);
  }

  await db.update(fiscalYears).set({
    isClosed: false,
    closedAt: null,
    closedBy: null,
  }).where(eq(fiscalYears.id, yearId));

  return c.json({ success: true });
}));
