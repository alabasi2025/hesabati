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
  users,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import {
  accountSchema, voucherSchema, employeeSchema, operationTypeSchema,
  journalEntrySchema, typeSchema, validateBody,
} from '../middleware/validation.ts';

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
api.get('/businesses', async (c) => {
  // إصلاح #8: N+1 - استخدام استعلام واحد مجمع بدلاً من استعلامات متعددة
  const rows = await db.select().from(businesses).orderBy(businesses.sortOrder);
  
  // جلب جميع الإحصائيات دفعة واحدة
  const allPartners = await db.select({
    businessId: businessPartners.businessId,
  }).from(businessPartners);
  
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
  
  // db.execute يرجع مصفوفة مباشرة في postgres-js
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
  
  const partnerMap: Record<number, any[]> = {};
  for (const p of allPartners) {
    if (!partnerMap[p.businessId]) partnerMap[p.businessId] = [];
    partnerMap[p.businessId].push(p);
  }
  
  // جلب الشركاء مع التفاصيل
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
});

api.get('/businesses/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [biz] = await db.select().from(businesses).where(eq(businesses.id, id));
  if (!biz) return c.json({ error: 'عمل غير موجود' }, 404);
  const partners = await db.select().from(businessPartners).where(eq(businessPartners.businessId, id));
  return c.json({ ...biz, partners });
});

// ===================== المحطات =====================
// إصلاح #1: إضافة bizAuth middleware لجميع routes المحمية
api.get('/businesses/:bizId/stations', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(stations).where(eq(stations.businessId, bizId)).orderBy(stations.id);
  return c.json(rows);
});

api.get('/businesses/:bizId/stations/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [station] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!station) return c.json({ error: 'محطة غير موجودة' }, 404);
  const emps = await db.select().from(employees).where(eq(employees.stationId, id));
  const stationFunds = await db.select().from(funds).where(eq(funds.stationId, id));
  return c.json({ ...station, employees: emps, funds: stationFunds });
});

// إصلاح #2: إعادة هيكلة PUT/DELETE لتضمين bizId
api.put('/businesses/:bizId/stations/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  // التحقق من ملكية المحطة
  const [existing] = await db.select().from(stations).where(and(eq(stations.id, id), eq(stations.businessId, bizId)));
  if (!existing) return c.json({ error: 'محطة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  const body = await c.req.json();
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  return c.json(updated);
});

// Legacy route (backward compat) - redirects to new pattern
api.put('/stations/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(stations).set({ ...body, updatedAt: new Date() }).where(eq(stations.id, id)).returning();
  return c.json(updated);
});

// ===================== الموظفين =====================
api.get('/businesses/:bizId/employees', bizAuthMiddleware(), async (c) => {
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
});

api.post('/businesses/:bizId/employees', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  // إصلاح #7: Zod validation
  const validation = validateBody(employeeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(employees).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/businesses/:bizId/employees/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = await c.req.json();
  const [updated] = await db.update(employees).set({ ...body, updatedAt: new Date() }).where(eq(employees.id, id)).returning();
  return c.json(updated);
});

