import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, desc, sql, and, inArray, gte, lte, asc, sum, count } from 'drizzle-orm';
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
  users,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import {
  accountSchema, voucherSchema, employeeSchema, operationTypeSchema,
  journalEntrySchema, typeSchema, validateBody,
  fundSchema, partnerSchema, supplierSchema, warehouseSchema,
  sidebarSectionSchema, sidebarItemSchema, screenSchema, widgetSchema,
  settlementSchema, pendingAccountSchema, billingSystemConfigSchema,
  employeeBillingAccountSchema,
} from '../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId, validateRequired } from '../middleware/helpers.ts';

const api = new Hono();

// ===================== Helper: التحقق من ملكية السجل =====================
async function verifyOwnership(table: any, recordId: number, bizId: number, bizColumn: any): Promise<boolean> {
  const [record] = await db.select({ id: table.id }).from(table).where(and(eq(table.id, recordId), eq(bizColumn, bizId)));
  return !!record;
}

// Helper: التحقق من ملكية حساب
async function verifyAccountOwnership(accountId: number, bizId: number): Promise<boolean> {
  const [acc] = await db.select({ id: accounts.id }).from(accounts).where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  return !!acc;
}

// Helper: التحقق من ملكية صندوق
async function verifyFundOwnership(fundId: number, bizId: number): Promise<boolean> {
  const [f] = await db.select({ id: funds.id }).from(funds).where(and(eq(funds.id, fundId), eq(funds.businessId, bizId)));
  return !!f;
}

// ===================== الأعمال =====================
api.get('/businesses', safeHandler('جلب قائمة الأعمال', async (c) => {
  const rows = await db.select().from(businesses).orderBy(businesses.sortOrder);
  
  const statsQuery = await db.execute(sql`
    SELECT 
      b.id as business_id,
      (SELECT COUNT(*) FROM stations s WHERE s.business_id = b.id) as station_count,
      (SELECT COUNT(*) FROM employees e WHERE e.business_id = b.id) as employee_count,
      (SELECT COUNT(*) FROM accounts a WHERE a.business_id = b.id) as account_count,
      (SELECT COUNT(*) FROM funds f WHERE f.business_id = b.id) as fund_count,
      (SELECT COUNT(*) FROM suppliers sp WHERE sp.business_id = b.id) as supplier_count,
      (SELECT COUNT(*) FROM pending_accounts pa WHERE pa.business_id = b.id) as pending_count
    FROM businesses b
    ORDER BY b.sort_order
  `);
  
  const statsRows = Array.isArray(statsQuery) ? statsQuery : (statsQuery as any).rows || [];
  const statsMap: Record<number, any> = {};
  for (const row of statsRows as any[]) {
    statsMap[row.business_id] = {
      stations: Number(row.station_count),
      employees: Number(row.employee_count),
      accounts: Number(row.account_count),
      funds: Number(row.fund_count),
      suppliers: Number(row.supplier_count),
      pendingAccounts: Number(row.pending_count),
    };
  }
  
  const allPartnersDetailed = await db.select().from(businessPartners);
  const partnerDetailMap: Record<number, any[]> = {};
  for (const p of allPartnersDetailed) {
    if (!partnerDetailMap[p.businessId]) partnerDetailMap[p.businessId] = [];
    partnerDetailMap[p.businessId].push(p);
  }
  
  return c.json(rows.map(biz => ({
    ...biz,
    partners: partnerDetailMap[biz.id] || [],
    stats: statsMap[biz.id] || { stations: 0, employees: 0, accounts: 0, funds: 0, suppliers: 0, pendingAccounts: 0 },
  })));
}));

api.get('/businesses/:id', safeHandler('جلب تفاصيل عمل', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العمل غير صالح' }, 400);
  const [biz] = await db.select().from(businesses).where(eq(businesses.id, id));
  if (!biz) return c.json({ error: 'عمل غير موجود' }, 404);
  const partners = await db.select().from(businessPartners).where(eq(businessPartners.businessId, id));
  return c.json({ ...biz, partners });
}));

// ===================== المحطات =====================
api.get('/businesses/:bizId/stations', bizAuthMiddleware(), safeHandler('جلب المحطات', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(stations).where(eq(stations.businessId, bizId)).orderBy(stations.id);
  return c.json(rows);
}));

api.get('/businesses/:bizId/stations/:id', bizAuthMiddleware(), safeHandler('جلب تفاصيل محطة', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const [station] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!station) return c.json({ error: 'محطة غير موجودة' }, 404);
  const emps = await db.select().from(employees).where(eq(employees.stationId, id));
  const stationFunds = await db.select().from(funds).where(eq(funds.stationId, id));
  return c.json({ ...station, employees: emps, funds: stationFunds });
}));

