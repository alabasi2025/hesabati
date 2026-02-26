import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and } from 'drizzle-orm';
import {
  businesses, businessPartners, stations, employees, accounts, accountBalances,
  funds, fundBalances, vouchers, voucherCategories, currencies, suppliers,
  warehouses, pendingAccounts, reconciliations
} from '../db/schema/index.ts';

const api = new Hono();

// ===================== الأعمال =====================
api.get('/businesses', async (c) => {
  const rows = await db.select().from(businesses).orderBy(businesses.sortOrder);
  // Get partners count and stats for each business
  const result = [];
  for (const biz of rows) {
    const partners = await db.select().from(businessPartners).where(eq(businessPartners.businessId, biz.id));
    const stationCount = await db.select({ count: sql<number>`count(*)` }).from(stations).where(eq(stations.businessId, biz.id));
    const empCount = await db.select({ count: sql<number>`count(*)` }).from(employees).where(eq(employees.businessId, biz.id));
    const accCount = await db.select({ count: sql<number>`count(*)` }).from(accounts).where(eq(accounts.businessId, biz.id));
    const fundCount = await db.select({ count: sql<number>`count(*)` }).from(funds).where(eq(funds.businessId, biz.id));
    const supplierCount = await db.select({ count: sql<number>`count(*)` }).from(suppliers).where(eq(suppliers.businessId, biz.id));
    const pendingCount = await db.select({ count: sql<number>`count(*)` }).from(pendingAccounts).where(eq(pendingAccounts.businessId, biz.id));
    result.push({
      ...biz,
      partners,
      stats: {
        stations: Number(stationCount[0].count),
        employees: Number(empCount[0].count),
        accounts: Number(accCount[0].count),
        funds: Number(fundCount[0].count),
        suppliers: Number(supplierCount[0].count),
        pendingAccounts: Number(pendingCount[0].count),
      }
    });
  }
  return c.json(result);
});

api.get('/businesses/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [biz] = await db.select().from(businesses).where(eq(businesses.id, id));
  if (!biz) return c.json({ error: 'عمل غير موجود' }, 404);
  const partners = await db.select().from(businessPartners).where(eq(businessPartners.businessId, id));
  return c.json({ ...biz, partners });
});

// ===================== المحطات (حسب العمل) =====================
api.get('/businesses/:bizId/stations', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(stations).where(eq(stations.businessId, bizId)).orderBy(stations.id);
  return c.json(rows);
});

api.get('/businesses/:bizId/stations/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [station] = await db.select().from(stations).where(eq(stations.id, id));
  if (!station) return c.json({ error: 'محطة غير موجودة' }, 404);
  const emps = await db.select().from(employees).where(eq(employees.stationId, id));
  const stationFunds = await db.select().from(funds).where(eq(funds.stationId, id));
  return c.json({ ...station, employees: emps, funds: stationFunds });
});

api.put('/stations/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  return c.json(updated);
});

// ===================== الموظفين (حسب العمل) =====================
api.get('/businesses/:bizId/employees', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select({
    id: employees.id, fullName: employees.fullName, jobTitle: employees.jobTitle,
    stationId: employees.stationId, department: employees.department,
    salary: employees.salary, salaryCurrency: employees.salaryCurrency,
    phone: employees.phone, status: employees.status, notes: employees.notes,
    createdAt: employees.createdAt, stationName: stations.name,
  }).from(employees)
    .leftJoin(stations, eq(employees.stationId, stations.id))
    .where(eq(employees.businessId, bizId))
    .orderBy(employees.stationId, employees.fullName);
  return c.json(rows);
});

api.post('/businesses/:bizId/employees', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const [created] = await db.insert(employees).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/employees/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(employees).set({ ...body, updatedAt: new Date() }).where(eq(employees.id, id)).returning();
  return c.json(updated);
});

api.delete('/employees/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
});

// ===================== الحسابات (حسب العمل) =====================
api.get('/businesses/:bizId/accounts', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(accounts).where(eq(accounts.businessId, bizId)).orderBy(accounts.accountType, accounts.name);
  const balances = await db.select({
    accountId: accountBalances.accountId, currencyId: accountBalances.currencyId,
    balance: accountBalances.balance, currencyCode: currencies.code,
    currencySymbol: currencies.symbol, currencyName: currencies.nameAr,
  }).from(accountBalances).leftJoin(currencies, eq(accountBalances.currencyId, currencies.id));
  const balanceMap: Record<number, any[]> = {};
  for (const b of balances) { if (!balanceMap[b.accountId]) balanceMap[b.accountId] = []; balanceMap[b.accountId].push(b); }
  return c.json(rows.map(a => ({ ...a, balances: balanceMap[a.id] || [] })));
});

api.post('/businesses/:bizId/accounts', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const [created] = await db.insert(accounts).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(accounts).set({ ...body, updatedAt: new Date() }).where(eq(accounts.id, id)).returning();
  return c.json(updated);
});

api.delete('/accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
});

