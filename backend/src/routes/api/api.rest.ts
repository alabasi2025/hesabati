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
import { postTransaction, cancelTransaction } from '../../services/transaction.service.ts';
import { checkPermission, validateConstraints } from '../../middleware/permissions.ts';
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

// ===================== أنواع الصناديق =====================
async function getNextUniqueFundTypeSequence(bizId: number): Promise<number> {
  const rows = await db
    .select({ sequenceNumber: fundTypes.sequenceNumber })
    .from(fundTypes)
    .where(eq(fundTypes.businessId, bizId));
  const maxSeq = rows.reduce((m, r) => {
    const seq = Number(r.sequenceNumber);
    if (!Number.isInteger(seq) || seq <= 0) return m;
    return Math.max(m, seq);
  }, 0);
  return maxSeq + 1;
}

api.get('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('جلب أنواع الصناديق', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(fundTypes).where(eq(fundTypes.businessId, bizId)).orderBy(fundTypes.sequenceNumber, fundTypes.sortOrder, fundTypes.id);
  return c.json(rows);
}));

api.post('/businesses/:bizId/fund-types', bizAuthMiddleware(), safeHandler('إضافة نوع صندوق', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(typeSchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);

  const payload = validation.data as { subTypeKey: string };
  const [existingKey] = await db
    .select({ id: fundTypes.id })
    .from(fundTypes)
    .where(and(eq(fundTypes.businessId, bizId), eq(fundTypes.subTypeKey, payload.subTypeKey)));
  if (existingKey) return c.json({ error: 'مفتاح التصنيف موجود مسبقاً لهذا العمل' }, 400);

  const seqNum = await getNextUniqueFundTypeSequence(bizId);
  const [created] = await db.insert(fundTypes).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/fund-types/:id', safeHandler('تعديل نوع صندوق', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف النوع غير صالح' }, 400);
  const [rec] = await db.select().from(fundTypes).where(eq(fundTypes.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  if (typeof (body as any).sequenceNumber !== 'undefined') {
    const nextSeq = Number((body as any).sequenceNumber);
    if (!Number.isInteger(nextSeq) || nextSeq <= 0) {
      return c.json({ error: 'رقم التصنيف غير صالح' }, 400);
    }
    const [dupSeq] = await db
      .select({ id: fundTypes.id })
      .from(fundTypes)
      .where(and(eq(fundTypes.businessId, rec!.businessId), eq(fundTypes.sequenceNumber, nextSeq)));
    if (dupSeq && dupSeq.id !== id) {
      return c.json({ error: 'رقم التصنيف مستخدم مسبقاً داخل نفس العمل' }, 400);
    }
  }

  if (typeof (body as any).subTypeKey === 'string' && (body as any).subTypeKey.trim()) {
    const nextKey = (body as any).subTypeKey.trim();
    const [dupKey] = await db
      .select({ id: fundTypes.id })
      .from(fundTypes)
      .where(and(eq(fundTypes.businessId, rec!.businessId), eq(fundTypes.subTypeKey, nextKey)));
    if (dupKey && dupKey.id !== id) {
      return c.json({ error: 'مفتاح التصنيف مستخدم مسبقاً داخل نفس العمل' }, 400);
    }
  }

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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
  
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
  
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
  const body = normalizeBody(await c.req.json());
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
  const bizId = getBizId(c);
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  
  // التحقق من وجود الشاشة
  const [screen] = await db.select().from(screenTemplates).where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));
  if (!screen) return c.json({ error: 'الشاشة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  
  const body = normalizeBody(await c.req.json());
  
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
      AND (ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%')
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
      AND (ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%')
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
      je.category as operation_category
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
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
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
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_payments,
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
      ot.color as operation_type_color, ot.voucher_type, je.category as operation_category
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
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
  if (!body.entityType || !body.entityId || !body.fileName) {
    return c.json({ error: 'entityType, entityId, fileName مطلوبة' }, 400);
  }

  const entityType = String(body.entityType || '').trim();
  const entityId = Number.parseInt(String(body.entityId || ''), 10);
  if (!entityType || !Number.isInteger(entityId) || entityId <= 0) {
    return c.json({ error: 'entityType أو entityId غير صالح' }, 400);
  }

  const providedPath = String(body.filePath || body.fileUrl || '').trim();
  let finalPath = providedPath;
  if (!finalPath && entityType === 'voucher') {
    finalPath = (await resolveVoucherArchivePath(bizId, entityId, body.importance)) || '';
  }
  if (finalPath) {
    await mkdir(finalPath, { recursive: true });
  }

  const [created] = await db.insert(attachments).values({
    entityType,
    entityId,
    fileName: body.fileName,
    filePath: finalPath,
    fileSize: body.fileSize || 0, fileType: body.fileType || body.mimeType || 'application/octet-stream',
    description: body.description || null,
    uploadedBy: userId,
  }).returning();
  // سجل التدقيق
  await db.insert(auditLog).values({
    userId, businessId: bizId, action: 'upload_attachment',
    tableName: 'attachments', recordId: created.id,
    newData: { entityType, entityId, fileName: body.fileName, filePath: finalPath, importance: body.importance || null },
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

api.get('/businesses/:bizId/attachments-archive-settings', bizAuthMiddleware(), safeHandler('جلب إعدادات الأرشفة الإلكترونية', async (c) => {
  const bizId = getBizId(c);
  const filePath = getArchiveSettingsFilePath(bizId);
  try {
    const raw = await readFile(filePath, 'utf8');
    return c.json(normalizeArchiveSettings(JSON.parse(raw)));
  } catch {
    return c.json(getArchiveSettingsDefaults());
  }
}));

api.put('/businesses/:bizId/attachments-archive-settings', bizAuthMiddleware(), safeHandler('حفظ إعدادات الأرشفة الإلكترونية', async (c) => {
  const bizId = getBizId(c);
  const userId = getUserId(c);
  const body = normalizeBody(await c.req.json());
  const normalized = normalizeArchiveSettings(body);
  const filePath = getArchiveSettingsFilePath(bizId);
  const dir = path.dirname(filePath);
  await mkdir(dir, { recursive: true });
  await writeFile(filePath, JSON.stringify(normalized, null, 2), 'utf8');
  const treeResult = await ensureArchiveTreeForBusiness(bizId, normalized);
  await db.insert(auditLog).values({
    userId,
    businessId: bizId,
    action: 'update_attachment_archive_settings',
    tableName: 'businesses',
    recordId: bizId,
    oldData: null,
    newData: { ...normalized, treeResult } as any,
  });
  return c.json({ ...normalized, treeResult });
}));

api.post('/businesses/:bizId/attachments-archive-build', bizAuthMiddleware(), safeHandler('إنشاء شجرة الأرشفة تلقائياً', async (c) => {
  const bizId = getBizId(c);
  const settings = await readArchiveSettings(bizId);
  const treeResult = await ensureArchiveTreeForBusiness(bizId, settings);
  return c.json({ success: true, treeResult });
}));

api.post('/businesses/:bizId/attachments-archive-pick-folder', bizAuthMiddleware(), safeHandler('اختيار مجلد الأرشفة من الجهاز', async (c) => {
  const platform = process.platform;
  if (platform !== 'win32') {
    return c.json({ error: 'اختيار المجلد من النظام مدعوم حالياً على ويندوز فقط' }, 400);
  }

  const script = [
    "Add-Type -AssemblyName System.Windows.Forms",
    "$dialog = New-Object System.Windows.Forms.FolderBrowserDialog",
    "$dialog.Description = 'اختر مجلد الأرشفة'",
    "$dialog.UseDescriptionForTitle = $true",
    "$dialog.ShowNewFolderButton = $true",
    "if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {",
    "  [Console]::OutputEncoding = [System.Text.Encoding]::UTF8",
    "  Write-Output $dialog.SelectedPath",
    "}",
  ].join('; ');

  let stdout = '';
  let stderr = '';
  try {
    const out = await execFileAsync(
      'powershell.exe',
      [
        '-NoProfile',
        '-STA',
        '-ExecutionPolicy',
        'Bypass',
        '-Command',
        script,
      ],
      { windowsHide: false, timeout: 120000 }
    );
    stdout = out.stdout || '';
    stderr = out.stderr || '';
  } catch (err: any) {
    const msg = String(err?.stderr || err?.message || 'تعذر فتح نافذة اختيار المجلد');
    return c.json({ error: msg }, 500);
  }

  const selectedPath = String(stdout || '').trim();
  if (!selectedPath && String(stderr || '').trim()) {
    return c.json({ error: String(stderr).trim() }, 500);
  }
  return c.json({ selectedPath, cancelled: !selectedPath });
}));

api.get('/businesses/:bizId/attachments-archive-fs', bizAuthMiddleware(), safeHandler('استعراض مجلدات الجهاز للأرشفة', async (c) => {
  if (process.platform !== 'win32') {
    return c.json({ error: 'استعراض ملفات النظام مدعوم حالياً على ويندوز فقط' }, 400);
  }

  const requestedPath = String(c.req.query('path') || '').trim();
  if (!requestedPath) {
    const drives = await listWindowsDrives();
    return c.json({
      currentPath: '',
      parentPath: null,
      entries: drives.map((d) => ({ name: d, fullPath: d, isDirectory: true })),
    });
  }

  const currentPath = path.normalize(requestedPath);
  let s: Awaited<ReturnType<typeof stat>>;
  try {
    s = await stat(currentPath);
  } catch {
    return c.json({ error: 'المسار غير موجود' }, 404);
  }
  if (!s.isDirectory()) return c.json({ error: 'المسار ليس مجلدًا' }, 400);

  const rows = await readdir(currentPath, { withFileTypes: true });
  const entries = rows
    .filter((r) => r.isDirectory())
    .map((r) => ({
      name: r.name,
      fullPath: path.join(currentPath, r.name),
      isDirectory: true,
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ar'));

  const parentPath = path.dirname(currentPath);
  const normalizedParent = parentPath === currentPath ? null : parentPath;
  return c.json({ currentPath, parentPath: normalizedParent, entries });
}));

api.post('/businesses/:bizId/attachments-archive-fs/mkdir', bizAuthMiddleware(), safeHandler('إنشاء مجلد داخل مستكشف الأرشفة', async (c) => {
  if (process.platform !== 'win32') {
    return c.json({ error: 'إنشاء المجلد مدعوم حالياً على ويندوز فقط' }, 400);
  }

  const body = normalizeBody(await c.req.json());
  const parentPath = String(body.path || '').trim();
  const folderName = String(body.name || '').trim();
  if (!parentPath || !folderName) {
    return c.json({ error: 'path و name مطلوبان' }, 400);
  }

  if (folderName.includes('\\') || folderName.includes('/') || folderName.includes('..')) {
    return c.json({ error: 'اسم المجلد غير صالح' }, 400);
  }

  const normalizedParent = path.normalize(parentPath);
  let parentStat: Awaited<ReturnType<typeof stat>>;
  try {
    parentStat = await stat(normalizedParent);
  } catch {
    return c.json({ error: 'المسار الأب غير موجود' }, 404);
  }
  if (!parentStat.isDirectory()) return c.json({ error: 'المسار الأب ليس مجلدًا' }, 400);

  const targetPath = path.join(normalizedParent, folderName);
  await mkdir(targetPath, { recursive: true });
  return c.json({ success: true, createdPath: targetPath });
}));

api.get('/businesses/:bizId/attachments-archive-items', bizAuthMiddleware(), safeHandler('جلب عناصر أرشفة المرفقات', async (c) => {
  const bizId = getBizId(c);
  const qSearch = String(c.req.query('search') || '').trim().toLowerCase();
  const qVoucherType = String(c.req.query('voucherType') || '').trim().toLowerCase();
  const qTreasuryType = String(c.req.query('treasuryType') || '').trim().toLowerCase();
  const qImportance = String(c.req.query('importance') || '').trim();
  const settings = await readArchiveSettings(bizId);

  const result = await db.execute(sql`
    SELECT
      a.id, a.entity_type, a.entity_id, a.file_name, a.file_path, a.file_type, a.description, a.created_at,
      v.voucher_number, v.voucher_type, v.from_fund_id, v.to_fund_id, v.from_account_id, v.to_account_id,
      ff.name AS from_fund_name, tf.name AS to_fund_name,
      fa.name AS from_account_name, fa.account_type AS from_account_type,
      ta.name AS to_account_name, ta.account_type AS to_account_type
    FROM attachments a
    LEFT JOIN vouchers v ON a.entity_type = 'voucher' AND v.id = a.entity_id
    LEFT JOIN funds ff ON ff.id = v.from_fund_id
    LEFT JOIN funds tf ON tf.id = v.to_fund_id
    LEFT JOIN accounts fa ON fa.id = v.from_account_id
    LEFT JOIN accounts ta ON ta.id = v.to_account_id
    WHERE a.entity_type = 'voucher' AND v.business_id = ${bizId}
    ORDER BY a.created_at DESC
  `);

  const rows = normalizeDbResult(result).map((row: any) => {
    const voucherType = String(row.voucher_type || '').toLowerCase();
    let treasuryType = String(row.to_account_type || row.from_account_type || '').toLowerCase();
    if (row.to_fund_id || row.from_fund_id) {
      treasuryType = 'fund';
    }
    const treasuryName = String(
      row.to_fund_name ||
      row.from_fund_name ||
      row.to_account_name ||
      row.from_account_name ||
      '-'
    );
    const importance = detectImportanceFromPath(row.file_path, settings.importanceLevels);
    return {
      id: row.id,
      fileName: row.file_name,
      filePath: row.file_path,
      fileType: row.file_type,
      description: row.description,
      createdAt: row.created_at,
      voucherNumber: row.voucher_number,
      voucherType,
      treasuryType,
      treasuryName,
      importance,
    };
  }).filter((row: any) => {
    if (qVoucherType && row.voucherType !== qVoucherType) return false;
    if (qTreasuryType && row.treasuryType !== qTreasuryType) return false;
    if (qImportance && row.importance !== qImportance) return false;
    if (!qSearch) return true;
    const hay = `${row.fileName} ${row.filePath} ${row.voucherNumber || ''} ${row.treasuryName || ''}`.toLowerCase();
    return hay.includes(qSearch);
  });

  return c.json(rows);
}));

api.post('/businesses/:bizId/attachments/:id/rebuild-path', bizAuthMiddleware(), safeHandler('إعادة توليد مسار المرفق', async (c) => {
  const bizId = getBizId(c);
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف المرفق غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [existing] = await db.select().from(attachments).where(eq(attachments.id, id));
  if (!existing) return c.json({ error: 'المرفق غير موجود' }, 404);
  if (String(existing.entityType) !== 'voucher') return c.json({ error: 'إعادة التوليد تدعم مرفقات السندات فقط حالياً' }, 400);

  const settings = await readArchiveSettings(bizId);
  const importance = String(body.importance || detectImportanceFromPath(existing.filePath, settings.importanceLevels));
  const nextPath = await resolveVoucherArchivePath(bizId, existing.entityId, importance);
  if (!nextPath) return c.json({ error: 'تعذر تحديد السند المرتبط بهذا المرفق' }, 400);
  await mkdir(nextPath, { recursive: true });

  const [updated] = await db
    .update(attachments)
    .set({ filePath: nextPath })
    .where(eq(attachments.id, id))
    .returning();

  return c.json({ ...updated, importance });
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

  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
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
  const body = normalizeBody(await c.req.json());
  const validation = validateBody(journalCategorySchema, body);
  if (!validation.success) return c.json({ error: validation.error }, 400);
  const seqNum = await getNextCategorySequence(bizId, 'journal');
  const [created] = await db.insert(journalEntryCategories).values({ ...validation.data, businessId: bizId, sequenceNumber: seqNum }).returning();
  return c.json(created, 201);
}));

api.put('/journal-entry-categories/:id', safeHandler('تعديل تصنيف قيد يومية', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف التصنيف غير صالح' }, 400);
  const [rec] = await db.select().from(journalEntryCategories).where(eq(journalEntryCategories.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
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

export default api;
