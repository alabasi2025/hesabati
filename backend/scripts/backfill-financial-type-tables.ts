import 'dotenv/config';
import { eq } from 'drizzle-orm';
import { db } from '../src/db/index.ts';
import {
  accounts,
  funds,
  fundTypes,
  bankTypes,
  exchangeTypes,
  eWalletTypes,
} from '../src/db/schema/index.ts';

function normalizeKey(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const key = value.trim();
  return key || null;
}

function fundTypeName(key: string): string {
  const map: Record<string, string> = {
    collection: 'تحصيل',
    salary_advance: 'سلف موظفين',
    custody: 'عهد',
    safe: 'خزنة',
    expense: 'مصروفات',
    deposit: 'إيداع',
  };
  return map[key] ?? key;
}

function bankTypeName(key: string): string {
  const map: Record<string, string> = {
    current: 'حساب جاري',
    saving: 'حساب توفير',
    islamic: 'حساب إسلامي',
  };
  return map[key] ?? key;
}

function exchangeTypeName(key: string): string {
  const map: Record<string, string> = {
    local: 'محلي',
    external: 'خارجي',
  };
  return map[key] ?? key;
}

function walletTypeName(key: string): string {
  const map: Record<string, string> = {
    mobile_money: 'محفظة جوال',
    card_wallet: 'محفظة بطاقة',
  };
  return map[key] ?? key;
}

async function ensureFundTypes() {
  const source = await db.select({ businessId: funds.businessId, key: funds.fundType }).from(funds);
  const byBiz = new Map<number, Set<string>>();
  for (const row of source) {
    const key = normalizeKey(row.key);
    if (!key) continue;
    let keys = byBiz.get(row.businessId);
    if (!keys) {
      keys = new Set<string>();
      byBiz.set(row.businessId, keys);
    }
    keys.add(key);
  }

  let created = 0;
  for (const [businessId, keys] of byBiz.entries()) {
    const existing = await db
      .select({ key: fundTypes.subTypeKey, sequenceNumber: fundTypes.sequenceNumber })
      .from(fundTypes)
      .where(eq(fundTypes.businessId, businessId));
    const existingKeys = new Set(existing.map((e) => e.key));
    let nextSeq = Math.max(0, ...existing.map((e) => Number(e.sequenceNumber) || 0));

    for (const key of keys) {
      if (existingKeys.has(key)) continue;
      nextSeq += 1;
      await db.insert(fundTypes).values({
        businessId,
        name: fundTypeName(key),
        subTypeKey: key,
        sequenceNumber: nextSeq,
        sortOrder: nextSeq,
        isActive: true,
      });
      created += 1;
    }
  }
  return created;
}

async function ensureAccountTypesFor(
  accountType: 'bank' | 'exchange' | 'e_wallet',
  table: typeof bankTypes | typeof exchangeTypes | typeof eWalletTypes,
  icon: string,
  color: string,
  nameFactory: (key: string) => string,
) {
  const source = await db
    .select({ businessId: accounts.businessId, key: accounts.subType })
    .from(accounts)
    .where(eq(accounts.accountType, accountType));

  const byBiz = new Map<number, Set<string>>();
  for (const row of source) {
    const key = normalizeKey(row.key);
    if (!key) continue;
    let keys = byBiz.get(row.businessId);
    if (!keys) {
      keys = new Set<string>();
      byBiz.set(row.businessId, keys);
    }
    keys.add(key);
  }

  let created = 0;
  for (const [businessId, keys] of byBiz.entries()) {
    const existing = await db
      .select({ key: table.subTypeKey, sequenceNumber: table.sequenceNumber })
      .from(table)
      .where(eq(table.businessId, businessId));
    const existingKeys = new Set(existing.map((e) => e.key));
    let nextSeq = Math.max(0, ...existing.map((e) => Number(e.sequenceNumber) || 0));

    for (const key of keys) {
      if (existingKeys.has(key)) continue;
      nextSeq += 1;
      await db.insert(table).values({
        businessId,
        name: nameFactory(key),
        subTypeKey: key,
        sequenceNumber: nextSeq,
        sortOrder: nextSeq,
        icon,
        color,
        isActive: true,
      });
      created += 1;
    }
  }

  return created;
}

