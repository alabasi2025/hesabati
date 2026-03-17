/**
 * legacy-compat-misc.routes.ts — Phase 13
 * مسارات توافق متنوعة (collections, currencies, attachments, legacy)
 */
import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, and } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, funds, accounts,
  attachments, stations, employees, operationTypes,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../middleware/helpers.ts';
import { wsService } from '../services/websocket.service.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';

const legacyMiscApi = new Hono();

// ===================== التحصيل اليومي (Compatibility via vouchers) =====================
legacyMiscApi.get('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('جلب التحصيلات', async (c) => {
  const bizId = getBizId(c);
  const stationId = c.req.query('stationId');
  const dateStr = c.req.query('date');

  const conditions = [
    eq(vouchers.businessId, bizId),
    eq(vouchers.voucherType, 'receipt'),
  ];
  if (stationId) conditions.push(eq(vouchers.stationId, Number.parseInt(stationId)));
  if (dateStr) conditions.push(sql`DATE(${vouchers.voucherDate}) = ${dateStr}`);

  const rows = await db.select({
    id: vouchers.id,
    stationId: vouchers.stationId,
    collectionDate: vouchers.voucherDate,
    totalAmount: vouchers.amount,
    isFullyDelivered: sql<boolean>`true`,
    notes: vouchers.description,
    createdAt: vouchers.createdAt,
    stationName: stations.name,
  }).from(vouchers)
    .leftJoin(stations, eq(vouchers.stationId, stations.id))
    .where(and(...conditions))
    .orderBy(desc(vouchers.voucherDate));
  return c.json(rows);
}));

legacyMiscApi.get('/collections/:id', safeHandler('جلب تفاصيل تحصيل', async (c) => {
  return c.json({
    error: 'هذا المسار قديم. استخدم /businesses/:bizId/vouchers أو شاشة التحصيل الجديدة المعتمدة على السندات.',
  }, 410);
}));

legacyMiscApi.post('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('إضافة تحصيل', async (c) => {
  return c.json({
    error: 'تم إيقاف هذا المسار. استخدم /businesses/:bizId/vouchers/multi لإنشاء سندات التحصيل.',
  }, 410);
}));

// ===================== التوريد =====================
legacyMiscApi.post('/collections/:id/deliveries', safeHandler('إضافة توريد', async (c) => {
  return c.json({
    error: 'تم إيقاف هذا المسار. استخدم /businesses/:bizId/vouchers/multi لإنشاء سندات التوريد/الصرف.',
  }, 410);
}));

// ===================== العملات =====================
legacyMiscApi.get('/currencies', safeHandler('جلب العملات', async (c) => {
  const rows = await db.select().from(currencies).orderBy(currencies.id);
  return c.json(rows);
}));

// ===================== المرفقات =====================
legacyMiscApi.get('/attachments/:entityType/:entityId', safeHandler('جلب المرفقات', async (c) => {
  const entityType = c.req.param('entityType');
  const entityId = parseId(c.req.param('entityId'));
  if (!entityId) return c.json({ error: 'معرّف الكيان غير صالح' }, 400);
  const rows = await db.select().from(attachments)
    .where(and(eq(attachments.entityType, entityType), eq(attachments.entityId, entityId)));
  return c.json(rows);
}));

// ===================== Legacy routes =====================
// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/stations بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
legacyMiscApi.get('/stations', safeHandler('جلب المحطات (legacy)', async (c) => {
  const rows = await db.select().from(stations).orderBy(stations.id);
  return c.json(rows);
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/employees بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
legacyMiscApi.get('/employees', safeHandler('جلب الموظفين (legacy)', async (c) => {
  const rows = await db.select({
    id: employees.id, fullName: employees.fullName, jobTitle: employees.jobTitle,
    stationId: employees.stationId, department: employees.department,
    salary: employees.salary, salaryCurrency: employees.salaryCurrency,
    phone: employees.phone, status: employees.status, notes: employees.notes,
    createdAt: employees.createdAt, stationName: stations.name,
  }).from(employees)
    .leftJoin(stations, eq(employees.stationId, stations.id))
    .orderBy(employees.stationId, employees.fullName);
  return c.json(rows);
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/accounts بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
legacyMiscApi.get('/accounts', safeHandler('جلب الحسابات (legacy)', async (c) => {
  const rows = await db.select().from(accounts).orderBy(accounts.accountType, accounts.name);
  return c.json(rows);
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/funds بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
legacyMiscApi.get('/funds', safeHandler('جلب الصناديق (legacy)', async (c) => {
  const rows = await db.select().from(funds).orderBy(funds.fundType, funds.name);
  return c.json(rows);
}));


// ── المسارات المستخرجة في Phase 4 ───────────────────────────────────────────
// fund-types.routes.ts  → /businesses/:bizId/fund-types, bank-types...
// sidebar.routes.ts     → /businesses/:bizId/sidebar-sections...
// screens.routes.ts     → /businesses/:bizId/screens, widgets...



export { legacyMiscApi };