api.post('/businesses/:bizId/stations', bizAuthMiddleware(), safeHandler('إضافة محطة', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  if (!body.name) return c.json({ error: 'اسم المحطة مطلوب' }, 400);
  if (!body.code) return c.json({ error: 'كود المحطة مطلوب' }, 400);
  const [created] = await db.insert(stations).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.delete('/businesses/:bizId/stations/:id', bizAuthMiddleware(), safeHandler('حذف محطة', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const [existing] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!existing) return c.json({ error: 'محطة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  await db.delete(stations).where(eq(stations.id, id));
  return c.json({ success: true });
}));

api.put('/businesses/:bizId/stations/:id', bizAuthMiddleware(), safeHandler('تعديل محطة', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const [existing] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!existing) return c.json({ error: 'محطة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  return c.json(updated);
}));

// Legacy route (backward compat)
api.put('/stations/:id', safeHandler('تعديل محطة (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المحطة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  if (!updated) return c.json({ error: 'محطة غير موجودة' }, 404);
  return c.json(updated);
}));

// ===================== الموظفين =====================
api.get('/businesses/:bizId/employees', bizAuthMiddleware(), safeHandler('جلب الموظفين', async (c) => {
  const bizId = c.get('bizId') as number;
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
}));

api.post('/businesses/:bizId/employees', bizAuthMiddleware(), safeHandler('إضافة موظف', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(employeeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(employees).values({ ...validation.data as any, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/employees/:id', bizAuthMiddleware(), safeHandler('تعديل موظف', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(employees).set({ ...body, updatedAt: new Date() }).where(eq(employees.id, id)).returning();
  return c.json(updated);
}));

api.delete('/businesses/:bizId/employees/:id', bizAuthMiddleware(), safeHandler('حذف موظف', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
}));

// Legacy routes
api.put('/employees/:id', safeHandler('تعديل موظف (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(employees).set({ ...body, updatedAt: new Date() }).where(eq(employees.id, id)).returning();
  if (!updated) return c.json({ error: 'موظف غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/employees/:id', safeHandler('حذف موظف (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الموظف غير صالح' }, 400);
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
}));

// ===================== حسابات الموظفين في أنظمة الفوترة =====================
api.get('/businesses/:bizId/employee-billing-accounts', bizAuthMiddleware(), safeHandler('جلب حسابات الفوترة', async (c) => {
  const bizId = c.get('bizId') as number;
  const stationId = c.req.query('stationId');
  const employeeId = c.req.query('employeeId');
  
  const rows = await db.select({
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
  
  let filtered = rows;
  if (stationId) filtered = filtered.filter(r => r.stationId === parseInt(stationId));
  if (employeeId) filtered = filtered.filter(r => r.employeeId === parseInt(employeeId));
  return c.json(filtered);
}));

api.post('/employee-billing-accounts', safeHandler('إضافة حساب فوترة', async (c) => {
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(employeeBillingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(employeeBillingAccounts).values(validation.data as any).returning();
  return c.json(created, 201);
}));

api.put('/employee-billing-accounts/:id', safeHandler('تعديل حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف حساب الفوترة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(employeeBillingAccounts).set(body).where(eq(employeeBillingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب فوترة غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/employee-billing-accounts/:id', safeHandler('حذف حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف حساب الفوترة غير صالح' }, 400);
  await db.delete(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== الحسابات مع الصلاحيات =====================
api.get('/businesses/:bizId/accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات', async (c) => {
  const bizId = c.get('bizId') as number;
  const includeAll = c.req.query('all') === 'true';

  const accountRows = await db.select().from(accounts).where(eq(accounts.businessId, bizId)).orderBy(accounts.accountType, accounts.name);
  
  const accountIds = accountRows.map(a => a.id);
  
  let balances: any[] = [];
  let allLinks: any[] = [];
  
  if (accountIds.length > 0) {
    balances = await db.select({
      accountId: accountBalances.accountId, currencyId: accountBalances.currencyId,
      balance: accountBalances.balance, currencyCode: currencies.code,
      currencySymbol: currencies.symbol, currencyName: currencies.nameAr,
    }).from(accountBalances)
      .leftJoin(currencies, eq(accountBalances.currencyId, currencies.id))
      .where(inArray(accountBalances.accountId, accountIds));
    
    allLinks = await db.select().from(accountAllowedLinks)
      .where(and(eq(accountAllowedLinks.isActive, true), inArray(accountAllowedLinks.fromAccountId, accountIds)));
  }
  
  const balanceMap: Record<number, any[]> = {};
  for (const b of balances) { if (!balanceMap[b.accountId]) balanceMap[b.accountId] = []; balanceMap[b.accountId].push(b); }
  
  const linkMap: Record<number, any[]> = {};
  for (const l of allLinks) { if (!linkMap[l.fromAccountId]) linkMap[l.fromAccountId] = []; linkMap[l.fromAccountId].push(l); }
  
  const enrichedAccounts = accountRows.map(a => ({ ...a, balances: balanceMap[a.id] || [], allowedLinks: linkMap[a.id] || [], _source: 'accounts' as const }));

  if (!includeAll) {
    return c.json(enrichedAccounts);
  }

  // 2. جلب الصناديق
  const fundRows = await db.select({
    id: funds.id, name: funds.name, fundType: funds.fundType,
    stationId: funds.stationId, responsiblePerson: funds.responsiblePerson,
    description: funds.description, isActive: funds.isActive, notes: funds.notes,
    createdAt: funds.createdAt, stationName: stations.name,
  }).from(funds)
    .leftJoin(stations, eq(funds.stationId, stations.id))
    .where(eq(funds.businessId, bizId))
    .orderBy(funds.fundType, funds.name);
  
  const fundIds = fundRows.map(f => f.id);
  let fBalances: any[] = [];
  if (fundIds.length > 0) {
    fBalances = await db.select({
      fundId: fundBalances.fundId, currencyId: fundBalances.currencyId,
      balance: fundBalances.balance, currencyCode: currencies.code, currencySymbol: currencies.symbol,
    }).from(fundBalances)
      .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
      .where(inArray(fundBalances.fundId, fundIds));
  }
  const fBalanceMap: Record<number, any[]> = {};
  for (const b of fBalances) { if (!fBalanceMap[b.fundId]) fBalanceMap[b.fundId] = []; fBalanceMap[b.fundId].push(b); }

  const fundTypeLabels: Record<string, string> = {
    collection: 'تحصيل وتوريد', salary_advance: 'سلف', custody: 'عهدة',
    safe: 'خزنة', expense: 'مصروفات', deposit: 'إيداع', personal: 'شخصي',
  };
  const fundsAsAccounts = fundRows.map(f => ({
    id: f.id, name: f.name, accountType: 'fund', subType: f.fundType,
    subTypeLabel: fundTypeLabels[f.fundType] || f.fundType,
    provider: f.stationName || '', responsiblePerson: f.responsiblePerson || '',
    accountNumber: '', isActive: f.isActive, notes: f.notes, description: f.description,
    stationId: f.stationId, stationName: f.stationName, createdAt: f.createdAt,
    balances: fBalanceMap[f.id] || [], allowedLinks: [], _source: 'funds' as const,
  }));

  // 3. جلب حسابات الفوترة
  const billingRows = await db.select({
    id: employeeBillingAccounts.id, employeeId: employeeBillingAccounts.employeeId,
    stationId: employeeBillingAccounts.stationId, billingSystem: employeeBillingAccounts.billingSystem,
    collectionMethod: employeeBillingAccounts.collectionMethod, label: employeeBillingAccounts.label,
    sortOrder: employeeBillingAccounts.sortOrder, isActive: employeeBillingAccounts.isActive,
    notes: employeeBillingAccounts.notes, employeeName: employees.fullName, stationName: stations.name,
  }).from(employeeBillingAccounts)
    .leftJoin(employees, eq(employeeBillingAccounts.employeeId, employees.id))
    .leftJoin(stations, eq(employeeBillingAccounts.stationId, stations.id))
    .where(eq(employees.businessId, bizId))
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId);

  const BILLING_SYSTEM_NAMES: Record<string, string> = {
    'moghrabi_v1': 'المغربي نسخة 1 (الدهمية)', 'moghrabi_v2': 'المغربي نسخة 2 (الصبالية وجمال)',
    'moghrabi_v3': 'المغربي نسخة 3 (غليل)', 'support_fund': 'صندوق الدعم',
    'support_fund_west': 'صندوق الدعم - الساحل الغربي', 'prepaid': 'الدفع المسبق',
  };
  const COLLECTION_METHOD_NAMES: Record<string, string> = {
    'cash_mobile': 'تحصيل نقدي بالجوال', 'manual_assign': 'تحصيل إسناد يدوي',
    'electronic': 'سداد إلكتروني', 'haseb_deposit': 'إيداع حاسب',
  };
  const billingAsAccounts = billingRows.map(b => {
    const sysName = BILLING_SYSTEM_NAMES[b.billingSystem || ''] || b.billingSystem || '';
    const methodName = COLLECTION_METHOD_NAMES[b.collectionMethod || ''] || b.collectionMethod || '';
    return {
      id: b.id, name: b.label || `${sysName} - ${b.employeeName}`, accountType: 'billing',
      subType: sysName, subTypeLabel: sysName, provider: sysName,
      responsiblePerson: b.employeeName || '', accountNumber: '', isActive: b.isActive,
      notes: b.notes, stationId: b.stationId, stationName: b.stationName,
      collectionMethod: methodName, billingSystemKey: b.billingSystem || '',
      createdAt: null, balances: [], allowedLinks: [], _source: 'billing' as const,
    };
  });

  const stationRows = await db.select({ id: stations.id, name: stations.name })
    .from(stations).where(eq(stations.businessId, bizId)).orderBy(stations.name);

  return c.json({
    accounts: [...enrichedAccounts, ...fundsAsAccounts, ...billingAsAccounts],
    stations: stationRows,
  });
}));

api.post('/businesses/:bizId/accounts', bizAuthMiddleware(), safeHandler('إضافة حساب', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(accountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const { ...accountData } = validation.data as any;
  const allowedLinks = body.allowedLinks;
  const [created] = await db.insert(accounts).values({ ...accountData, businessId: bizId }).returning();
  
  if (allowedLinks && allowedLinks.length > 0) {
    for (const link of allowedLinks) {
      await db.insert(accountAllowedLinks).values({
        fromAccountId: created.id, toAccountId: link.toAccountId, linkType: link.linkType,
      });
    }
  }
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), safeHandler('تعديل حساب', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = normalizeBody(await c.req.json());
  const { allowedLinks, ...accountData } = body;
  const [updated] = await db.update(accounts).set({ ...accountData, updatedAt: new Date() }).where(eq(accounts.id, id)).returning();
  
  if (allowedLinks !== undefined) {
    await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
    if (allowedLinks && allowedLinks.length > 0) {
      for (const link of allowedLinks) {
        await db.insert(accountAllowedLinks).values({ fromAccountId: id, toAccountId: link.toAccountId, linkType: link.linkType });
      }
    }
  }
  return c.json(updated);
}));

api.delete('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), safeHandler('حذف حساب', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.toAccountId, id));
  await db.delete(accountBalances).where(eq(accountBalances.accountId, id));
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
}));

// Legacy routes
api.put('/accounts/:id', safeHandler('تعديل حساب (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const { allowedLinks, ...accountData } = body;
  const [updated] = await db.update(accounts).set({ ...accountData, updatedAt: new Date() }).where(eq(accounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب غير موجود' }, 404);
  if (allowedLinks !== undefined) {
    await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
    if (allowedLinks && allowedLinks.length > 0) {
      for (const link of allowedLinks) {
        await db.insert(accountAllowedLinks).values({ fromAccountId: id, toAccountId: link.toAccountId, linkType: link.linkType });
      }
    }
  }
  return c.json(updated);
}));

api.delete('/accounts/:id', safeHandler('حذف حساب (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.toAccountId, id));
  await db.delete(accountBalances).where(eq(accountBalances.accountId, id));
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
}));

// ===================== ربط الحسابات المسموحة =====================
api.get('/accounts/:id/allowed-links', safeHandler('جلب روابط الحسابات', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const links = await db.select({
    id: accountAllowedLinks.id, fromAccountId: accountAllowedLinks.fromAccountId,
    toAccountId: accountAllowedLinks.toAccountId, linkType: accountAllowedLinks.linkType,
    toAccountName: accounts.name, toAccountType: accounts.accountType,
  }).from(accountAllowedLinks)
    .leftJoin(accounts, eq(accountAllowedLinks.toAccountId, accounts.id))
    .where(eq(accountAllowedLinks.fromAccountId, id));
  return c.json(links);
}));

api.post('/account-links', safeHandler('إضافة رابط حساب', async (c) => {
  const body = normalizeBody(await c.req.json());
  const reqErr = validateRequired(body, [
    { name: 'fromAccountId', label: 'حساب المصدر' },
    { name: 'toAccountId', label: 'حساب الهدف' },
    { name: 'linkType', label: 'نوع الرابط' },
  ]);
  if (reqErr) return c.json({ error: reqErr }, 400);
  const [created] = await db.insert(accountAllowedLinks).values(body).returning();
  return c.json(created, 201);
}));

api.delete('/account-links/:id', safeHandler('حذف رابط حساب', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الرابط غير صالح' }, 400);
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.id, id));
  return c.json({ success: true });
}));

api.get('/accounts/:id/allowed-targets', safeHandler('جلب الحسابات المسموحة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const type = c.req.query('type') || 'payment';
  const links = await db.select({
    toAccountId: accountAllowedLinks.toAccountId, toAccountName: accounts.name, toAccountType: accounts.accountType,
  }).from(accountAllowedLinks)
    .leftJoin(accounts, eq(accountAllowedLinks.toAccountId, accounts.id))
    .where(and(eq(accountAllowedLinks.fromAccountId, id), eq(accountAllowedLinks.linkType, type)));
  return c.json(links);
}));

// ===================== الصناديق =====================
api.get('/businesses/:bizId/funds', bizAuthMiddleware(), safeHandler('جلب الصناديق', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select({
    id: funds.id, name: funds.name, fundType: funds.fundType,
    stationId: funds.stationId, responsiblePerson: funds.responsiblePerson,
    description: funds.description, isActive: funds.isActive, notes: funds.notes,
    createdAt: funds.createdAt, stationName: stations.name,
  }).from(funds)
    .leftJoin(stations, eq(funds.stationId, stations.id))
    .where(eq(funds.businessId, bizId))
    .orderBy(funds.fundType, funds.name);
  
  const fundIds = rows.map(f => f.id);
  let balancesArr: any[] = [];
  if (fundIds.length > 0) {
    balancesArr = await db.select({
      fundId: fundBalances.fundId, currencyId: fundBalances.currencyId,
      balance: fundBalances.balance, currencyCode: currencies.code, currencySymbol: currencies.symbol,
    }).from(fundBalances)
      .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
      .where(inArray(fundBalances.fundId, fundIds));
  }
  const balanceMap: Record<number, any[]> = {};
  for (const b of balancesArr) { if (!balanceMap[b.fundId]) balanceMap[b.fundId] = []; balanceMap[b.fundId].push(b); }
  return c.json(rows.map(f => ({ ...f, balances: balanceMap[f.id] || [] })));
}));

