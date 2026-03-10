/**
 * مسارات الحسابات وروابط الحسابات المسموحة
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, and, inArray } from 'drizzle-orm';
import {
  accounts,
  accountBalances,
  accountAllowedLinks,
  bankTypes,
  eWalletTypes,
  exchangeTypes,
  funds,
  fundBalances,
  currencies,
  stations,
  employees,
  employeeBillingAccounts,
  billingSystemsConfig,
  accountingSubTypes,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { accountSchema, validateBody } from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId, validateRequired } from '../../middleware/helpers.ts';
import { TYPE_PREFIXES, buildAccountHierarchyCode, generateItemCode, getNextAccountSequence, getNextSequence } from '../../middleware/sequencing.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { getBizId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';

const accountsRoutes = new Hono();

function buildAccountCode(
  businessId: number,
  accountType: string,
  categorySequence: number,
  sequenceNumber: number,
): string {
  const hierarchy = buildAccountHierarchyCode(
    businessId,
    accountType,
    categorySequence,
    sequenceNumber,
  );
  return hierarchy || generateItemCode(TYPE_PREFIXES[accountType] || 'ACC', sequenceNumber);
}

async function resolveSubTypeInfo(
  bizId: number,
  accountType: string,
  rawSubTypeId: unknown,
  rawSubType: unknown,
): Promise<{ id: number; key: string; categorySequence: number } | null> {
  const parsedId = Number(rawSubTypeId);
  if (Number.isInteger(parsedId) && parsedId > 0) {
    if (accountType === 'bank') {
      const [row] = await db.select({ id: bankTypes.id, key: bankTypes.subTypeKey, seq: bankTypes.sequenceNumber }).from(bankTypes).where(and(eq(bankTypes.businessId, bizId), eq(bankTypes.id, parsedId))).limit(1);
      if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
    }
    if (accountType === 'exchange') {
      const [row] = await db.select({ id: exchangeTypes.id, key: exchangeTypes.subTypeKey, seq: exchangeTypes.sequenceNumber }).from(exchangeTypes).where(and(eq(exchangeTypes.businessId, bizId), eq(exchangeTypes.id, parsedId))).limit(1);
      if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
    }
    if (accountType === 'e_wallet') {
      const [row] = await db.select({ id: eWalletTypes.id, key: eWalletTypes.subTypeKey, seq: eWalletTypes.sequenceNumber }).from(eWalletTypes).where(and(eq(eWalletTypes.businessId, bizId), eq(eWalletTypes.id, parsedId))).limit(1);
      if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
    }
    if (accountType === 'accounting') {
      const [row] = await db
        .select({ id: accountingSubTypes.id, key: accountingSubTypes.subTypeKey, seq: accountingSubTypes.sequenceNumber })
        .from(accountingSubTypes)
        .where(and(eq(accountingSubTypes.businessId, bizId), eq(accountingSubTypes.id, parsedId)))
        .limit(1);
      if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
      return null;
    }
    return { id: parsedId, key: typeof rawSubType === 'string' ? rawSubType : '', categorySequence: 0 };
  }

  const subTypeKey = typeof rawSubType === 'string' ? rawSubType.trim() : '';
  if (!subTypeKey) return null;
  if (accountType === 'bank') {
    const [row] = await db.select({ id: bankTypes.id, key: bankTypes.subTypeKey, seq: bankTypes.sequenceNumber }).from(bankTypes).where(and(eq(bankTypes.businessId, bizId), eq(bankTypes.subTypeKey, subTypeKey))).limit(1);
    if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
  }
  if (accountType === 'exchange') {
    const [row] = await db.select({ id: exchangeTypes.id, key: exchangeTypes.subTypeKey, seq: exchangeTypes.sequenceNumber }).from(exchangeTypes).where(and(eq(exchangeTypes.businessId, bizId), eq(exchangeTypes.subTypeKey, subTypeKey))).limit(1);
    if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
  }
  if (accountType === 'e_wallet') {
    const [row] = await db.select({ id: eWalletTypes.id, key: eWalletTypes.subTypeKey, seq: eWalletTypes.sequenceNumber }).from(eWalletTypes).where(and(eq(eWalletTypes.businessId, bizId), eq(eWalletTypes.subTypeKey, subTypeKey))).limit(1);
    if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
  }
  if (accountType === 'accounting') {
    const [row] = await db
      .select({ id: accountingSubTypes.id, key: accountingSubTypes.subTypeKey, seq: accountingSubTypes.sequenceNumber })
      .from(accountingSubTypes)
      .where(and(eq(accountingSubTypes.businessId, bizId), eq(accountingSubTypes.subTypeKey, subTypeKey)))
      .limit(1);
    if (row) return { id: row.id, key: String(row.key), categorySequence: Number(row.seq) || 0 };
  }
  return null;
}

async function hasAnySubTypesForAccountType(bizId: number, accountType: string): Promise<boolean> {
  if (accountType === 'bank') {
    const [row] = await db.select({ id: bankTypes.id }).from(bankTypes).where(eq(bankTypes.businessId, bizId)).limit(1);
    return !!row?.id;
  }
  if (accountType === 'exchange') {
    const [row] = await db.select({ id: exchangeTypes.id }).from(exchangeTypes).where(eq(exchangeTypes.businessId, bizId)).limit(1);
    return !!row?.id;
  }
  if (accountType === 'e_wallet') {
    const [row] = await db.select({ id: eWalletTypes.id }).from(eWalletTypes).where(eq(eWalletTypes.businessId, bizId)).limit(1);
    return !!row?.id;
  }
  if (accountType === 'accounting') {
    const [row] = await db.select({ id: accountingSubTypes.id }).from(accountingSubTypes).where(eq(accountingSubTypes.businessId, bizId)).limit(1);
    return !!row?.id;
  }
  return true;
}

// ===================== الحسابات مع الصلاحيات =====================
accountsRoutes.get('/businesses/:bizId/accounts', bizAuthMiddleware(), safeHandler('جلب الحسابات', async (c) => {
  const bizId = getBizId(c);
  const includeAll = c.req.query('all') === 'true';

  const accountRows = await db.select().from(accounts).where(eq(accounts.businessId, bizId)).orderBy(accounts.accountType, accounts.subTypeId, accounts.sequenceNumber, accounts.name);

  const accountIds = accountRows.map(a => a.id);

  let balances: { accountId: number; currencyId: number | null; balance: string; currencyCode: string | null; currencySymbol: string | null; currencyName: string | null }[] = [];
  let allLinks: { fromAccountId: number; toAccountId: number; linkType: string }[] = [];

  if (accountIds.length > 0) {
    balances = await db.select({
      accountId: accountBalances.accountId,
      currencyId: accountBalances.currencyId,
      balance: accountBalances.balance,
      currencyCode: currencies.code,
      currencySymbol: currencies.symbol,
      currencyName: currencies.nameAr,
    }).from(accountBalances)
      .leftJoin(currencies, eq(accountBalances.currencyId, currencies.id))
      .where(inArray(accountBalances.accountId, accountIds)) as typeof balances;

    allLinks = await db.select().from(accountAllowedLinks)
      .where(and(eq(accountAllowedLinks.isActive, true), inArray(accountAllowedLinks.fromAccountId, accountIds)));
  }

  const balanceMap: Record<number, typeof balances> = {};
  for (const b of balances) {
    if (!balanceMap[b.accountId]) balanceMap[b.accountId] = [];
    balanceMap[b.accountId].push(b);
  }

  const linkMap: Record<number, typeof allLinks> = {};
  for (const l of allLinks) {
    if (!linkMap[l.fromAccountId]) linkMap[l.fromAccountId] = [];
    linkMap[l.fromAccountId].push(l);
  }

  const enrichedAccounts = accountRows.map(a => ({
    ...a,
    balances: balanceMap[a.id] || [],
    allowedLinks: linkMap[a.id] || [],
    _source: 'accounts' as const,
    _key: `accounts_${a.id}` as const,
  }));

  if (!includeAll) {
    return c.json(enrichedAccounts);
  }

  // 2. جلب الصناديق
  const fundRows = await db.select({
    id: funds.id,
    name: funds.name,
    fundType: funds.fundType,
    stationId: funds.stationId,
    responsiblePerson: funds.responsiblePerson,
    description: funds.description,
    isActive: funds.isActive,
    notes: funds.notes,
    createdAt: funds.createdAt,
    stationName: stations.name,
  }).from(funds)
    .leftJoin(stations, eq(funds.stationId, stations.id))
    .where(eq(funds.businessId, bizId))
    .orderBy(funds.fundType, funds.name);

  const fundIds = fundRows.map(f => f.id);
  let fBalances: { fundId: number; currencyId: number | null; balance: string; currencyCode: string | null; currencySymbol: string | null }[] = [];
  if (fundIds.length > 0) {
    fBalances = await db.select({
      fundId: fundBalances.fundId,
      currencyId: fundBalances.currencyId,
      balance: fundBalances.balance,
      currencyCode: currencies.code,
      currencySymbol: currencies.symbol,
    }).from(fundBalances)
      .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
      .where(inArray(fundBalances.fundId, fundIds)) as typeof fBalances;
  }
  const fBalanceMap: Record<number, typeof fBalances> = {};
  for (const b of fBalances) {
    if (!fBalanceMap[b.fundId]) fBalanceMap[b.fundId] = [];
    fBalanceMap[b.fundId].push(b);
  }

  const fundTypeLabels: Record<string, string> = {
    collection: 'تحصيل وتوريد',
    salary_advance: 'سلف',
    custody: 'عهدة',
    safe: 'خزنة',
    expense: 'مصروفات',
    deposit: 'إيداع',
    personal: 'شخصي',
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
    _key: `funds_${f.id}` as const,
  }));

  // 3. جلب حسابات الفوترة
  const billingRows = await db.select({
    id: employeeBillingAccounts.id,
    employeeId: employeeBillingAccounts.employeeId,
    stationId: employeeBillingAccounts.stationId,
    billingSystemId: employeeBillingAccounts.billingSystemId,
    billingSystemKey: billingSystemsConfig.systemKey,
    billingSystemName: billingSystemsConfig.name,
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
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId);

  const COLLECTION_METHOD_NAMES: Record<string, string> = {
    cash_mobile: 'تحصيل نقدي بالجوال',
    manual_assign: 'تحصيل إسناد يدوي',
    electronic: 'سداد إلكتروني',
    haseb_deposit: 'إيداع حاسب',
  };
  const billingAsAccounts = billingRows.map(b => {
    const sysKey = b.billingSystemKey || '';
    const sysName = b.billingSystemName || sysKey || '';
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
      billingSystemKey: sysKey,
      createdAt: null,
      balances: [],
      allowedLinks: [],
      _source: 'billing' as const,
      _key: `billing_${b.id}` as const,
    };
  });

  const stationRows = await db.select({ id: stations.id, name: stations.name })
    .from(stations)
    .where(eq(stations.businessId, bizId))
    .orderBy(stations.name);

  return c.json({
    accounts: [...enrichedAccounts, ...fundsAsAccounts, ...billingAsAccounts],
    stations: stationRows,
  });
}));

accountsRoutes.post('/businesses/:bizId/accounts', bizAuthMiddleware(), checkPermission('accounts', 'create'), safeHandler('إضافة حساب', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(accountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const { ...accountData } = validation.data as Record<string, unknown>;
  const allowedLinks = (body as { allowedLinks?: { toAccountId: number; linkType: string }[] }).allowedLinks;

  const accountType = typeof accountData.accountType === 'string' ? accountData.accountType : '';
  const resolvedSubType = await resolveSubTypeInfo(bizId, accountType, accountData.subTypeId, accountData.subType);
  if (!resolvedSubType || !Number.isInteger(resolvedSubType.id) || resolvedSubType.id <= 0) {
    const hasAny = await hasAnySubTypesForAccountType(bizId, accountType);
    return c.json({
      error: hasAny
        ? 'التصنيف المختار غير موجود. اختر تصنيفاً من القائمة.'
        : 'لا توجد تصنيفات لهذا النوع. أنشئ تصنيفاً أولاً ثم أضف الحساب.',
    }, 400);
  }
  const subTypeId = resolvedSubType.id;
  accountData.subTypeId = subTypeId;
  if (resolvedSubType.key) accountData.subType = resolvedSubType.key;

  let sequenceNumber = 0;
  if (accountType === 'bank') sequenceNumber = await getNextSequence(bizId, 'item_in_bank_type', subTypeId, 0);
  else if (accountType === 'exchange') sequenceNumber = await getNextSequence(bizId, 'item_in_exchange_type', subTypeId, 0);
  else if (accountType === 'e_wallet') sequenceNumber = await getNextSequence(bizId, 'item_in_ewallet_type', subTypeId, 0);
  else sequenceNumber = await getNextAccountSequence(bizId, accountType, subTypeId);
  accountData.sequenceNumber = sequenceNumber;
  accountData.code = (accountType === 'bank' || accountType === 'exchange' || accountType === 'e_wallet')
    ? buildAccountCode(bizId, accountType, Number(resolvedSubType.categorySequence) || 0, sequenceNumber)
    : generateItemCode(TYPE_PREFIXES[accountType] || 'ACC', sequenceNumber);

  const [created] = await db.insert(accounts).values({ ...accountData, businessId: bizId } as typeof accounts.$inferInsert).returning();

  if (allowedLinks && allowedLinks.length > 0 && created) {
    for (const link of allowedLinks) {
      await db.insert(accountAllowedLinks).values({
        fromAccountId: created.id,
        toAccountId: link.toAccountId,
        linkType: link.linkType,
      });
    }
  }
  return c.json(created, 201);
}));

accountsRoutes.put('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), safeHandler('تعديل حساب', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [existing] = await db.select().from(accounts).where(and(eq(accounts.id, id), eq(accounts.businessId, bizId)));
  if (!existing) return c.json({ error: 'حساب غير موجود أو لا ينتمي لهذا العمل' }, 404);
  const body = normalizeBody(await c.req.json()) as { allowedLinks?: { toAccountId: number; linkType: string }[]; [k: string]: unknown };
  const { allowedLinks, ...accountData } = body;
  const nextSubTypeId = accountData.subTypeId === undefined ? Number(existing.subTypeId) : Number(accountData.subTypeId);
  if (!Number.isInteger(nextSubTypeId) || nextSubTypeId <= 0) {
    return c.json({ error: 'التصنيف مطلوب ولا يمكن الحفظ بدون تصنيف' }, 400);
  }
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

accountsRoutes.delete('/businesses/:bizId/accounts/:id', bizAuthMiddleware(), checkPermission('accounts', 'delete'), safeHandler('حذف حساب', async (c) => {
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

accountsRoutes.put('/accounts/:id', safeHandler('تعديل حساب (legacy)', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json()) as { allowedLinks?: { toAccountId: number; linkType: string }[]; [k: string]: unknown };
  const { allowedLinks, ...accountData } = body;
  const nextSubTypeId = accountData.subTypeId === undefined ? Number(account.subTypeId) : Number(accountData.subTypeId);
  if (!Number.isInteger(nextSubTypeId) || nextSubTypeId <= 0) {
    return c.json({ error: 'التصنيف مطلوب ولا يمكن الحفظ بدون تصنيف' }, 400);
  }
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

accountsRoutes.delete('/accounts/:id', safeHandler('حذف حساب (legacy)', async (c) => {
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

accountsRoutes.get('/accounts/:id', safeHandler('جلب حساب بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const balRows = await db.select().from(accountBalances).where(eq(accountBalances.accountId, id));
  return c.json({ ...account, balances: balRows });
}));

accountsRoutes.get('/accounts/:id/allowed-links', safeHandler('جلب روابط الحسابات', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const links = await db.select({
    id: accountAllowedLinks.id,
    fromAccountId: accountAllowedLinks.fromAccountId,
    toAccountId: accountAllowedLinks.toAccountId,
    linkType: accountAllowedLinks.linkType,
    toAccountName: accounts.name,
    toAccountType: accounts.accountType,
  })
    .from(accountAllowedLinks)
    .leftJoin(accounts, eq(accountAllowedLinks.toAccountId, accounts.id))
    .where(eq(accountAllowedLinks.fromAccountId, id));
  return c.json(links);
}));

accountsRoutes.post('/account-links', safeHandler('إضافة رابط حساب', async (c) => {
  const body = normalizeBody(await c.req.json()) as { fromAccountId?: number; toAccountId?: number; linkType?: string };
  const reqErr = validateRequired(body, [
    { name: 'fromAccountId', label: 'حساب المصدر' },
    { name: 'toAccountId', label: 'حساب الهدف' },
    { name: 'linkType', label: 'نوع الرابط' },
  ]);
  if (reqErr) return c.json({ error: reqErr }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, body.fromAccountId!));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const [created] = await db.insert(accountAllowedLinks).values({
    fromAccountId: body.fromAccountId!,
    toAccountId: body.toAccountId!,
    linkType: body.linkType!,
  }).returning();
  return c.json(created, 201);
}));

accountsRoutes.delete('/account-links/:id', safeHandler('حذف رابط حساب', async (c) => {
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

accountsRoutes.get('/accounts/:id/allowed-targets', safeHandler('جلب الحسابات المسموحة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الحساب غير صالح' }, 400);
  const [account] = await db.select().from(accounts).where(eq(accounts.id, id));
  const err = await requireResourceOwnership(c, account ?? null);
  if (err) return err;
  const type = c.req.query('type') || 'payment';
  const links = await db.select({
    toAccountId: accountAllowedLinks.toAccountId,
    toAccountName: accounts.name,
    toAccountType: accounts.accountType,
  })
    .from(accountAllowedLinks)
    .leftJoin(accounts, eq(accountAllowedLinks.toAccountId, accounts.id))
    .where(and(eq(accountAllowedLinks.fromAccountId, id), eq(accountAllowedLinks.linkType, type)));
  return c.json(links);
}));

export default accountsRoutes;
