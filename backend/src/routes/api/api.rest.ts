import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { wsService } from '../../services/websocket.service.ts';
import { eq, desc, sql, and, inArray, count } from 'drizzle-orm';
import {
  businessPartners, stations, employees, accounts, accountBalances,
  accountAllowedLinks, employeeBillingAccounts,
  funds, fundBalances, vouchers, voucherLines, currencies, suppliers,
  warehouses, pendingAccounts, reconciliations, attachments, inventoryItems,
  operationTypes, operationTypeAccounts,
  journalEntries, journalEntryLines,
  operationCategories,
  billingSystemsConfig, billingAccountTypes,
  sidebarSections, sidebarItems, userSidebarConfig,
  users, businesses,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
  customScreenConfig,
  auditLog,
  exchangeRates, roles, rolePermissions, userRoles,
  warehouseTypes, journalEntryCategories,
  warehouseOperations, warehouseOperationItems,
  expenseCategories, expenseBudget, salaryRecords,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import {
  accountSchema, voucherSchema, operationTypeSchema,
  typeSchema, validateBody,
  partnerSchema, supplierSchema, warehouseSchema,
  sidebarSectionSchema,
  settlementSchema, pendingAccountSchema, billingSystemConfigSchema,
  employeeBillingAccountSchema,
} from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, getBody, parseId, validateRequired, toErrorMessage } from '../../middleware/helpers.ts';
import { getNextSequence, getNextCategorySequence, getNextItemInCategorySequence, generateWarehouseOpFullSequence, generateJournalEntryFullSequence } from '../../middleware/sequencing.ts';
import { postTransaction, cancelTransaction, reverseTransaction } from '../../services/transaction.service.ts';
import { getAvailableTransitions, executeTransition, getWorkflowHistory, setupDefaultWorkflow, getOperationTypeTransitions, addTransition, deleteTransition } from '../../services/workflow.service.ts';
import { getPages, getPage, getPageById, createPage, updatePage, deletePage, addComponent, updateComponent, deleteComponent, getDataSources, createDataSource, updateDataSource, deleteDataSource, executeDataSource } from '../../services/ui-builder.service.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { processStockMovement, getStockLevels, getLowStockAlerts, getStockValuation, getItemMovementHistory } from '../../services/inventory.service.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { normalizeDbResult, getFirstRow } from './_shared/db-helpers.ts';
import { verifyAccountOwnership, requireResourceOwnership } from './_shared/ownership.ts';

const api = new Hono();

// ===================== حسابات الموظفين في أنظمة الفوترة =====================
api.get('/businesses/:bizId/employee-billing-accounts', bizAuthMiddleware(), safeHandler('جلب حسابات الفوترة', async (c) => {
  const bizId = getBizId(c);
  const stationId = c.req.query('stationId');
  const employeeId = c.req.query('employeeId');
  
  const rows = await db.select({
    id: employeeBillingAccounts.id,
    employeeId: employeeBillingAccounts.employeeId,
    stationId: employeeBillingAccounts.stationId,
    billingSystemId: employeeBillingAccounts.billingSystemId,
    billingSystemName: billingSystemsConfig.name,
    billingSystemKey: billingSystemsConfig.systemKey,
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
    .leftJoin(billingSystemsConfig, eq(employeeBillingAccounts.billingSystemId, billingSystemsConfig.id))
    .where(eq(employees.businessId, bizId))
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId, employeeBillingAccounts.sortOrder);
  
  let filtered = rows;
  if (stationId) filtered = filtered.filter(r => r.stationId === Number.parseInt(stationId));
  if (employeeId) filtered = filtered.filter(r => r.employeeId === Number.parseInt(employeeId));
  return c.json(filtered);
}));

api.post('/employee-billing-accounts', safeHandler('إضافة حساب فوترة', async (c) => {
  const body = await getBody(c);
  const validation = validateBody(employeeBillingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const employeeId = validation.data?.employeeId;
  if (!employeeId) return c.json({ error: 'معرّف الموظف مطلوب' }, 400);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  const [created] = await db.insert(employeeBillingAccounts).values(validation.data as any).returning();
  return c.json(created, 201);
}));

api.put('/employee-billing-accounts/:id', safeHandler('تعديل حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف حساب الفوترة غير صالح' }, 400);
  const [rec] = await db.select({ employeeId: employeeBillingAccounts.employeeId }).from(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  if (!rec) return c.json({ error: 'حساب فوترة غير موجود' }, 404);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, rec.employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(employeeBillingAccounts).set(body).where(eq(employeeBillingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب فوترة غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/employee-billing-accounts/:id', safeHandler('حذف حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف حساب الفوترة غير صالح' }, 400);
  const [rec] = await db.select({ employeeId: employeeBillingAccounts.employeeId }).from(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  if (!rec) return c.json({ error: 'حساب فوترة غير موجود' }, 404);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, rec.employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  await db.delete(employeeBillingAccounts).where(eq(employeeBillingAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== الحسابات مع الصلاحيات =====================
api.get('/businesses/:bizId/accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات', async (c) => {
  const bizId = getBizId(c);
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
  for (const b of balances) {
    if (!balanceMap[b.accountId]) balanceMap[b.accountId] = [];
    balanceMap[b.accountId].push(b);
  }
  
  const linkMap: Record<number, any[]> = {};
  for (const l of allLinks) {
    if (!linkMap[l.fromAccountId]) linkMap[l.fromAccountId] = [];
    linkMap[l.fromAccountId].push(l);
  }
  
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
  for (const b of fBalances) {
    if (!fBalanceMap[b.fundId]) fBalanceMap[b.fundId] = [];
    fBalanceMap[b.fundId].push(b);
  }

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
    stationId: employeeBillingAccounts.stationId, billingSystemId: employeeBillingAccounts.billingSystemId,
    billingSystemName: billingSystemsConfig.name, billingSystemKey: billingSystemsConfig.systemKey,
    collectionMethod: employeeBillingAccounts.collectionMethod, label: employeeBillingAccounts.label,
    sortOrder: employeeBillingAccounts.sortOrder, isActive: employeeBillingAccounts.isActive,
    notes: employeeBillingAccounts.notes, employeeName: employees.fullName, stationName: stations.name,
  }).from(employeeBillingAccounts)
    .leftJoin(employees, eq(employeeBillingAccounts.employeeId, employees.id))
    .leftJoin(stations, eq(employeeBillingAccounts.stationId, stations.id))
    .leftJoin(billingSystemsConfig, eq(employeeBillingAccounts.billingSystemId, billingSystemsConfig.id))
    .where(eq(employees.businessId, bizId))
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId);

  const COLLECTION_METHOD_NAMES: Record<string, string> = {
    'cash_mobile': 'تحصيل نقدي بالجوال', 'manual_assign': 'تحصيل إسناد يدوي',
    'electronic': 'سداد إلكتروني', 'haseb_deposit': 'إيداع حاسب',
  };
  const billingAsAccounts = billingRows.map(b => {
    const sysName = b.billingSystemName || '';
    const methodName = COLLECTION_METHOD_NAMES[b.collectionMethod || ''] || b.collectionMethod || '';
    return {
      id: b.id, name: b.label || `${sysName} - ${b.employeeName}`, accountType: 'billing',
      subType: sysName, subTypeLabel: sysName, provider: sysName,
      responsiblePerson: b.employeeName || '', accountNumber: '', isActive: b.isActive,
      notes: b.notes, stationId: b.stationId, stationName: b.stationName,
      collectionMethod: methodName, billingSystemKey: b.billingSystemKey || '',
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

api.post('/businesses/:bizId/accounts', bizAuthMiddleware(), checkPermission('accounts', 'create'), safeHandler('إضافة حساب', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(accountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const { ...accountData } = validation.data as any;
  const allowedLinks = body.allowedLinks;
  
  // ترقيم تلقائي داخل التصنيف
  if (accountData.subTypeId) {
    // تحديد نوع الخزينة للترقيم
    const treasuryTypeMap: Record<string, 'bank' | 'exchange' | 'e_wallet'> = {
      bank: 'bank', e_wallet: 'e_wallet', exchange: 'exchange',
    };
    const treasuryType = treasuryTypeMap[accountData.accountType] || 'bank';
    const { sequenceNumber, code } = await getNextItemInCategorySequence(bizId, treasuryType, accountData.subTypeId);
    accountData.sequenceNumber = sequenceNumber;
    accountData.code = code;
  }
  
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
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = await getBody(c);
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

api.delete('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), checkPermission('accounts', 'delete'), safeHandler('حذف حساب', async (c) => {
  const bizId = getBizId(c);
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
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const body = await getBody(c);
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
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.fromAccountId, id));
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.toAccountId, id));
  await db.delete(accountBalances).where(eq(accountBalances.accountId, id));
  await db.delete(accounts).where(eq(accounts.id, id));
  return c.json({ success: true });
}));

// ===================== جلب سجل واحد =====================
api.get('/accounts/:id', safeHandler('جلب حساب بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const balRows = await db.select().from(accountBalances).where(eq(accountBalances.accountId, id));
  return c.json({ ...account!, balances: balRows });
}));

api.get('/warehouses/:id', safeHandler('جلب مخزن بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  const [warehouse] = await db.select().from(warehouses).where(eq(warehouses.id, id));
  const err = await requireResourceOwnership(c, warehouse ?? null);
  if (err) return err;
  return c.json(warehouse!);
}));

api.get('/funds/:id', safeHandler('جلب صندوق بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [fund] = await db.select().from(funds).where(eq(funds.id, id));
  const err = await requireResourceOwnership(c, fund ?? null);
  if (err) return err;
  const balRows = await db.select().from(fundBalances).where(eq(fundBalances.fundId, id));
  return c.json({ ...fund!, balances: balRows });
}));

// ===================== ربط الحسابات المسموحة =====================
api.get('/accounts/:id/allowed-links', safeHandler('جلب روابط الحسابات', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
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
  const body = await getBody(c);
  const reqErr = validateRequired(body, [
    { name: 'fromAccountId', label: 'حساب المصدر' },
    { name: 'toAccountId', label: 'حساب الهدف' },
    { name: 'linkType', label: 'نوع الرابط' },
  ]);
  if (reqErr) return c.json({ error: reqErr }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, body.fromAccountId));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const [created] = await db.insert(accountAllowedLinks).values(body).returning();
  return c.json(created, 201);
}));

api.delete('/account-links/:id', safeHandler('حذف رابط حساب', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الرابط غير صالح' }, 400);
  const [link] = await db.select().from(accountAllowedLinks).where(eq(accountAllowedLinks.id, id));
  if (!link) return c.json({ error: 'رابط غير موجود' }, 404);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, link.fromAccountId));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  await db.delete(accountAllowedLinks).where(eq(accountAllowedLinks.id, id));
  return c.json({ success: true });
}));

api.get('/accounts/:id/allowed-targets', safeHandler('جلب الحسابات المسموحة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const type = c.req.query('type') || 'payment';
  const links = await db.select({
    toAccountId: accountAllowedLinks.toAccountId, toAccountName: accounts.name, toAccountType: accounts.accountType,
  }).from(accountAllowedLinks)
    .leftJoin(accounts, eq(accountAllowedLinks.toAccountId, accounts.id))
    .where(and(eq(accountAllowedLinks.fromAccountId, id), eq(accountAllowedLinks.linkType, type)));
  return c.json(links);
}));


// ===================== السندات =====================
api.get('/businesses/:bizId/vouchers', bizAuthMiddleware(), safeHandler('جلب السندات', async (c) => {
  const bizId = getBizId(c);
  const typeFilter = c.req.query('type');
  const conditions = [eq(vouchers.businessId, bizId)];
  if (typeFilter) conditions.push(eq(vouchers.voucherType, typeFilter));
  const rows = await db.select().from(vouchers).where(and(...conditions)).orderBy(desc(vouchers.createdAt));
  return c.json(rows);
}));

api.post('/businesses/:bizId/vouchers', bizAuthMiddleware(), checkPermission('vouchers', 'create'), safeHandler('إضافة سند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);
  const validation = validateBody(voucherSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  
  const voucherData = validation.data as any;
  const amount = typeof voucherData.amount === 'string' ? Number.parseFloat(voucherData.amount) : voucherData.amount;
  if (Number.isNaN(amount) || amount <= 0) return c.json({ error: 'المبلغ يجب أن يكون رقماً موجباً' }, 400);

  // تحويل voucherDate من string إلى Date
  if (voucherData.voucherDate && typeof voucherData.voucherDate === 'string') {
    voucherData.voucherDate = new Date(voucherData.voucherDate);
  }

  // === جلب بيانات نوع العملية إن وجد ===
  let opType: Record<string, unknown> | null = null;
  if (voucherData.operationTypeId) {
    const otRows = await db.execute(sql`SELECT * FROM operation_types WHERE id = ${voucherData.operationTypeId} AND business_id = ${bizId}`);
    opType = getFirstRow<Record<string, unknown>>(otRows) ?? null;
    if (!opType) return c.json({ error: 'نوع العملية غير موجود' }, 404);
    if (opType.is_active === false) return c.json({ error: 'نوع العملية غير مفعّل' }, 400);
  }

  // === تحديد الحسابات (مدين / دائن) ===
  const debitAccountId = voucherData.toAccountId;
  const creditAccountId = voucherData.fromAccountId || (opType?.source_account_id) || null;
  if (!debitAccountId) return c.json({ error: 'الحساب المستهدف (toAccountId) مطلوب' }, 400);

  // === التحقق من ملكية الحسابات ===
  if (debitAccountId && !(await verifyAccountOwnership(debitAccountId, bizId))) {
    return c.json({ error: 'الحساب المستهدف لا ينتمي لهذا العمل' }, 403);
  }
  if (creditAccountId && !(await verifyAccountOwnership(creditAccountId, bizId))) {
    return c.json({ error: 'الحساب المصدر لا ينتمي لهذا العمل' }, 403);
  }

  // === منع التحويل بين الخزائن (safe-to-safe) ===
  if (voucherData.voucherType === 'transfer' || (opType?.voucher_type === 'transfer')) {
    // التحقق من نوع الصناديق المرتبطة
    let fromFundType: string | null = null;
    let toFundType: string | null = null;
    if (voucherData.fromFundId) {
      const fromFundResult = await db.execute(sql`SELECT fund_type FROM funds WHERE id = ${voucherData.fromFundId} AND business_id = ${bizId}`);
      const fromRow = getFirstRow<{ fund_type: string }>(fromFundResult);
      fromFundType = fromRow?.fund_type ?? null;
    }
    if (voucherData.toFundId) {
      const toFundResult = await db.execute(sql`SELECT fund_type FROM funds WHERE id = ${voucherData.toFundId} AND business_id = ${bizId}`);
      const toRow = getFirstRow<{ fund_type: string }>(toFundResult);
      toFundType = toRow?.fund_type ?? null;
    }
    
    if (fromFundType === 'safe' && toFundType === 'safe') {
      return c.json({ error: '\u0644\u0627 \u064a\u0645\u0643\u0646 \u0627\u0644\u062a\u062d\u0648\u064a\u0644 \u0628\u064a\u0646 \u062e\u0632\u0627\u0626\u0646 (safe). \u0627\u0633\u062a\u062e\u062f\u0645 \u0639\u0645\u0644\u064a\u0629 \u0633\u062d\u0628/\u0625\u064a\u062f\u0627\u0639 \u0628\u062f\u0644\u0627\u064b \u0645\u0646 \u0630\u0644\u0643' }, 400);
    }
  }

  // === التحقق من الرصيد الكافي عند الصرف (payment) ===
  const currencyId = voucherData.currencyId || 1;
  const vType = opType?.voucher_type || voucherData.voucherType || 'receipt';
  if (vType === 'payment' && debitAccountId) {
    await db.execute(sql`
      SELECT balance FROM account_balances WHERE account_id = ${debitAccountId} AND currency_id = ${currencyId}
    `);
    // لا نمنع الصرف إذا كان الحساب المصدر (contra) - فقط نحذر
  }

  // === تنفيذ العملية عبر محرك المعاملات المركزي ===
  try {
    const result = await postTransaction(bizId, userId ?? 0, {
      voucherType: vType,
      amount,
      currencyId,
      debitAccountId,
      creditAccountId,
      toFundId: voucherData.toFundId || null,
      fromFundId: voucherData.fromFundId || (opType?.source_fund_id as number | undefined) || null,
      stationId: voucherData.stationId || null,
      employeeId: voucherData.employeeId || null,
      supplierId: voucherData.supplierId || null,
      operationTypeId: voucherData.operationTypeId || null,
      operationTypeName: (opType?.name as string | undefined) ?? null,
      description: voucherData.description || (opType?.name as string | undefined) || '',
      reference: voucherData.reference || null,
      voucherDate: voucherData.voucherDate || null,
      voucherNumber: voucherData.voucherNumber || null,
    });
    // إشعار WebSocket بالعملية الجديدة
    try { wsService.notifyNewVoucher(bizId, result.voucher); } catch { /* optional: skip if notify fails */ }
    return c.json(result.voucher, 201);
  } catch (err: unknown) {
    return c.json({ error: toErrorMessage(err) || 'فشل في تنفيذ المعاملة' }, 400);
  }
}));