api.post('/businesses/:bizId/funds', bizAuthMiddleware(), safeHandler('إضافة صندوق', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(fundSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(funds).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/funds/:id', bizAuthMiddleware(), safeHandler('تعديل صندوق', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [existing] = await db.select().from(funds).where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
  if (!existing) return c.json({ error: 'صندوق غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(funds).set({ ...body, updatedAt: new Date() }).where(eq(funds.id, id)).returning();
  return c.json(updated);
}));

api.delete('/businesses/:bizId/funds/:id', bizAuthMiddleware(), safeHandler('حذف صندوق', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [existing] = await db.select().from(funds).where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
  if (!existing) return c.json({ error: 'صندوق غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(funds).where(eq(funds.id, id));
  return c.json({ success: true });
}));

// Legacy
api.put('/funds/:id', safeHandler('تعديل صندوق (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(funds).set({ ...body, updatedAt: new Date() }).where(eq(funds.id, id)).returning();
  if (!updated) return c.json({ error: 'صندوق غير موجود' }, 404);
  return c.json(updated);
}));


// ===================== السندات =====================
api.get('/businesses/:bizId/vouchers', bizAuthMiddleware(), safeHandler('جلب السندات', async (c) => {
  const bizId = c.get('bizId') as number;
  const typeFilter = c.req.query('type');
  const conditions = [eq(vouchers.businessId, bizId)];
  if (typeFilter) conditions.push(eq(vouchers.voucherType, typeFilter));
  const rows = await db.select().from(vouchers).where(and(...conditions)).orderBy(desc(vouchers.createdAt));
  return c.json(rows);
}));

api.post('/businesses/:bizId/vouchers', bizAuthMiddleware(), safeHandler('إضافة سند', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(voucherSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  
  const voucherData = validation.data as any;
  // تحويل voucherDate من string إلى Date
  if (voucherData.voucherDate && typeof voucherData.voucherDate === 'string') {
    voucherData.voucherDate = new Date(voucherData.voucherDate);
  }
  // توليد رقم السند تلقائياً إذا لم يُرسل
  if (!voucherData.voucherNumber) {
    const prefix = voucherData.voucherType === 'receipt' ? 'RCV' : voucherData.voucherType === 'payment' ? 'PAY' : 'VCH';
    const countResult = await db.execute(sql`SELECT COUNT(*) as cnt FROM vouchers WHERE business_id = ${bizId}`);
    const count = parseInt(String((countResult as any).rows?.[0]?.cnt || (countResult as any)[0]?.cnt || 0)) + 1;
    voucherData.voucherNumber = `${prefix}-${String(count).padStart(6, '0')}`;
  }
  const [created] = await db.insert(vouchers).values({
    ...voucherData,
    businessId: bizId,
    amount: String(voucherData.amount),
    status: 'confirmed',
    createdBy: (c.get('user') as any)?.userId,
  }).returning();
  
  // إنشاء قيد محاسبي تلقائي لكل سند
  if (created.toAccountId || created.fromAccountId) {
    const amount = parseFloat(String(created.amount));
    // جلب اسم نوع العملية إن وجد
    let opTypeName = '';
    if (voucherData.operationTypeId) {
      const otRows = await db.execute(sql`SELECT name FROM operation_types WHERE id = ${voucherData.operationTypeId}`);
      const otResult = Array.isArray(otRows) ? otRows : (otRows as any).rows || [];
      if (otResult.length > 0) opTypeName = (otResult[0] as any).name;
    }
    const [entry] = await db.insert(journalEntries).values({
      businessId: bizId,
      entryNumber: `JE-${created.voucherNumber || created.id}`,
      entryDate: created.voucherDate ? new Date(created.voucherDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      description: opTypeName ? `${opTypeName} - ${created.description || ''}` : `سند ${created.voucherType} - ${created.description || ''}`,
      reference: created.voucherNumber || `V-${created.id}`,
      operationTypeId: voucherData.operationTypeId || null,
      totalDebit: String(amount),
      totalCredit: String(amount),
      isBalanced: true,
      createdBy: (c.get('user') as any)?.userId,
    }).returning();
    
    // إنشاء سطور القيد
    if (created.toAccountId) {
      await db.insert(journalEntryLines).values({
        journalEntryId: entry.id, accountId: created.toAccountId,
        lineType: 'debit', amount: String(amount),
        description: created.description || opTypeName || `سند ${created.voucherType}`, sortOrder: 0,
      });
    }
    if (created.fromAccountId) {
      await db.insert(journalEntryLines).values({
        journalEntryId: entry.id, accountId: created.fromAccountId,
        lineType: 'credit', amount: String(amount),
        description: created.description || opTypeName || `سند ${created.voucherType}`, sortOrder: 1,
      });
    }
  }
  
  return c.json(created, 201);
}));

api.delete('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), safeHandler('حذف سند', async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'سند غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.update(vouchers).set({ status: 'cancelled', updatedAt: new Date() }).where(eq(vouchers.id, id));
  return c.json({ success: true });
}));

// Legacy
api.delete('/vouchers/:id', safeHandler('حذف سند (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  await db.update(vouchers).set({ status: 'cancelled', updatedAt: new Date() }).where(eq(vouchers.id, id));
  return c.json({ success: true });
}));

// ===================== التحصيل اليومي =====================
api.get('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('جلب التحصيلات', async (c) => {
  const bizId = c.get('bizId') as number;
  const stationId = c.req.query('stationId');
  const dateStr = c.req.query('date');
  
  const conditions = [eq(dailyCollections.businessId, bizId)];
  if (stationId) conditions.push(eq(dailyCollections.stationId, parseInt(stationId)));
  if (dateStr) conditions.push(eq(dailyCollections.collectionDate, dateStr));
  
  const rows = await db.select({
    id: dailyCollections.id, stationId: dailyCollections.stationId,
    collectionDate: dailyCollections.collectionDate, totalAmount: dailyCollections.totalAmount,
    isFullyDelivered: dailyCollections.isFullyDelivered, notes: dailyCollections.notes,
    createdAt: dailyCollections.createdAt, stationName: stations.name,
  }).from(dailyCollections)
    .leftJoin(stations, eq(dailyCollections.stationId, stations.id))
    .where(and(...conditions))
    .orderBy(desc(dailyCollections.collectionDate));
  return c.json(rows);
}));

api.get('/collections/:id', safeHandler('جلب تفاصيل تحصيل', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التحصيل غير صالح' }, 400);
  const [collection] = await db.select().from(dailyCollections).where(eq(dailyCollections.id, id));
  if (!collection) return c.json({ error: 'تحصيل غير موجود' }, 404);
  
  const details = await db.select({
    id: collectionDetails.id, employeeId: collectionDetails.employeeId,
    billingAccountId: collectionDetails.billingAccountId, amount: collectionDetails.amount,
    notes: collectionDetails.notes, employeeName: employees.fullName,
    billingLabel: employeeBillingAccounts.label, billingSystem: employeeBillingAccounts.billingSystem,
    collectionMethod: employeeBillingAccounts.collectionMethod,
  }).from(collectionDetails)
    .leftJoin(employees, eq(collectionDetails.employeeId, employees.id))
    .leftJoin(employeeBillingAccounts, eq(collectionDetails.billingAccountId, employeeBillingAccounts.id))
    .where(eq(collectionDetails.collectionId, id));
  
  const deliveries = await db.select({
    id: deliveryRecords.id, employeeId: deliveryRecords.employeeId,
    toAccountId: deliveryRecords.toAccountId, amount: deliveryRecords.amount,
    deliveryDate: deliveryRecords.deliveryDate, reference: deliveryRecords.reference,
    notes: deliveryRecords.notes, employeeName: employees.fullName, accountName: accounts.name,
  }).from(deliveryRecords)
    .leftJoin(employees, eq(deliveryRecords.employeeId, employees.id))
    .leftJoin(accounts, eq(deliveryRecords.toAccountId, accounts.id))
    .where(eq(deliveryRecords.collectionId, id));
  
  return c.json({ ...collection, details, deliveries });
}));

api.post('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('إضافة تحصيل', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const { details, ...collectionData } = body;
  
  if (!collectionData.stationId) return c.json({ error: 'معرّف المحطة مطلوب' }, 400);
  if (!collectionData.collectionDate) return c.json({ error: 'تاريخ التحصيل مطلوب' }, 400);
  
  let total = 0;
  if (details) for (const d of details) total += parseFloat(d.amount || '0');
  
  const [created] = await db.insert(dailyCollections).values({
    ...collectionData, businessId: bizId, totalAmount: String(total),
  }).returning();
  
  if (details && details.length > 0) {
    for (const d of details) {
      if (parseFloat(d.amount || '0') > 0) {
        await db.insert(collectionDetails).values({
          collectionId: created.id, employeeId: d.employeeId,
          billingAccountId: d.billingAccountId, amount: d.amount, notes: d.notes,
        });
      }
    }
  }
  return c.json(created, 201);
}));

// ===================== التوريد =====================
api.post('/collections/:id/deliveries', safeHandler('إضافة توريد', async (c) => {
  const collectionId = parseId(c.req.param('id'));
  if (!collectionId) return c.json({ error: 'معرّف التحصيل غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  
  if (!body.amount) return c.json({ error: 'المبلغ مطلوب' }, 400);
  
  const [created] = await db.insert(deliveryRecords).values({ ...body, collectionId }).returning();
  
  const [collection] = await db.select().from(dailyCollections).where(eq(dailyCollections.id, collectionId));
  if (collection) {
    const allDeliveries = await db.select().from(deliveryRecords).where(eq(deliveryRecords.collectionId, collectionId));
    const totalDelivered = allDeliveries.reduce((sum, d) => sum + parseFloat(d.amount), 0);
    const totalCollected = parseFloat(collection.totalAmount);
    
    if (totalDelivered >= totalCollected) {
      await db.update(dailyCollections).set({ isFullyDelivered: true, updatedAt: new Date() }).where(eq(dailyCollections.id, collectionId));
    }
  }
  
  return c.json(created, 201);
}));

// ===================== الشركاء =====================
api.get('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('جلب الشركاء', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(businessPartners).where(eq(businessPartners.businessId, bizId));
  return c.json(rows);
}));