api.delete('/businesses/:bizId/employees/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(employees).where(and(eq(employees.id, id), eq(employees.businessId, bizId)));
  if (!existing) return c.json({ error: 'موظف غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(employees).where(eq(employees.id, id));
  return c.json({ success: true });
});

// Legacy routes for backward compatibility
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
api.get('/businesses/:bizId/employee-billing-accounts', bizAuthMiddleware(), async (c) => {
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
api.get('/businesses/:bizId/accounts', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const includeAll = c.req.query('all') === 'true'; // دمج الصناديق والفوترة

  // 1. جلب الحسابات من جدول accounts
  const accountRows = await db.select().from(accounts).where(eq(accounts.businessId, bizId)).orderBy(accounts.accountType, accounts.name);
  
  // جلب الأرصدة والروابط دفعة واحدة بدلاً من N+1
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

  // 2. جلب الصناديق من جدول funds وتحويلها لنفس الشكل
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

  // تحويل الصناديق لنفس شكل الحسابات
  const fundTypeLabels: Record<string, string> = {
    collection: 'تحصيل وتوريد', salary_advance: 'سلف', custody: 'عهدة',
    safe: 'خزنة', expense: 'مصروفات', deposit: 'إيداع', personal: 'شخصي',
  };
  const fundsAsAccounts = fundRows.map(f => ({
    id: f.id,
    name: f.name,
    accountType: 'fund',
    subType: f.fundType,
    subTypeLabel: fundTypeLabels[f.fundType] || f.fundType,
    provider: f.stationName || '',
    responsiblePerson: f.responsiblePerson || '',
    accountNumber: '',
    isActive: f.isActive,
    notes: f.notes,
    description: f.description,
    stationId: f.stationId,
    stationName: f.stationName,
    createdAt: f.createdAt,
    balances: fBalanceMap[f.id] || [],
    allowedLinks: [],
    _source: 'funds' as const,
  }));

  // 3. جلب حسابات الفوترة من جدول employee_billing_accounts
  const billingRows = await db.select({
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
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId);

  // خريطة ترجمة أنظمة الفوترة من enum إلى أسماء عربية
  const BILLING_SYSTEM_NAMES: Record<string, string> = {
    'moghrabi_v1': 'المغربي نسخة 1 (الدهمية)',
    'moghrabi_v2': 'المغربي نسخة 2 (الصبالية وجمال)',
    'moghrabi_v3': 'المغربي نسخة 3 (غليل)',
    'support_fund': 'صندوق الدعم',
    'support_fund_west': 'صندوق الدعم - الساحل الغربي',
    'prepaid': 'الدفع المسبق',
  };
  const COLLECTION_METHOD_NAMES: Record<string, string> = {
    'cash_mobile': 'تحصيل نقدي بالجوال',
    'manual_assign': 'تحصيل إسناد يدوي',
    'electronic': 'سداد إلكتروني',
    'haseb_deposit': 'إيداع حاسب',
  };
  const billingAsAccounts = billingRows.map(b => {
    const sysName = BILLING_SYSTEM_NAMES[b.billingSystem || ''] || b.billingSystem || '';
    const methodName = COLLECTION_METHOD_NAMES[b.collectionMethod || ''] || b.collectionMethod || '';
    return {
      id: b.id,
      name: b.label || `${sysName} - ${b.employeeName}`,
      accountType: 'billing',
      subType: sysName,
      subTypeLabel: sysName,
      provider: sysName,
      responsiblePerson: b.employeeName || '',
      accountNumber: '',
      isActive: b.isActive,
      notes: b.notes,
      stationId: b.stationId,
      stationName: b.stationName,
      collectionMethod: methodName,
      billingSystemKey: b.billingSystem || '',
      createdAt: null,
      balances: [],
      allowedLinks: [],
      _source: 'billing' as const,
    };
  });

  // 4. جلب المحطات لفلتر المحطة
  const stationRows = await db.select({ id: stations.id, name: stations.name })
    .from(stations).where(eq(stations.businessId, bizId)).orderBy(stations.name);

  return c.json({
    accounts: [...enrichedAccounts, ...fundsAsAccounts, ...billingAsAccounts],
    stations: stationRows,
  });
});

api.post('/businesses/:bizId/accounts', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  // إصلاح #7: Zod validation
  const validation = validateBody(accountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const { ...accountData } = validation.data as any;
  const allowedLinks = body.allowedLinks; // not in schema
  const [created] = await db.insert(accounts).values({ ...accountData, businessId: bizId }).returning();
  
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

api.put('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = await c.req.json();
  const { allowedLinks, ...accountData } = body;
  const [updated] = await db.update(accounts).set({ ...accountData, updatedAt: new Date() }).where(eq(accounts.id, id)).returning();
  
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

api.delete('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.toAccountId, id));
  await db.delete(accountBalances).where(eq(accountBalances.accountId, id));
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
});

// Legacy routes for backward compatibility
api.put('/accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
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

api.get('/accounts/:id/allowed-targets', async (c) => {
  const id = parseInt(c.req.param('id'));
  const type = c.req.query('type') || 'payment';
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
api.get('/businesses/:bizId/funds', bizAuthMiddleware(), async (c) => {
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
  let balances: any[] = [];
  if (fundIds.length > 0) {
    balances = await db.select({
      fundId: fundBalances.fundId, currencyId: fundBalances.currencyId,
      balance: fundBalances.balance, currencyCode: currencies.code, currencySymbol: currencies.symbol,
    }).from(fundBalances)
      .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
      .where(inArray(fundBalances.fundId, fundIds));
  }
  const balanceMap: Record<number, any[]> = {};
  for (const b of balances) { if (!balanceMap[b.fundId]) balanceMap[b.fundId] = []; balanceMap[b.fundId].push(b); }
  return c.json(rows.map(f => ({ ...f, balances: balanceMap[f.id] || [] })));
});

api.post('/businesses/:bizId/funds', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const [created] = await db.insert(funds).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/businesses/:bizId/funds/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(funds).where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
  if (!existing) return c.json({ error: 'صندوق غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = await c.req.json();
  const [updated] = await db.update(funds).set({ ...body, updatedAt: new Date() }).where(eq(funds.id, id)).returning();
  return c.json(updated);
});

api.delete('/businesses/:bizId/funds/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(funds).where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
  if (!existing) return c.json({ error: 'صندوق غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(funds).where(eq(funds.id, id));
  return c.json({ success: true });
});

// Legacy
api.put('/funds/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(funds).set({ ...body, updatedAt: new Date() }).where(eq(funds.id, id)).returning();
  return c.json(updated);
});

// ===================== السندات =====================
api.get('/businesses/:bizId/vouchers', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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
  
  // Enrich with account names - batch load
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

api.post('/businesses/:bizId/vouchers', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  
  // إصلاح #7: Zod validation
  const validation = validateBody(voucherSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  
  const prefix = body.voucherType === 'receipt' ? 'QBD' : body.voucherType === 'payment' ? 'SRF' : body.voucherType === 'journal' ? 'QYD' : 'TRN';
  const count = await db.select({ count: sql<number>`count(*)` }).from(vouchers).where(eq(vouchers.businessId, bizId));
  const num = (Number(count[0].count) || 0) + 1;
  const voucherNumber = `${prefix}-${String(num).padStart(5, '0')}`;
  
  // Clean body
  const cleanBody: any = {};
  for (const [k, v] of Object.entries(body)) {
    if (v !== undefined && v !== null && v !== '') {
      cleanBody[k] = v;
    }
  }
  if (cleanBody.voucherDate) {
    if (typeof cleanBody.voucherDate === 'string') {
      cleanBody.voucherDate = new Date(cleanBody.voucherDate + 'T00:00:00Z');
    }
  } else {
    cleanBody.voucherDate = new Date();
  }
  delete cleanBody.createdAt;
  delete cleanBody.updatedAt;
  if (cleanBody.amount && typeof cleanBody.amount === 'string') {
    cleanBody.amount = parseFloat(cleanBody.amount);
  }
  if (cleanBody.currencyId && typeof cleanBody.currencyId === 'string') {
    cleanBody.currencyId = parseInt(cleanBody.currencyId);
  }
  
  const [created] = await db.insert(vouchers).values({ ...cleanBody, businessId: bizId, voucherNumber }).returning();
  
  // إصلاح #6: تحديث الأرصدة بشكل صحيح
  const currencyId = cleanBody.currencyId || 1;
  const amount = parseFloat(cleanBody.amount || '0');
  
  const updateAccountBalance = async (accountId: number, delta: number) => {
    if (!accountId || delta === 0) return;
    const existing = await db.select().from(accountBalances)
      .where(and(eq(accountBalances.accountId, accountId), eq(accountBalances.currencyId, currencyId)));
    if (existing.length > 0) {
      await db.update(accountBalances)
        .set({ balance: sql`${accountBalances.balance} + ${delta}`, updatedAt: new Date() })
        .where(and(eq(accountBalances.accountId, accountId), eq(accountBalances.currencyId, currencyId)));
    } else {
      await db.insert(accountBalances).values({ accountId, currencyId, balance: String(delta) });
    }
  };
  
  // إصلاح #6: منطق الأرصدة الصحيح
  // سند قبض: المال يدخل (toAccount يزيد، fromAccount ينقص)
  // سند صرف: المال يخرج (fromAccount ينقص، toAccount يزيد)
  // تحويل: المال ينتقل (fromAccount ينقص، toAccount يزيد)
  if (created.voucherType === 'receipt') {
    if (created.toAccountId) await updateAccountBalance(created.toAccountId, amount);
    if (created.fromAccountId) await updateAccountBalance(created.fromAccountId, -amount);
  } else if (created.voucherType === 'payment') {
    if (created.fromAccountId) await updateAccountBalance(created.fromAccountId, -amount);
    if (created.toAccountId) await updateAccountBalance(created.toAccountId, amount);
  } else if (created.voucherType === 'transfer') {
    if (created.fromAccountId) await updateAccountBalance(created.fromAccountId, -amount);
    if (created.toAccountId) await updateAccountBalance(created.toAccountId, amount);
  }
  
  // إنشاء قيد محاسبي تلقائي
  if (created.fromAccountId && created.toAccountId && amount > 0) {
    const entryCount = await db.select({ count: sql<number>`count(*)` }).from(journalEntries);
    const entryNum = (Number(entryCount[0].count) || 0) + 1;
    const entryNumber = `QYD-${String(entryNum).padStart(5, '0')}`;
    
    const [entry] = await db.insert(journalEntries).values({
      businessId: bizId,
      entryNumber,
      description: created.description || `سند ${created.voucherType === 'receipt' ? 'قبض' : created.voucherType === 'payment' ? 'صرف' : 'تحويل'} - ${voucherNumber}`,
      entryDate: created.voucherDate ? new Date(created.voucherDate).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      totalDebit: String(amount),
      totalCredit: String(amount),
      isBalanced: true,
      reference: voucherNumber,
    }).returning();
    
    // إصلاح #6: قيود متوازنة - المدين = الدائن
    await db.insert(journalEntryLines).values({
      journalEntryId: entry.id,
      accountId: created.toAccountId,
      lineType: 'debit',
      amount: String(amount),
      description: `إلى حساب ${created.toAccountId}`,
      sortOrder: 0,
    });
    await db.insert(journalEntryLines).values({
      journalEntryId: entry.id,
      accountId: created.fromAccountId,
      lineType: 'credit',
      amount: String(amount),
      description: `من حساب ${created.fromAccountId}`,
      sortOrder: 1,
    });
  }
  
  return c.json(created, 201);
});

api.delete('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!existing) return c.json({ error: 'سند غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.update(vouchers).set({ status: 'cancelled', updatedAt: new Date() }).where(eq(vouchers.id, id));
  return c.json({ success: true });
});

// Legacy
api.delete('/vouchers/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.update(vouchers).set({ status: 'cancelled', updatedAt: new Date() }).where(eq(vouchers.id, id));
  return c.json({ success: true });
});

// ===================== التحصيل اليومي =====================
api.get('/businesses/:bizId/collections', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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

api.post('/businesses/:bizId/collections', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const { details, ...collectionData } = body;
  
  let total = 0;
  if (details) for (const d of details) total += parseFloat(d.amount || '0');
  
  const [created] = await db.insert(dailyCollections).values({
    ...collectionData,
    businessId: bizId,
    totalAmount: String(total),
  }).returning();
  
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
api.get('/businesses/:bizId/suppliers', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(suppliers).where(eq(suppliers.businessId, bizId)).orderBy(suppliers.id);
  return c.json(rows);
});

api.post('/businesses/:bizId/suppliers', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const [created] = await db.insert(suppliers).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

// ===================== المخازن =====================
api.get('/businesses/:bizId/warehouses', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(warehouses).where(eq(warehouses.businessId, bizId)).orderBy(warehouses.id);
  return c.json(rows);
});

// ===================== الحسابات المعلقة =====================
api.get('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(pendingAccounts).where(eq(pendingAccounts.businessId, bizId));
  return c.json(rows);
});

// ===================== تصنيفات السندات =====================
api.get('/businesses/:bizId/voucher-categories', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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
api.get('/businesses/:bizId/operation-types', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const category = c.req.query('category');
  const screen = c.req.query('screen');
  const conditions = [eq(operationTypes.businessId, bizId)];
  if (category) conditions.push(eq(operationTypes.category, category));
  if (screen) conditions.push(sql`${screen} = ANY(${operationTypes.screens})`);
  
  const rows = await db.select().from(operationTypes)
    .where(and(...conditions))
    .orderBy(operationTypes.sortOrder, operationTypes.name);
  
  // إصلاح #5: جلب linkedAccounts لجميع العمليات دفعة واحدة
  const otIds = rows.map(ot => ot.id);
  let allLinkedAccounts: any[] = [];
  if (otIds.length > 0) {
    allLinkedAccounts = await db.select({
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
      .where(inArray(operationTypeAccounts.operationTypeId, otIds))
      .orderBy(operationTypeAccounts.sortOrder);
  }
  
  const linkedMap: Record<number, any[]> = {};
  for (const la of allLinkedAccounts) {
    if (!linkedMap[la.operationTypeId]) linkedMap[la.operationTypeId] = [];
    linkedMap[la.operationTypeId].push(la);
  }
  
  return c.json(rows.map(ot => ({
    ...ot,
    linkedAccounts: linkedMap[ot.id] || [],
  })));
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

api.post('/businesses/:bizId/operation-types', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const { linkedAccounts, screens, ...rest } = body;
  const [created] = await db.insert(operationTypes).values({ ...rest, businessId: bizId, screens: screens && screens.length > 0 ? `{${screens.join(",")}}` : null }).returning();
  
  if (linkedAccounts && linkedAccounts.length > 0) {
    for (const la of linkedAccounts) {
      await db.insert(operationTypeAccounts).values({ ...la, operationTypeId: created.id });
    }
  }
  return c.json(created, 201);
});

api.put('/businesses/:bizId/operation-types/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!existing) return c.json({ error: 'نوع عملية غير موجود أو لا ينتمي لهذا العمل' }, 404);
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

api.delete('/businesses/:bizId/operation-types/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(operationTypes).where(and(eq(operationTypes.id, id), eq(operationTypes.businessId, bizId)));
  if (!existing) return c.json({ error: 'نوع عملية غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  await db.delete(operationTypes).where(eq(operationTypes.id, id));
  return c.json({ success: true });
});

// Legacy
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
api.get('/businesses/:bizId/journal-entries', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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
  
  // إصلاح N+1: جلب جميع الأسطر دفعة واحدة
  const entryIds = rows.map(e => e.id);
  let allLines: any[] = [];
  if (entryIds.length > 0) {
    allLines = await db.select({
      id: journalEntryLines.id,
      journalEntryId: journalEntryLines.journalEntryId,
      accountId: journalEntryLines.accountId,
      lineType: journalEntryLines.lineType,
      amount: journalEntryLines.amount,
      description: journalEntryLines.description,
      sortOrder: journalEntryLines.sortOrder,
      accountName: accounts.name,
      accountType: accounts.accountType,
    }).from(journalEntryLines)
      .leftJoin(accounts, eq(journalEntryLines.accountId, accounts.id))
      .where(inArray(journalEntryLines.journalEntryId, entryIds))
      .orderBy(journalEntryLines.sortOrder);
  }
  
  const lineMap: Record<number, any[]> = {};
  for (const l of allLines) {
    if (!lineMap[l.journalEntryId]) lineMap[l.journalEntryId] = [];
    lineMap[l.journalEntryId].push(l);
  }
  
  return c.json(rows.map(entry => ({ ...entry, lines: lineMap[entry.id] || [] })));
});

api.post('/businesses/:bizId/journal-entries', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  
  // إصلاح #7: Zod validation
  const validation = validateBody(journalEntrySchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  
  const { lines, ...entryData } = body;
  
  const count = await db.select({ count: sql<number>`count(*)` }).from(journalEntries);
  const num = (Number(count[0].count) || 0) + 1;
  const entryNumber = `QYD-${String(num).padStart(5, '0')}`;
  
  // إصلاح #6: حساب المجاميع بشكل صحيح
  const totalDebit = (lines || []).filter((l: any) => l.lineType === 'debit' || l.type === 'debit').reduce((s: number, l: any) => s + Number(l.amount), 0);
  const totalCredit = (lines || []).filter((l: any) => l.lineType === 'credit' || l.type === 'credit').reduce((s: number, l: any) => s + Number(l.amount), 0);
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;
  
  // إصلاح #6: رفض القيود غير المتوازنة
  if (!isBalanced) {
    return c.json({ error: `القيد غير متوازن: المدين (${totalDebit}) لا يساوي الدائن (${totalCredit})` }, 400);
  }
  
  const rawDate = entryData.date || entryData.entryDate;
  const entryDate = rawDate ? String(rawDate).split('T')[0] : new Date().toISOString().split('T')[0];
  
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

api.delete('/businesses/:bizId/journal-entries/:id', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const id = parseInt(c.req.param('id'));
  const [existing] = await db.select().from(journalEntries).where(and(eq(journalEntries.id, id), eq(journalEntries.businessId, bizId)));
  if (!existing) return c.json({ error: 'قيد غير موجود أو لا ينتمي لهذا العمل' }, 404);
  await db.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, id));
  await db.delete(journalEntries).where(eq(journalEntries.id, id));
  return c.json({ success: true });
});

// Legacy
api.delete('/journal-entries/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  await db.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, id));
  await db.delete(journalEntries).where(eq(journalEntries.id, id));
  return c.json({ success: true });
});

// ===================== إعدادات أنظمة الفوترة =====================
api.get('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(billingSystemsConfig)
    .where(eq(billingSystemsConfig.businessId, bizId))
    .orderBy(billingSystemsConfig.sortOrder);
  return c.json(rows);
});

api.post('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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
api.get("/businesses/:bizId/billing-account-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.businessId, bizId)).orderBy(billingAccountTypes.sortOrder);
  return c.json(rows);
});

api.post('/businesses/:bizId/billing-account-types', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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

// ===================== أنواع الصناديق =====================
api.get("/businesses/:bizId/fund-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(fundTypes).where(eq(fundTypes.businessId, bizId)).orderBy(fundTypes.sortOrder);
  return c.json(rows);
});

api.post("/businesses/:bizId/fund-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(fundTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put("/fund-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const [updated] = await db.update(fundTypes).set({ ...body, updatedAt: new Date() }).where(eq(fundTypes.id, id)).returning();
  return c.json(updated);
});

api.delete("/fund-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  await db.delete(fundTypes).where(eq(fundTypes.id, id));
  return c.json({ success: true });
});

// ===================== أنواع البنوك =====================
api.get("/businesses/:bizId/bank-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(bankTypes).where(eq(bankTypes.businessId, bizId)).orderBy(bankTypes.sortOrder);
  return c.json(rows);
});

api.post("/businesses/:bizId/bank-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(bankTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put("/bank-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const [updated] = await db.update(bankTypes).set({ ...body, updatedAt: new Date() }).where(eq(bankTypes.id, id)).returning();
  return c.json(updated);
});

api.delete("/bank-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  await db.delete(bankTypes).where(eq(bankTypes.id, id));
  return c.json({ success: true });
});

// ===================== أنواع الصرافين =====================
api.get("/businesses/:bizId/exchange-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(exchangeTypes).where(eq(exchangeTypes.businessId, bizId)).orderBy(exchangeTypes.sortOrder);
  return c.json(rows);
});

api.post("/businesses/:bizId/exchange-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(exchangeTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put("/exchange-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const [updated] = await db.update(exchangeTypes).set({ ...body, updatedAt: new Date() }).where(eq(exchangeTypes.id, id)).returning();
  return c.json(updated);
});

api.delete("/exchange-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  await db.delete(exchangeTypes).where(eq(exchangeTypes.id, id));
  return c.json({ success: true });
});

// ===================== أنواع المحافظ الإلكترونية =====================
api.get("/businesses/:bizId/e-wallet-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(eWalletTypes).where(eq(eWalletTypes.businessId, bizId)).orderBy(eWalletTypes.sortOrder);
  return c.json(rows);
});

