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
  journalEntries, journalEntryLines,
  billingSystemsConfig, billingAccountTypes,
  sidebarSections, sidebarItems, userSidebarConfig,
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
  const prefix = body.voucherType === 'receipt' ? 'QBD' : body.voucherType === 'payment' ? 'SRF' : body.voucherType === 'journal' ? 'QYD' : 'TRN';
  const count = await db.select({ count: sql<number>`count(*)` }).from(vouchers);
  const num = (Number(count[0].count) || 0) + 1;
  const voucherNumber = `${prefix}-${String(num).padStart(5, '0')}`;
  
  // Clean body - remove undefined fields and fix date
  const cleanBody: any = {};
  for (const [k, v] of Object.entries(body)) {
    if (v !== undefined && v !== null && v !== '') {
      cleanBody[k] = v;
    }
  }
  // Convert voucherDate string to Date object (Drizzle requires Date for timestamp)
  if (cleanBody.voucherDate) {
    if (typeof cleanBody.voucherDate === 'string') {
      cleanBody.voucherDate = new Date(cleanBody.voucherDate + 'T00:00:00Z');
    }
  } else {
    cleanBody.voucherDate = new Date();
  }
  // Remove timestamp fields - let DB handle them
  delete cleanBody.createdAt;
  delete cleanBody.updatedAt;
  // Convert numeric strings to numbers
  if (cleanBody.amount && typeof cleanBody.amount === 'string') {
    cleanBody.amount = parseFloat(cleanBody.amount);
  }
  if (cleanBody.currencyId && typeof cleanBody.currencyId === 'string') {
    cleanBody.currencyId = parseInt(cleanBody.currencyId);
  }
  
  const [created] = await db.insert(vouchers).values({ ...cleanBody, businessId: bizId, voucherNumber }).returning();
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

// ===================== القيود المحاسبية =====================
api.get('/businesses/:bizId/journal-entries', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select({
    id: journalEntries.id,
    entryNumber: journalEntries.entryNumber,
    description: journalEntries.description,
    entryDate: journalEntries.entryDate,
    reference: journalEntries.reference,
    isBalanced: journalEntries.isBalanced,
    totalDebit: journalEntries.totalDebit,
    totalCredit: journalEntries.totalCredit,
    status: journalEntries.status,
    createdAt: journalEntries.createdAt,
  }).from(journalEntries)
    .where(eq(journalEntries.businessId, bizId))
    .orderBy(desc(journalEntries.createdAt));
  
  // Enrich with lines
  const result = [];
  for (const entry of rows) {
    const lines = await db.select({
      id: journalEntryLines.id,
      accountId: journalEntryLines.accountId,
      lineType: journalEntryLines.lineType,
      amount: journalEntryLines.amount,
      description: journalEntryLines.description,
      sortOrder: journalEntryLines.sortOrder,
      accountName: accounts.name,
      accountType: accounts.accountType,
    }).from(journalEntryLines)
      .leftJoin(accounts, eq(journalEntryLines.accountId, accounts.id))
      .where(eq(journalEntryLines.journalEntryId, entry.id))
      .orderBy(journalEntryLines.sortOrder);
    result.push({ ...entry, lines });
  }
  return c.json(result);
});

api.post('/businesses/:bizId/journal-entries', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const { lines, ...entryData } = body;
  
  // Generate entry number
  const count = await db.select({ count: sql<number>`count(*)` }).from(journalEntries);
  const num = (Number(count[0].count) || 0) + 1;
  const entryNumber = `QYD-${String(num).padStart(5, '0')}`;
  
  // Calculate totals
  const totalDebit = (lines || []).filter((l: any) => l.lineType === 'debit').reduce((s: number, l: any) => s + Number(l.amount), 0);
  const totalCredit = (lines || []).filter((l: any) => l.lineType === 'credit').reduce((s: number, l: any) => s + Number(l.amount), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;
  
  // Keep entryDate as string for DATE column type
  const rawDate = entryData.date || entryData.entryDate;
  const entryDate = rawDate ? String(rawDate).split('T')[0] : new Date().toISOString().split('T')[0];
  
  // Clean entryData - remove extra fields
  const cleanEntry: any = {};
  const allowedFields = ['description', 'reference', 'operationTypeId', 'createdBy'];
  for (const f of allowedFields) {
    if (entryData[f] !== undefined && entryData[f] !== null && entryData[f] !== '') {
      cleanEntry[f] = entryData[f];
    }
  }
  
  const [created] = await db.insert(journalEntries).values({
    ...cleanEntry,
    businessId: bizId,
    entryNumber,
    totalDebit: String(totalDebit),
    totalCredit: String(totalCredit),
    isBalanced,
    entryDate,
  }).returning();
  
  // Insert lines
  if (lines && lines.length > 0) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      await db.insert(journalEntryLines).values({
        journalEntryId: created.id,
        accountId: line.accountId,
        lineType: line.type || line.lineType,
        amount: String(line.amount),
        description: line.description || '',
        sortOrder: i,
      });
    }
  }
  
  return c.json(created, 201);
});