api.post('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('إضافة شريك', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(partnerSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(businessPartners).values({ ...validation.data as any, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/partners/:id', safeHandler('تعديل شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(businessPartners).set({ ...body, updatedAt: new Date() }).where(eq(businessPartners.id, id)).returning();
  if (!updated) return c.json({ error: 'شريك غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/partners/:id', safeHandler('حذف شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  await db.delete(businessPartners).where(eq(businessPartners.id, id));
  return c.json({ success: true });
}));

// ===================== الموردين =====================
api.get('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('جلب الموردين', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(suppliers).where(eq(suppliers.businessId, bizId)).orderBy(suppliers.id);
  return c.json(rows);
}));

api.post('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('إضافة مورد', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(supplierSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(suppliers).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/suppliers/:id', safeHandler('تعديل مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(suppliers).set({ ...body, updatedAt: new Date() }).where(eq(suppliers.id, id)).returning();
  if (!updated) return c.json({ error: 'مورد غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/suppliers/:id', safeHandler('حذف مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  await db.delete(suppliers).where(eq(suppliers.id, id));
  return c.json({ success: true });
}));

// ===================== المخازن =====================
api.get('/businesses/:bizId/warehouses', bizAuthMiddleware(), safeHandler('جلب المخازن', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(warehouses).where(eq(warehouses.businessId, bizId)).orderBy(warehouses.id);
  return c.json(rows);
}));

api.post('/businesses/:bizId/warehouses', bizAuthMiddleware(), safeHandler('إضافة مخزن', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(warehouseSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(warehouses).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/warehouses/:id', safeHandler('تعديل مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(warehouses).set({ ...body, updatedAt: new Date() }).where(eq(warehouses.id, id)).returning();
  if (!updated) return c.json({ error: 'مخزن غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/warehouses/:id', safeHandler('حذف مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  await db.delete(warehouses).where(eq(warehouses.id, id));
  return c.json({ success: true });
}));

// ===================== الحسابات المعلقة =====================
api.get('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات المعلقة', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(pendingAccounts).where(eq(pendingAccounts.businessId, bizId));
  return c.json(rows);
}));

api.post('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), safeHandler('إضافة حساب معلق', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(pendingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(pendingAccounts).values({ ...validation.data as any, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/pending-accounts/:id', safeHandler('تعديل حساب معلق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب المعلق غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(pendingAccounts).set({ ...body, updatedAt: new Date() }).where(eq(pendingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب معلق غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/pending-accounts/:id', safeHandler('حذف حساب معلق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب المعلق غير صالح' }, 400);
  await db.delete(pendingAccounts).where(eq(pendingAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== التصفيات =====================
api.get('/businesses/:bizId/settlements', bizAuthMiddleware(), safeHandler('جلب التصفيات', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(reconciliations).where(eq(reconciliations.businessId, bizId)).orderBy(desc(reconciliations.createdAt));
  return c.json(rows);
}));

api.post('/businesses/:bizId/settlements', bizAuthMiddleware(), safeHandler('إضافة تصفية', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(settlementSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as any;
  const [created] = await db.insert(reconciliations).values({
    ...data,
    businessId: bizId,
    reconciliationType: data.reconciliationType || data.type || 'general',
    expectedAmount: data.expectedAmount ? String(data.expectedAmount) : null,
    actualAmount: data.actualAmount ? String(data.actualAmount) : null,
  }).returning();
  return c.json(created, 201);
}));

api.put('/settlements/:id', safeHandler('تعديل تصفية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصفية غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(reconciliations).set({ ...body, updatedAt: new Date() }).where(eq(reconciliations.id, id)).returning();
  if (!updated) return c.json({ error: 'تصفية غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/settlements/:id', safeHandler('حذف تصفية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصفية غير صالح' }, 400);
  await db.delete(reconciliations).where(eq(reconciliations.id, id));
  return c.json({ success: true });
}));

// ===================== تصنيفات السندات =====================
api.get('/businesses/:bizId/voucher-categories', bizAuthMiddleware(), safeHandler('جلب تصنيفات السندات', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(voucherCategories).where(eq(voucherCategories.businessId, bizId)).orderBy(voucherCategories.type, voucherCategories.name);
  return c.json(rows);
}));

// ===================== العملات =====================
api.get('/currencies', safeHandler('جلب العملات', async (c) => {
  const rows = await db.select().from(currencies).orderBy(currencies.id);
  return c.json(rows);
}));

// ===================== المرفقات =====================
api.get('/attachments/:entityType/:entityId', safeHandler('جلب المرفقات', async (c) => {
  const entityType = c.req.param('entityType');
  const entityId = parseId(c.req.param('entityId'));
  if (!entityId) return c.json({ error: 'معرّف الكيان غير صالح' }, 400);
  const rows = await db.select().from(attachments)
    .where(and(eq(attachments.entityType, entityType), eq(attachments.entityId, entityId)));
  return c.json(rows);
}));

// ===================== Legacy routes =====================
api.get('/stations', safeHandler('جلب المحطات (legacy)', async (c) => {
  const rows = await db.select().from(stations).orderBy(stations.id);
  return c.json(rows);
}));

api.get('/employees', safeHandler('جلب الموظفين (legacy)', async (c) => {
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

api.get('/accounts', safeHandler('جلب الحسابات (legacy)', async (c) => {
  const rows = await db.select().from(accounts).orderBy(accounts.accountType, accounts.name);
  return c.json(rows);
}));

api.get('/funds', safeHandler('جلب الصناديق (legacy)', async (c) => {
  const rows = await db.select().from(funds).orderBy(funds.fundType, funds.name);
  return c.json(rows);
}));

api.get('/voucher-categories', safeHandler('جلب تصنيفات السندات (legacy)', async (c) => {
  const rows = await db.select().from(voucherCategories).orderBy(voucherCategories.type, voucherCategories.name);
  return c.json(rows);
}));

api.get('/suppliers', safeHandler('جلب الموردين (legacy)', async (c) => {
  const rows = await db.select().from(suppliers).orderBy(suppliers.id);
  return c.json(rows);
}));


// ===================== أنواع العمليات (القوالب) =====================
api.get('/businesses/:bizId/operation-types', bizAuthMiddleware(), safeHandler('جلب أنواع العمليات', async (c) => {
  const bizId = c.get('bizId') as number;
  const category = c.req.query('category');
  const screen = c.req.query('screen');
  const conditions = [eq(operationTypes.businessId, bizId)];
  if (category) conditions.push(eq(operationTypes.category, category));
  if (screen) conditions.push(sql`${screen} = ANY(${operationTypes.screens})`);
  
  const rows = await db.select().from(operationTypes)
    .where(and(...conditions))
    .orderBy(operationTypes.sortOrder, operationTypes.name);
  
  const otIds = rows.map(ot => ot.id);
  let allLinkedAccounts: any[] = [];
  if (otIds.length > 0) {
    allLinkedAccounts = await db.select({
      id: operationTypeAccounts.id, operationTypeId: operationTypeAccounts.operationTypeId,
      accountId: operationTypeAccounts.accountId,
      employeeBillingAccountId: operationTypeAccounts.employeeBillingAccountId,
      label: operationTypeAccounts.label, permission: operationTypeAccounts.permission,
      sortOrder: operationTypeAccounts.sortOrder, isActive: operationTypeAccounts.isActive,
      accountName: accounts.name, accountType: accounts.accountType,
    }).from(operationTypeAccounts)
      .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
      .where(inArray(operationTypeAccounts.operationTypeId, otIds));
  }
  
  const linkedMap: Record<number, any[]> = {};
  for (const la of allLinkedAccounts) {
    if (!linkedMap[la.operationTypeId]) linkedMap[la.operationTypeId] = [];
    linkedMap[la.operationTypeId].push(la);
  }
  
  return c.json(rows.map(ot => ({ ...ot, linkedAccounts: linkedMap[ot.id] || [] })));
}));

api.get('/operation-types/:id', safeHandler('جلب تفاصيل نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, id));
  if (!ot) return c.json({ error: 'نوع العملية غير موجود' }, 404);
  const linkedAccounts = await db.select({
    id: operationTypeAccounts.id, accountId: operationTypeAccounts.accountId,
    employeeBillingAccountId: operationTypeAccounts.employeeBillingAccountId,
    label: operationTypeAccounts.label, permission: operationTypeAccounts.permission,
    sortOrder: operationTypeAccounts.sortOrder, isActive: operationTypeAccounts.isActive,
    accountName: accounts.name, accountType: accounts.accountType,
  }).from(operationTypeAccounts)
    .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
    .where(eq(operationTypeAccounts.operationTypeId, id));
  return c.json({ ...ot, linkedAccounts });
}));

api.post('/businesses/:bizId/operation-types', bizAuthMiddleware(), safeHandler('إضافة نوع عملية', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(operationTypeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as any;
  // تحويل screens من string إلى array إذا لزم
  if (typeof data.screens === 'string') data.screens = [data.screens];
  const { linkedAccounts: laList, ...otData } = data;
  const [created] = await db.insert(operationTypes).values({ ...otData, businessId: bizId }).returning();
  // حفظ الحسابات المرتبطة إن وُجدت
  if (Array.isArray(laList) && laList.length > 0) {
    await db.insert(operationTypeAccounts).values(
      laList.map((la: any, i: number) => ({
        operationTypeId: created.id,
        accountId: la.accountId,
        label: la.label || null,
        permission: la.permission || 'both',
        sortOrder: la.sortOrder ?? i,
      }))
    );
  }
  return c.json(created, 201);
}));

api.put('/operation-types/:id', safeHandler('تعديل نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (typeof body.screens === 'string') body.screens = [body.screens];
  const { linkedAccounts: laList, ...otData } = body;
  const [updated] = await db.update(operationTypes).set({ ...otData, updatedAt: new Date() }).where(eq(operationTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع العملية غير موجود' }, 404);
  // تحديث الحسابات المرتبطة إن أُرسلت
  if (Array.isArray(laList)) {
    await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
    if (laList.length > 0) {
      await db.insert(operationTypeAccounts).values(
        laList.map((la: any, i: number) => ({
          operationTypeId: id,
          accountId: la.accountId,
          label: la.label || null,
          permission: la.permission || 'both',
          sortOrder: la.sortOrder ?? i,
        }))
      );
    }
  }
  return c.json(updated);
}));

api.delete('/operation-types/:id', safeHandler('حذف نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  await db.delete(operationTypes).where(eq(operationTypes.id, id));
  return c.json({ success: true });
}));

api.post('/operation-types/:otId/accounts', safeHandler('ربط حساب بنوع عملية', async (c) => {
  const otId = parseId(c.req.param('otId'));
  if (!otId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.accountId && !body.employeeBillingAccountId) {
    return c.json({ error: 'يجب تحديد حساب أو حساب فوترة' }, 400);
  }
  const [created] = await db.insert(operationTypeAccounts).values({ ...body, operationTypeId: otId }).returning();
  return c.json(created, 201);
}));

api.delete('/operation-type-accounts/:id', safeHandler('فك ربط حساب من نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الربط غير صالح' }, 400);
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== القيود المحاسبية =====================
api.get('/businesses/:bizId/journal-entries', bizAuthMiddleware(), safeHandler('جلب القيود المحاسبية', async (c) => {
  const bizId = c.get('bizId') as number;
  const entries = await db.select().from(journalEntries).where(eq(journalEntries.businessId, bizId)).orderBy(desc(journalEntries.entryDate));
  
  const entryIds = entries.map(e => e.id);
  let allLines: any[] = [];
  if (entryIds.length > 0) {
    allLines = await db.select({
      id: journalEntryLines.id, journalEntryId: journalEntryLines.journalEntryId,
      accountId: journalEntryLines.accountId, lineType: journalEntryLines.lineType,
      amount: journalEntryLines.amount, description: journalEntryLines.description,
      sortOrder: journalEntryLines.sortOrder, accountName: accounts.name,
    }).from(journalEntryLines)
      .leftJoin(accounts, eq(journalEntryLines.accountId, accounts.id))
      .where(inArray(journalEntryLines.journalEntryId, entryIds));
  }
  
  const lineMap: Record<number, any[]> = {};
  for (const l of allLines) {
    if (!lineMap[l.journalEntryId]) lineMap[l.journalEntryId] = [];
    lineMap[l.journalEntryId].push(l);
  }
  
  return c.json(entries.map(e => ({ ...e, lines: lineMap[e.id] || [] })));
}));

api.post('/businesses/:bizId/journal-entries', bizAuthMiddleware(), safeHandler('إضافة قيد محاسبي', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  
  const { lines, ...entryData } = body;
  if (!lines || !Array.isArray(lines) || lines.length < 2) {
    return c.json({ error: 'القيد يجب أن يحتوي على سطرين على الأقل (مدين ودائن)' }, 400);
  }
  
  const entryDate = entryData.entryDate || entryData.date || new Date().toISOString().split('T')[0];
  
  const [entry] = await db.insert(journalEntries).values({
    businessId: bizId,
    entryNumber: entryData.reference || `JE-${Date.now()}`,
    entryDate,
    description: entryData.description || '',
    reference: entryData.reference || null,
    operationTypeId: entryData.operationTypeId || null,
    createdBy: (c.get('user') as any)?.userId,
  }).returning();
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.accountId) return c.json({ error: `السطر ${i + 1}: معرّف الحساب مطلوب` }, 400);
    if (!line.amount) return c.json({ error: `السطر ${i + 1}: المبلغ مطلوب` }, 400);
    const lineType = line.lineType || line.type;
    if (!lineType) return c.json({ error: `السطر ${i + 1}: نوع السطر (مدين/دائن) مطلوب` }, 400);
    
    await db.insert(journalEntryLines).values({
      journalEntryId: entry.id,
      accountId: line.accountId,
      lineType: lineType,
      amount: String(line.amount),
      description: line.description || '',
      sortOrder: i,
    });
  }
  
  return c.json(entry, 201);
}));

api.delete('/journal-entries/:id', safeHandler('حذف قيد محاسبي', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف القيد غير صالح' }, 400);
  await db.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, id));
  await db.delete(journalEntries).where(eq(journalEntries.id, id));
  return c.json({ success: true });
}));