api.post("/businesses/:bizId/e-wallet-types", bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(eWalletTypes).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put("/e-wallet-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const body = await c.req.json();
  const [updated] = await db.update(eWalletTypes).set({ ...body, updatedAt: new Date() }).where(eq(eWalletTypes.id, id)).returning();
  return c.json(updated);
});

api.delete("/e-wallet-types/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  await db.delete(eWalletTypes).where(eq(eWalletTypes.id, id));
  return c.json({ success: true });
});

// ===================== التبويب الجانبي - الأقسام =====================
api.get('/businesses/:bizId/sidebar-sections', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(sidebarSections).where(eq(sidebarSections.businessId, bizId)).orderBy(sidebarSections.sortOrder);
  return c.json(rows);
});

api.post('/businesses/:bizId/sidebar-sections', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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
  const items = await db.select().from(sidebarItems).where(eq(sidebarItems.sectionId, id));
  for (const item of items) {
    await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, item.id));
  }
  await db.delete(sidebarItems).where(eq(sidebarItems.sectionId, id));
  await db.delete(sidebarSections).where(eq(sidebarSections.id, id));
  return c.json({ success: true });
});

// ===================== التبويب الجانبي - العناصر =====================
api.get('/businesses/:bizId/sidebar-items', bizAuthMiddleware(), async (c) => {
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
});

