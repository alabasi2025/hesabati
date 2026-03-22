/**
 * legacy-compat-misc.routes.ts â€” Phase 13
 * ظ…ط³ط§ط±ط§طھ طھظˆط§ظپظ‚ ظ…طھظ†ظˆط¹ط© (collections, currencies, attachments, legacy)
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, and } from 'drizzle-orm';
import {
  businesses, vouchers, currencies, funds, accounts,
  attachments, stations, employees, operationTypes,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { safeHandler, parseId } from '../../middleware/helpers.ts';
import { wsService } from '../../services/websocket.service.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';

const legacyMiscApi = new Hono();

// ===================== ط§ظ„طھط­طµظٹظ„ ط§ظ„ظٹظˆظ…ظٹ (Compatibility via vouchers) =====================
legacyMiscApi.get('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('ط¬ظ„ط¨ ط§ظ„طھط­طµظٹظ„ط§طھ', async (c) => {
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

legacyMiscApi.get('/collections/:id', safeHandler('ط¬ظ„ط¨ طھظپط§طµظٹظ„ طھط­طµظٹظ„', async (c) => {
  return c.json({
    error: 'ظ‡ط°ط§ ط§ظ„ظ…ط³ط§ط± ظ‚ط¯ظٹظ…. ط§ط³طھط®ط¯ظ… /businesses/:bizId/vouchers ط£ظˆ ط´ط§ط´ط© ط§ظ„طھط­طµظٹظ„ ط§ظ„ط¬ط¯ظٹط¯ط© ط§ظ„ظ…ط¹طھظ…ط¯ط© ط¹ظ„ظ‰ ط§ظ„ط³ظ†ط¯ط§طھ.',
  }, 410);
}));

legacyMiscApi.post('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('ط¥ط¶ط§ظپط© طھط­طµظٹظ„', async (c) => {
  return c.json({
    error: 'طھظ… ط¥ظٹظ‚ط§ظپ ظ‡ط°ط§ ط§ظ„ظ…ط³ط§ط±. ط§ط³طھط®ط¯ظ… /businesses/:bizId/vouchers/multi ظ„ط¥ظ†ط´ط§ط، ط³ظ†ط¯ط§طھ ط§ظ„طھط­طµظٹظ„.',
  }, 410);
}));

// ===================== ط§ظ„طھظˆط±ظٹط¯ =====================
legacyMiscApi.post('/collections/:id/deliveries', safeHandler('ط¥ط¶ط§ظپط© طھظˆط±ظٹط¯', async (c) => {
  return c.json({
    error: 'طھظ… ط¥ظٹظ‚ط§ظپ ظ‡ط°ط§ ط§ظ„ظ…ط³ط§ط±. ط§ط³طھط®ط¯ظ… /businesses/:bizId/vouchers/multi ظ„ط¥ظ†ط´ط§ط، ط³ظ†ط¯ط§طھ ط§ظ„طھظˆط±ظٹط¯/ط§ظ„طµط±ظپ.',
  }, 410);
}));

// ===================== ط§ظ„ط¹ظ…ظ„ط§طھ =====================
legacyMiscApi.get('/currencies', safeHandler('ط¬ظ„ط¨ ط§ظ„ط¹ظ…ظ„ط§طھ', async (c) => {
  const rows = await db.select().from(currencies).orderBy(currencies.id);
  return c.json(rows);
}));

// ===================== ط§ظ„ظ…ط±ظپظ‚ط§طھ =====================
legacyMiscApi.get('/attachments/:entityType/:entityId', safeHandler('ط¬ظ„ط¨ ط§ظ„ظ…ط±ظپظ‚ط§طھ', async (c) => {
  const entityType = c.req.param('entityType');
  const entityId = parseId(c.req.param('entityId'));
  if (!entityId) return c.json({ error: 'ظ…ط¹ط±ظ‘ظپ ط§ظ„ظƒظٹط§ظ† ط؛ظٹط± طµط§ظ„ط­' }, 400);
  const rows = await db.select().from(attachments)
    .where(and(eq(attachments.entityType, entityType), eq(attachments.entityId, entityId)));
  return c.json(rows);
}));

// ===================== Legacy routes =====================
// âڑ ï¸ڈ DEPRECATED: ظٹط¬ط¨ ط§ط³طھط®ط¯ط§ظ… /businesses/:bizId/stations ط¨ط¯ظ„ط§ظ‹ ظ…ظ† ظ‡ط°ط§ ط§ظ„ظ…ط³ط§ط± - ظٹط³ط±ط¨ ط¨ظٹط§ظ†ط§طھ ط¬ظ…ظٹط¹ ط§ظ„ط£ط¹ظ…ط§ظ„
legacyMiscApi.get('/stations', safeHandler('ط¬ظ„ط¨ ط§ظ„ظ…ط­ط·ط§طھ (legacy)', async (c) => {
  const rows = await db.select().from(stations).orderBy(stations.id);
  return c.json(rows);
}));

// âڑ ï¸ڈ DEPRECATED: ظٹط¬ط¨ ط§ط³طھط®ط¯ط§ظ… /businesses/:bizId/employees ط¨ط¯ظ„ط§ظ‹ ظ…ظ† ظ‡ط°ط§ ط§ظ„ظ…ط³ط§ط± - ظٹط³ط±ط¨ ط¨ظٹط§ظ†ط§طھ ط¬ظ…ظٹط¹ ط§ظ„ط£ط¹ظ…ط§ظ„
legacyMiscApi.get('/employees', safeHandler('ط¬ظ„ط¨ ط§ظ„ظ…ظˆط¸ظپظٹظ† (legacy)', async (c) => {
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

// âڑ ï¸ڈ DEPRECATED: ظٹط¬ط¨ ط§ط³طھط®ط¯ط§ظ… /businesses/:bizId/accounts ط¨ط¯ظ„ط§ظ‹ ظ…ظ† ظ‡ط°ط§ ط§ظ„ظ…ط³ط§ط± - ظٹط³ط±ط¨ ط¨ظٹط§ظ†ط§طھ ط¬ظ…ظٹط¹ ط§ظ„ط£ط¹ظ…ط§ظ„
legacyMiscApi.get('/accounts', safeHandler('ط¬ظ„ط¨ ط§ظ„ط­ط³ط§ط¨ط§طھ (legacy)', async (c) => {
  const rows = await db.select().from(accounts).orderBy(accounts.accountType, accounts.name);
  return c.json(rows);
}));

// âڑ ï¸ڈ DEPRECATED: ظٹط¬ط¨ ط§ط³طھط®ط¯ط§ظ… /businesses/:bizId/funds ط¨ط¯ظ„ط§ظ‹ ظ…ظ† ظ‡ط°ط§ ط§ظ„ظ…ط³ط§ط± - ظٹط³ط±ط¨ ط¨ظٹط§ظ†ط§طھ ط¬ظ…ظٹط¹ ط§ظ„ط£ط¹ظ…ط§ظ„
legacyMiscApi.get('/funds', safeHandler('ط¬ظ„ط¨ ط§ظ„طµظ†ط§ط¯ظٹظ‚ (legacy)', async (c) => {
  const rows = await db.select().from(funds).orderBy(funds.fundType, funds.name);
  return c.json(rows);
}));


// â”€â”€ ط§ظ„ظ…ط³ط§ط±ط§طھ ط§ظ„ظ…ط³طھط®ط±ط¬ط© ظپظٹ Phase 4 â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
// fund-types.routes.ts  â†’ /businesses/:bizId/fund-types, bank-types...
// sidebar.routes.ts     â†’ /businesses/:bizId/sidebar-sections...
// screens.routes.ts     â†’ /businesses/:bizId/screens, widgets...



export { legacyMiscApi };


