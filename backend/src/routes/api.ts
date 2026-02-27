import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and, inArray } from 'drizzle-orm';
import {
  businesses, businessPartners, stations, employees, accounts, accountBalances,
  accountAllowedLinks, employeeBillingAccounts,
  funds, fundBalances, vouchers, voucherCategories, currencies, suppliers,
  warehouses, pendingAccounts, reconciliations, attachments,
  dailyCollections, collectionDetails, deliveryRecords,
  operationTypes, operationTypeAccounts,
} from '../db/schema/index.ts';

const api = new Hono();

// ===================== الأعمال =====================
api.get('/businesses', async (c) => {
  const rows = await db.select().from(businesses).orderBy(businesses.sortOrder);
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

// ===================== المحطات =====================
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

// ===================== الموظفين =====================
api.get('/businesses/:bizId/employees', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select({
    id: employees.id, fullName: employees.fullName, jobTitle: employees.jobTitle,
    stationId: employees.stationId, department: employees.department,
    salary: employees.salary, salaryCurrency: employees.salaryCurrency,
    phone: employees.phone, status: employees.status, notes: employees.notes,
    isManager: employees.isManager,
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

// ===================== حسابات الموظفين في أنظمة الفوترة =====================
api.get('/businesses/:bizId/employee-billing-accounts', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const stationId = c.req.query('stationId');
  const employeeId = c.req.query('employeeId');
  
  let query = db.select({
    id: employeeBillingAccounts.id,
    employeeId: employeeBillingAccounts.employeeId,
    stationId: employeeBillingAccounts.stationId,
    billingSystem: employeeBillingAccounts.billingSystem,
    collectionMethod: employeeBillingAccounts.collectionMethod,
    label: employeeBillingAccounts.label,
    sortOrder: employeeBillingAccounts.sortOrder,
    isActive: employeeBillingAccounts.isActive,
    notes: employeeBillingAccounts.notes,
    employeeName: employees.fullName,
    stationName: stations.name,
  }).from(employeeBillingAccounts)
    .leftJoin(employees, eq(employeeBillingAccounts.employeeId, employees.id))
    .leftJoin(stations, eq(employeeBillingAccounts.stationId, stations.id))
    .where(eq(employees.businessId, bizId))
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId, employeeBillingAccounts.sortOrder);
  
  const rows = await query;
  let filtered = rows;
  if (stationId) filtered = filtered.filter(r => r.stationId === parseInt(stationId));
  if (employeeId) filtered = filtered.filter(r => r.employeeId === parseInt(employeeId));
  return c.json(filtered);
});

api.post('/employee-billing-accounts', async (c) => {
  const body = await c.req.json();
  const [created] = await db.insert(employeeBillingAccounts).values(body).returning();
  return c.json(created, 201);
});

api.put('/employee-billing-accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(employeeBillingAccounts).set(body).where(eq(employeeBillingAccounts.id, id)).returning();
  return c.json(updated);
});

api.delete('/employee-billing-accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  return c.json({ success: true });
});

// ===================== الحسابات مع الصلاحيات =====================
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
  
  // Get allowed links
  const allLinks = await db.select().from(accountAllowedLinks).where(eq(accountAllowedLinks.isActive, true));
  const linkMap: Record<number, any[]> = {};
  for (const l of allLinks) { if (!linkMap[l.fromAccountId]) linkMap[l.fromAccountId] = []; linkMap[l.fromAccountId].push(l); }
  
  return c.json(rows.map(a => ({ ...a, balances: balanceMap[a.id] || [], allowedLinks: linkMap[a.id] || [] })));
});

api.post('/businesses/:bizId/accounts', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const { allowedLinks, ...accountData } = body;
  const [created] = await db.insert(accounts).values({ ...accountData, businessId: bizId }).returning();
  
  // Create allowed links if provided
  if (allowedLinks && allowedLinks.length > 0) {
    for (const link of allowedLinks) {
      await db.insert(accountAllowedLinks).values({
        fromAccountId: created.id,
        toAccountId: link.toAccountId,
        linkType: link.linkType,
      });
    }
  }
  return c.json(created, 201);
});