api.post('/sidebar-items', async (c) => {
  const body = await c.req.json();
  const [created] = await db.insert(sidebarItems).values(body).returning();
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
api.get('/businesses/:bizId/users/:userId/sidebar', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
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

api.put('/businesses/:bizId/users/:userId/sidebar', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const userId = parseInt(c.req.param('userId'));
  const body = await c.req.json();
  
  if (body.items && Array.isArray(body.items)) {
    for (const item of body.items) {
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

// ===================== الشركاء CRUD =====================
api.get('/businesses/:bizId/partners', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(businessPartners).where(eq(businessPartners.businessId, bizId)).orderBy(businessPartners.id);
  return c.json(rows);
});

api.post('/businesses/:bizId/partners', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const [created] = await db.insert(businessPartners).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/partners/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const { businessId, ...updateData } = body;
  const [updated] = await db.update(businessPartners).set(updateData).where(eq(businessPartners.id, id)).returning();
  if (!updated) return c.json({ error: 'شريك غير موجود' }, 404);
  return c.json(updated);
});

api.delete('/partners/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [deleted] = await db.delete(businessPartners).where(eq(businessPartners.id, id)).returning();
  if (!deleted) return c.json({ error: 'شريك غير موجود' }, 404);
  return c.json({ success: true });
});

// ===================== الموردين CRUD =====================
api.put('/suppliers/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(suppliers).set({ ...body, updatedAt: new Date() }).where(eq(suppliers.id, id)).returning();
  if (!updated) return c.json({ error: 'مورد غير موجود' }, 404);
  return c.json(updated);
});

api.delete('/suppliers/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [deleted] = await db.delete(suppliers).where(eq(suppliers.id, id)).returning();
  if (!deleted) return c.json({ error: 'مورد غير موجود' }, 404);
  return c.json({ success: true });
});

// ===================== المخازن CRUD =====================
api.post('/businesses/:bizId/warehouses', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const [created] = await db.insert(warehouses).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/warehouses/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(warehouses).set({ ...body, updatedAt: new Date() }).where(eq(warehouses.id, id)).returning();
  if (!updated) return c.json({ error: 'مخزن غير موجود' }, 404);
  return c.json(updated);
});