// ===================== إعدادات أنظمة الفوترة =====================
api.get('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('جلب إعدادات أنظمة الفوترة', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(billingSystemsConfig)
    .where(eq(billingSystemsConfig.businessId, bizId))
    .orderBy(billingSystemsConfig.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('إضافة إعداد نظام فوترة', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(billingSystemConfigSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(billingSystemsConfig).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/billing-systems-config/:id', safeHandler('تعديل إعداد نظام فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(billingSystemsConfig).set({ ...body, updatedAt: new Date() }).where(eq(billingSystemsConfig.id, id)).returning();
  if (!updated) return c.json({ error: 'إعداد غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/billing-systems-config/:id', safeHandler('حذف إعداد نظام فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
  await db.delete(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع حسابات الفوترة =====================
api.get('/businesses/:bizId/billing-account-types', bizAuthMiddleware(), safeHandler('جلب أنواع حسابات الفوترة', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.businessId, bizId)).orderBy(billingAccountTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/billing-account-types', bizAuthMiddleware(), safeHandler('إضافة نوع حساب فوترة', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  if (!body.name) return c.json({ error: 'اسم النوع مطلوب' }, 400);
  const [created] = await db.insert(billingAccountTypes).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/billing-account-types/:id', safeHandler('تعديل نوع حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(billingAccountTypes).set(body).where(eq(billingAccountTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/billing-account-types/:id', safeHandler('حذف نوع حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  await db.delete(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع الصناديق =====================
api.get('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('جلب أنواع الصناديق', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(fundTypes).where(eq(fundTypes.businessId, bizId)).orderBy(fundTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('إضافة نوع صندوق', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(fundTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/fund-types/:id', safeHandler('تعديل نوع صندوق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(fundTypes).set({ ...body, updatedAt: new Date() }).where(eq(fundTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/fund-types/:id', safeHandler('حذف نوع صندوق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  await db.delete(fundTypes).where(eq(fundTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع البنوك =====================
api.get('/businesses/:bizId/bank-types', bizAuthMiddleware(), safeHandler('جلب أنواع البنوك', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(bankTypes).where(eq(bankTypes.businessId, bizId)).orderBy(bankTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/bank-types', bizAuthMiddleware(), safeHandler('إضافة نوع بنك', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(bankTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/bank-types/:id', safeHandler('تعديل نوع بنك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(bankTypes).set({ ...body, updatedAt: new Date() }).where(eq(bankTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/bank-types/:id', safeHandler('حذف نوع بنك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  await db.delete(bankTypes).where(eq(bankTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع الصرافين =====================
api.get('/businesses/:bizId/exchange-types', bizAuthMiddleware(), safeHandler('جلب أنواع الصرافين', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(exchangeTypes).where(eq(exchangeTypes.businessId, bizId)).orderBy(exchangeTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/exchange-types', bizAuthMiddleware(), safeHandler('إضافة نوع صراف', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(exchangeTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/exchange-types/:id', safeHandler('تعديل نوع صراف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(exchangeTypes).set({ ...body, updatedAt: new Date() }).where(eq(exchangeTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/exchange-types/:id', safeHandler('حذف نوع صراف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  await db.delete(exchangeTypes).where(eq(exchangeTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع المحافظ الإلكترونية =====================
api.get('/businesses/:bizId/e-wallet-types', bizAuthMiddleware(), safeHandler('جلب أنواع المحافظ', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(eWalletTypes).where(eq(eWalletTypes.businessId, bizId)).orderBy(eWalletTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/e-wallet-types', bizAuthMiddleware(), safeHandler('إضافة نوع محفظة', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(eWalletTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/e-wallet-types/:id', safeHandler('تعديل نوع محفظة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(eWalletTypes).set({ ...body, updatedAt: new Date() }).where(eq(eWalletTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/e-wallet-types/:id', safeHandler('حذف نوع محفظة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  await db.delete(eWalletTypes).where(eq(eWalletTypes.id, id));
  return c.json({ success: true });
}));

// ===================== التبويب الجانبي - الأقسام =====================
api.get('/businesses/:bizId/sidebar-sections', bizAuthMiddleware(), safeHandler('جلب أقسام السايدبار', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(sidebarSections).where(eq(sidebarSections.businessId, bizId)).orderBy(sidebarSections.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/sidebar-sections', bizAuthMiddleware(), safeHandler('إضافة قسم سايدبار', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(sidebarSectionSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(sidebarSections).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/sidebar-sections/:id', safeHandler('تعديل قسم سايدبار', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف القسم غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(sidebarSections).set({ ...body, updatedAt: new Date() }).where(eq(sidebarSections.id, id)).returning();
  if (!updated) return c.json({ error: 'قسم غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/sidebar-sections/:id', safeHandler('حذف قسم سايدبار', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف القسم غير صالح' }, 400);
  const items = await db.select().from(sidebarItems).where(eq(sidebarItems.sectionId, id));
  for (const item of items) {
    await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, item.id));
  }
  await db.delete(sidebarItems).where(eq(sidebarItems.sectionId, id));
  await db.delete(sidebarSections).where(eq(sidebarSections.id, id));
  return c.json({ success: true });
}));

// ===================== التبويب الجانبي - العناصر =====================
api.get('/businesses/:bizId/sidebar-items', bizAuthMiddleware(), safeHandler('جلب عناصر السايدبار', async (c) => {
  const bizId = c.get('bizId') as number;
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
}));

api.post('/sidebar-items', safeHandler('إضافة عنصر سايدبار', async (c) => {
  const body = normalizeBody(await c.req.json());
  
  // إصلاح #1: التحقق من sectionId (حقل إلزامي)
  if (!body.sectionId) {
    return c.json({ error: 'معرّف القسم (sectionId) مطلوب - يجب تحديد القسم الذي سيُضاف إليه العنصر' }, 400);
  }
  if (!body.screenKey) return c.json({ error: 'مفتاح الشاشة (screenKey) مطلوب' }, 400);
  if (!body.label) return c.json({ error: 'التسمية (label) مطلوبة' }, 400);
  if (!body.icon) return c.json({ error: 'الأيقونة (icon) مطلوبة' }, 400);
  if (!body.route) return c.json({ error: 'المسار (route) مطلوب' }, 400);
  
  // التحقق من وجود القسم
  const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, body.sectionId));
  if (!section) return c.json({ error: 'القسم المحدد غير موجود' }, 404);
  
  const [created] = await db.insert(sidebarItems).values(body).returning();
  
  // إضافة العنصر لجميع المستخدمين المرتبطين بالعمل
  const bizId = section.businessId;
  const configs = await db.select().from(userSidebarConfig).where(eq(userSidebarConfig.businessId, bizId));
  const userIds = [...new Set(configs.map(c => c.userId))];
  for (const userId of userIds) {
    await db.insert(userSidebarConfig).values({
      userId, businessId: bizId, sidebarItemId: created.id,
      isVisible: false, customSortOrder: body.sortOrder || 0,
    });
  }
  
  return c.json(created, 201);
}));

api.put('/sidebar-items/:id', safeHandler('تعديل عنصر سايدبار', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(sidebarItems).set(body).where(eq(sidebarItems.id, id)).returning();
  if (!updated) return c.json({ error: 'عنصر غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/sidebar-items/:id', safeHandler('حذف عنصر سايدبار', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, id));
  await db.delete(sidebarItems).where(eq(sidebarItems.id, id));
  return c.json({ success: true });
}));


// ===================== إعدادات السايدبار للمستخدم =====================
api.get('/businesses/:bizId/users/:userId/sidebar', bizAuthMiddleware(), safeHandler('جلب سايدبار المستخدم', async (c) => {
  const bizId = c.get('bizId') as number;
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);

  // دالة مساعدة لجلب configs بالأسماء الصحيحة التي يتوقعها الفرونت إند
  const fetchConfigs = async () => {
    const rows = await db.select({
      configId: userSidebarConfig.id,
      itemId: userSidebarConfig.sidebarItemId,
      isVisible: userSidebarConfig.isVisible,
      customSortOrder: userSidebarConfig.customSortOrder,
      label: sidebarItems.label,
      icon: sidebarItems.icon,
      route: sidebarItems.route,
      screenKey: sidebarItems.screenKey,
      sectionId: sidebarItems.sectionId,
      sectionName: sidebarSections.name,
      sectionIcon: sidebarSections.icon,
      sectionSortOrder: sidebarSections.sortOrder,
      itemSortOrder: sidebarItems.sortOrder,
    }).from(userSidebarConfig)
      .leftJoin(sidebarItems, eq(userSidebarConfig.sidebarItemId, sidebarItems.id))
      .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
      .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, userId)))
      .orderBy(sidebarSections.sortOrder, userSidebarConfig.customSortOrder);
    return rows;
  };

  // جلب المستخدم لمعرفة دوره
  const userRow = await db.select({ role: users.role }).from(users).where(eq(users.id, userId)).limit(1);
  const isOwner = userRow[0]?.role === 'admin';

  // جلب كل عناصر هذا العمل
  const allBizItems = await db.select({ id: sidebarItems.id, sortOrder: sidebarItems.sortOrder })
    .from(sidebarItems)
    .leftJoin(sidebarSections, eq(sidebarItems.sectionId, sidebarSections.id))
    .where(eq(sidebarSections.businessId, bizId));

  // جلب العناصر الموجودة في config المستخدم
  const existingConfigs = await db.select({ sidebarItemId: userSidebarConfig.sidebarItemId })
    .from(userSidebarConfig)
    .where(and(eq(userSidebarConfig.businessId, bizId), eq(userSidebarConfig.userId, userId)));
  const existingItemIds = new Set(existingConfigs.map(e => e.sidebarItemId));

  // إضافة العناصر الجديدة التي لم تُضف بعد لـ config المستخدم
  const newItems = allBizItems.filter(item => !existingItemIds.has(item.id));
  if (newItems.length > 0) {
    // المالك يرى كل شيء تلقائياً، غيره لا يرى العناصر الجديدة حتى يُفعّلها المالك
    for (const item of newItems) {
      await db.insert(userSidebarConfig).values({
        userId, businessId: bizId, sidebarItemId: item.id,
        isVisible: isOwner, // المالك يرى كل شيء، غيره لا يرى الجديد تلقائياً
        customSortOrder: item.sortOrder || 0,
      });
    }
  }

  const configs = await fetchConfigs();
  return c.json(configs);
}));

api.put('/businesses/:bizId/users/:userId/sidebar', bizAuthMiddleware(), safeHandler('تحديث سايدبار المستخدم', async (c) => {
  const bizId = c.get('bizId') as number;
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const { items } = body;
  
  if (!items || !Array.isArray(items)) {
    return c.json({ error: 'قائمة العناصر (items) مطلوبة' }, 400);
  }
  
  for (const item of items) {
    if (item.id) {
      await db.update(userSidebarConfig).set({
        isVisible: item.isVisible,
        customSortOrder: item.customSortOrder,
      }).where(eq(userSidebarConfig.id, item.id));
    }
  }
  
  return c.json({ success: true });
}));

// ===================== المستخدمين =====================
api.get('/users', safeHandler('جلب المستخدمين', async (c) => {
  const rows = await db.select({
    id: users.id, username: users.username, fullName: users.fullName,
    role: users.role, isActive: users.isActive,
  }).from(users).orderBy(users.id);
  return c.json(rows);
}));

// ===================== الشاشات المخصصة =====================
api.get('/businesses/:bizId/screens', bizAuthMiddleware(), safeHandler('جلب الشاشات', async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId)).orderBy(screenTemplates.name);
  return c.json(rows);
}));

api.post('/businesses/:bizId/screens', bizAuthMiddleware(), safeHandler('إضافة شاشة', async (c) => {
  const bizId = c.get('bizId') as number;
  const body = normalizeBody(await c.req.json());
  
  if (!body.name) return c.json({ error: 'اسم الشاشة مطلوب' }, 400);
  
  const { widgets, addToSidebar, ...screenData } = body;
  const [created] = await db.insert(screenTemplates).values({
    ...screenData,
    businessId: bizId,
    createdBy: (c.get('user') as any)?.userId,
  }).returning();
  
  // إنشاء الويدجتس إذا وجدت
  if (widgets && Array.isArray(widgets)) {
    for (let i = 0; i < widgets.length; i++) {
      const w = widgets[i];
      await db.insert(screenWidgets).values({
        screenId: created.id,
        widgetType: w.widgetType || w.type || 'custom',
        title: w.title || `عنصر ${i + 1}`,
        config: w.config || {},
        positionX: w.positionX || 0,
        positionY: w.positionY || i,
        width: w.width || 12,
        height: w.height || 4,
        sortOrder: w.sortOrder || i,
      });
    }
  }
  
  return c.json(created, 201);
}));

api.put('/screens/:id', safeHandler('تعديل شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(screenTemplates).set({ ...body, updatedAt: new Date() }).where(eq(screenTemplates.id, id)).returning();
  if (!updated) return c.json({ error: 'شاشة غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/screens/:id', safeHandler('حذف شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  // حذف كل العلاقات
  const widgets = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, id));
  for (const w of widgets) {
    await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, w.id));
    await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, w.id));
  }
  await db.delete(screenWidgets).where(eq(screenWidgets.screenId, id));
  await db.delete(screenPermissions).where(eq(screenPermissions.screenId, id));
  await db.delete(screenTemplates).where(eq(screenTemplates.id, id));
  return c.json({ success: true });
}));

// ===================== ويدجتس الشاشات =====================
api.get('/screens/:screenId/widgets', safeHandler('جلب ويدجتس الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const rows = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, screenId)).orderBy(screenWidgets.sortOrder);
  return c.json(rows);
}));

api.post('/screens/:screenId/widgets', safeHandler('إضافة ويدجت', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.widgetType) return c.json({ error: 'نوع العنصر (widgetType) مطلوب' }, 400);
  if (!body.title) return c.json({ error: 'عنوان العنصر (title) مطلوب' }, 400);
  const [created] = await db.insert(screenWidgets).values({ ...body, screenId }).returning();
  return c.json(created, 201);
}));

api.put('/widgets/:id', safeHandler('تعديل ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(screenWidgets).set({ ...body, updatedAt: new Date() }).where(eq(screenWidgets.id, id)).returning();
  if (!updated) return c.json({ error: 'عنصر غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/widgets/:id', safeHandler('حذف ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, id));
  await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, id));
  await db.delete(screenWidgets).where(eq(screenWidgets.id, id));
  return c.json({ success: true });
}));

api.put('/screens/:screenId/widgets/batch', safeHandler('تحديث ويدجتس دفعة واحدة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const { widgets } = body;
  if (!widgets || !Array.isArray(widgets)) return c.json({ error: 'قائمة العناصر (widgets) مطلوبة' }, 400);
  
  const results = [];
  for (const w of widgets) {
    if (w.id) {
      const [updated] = await db.update(screenWidgets).set({
        positionX: w.positionX, positionY: w.positionY,
        width: w.width, height: w.height, sortOrder: w.sortOrder,
      }).where(eq(screenWidgets.id, w.id)).returning();
      if (updated) results.push(updated);
    }
  }
  return c.json(results);
}));

// ===================== ربط القوالب والحسابات بالعناصر =====================
api.get('/widgets/:widgetId/templates', safeHandler('جلب قوالب الويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const rows = await db.select({
    id: screenWidgetTemplates.id, widgetId: screenWidgetTemplates.widgetId,
    operationTypeId: screenWidgetTemplates.operationTypeId, sortOrder: screenWidgetTemplates.sortOrder,
    operationName: operationTypes.name, operationIcon: operationTypes.icon,
    operationColor: operationTypes.color,
  }).from(screenWidgetTemplates)
    .leftJoin(operationTypes, eq(screenWidgetTemplates.operationTypeId, operationTypes.id))
    .where(eq(screenWidgetTemplates.widgetId, widgetId));
  return c.json(rows);
}));

api.post('/widgets/:widgetId/templates', safeHandler('ربط قالب بويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.operationTypeId) return c.json({ error: 'معرّف نوع العملية مطلوب' }, 400);
  const [created] = await db.insert(screenWidgetTemplates).values({ ...body, widgetId }).returning();
  return c.json(created, 201);
}));

api.delete('/widget-templates/:id', safeHandler('فك ربط قالب من ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الربط غير صالح' }, 400);
  await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.id, id));
  return c.json({ success: true });
}));

api.get('/widgets/:widgetId/accounts', safeHandler('جلب حسابات الويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const rows = await db.select({
    id: screenWidgetAccounts.id, widgetId: screenWidgetAccounts.widgetId,
    accountId: screenWidgetAccounts.accountId, sortOrder: screenWidgetAccounts.sortOrder,
    accountName: accounts.name, accountType: accounts.accountType,
  }).from(screenWidgetAccounts)
    .leftJoin(accounts, eq(screenWidgetAccounts.accountId, accounts.id))
    .where(eq(screenWidgetAccounts.widgetId, widgetId));
  return c.json(rows);
}));

