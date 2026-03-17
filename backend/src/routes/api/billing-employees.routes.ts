/**
 * billing-employees.routes.ts — Phase 10
 * حسابات الموظفين في أنظمة الفوترة (مستخرجة من api.rest.ts)
 */
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


export { api as billingEmployeesRoutes };