api.put('/accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { allowedLinks, ...accountData } = body;
  const [updated] = await db.update(accounts).set({ ...accountData, updatedAt: new Date() }).where(eq(accounts.id, id)).returning();
  
  // Update allowed links if provided
  if (allowedLinks !== undefined) {
    await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
    if (allowedLinks && allowedLinks.length > 0) {
      for (const link of allowedLinks) {
        await db.insert(accountAllowedLinks).values({
          fromAccountId: id,
          toAccountId: link.toAccountId,
          linkType: link.linkType,
        });
      }
    }
  }
  return c.json(updated);
});

api.delete('/accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.toAccountId, id));
  await db.delete(accountBalances).where(eq(accountBalances.accountId, id));
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
});

// ===================== ربط الحسابات المسموحة =====================
api.get('/accounts/:id/allowed-links', async (c) => {
  const id = parseInt(c.req.param('id'));
  const links = await db.select({
    id: accountAllowedLinks.id,
    fromAccountId: accountAllowedLinks.fromAccountId,
    toAccountId: accountAllowedLinks.toAccountId,
    linkType: accountAllowedLinks.linkType,
    toAccountName: accounts.name,
    toAccountType: accounts.accountType,
  }).from(accountAllowedLinks)
    .leftJoin(accounts, eq(accountAllowedLinks.toAccountId, accounts.id))
    .where(eq(accountAllowedLinks.fromAccountId, id));
  return c.json(links);
});

api.post('/account-links', async (c) => {
  const body = await c.req.json();
  const [created] = await db.insert(accountAllowedLinks).values(body).returning();
  return c.json(created, 201);
});

api.delete('/account-links/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.id, id));
  return c.json({ success: true });
});

// Get allowed targets for a specific account (for voucher creation)
api.get('/accounts/:id/allowed-targets', async (c) => {
  const id = parseInt(c.req.param('id'));
  const type = c.req.query('type') || 'payment'; // payment | receipt | transfer
  const links = await db.select({
    toAccountId: accountAllowedLinks.toAccountId,
    toAccountName: accounts.name,
    toAccountType: accounts.accountType,
  }).from(accountAllowedLinks)
    .leftJoin(accounts, eq(accountAllowedLinks.toAccountId, accounts.id))
    .where(and(eq(accountAllowedLinks.fromAccountId, id), eq(accountAllowedLinks.linkType, type)));
  return c.json(links);
});

// ===================== الصناديق =====================
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

// ===================== السندات =====================
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
    categoryId: vouchers.categoryId,
    createdAt: vouchers.createdAt, currencyCode: currencies.code, currencySymbol: currencies.symbol,
  }).from(vouchers)
    .leftJoin(currencies, eq(vouchers.currencyId, currencies.id))
    .where(and(...conditions))
    .orderBy(desc(vouchers.voucherDate))
    .limit(limit);
  
  // Enrich with account names
  const allAccounts = await db.select({ id: accounts.id, name: accounts.name }).from(accounts).where(eq(accounts.businessId, bizId));
  const accMap: Record<number, string> = {};
  for (const a of allAccounts) accMap[a.id] = a.name;
  
  const allFunds2 = await db.select({ id: funds.id, name: funds.name }).from(funds).where(eq(funds.businessId, bizId));
  const fundMap: Record<number, string> = {};
  for (const f of allFunds2) fundMap[f.id] = f.name;
  
  return c.json(rows.map(v => ({
    ...v,
    fromAccountName: v.fromAccountId ? accMap[v.fromAccountId] : null,
    toAccountName: v.toAccountId ? accMap[v.toAccountId] : null,
    fromFundName: v.fromFundId ? fundMap[v.fromFundId] : null,
    toFundName: v.toFundId ? fundMap[v.toFundId] : null,
  })));
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

// ===================== التحصيل اليومي =====================
api.get('/businesses/:bizId/collections', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const stationId = c.req.query('stationId');
  const dateStr = c.req.query('date');
  
  const conditions = [eq(dailyCollections.businessId, bizId)];
  if (stationId) conditions.push(eq(dailyCollections.stationId, parseInt(stationId)));
  if (dateStr) conditions.push(eq(dailyCollections.collectionDate, dateStr));
  
  const rows = await db.select({
    id: dailyCollections.id,
    stationId: dailyCollections.stationId,
    collectionDate: dailyCollections.collectionDate,
    totalAmount: dailyCollections.totalAmount,
    isFullyDelivered: dailyCollections.isFullyDelivered,
    notes: dailyCollections.notes,
    createdAt: dailyCollections.createdAt,
    stationName: stations.name,
  }).from(dailyCollections)
    .leftJoin(stations, eq(dailyCollections.stationId, stations.id))
    .where(and(...conditions))
    .orderBy(desc(dailyCollections.collectionDate));
  return c.json(rows);
});