// ===================== الصناديق (حسب العمل) =====================
api.get('/businesses/:bizId/funds', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select({
    id: funds.id, name: funds.name, fundType: funds.fundType,
    stationId: funds.stationId, responsiblePerson: funds.responsiblePerson,
    description: funds.description, isActive: funds.isActive, notes: funds.notes,
    createdAt: funds.createdAt, stationName: stations.name,
  }).from(funds)
    .leftJoin(stations, eq(funds.stationId, stations.id))
    .where(eq(funds.businessId, bizId))
    .orderBy(funds.fundType, funds.name);
  const balances = await db.select({
    fundId: fundBalances.fundId, currencyId: fundBalances.currencyId,
    balance: fundBalances.balance, currencyCode: currencies.code, currencySymbol: currencies.symbol,
  }).from(fundBalances).leftJoin(currencies, eq(fundBalances.currencyId, currencies.id));
  const balanceMap: Record<number, any[]> = {};
  for (const b of balances) { if (!balanceMap[b.fundId]) balanceMap[b.fundId] = []; balanceMap[b.fundId].push(b); }
  return c.json(rows.map(f => ({ ...f, balances: balanceMap[f.id] || [] })));
});

api.post('/businesses/:bizId/funds', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const [created] = await db.insert(funds).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/funds/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(funds).set({ ...body, updatedAt: new Date() }).where(eq(funds.id, id)).returning();
  return c.json(updated);
});

// ===================== السندات (حسب العمل) =====================
api.get('/businesses/:bizId/vouchers', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const type = c.req.query('type');
  const limit = parseInt(c.req.query('limit') || '50');
  const conditions = [eq(vouchers.businessId, bizId)];
  if (type) conditions.push(eq(vouchers.voucherType, type as any));

  const rows = await db.select({
    id: vouchers.id, voucherNumber: vouchers.voucherNumber, voucherType: vouchers.voucherType,
    status: vouchers.status, amount: vouchers.amount, currencyId: vouchers.currencyId,
    fromAccountId: vouchers.fromAccountId, toAccountId: vouchers.toAccountId,
    fromFundId: vouchers.fromFundId, toFundId: vouchers.toFundId,
    stationId: vouchers.stationId, description: vouchers.description,
    reference: vouchers.reference, voucherDate: vouchers.voucherDate,
    createdAt: vouchers.createdAt, currencyCode: currencies.code, currencySymbol: currencies.symbol,
  }).from(vouchers)
    .leftJoin(currencies, eq(vouchers.currencyId, currencies.id))
    .where(and(...conditions))
    .orderBy(desc(vouchers.voucherDate))
    .limit(limit);
  return c.json(rows);
});

api.post('/businesses/:bizId/vouchers', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const prefix = body.voucherType === 'receipt' ? 'QBD' : body.voucherType === 'payment' ? 'SRF' : 'TRN';
  const count = await db.select({ count: sql<number>`count(*)` }).from(vouchers);
  const num = (Number(count[0].count) || 0) + 1;
  const voucherNumber = `${prefix}-${String(num).padStart(5, '0')}`;
  const [created] = await db.insert(vouchers).values({ ...body, businessId: bizId, voucherNumber }).returning();
  return c.json(created, 201);
});

api.delete('/vouchers/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.update(vouchers).set({ status: 'cancelled', updatedAt: new Date() }).where(eq(vouchers.id, id));
  return c.json({ success: true });
});

// ===================== الموردين (حسب العمل) =====================
api.get('/businesses/:bizId/suppliers', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(suppliers).where(eq(suppliers.businessId, bizId)).orderBy(suppliers.id);
  return c.json(rows);
});

api.post('/businesses/:bizId/suppliers', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const [created] = await db.insert(suppliers).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

// ===================== المخازن (حسب العمل) =====================
api.get('/businesses/:bizId/warehouses', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(warehouses).where(eq(warehouses.businessId, bizId)).orderBy(warehouses.id);
  return c.json(rows);
});

// ===================== الحسابات المعلقة (حسب العمل) =====================
api.get('/businesses/:bizId/pending-accounts', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(pendingAccounts).where(eq(pendingAccounts.businessId, bizId));
  return c.json(rows);
});

// ===================== تصنيفات السندات =====================
api.get('/businesses/:bizId/voucher-categories', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(voucherCategories).where(eq(voucherCategories.businessId, bizId)).orderBy(voucherCategories.type, voucherCategories.name);
  return c.json(rows);
});

// ===================== العملات (عامة) =====================
api.get('/currencies', async (c) => {
  const rows = await db.select().from(currencies).orderBy(currencies.id);
  return c.json(rows);
});

// ===================== Legacy routes (backward compat) =====================
api.get('/stations', async (c) => {
  const rows = await db.select().from(stations).orderBy(stations.id);
  return c.json(rows);
});

api.get('/employees', async (c) => {
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
});

api.get('/accounts', async (c) => {
  const rows = await db.select().from(accounts).orderBy(accounts.accountType, accounts.name);
  return c.json(rows);
});

api.get('/funds', async (c) => {
  const rows = await db.select().from(funds).orderBy(funds.fundType, funds.name);
  return c.json(rows);
});

api.get('/voucher-categories', async (c) => {
  const rows = await db.select().from(voucherCategories).orderBy(voucherCategories.type, voucherCategories.name);
  return c.json(rows);
});

api.get('/suppliers', async (c) => {
  const rows = await db.select().from(suppliers).orderBy(suppliers.id);
  return c.json(rows);
});

export default api;
