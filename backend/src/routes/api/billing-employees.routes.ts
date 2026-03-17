/**
 * billing-employees.routes.ts — Phase 15 (thin wrapper)
 * يُجمع مسارات فوترة الموظفين وإعدادات الفوترة
 */
import { Hono } from 'hono';
import { db } from '../db/index.ts';
import { eq, and, sql } from 'drizzle-orm';
import {
  businesses, billingSystemsConfig, billingPeriods,
  employees, stations, users,
} from '../db/schema/index.ts';
import { bizAuthMiddleware } from '../middleware/bizAuth.ts';
import { safeHandler, parseId, normalizeBody } from '../middleware/helpers.ts';
import { getBizId, getUserId } from './api/_shared/context-helpers.ts';
import { billingAccountsApi } from './billing-accounts.routes.ts';

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

api.route('/', billingAccountsApi);

export { api as billingEmployeesRoutes };