api.post('/widgets/:widgetId/accounts', safeHandler('ربط حساب بويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.accountId) return c.json({ error: 'معرّف الحساب مطلوب' }, 400);
  const [created] = await db.insert(screenWidgetAccounts).values({ ...body, widgetId }).returning();
  return c.json(created, 201);
}));

api.delete('/widget-accounts/:id', safeHandler('فك ربط حساب من ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الربط غير صالح' }, 400);
  await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== نسخ الشاشات =====================
api.post('/screens/:screenId/clone', safeHandler('نسخ شاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  
  const [original] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, screenId));
  if (!original) return c.json({ error: 'الشاشة الأصلية غير موجودة' }, 404);
  
  const [cloned] = await db.insert(screenTemplates).values({
    businessId: original.businessId,
    name: body.name || `${original.name} (نسخة)`,
    description: body.description || original.description,
    icon: original.icon,
    color: original.color,
    layoutConfig: original.layoutConfig,
    templateKey: original.templateKey,
  }).returning();
  
  // نسخ الويدجتس
  const originalWidgets = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, screenId));
  for (const w of originalWidgets) {
    const [newWidget] = await db.insert(screenWidgets).values({
      screenId: cloned.id, widgetType: w.widgetType, title: w.title,
      config: w.config, positionX: w.positionX, positionY: w.positionY,
      width: w.width, height: w.height, sortOrder: w.sortOrder,
    }).returning();
    
    // نسخ القوالب المرتبطة
    const wTemplates = await db.select().from(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, w.id));
    for (const t of wTemplates) {
      await db.insert(screenWidgetTemplates).values({
        widgetId: newWidget.id, operationTypeId: t.operationTypeId, sortOrder: t.sortOrder,
      });
    }
    
    // نسخ الحسابات المرتبطة
    const wAccounts = await db.select().from(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, w.id));
    for (const a of wAccounts) {
      await db.insert(screenWidgetAccounts).values({
        widgetId: newWidget.id, accountId: a.accountId, sortOrder: a.sortOrder,
      });
    }
  }
  
  return c.json(cloned, 201);
}));