api.get('/collections/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [collection] = await db.select().from(dailyCollections).where(eq(dailyCollections.id, id));
  if (!collection) return c.json({ error: 'تحصيل غير موجود' }, 404);
  
  const details = await db.select({
    id: collectionDetails.id,
    employeeId: collectionDetails.employeeId,
    billingAccountId: collectionDetails.billingAccountId,
    amount: collectionDetails.amount,
    notes: collectionDetails.notes,
    employeeName: employees.fullName,
    billingLabel: employeeBillingAccounts.label,
    billingSystem: employeeBillingAccounts.billingSystem,
    collectionMethod: employeeBillingAccounts.collectionMethod,
  }).from(collectionDetails)
    .leftJoin(employees, eq(collectionDetails.employeeId, employees.id))
    .leftJoin(employeeBillingAccounts, eq(collectionDetails.billingAccountId, employeeBillingAccounts.id))
    .where(eq(collectionDetails.collectionId, id));
  
  const deliveries = await db.select({
    id: deliveryRecords.id,
    employeeId: deliveryRecords.employeeId,
    toAccountId: deliveryRecords.toAccountId,
    amount: deliveryRecords.amount,
    deliveryDate: deliveryRecords.deliveryDate,
    reference: deliveryRecords.reference,
    notes: deliveryRecords.notes,
    employeeName: employees.fullName,
    accountName: accounts.name,
  }).from(deliveryRecords)
    .leftJoin(employees, eq(deliveryRecords.employeeId, employees.id))
    .leftJoin(accounts, eq(deliveryRecords.toAccountId, accounts.id))
    .where(eq(deliveryRecords.collectionId, id));
  
  return c.json({ ...collection, details, deliveries });
});

api.post('/businesses/:bizId/collections', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const { details, ...collectionData } = body;
  
  // Calculate total
  let total = 0;
  if (details) for (const d of details) total += parseFloat(d.amount || '0');
  
  const [created] = await db.insert(dailyCollections).values({
    ...collectionData,
    businessId: bizId,
    totalAmount: String(total),
  }).returning();
  
  // Insert details
  if (details && details.length > 0) {
    for (const d of details) {
      if (parseFloat(d.amount || '0') > 0) {
        await db.insert(collectionDetails).values({
          collectionId: created.id,
          employeeId: d.employeeId,
          billingAccountId: d.billingAccountId,
          amount: d.amount,
          notes: d.notes,
        });
      }
    }
  }
  return c.json(created, 201);
});

// ===================== التوريد =====================
api.post('/collections/:id/deliveries', async (c) => {
  const collectionId = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [created] = await db.insert(deliveryRecords).values({
    ...body,
    collectionId,
  }).returning();
  
  // Check if fully delivered
  const [collection] = await db.select().from(dailyCollections).where(eq(dailyCollections.id, collectionId));
  const allDeliveries = await db.select().from(deliveryRecords).where(eq(deliveryRecords.collectionId, collectionId));
  const totalDelivered = allDeliveries.reduce((sum, d) => sum + parseFloat(d.amount), 0);
  const totalCollected = parseFloat(collection.totalAmount);
  
  if (totalDelivered >= totalCollected) {
    await db.update(dailyCollections).set({ isFullyDelivered: true, updatedAt: new Date() }).where(eq(dailyCollections.id, collectionId));
  }
  
  return c.json(created, 201);
});

// ===================== الموردين =====================
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

// ===================== المخازن =====================
api.get('/businesses/:bizId/warehouses', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(warehouses).where(eq(warehouses.businessId, bizId)).orderBy(warehouses.id);
  return c.json(rows);
});

// ===================== الحسابات المعلقة =====================
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

// ===================== العملات =====================
api.get('/currencies', async (c) => {
  const rows = await db.select().from(currencies).orderBy(currencies.id);
  return c.json(rows);
});

