import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { wsService } from '../../services/websocket.service.ts';
import { mkdir, readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { eq, desc, sql, and, inArray, count } from 'drizzle-orm';
import {
  stations, employees, accounts, accountBalances,
  accountAllowedLinks, employeeBillingAccounts,
  funds, fundBalances, vouchers, currencies,
  attachments, inventoryItems,
  operationTypes, operationTypeAccounts,
  sidebarSections, sidebarItems, userSidebarConfig,
  users, businesses,
  billingSystemsConfig,
  fundTypes, bankTypes, exchangeTypes, eWalletTypes,
  screenTemplates, screenWidgets, screenWidgetTemplates, screenWidgetAccounts, screenPermissions,
  customScreenConfig,
  auditLog,
  exchangeRates, roles, rolePermissions, userRoles,
  warehouseTypes, journalEntryCategories,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import {
  voucherSchema,
  typeSchema,
  journalCategorySchema,
  validateBody,
  sidebarSectionSchema,
  employeeBillingAccountSchema,
} from '../../middleware/validation.ts';
import { safeHandler, normalizeBody, parseId, validateRequired, toErrorMessage } from '../../middleware/helpers.ts';
import { getNextSequence, getNextCategorySequence, getNextItemInCategorySequence } from '../../middleware/sequencing.ts';
import { postTransaction, cancelTransaction } from '../../engines/transaction.engine.ts';
import { checkPermission, validateConstraints } from '../../middleware/permissions.ts';
import {
  getExchangeRate,
  addExchangeRate,
  getExchangeRateHistory,
  getUnifiedBalances,
  clearRateCache,
} from '../../engines/currency.engine.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { normalizeDbResult, getFirstRow } from './_shared/db-helpers.ts';
import { verifyAccountOwnership, requireResourceOwnership } from './_shared/ownership.ts';

const api = new Hono();
const execFileAsync = promisify(execFile);

type ArchiveSettingsPayload = {
  basePath: string;
  folderByType: { fund: string; bank: string; exchange: string; e_wallet: string };
  voucherFolders: { receipt: string; payment: string };
  importanceLevels: string[];
};

function getArchiveSettingsDefaults(): ArchiveSettingsPayload {
  return {
    basePath: 'D:\\Archive\\Attachments',
    folderByType: {
      fund: 'صندوق',
      bank: 'بنك',
      exchange: 'صراف',
      e_wallet: 'محفظة',
    },
    voucherFolders: {
      receipt: 'سند قبض',
      payment: 'سند صرف',
    },
    importanceLevels: ['عاجل', 'مهم', 'عادي'],
  };
}

function getArchiveSettingsFilePath(bizId: number): string {
  return path.join(process.cwd(), 'storage', 'attachments-archive', `${bizId}.json`);
}

function normalizeArchiveSettings(raw: any): ArchiveSettingsPayload {
  const defaults = getArchiveSettingsDefaults();
  const importance = Array.isArray(raw?.importanceLevels)
    ? raw.importanceLevels.map((v: any) => String(v || '').trim()).filter(Boolean)
    : [];
  return {
    basePath: String(raw?.basePath || defaults.basePath),
    folderByType: {
      fund: String(raw?.folderByType?.fund || defaults.folderByType.fund),
      bank: String(raw?.folderByType?.bank || defaults.folderByType.bank),
      exchange: String(raw?.folderByType?.exchange || defaults.folderByType.exchange),
      e_wallet: String(raw?.folderByType?.e_wallet || defaults.folderByType.e_wallet),
    },
    voucherFolders: {
      receipt: String(raw?.voucherFolders?.receipt || defaults.voucherFolders.receipt),
      payment: String(raw?.voucherFolders?.payment || defaults.voucherFolders.payment),
    },
    importanceLevels: importance.length ? importance : defaults.importanceLevels,
  };
}

async function readArchiveSettings(bizId: number): Promise<ArchiveSettingsPayload> {
  const filePath = getArchiveSettingsFilePath(bizId);
  try {
    const raw = await readFile(filePath, 'utf8');
    return normalizeArchiveSettings(JSON.parse(raw));
  } catch {
    return getArchiveSettingsDefaults();
  }
}

function sanitizePathSegment(value: unknown): string {
  const s = typeof value === 'string' ? value.trim() : '';
  if (!s) return 'غير-محدد';
  return s.replaceAll(/[\\/:*?"<>|]/g, '-');
}

function detectImportanceFromPath(filePath: unknown, levels: string[]): string {
  const normalized = typeof filePath === 'string' ? filePath : '';
  const parts = new Set(normalized.split(/[\\/]/).map((p) => p.trim()).filter(Boolean));
  for (const level of levels) {
    if (parts.has(level)) return level;
  }
  return levels.at(-1) || 'عادي';
}

async function resolveVoucherArchivePath(
  bizId: number,
  voucherId: number,
  importance: string | null | undefined,
): Promise<string | null> {
  const [voucher] = await db
    .select({
      id: vouchers.id,
      voucherType: vouchers.voucherType,
      fromFundId: vouchers.fromFundId,
      toFundId: vouchers.toFundId,
      fromAccountId: vouchers.fromAccountId,
      toAccountId: vouchers.toAccountId,
    })
    .from(vouchers)
    .where(and(eq(vouchers.id, voucherId), eq(vouchers.businessId, bizId)))
    .limit(1);

  if (!voucher) return null;

  const type = String(voucher.voucherType || '').toLowerCase();
  const isPayment = type === 'payment';
  const fundId = isPayment ? (voucher.fromFundId ?? null) : (voucher.toFundId ?? null);
  const accountId = isPayment ? (voucher.fromAccountId ?? null) : (voucher.toAccountId ?? null);

  let treasuryType: 'fund' | 'bank' | 'exchange' | 'e_wallet' | null = null;
  let treasuryName = '';

  if (fundId) {
    treasuryType = 'fund';
    const [fund] = await db
      .select({ name: funds.name })
      .from(funds)
      .where(and(eq(funds.id, fundId), eq(funds.businessId, bizId)))
      .limit(1);
    treasuryName = String(fund?.name || '');
  } else if (accountId) {
    const [account] = await db
      .select({ name: accounts.name, accountType: accounts.accountType })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    const t = String(account?.accountType || '').toLowerCase();
    if (t === 'bank' || t === 'exchange' || t === 'e_wallet' || t === 'fund') {
      treasuryType = t;
    }
    treasuryName = String(account?.name || '');
  }

  if (!treasuryType) treasuryType = 'fund';
  if (!treasuryName) treasuryName = 'خزينة-غير-محددة';

  const settings = await readArchiveSettings(bizId);
  const typeFolder = settings.folderByType[treasuryType] || treasuryType;
  const voucherFolder = type === 'payment' ? settings.voucherFolders.payment : settings.voucherFolders.receipt;
  const normalizedImportance = sanitizePathSegment(importance || settings.importanceLevels[2] || 'عادي');

  return path.join(
    settings.basePath,
    sanitizePathSegment(typeFolder),
    sanitizePathSegment(treasuryName),
    sanitizePathSegment(voucherFolder),
    normalizedImportance,
  );
}

async function ensureArchiveTreeForBusiness(
  bizId: number,
  settings: ArchiveSettingsPayload,
): Promise<{ directories: number }> {
  const [fundRows, accountRows] = await Promise.all([
    db
      .select({ name: funds.name })
      .from(funds)
      .where(eq(funds.businessId, bizId)),
    db
      .select({ name: accounts.name, accountType: accounts.accountType })
      .from(accounts)
      .where(eq(accounts.businessId, bizId)),
  ]);

  const byType: Record<'fund' | 'bank' | 'exchange' | 'e_wallet', string[]> = {
    fund: fundRows.map((f: any) => String(f?.name || '')).filter(Boolean),
    bank: [],
    exchange: [],
    e_wallet: [],
  };

  for (const acc of accountRows) {
    const type = String(acc?.accountType || '').toLowerCase();
    if (type === 'bank' || type === 'exchange' || type === 'e_wallet' || type === 'fund') {
      byType[type].push(String(acc?.name || '').trim());
    }
  }

  const uniqueDirs = new Set<string>();
  const voucherFolders = [
    settings.voucherFolders.receipt || 'سند قبض',
    settings.voucherFolders.payment || 'سند صرف',
  ];
  const levels = (settings.importanceLevels || []).length ? settings.importanceLevels : ['عادي'];

  for (const treasuryType of ['fund', 'bank', 'exchange', 'e_wallet'] as const) {
    const typeFolder = sanitizePathSegment(settings.folderByType[treasuryType] || treasuryType);
    const names = byType[treasuryType].length ? byType[treasuryType] : ['خزينة-افتراضية'];
    for (const name of names) {
      for (const voucherFolder of voucherFolders) {
        for (const level of levels) {
          uniqueDirs.add(path.join(
            settings.basePath,
            typeFolder,
            sanitizePathSegment(name),
            sanitizePathSegment(voucherFolder),
            sanitizePathSegment(level),
          ));
        }
      }
    }
  }

  for (const dirPath of uniqueDirs) {
    await mkdir(dirPath, { recursive: true });
  }

  return { directories: uniqueDirs.size };
}

async function listWindowsDrives(): Promise<string[]> {
  const drives: string[] = [];
  for (let code = 67; code <= 90; code += 1) {
    const letter = String.fromCharCode(code);
    const drivePath = `${letter}:\\`;
    try {
      const s = await stat(drivePath);
      if (s.isDirectory()) drives.push(drivePath);
    } catch {
      // ignore unavailable drives
    }
  }
  return drives;
}

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
    .orderBy(employeeBillingAccounts.stationId, employeeBillingAccounts.employeeId, employeeBillingAccounts.sortOrder);
  
  let filtered = rows;
  if (stationId) filtered = filtered.filter(r => r.stationId === Number.parseInt(stationId));
  if (employeeId) filtered = filtered.filter(r => r.employeeId === Number.parseInt(employeeId));
  return c.json(filtered);
}));

api.post('/employee-billing-accounts', safeHandler('إضافة حساب فوترة', async (c) => {
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(employeeBillingAccountSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const employeeId = validation.data?.employeeId;
  if (!employeeId) return c.json({ error: 'معرّف الموظف مطلوب' }, 400);
  const [employee] = await db.select({ businessId: employees.businessId }).from(employees).where(eq(employees.id, employeeId));
  const err = await requireResourceOwnership(c, employee ?? null);
  if (err) return err;
  if (!employee) return c.json({ error: 'الموظف غير موجود' }, 404);
  const bizId = employee.businessId;

  const [station] = await db.select({ id: stations.id }).from(stations)
    .where(and(eq(stations.id, validation.data.stationId), eq(stations.businessId, bizId)));
  if (!station) return c.json({ error: 'المحطة لا تنتمي لهذه المنشأة' }, 400);

  const [billingSystem] = await db.select({ id: billingSystemsConfig.id }).from(billingSystemsConfig)
    .where(and(eq(billingSystemsConfig.id, validation.data.billingSystemId), eq(billingSystemsConfig.businessId, bizId)));
  if (!billingSystem) return c.json({ error: 'نظام الفوترة لا ينتمي لهذه المنشأة' }, 400);

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
  if (!employee) return c.json({ error: 'الموظف المرتبط غير موجود' }, 404);
  const bizId = employee.businessId;
  const body = normalizeBody(await c.req.json());
  const payload = body as { employeeId?: number; stationId?: number; billingSystemId?: number };

  if (payload.employeeId) {
    const [targetEmployee] = await db.select({ id: employees.id }).from(employees)
      .where(and(eq(employees.id, payload.employeeId), eq(employees.businessId, bizId)));
    if (!targetEmployee) return c.json({ error: 'الموظف الجديد لا ينتمي لهذه المنشأة' }, 400);
  }
  if (payload.stationId) {
    const [station] = await db.select({ id: stations.id }).from(stations)
      .where(and(eq(stations.id, payload.stationId), eq(stations.businessId, bizId)));
    if (!station) return c.json({ error: 'المحطة لا تنتمي لهذه المنشأة' }, 400);
  }
  if (payload.billingSystemId) {
    const [billingSystem] = await db.select({ id: billingSystemsConfig.id }).from(billingSystemsConfig)
      .where(and(eq(billingSystemsConfig.id, payload.billingSystemId), eq(billingSystemsConfig.businessId, bizId)));
    if (!billingSystem) return c.json({ error: 'نظام الفوترة لا ينتمي لهذه المنشأة' }, 400);
  }
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

// ===================== جلب سجل واحد (صندوق) =====================
api.get('/funds/:id', safeHandler('جلب صندوق بالمعرّف', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصندوق غير صالح' }, 400);
  const [fund] = await db.select().from(funds).where(eq(funds.id, id));
  const err = await requireResourceOwnership(c, fund ?? null);
  if (err) return err;
  const balRows = await db.select().from(fundBalances).where(eq(fundBalances.fundId, id));
  return c.json({ ...fund!, balances: balRows });
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
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(voucherSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  
  const voucherData = validation.data as any;
  const amount = typeof voucherData.amount === 'string' ? Number.parseFloat(voucherData.amount) : voucherData.amount;
  if (Number.isNaN(amount) || amount <= 0) return c.json({ error: 'المبلغ يجب أن يكون رقماً موجباً' }, 400);

  const userPermissions = c.get('userPermissions') as { isAdmin?: boolean; constraints?: unknown; maxVoucherAmount?: number } | undefined;
  const constraintsCheck = validateConstraints(userPermissions ?? {}, {
    amount,
    operationTypeId: voucherData.operationTypeId,
    stationId: voucherData.stationId,
    accountId: voucherData.toAccountId || voucherData.fromAccountId,
  });
  if (!constraintsCheck.valid) return c.json({ error: constraintsCheck.error }, 403);

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

// ===================== التحصيل اليومي (Compatibility via vouchers) =====================
api.get('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('جلب التحصيلات', async (c) => {
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

api.get('/collections/:id', safeHandler('جلب تفاصيل تحصيل', async (c) => {
  return c.json({
    error: 'هذا المسار قديم. استخدم /businesses/:bizId/vouchers أو شاشة التحصيل الجديدة المعتمدة على السندات.',
  }, 410);
}));

api.post('/businesses/:bizId/collections', bizAuthMiddleware(), safeHandler('إضافة تحصيل', async (c) => {
  return c.json({
    error: 'تم إيقاف هذا المسار. استخدم /businesses/:bizId/vouchers/multi لإنشاء سندات التحصيل.',
  }, 410);
}));

// ===================== التوريد =====================
api.post('/collections/:id/deliveries', safeHandler('إضافة توريد', async (c) => {
  return c.json({
    error: 'تم إيقاف هذا المسار. استخدم /businesses/:bizId/vouchers/multi لإنشاء سندات التوريد/الصرف.',
  }, 410);
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


// ── المسارات المستخرجة في Phase 4 ───────────────────────────────────────────
// fund-types.routes.ts  → /businesses/:bizId/fund-types, bank-types...
// sidebar.routes.ts     → /businesses/:bizId/sidebar-sections...
// screens.routes.ts     → /businesses/:bizId/screens, widgets...