api.post('/widgets/:widgetId/copy-to/:targetScreenId', safeHandler('نسخ ويدجت لشاشة أخرى', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  const targetScreenId = parseId(c.req.param('targetScreenId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  if (!targetScreenId) return c.json({ error: 'معرّف الشاشة الهدف غير صالح' }, 400);
  
  const [original] = await db.select().from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!original) return c.json({ error: 'العنصر الأصلي غير موجود' }, 404);
  
  const [copied] = await db.insert(screenWidgets).values({
    screenId: targetScreenId, widgetType: original.widgetType, title: original.title,
    config: original.config, positionX: original.positionX, positionY: original.positionY,
    width: original.width, height: original.height, sortOrder: original.sortOrder,
  }).returning();
  
  return c.json(copied, 201);
}));

api.get('/businesses/:bizId/screens-with-widgets', bizAuthMiddleware(), safeHandler('جلب الشاشات مع الويدجتس', async (c) => {
  const bizId = c.get('bizId') as number;
  const screensArr = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId)).orderBy(screenTemplates.name);
  
  const screenIds = screensArr.map(s => s.id);
  let allWidgets: any[] = [];
  if (screenIds.length > 0) {
    allWidgets = await db.select().from(screenWidgets).where(inArray(screenWidgets.screenId, screenIds)).orderBy(screenWidgets.sortOrder);
  }
  
  const widgetMap: Record<number, any[]> = {};
  for (const w of allWidgets) {
    if (!widgetMap[w.screenId]) widgetMap[w.screenId] = [];
    widgetMap[w.screenId].push(w);
  }
  
  return c.json(screensArr.map(s => ({ ...s, widgets: widgetMap[s.id] || [] })));
}));

// ===================== صلاحيات الشاشات =====================
api.get('/screens/:screenId/permissions', safeHandler('جلب صلاحيات الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const rows = await db.select({
    id: screenPermissions.id, screenId: screenPermissions.screenId,
    userId: screenPermissions.userId, permission: screenPermissions.permission,
    sortOrder: screenPermissions.sortOrder,
    username: users.username, fullName: users.fullName,
  }).from(screenPermissions)
    .leftJoin(users, eq(screenPermissions.userId, users.id))
    .where(eq(screenPermissions.screenId, screenId));
  return c.json(rows);
}));

api.post('/screens/:screenId/permissions', safeHandler('تعيين صلاحيات الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.userId) return c.json({ error: 'معرّف المستخدم مطلوب' }, 400);
  const [created] = await db.insert(screenPermissions).values({
    screenId,
    userId: body.userId,
    permission: body.permission || body.canView ? 'view' : 'execute',
    sortOrder: body.sortOrder || 0,
  }).returning();
  return c.json(created, 201);
}));

api.put('/screen-permissions/:id', safeHandler('تعديل صلاحية شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصلاحية غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const updateData: any = {};
  if (body.permission !== undefined) updateData.permission = body.permission;
  if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
  // تحويل canView/canEdit/canDelete إلى permission
  if (body.canView !== undefined || body.canEdit !== undefined || body.canDelete !== undefined) {
    if (body.canEdit || body.canDelete) updateData.permission = 'execute';
    else if (body.canView) updateData.permission = 'view';
  }
  const [updated] = await db.update(screenPermissions).set(updateData).where(eq(screenPermissions.id, id)).returning();
  if (!updated) return c.json({ error: 'صلاحية غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/screen-permissions/:id', safeHandler('حذف صلاحية شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصلاحية غير صالح' }, 400);
  await db.delete(screenPermissions).where(eq(screenPermissions.id, id));
  return c.json({ success: true });
}));

api.put('/screens/:screenId/permissions/batch', safeHandler('تحديث صلاحيات دفعة واحدة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const { permissions } = body;
  if (!permissions || !Array.isArray(permissions)) return c.json({ error: 'قائمة الصلاحيات مطلوبة' }, 400);
  
  for (const p of permissions) {
    const permission = (p.canEdit || p.canDelete) ? 'execute' : (p.permission || 'view');
    if (p.id) {
      await db.update(screenPermissions).set({ permission }).where(eq(screenPermissions.id, p.id));
    } else if (p.userId) {
      await db.insert(screenPermissions).values({
        screenId, userId: p.userId, permission, sortOrder: p.sortOrder || 0,
      });
    }
  }
  return c.json({ success: true });
}));

// ===================== إضافة شاشة للسايدبار (إصلاح #1 الرئيسي) =====================
api.post('/businesses/:bizId/screens/:screenId/add-to-sidebar', bizAuthMiddleware(), safeHandler('إضافة شاشة للسايدبار', async (c) => {
  const bizId = c.get('bizId') as number;
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  
  // التحقق من وجود الشاشة
  const [screen] = await db.select().from(screenTemplates).where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));
  if (!screen) return c.json({ error: 'الشاشة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  
  const body = normalizeBody(await c.req.json());
  
  // إصلاح #1: التحقق من sectionId مع قيمة افتراضية
  let sectionId = body.sectionId || body.section_id;
  
  if (!sectionId) {
    // البحث عن قسم افتراضي أو إنشاء واحد
    const [defaultSection] = await db.select().from(sidebarSections)
      .where(and(eq(sidebarSections.businessId, bizId), eq(sidebarSections.name, 'شاشات مخصصة')));
    
    if (defaultSection) {
      sectionId = defaultSection.id;
    } else {
      // إنشاء قسم افتراضي
      const [newSection] = await db.insert(sidebarSections).values({
        businessId: bizId, name: 'شاشات مخصصة', icon: 'pi pi-desktop', sortOrder: 99,
      }).returning();
      sectionId = newSection.id;
    }
  } else {
    // التحقق من وجود القسم المحدد
    const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, sectionId));
    if (!section) return c.json({ error: 'القسم المحدد غير موجود' }, 404);
  }
  
  const [sidebarItem] = await db.insert(sidebarItems).values({
    sectionId,
    screenKey: `custom-screen-${screenId}`,
    label: body.label || screen.name,
    icon: body.icon || screen.icon || 'pi pi-file',
    route: body.route || `/screens/${screenId}`,
    sortOrder: body.sortOrder || 0,
    isActive: true,
  }).returning();
  
  // إضافة العنصر لجميع المستخدمين
  const configs = await db.select().from(userSidebarConfig).where(eq(userSidebarConfig.businessId, bizId));
  const userIds = [...new Set(configs.map(c => c.userId))];
  for (const userId of userIds) {
    await db.insert(userSidebarConfig).values({
      userId, businessId: bizId, sidebarItemId: sidebarItem.id,
      isVisible: true, customSortOrder: sidebarItem.sortOrder || 0,
    });
  }
  
  return c.json(sidebarItem, 201);
}));