api.delete('/journal-entries/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, id));
  await db.delete(journalEntries).where(eq(journalEntries.id, id));
  return c.json({ success: true });
});

// ===================== إعدادات أنظمة الفوترة =====================
api.get('/businesses/:bizId/billing-systems-config', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(billingSystemsConfig)
    .where(eq(billingSystemsConfig.businessId, bizId))
    .orderBy(billingSystemsConfig.sortOrder);
  return c.json(rows);
});

api.post('/businesses/:bizId/billing-systems-config', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const [created] = await db.insert(billingSystemsConfig).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/billing-systems-config/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(billingSystemsConfig).set({ ...body, updatedAt: new Date() }).where(eq(billingSystemsConfig.id, id)).returning();
  return c.json(updated);
});

api.delete('/billing-systems-config/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  return c.json({ success: true });
});

// ===================== أنواع حسابات الفوترة =====================
api.get('/businesses/:bizId/billing-account-types', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(billingAccountTypes)
    .where(eq(billingAccountTypes.businessId, bizId))
    .orderBy(billingAccountTypes.sortOrder);
  return c.json(rows);
});

api.post('/businesses/:bizId/billing-account-types', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const [created] = await db.insert(billingAccountTypes).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/billing-account-types/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(billingAccountTypes).set(body).where(eq(billingAccountTypes.id, id)).returning();
  return c.json(updated);
});

api.delete('/billing-account-types/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  return c.json({ success: true });
});

// ===================== التبويب الجانبي - الأقسام =====================
api.get('/businesses/:bizId/sidebar-sections', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select().from(sidebarSections).where(eq(sidebarSections.businessId, bizId)).orderBy(sidebarSections.sortOrder);
  return c.json(rows);
});

api.post('/businesses/:bizId/sidebar-sections', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const body = await c.req.json();
  const [created] = await db.insert(sidebarSections).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/sidebar-sections/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(sidebarSections).set({ ...body, updatedAt: new Date() }).where(eq(sidebarSections.id, id)).returning();
  return c.json(updated);
});

api.delete('/sidebar-sections/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  // Delete items in this section first
  const items = await db.select().from(sidebarItems).where(eq(sidebarItems.sectionId, id));
  for (const item of items) {
    await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, item.id));
  }
  await db.delete(sidebarItems).where(eq(sidebarItems.sectionId, id));
  await db.delete(sidebarSections).where(eq(sidebarSections.id, id));
  return c.json({ success: true });
});

// ===================== التبويب الجانبي - العناصر =====================
api.get('/businesses/:bizId/sidebar-items', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const rows = await db.select({
    id: sidebarItems.id, sectionId: sidebarItems.sectionId,
    screenKey: sidebarItems.screenKey, label: sidebarItems.label,
    icon: sidebarItems.icon, route: sidebarItems.route,
    sortOrder: sidebarItems.sortOrder, isActive: sidebarItems.isActive,
    badge: sidebarItems.badge, badgeColor: sidebarItems.badgeColor,
    sectionName: sidebarSections.name, sectionIcon: sidebarSections.icon,
    sectionSortOrder: sidebarSections.sortOrder,
  }).from(sidebarItems)
    .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
    .where(eq(sidebarSections.businessId, bizId))
    .orderBy(sidebarSections.sortOrder, sidebarItems.sortOrder);
  return c.json(rows);
});