// ===================== المرفقات =====================
api.get('/attachments/:entityType/:entityId', async (c) => {
  const entityType = c.req.param('entityType');
  const entityId = parseInt(c.req.param('entityId'));
  const rows = await db.select().from(attachments)
    .where(and(eq(attachments.entityType, entityType), eq(attachments.entityId, entityId)));
  return c.json(rows);
});

// ===================== Legacy routes =====================
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

// ===================== أنواع العمليات (القوالب) =====================
api.get('/businesses/:bizId/operation-types', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const category = c.req.query('category');
  const conditions = [eq(operationTypes.businessId, bizId)];
  if (category) conditions.push(eq(operationTypes.category, category));
  
  const rows = await db.select().from(operationTypes)
    .where(and(...conditions))
    .orderBy(operationTypes.sortOrder, operationTypes.name);
  
  // Enrich with linked accounts
  const result = [];
  for (const ot of rows) {
    const linkedAccounts = await db.select({
      id: operationTypeAccounts.id,
      operationTypeId: operationTypeAccounts.operationTypeId,
      accountId: operationTypeAccounts.accountId,
      employeeBillingAccountId: operationTypeAccounts.employeeBillingAccountId,
      label: operationTypeAccounts.label,
      permission: operationTypeAccounts.permission,
      sortOrder: operationTypeAccounts.sortOrder,
      isActive: operationTypeAccounts.isActive,
      accountName: accounts.name,
      accountType: accounts.accountType,
    }).from(operationTypeAccounts)
      .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
      .where(eq(operationTypeAccounts.operationTypeId, ot.id))
      .orderBy(operationTypeAccounts.sortOrder);
    
    // Get main account name
    let mainAccountName = null;
    if (ot.mainAccountId) {
      const [mainAcc] = await db.select({ name: accounts.name }).from(accounts).where(eq(accounts.id, ot.mainAccountId));
      mainAccountName = mainAcc?.name;
    }
    
    result.push({ ...ot, linkedAccounts, mainAccountName });
  }
  return c.json(result);
});

api.get('/operation-types/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, id));
  if (!ot) return c.json({ error: 'نوع عملية غير موجود' }, 404);
  
  const linkedAccounts = await db.select({
    id: operationTypeAccounts.id,
    operationTypeId: operationTypeAccounts.operationTypeId,
    accountId: operationTypeAccounts.accountId,
    employeeBillingAccountId: operationTypeAccounts.employeeBillingAccountId,
    label: operationTypeAccounts.label,
    permission: operationTypeAccounts.permission,
    sortOrder: operationTypeAccounts.sortOrder,
    isActive: operationTypeAccounts.isActive,
    accountName: accounts.name,
    accountType: accounts.accountType,
  }).from(operationTypeAccounts)
    .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
    .where(eq(operationTypeAccounts.operationTypeId, id))
    .orderBy(operationTypeAccounts.sortOrder);
  
  return c.json({ ...ot, linkedAccounts });
});

api.post('/businesses/:bizId/operation-types', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const { linkedAccounts, ...otData } = body;
  const [created] = await db.insert(operationTypes).values({ ...otData, businessId: bizId }).returning();
  
  if (linkedAccounts && linkedAccounts.length > 0) {
    for (const la of linkedAccounts) {
      await db.insert(operationTypeAccounts).values({ ...la, operationTypeId: created.id });
    }
  }
  return c.json(created, 201);
});

api.put('/operation-types/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { linkedAccounts, ...otData } = body;
  const [updated] = await db.update(operationTypes).set({ ...otData, updatedAt: new Date() }).where(eq(operationTypes.id, id)).returning();
  
  if (linkedAccounts !== undefined) {
    await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
    if (linkedAccounts && linkedAccounts.length > 0) {
      for (const la of linkedAccounts) {
        await db.insert(operationTypeAccounts).values({ ...la, operationTypeId: id });
      }
    }
  }
  return c.json(updated);
});

api.delete('/operation-types/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  await db.delete(operationTypes).where(eq(operationTypes.id, id));
  return c.json({ success: true });
});

// Add/remove linked account from operation type
api.post('/operation-types/:id/accounts', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [created] = await db.insert(operationTypeAccounts).values({ ...body, operationTypeId: id }).returning();
  return c.json(created, 201);
});

api.delete('/operation-type-accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.id, id));
  return c.json({ success: true });
});

export default api;