api.delete('/warehouses/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [deleted] = await db.delete(warehouses).where(eq(warehouses.id, id)).returning();
  if (!deleted) return c.json({ error: 'مخزن غير موجود' }, 404);
  return c.json({ success: true });
});

// ===================== الحسابات المعلقة CRUD =====================
api.post('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const [created] = await db.insert(pendingAccounts).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
});

api.put('/pending-accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const [updated] = await db.update(pendingAccounts).set({ ...body, updatedAt: new Date() }).where(eq(pendingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب معلق غير موجود' }, 404);
  return c.json(updated);
});

api.delete('/pending-accounts/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [deleted] = await db.delete(pendingAccounts).where(eq(pendingAccounts.id, id)).returning();
  if (!deleted) return c.json({ error: 'حساب معلق غير موجود' }, 404);
  return c.json({ success: true });
});

// ===================== التصفيات CRUD =====================
api.get('/businesses/:bizId/settlements', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const rows = await db.select().from(reconciliations).where(eq(reconciliations.businessId, bizId)).orderBy(desc(reconciliations.createdAt));
  return c.json(rows);
});

api.post('/businesses/:bizId/settlements', bizAuthMiddleware(), async (c) => {
  const bizId = c.get('bizId') as number;
  const body = await c.req.json();
  const difference = body.expectedAmount && body.actualAmount ? String(Number(body.expectedAmount) - Number(body.actualAmount)) : null;
  const values: any = {
    businessId: bizId,
    title: body.title,
    reconciliationType: body.reconciliationType || body.type || 'manager',
    status: body.status || 'open',
    withPerson: body.withPerson || null,
    accountId: body.accountId || null,
    fundId: body.fundId || null,
    stationId: body.stationId || null,
    periodStart: body.periodStart || null,
    periodEnd: body.periodEnd || null,
    expectedAmount: body.expectedAmount || null,
    actualAmount: body.actualAmount || null,
    difference,
    notes: body.notes || null,
  };
  const [created] = await db.insert(reconciliations).values(values).returning();
  return c.json(created, 201);
});

api.put('/settlements/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const body = await c.req.json();
  const difference = body.expectedAmount && body.actualAmount ? String(Number(body.expectedAmount) - Number(body.actualAmount)) : null;
  const setValues: any = {
    title: body.title,
    reconciliationType: body.reconciliationType || body.type,
    status: body.status,
    withPerson: body.withPerson || null,
    accountId: body.accountId || null,
    fundId: body.fundId || null,
    stationId: body.stationId || null,
    periodStart: body.periodStart || null,
    periodEnd: body.periodEnd || null,
    expectedAmount: body.expectedAmount || null,
    actualAmount: body.actualAmount || null,
    difference,
    notes: body.notes || null,
    updatedAt: new Date(),
  };
  const [updated] = await db.update(reconciliations).set(setValues).where(eq(reconciliations.id, id)).returning();
  if (!updated) return c.json({ error: 'تصفية غير موجودة' }, 404);
  return c.json(updated);
});

api.delete('/settlements/:id', async (c) => {
  const id = parseInt(c.req.param('id'));
  const [deleted] = await db.delete(reconciliations).where(eq(reconciliations.id, id)).returning();
  if (!deleted) return c.json({ error: 'تصفية غير موجودة' }, 404);
  return c.json({ success: true });
});

export default api;