api.post('/sidebar-items', async (c) => {
  const body = await c.req.json();
  const [created] = await db.insert(sidebarItems).values(body).returning();
  // Auto-create config for all users in this business
  const section = await db.select().from(sidebarSections).where(eq(sidebarSections.id, body.sectionId));
  if (section.length > 0) {
    const bizId = section[0].businessId;
    const configs = await db.select().from(userSidebarConfig).where(eq(userSidebarConfig.businessId, bizId));
    const userIds = [...new Set(configs.map(c => c.userId))];
    for (const userId of userIds) {
      await db.insert(userSidebarConfig).values({
        userId, businessId: bizId, sidebarItemId: created.id,
        isVisible: false, customSortOrder: body.sortOrder || 0,
      });
    }
  }
  return c.json(created, 201);
});

api.put('/sidebar-items/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(sidebarItems).set(body).where(eq(sidebarItems.id, id)).returning();
  return c.json(updated);
});

api.delete('/sidebar-items/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, id));
  await db.delete(sidebarItems).where(eq(sidebarItems.id, id));
  return c.json({ success: true });
});

// ===================== تخصيص التبويب لكل مستخدم =====================
api.get('/businesses/:bizId/users/:userId/sidebar', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const userId = parseInt(c.req.param('userId'));
  
  const configs = await db.select({
    configId: userSidebarConfig.id,
    isVisible: userSidebarConfig.isVisible,
    customSortOrder: userSidebarConfig.customSortOrder,
    customSectionName: userSidebarConfig.customSectionName,
    itemId: sidebarItems.id,
    screenKey: sidebarItems.screenKey,
    label: sidebarItems.label,
    icon: sidebarItems.icon,
    route: sidebarItems.route,
    badge: sidebarItems.badge,
    badgeColor: sidebarItems.badgeColor,
    sectionId: sidebarSections.id,
    sectionName: sidebarSections.name,
    sectionIcon: sidebarSections.icon,
    sectionSortOrder: sidebarSections.sortOrder,
  }).from(userSidebarConfig)
    .innerJoin(sidebarItems, eq(userSidebarConfig.sidebarItemId, sidebarItems.id))
    .innerJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
    .where(and(
      eq(userSidebarConfig.userId, userId),
      eq(userSidebarConfig.businessId, bizId),
    ))
    .orderBy(sidebarSections.sortOrder, userSidebarConfig.customSortOrder, sidebarItems.sortOrder);
  
  return c.json(configs);
});

// Bulk update user sidebar config (for drag & drop reorder + visibility)
api.put('/businesses/:bizId/users/:userId/sidebar', async (c) => {
  const bizId = parseInt(c.req.param('bizId'));
  const userId = parseInt(c.req.param('userId'));
  const body = await c.req.json();
  
  // body.items = [{ sidebarItemId, isVisible, customSortOrder, customSectionName }]
  if (body.items && Array.isArray(body.items)) {
    for (const item of body.items) {
      // Check if config exists
      const existing = await db.select().from(userSidebarConfig)
        .where(and(
          eq(userSidebarConfig.userId, userId),
          eq(userSidebarConfig.businessId, bizId),
          eq(userSidebarConfig.sidebarItemId, item.sidebarItemId),
        ));
      
      if (existing.length > 0) {
        await db.update(userSidebarConfig).set({
          isVisible: item.isVisible,
          customSortOrder: item.customSortOrder,
          customSectionName: item.customSectionName || null,
          updatedAt: new Date(),
        }).where(eq(userSidebarConfig.id, existing[0].id));
      } else {
        await db.insert(userSidebarConfig).values({
          userId, businessId: bizId,
          sidebarItemId: item.sidebarItemId,
          isVisible: item.isVisible,
          customSortOrder: item.customSortOrder,
          customSectionName: item.customSectionName || null,
        });
      }
    }
  }
  return c.json({ success: true });
});

// ===================== المستخدمين (للمدير) =====================
api.get('/users', async (c) => {
  const rows = await db.select({
    id: users.id, username: users.username, fullName: users.fullName,
    role: users.role, isActive: users.isActive, createdAt: users.createdAt,
  }).from(users).orderBy(users.id);
  return c.json(rows);
});

export default api;
