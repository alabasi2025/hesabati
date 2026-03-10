import { and, asc, eq, inArray } from 'drizzle-orm';
import { db } from '../src/db/index.ts';
import { accounts, bankTypes, eWalletTypes, exchangeTypes } from '../src/db/schema/index.ts';
import { buildAccountHierarchyCode, TYPE_PREFIXES, getNextCategorySequence } from '../src/middleware/sequencing.ts';

type TargetType = 'bank' | 'exchange' | 'e_wallet';
type AccountRow = {
  id: number;
  businessId: number;
  accountType: TargetType;
  subType: string | null;
  subTypeId: number | null;
};

async function normalizeTypeSequences(
  businessId: number,
  accountType: TargetType,
): Promise<void> {
  if (accountType === 'bank') {
    const rows = await db
      .select({ id: bankTypes.id, sequenceNumber: bankTypes.sequenceNumber, name: bankTypes.name })
      .from(bankTypes)
      .where(eq(bankTypes.businessId, businessId))
      .orderBy(asc(bankTypes.sortOrder), asc(bankTypes.name), asc(bankTypes.id));
    let i = 1;
    for (const r of rows) {
      if (Number(r.sequenceNumber) !== i) {
        await db.update(bankTypes).set({ sequenceNumber: i, updatedAt: new Date() }).where(eq(bankTypes.id, r.id));
      }
      i += 1;
    }
    return;
  }
  if (accountType === 'exchange') {
    const rows = await db
      .select({ id: exchangeTypes.id, sequenceNumber: exchangeTypes.sequenceNumber, name: exchangeTypes.name })
      .from(exchangeTypes)
      .where(eq(exchangeTypes.businessId, businessId))
      .orderBy(asc(exchangeTypes.sortOrder), asc(exchangeTypes.name), asc(exchangeTypes.id));
    let i = 1;
    for (const r of rows) {
      if (Number(r.sequenceNumber) !== i) {
        await db.update(exchangeTypes).set({ sequenceNumber: i, updatedAt: new Date() }).where(eq(exchangeTypes.id, r.id));
      }
      i += 1;
    }
    return;
  }
  const rows = await db
    .select({ id: eWalletTypes.id, sequenceNumber: eWalletTypes.sequenceNumber, name: eWalletTypes.name })
    .from(eWalletTypes)
    .where(eq(eWalletTypes.businessId, businessId))
    .orderBy(asc(eWalletTypes.sortOrder), asc(eWalletTypes.name), asc(eWalletTypes.id));
  let i = 1;
  for (const r of rows) {
    if (Number(r.sequenceNumber) !== i) {
      await db.update(eWalletTypes).set({ sequenceNumber: i, updatedAt: new Date() }).where(eq(eWalletTypes.id, r.id));
    }
    i += 1;
  }
}

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
  return hierarchy || `${TYPE_PREFIXES[accountType] || 'ACC'}-${String(sequenceNumber).padStart(2, '0')}`;
}

async function typeMapForBusiness(
  businessId: number,
  accountType: TargetType,
): Promise<Map<string, { id: number; sequenceNumber: number }>> {
  if (accountType === 'bank') {
    const rows = await db
      .select({ id: bankTypes.id, key: bankTypes.subTypeKey, sequenceNumber: bankTypes.sequenceNumber })
      .from(bankTypes)
      .where(eq(bankTypes.businessId, businessId));
    return new Map(rows.map((r) => [String(r.key), { id: Number(r.id), sequenceNumber: Number(r.sequenceNumber) || 0 }]));
  }
  if (accountType === 'exchange') {
    const rows = await db
      .select({ id: exchangeTypes.id, key: exchangeTypes.subTypeKey, sequenceNumber: exchangeTypes.sequenceNumber })
      .from(exchangeTypes)
      .where(eq(exchangeTypes.businessId, businessId));
    return new Map(rows.map((r) => [String(r.key), { id: Number(r.id), sequenceNumber: Number(r.sequenceNumber) || 0 }]));
  }
  const rows = await db
    .select({ id: eWalletTypes.id, key: eWalletTypes.subTypeKey, sequenceNumber: eWalletTypes.sequenceNumber })
    .from(eWalletTypes)
    .where(eq(eWalletTypes.businessId, businessId));
  return new Map(rows.map((r) => [String(r.key), { id: Number(r.id), sequenceNumber: Number(r.sequenceNumber) || 0 }]));
}