async function ensureLegacyExchangeSubtype() {
  const legacyRows = await db
    .select({ id: accounts.id, businessId: accounts.businessId })
    .from(accounts)
    .where(eq(accounts.accountType, 'exchange'));

  const byBiz = new Map<number, number[]>();
  for (const row of legacyRows) {
    let ids = byBiz.get(row.businessId);
    if (!ids) {
      ids = [];
      byBiz.set(row.businessId, ids);
    }
    ids.push(row.id);
  }

  let touchedAccounts = 0;
  let createdTypes = 0;
  for (const [businessId, accountIds] of byBiz.entries()) {
    const [existingType] = await db
      .select({ id: exchangeTypes.id })
      .from(exchangeTypes)
      .where(eq(exchangeTypes.businessId, businessId))
      .limit(1);

    let fallbackKey: string | null = null;
    if (existingType) {
      // reuse first existing type key when available
      const [row] = await db
        .select({ key: exchangeTypes.subTypeKey })
        .from(exchangeTypes)
        .where(eq(exchangeTypes.businessId, businessId))
        .orderBy(exchangeTypes.sequenceNumber, exchangeTypes.id)
        .limit(1);
      fallbackKey = row?.key ?? null;
    } else {
      const [maxSeq] = await db
        .select({ sequenceNumber: exchangeTypes.sequenceNumber })
        .from(exchangeTypes)
        .where(eq(exchangeTypes.businessId, businessId))
        .orderBy(exchangeTypes.sequenceNumber)
        .limit(1);
      const seq = (Number(maxSeq?.sequenceNumber) || 0) + 1;
      await db.insert(exchangeTypes).values({
        businessId,
        name: 'صرافة',
        subTypeKey: 'exchange_default',
        sequenceNumber: seq,
        sortOrder: seq,
        icon: 'currency_exchange',
        color: '#FF9800',
        isActive: true,
      });
      fallbackKey = 'exchange_default';
      createdTypes += 1;
    }

    if (!fallbackKey) continue;
    for (const accountId of accountIds) {
      const [acc] = await db
        .select({ id: accounts.id, subType: accounts.subType })
        .from(accounts)
        .where(eq(accounts.id, accountId))
        .limit(1);
      const current = normalizeKey(acc?.subType);
      if (current) continue;
      await db.update(accounts).set({ subType: fallbackKey, updatedAt: new Date() }).where(eq(accounts.id, accountId));
      touchedAccounts += 1;
    }
  }

  return { createdTypes, touchedAccounts };
}

async function run() {
  const fundCreated = await ensureFundTypes();
  const bankCreated = await ensureAccountTypesFor('bank', bankTypes, 'account_balance', '#4CAF50', bankTypeName);
  const exchangeCreated = await ensureAccountTypesFor('exchange', exchangeTypes, 'currency_exchange', '#FF9800', exchangeTypeName);
  const walletCreated = await ensureAccountTypesFor('e_wallet', eWalletTypes, 'account_balance_wallet', '#00BCD4', walletTypeName);
  const legacyExchange = await ensureLegacyExchangeSubtype();

  console.log(
    JSON.stringify(
      {
        fundTypesCreated: fundCreated,
        bankTypesCreated: bankCreated,
        exchangeTypesCreated: exchangeCreated,
        walletTypesCreated: walletCreated,
        exchangeLegacyTypesCreated: legacyExchange.createdTypes,
        exchangeLegacyAccountsUpdated: legacyExchange.touchedAccounts,
      },
      null,
      2,
    ),
  );
}

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