// ===================== سند متعدد الأسطر =====================
api.post('/businesses/:bizId/vouchers/multi-line', bizAuthMiddleware(), checkPermission('vouchers', 'create'), safeHandler('إنشاء سند متعدد الأسطر', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);

  const { lines, ...voucherData } = body;

  if (!Array.isArray(lines) || lines.length < 1) {
    return c.json({ error: 'يجب تحديد سطر واحد على الأقل' }, 400);
  }

  if (!voucherData.fromAccountId) {
    return c.json({ error: 'الحساب المصدر (fromAccountId) مطلوب' }, 400);
  }

  const currencyId = voucherData.currencyId || 1;
  const sourceAccountId = voucherData.fromAccountId;

  if (!(await verifyAccountOwnership(sourceAccountId, bizId))) {
    return c.json({ error: 'الحساب المصدر لا ينتمي لهذا العمل' }, 403);
  }

  let totalAmount = 0;
  for (const line of lines) {
    const amt = typeof line.amount === 'string' ? parseFloat(line.amount) : line.amount;
    if (isNaN(amt) || amt <= 0) {
      return c.json({ error: 'جميع المبالغ يجب أن تكون أرقاماً موجبة' }, 400);
    }
    totalAmount += amt;
    if (!(await verifyAccountOwnership(line.accountId, bizId))) {
      return c.json({ error: `الحساب ${line.accountId} لا ينتمي لهذا العمل` }, 403);
    }
  }

  const result = await db.transaction(async (tx) => {
    const voucherType = voucherData.voucherType || 'payment';
    const seqYear = new Date().getFullYear();
    const counterType = `voucher_${voucherType}`;
    const seqNum = await getNextSequence(bizId, counterType, 0, seqYear, tx);
    
    const prefix = voucherType === 'receipt' ? 'RCV' : voucherType === 'payment' ? 'PAY' : voucherType === 'transfer' ? 'TRF' : 'VCH';
    const voucherNumber = voucherData.voucherNumber || `${prefix}-${seqYear}-${String(seqNum).padStart(5, '0')}`;

    const [createdVoucher] = await tx.insert(vouchers).values({
      businessId: bizId,
      voucherType: voucherType as any,
      voucherNumber,
      amount: String(totalAmount),
      currencyId,
      fromAccountId: sourceAccountId,
      toAccountId: lines[0].accountId,
      description: voucherData.description || 'سند متعدد الأسطر',
      reference: voucherData.reference || null,
      voucherDate: voucherData.voucherDate ? new Date(voucherData.voucherDate) : new Date(),
      status: 'confirmed',
      hasMultipleLines: true,
      createdBy: userId,
    }).returning();

    const linesToInsert = lines.map((line: any, idx: number) => ({
      voucherId: createdVoucher.id,
      accountId: line.accountId,
      amount: String(line.amount),
      description: line.description || null,
      currencyId: line.currencyId || currencyId,
      exchangeRate: line.exchangeRate ? String(line.exchangeRate) : null,
      sortOrder: idx,
    }));

    await tx.insert(voucherLines).values(linesToInsert);

    for (const line of lines) {
      const amt = typeof line.amount === 'string' ? parseFloat(line.amount) : line.amount;
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${sourceAccountId}, ${currencyId}, ${-amt})
        ON CONFLICT (account_id, currency_id)
        DO UPDATE SET balance = account_balances.balance - ${amt}, updated_at = NOW()
      `);
      await tx.execute(sql`
        INSERT INTO account_balances (account_id, currency_id, balance)
        VALUES (${line.accountId}, ${currencyId}, ${amt})
        ON CONFLICT (account_id, currency_id)
        DO UPDATE SET balance = account_balances.balance + ${amt}, updated_at = NOW()
      `);
    }

    await tx.insert(auditLog).values({
      businessId: bizId,
      userId: userId ?? 0,
      action: 'create_multi_line_voucher',
      tableName: 'vouchers',
      recordId: createdVoucher.id,
      newData: { ...createdVoucher, lines: linesToInsert },
    });

    return createdVoucher;
  });

  try { wsService.notifyNewVoucher(bizId, result); } catch { /* optional */ }
  return c.json(result, 201);
}));

// جلب تفاصيل سند متعدد الأسطر
api.get('/businesses/:bizId/vouchers/:id/lines', bizAuthMiddleware(), safeHandler('جلب أسطر السند', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);

  const [voucher] = await db.select().from(vouchers).where(and(eq(vouchers.id, id), eq(vouchers.businessId, bizId)));
  if (!voucher) return c.json({ error: 'السند غير موجود' }, 404);

  if (!voucher.hasMultipleLines) {
    return c.json({ lines: [], message: 'هذا السند ليس متعدد الأسطر' });
  }

  const lines = await db
    .select({
      id: voucherLines.id,
      accountId: voucherLines.accountId,
      accountName: accounts.name,
      amount: voucherLines.amount,
      description: voucherLines.description,
      currencyId: voucherLines.currencyId,
      exchangeRate: voucherLines.exchangeRate,
      sortOrder: voucherLines.sortOrder,
    })
    .from(voucherLines)
    .leftJoin(accounts, eq(voucherLines.accountId, accounts.id))
    .where(eq(voucherLines.voucherId, id))
    .orderBy(voucherLines.sortOrder);

  return c.json({ voucher, lines });
}));

api.delete('/businesses/:bizId/vouchers/:id', bizAuthMiddleware(), checkPermission('vouchers', 'delete'), safeHandler('حذف سند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  try {
    const result = await cancelTransaction(bizId, userId ?? 0, id);
    return c.json(result);
  } catch (err: unknown) {
    const message = toErrorMessage(err);
    const status = message.includes('غير موجود') ? 404 : 400;
    return c.json({ error: message }, status);
  }
}));

// Legacy
api.delete('/vouchers/:id', safeHandler('حذف سند (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const [existing] = await db.select().from(vouchers).where(eq(vouchers.id, id));
  const err = await requireResourceOwnership(c, existing ?? null);
  if (err) return err;
  try {
    const result = await cancelTransaction(existing!.businessId, getUserId(c) ?? 0, id);
    return c.json(result);
  } catch (err: unknown) {
    const message = toErrorMessage(err);
    return c.json({ error: message }, 400);
  }
}));

// ===================== الشركاء =====================
api.get('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('جلب الشركاء', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(businessPartners).where(eq(businessPartners.businessId, bizId));
  return c.json(rows);
}));

api.post('/businesses/:bizId/partners', bizAuthMiddleware(), safeHandler('إضافة شريك', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(partnerSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(businessPartners).values({ ...validation.data as any, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/partners/:id', safeHandler('تعديل شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  const [partner] = await db.select().from(businessPartners).where(eq(businessPartners.id, id));
  const err = await requireResourceOwnership(c, partner ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(businessPartners).set({ ...body, updatedAt: new Date() }).where(eq(businessPartners.id, id)).returning();
  if (!updated) return c.json({ error: 'شريك غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/partners/:id', safeHandler('حذف شريك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشريك غير صالح' }, 400);
  const [partner] = await db.select().from(businessPartners).where(eq(businessPartners.id, id));
  const err = await requireResourceOwnership(c, partner ?? null);
  if (err) return err;
  await db.delete(businessPartners).where(eq(businessPartners.id, id));
  return c.json({ success: true });
}));

// ===================== الموردين =====================
api.get('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('جلب الموردين', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(suppliers).where(eq(suppliers.businessId, bizId)).orderBy(suppliers.id);
  return c.json(rows);
}));

api.post('/businesses/:bizId/suppliers', bizAuthMiddleware(), safeHandler('إضافة مورد', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(supplierSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(suppliers).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/suppliers/:id', safeHandler('تعديل مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
  const err = await requireResourceOwnership(c, supplier ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(suppliers).set({ ...body, updatedAt: new Date() }).where(eq(suppliers.id, id)).returning();
  if (!updated) return c.json({ error: 'مورد غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/suppliers/:id', safeHandler('حذف مورد', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المورد غير صالح' }, 400);
  const [supplier] = await db.select().from(suppliers).where(eq(suppliers.id, id));
  const err = await requireResourceOwnership(c, supplier ?? null);
  if (err) return err;
  await db.delete(suppliers).where(eq(suppliers.id, id));
  return c.json({ success: true });
}));

// ===================== المخازن =====================
api.get('/businesses/:bizId/warehouses', bizAuthMiddleware(), safeHandler('جلب المخازن', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(warehouses).where(eq(warehouses.businessId, bizId)).orderBy(warehouses.id);
  return c.json(rows);
}));

api.post('/businesses/:bizId/warehouses', bizAuthMiddleware(), safeHandler('إضافة مخزن', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(warehouseSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as any;
  
  // ترقيم تلقائي داخل التصنيف
  const subTypeRaw = data.subType ?? data.subTypeId;
  if (subTypeRaw) {
    const subTypeId = Number.parseInt(String(subTypeRaw));
    if (!Number.isNaN(subTypeId)) {
      data.subTypeId = subTypeId;
      const { sequenceNumber, code } = await getNextItemInCategorySequence(bizId, 'warehouse', subTypeId);
      data.sequenceNumber = sequenceNumber;
      data.code = code;
    }
  }
  
  const [created] = await db.insert(warehouses).values({ ...data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/warehouses/:id', safeHandler('تعديل مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  const [warehouse] = await db.select().from(warehouses).where(eq(warehouses.id, id));
  const err = await requireResourceOwnership(c, warehouse ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(warehouses).set({ ...body, updatedAt: new Date() }).where(eq(warehouses.id, id)).returning();
  if (!updated) return c.json({ error: 'مخزن غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/warehouses/:id', safeHandler('حذف مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);
  const [warehouse] = await db.select().from(warehouses).where(eq(warehouses.id, id));
  const err = await requireResourceOwnership(c, warehouse ?? null);
  if (err) return err;
  await db.delete(warehouses).where(eq(warehouses.id, id));
  return c.json({ success: true });
}));

// ===================== الحسابات المعلقة =====================
api.get('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات المعلقة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(pendingAccounts).where(eq(pendingAccounts.businessId, bizId));
  return c.json(rows);
}));

api.post('/businesses/:bizId/pending-accounts', bizAuthMiddleware(), safeHandler('إضافة حساب معلق', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(pendingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(pendingAccounts).values({ ...validation.data as any, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/pending-accounts/:id', safeHandler('تعديل حساب معلق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب المعلق غير صالح' }, 400);
  const [pending] = await db.select().from(pendingAccounts).where(eq(pendingAccounts.id, id));
  const err = await requireResourceOwnership(c, pending ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(pendingAccounts).set({ ...body, updatedAt: new Date() }).where(eq(pendingAccounts.id, id)).returning();
  if (!updated) return c.json({ error: 'حساب معلق غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/pending-accounts/:id', safeHandler('حذف حساب معلق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب المعلق غير صالح' }, 400);
  const [pending] = await db.select().from(pendingAccounts).where(eq(pendingAccounts.id, id));
  const err = await requireResourceOwnership(c, pending ?? null);
  if (err) return err;
  await db.delete(pendingAccounts).where(eq(pendingAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== التصفيات =====================
api.get('/businesses/:bizId/settlements', bizAuthMiddleware(), safeHandler('جلب التصفيات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(reconciliations).where(eq(reconciliations.businessId, bizId)).orderBy(desc(reconciliations.createdAt));
  return c.json(rows);
}));

api.post('/businesses/:bizId/settlements', bizAuthMiddleware(), safeHandler('إضافة تصفية', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
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
  const [rec] = await db.select().from(reconciliations).where(eq(reconciliations.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(reconciliations).set({ ...body, updatedAt: new Date() }).where(eq(reconciliations.id, id)).returning();
  if (!updated) return c.json({ error: 'تصفية غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/settlements/:id', safeHandler('حذف تصفية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصفية غير صالح' }, 400);
  const [rec] = await db.select().from(reconciliations).where(eq(reconciliations.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(reconciliations).where(eq(reconciliations.id, id));
  return c.json({ success: true });
}));

// ===================== تصنيفات المصروفات (الوحدة 13) =====================
api.get('/businesses/:bizId/expense-categories', bizAuthMiddleware(), safeHandler('جلب تصنيفات المصروفات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(expenseCategories).where(eq(expenseCategories.businessId, bizId)).orderBy(expenseCategories.sortOrder, expenseCategories.name);
  return c.json(rows);
}));
api.post('/businesses/:bizId/expense-categories', bizAuthMiddleware(), safeHandler('إضافة تصنيف مصروفات', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const [created] = await db.insert(expenseCategories).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
}));
api.put('/expense-categories/:id', safeHandler('تعديل تصنيف مصروفات', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseCategories).where(eq(expenseCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(expenseCategories).set({ ...body, updatedAt: new Date() }).where(eq(expenseCategories.id, id)).returning();
  if (!updated) return c.json({ error: 'تصنيف غير موجود' }, 404);
  return c.json(updated);
}));
api.delete('/expense-categories/:id', safeHandler('حذف تصنيف مصروفات', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseCategories).where(eq(expenseCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(expenseCategories).where(eq(expenseCategories.id, id));
  return c.json({ success: true });
}));

// ===================== ميزانية المصروفات (الوحدة 13) =====================
api.get('/businesses/:bizId/expense-budget', bizAuthMiddleware(), safeHandler('جلب ميزانية المصروفات', async (c) => {
  const bizId = getBizId(c);
  const month = c.req.query('month');
  const year = c.req.query('year');
  const rows = await db.select().from(expenseBudget).where(eq(expenseBudget.businessId, bizId)).orderBy(desc(expenseBudget.createdAt));
  let result = rows;
  if (month) result = result.filter((r: any) => r.month === Number.parseInt(month));
  if (year) result = result.filter((r: any) => r.year === Number.parseInt(year));
  return c.json(result);
}));
api.post('/businesses/:bizId/expense-budget', bizAuthMiddleware(), safeHandler('إضافة بند ميزانية', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const [created] = await db.insert(expenseBudget).values({
    businessId: bizId,
    name: body.name,
    stationId: body.stationId || null,
    amount: String(body.amount ?? 0),
    currencyId: body.currencyId ?? 1,
    expenseType: body.expenseType || 'variable',
    month: body.month ?? null,
    year: body.year ?? null,
    notes: body.notes ?? null,
  }).returning();
  return c.json(created, 201);
}));
api.put('/expense-budget/:id', safeHandler('تعديل بند ميزانية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseBudget).where(eq(expenseBudget.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(expenseBudget).set({
    name: body.name,
    stationId: body.stationId ?? null,
    amount: body.amount == null ? undefined : String(body.amount),
    currencyId: body.currencyId,
    expenseType: body.expenseType,
    month: body.month ?? null,
    year: body.year ?? null,
    notes: body.notes ?? null,
  }).where(eq(expenseBudget.id, id)).returning();
  if (updated) return c.json(updated);
  return c.json({ error: 'بند غير موجود' }, 404);
}));
api.delete('/expense-budget/:id', safeHandler('حذف بند ميزانية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(expenseBudget).where(eq(expenseBudget.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(expenseBudget).where(eq(expenseBudget.id, id));
  return c.json({ success: true });
}));

// ===================== سجلات الرواتب (الوحدة 13) =====================
api.get('/businesses/:bizId/salaries', bizAuthMiddleware(), safeHandler('جلب سجلات الرواتب', async (c) => {
  const bizId = getBizId(c);
  const month = c.req.query('month');
  const year = c.req.query('year');
  const rows = await db.select({
    id: salaryRecords.id, businessId: salaryRecords.businessId, employeeId: salaryRecords.employeeId,
    month: salaryRecords.month, year: salaryRecords.year, baseSalary: salaryRecords.baseSalary,
    advance: salaryRecords.advance, deductions: salaryRecords.deductions, netSalary: salaryRecords.netSalary,
    currencyId: salaryRecords.currencyId, isPaid: salaryRecords.isPaid, paidDate: salaryRecords.paidDate,
    attendanceDays: salaryRecords.attendanceDays, notes: salaryRecords.notes, createdAt: salaryRecords.createdAt,
    employeeName: employees.fullName,
  }).from(salaryRecords)
    .leftJoin(employees, eq(salaryRecords.employeeId, employees.id))
    .where(eq(salaryRecords.businessId, bizId))
    .orderBy(desc(salaryRecords.year), desc(salaryRecords.month), employees.fullName);
  let result = rows;
  if (month) result = result.filter((r: any) => r.month === Number.parseInt(month));
  if (year) result = result.filter((r: any) => r.year === Number.parseInt(year));
  return c.json(result);
}));
api.post('/businesses/:bizId/salaries', bizAuthMiddleware(), safeHandler('إضافة سجل راتب', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const baseSalary = Number(body.baseSalary ?? 0);
  const advance = Number(body.advance ?? 0);
  const deductions = Number(body.deductions ?? 0);
  const netSalary = baseSalary - advance - deductions;
  const [created] = await db.insert(salaryRecords).values({
    businessId: bizId,
    employeeId: body.employeeId,
    month: body.month,
    year: body.year,
    baseSalary: String(baseSalary),
    advance: String(advance),
    deductions: String(deductions),
    netSalary: String(netSalary),
    currencyId: body.currencyId ?? 1,
    isPaid: body.isPaid ?? false,
    attendanceDays: body.attendanceDays ?? null,
    notes: body.notes ?? null,
  }).returning();
  return c.json(created, 201);
}));
api.put('/salaries/:id', safeHandler('تعديل سجل راتب', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(salaryRecords).where(eq(salaryRecords.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const baseSalary = Number(body.baseSalary ?? 0);
  const advance = Number(body.advance ?? 0);
  const deductions = Number(body.deductions ?? 0);
  const netSalary = baseSalary - advance - deductions;
  const [updated] = await db.update(salaryRecords).set({
    baseSalary: String(baseSalary),
    advance: String(advance),
    deductions: String(deductions),
    netSalary: String(netSalary),
    isPaid: body.isPaid ?? undefined,
    paidDate: body.paidDate ?? undefined,
    attendanceDays: body.attendanceDays ?? undefined,
    notes: body.notes ?? undefined,
  }).where(eq(salaryRecords.id, id)).returning();
  if (!updated) return c.json({ error: 'سجل غير موجود' }, 404);
  return c.json(updated);
}));
api.delete('/salaries/:id', safeHandler('حذف سجل راتب', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [rec] = await db.select().from(salaryRecords).where(eq(salaryRecords.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(salaryRecords).where(eq(salaryRecords.id, id));
  return c.json({ success: true });
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
// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/stations بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
api.get('/stations', safeHandler('جلب المحطات (legacy)', async (c) => {
  const rows = await db.select().from(stations).orderBy(stations.id);
  return c.json(rows);
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/employees بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
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

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/accounts بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
api.get('/accounts', safeHandler('جلب الحسابات (legacy)', async (c) => {
  const rows = await db.select().from(accounts).orderBy(accounts.accountType, accounts.name);
  return c.json(rows);
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/funds بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
api.get('/funds', safeHandler('جلب الصناديق (legacy)', async (c) => {
  const rows = await db.select().from(funds).orderBy(funds.fundType, funds.name);
  return c.json(rows);
}));

// ⚠️ DEPRECATED: يجب استخدام /businesses/:bizId/suppliers بدلاً من هذا المسار - يسرب بيانات جميع الأعمال
api.get('/suppliers', safeHandler('جلب الموردين (legacy)', async (c) => {
  const rows = await db.select().from(suppliers).orderBy(suppliers.id);
  return c.json(rows);
}));


// ===================== أنواع العمليات (القوالب) =====================
api.get('/businesses/:bizId/operation-types', bizAuthMiddleware(), safeHandler('جلب أنواع العمليات', async (c) => {
  const bizId = getBizId(c);
  const categoryParam = c.req.query('category');
  const categoryId = categoryParam ? Number.parseInt(categoryParam, 10) : null;
  const screen = c.req.query('screen');
  const conditions = [eq(operationTypes.businessId, bizId)];
  if (categoryId != null && !Number.isNaN(categoryId)) conditions.push(eq(operationTypes.categoryId, categoryId));
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
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  const linkedAccounts = await db.select({
    id: operationTypeAccounts.id, accountId: operationTypeAccounts.accountId,
    employeeBillingAccountId: operationTypeAccounts.employeeBillingAccountId,
    label: operationTypeAccounts.label, permission: operationTypeAccounts.permission,
    sortOrder: operationTypeAccounts.sortOrder, isActive: operationTypeAccounts.isActive,
    accountName: accounts.name, accountType: accounts.accountType,
  }).from(operationTypeAccounts)
    .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
    .where(eq(operationTypeAccounts.operationTypeId, id));
  return c.json({ ...ot!, linkedAccounts });
}));

api.post('/businesses/:bizId/operation-types', bizAuthMiddleware(), safeHandler('إضافة نوع عملية', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(operationTypeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = validation.data as any;
  // تحويل screens من string إلى array إذا لزم
  if (typeof data.screens === 'string') data.screens = [data.screens];
  const { linkedAccounts: laList, ...otData } = data;
  // === ترقيم تلقائي للقالب داخل تصنيفه ===
  const catId = otData.categoryId ?? null;
  const [seqResult] = await db.select({ cnt: count() }).from(operationTypes)
    .where(and(eq(operationTypes.businessId, bizId), ...(catId != null ? [eq(operationTypes.categoryId, catId)] : [])));
  const seqNum = (seqResult?.cnt || 0) + 1;
  const categoryPrefix = catId != null ? String(catId).padStart(3, '0') : 'GEN';
  const autoCode = `${categoryPrefix}-${String(seqNum).padStart(3, '0')}`;
  const [created] = await db.insert(operationTypes).values({ ...otData, businessId: bizId, sequenceNumber: seqNum, code: otData.code || autoCode }).returning();
  // حفظ الحسابات المرتبطة إن وُجدت
  if (Array.isArray(laList) && laList.length > 0) {
    await db.insert(operationTypeAccounts).values(
      laList.map((la: any, i: number) => {
        const accId = typeof la === 'number' ? la : (la.accountId || la.id);
        return {
          operationTypeId: created.id,
          accountId: accId,
          label: typeof la === 'object' ? (la.label || null) : null,
          permission: typeof la === 'object' ? (la.permission || 'both') : 'both',
          sortOrder: typeof la === 'object' ? (la.sortOrder ?? i) : i,
        };
      })
    );
  }
  return c.json(created, 201);
}));

api.put('/operation-types/:id', safeHandler('تعديل نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, id));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  const body = await getBody(c);
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
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, id));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.operationTypeId, id));
  await db.delete(operationTypes).where(eq(operationTypes.id, id));
  return c.json({ success: true });
}));

api.post('/operation-types/:otId/accounts', safeHandler('ربط حساب بنوع عملية', async (c) => {
  const otId = parseId(c.req.param('otId'));
  if (!otId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, otId));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  const body = await getBody(c);
  if (!body.accountId && !body.employeeBillingAccountId) {
    return c.json({ error: 'يجب تحديد حساب أو حساب فوترة' }, 400);
  }
  const [created] = await db.insert(operationTypeAccounts).values({ ...body, operationTypeId: otId }).returning();
  return c.json(created, 201);
}));

api.delete('/operation-type-accounts/:id', safeHandler('فك ربط حساب من نوع عملية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الربط غير صالح' }, 400);
  const [ota] = await db.select().from(operationTypeAccounts).where(eq(operationTypeAccounts.id, id));
  if (!ota) return c.json({ error: 'ربط غير موجود' }, 404);
  const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, ota.operationTypeId));
  const err = await requireResourceOwnership(c, ot ?? null);
  if (err) return err;
  await db.delete(operationTypeAccounts).where(eq(operationTypeAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== القيود المحاسبية =====================
api.get('/businesses/:bizId/journal-entries', bizAuthMiddleware(), safeHandler('جلب القيود المحاسبية', async (c) => {
  const bizId = getBizId(c);
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

api.post('/businesses/:bizId/journal-entries', bizAuthMiddleware(), checkPermission('vouchers', 'create'), safeHandler('إضافة قيد محاسبي', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  
  const { lines, ...entryData } = body;
  if (!lines || !Array.isArray(lines) || lines.length < 2) {
    return c.json({ error: 'القيد يجب أن يحتوي على سطرين على الأقل (مدين ودائن)' }, 400);
  }
  // === بند 3.1: operationTypeId إلزامي ===
  if (!entryData.operationTypeId) {
    return c.json({ error: '\u0645\u0639\u0631\u0651\u0641 \u0646\u0648\u0639 \u0627\u0644\u0639\u0645\u0644\u064a\u0629 (\u0627\u0644\u0642\u0627\u0644\u0628) \u0645\u0637\u0644\u0648\u0628 - operationTypeId' }, 400);
  }
  
  const entryDate = entryData.entryDate || entryData.date || new Date().toISOString().split('T')[0];
  
  // حساب المجاميع والتوازن قبل الإدخال
  let totalDebit = 0;
  let totalCredit = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.accountId) return c.json({ error: `السطر ${i + 1}: معرّف الحساب مطلوب` }, 400);
    if (!line.amount || Number.parseFloat(String(line.amount)) <= 0) return c.json({ error: `السطر ${i + 1}: المبلغ مطلوب ويجب أن يكون أكبر من صفر` }, 400);
    const lineType = line.lineType || line.type;
    if (!lineType || !['debit', 'credit'].includes(lineType)) return c.json({ error: `السطر ${i + 1}: نوع السطر يجب أن يكون debit أو credit` }, 400);
    const amt = Number.parseFloat(String(line.amount));
    if (lineType === 'debit') totalDebit += amt;
    else totalCredit += amt;
  }
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

  // ترقيم ذكي للقيد
  const year = new Date().getFullYear();
  let journalFullSeqNum: string | null = null;
  let journalCategorySeq: string | null = null;
  let journalTemplateSeq: string | null = null;
  let entryNumber = entryData.reference || '';

  // جلب معلومات القالب للترقيم
  if (entryData.operationTypeId) {
    const [opType] = await db.select().from(operationTypes).where(eq(operationTypes.id, entryData.operationTypeId));
    if (opType) {
      // جلب مفتاح التصنيف من operation_categories
      let catKey = 'general';
      if (opType.categoryId) {
        const [opCat] = await db.select({ categoryKey: operationCategories.categoryKey }).from(operationCategories).where(eq(operationCategories.id, opType.categoryId));
        if (opCat?.categoryKey) catKey = opCat.categoryKey;
      }
      const [jeCat] = await db.select().from(journalEntryCategories)
        .where(and(eq(journalEntryCategories.businessId, bizId), eq(journalEntryCategories.categoryKey, catKey)));
      let catSeqNum = 1;
      if (jeCat?.sequenceNumber) catSeqNum = jeCat.sequenceNumber;

      const jeSeqResult = await generateJournalEntryFullSequence(
        bizId, catSeqNum, entryData.operationTypeId, year
      );
      journalFullSeqNum = jeSeqResult.fullSequenceNumber;
      entryNumber = entryNumber || journalFullSeqNum;
      journalCategorySeq = String(catSeqNum);
      journalTemplateSeq = String(jeSeqResult.sequentialNumber);
    }
  }

  // fallback إذا لم يتوفر ترقيم
  if (!entryNumber) {
    const fallbackSeq = await getNextSequence(bizId, 'journal_entry', 0, year);
    entryNumber = `JE-${year}-${String(fallbackSeq).padStart(4, '0')}`;
    journalFullSeqNum = entryNumber;
  }

  const [entry] = await db.insert(journalEntries).values({
    businessId: bizId,
    entryNumber,
    entryDate,
    description: entryData.description || '',
    reference: entryData.reference || null,
    operationTypeId: entryData.operationTypeId || null,
    totalDebit: String(totalDebit),
    totalCredit: String(totalCredit),
    isBalanced,
    createdBy: getUserId(c),
    fullSequenceNumber: journalFullSeqNum,
    categorySequence: journalCategorySeq,
    templateSequence: journalTemplateSeq,
  }).returning();
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineType = line.lineType || line.type;
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
  const [entry] = await db.select().from(journalEntries).where(eq(journalEntries.id, id));
  const err = await requireResourceOwnership(c, entry ?? null);
  if (err) return err;
  await db.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, id));
  await db.delete(journalEntries).where(eq(journalEntries.id, id));
  return c.json({ success: true });
}));


// ===================== إعدادات أنظمة الفوترة =====================
api.get('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('جلب إعدادات أنظمة الفوترة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(billingSystemsConfig)
    .where(eq(billingSystemsConfig.businessId, bizId))
    .orderBy(billingSystemsConfig.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/billing-systems-config', bizAuthMiddleware(), safeHandler('إضافة إعداد نظام فوترة', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(billingSystemConfigSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const data = { ...validation.data, businessId: bizId } as Record<string, unknown>;
  if (!data.systemKey || String(data.systemKey).trim() === '') {
    data.systemKey = (data.name as string).replace(/\s+/g, '_').toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 100) || `system_${Date.now()}`;
  }
  const [created] = await db.insert(billingSystemsConfig).values(data as any).returning();
  return c.json(created, 201);
}));

api.put('/billing-systems-config/:id', safeHandler('تعديل إعداد نظام فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
  const [rec] = await db.select().from(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(billingSystemsConfig).set({ ...body, updatedAt: new Date() }).where(eq(billingSystemsConfig.id, id)).returning();
  if (!updated) return c.json({ error: 'إعداد غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/billing-systems-config/:id', safeHandler('حذف إعداد نظام فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الإعداد غير صالح' }, 400);
  const [rec] = await db.select().from(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(billingSystemsConfig).where(eq(billingSystemsConfig.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع حسابات الفوترة =====================
api.get('/businesses/:bizId/billing-account-types', bizAuthMiddleware(), safeHandler('جلب أنواع حسابات الفوترة', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.businessId, bizId)).orderBy(billingAccountTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/billing-account-types', bizAuthMiddleware(), safeHandler('إضافة نوع حساب فوترة', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  if (!body.name) return c.json({ error: 'اسم النوع مطلوب' }, 400);
  const [created] = await db.insert(billingAccountTypes).values({ ...body, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/billing-account-types/:id', safeHandler('تعديل نوع حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(billingAccountTypes).set(body).where(eq(billingAccountTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/billing-account-types/:id', safeHandler('حذف نوع حساب فوترة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(billingAccountTypes).where(eq(billingAccountTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع الصناديق =====================
api.get('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('جلب أنواع الصناديق', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(fundTypes).where(eq(fundTypes.businessId, bizId)).orderBy(fundTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('إضافة نوع صندوق', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'fund');
  const [created] = await db.insert(fundTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/fund-types/:id', safeHandler('تعديل نوع صندوق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(fundTypes).where(eq(fundTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(fundTypes).set({ ...body, updatedAt: new Date() }).where(eq(fundTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/fund-types/:id', safeHandler('حذف نوع صندوق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(fundTypes).where(eq(fundTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(fundTypes).where(eq(fundTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع البنوك =====================
api.get('/businesses/:bizId/bank-types', bizAuthMiddleware(), safeHandler('جلب أنواع البنوك', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(bankTypes).where(eq(bankTypes.businessId, bizId)).orderBy(bankTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/bank-types', bizAuthMiddleware(), safeHandler('إضافة نوع بنك', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'bank');
  const [created] = await db.insert(bankTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/bank-types/:id', safeHandler('تعديل نوع بنك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(bankTypes).where(eq(bankTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(bankTypes).set({ ...body, updatedAt: new Date() }).where(eq(bankTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/bank-types/:id', safeHandler('حذف نوع بنك', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(bankTypes).where(eq(bankTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(bankTypes).where(eq(bankTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع الصرافين =====================
api.get('/businesses/:bizId/exchange-types', bizAuthMiddleware(), safeHandler('جلب أنواع الصرافين', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(exchangeTypes).where(eq(exchangeTypes.businessId, bizId)).orderBy(exchangeTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/exchange-types', bizAuthMiddleware(), safeHandler('إضافة نوع صراف', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'exchange');
  const [created] = await db.insert(exchangeTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/exchange-types/:id', safeHandler('تعديل نوع صراف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(exchangeTypes).where(eq(exchangeTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(exchangeTypes).set({ ...body, updatedAt: new Date() }).where(eq(exchangeTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/exchange-types/:id', safeHandler('حذف نوع صراف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(exchangeTypes).where(eq(exchangeTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(exchangeTypes).where(eq(exchangeTypes.id, id));
  return c.json({ success: true });
}));

// ===================== أنواع المحافظ الإلكترونية =====================
api.get('/businesses/:bizId/e-wallet-types', bizAuthMiddleware(), safeHandler('جلب أنواع المحافظ', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(eWalletTypes).where(eq(eWalletTypes.businessId, bizId)).orderBy(eWalletTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/e-wallet-types', bizAuthMiddleware(), safeHandler('إضافة نوع محفظة', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'e_wallet');
  const [created] = await db.insert(eWalletTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/e-wallet-types/:id', safeHandler('تعديل نوع محفظة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(eWalletTypes).where(eq(eWalletTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(eWalletTypes).set({ ...body, updatedAt: new Date() }).where(eq(eWalletTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'نوع غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/e-wallet-types/:id', safeHandler('حذف نوع محفظة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(eWalletTypes).where(eq(eWalletTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(eWalletTypes).where(eq(eWalletTypes.id, id));
  return c.json({ success: true });
}));

// ===================== التبويب الجانبي - الأقسام =====================
api.get('/businesses/:bizId/sidebar-sections', bizAuthMiddleware(), safeHandler('جلب أقسام السايدبار', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(sidebarSections).where(eq(sidebarSections.businessId, bizId)).orderBy(sidebarSections.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/sidebar-sections', bizAuthMiddleware(), safeHandler('إضافة قسم سايدبار', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(sidebarSectionSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const [created] = await db.insert(sidebarSections).values({ ...validation.data, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/sidebar-sections/:id', safeHandler('تعديل قسم سايدبار', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف القسم غير صالح' }, 400);
  const [rec] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(sidebarSections).set({ ...body, updatedAt: new Date() }).where(eq(sidebarSections.id, id)).returning();
  if (!updated) return c.json({ error: 'قسم غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/sidebar-sections/:id', safeHandler('حذف قسم سايدبار', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف القسم غير صالح' }, 400);
  const [rec] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
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
  const bizId = getBizId(c);
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
  const body = await getBody(c);
  
  // إصلاح #1: التحقق من sectionId (حقل إلزامي)
  if (!body.sectionId) {
    return c.json({ error: 'معرّف القسم (sectionId) مطلوب - يجب تحديد القسم الذي سيُضاف إليه العنصر' }, 400);
  }
  if (!body.screenKey) return c.json({ error: 'مفتاح الشاشة (screenKey) مطلوب' }, 400);
  if (!body.label) return c.json({ error: 'التسمية (label) مطلوبة' }, 400);
  if (!body.icon) return c.json({ error: 'الأيقونة (icon) مطلوبة' }, 400);
  if (!body.route) return c.json({ error: 'المسار (route) مطلوب' }, 400);
  
  // التحقق من وجود القسم وملكيته
  const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, body.sectionId));
  if (!section) return c.json({ error: 'القسم المحدد غير موجود' }, 404);
  const sectionErr = await requireResourceOwnership(c, section);
  if (sectionErr) return sectionErr;
  
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
  // التحقق من الملكية عبر القسم الأب
  const [item] = await db.select().from(sidebarItems).where(eq(sidebarItems.id, id));
  if (!item) return c.json({ error: 'عنصر غير موجود' }, 404);
  const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, item.sectionId));
  const err = await requireResourceOwnership(c, section ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(sidebarItems).set(body).where(eq(sidebarItems.id, id)).returning();
  if (!updated) return c.json({ error: 'عنصر غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/sidebar-items/:id', safeHandler('حذف عنصر سايدبار', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  // التحقق من الملكية عبر القسم الأب
  const [item] = await db.select().from(sidebarItems).where(eq(sidebarItems.id, id));
  if (!item) return c.json({ error: 'عنصر غير موجود' }, 404);
  const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, item.sectionId));
  const err = await requireResourceOwnership(c, section ?? null);
  if (err) return err;
  await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, id));
  await db.delete(sidebarItems).where(eq(sidebarItems.id, id));
  return c.json({ success: true });
}));


// ===================== إعدادات السايدبار للمستخدم =====================
api.get('/businesses/:bizId/users/:userId/sidebar', bizAuthMiddleware(), safeHandler('جلب سايدبار المستخدم', async (c) => {
  const bizId = getBizId(c);
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

  // === فلتر العناصر الوهمية: استبعاد عناصر الشاشات المخصصة المحذوفة ===
  const existingScreens = await db.select({ id: screenTemplates.id }).from(screenTemplates)
    .where(eq(screenTemplates.businessId, bizId));
  const existingScreenIds = new Set(existingScreens.map(s => s.id));
  
  let filteredConfigs = configs.filter((cfg: any) => {
    if (!cfg.screenKey?.startsWith('custom-screen-')) return true;
    const screenId = Number.parseInt(cfg.screenKey.replace('custom-screen-', ''));
    return !Number.isNaN(screenId) && existingScreenIds.has(screenId);
  });

  // === ملخص الأعمال: يظهر فقط لأعمال شخصية (حسابات المالك وأعماله الخاصة) ===
  const [bizRow] = await db.select({ type: businesses.type }).from(businesses).where(eq(businesses.id, bizId)).limit(1);
  let bizType: 'personal' | 'single_station' | 'stations' = 'stations';
  if (bizRow?.type === 'personal') bizType = 'personal';
  else if (bizRow?.type === 'single_station') bizType = 'single_station';
  if (bizType !== 'personal') {
    filteredConfigs = filteredConfigs.filter((cfg: any) => cfg.screenKey !== 'summary');
  }

  return c.json(filteredConfigs);
}));

api.put('/businesses/:bizId/users/:userId/sidebar', bizAuthMiddleware(), safeHandler('تحديث سايدبار المستخدم', async (c) => {
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);
  const body = await getBody(c);
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
  // تقييد: فقط المدير يمكنه جلب قائمة المستخدمين
  const user = c.get('user') as { userId: number; role: string } | undefined;
  if (!user || user.role !== 'admin') return c.json({ error: 'غير مصرح - فقط المدير' }, 403);
  const rows = await db.select({
    id: users.id, username: users.username, fullName: users.fullName,
    role: users.role, isActive: users.isActive,
  }).from(users).orderBy(users.id);
  return c.json(rows);
}));

// ===================== الشاشات المخصصة =====================
api.get('/businesses/:bizId/screens', bizAuthMiddleware(), safeHandler('جلب الشاشات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId)).orderBy(screenTemplates.name);
  return c.json(rows);
}));

api.post('/businesses/:bizId/screens', bizAuthMiddleware(), safeHandler('إضافة شاشة', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  
  if (!body.name) return c.json({ error: 'اسم الشاشة مطلوب' }, 400);
  
  const { widgets, addToSidebar, sidebarSectionId, sidebarSortOrder, ...screenData } = body;
  const [created] = await db.insert(screenTemplates).values({
    ...screenData,
    businessId: bizId,
    createdBy: getUserId(c),
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
  
  // === إضافة الشاشة تلقائياً للسايدبار إذا طُلب ذلك ===
  if (addToSidebar) {
    try {
      // استخدام القسم المحدد من المستخدم أو البحث عن قسم افتراضي
      let sectionId: number;
      if (sidebarSectionId) {
        // التحقق من وجود القسم المحدد
        const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, sidebarSectionId));
        if (section) {
          sectionId = section.id;
        } else {
          // القسم المحدد غير موجود، استخدام الافتراضي
          const [defaultSection] = await db.select().from(sidebarSections)
            .where(and(eq(sidebarSections.businessId, bizId), eq(sidebarSections.name, 'شاشات مخصصة')));
          sectionId = defaultSection ? defaultSection.id : (await db.insert(sidebarSections).values({
            businessId: bizId, name: 'شاشات مخصصة', icon: 'space_dashboard', sortOrder: 99,
          }).returning())[0].id;
        }
      } else {
        // لم يتم تحديد قسم، البحث عن "شاشات مخصصة" أو إنشاء واحد
        const [defaultSection] = await db.select().from(sidebarSections)
          .where(and(eq(sidebarSections.businessId, bizId), eq(sidebarSections.name, 'شاشات مخصصة')));
        if (defaultSection) {
          sectionId = defaultSection.id;
        } else {
          const [newSection] = await db.insert(sidebarSections).values({
            businessId: bizId, name: 'شاشات مخصصة', icon: 'space_dashboard', sortOrder: 99,
          }).returning();
          sectionId = newSection.id;
        }
      }
      
      // إنشاء عنصر في السايدبار مع الترتيب المحدد
      const [sidebarItem] = await db.insert(sidebarItems).values({
        sectionId,
        screenKey: `custom-screen-${created.id}`,
        label: created.name,
        icon: created.icon || 'space_dashboard',
        route: `/biz/${bizId}/custom-screens?screen=${created.id}`,
        sortOrder: sidebarSortOrder || 0,
        isActive: true,
      }).returning();
      
      // إضافة العنصر لجميع المستخدمين الذين لديهم إعدادات سايدبار
      const configs = await db.select().from(userSidebarConfig).where(eq(userSidebarConfig.businessId, bizId));
      const userIds = [...new Set(configs.map((cfg: any) => cfg.userId))];
      for (const userId of userIds) {
        await db.insert(userSidebarConfig).values({
          userId, businessId: bizId, sidebarItemId: sidebarItem.id,
          isVisible: true, customSortOrder: sidebarItem.sortOrder || 0,
        });
      }
    } catch (sidebarErr: unknown) {
      console.error('خطأ في إضافة الشاشة للسايدبار:', toErrorMessage(sidebarErr));
      // لا نُفشل العملية الأساسية إذا فشلت إضافة السايدبار
    }
  }
  
  return c.json(created, 201);
}));

api.put('/screens/:id', safeHandler('تعديل شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const [rec] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(screenTemplates).set({ ...body, updatedAt: new Date() }).where(eq(screenTemplates.id, id)).returning();
  if (!updated) return c.json({ error: 'شاشة غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/screens/:id', safeHandler('حذف شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const [rec] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  // حذف كل العلاقات
  const widgets = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, id));
  for (const w of widgets) {
    await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, w.id));
    await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, w.id));
  }
  await db.delete(screenWidgets).where(eq(screenWidgets.screenId, id));
  await db.delete(screenPermissions).where(eq(screenPermissions.screenId, id));
  // حذف عنصر السايدبار المرتبط بالشاشة (إن وجد)
  const sidebarRoute = `custom-screens?screen=${id}`;
  const linkedSidebarItems = await db.select().from(sidebarItems).where(sql`${sidebarItems.route} LIKE ${'%' + sidebarRoute}`);
  for (const item of linkedSidebarItems) {
    await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, item.id));
    await db.delete(sidebarItems).where(eq(sidebarItems.id, item.id));
  }
  await db.delete(screenTemplates).where(eq(screenTemplates.id, id));
  return c.json({ success: true });
}));

// ===================== ويدجتس الشاشات =====================
api.get('/screens/:screenId/widgets', safeHandler('جلب ويدجتس الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (screenId) {
    const [scr] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, screenId));
    const scrErr = await requireResourceOwnership(c, scr ?? null);
    if (scrErr) return scrErr;
  }
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const rows = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, screenId)).orderBy(screenWidgets.sortOrder);
  return c.json(rows);
}));

api.post('/screens/:screenId/widgets', safeHandler('إضافة ويدجت', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (screenId) {
    const [scr] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, screenId));
    const scrErr = await requireResourceOwnership(c, scr ?? null);
    if (scrErr) return scrErr;
  }
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = await getBody(c);
  if (!body.widgetType) return c.json({ error: 'نوع العنصر (widgetType) مطلوب' }, 400);
  if (!body.title) return c.json({ error: 'عنوان العنصر (title) مطلوب' }, 400);
  const [created] = await db.insert(screenWidgets).values({ ...body, screenId }).returning();
  return c.json(created, 201);
}));

api.put('/widgets/:id', safeHandler('تعديل ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
  
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
  const bizId = getBizId(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const bizId = getBizId(c);
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  
  // التحقق من وجود الشاشة
  const [screen] = await db.select().from(screenTemplates).where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));
  if (!screen) return c.json({ error: 'الشاشة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  
  const body = await getBody(c);
  
  // إصلاح #1: التحقق من sectionId مع قيمة افتراضية
  let sectionId = body.sectionId || body.section_id;
  
  if (sectionId) {
    // التحقق من وجود القسم المحدد
    const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, sectionId));
    if (!section) return c.json({ error: 'القسم المحدد غير موجود' }, 404);
  } else {
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
  }
  
  const [sidebarItem] = await db.insert(sidebarItems).values({
    sectionId,
    screenKey: `custom-screen-${screenId}`,
    label: body.label || screen.name,
    icon: body.icon || screen.icon || 'space_dashboard',
    route: body.route || `/biz/${bizId}/custom-screens?screen=${screenId}`,
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
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);
  
  // جلب الشاشات التي لديه صلاحية عليها
  const perms = await db.select({
    screenId: screenPermissions.screenId, permission: screenPermissions.permission,
  }).from(screenPermissions).where(eq(screenPermissions.userId, userId));
  
  const permScreenIds = new Set(perms.map(p => p.screenId));
  
  // جلب كل شاشات العمل
  const allScreens = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId));
  
  // المستخدم يرى الشاشات التي لديه صلاحية عليها + الشاشات التي لا يوجد لها صلاحيات (عامة)
  const screensWithPerms = new Set(perms.map(p => p.screenId));
  const result = allScreens.filter(s => {
    if (permScreenIds.has(s.id)) return true;
    if (!screensWithPerms.has(s.id)) return true; // شاشة بدون صلاحيات = عامة
    return false;
  });
  
  return c.json(result);
}));

// ===================== بيانات العناصر الحقيقية (Widget Data APIs) =====================

// جلب إحصائيات الشاشة المخصصة (KPIs)
api.get('/businesses/:bizId/widget-stats', bizAuthMiddleware(), safeHandler('جلب إحصائيات العناصر', async (c) => {
  const bizId = getBizId(c);
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

  const receiptRows = normalizeDbResult(receiptResult);
  const paymentRows = normalizeDbResult(paymentResult);
  const opsRows = normalizeDbResult(opsResult);
  const balanceRows = normalizeDbResult(balanceResult);

  return c.json({
    totalReceipts: Number((receiptRows[0] as any)?.total || 0),
    totalPayments: Number((paymentRows[0] as any)?.total || 0),
    operationsCount: Number((opsRows[0] as any)?.total || 0),
    netBalance: Number(getFirstRow<{ total: string }>(balanceRows)?.total || 0),
  });
}));

// جلب سجل العمليات الحقيقي
api.get('/businesses/:bizId/widget-log', bizAuthMiddleware(), safeHandler('جلب سجل العمليات للعنصر', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const limitParam = c.req.query('limit') || '50';
  const offsetParam = c.req.query('offset') || '0';

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${Number.parseInt(opTypeId)}`;

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
    LIMIT ${Number.parseInt(limitParam)} OFFSET ${Number.parseInt(offsetParam)}
  `);

  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries je WHERE ${conditions}
  `);
  const countRows = normalizeDbResult(countResult);

  const resultRows = normalizeDbResult(rows);
  return c.json({
    entries: resultRows,
    total: Number((countRows[0] as any)?.total || 0),
  });
}));