// ===================== شاشات المستخدم =====================
api.get('/businesses/:bizId/users/:userId/screens', bizAuthMiddleware(), safeHandler('جلب شاشات المستخدم', async (c) => {
  const bizId = c.get('bizId') as number;
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);
  
  // جلب الشاشات التي لديه صلاحية عليها
  const perms = await db.select({
    screenId: screenPermissions.screenId, permission: screenPermissions.permission,
  }).from(screenPermissions).where(eq(screenPermissions.userId, userId));
  
  const permScreenIds = perms.map(p => p.screenId);
  
  // جلب كل شاشات العمل
  const allScreens = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId));
  
  // المستخدم يرى الشاشات التي لديه صلاحية عليها + الشاشات التي لا يوجد لها صلاحيات (عامة)
  const screensWithPerms = new Set(perms.map(p => p.screenId));
  const result = allScreens.filter(s => {
    if (permScreenIds.includes(s.id)) return true;
    if (!screensWithPerms.has(s.id)) return true; // شاشة بدون صلاحيات = عامة
    return false;
  });
  
  return c.json(result);
}));

// ===================== بيانات العناصر الحقيقية (Widget Data APIs) =====================

// جلب إحصائيات الشاشة المخصصة (KPIs)
api.get('/businesses/:bizId/widget-stats', bizAuthMiddleware(), safeHandler('جلب إحصائيات العناصر', async (c) => {
  const bizId = c.get('bizId') as number;
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // إجمالي التحصيل (receipt vouchers)
  const receiptResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'receipt' OR ot.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // إجمالي الصرف (payment vouchers)
  const paymentResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'payment' OR ot.category ILIKE '%صرف%' OR ot.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // عدد العمليات
  const opsResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries
    WHERE business_id = ${bizId}
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // صافي الرصيد (مجموع أرصدة الحسابات)
  const balanceResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(ab.balance AS NUMERIC)), 0) as total
    FROM account_balances ab
    INNER JOIN accounts a ON a.id = ab.account_id
    WHERE a.business_id = ${bizId}
  `);

  const receiptRows = Array.isArray(receiptResult) ? receiptResult : (receiptResult as any).rows || [];
  const paymentRows = Array.isArray(paymentResult) ? paymentResult : (paymentResult as any).rows || [];
  const opsRows = Array.isArray(opsResult) ? opsResult : (opsResult as any).rows || [];
  const balanceRows = Array.isArray(balanceResult) ? balanceResult : (balanceResult as any).rows || [];

  return c.json({
    totalReceipts: Number((receiptRows[0] as any)?.total || 0),
    totalPayments: Number((paymentRows[0] as any)?.total || 0),
    operationsCount: Number((opsRows[0] as any)?.total || 0),
    netBalance: Number((balanceRows[0] as any)?.total || 0),
  });
}));

// جلب سجل العمليات الحقيقي
api.get('/businesses/:bizId/widget-log', bizAuthMiddleware(), safeHandler('جلب سجل العمليات للعنصر', async (c) => {
  const bizId = c.get('bizId') as number;
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const limitParam = c.req.query('limit') || '50';
  const offsetParam = c.req.query('offset') || '0';

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${parseInt(opTypeId)}`;

  const rows = await db.execute(sql`
    SELECT
      je.id,
      je.entry_number,
      je.description,
      je.entry_date,
      je.reference,
      je.total_debit,
      je.total_credit,
      je.status,
      je.created_at,
      ot.name as operation_type_name,
      ot.icon as operation_type_icon,
      ot.color as operation_type_color,
      ot.voucher_type,
      ot.category as operation_category
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
    ORDER BY je.created_at DESC
    LIMIT ${parseInt(limitParam)} OFFSET ${parseInt(offsetParam)}
  `);

  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries je WHERE ${conditions}
  `);
  const countRows = Array.isArray(countResult) ? countResult : (countResult as any).rows || [];

  const resultRows = Array.isArray(rows) ? rows : (rows as any).rows || [];
  return c.json({
    entries: resultRows,
    total: Number((countRows[0] as any)?.total || 0),
  });
}));

// جلب بيانات مراقبة الحسابات (أرصدة حقيقية + آخر حركات)
api.get('/businesses/:bizId/widget-accounts', bizAuthMiddleware(), safeHandler('جلب بيانات مراقبة الحسابات', async (c) => {
  const bizId = c.get('bizId') as number;
  const accountIdsParam = c.req.query('accountIds');

  let accountFilter = sql`a.business_id = ${bizId}`;
  if (accountIdsParam) {
    const ids = accountIdsParam.split(',').map(Number).filter((n: number) => !isNaN(n));
    if (ids.length > 0) {
      accountFilter = sql`a.business_id = ${bizId} AND a.id IN (${sql.join(ids.map((id: number) => sql`${id}`), sql`, `)})`;
    }
  }

  const rows = await db.execute(sql`
    SELECT
      a.id,
      a.name,
      a.account_type,
      a.is_active,
      COALESCE((
        SELECT SUM(CAST(ab.balance AS NUMERIC))
        FROM account_balances ab WHERE ab.account_id = a.id
      ), 0) as total_balance,
      (
        SELECT json_agg(bal_row) FROM (
          SELECT ab.id, ab.currency_id, ab.balance, c.code as currency_code, c.symbol as currency_symbol
          FROM account_balances ab
          LEFT JOIN currencies c ON c.id = ab.currency_id
          WHERE ab.account_id = a.id
        ) bal_row
      ) as balances,
      (
        SELECT json_agg(last_mov) FROM (
          SELECT jel.id, jel.line_type, jel.amount, jel.description, je.entry_date, je.entry_number
          FROM journal_entry_lines jel
          INNER JOIN journal_entries je ON je.id = jel.journal_entry_id
          WHERE jel.account_id = a.id
          ORDER BY je.created_at DESC
          LIMIT 5
        ) last_mov
      ) as last_movements
    FROM accounts a
    WHERE ${accountFilter}
    ORDER BY a.name
  `);

  const resultRows = Array.isArray(rows) ? rows : (rows as any).rows || [];
  return c.json(resultRows);
}));

// جلب بيانات الرسم البياني (حركات شهرية)
api.get('/businesses/:bizId/widget-chart', bizAuthMiddleware(), safeHandler('جلب بيانات الرسم البياني', async (c) => {
  const bizId = c.get('bizId') as number;
  const months = parseInt(c.req.query('months') || '6');
  const chartType = c.req.query('type') || 'monthly'; // monthly | daily

  const rows = await db.execute(sql`
    SELECT
      TO_CHAR(je.entry_date, 'YYYY-MM') as period,
      TO_CHAR(je.entry_date, 'Mon') as period_label,
      EXTRACT(MONTH FROM je.entry_date) as month_num,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR ot.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR ot.category ILIKE '%صرف%' OR ot.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month' * ${months})
    GROUP BY TO_CHAR(je.entry_date, 'YYYY-MM'), TO_CHAR(je.entry_date, 'Mon'), EXTRACT(MONTH FROM je.entry_date)
    ORDER BY period
  `);

  const resultRows = Array.isArray(rows) ? rows : (rows as any).rows || [];

  const arabicMonths: Record<number, string> = {
    1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل', 5: 'مايو', 6: 'يونيو',
    7: 'يوليو', 8: 'أغسطس', 9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر',
  };

  return c.json({
    labels: (resultRows as any[]).map((r: any) => arabicMonths[Number(r.month_num)] || r.period_label),
    receipts: (resultRows as any[]).map((r: any) => Number(r.receipts)),
    payments: (resultRows as any[]).map((r: any) => Number(r.payments)),
    operationsCounts: (resultRows as any[]).map((r: any) => Number(r.operations_count)),
  });
}));

// حفظ/جلب ملاحظات العنصر
api.get('/widgets/:widgetId/notes', safeHandler('جلب ملاحظات العنصر', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'عنصر غير موجود' }, 404);
  return c.json({ text: (widget.config as any)?.text || '' });
}));

api.put('/widgets/:widgetId/notes', safeHandler('حفظ ملاحظات العنصر', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'عنصر غير موجود' }, 404);
  const newConfig = { ...(widget.config as any || {}), text: body.text || '' };
  const [updated] = await db.update(screenWidgets).set({ config: newConfig, updatedAt: new Date() }).where(eq(screenWidgets.id, widgetId)).returning();
  return c.json(updated);
}));

// جلب قوالب العمليات مع تفاصيلها لعنصر القوالب
api.get('/businesses/:bizId/widget-operation-types', bizAuthMiddleware(), safeHandler('جلب قوالب العمليات للعنصر', async (c) => {
  const bizId = c.get('bizId') as number;
  const idsParam = c.req.query('ids');

  let rows: any[] = [];
  if (idsParam) {
    const ids = idsParam.split(',').map(Number).filter((n: number) => !isNaN(n));
    if (ids.length > 0) {
      rows = await db.select().from(operationTypes)
        .where(and(eq(operationTypes.businessId, bizId), inArray(operationTypes.id, ids)))
        .orderBy(operationTypes.sortOrder);
    } else {
      rows = [];
    }
  } else {
    rows = await db.select().from(operationTypes)
      .where(and(eq(operationTypes.businessId, bizId), eq(operationTypes.isActive, true)))
      .orderBy(operationTypes.sortOrder);
  }

  // جلب الحسابات المرتبطة بكل نوع عملية
  const opTypeIds = rows.map(r => r.id);
  let opAccounts: any[] = [];
  if (opTypeIds.length > 0) {
    opAccounts = await db.select({
      id: operationTypeAccounts.id,
      operationTypeId: operationTypeAccounts.operationTypeId,
      accountId: operationTypeAccounts.accountId,
      label: operationTypeAccounts.label,
      permission: operationTypeAccounts.permission,
      accountName: accounts.name,
      accountType: accounts.accountType,
    }).from(operationTypeAccounts)
      .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
      .where(inArray(operationTypeAccounts.operationTypeId, opTypeIds));
  }

  const accMap: Record<number, any[]> = {};
  for (const a of opAccounts) {
    if (!accMap[a.operationTypeId]) accMap[a.operationTypeId] = [];
    accMap[a.operationTypeId].push(a);
  }

  return c.json(rows.map(r => ({ ...r, accounts: accMap[r.id] || [] })));
}));

export default api;