async function ensureTypeIdByKey(
  businessId: number,
  accountType: TargetType,
  subTypeKey: string,
  displayName: string,
): Promise<number> {
  const key = (subTypeKey || '').trim();
  if (!key) throw new Error('subTypeKey مطلوب');

  if (accountType === 'bank') {
    const [existing] = await db
      .select({ id: bankTypes.id })
      .from(bankTypes)
      .where(and(eq(bankTypes.businessId, businessId), eq(bankTypes.subTypeKey, key)))
      .limit(1);
    if (existing) return existing.id;
    const seq = await getNextCategorySequence(businessId, 'bank');
    const [created] = await db
      .insert(bankTypes)
      .values({ businessId, name: displayName, subTypeKey: key, sequenceNumber: seq })
      .returning({ id: bankTypes.id });
    return created.id;
  }

  if (accountType === 'exchange') {
    const [existing] = await db
      .select({ id: exchangeTypes.id })
      .from(exchangeTypes)
      .where(and(eq(exchangeTypes.businessId, businessId), eq(exchangeTypes.subTypeKey, key)))
      .limit(1);
    if (existing) return existing.id;
    const seq = await getNextCategorySequence(businessId, 'exchange');
    const [created] = await db
      .insert(exchangeTypes)
      .values({ businessId, name: displayName, subTypeKey: key, sequenceNumber: seq })
      .returning({ id: exchangeTypes.id });
    return created.id;
  }

  const [existing] = await db
    .select({ id: eWalletTypes.id })
    .from(eWalletTypes)
    .where(and(eq(eWalletTypes.businessId, businessId), eq(eWalletTypes.subTypeKey, key)))
    .limit(1);
  if (existing) return existing.id;
  const seq = await getNextCategorySequence(businessId, 'e_wallet');
  const [created] = await db
    .insert(eWalletTypes)
    .values({ businessId, name: displayName, subTypeKey: key, sequenceNumber: seq })
    .returning({ id: eWalletTypes.id });
  return created.id;
}

async function normalizeBusinessType(businessId: number, accountType: TargetType): Promise<number> {
  await normalizeTypeSequences(businessId, accountType);
  const rows = await db
    .select({
      id: accounts.id,
      businessId: accounts.businessId,
      accountType: accounts.accountType,
      subType: accounts.subType,
      subTypeId: accounts.subTypeId,
    })
    .from(accounts)
    .where(and(eq(accounts.businessId, businessId), eq(accounts.accountType, accountType)))
    .orderBy(asc(accounts.subTypeId), asc(accounts.subType), asc(accounts.createdAt), asc(accounts.id));

  if (rows.length === 0) return 0;

  const keyToTypeInfo = await typeMapForBusiness(businessId, accountType);
  const counters = new Map<number, number>();
  let updated = 0;
  let legacyKeyCounter = 0;

  for (const row of rows as AccountRow[]) {
    const byTypeName = row.subType ? keyToTypeInfo.get(String(row.subType)) : undefined;
    let resolvedSubTypeId = Number(row.subTypeId) > 0 ? Number(row.subTypeId) : (byTypeName?.id ?? 0);
    let resolvedCategorySequence = byTypeName?.sequenceNumber ?? 0;
    let resolvedSubTypeKey = row.subType ? String(row.subType).trim() : '';

    if (!resolvedSubTypeKey) {
      for (const [k, v] of keyToTypeInfo.entries()) {
        if (v.id === Number(resolvedSubTypeId)) {
          resolvedSubTypeKey = k;
          resolvedCategorySequence = v.sequenceNumber;
          break;
        }
      }
    }
    if (!resolvedSubTypeKey) {
      legacyKeyCounter += 1;
      resolvedSubTypeKey = `legacy_${accountType}_${legacyKeyCounter}`;
    }
    if (!Number.isInteger(resolvedSubTypeId) || resolvedSubTypeId <= 0) {
      const displayName = row.subType && String(row.subType).trim() ? String(row.subType).trim() : `تصنيف ${accountType} ${legacyKeyCounter || 1}`;
      resolvedSubTypeId = await ensureTypeIdByKey(businessId, accountType, resolvedSubTypeKey, displayName);
      const refreshed = await typeMapForBusiness(businessId, accountType);
      const r = refreshed.get(resolvedSubTypeKey);
      resolvedCategorySequence = r?.sequenceNumber ?? 0;
      keyToTypeInfo.set(resolvedSubTypeKey, { id: resolvedSubTypeId, sequenceNumber: resolvedCategorySequence });
    }

    const seq = (counters.get(resolvedSubTypeId) ?? 0) + 1;
    counters.set(resolvedSubTypeId, seq);

    await db
      .update(accounts)
      .set({
        subTypeId: resolvedSubTypeId,
        subType: resolvedSubTypeKey,
        sequenceNumber: seq,
        code: buildAccountCode(businessId, accountType, resolvedCategorySequence, seq),
        updatedAt: new Date(),
      })
      .where(eq(accounts.id, row.id));
    updated += 1;
  }

  return updated;
}

async function main() {
  const bizRows = await db
    .select({ businessId: accounts.businessId })
    .from(accounts)
    .where(inArray(accounts.accountType, ['bank', 'exchange', 'e_wallet']));

  const bizIds = Array.from(
    new Set(bizRows.map((r) => Number(r.businessId)).filter((n) => Number.isInteger(n) && n > 0)),
  );

  let total = 0;
  for (const bizId of bizIds) {
    for (const t of ['bank', 'exchange', 'e_wallet'] as const) {
      const n = await normalizeBusinessType(bizId, t);
      total += n;
      if (n > 0) console.log(`business ${bizId}: fixed ${n} accounts for ${t}`);
    }
  }
  console.log(`done. updated rows: ${total}`);
}

await main();