// جلب بيانات مراقبة الحسابات (أرصدة حقيقية + آخر حركات)
api.get('/businesses/:bizId/widget-accounts', bizAuthMiddleware(), safeHandler('جلب بيانات مراقبة الحسابات', async (c) => {
  const bizId = getBizId(c);
  const accountIdsParam = c.req.query('accountIds');

  let accountFilter = sql`a.business_id = ${bizId}`;
  if (accountIdsParam) {
    const ids = accountIdsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n));
    if (ids.length > 0) {
      const idFragments = ids.map((id: number) => sql`${id}`);
      const inClause = sql.join(idFragments, sql`, `);
      accountFilter = sql`a.business_id = ${bizId} AND a.id IN (${inClause})`;
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

  const resultRows = normalizeDbResult(rows);
  return c.json(resultRows);
}));

// جلب بيانات الرسم البياني (حركات شهرية)
api.get('/businesses/:bizId/widget-chart', bizAuthMiddleware(), safeHandler('جلب بيانات الرسم البياني', async (c) => {
  const bizId = getBizId(c);
  const months = Number.parseInt(c.req.query('months') || '6');

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

  const resultRows = normalizeDbResult(rows);

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

// ===================== Enhanced Widget APIs =====================

// إحصائيات محسّنة مع فلتر فترة زمنية
api.get('/businesses/:bizId/widget-stats-enhanced', bizAuthMiddleware(), safeHandler('جلب إحصائيات محسّنة', async (c) => {
  const bizId = getBizId(c);
  const period = c.req.query('period'); // today | week | month | year
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // حساب نطاق التاريخ بناءً على الفترة
  let dateCondition = sql``;
  if (dateFrom && dateTo) {
    dateCondition = sql`AND je.entry_date >= ${dateFrom} AND je.entry_date <= ${dateTo}`;
  } else if (period === 'today') {
    dateCondition = sql`AND je.entry_date = CURRENT_DATE`;
  } else if (period === 'week') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '7 days')`;
  } else if (period === 'month') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month')`;
  } else if (period === 'year') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 year')`;
  }

  const result = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR ot.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR ot.category ILIKE '%صرف%' OR ot.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    ${dateCondition}
  `);

  const balanceResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(ab.balance AS NUMERIC)), 0) as total
    FROM account_balances ab
    INNER JOIN accounts a ON a.id = ab.account_id
    WHERE a.business_id = ${bizId}
  `);

  const rows = normalizeDbResult(result);
  const balanceRows = normalizeDbResult(balanceResult);
  const r = getFirstRow<Record<string, unknown>>(rows) || {};

  return c.json({
    totalReceipts: Number(r.total_receipts || 0),
    totalPayments: Number(r.total_payments || 0),
    operationsCount: Number(r.operations_count || 0),
    netBalance: Number(getFirstRow<{ total: string }>(balanceRows)?.total || 0),
  });
}));

// سجل عمليات محسّن مع بحث نصي وفلتر مبلغ وترقيم صفحات
api.get('/businesses/:bizId/widget-log-enhanced', bizAuthMiddleware(), safeHandler('جلب سجل عمليات محسّن', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const search = c.req.query('search');
  const minAmount = c.req.query('minAmount');
  const maxAmount = c.req.query('maxAmount');
  const status = c.req.query('status');
  const limitParam = c.req.query('limit') || '20';
  const offsetParam = c.req.query('offset') || '0';
  const sortBy = c.req.query('sortBy') || 'entry_date';
  const sortDir = c.req.query('sortDir') || 'desc';

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${Number.parseInt(opTypeId)}`;
  if (status) conditions = sql`${conditions} AND je.status = ${status}`;
  if (search) {
    conditions = sql`${conditions} AND (
      je.description ILIKE ${'%' + search + '%'}
      OR je.entry_number ILIKE ${'%' + search + '%'}
      OR je.reference ILIKE ${'%' + search + '%'}
      OR ot.name ILIKE ${'%' + search + '%'}
    )`;
  }
  if (minAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) >= ${Number.parseFloat(minAmount)}`;
  if (maxAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) <= ${Number.parseFloat(maxAmount)}`;

  // ترتيب ديناميكي
  const validSortColumns: Record<string, any> = {
    'entry_date': sql`je.entry_date`,
    'created_at': sql`je.created_at`,
    'total_debit': sql`CAST(je.total_debit AS NUMERIC)`,
    'entry_number': sql`je.entry_number`,
  };
  const sortColumn = validSortColumns[sortBy] || sql`je.entry_date`;
  const orderClause = sortDir === 'asc' ? sql`${sortColumn} ASC` : sql`${sortColumn} DESC`;

  const rows = await db.execute(sql`
    SELECT
      je.id, je.entry_number, je.description, je.entry_date, je.reference,
      je.total_debit, je.total_credit, je.status, je.created_at,
      ot.name as operation_type_name, ot.icon as operation_type_icon,
      ot.color as operation_type_color, ot.voucher_type, ot.category as operation_category
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
    ORDER BY ${orderClause}
    LIMIT ${Number.parseInt(limitParam)} OFFSET ${Number.parseInt(offsetParam)}
  `);

  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
  `);
  const countRows = normalizeDbResult(countResult);
  const resultRows = normalizeDbResult(rows);

  return c.json({
    entries: resultRows,
    total: Number(getFirstRow<{ total: string }>(countRows)?.total || 0),
  });
}));

// رسم بياني محسّن مع تجميع أسبوعي/شهري/سنوي وتواريخ مخصصة
api.get('/businesses/:bizId/widget-chart-enhanced', bizAuthMiddleware(), safeHandler('جلب بيانات رسم بياني محسّن', async (c) => {
  const bizId = getBizId(c);
  const groupBy = c.req.query('groupBy') || 'monthly'; // weekly | monthly | yearly
  const months = Number.parseInt(c.req.query('months') || '6');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  const dateCondition = (dateFrom && dateTo)
    ? sql`AND je.entry_date >= ${dateFrom} AND je.entry_date <= ${dateTo}`
    : sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month' * ${months})`;

  const arabicMonths: Record<number, string> = {
    1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل', 5: 'مايو', 6: 'يونيو',
    7: 'يوليو', 8: 'أغسطس', 9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر',
  };

  let periodExpr: any, periodLabel: any, orderExpr: any;

  if (groupBy === 'weekly') {
    periodExpr = sql`TO_CHAR(je.entry_date, 'IYYY-IW')`;
    periodLabel = sql`'أسبوع ' || TO_CHAR(je.entry_date, 'IW')`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'IYYY-IW')`;
  } else if (groupBy === 'yearly') {
    periodExpr = sql`TO_CHAR(je.entry_date, 'YYYY')`;
    periodLabel = sql`TO_CHAR(je.entry_date, 'YYYY')`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'YYYY')`;
  } else {
    periodExpr = sql`TO_CHAR(je.entry_date, 'YYYY-MM')`;
    periodLabel = sql`EXTRACT(MONTH FROM je.entry_date)`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'YYYY-MM')`;
  }

  const rows = await db.execute(sql`
    SELECT
      ${periodExpr} as period,
      ${periodLabel} as period_label,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR ot.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR ot.category ILIKE '%صرف%' OR ot.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    ${dateCondition}
    GROUP BY ${periodExpr}, ${periodLabel}
    ORDER BY ${orderExpr}
  `);

  const resultRows = normalizeDbResult(rows);

  const labels = (resultRows as any[]).map((r: any) => {
    if (groupBy === 'monthly') {
      const monthNum = Number(r.period_label);
      return arabicMonths[monthNum] || r.period;
    }
    return String(r.period_label);
  });

  return c.json({
    labels,
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
  const body = await getBody(c);
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'عنصر غير موجود' }, 404);
  const baseConfig = widget.config && typeof widget.config === 'object' ? widget.config : {};
  const newConfig = { ...baseConfig, text: body.text || '' };
  const [updated] = await db.update(screenWidgets).set({ config: newConfig, updatedAt: new Date() }).where(eq(screenWidgets.id, widgetId)).returning();
  return c.json(updated);
}));

// جلب قوالب العمليات مع تفاصيلها لعنصر القوالب
api.get('/businesses/:bizId/widget-operation-types', bizAuthMiddleware(), safeHandler('جلب قوالب العمليات للعنصر', async (c) => {
  const bizId = getBizId(c);
  const idsParam = c.req.query('ids');

  let rows: any[] = [];
  if (idsParam) {
    const ids = idsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n));
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

// ===================== أسعار الصرف اليومية =====================
api.get('/businesses/:bizId/exchange-rates', bizAuthMiddleware(), safeHandler('جلب أسعار الصرف', async (c) => {
  const bizId = getBizId(c);
  const dateParam = c.req.query('date');
  const conditions = [eq(exchangeRates.businessId, bizId)];
  if (dateParam) conditions.push(eq(exchangeRates.effectiveDate, dateParam));
  const rows = await db.select({
    id: exchangeRates.id, fromCurrencyId: exchangeRates.fromCurrencyId,
    toCurrencyId: exchangeRates.toCurrencyId, rate: exchangeRates.rate,
    effectiveDate: exchangeRates.effectiveDate, source: exchangeRates.source,
    notes: exchangeRates.notes, createdAt: exchangeRates.createdAt,
    fromCurrencyCode: sql`fc.code`.as('from_currency_code'),
    fromCurrencyName: sql`fc.name_ar`.as('from_currency_name'),
    toCurrencyCode: sql`tc.code`.as('to_currency_code'),
    toCurrencyName: sql`tc.name_ar`.as('to_currency_name'),
  }).from(exchangeRates)
    .leftJoin(sql`currencies fc`, sql`fc.id = ${exchangeRates.fromCurrencyId}`)
    .leftJoin(sql`currencies tc`, sql`tc.id = ${exchangeRates.toCurrencyId}`)
    .where(and(...conditions))
    .orderBy(desc(exchangeRates.effectiveDate));
  return c.json(rows);
}));

api.post('/businesses/:bizId/exchange-rates', bizAuthMiddleware(), safeHandler('إضافة سعر صرف', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);
  if (!body.fromCurrencyId || !body.toCurrencyId || !body.rate || !body.effectiveDate) {
    return c.json({ error: 'جميع الحقول مطلوبة: fromCurrencyId, toCurrencyId, rate, effectiveDate' }, 400);
  }
  const [created] = await db.insert(exchangeRates).values({
    businessId: bizId, fromCurrencyId: body.fromCurrencyId, toCurrencyId: body.toCurrencyId,
    rate: String(body.rate), effectiveDate: body.effectiveDate,
    source: body.source || 'manual', notes: body.notes || null, createdBy: userId,
  }).returning();
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/exchange-rates/:id', bizAuthMiddleware(), safeHandler('تعديل سعر صرف', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  const [updated] = await db.update(exchangeRates).set({
    rate: body.rate ? String(body.rate) : undefined,
    effectiveDate: body.effectiveDate, source: body.source, notes: body.notes,
  }).where(and(eq(exchangeRates.id, id), eq(exchangeRates.businessId, bizId))).returning();
  if (!updated) return c.json({ error: 'سعر الصرف غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/businesses/:bizId/exchange-rates/:id', bizAuthMiddleware(), safeHandler('حذف سعر صرف', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  await db.delete(exchangeRates).where(and(eq(exchangeRates.id, id), eq(exchangeRates.businessId, bizId)));
  return c.json({ success: true });
}));

// Helper: جلب سعر الصرف الحالي بين عملتين
api.get('/businesses/:bizId/exchange-rates/convert', bizAuthMiddleware(), safeHandler('تحويل عملة', async (c) => {
  const bizId = getBizId(c);
  const fromId = Number.parseInt(c.req.query('from') || '0');
  const toId = Number.parseInt(c.req.query('to') || '0');
  const amountStr = c.req.query('amount') || '1';
  if (!fromId || !toId) return c.json({ error: 'from و to مطلوبان' }, 400);
  if (fromId === toId) return c.json({ rate: 1, convertedAmount: Number.parseFloat(amountStr), fromCurrencyId: fromId, toCurrencyId: toId });
  // جلب أحدث سعر صرف
  const [latestRate] = await db.select().from(exchangeRates)
    .where(and(eq(exchangeRates.businessId, bizId), eq(exchangeRates.fromCurrencyId, fromId), eq(exchangeRates.toCurrencyId, toId)))
    .orderBy(desc(exchangeRates.effectiveDate)).limit(1);
  if (!latestRate) {
    // محاولة عكسية
    const [reverseRate] = await db.select().from(exchangeRates)
      .where(and(eq(exchangeRates.businessId, bizId), eq(exchangeRates.fromCurrencyId, toId), eq(exchangeRates.toCurrencyId, fromId)))
      .orderBy(desc(exchangeRates.effectiveDate)).limit(1);
    if (!reverseRate) return c.json({ error: 'لا يوجد سعر صرف بين هاتين العملتين' }, 404);
    const rate = 1 / Number.parseFloat(String(reverseRate.rate));
    return c.json({ rate, convertedAmount: Number.parseFloat(amountStr) * rate, fromCurrencyId: fromId, toCurrencyId: toId });
  }
  const rate = Number.parseFloat(String(latestRate.rate));
  return c.json({ rate, convertedAmount: Number.parseFloat(amountStr) * rate, fromCurrencyId: fromId, toCurrencyId: toId });
}));

// ===================== نظام الصلاحيات RBAC =====================
api.get('/businesses/:bizId/roles', bizAuthMiddleware(), safeHandler('جلب الأدوار', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(roles).where(eq(roles.businessId, bizId)).orderBy(roles.name);
  // جلب الصلاحيات لكل دور
  const roleIds = rows.map(r => r.id);
  let perms: any[] = [];
  if (roleIds.length > 0) {
    perms = await db.select().from(rolePermissions).where(inArray(rolePermissions.roleId, roleIds));
  }
  const permMap: Record<number, any[]> = {};
  for (const p of perms) {
    if (!permMap[p.roleId]) permMap[p.roleId] = [];
    permMap[p.roleId].push(p);
  }
  // جلب عدد المستخدمين لكل دور
  let userCounts: any[] = [];
  if (roleIds.length > 0) {
    userCounts = await db.select({ roleId: userRoles.roleId, count: count() })
      .from(userRoles).where(inArray(userRoles.roleId, roleIds)).groupBy(userRoles.roleId);
  }
  const countMap: Record<number, number> = {};
  for (const uc of userCounts) { countMap[uc.roleId] = Number(uc.count); }
  return c.json(rows.map(r => ({ ...r, permissions: permMap[r.id] || [], userCount: countMap[r.id] || 0 })));
}));

api.post('/businesses/:bizId/roles', bizAuthMiddleware(), safeHandler('إنشاء دور', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  if (!body.name) return c.json({ error: 'اسم الدور مطلوب' }, 400);
  const [created] = await db.insert(roles).values({
    businessId: bizId, name: body.name, description: body.description || null,
    color: body.color || '#3b82f6',
    maxVoucherAmount: body.maxVoucherAmount ? String(body.maxVoucherAmount) : null,
    maxDailyAmount: body.maxDailyAmount ? String(body.maxDailyAmount) : null,
  }).returning();
  // إضافة الصلاحيات
  if (body.permissions && Array.isArray(body.permissions)) {
    for (const p of body.permissions) {
      await db.insert(rolePermissions).values({ roleId: created.id, resource: p.resource, action: p.action });
    }
  }
  return c.json(created, 201);
}));

api.put('/businesses/:bizId/roles/:id', bizAuthMiddleware(), safeHandler('تعديل دور', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  const [updated] = await db.update(roles).set({
    name: body.name, description: body.description, color: body.color,
    maxVoucherAmount: body.maxVoucherAmount ? String(body.maxVoucherAmount) : null,
    maxDailyAmount: body.maxDailyAmount ? String(body.maxDailyAmount) : null,
    updatedAt: new Date(),
  }).where(and(eq(roles.id, id), eq(roles.businessId, bizId))).returning();
  if (!updated) return c.json({ error: 'الدور غير موجود' }, 404);
  // تحديث الصلاحيات
  if (body.permissions !== undefined) {
    await db.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
    if (body.permissions && Array.isArray(body.permissions)) {
      for (const p of body.permissions) {
        await db.insert(rolePermissions).values({ roleId: id, resource: p.resource, action: p.action });
      }
    }
  }
  return c.json(updated);
}));

api.delete('/businesses/:bizId/roles/:id', bizAuthMiddleware(), safeHandler('حذف دور', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف غير صالح' }, 400);
  const [role] = await db.select().from(roles).where(and(eq(roles.id, id), eq(roles.businessId, bizId)));
  if (!role) return c.json({ error: 'الدور غير موجود' }, 404);
  if (role.isSystem) return c.json({ error: 'لا يمكن حذف دور النظام' }, 400);
  await db.delete(rolePermissions).where(eq(rolePermissions.roleId, id));
  await db.delete(userRoles).where(eq(userRoles.roleId, id));
  await db.delete(roles).where(eq(roles.id, id));
  return c.json({ success: true });
}));

// تعيين دور لمستخدم
api.post('/businesses/:bizId/user-roles', bizAuthMiddleware(), safeHandler('تعيين دور لمستخدم', async (c) => {
  const bizId = getBizId(c);
  const assignedBy = getUserId(c);
  const body = await getBody(c);
  if (!body.userId || !body.roleId) return c.json({ error: 'userId و roleId مطلوبان' }, 400);
  // حذف الدور القديم إن وجد
  await db.delete(userRoles).where(and(eq(userRoles.userId, body.userId), eq(userRoles.businessId, bizId)));
  const [created] = await db.insert(userRoles).values({
    userId: body.userId, roleId: body.roleId, businessId: bizId, assignedBy,
  }).returning();
  return c.json(created, 201);
}));

api.get('/businesses/:bizId/user-roles', bizAuthMiddleware(), safeHandler('جلب أدوار المستخدمين', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select({
    id: userRoles.id, userId: userRoles.userId, roleId: userRoles.roleId,
    userName: users.username, roleName: roles.name, roleColor: roles.color,
    createdAt: userRoles.createdAt,
  }).from(userRoles)
    .leftJoin(users, eq(userRoles.userId, users.id))
    .leftJoin(roles, eq(userRoles.roleId, roles.id))
    .where(eq(userRoles.businessId, bizId));
  return c.json(rows);
}));

api.delete('/businesses/:bizId/user-roles/:userId', bizAuthMiddleware(), safeHandler('إزالة دور مستخدم', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);
  await db.delete(userRoles).where(and(eq(userRoles.userId, userId), eq(userRoles.businessId, bizId)));
  return c.json({ success: true });
}));

// ===================== المرفقات المحسنة =====================
api.post('/businesses/:bizId/attachments', bizAuthMiddleware(), safeHandler('رفع مرفق', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);
  if (!body.entityType || !body.entityId || !body.fileName) {
    return c.json({ error: 'entityType, entityId, fileName مطلوبة' }, 400);
  }
  const [created] = await db.insert(attachments).values({
    entityType: body.entityType, entityId: body.entityId,
    fileName: body.fileName, filePath: body.filePath || body.fileUrl || '',
    fileSize: body.fileSize || 0, fileType: body.fileType || body.mimeType || 'application/octet-stream',
    description: body.description || null,
    uploadedBy: userId,
  }).returning();
  // سجل التدقيق
  await db.insert(auditLog).values({
    userId, businessId: bizId, action: 'upload_attachment',
    tableName: 'attachments', recordId: created.id,
    newData: { entityType: body.entityType, entityId: body.entityId, fileName: body.fileName },
  });
  return c.json(created, 201);
}));

api.delete('/businesses/:bizId/attachments/:id', bizAuthMiddleware(), safeHandler('حذف مرفق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المرفق غير صالح' }, 400);
  const [existing] = await db.select().from(attachments).where(eq(attachments.id, id));
  if (!existing) return c.json({ error: 'مرفق غير موجود' }, 404);
  await db.delete(attachments).where(eq(attachments.id, id));
  return c.json({ success: true });
}));

// ===================== عكس العمليات (Void/Reverse) =====================
api.post('/businesses/:bizId/vouchers/:id/reverse', bizAuthMiddleware(), checkPermission('vouchers', 'reverse'), safeHandler('عكس سند', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const body = await getBody(c);
  const reason = body.reason || 'عكس عملية';
  try {
    const result = await reverseTransaction(bizId, userId ?? 0, id, reason);
    return c.json(result, 201);
  } catch (err: unknown) {
    const message = toErrorMessage(err);
    const status = message.includes('غير موجود') ? 404 : 400;
    return c.json({ error: message }, status);
  }
}));



// ===================== سير العمل (Workflow) =====================

// جلب الانتقالات المتاحة لسند
api.get('/businesses/:bizId/vouchers/:voucherId/transitions', bizAuthMiddleware(), safeHandler('جلب انتقالات سير العمل', async (c) => {
  const bizId = getBizId(c);
  const voucherId = parseId(c.req.param('voucherId'));
  if (!voucherId) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const transitions = await getAvailableTransitions(bizId, voucherId);
  return c.json(transitions);
}));

// تنفيذ انتقال على سند
api.post('/businesses/:bizId/vouchers/:voucherId/transition', bizAuthMiddleware(), checkPermission('workflow', 'execute'), safeHandler('تنفيذ انتقال', async (c) => {
  const bizId = getBizId(c);
  const voucherId = parseId(c.req.param('voucherId'));
  if (!voucherId) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const body = await getBody(c);
  const { transitionId, note } = body;
  if (!transitionId) return c.json({ error: 'معرّف الانتقال مطلوب' }, 400);
  const userId = getUserId(c) || 1;
  const result = await executeTransition(bizId, voucherId, transitionId, userId, note);
  return c.json(result);
}));

// سجل سير العمل لسند
api.get('/businesses/:bizId/vouchers/:voucherId/workflow-history', bizAuthMiddleware(), safeHandler('سجل سير العمل', async (c) => {
  const bizId = getBizId(c);
  const voucherId = parseId(c.req.param('voucherId'));
  if (!voucherId) return c.json({ error: 'معرّف السند غير صالح' }, 400);
  const history = await getWorkflowHistory(bizId, voucherId);
  return c.json(history);
}));

// إعداد سير عمل افتراضي لنوع عملية
api.post('/businesses/:bizId/operation-types/:opTypeId/setup-workflow', bizAuthMiddleware(), safeHandler('إعداد سير عمل', async (c) => {
  const bizId = getBizId(c);
  const opTypeId = parseId(c.req.param('opTypeId'));
  if (!opTypeId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  await setupDefaultWorkflow(bizId, opTypeId);
  return c.json({ success: true, message: 'تم إعداد سير العمل الافتراضي' });
}));

// جلب انتقالات نوع عملية
api.get('/businesses/:bizId/operation-types/:opTypeId/transitions', bizAuthMiddleware(), safeHandler('جلب انتقالات', async (c) => {
  const bizId = getBizId(c);
  const opTypeId = parseId(c.req.param('opTypeId'));
  if (!opTypeId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const transitions = await getOperationTypeTransitions(bizId, opTypeId);
  return c.json(transitions);
}));

// إضافة انتقال جديد
api.post('/businesses/:bizId/operation-types/:opTypeId/transitions', bizAuthMiddleware(), safeHandler('إضافة انتقال', async (c) => {
  const bizId = getBizId(c);
  const opTypeId = parseId(c.req.param('opTypeId'));
  if (!opTypeId) return c.json({ error: 'معرّف نوع العملية غير صالح' }, 400);
  const body = await getBody(c);
  const transition = await addTransition(bizId, opTypeId, body);
  return c.json(transition, 201);
}));

// حذف انتقال
api.delete('/businesses/:bizId/transitions/:transitionId', bizAuthMiddleware(), safeHandler('حذف انتقال', async (c) => {
  const bizId = getBizId(c);
  const transitionId = parseId(c.req.param('transitionId'));
  if (!transitionId) return c.json({ error: 'معرّف الانتقال غير صالح' }, 400);
  await deleteTransition(bizId, transitionId);
  return c.json({ success: true });
}));

// ===================== بناء الواجهات الديناميكية (UI Builder) =====================

// جلب كل الصفحات الديناميكية
api.get('/businesses/:bizId/ui/pages', bizAuthMiddleware(), safeHandler('جلب الصفحات', async (c) => {
  const bizId = getBizId(c);
  const pages = await getPages(bizId);
  return c.json(pages);
}));

// جلب صفحة بالمفتاح
api.get('/businesses/:bizId/ui/pages/key/:pageKey', bizAuthMiddleware(), safeHandler('جلب صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageKey = c.req.param('pageKey');
  const result = await getPage(bizId, pageKey);
  if (!result) return c.json({ error: 'الصفحة غير موجودة' }, 404);
  return c.json(result);
}));

// جلب صفحة بالمعرّف
api.get('/businesses/:bizId/ui/pages/:pageId', bizAuthMiddleware(), safeHandler('جلب صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const result = await getPageById(bizId, pageId);
  if (!result) return c.json({ error: 'الصفحة غير موجودة' }, 404);
  return c.json(result);
}));

// إنشاء صفحة جديدة
api.post('/businesses/:bizId/ui/pages', bizAuthMiddleware(), checkPermission('ui_builder', 'create'), safeHandler('إنشاء صفحة', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  if (!body.pageKey || !body.title) return c.json({ error: 'المفتاح والعنوان مطلوبان' }, 400);
  const page = await createPage(bizId, body);
  return c.json(page, 201);
}));

// تحديث صفحة
api.put('/businesses/:bizId/ui/pages/:pageId', bizAuthMiddleware(), safeHandler('تحديث صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  const result = await updatePage(bizId, pageId, body);
  return c.json(result);
}));

// حذف صفحة
api.delete('/businesses/:bizId/ui/pages/:pageId', bizAuthMiddleware(), safeHandler('حذف صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  await deletePage(bizId, pageId);
  return c.json({ success: true });
}));

// إضافة مكون لصفحة
api.post('/businesses/:bizId/ui/pages/:pageId/components', bizAuthMiddleware(), safeHandler('إضافة مكون', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  if (!body.componentType) return c.json({ error: 'نوع المكون مطلوب' }, 400);
  const component = await addComponent(bizId, pageId, body);
  return c.json(component, 201);
}));

// تحديث مكون
api.put('/businesses/:bizId/ui/components/:componentId', bizAuthMiddleware(), safeHandler('تحديث مكون', async (c) => {
  const bizId = getBizId(c);
  const componentId = parseId(c.req.param('componentId'));
  if (!componentId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  await updateComponent(bizId, componentId, body);
  return c.json({ success: true });
}));

// حذف مكون
api.delete('/businesses/:bizId/ui/components/:componentId', bizAuthMiddleware(), safeHandler('حذف مكون', async (c) => {
  const bizId = getBizId(c);
  const componentId = parseId(c.req.param('componentId'));
  if (!componentId) return c.json({ error: 'معرّف غير صالح' }, 400);
  await deleteComponent(bizId, componentId);
  return c.json({ success: true });
}));

// جلب مصادر البيانات
api.get('/businesses/:bizId/ui/data-sources', bizAuthMiddleware(), safeHandler('جلب مصادر بيانات', async (c) => {
  const bizId = getBizId(c);
  const sources = await getDataSources(bizId);
  return c.json(sources);
}));

// إنشاء مصدر بيانات
api.post('/businesses/:bizId/ui/data-sources', bizAuthMiddleware(), safeHandler('إنشاء مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  if (!body.name || !body.sourceType) return c.json({ error: 'الاسم والنوع مطلوبان' }, 400);
  const ds = await createDataSource(bizId, body);
  return c.json(ds, 201);
}));

// تحديث مصدر بيانات
api.put('/businesses/:bizId/ui/data-sources/:dsId', bizAuthMiddleware(), safeHandler('تحديث مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const dsId = parseId(c.req.param('dsId'));
  if (!dsId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  await updateDataSource(bizId, dsId, body);
  return c.json({ success: true });
}));

// حذف مصدر بيانات
api.delete('/businesses/:bizId/ui/data-sources/:dsId', bizAuthMiddleware(), safeHandler('حذف مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const dsId = parseId(c.req.param('dsId'));
  if (!dsId) return c.json({ error: 'معرّف غير صالح' }, 400);
  await deleteDataSource(bizId, dsId);
  return c.json({ success: true });
}));

// تنفيذ مصدر بيانات
api.post('/businesses/:bizId/ui/data-sources/:dsId/execute', bizAuthMiddleware(), safeHandler('تنفيذ مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const dsId = parseId(c.req.param('dsId'));
  if (!dsId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = await getBody(c);
  const result = await executeDataSource(bizId, dsId, body);
  return c.json(result);
}));

// ===================== إعداد الشاشة المخصصة (تبويبات ديناميكية) =====================

// جلب إعداد الشاشة - يدعم النظام القديم (customScreenConfig) والجديد (layoutConfig.tabs)
api.get('/businesses/:bizId/screens/:screenId/collection-style-config', bizAuthMiddleware(), safeHandler('جلب إعداد الشاشة المخصصة', async (c) => {
  const bizId = getBizId(c);
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);

  const [screen] = await db.select().from(screenTemplates).where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));
  if (!screen) return c.json({ error: 'الشاشة غير موجودة أو لا تنتمي لهذا العمل' }, 404);

  // النظام الجديد: التبويبات محفوظة في layoutConfig.tabs
  const layoutConfig = (screen.layoutConfig as any) || {};
  if (layoutConfig.tabs && Array.isArray(layoutConfig.tabs) && layoutConfig.tabs.length > 0) {
    return c.json({ screenId, tabs: layoutConfig.tabs, notes: layoutConfig.notes || '' });
  }

  // التوافق مع النظام القديم: تحويل customScreenConfig إلى tabs
  const [oldConfig] = await db.select().from(customScreenConfig).where(eq(customScreenConfig.screenId, screenId));
  if (oldConfig) {
    const tabs: any[] = [];
    if (oldConfig.tab1OperationTypeIds && (oldConfig.tab1OperationTypeIds as number[]).length > 0) {
      tabs.push({ id: 'tab_1', label: oldConfig.tab1Label, icon: oldConfig.tab1Icon, color: oldConfig.tab1Color, type: 'operations', sortOrder: 1, config: { operationTypeIds: oldConfig.tab1OperationTypeIds } });
    }
    if (oldConfig.tab2OperationTypeIds && (oldConfig.tab2OperationTypeIds as number[]).length > 0) {
      tabs.push({ id: 'tab_2', label: oldConfig.tab2Label, icon: oldConfig.tab2Icon, color: oldConfig.tab2Color, type: 'operations', sortOrder: 2, config: { operationTypeIds: oldConfig.tab2OperationTypeIds } });
    }
    tabs.push({ id: 'tab_history', label: oldConfig.historyLabel, icon: oldConfig.historyIcon, color: oldConfig.historyColor, type: 'log', sortOrder: tabs.length + 1, config: {} });
    if (oldConfig.accountIds && (oldConfig.accountIds as number[]).length > 0) {
      tabs.push({ id: 'tab_accounts', label: oldConfig.accountsSectionLabel, icon: oldConfig.accountsIcon, color: oldConfig.accountsColor, type: 'accounts', sortOrder: tabs.length + 1, config: { accountIds: oldConfig.accountIds } });
    }
    return c.json({ screenId, tabs, notes: '' });
  }

  // لا يوجد إعداد - إرجاع مصفوفة فارغة
  return c.json({ screenId, tabs: [], notes: '' });
}));

// حفظ إعداد الشاشة - النظام الجديد يحفظ في layoutConfig
api.put('/businesses/:bizId/screens/:screenId/collection-style-config', bizAuthMiddleware(), safeHandler('حفظ إعداد الشاشة المخصصة', async (c) => {
  const bizId = getBizId(c);
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);

  const [screen] = await db.select().from(screenTemplates).where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));
  if (!screen) return c.json({ error: 'الشاشة غير موجودة أو لا تنتمي لهذا العمل' }, 404);

  const body = await getBody(c);
  const tabs = body.tabs || [];
  const notes = body.notes || '';

  // حفظ في layoutConfig
  const layoutConfig = { tabs, notes };
  await db.update(screenTemplates).set({
    layoutConfig,
    templateKey: 'collection_style',
    updatedAt: new Date(),
  }).where(eq(screenTemplates.id, screenId)).returning();

  return c.json({ screenId, tabs, notes });
}));

// ===================== تصنيفات المخازن =====================
api.get('/businesses/:bizId/warehouse-types', bizAuthMiddleware(), safeHandler('جلب تصنيفات المخازن', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(warehouseTypes).where(eq(warehouseTypes.businessId, bizId)).orderBy(warehouseTypes.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/warehouse-types', bizAuthMiddleware(), safeHandler('إضافة تصنيف مخزن', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'warehouse');
  const [created] = await db.insert(warehouseTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/warehouse-types/:id', safeHandler('تعديل تصنيف مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(warehouseTypes).where(eq(warehouseTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(warehouseTypes).set({ ...body, updatedAt: new Date() }).where(eq(warehouseTypes.id, id)).returning();
  if (!updated) return c.json({ error: 'التصنيف غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/warehouse-types/:id', safeHandler('حذف تصنيف مخزن', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(warehouseTypes).where(eq(warehouseTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(warehouseTypes).where(eq(warehouseTypes.id, id));
  return c.json({ success: true });
}));

// ===================== تصنيفات قيود اليومية =====================
api.get('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('جلب تصنيفات قيود اليومية', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.businessId, bizId)).orderBy(journalEntryCategories.sortOrder);
  return c.json(rows);
}));

api.post('/businesses/:bizId/journal-entry-categories', bizAuthMiddleware(), safeHandler('إضافة تصنيف قيد يومية', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c);
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const { subTypeKey, ...rest } = validation.data;
  const [created] = await db.insert(journalEntryCategories).values({ ...rest, categoryKey: subTypeKey, businessId: bizId }).returning();
  return c.json(created, 201);
}));

api.put('/journal-entry-categories/:id', safeHandler('تعديل تصنيف قيد يومية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = await getBody(c);
  const [updated] = await db.update(journalEntryCategories).set({ ...body, updatedAt: new Date() }).where(eq(journalEntryCategories.id, id)).returning();
  if (!updated) return c.json({ error: 'التصنيف غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/journal-entry-categories/:id', safeHandler('حذف تصنيف قيد يومية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  await db.delete(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  return c.json({ success: true });
}));

// ===================== العمليات المخزنية =====================

// جلب عمليات مخزن معين
api.get('/businesses/:bizId/warehouses/:warehouseId/operations', bizAuthMiddleware(), safeHandler('جلب عمليات المخزن', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = parseId(c.req.param('warehouseId'));
  if (!warehouseId) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);

  const rows = await db.select({
    id: warehouseOperations.id,
    operationType: warehouseOperations.operationType,
    operationNumber: warehouseOperations.operationNumber,
    warehouseSequence: warehouseOperations.warehouseSequence,
    templateSequence: warehouseOperations.templateSequence,
    operationDate: warehouseOperations.operationDate,
    description: warehouseOperations.description,
    status: warehouseOperations.status,
    totalCost: warehouseOperations.totalCost,
    totalItems: warehouseOperations.totalItems,
    operationTypeName: operationTypes.name,
    operationTypeIcon: operationTypes.icon,
    operationTypeColor: operationTypes.color,
  }).from(warehouseOperations)
    .leftJoin(operationTypes, eq(warehouseOperations.operationTypeId, operationTypes.id))
    .where(and(
      eq(warehouseOperations.businessId, bizId),
      sql`(${warehouseOperations.sourceWarehouseId} = ${warehouseId} OR ${warehouseOperations.destinationWarehouseId} = ${warehouseId})`
    ))
    .orderBy(desc(warehouseOperations.operationDate), desc(warehouseOperations.id));

  return c.json(rows);
}));

// إنشاء عملية مخزنية
api.post('/businesses/:bizId/warehouse-operations', bizAuthMiddleware(), checkPermission('inventory', 'create'), safeHandler('إنشاء عملية مخزنية', async (c) => {
  const bizId = getBizId(c);
  const userId = c.get('userId') as number;
  const body = await getBody(c);

  // === جلب بيانات القالب إن وجد وتطبيق خصائصه ===
  let opTemplate: Record<string, unknown> | null = null;
  if (body.operationTypeId) {
    const otRows = await db.execute(sql`SELECT * FROM operation_types WHERE id = ${body.operationTypeId} AND business_id = ${bizId}`);
    opTemplate = getFirstRow<Record<string, unknown>>(otRows) ?? null;
    if (opTemplate) {
      // تطبيق خصائص القالب إذا لم يتم تحديدها يدوياً
      if (!body.operationType && opTemplate.voucher_type) body.operationType = opTemplate.voucher_type;
      if (!body.sourceWarehouseId && opTemplate.source_warehouse_id) body.sourceWarehouseId = opTemplate.source_warehouse_id;
      if (!body.description && opTemplate.name) body.description = opTemplate.name;
    }
  }

  // التحقق من الحقول الإلزامية
  if (!body.operationTypeId) return c.json({ error: 'معرّف نوع العملية (القالب) مطلوب' }, 400);
  if (!body.operationType) return c.json({ error: 'نوع العملية المخزنية مطلوب' }, 400);
  if (!body.sourceWarehouseId && !body.destinationWarehouseId) {
    return c.json({ error: 'يجب تحديد مخزن مصدر أو مخزن وجهة' }, 400);
  }
  if (!body.items || !Array.isArray(body.items) || body.items.length === 0) {
    return c.json({ error: 'يجب إضافة صنف واحد على الأقل' }, 400);
  }

  // التحقق من ملكية المخازن (يجب أن تتبع نفس الشركة)
  if (body.sourceWarehouseId) {
    const [srcWh] = await db.select().from(warehouses).where(and(eq(warehouses.id, body.sourceWarehouseId), eq(warehouses.businessId, bizId)));
    if (!srcWh) return c.json({ error: 'المخزن المصدر غير موجود أو لا ينتمي لهذا العمل' }, 400);
  }
  if (body.destinationWarehouseId) {
    const [destWh] = await db.select().from(warehouses).where(and(eq(warehouses.id, body.destinationWarehouseId), eq(warehouses.businessId, bizId)));
    if (!destWh) return c.json({ error: 'المخزن الوجهة غير موجود أو لا ينتمي لهذا العمل' }, 400);
  }

  // التحقق من نوع العملية
  const validTypes = ['supply_invoice', 'supply_order', 'dispatch', 'transfer_out', 'receive_transfer'];
  if (!validTypes.includes(body.operationType)) {
    return c.json({ error: `نوع العملية غير صالح. الأنواع المتاحة: ${validTypes.join(', ')}` }, 400);
  }

  // استلام التحويل يجب أن يكون مرتبط بتحويل سابق
  if (body.operationType === 'receive_transfer' && !body.relatedOperationId) {
    return c.json({ error: 'استلام التحويل يتطلب تحديد عملية التحويل المرتبطة (relatedOperationId)' }, 400);
  }

  // حساب الإجماليات
  let totalCost = 0;
  let totalItems = 0;
  for (const item of body.items) {
    totalCost += (Number(item.quantity) || 0) * (Number(item.unitCost) || 0);
    totalItems += Number(item.quantity) || 0;
  }

  // === ترقيم ذكي ===
  const year = new Date().getFullYear();
  const mainWarehouseId = body.sourceWarehouseId || body.destinationWarehouseId;

  // جلب معلومات المخزن للترقيم
  const [mainWh] = await db.select().from(warehouses).where(eq(warehouses.id, mainWarehouseId));
  let categorySeqNum = 1;
  let warehouseSeqNum = mainWh?.sequenceNumber || 1;
  if (mainWh?.subTypeId) {
    const [whCategory] = await db.select({ sequenceNumber: warehouseTypes.sequenceNumber })
      .from(warehouseTypes).where(eq(warehouseTypes.id, mainWh.subTypeId));
    categorySeqNum = whCategory?.sequenceNumber || 1;
  }

  // توليد الرقم المنسق الكامل
  const whSeqResult = await generateWarehouseOpFullSequence(
    bizId, categorySeqNum, warehouseSeqNum,
    body.operationType, mainWarehouseId, year
  );
  const operationNumber = whSeqResult.fullSequenceNumber;
  const whSeq = whSeqResult.sequentialNumber;

  // تسلسل القالب
  let tmplSeq: number | null = null;
  if (body.operationTypeId) {
    tmplSeq = await getNextSequence(bizId, 'template', body.operationTypeId, year);
  }

  const [created] = await db.insert(warehouseOperations).values({
    businessId: bizId,
    operationType: body.operationType,
    operationNumber,
    sourceWarehouseId: body.sourceWarehouseId || null,
    destinationWarehouseId: body.destinationWarehouseId || null,
    operationTypeId: body.operationTypeId || null,
    operationDate: body.operationDate || new Date().toISOString().split('T')[0],
    description: body.description || null,
    reference: body.reference || null,
    supplierId: body.supplierId || null,
    relatedOperationId: body.relatedOperationId || null,
    relatedVoucherId: body.relatedVoucherId || null,
    status: body.status || 'confirmed',
    totalCost: String(totalCost),
    totalItems,
    warehouseSequence: whSeq,
    templateSequence: tmplSeq,
    fullSequenceNumber: operationNumber,
    createdBy: userId,
  }).returning();

  // إضافة الأصناف
  if (body.items.length > 0) {
    await db.insert(warehouseOperationItems).values(
      body.items.map((item: any, i: number) => ({
        operationId: created.id,
        itemName: item.itemName || item.name,
        itemCode: item.itemCode || null,
        quantity: String(item.quantity),
        unitCost: String(item.unitCost || 0),
        totalCost: String((Number(item.quantity) || 0) * (Number(item.unitCost) || 0)),
        unit: item.unit || null,
        notes: item.notes || null,
        sortOrder: i,
      }))
    );
  }

  // === تكامل المحرك المخزني: تحديث inventory_stock عبر inventory.service ===
  const inventoryResults = [];
  for (const item of body.items) {
    const itemName = item.itemName || item.name;
    const itemCode = item.itemCode || null;
    let inventoryItemId: number;

    // التأكد من وجود الصنف في inventory_items أو إنشائه
    const existingItems = await db.select().from(inventoryItems)
      .where(and(
        eq(inventoryItems.businessId, bizId),
        itemCode ? eq(inventoryItems.code, itemCode) : eq(inventoryItems.name, itemName)
      ));

    if (existingItems.length > 0) {
      inventoryItemId = existingItems[0].id;
    } else {
      const autoCode = itemCode || `${itemName.substring(0, 3).toUpperCase()}-${String(Math.floor(Math.random() * 9999)).padStart(4, '0')}`;
      const [newItem] = await db.insert(inventoryItems).values({
        businessId: bizId,
        name: itemName,
        code: autoCode,
        unit: item.unit || null,
      }).returning();
      inventoryItemId = newItem.id;
    }

    // تحديث المخزون عبر inventory.service
    try {
      const warehouseId = body.sourceWarehouseId || body.destinationWarehouseId;
      if (['supply_invoice', 'supply_order', 'receive_transfer'].includes(body.operationType)) {
        const result = await processStockMovement(bizId, {
          itemId: inventoryItemId,
          warehouseId,
          movementType: body.operationType,
          quantity: Number(item.quantity),
          unitCost: Number(item.unitCost || 0),
          reference: operationNumber,
          description: body.description || '',
          supplierId: body.supplierId || null,
        });
        inventoryResults.push(result);
      } else if (['dispatch', 'transfer_out'].includes(body.operationType)) {
        const result = await processStockMovement(bizId, {
          itemId: inventoryItemId,
          warehouseId,
          movementType: body.operationType,
          quantity: -Number(item.quantity),
          unitCost: Number(item.unitCost || 0),
          reference: operationNumber,
          description: body.description || '',
          toWarehouseId: body.destinationWarehouseId || null,
        });
        inventoryResults.push(result);
      }
    } catch (invErr: unknown) {
      console.error(`تحذير: فشل تحديث المخزون للصنف ${itemName}:`, toErrorMessage(invErr));
    }
  }

  // === تكامل المحرك المالي: إنشاء قيد محاسبي إذا كان القالب يتطلب ذلك ===
  let relatedVoucherId: number | null = null;
  const sourceAccountId = opTemplate ? (opTemplate.source_account_id as number | undefined) : undefined;
  if (opTemplate?.auto_journal === true && sourceAccountId) {
    try {
      const txResult = await postTransaction(bizId, userId, {
        voucherType: body.operationType === 'dispatch' ? 'payment' : 'receipt',
        amount: totalCost,
        currencyId: body.currencyId || 1,
        description: `${body.description || body.operationType} - ${operationNumber}`,
        operationTypeId: body.operationTypeId || null,
        debitAccountId: sourceAccountId,
        creditAccountId: null,
      });
      if (txResult?.voucher) {
        relatedVoucherId = txResult.voucher.id;
        await db.update(warehouseOperations)
          .set({ relatedVoucherId })
          .where(eq(warehouseOperations.id, created.id));
      }
    } catch (txErr: unknown) {
      console.error('تحذير: فشل إنشاء القيد المحاسبي:', toErrorMessage(txErr));
    }
  }

  return c.json({ ...created, inventoryUpdated: inventoryResults.length > 0, inventoryResults, relatedVoucherId }, 201);
}));

// جلب تفاصيل عملية مخزنية مع الأصناف
api.get('/warehouse-operations/:id', safeHandler('جلب تفاصيل عملية مخزنية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العملية غير صالح' }, 400);

  const [operation] = await db.select().from(warehouseOperations).where(eq(warehouseOperations.id, id));
  if (!operation) return c.json({ error: 'العملية المخزنية غير موجودة' }, 404);
  const opErr = await requireResourceOwnership(c, operation);
  if (opErr) return opErr;

  const items = await db.select().from(warehouseOperationItems)
    .where(eq(warehouseOperationItems.operationId, id))
    .orderBy(warehouseOperationItems.sortOrder);

  // جلب معلومات القالب إن وجد
  let operationType = null;
  if (operation.operationTypeId) {
    const [ot] = await db.select().from(operationTypes).where(eq(operationTypes.id, operation.operationTypeId));
    operationType = ot || null;
  }

  // جلب معلومات المخازن
  let sourceWarehouse = null, destinationWarehouse = null;
  if (operation.sourceWarehouseId) {
    const [w] = await db.select().from(warehouses).where(eq(warehouses.id, operation.sourceWarehouseId));
    sourceWarehouse = w || null;
  }
  if (operation.destinationWarehouseId) {
    const [w] = await db.select().from(warehouses).where(eq(warehouses.id, operation.destinationWarehouseId));
    destinationWarehouse = w || null;
  }

  return c.json({ ...operation, items, operationType, sourceWarehouse, destinationWarehouse });
}));

// جلب مخزون مخزن (لتبويب مراقبة الأصناف)
api.get('/businesses/:bizId/warehouses/:warehouseId/inventory', bizAuthMiddleware(), safeHandler('جلب مخزون المخزن', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = parseId(c.req.param('warehouseId'));
  if (!warehouseId) return c.json({ error: 'معرّف المخزن غير صالح' }, 400);

  // حساب المخزون من العمليات المؤكدة
  const result = await db.execute(sql`
    SELECT
      woi.item_name,
      woi.item_code,
      woi.unit,
      SUM(CASE
        WHEN wo.destination_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN CAST(woi.quantity AS NUMERIC)
        WHEN wo.source_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN -CAST(woi.quantity AS NUMERIC)
        ELSE 0
      END) as current_quantity,
      SUM(CASE
        WHEN wo.destination_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN CAST(woi.total_cost AS NUMERIC)
        WHEN wo.source_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
          THEN -CAST(woi.total_cost AS NUMERIC)
        ELSE 0
      END) as total_cost,
      MAX(wo.operation_date) as last_movement_date
    FROM warehouse_operation_items woi
    JOIN warehouse_operations wo ON wo.id = woi.operation_id
    WHERE wo.business_id = ${bizId}
    AND (wo.source_warehouse_id = ${warehouseId} OR wo.destination_warehouse_id = ${warehouseId})
    GROUP BY woi.item_name, woi.item_code, woi.unit
    HAVING SUM(CASE
      WHEN wo.destination_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
        THEN CAST(woi.quantity AS NUMERIC)
      WHEN wo.source_warehouse_id = ${warehouseId} AND wo.status = 'confirmed'
        THEN -CAST(woi.quantity AS NUMERIC)
      ELSE 0
    END) > 0
    ORDER BY woi.item_name
  `);
  const rows = normalizeDbResult(result);
  // === فلتر العناصر الوهمية: استبعاد العناصر بدون اسم أو بكمية صفر ===
  const filteredRows = (rows as any[]).filter((r: any) => {
    if (!r.item_name || r.item_name.trim() === '') return false;
    const qty = Number.parseFloat(String(r.current_quantity || 0));
    return qty > 0;
  });
  return c.json(filteredRows);
}));

// جلب كل العمليات المخزنية للعمل
api.get('/businesses/:bizId/warehouse-operations', bizAuthMiddleware(), safeHandler('جلب كل العمليات المخزنية', async (c) => {
  const bizId = getBizId(c);
  const opType = c.req.query('type');
  const warehouseId = c.req.query('warehouseId');

  const conditions = [eq(warehouseOperations.businessId, bizId)];
  if (opType) conditions.push(eq(warehouseOperations.operationType, opType as any));
  if (warehouseId) {
    const whId = Number.parseInt(warehouseId);
    conditions.push(sql`(${warehouseOperations.sourceWarehouseId} = ${whId} OR ${warehouseOperations.destinationWarehouseId} = ${whId})`);
  }

  const rows = await db.select({
    id: warehouseOperations.id,
    operationType: warehouseOperations.operationType,
    operationNumber: warehouseOperations.operationNumber,
    operationDate: warehouseOperations.operationDate,
    description: warehouseOperations.description,
    status: warehouseOperations.status,
    totalCost: warehouseOperations.totalCost,
    totalItems: warehouseOperations.totalItems,
    operationTypeName: operationTypes.name,
    operationTypeIcon: operationTypes.icon,
  }).from(warehouseOperations)
    .leftJoin(operationTypes, eq(warehouseOperations.operationTypeId, operationTypes.id))
    .where(and(...conditions))
    .orderBy(desc(warehouseOperations.operationDate), desc(warehouseOperations.id));

  return c.json(rows);
}));

// === API تقارير المخزون لعدة مخازن (لتبويب التقارير في الشاشات المخصصة) ===
api.get('/businesses/:bizId/inventory-summary', bizAuthMiddleware(), safeHandler('ملخص مخزون عدة مخازن', async (c) => {
  const bizId = getBizId(c);
  const warehouseIdsParam = c.req.query('warehouseIds');
  if (!warehouseIdsParam) return c.json({ error: 'يجب تحديد المخازن' }, 400);
  const warehouseIds = warehouseIdsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n) && n > 0);
  if (warehouseIds.length === 0) return c.json({ error: 'معرّفات المخازن غير صالحة' }, 400);

  const allInventory: any[] = [];
  for (const whId of warehouseIds) {
    const result = await db.execute(sql`
      SELECT
        ${whId} as warehouse_id,
        woi.item_name,
        woi.item_code,
        woi.unit,
        SUM(CASE
          WHEN wo.destination_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN CAST(woi.quantity AS NUMERIC)
          WHEN wo.source_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN -CAST(woi.quantity AS NUMERIC)
          ELSE 0
        END) as current_quantity,
        SUM(CASE
          WHEN wo.destination_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN CAST(woi.total_cost AS NUMERIC)
          WHEN wo.source_warehouse_id = ${whId} AND wo.status = 'confirmed'
            THEN -CAST(woi.total_cost AS NUMERIC)
          ELSE 0
        END) as total_cost,
        MAX(wo.operation_date) as last_movement_date
      FROM warehouse_operation_items woi
      JOIN warehouse_operations wo ON wo.id = woi.operation_id
      WHERE wo.business_id = ${bizId}
      AND (wo.source_warehouse_id = ${whId} OR wo.destination_warehouse_id = ${whId})
      GROUP BY woi.item_name, woi.item_code, woi.unit
      HAVING SUM(CASE
        WHEN wo.destination_warehouse_id = ${whId} AND wo.status = 'confirmed'
          THEN CAST(woi.quantity AS NUMERIC)
        WHEN wo.source_warehouse_id = ${whId} AND wo.status = 'confirmed'
          THEN -CAST(woi.quantity AS NUMERIC)
        ELSE 0
      END) > 0
      ORDER BY woi.item_name
    `);
    const rows = normalizeDbResult(result);
    // === فلتر العناصر الوهمية: استبعاد العناصر بدون اسم أو بكمية صفر ===
    const filtered = (rows as any[]).filter((r: any) => {
      if (!r.item_name || r.item_name.trim() === '') return false;
      const qty = Number.parseFloat(String(r.current_quantity || 0));
      return qty > 0;
    });
    allInventory.push(...filtered);
  }

  // ملخص إجمالي
  const totalItems = allInventory.length;
  const totalQuantity = allInventory.reduce((sum, r) => sum + Number(r.current_quantity || 0), 0);
  const totalCost = allInventory.reduce((sum, r) => sum + Number(r.total_cost || 0), 0);

  return c.json({ items: allInventory, summary: { totalItems, totalQuantity, totalCost, warehouseCount: warehouseIds.length } });
}));

// === API ملخص العمليات المخزنية (لتبويب التقارير) ===
api.get('/businesses/:bizId/warehouse-operations-summary', bizAuthMiddleware(), safeHandler('ملخص العمليات المخزنية', async (c) => {
  const bizId = getBizId(c);
  const from = c.req.query('from') || c.req.query('dateFrom');
  const to = c.req.query('to') || c.req.query('dateTo');

  // التحقق من صحة التواريخ لمنع SQL Injection
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (from && !dateRegex.test(from)) return c.json({ error: 'تنسيق تاريخ البداية غير صالح (YYYY-MM-DD)' }, 400);
  if (to && !dateRegex.test(to)) return c.json({ error: 'تنسيق تاريخ النهاية غير صالح (YYYY-MM-DD)' }, 400);

  // استخدام parameterized queries بدلاً من دمج النصوص
  let query = sql`
    SELECT
      wo.operation_type,
      COUNT(*) as operation_count,
      SUM(CAST(wo.total_cost AS NUMERIC)) as total_cost,
      SUM(wo.total_items) as total_items
    FROM warehouse_operations wo
    WHERE wo.business_id = ${bizId} AND wo.status = 'confirmed'
  `;
  if (from) query = sql`${query} AND wo.operation_date >= ${from}`;
  if (to) query = sql`${query} AND wo.operation_date <= ${to}`;
  query = sql`${query} GROUP BY wo.operation_type ORDER BY operation_count DESC`;

  const result = await db.execute(query);
  const rows = normalizeDbResult(result);
  return c.json(rows);
}));

// ===================== محرك المخزون - Endpoints جديدة =====================

// أرصدة المخزون (مع تفاصيل لكل مخزن)
api.get('/businesses/:bizId/stock-levels', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('أرصدة المخزون', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = c.req.query('warehouseId') ? Number.parseInt(c.req.query('warehouseId')!) : undefined;
  const result = await getStockLevels(bizId, warehouseId);
  return c.json(result);
}));

// تنبيهات المخزون المنخفض
api.get('/businesses/:bizId/stock-alerts', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('تنبيهات المخزون', async (c) => {
  const bizId = getBizId(c);
  const alerts = await getLowStockAlerts(bizId);
  return c.json(alerts);
}));

// تقييم المخزون
api.get('/businesses/:bizId/stock-valuation', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('تقييم المخزون', async (c) => {
  const bizId = getBizId(c);
  const warehouseId = c.req.query('warehouseId') ? Number.parseInt(c.req.query('warehouseId')!) : undefined;
  const result = await getStockValuation(bizId, warehouseId);
  return c.json(result);
}));

// سجل حركات صنف
api.get('/businesses/:bizId/items/:itemId/movements', bizAuthMiddleware(), checkPermission('inventory', 'read'), safeHandler('حركات صنف', async (c) => {
  const bizId = getBizId(c);
  const itemId = parseId(c.req.param('itemId'));
  if (!itemId) return c.json({ error: 'معرّف الصنف غير صالح' }, 400);
  const limit = c.req.query('limit') ? Number.parseInt(c.req.query('limit')!) : 50;
  const movements = await getItemMovementHistory(bizId, itemId, limit);
  return c.json(movements);
}));

// تسجيل حركة مخزون عبر المحرك المركزي
api.post('/businesses/:bizId/stock-movements', bizAuthMiddleware(), checkPermission('inventory', 'create'), safeHandler('تسجيل حركة مخزون', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = await getBody(c);
  
  if (!body.itemId || !body.warehouseId || !body.movementType || !body.quantity || !body.movementDate) {
    return c.json({ error: 'البيانات المطلوبة: itemId, warehouseId, movementType, quantity, movementDate' }, 400);
  }

  const result = await processStockMovement(bizId, {
    ...body,
    createdBy: userId,
  });
  return c.json(result, 201);
}));

export default api;
