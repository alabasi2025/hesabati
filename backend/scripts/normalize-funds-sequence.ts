import { and, asc, eq, ne } from 'drizzle-orm';
import { db } from '../src/db/index.ts';
import { fundTypes, funds } from '../src/db/schema/index.ts';
import { buildAccountHierarchyCode, TYPE_PREFIXES } from '../src/middleware/sequencing.ts';

type FundRow = {
  id: number;
  businessId: number;
  fundType: string;
  subTypeId: number | null;
  sequenceNumber: number | null;
  code: string | null;
};

function buildFundCode(
  businessId: number,
  categorySequence: number,
  sequenceNumber: number,
): string {
  const hierarchy = buildAccountHierarchyCode(
    businessId,
    'fund',
    categorySequence,
    sequenceNumber,
  );
  return hierarchy || `${TYPE_PREFIXES.fund || 'FND'}-${String(sequenceNumber).padStart(2, '0')}`;
}

async function normalizeBusinessFunds(businessId: number): Promise<number> {
  const typeRows = await db
    .select({ id: fundTypes.id, sequenceNumber: fundTypes.sequenceNumber, name: fundTypes.name })
    .from(fundTypes)
    .where(eq(fundTypes.businessId, businessId))
    .orderBy(asc(fundTypes.sortOrder), asc(fundTypes.name), asc(fundTypes.id));
  let typeSeq = 1;
  for (const t of typeRows) {
    if (Number(t.sequenceNumber) !== typeSeq) {
      await db.update(fundTypes).set({ sequenceNumber: typeSeq, updatedAt: new Date() }).where(eq(fundTypes.id, t.id));
    }
    typeSeq += 1;
  }

  const types = await db
    .select({ id: fundTypes.id, subTypeKey: fundTypes.subTypeKey, sequenceNumber: fundTypes.sequenceNumber })
    .from(fundTypes)
    .where(eq(fundTypes.businessId, businessId));

  const typeIdByKey = new Map<string, number>();
  const typeSeqByKey = new Map<string, number>();
  const typeSeqById = new Map<number, number>();
  for (const t of types) {
    if (t.subTypeKey) {
      const typeId = Number(t.id);
      const typeSeq = Number(t.sequenceNumber) || 0;
      typeIdByKey.set(String(t.subTypeKey), typeId);
      typeSeqByKey.set(String(t.subTypeKey), typeSeq);
      typeSeqById.set(typeId, typeSeq);
    }
  }

  const rows = await db
    .select({
      id: funds.id,
      businessId: funds.businessId,
      fundType: funds.fundType,
      subTypeId: funds.subTypeId,
      sequenceNumber: funds.sequenceNumber,
      code: funds.code,
    })
    .from(funds)
    .where(eq(funds.businessId, businessId))
    .orderBy(asc(funds.fundType), asc(funds.createdAt), asc(funds.id));

  if (rows.length === 0) return 0;

  const counters = new Map<number, number>();
  const usedCodes = new Set<string>();
  let updated = 0;

  for (const row of rows as FundRow[]) {
    const fundTypeKey = String(row.fundType || '');
    const typeId = typeIdByKey.get(fundTypeKey) ?? row.subTypeId ?? null;
    if (!Number.isInteger(Number(typeId)) || Number(typeId) <= 0) continue;
    const normalizedTypeId = Number(typeId);
    const next = (counters.get(normalizedTypeId) ?? 0) + 1;
    counters.set(normalizedTypeId, next);

    const typeSequence = typeSeqById.get(normalizedTypeId) ?? typeSeqByKey.get(fundTypeKey) ?? 0;
    let code = buildFundCode(businessId, typeSequence, next);
    if (usedCodes.has(code)) {
      let i = 2;
      while (usedCodes.has(`${code}-${i}`)) i += 1;
      code = `${code}-${i}`;
    }
    let safeCode = code;
    let idx = 2;
    // تجنب التعارض المؤقت أثناء إعادة الترتيب عندما يكون الكود النهائي مستخدماً حالياً من سجل آخر
    while (true) {
      const [dup] = await db
        .select({ id: funds.id })
        .from(funds)
        .where(and(eq(funds.businessId, businessId), eq(funds.code, safeCode), ne(funds.id, row.id)))
        .limit(1);
      if (!dup) break;
      safeCode = `${code}-${idx}`;
      idx += 1;
    }

    const needUpdate =
      Number(row.sequenceNumber) !== next ||
      Number(row.subTypeId) !== normalizedTypeId ||
      String(row.code || '') !== safeCode;

    if (needUpdate) {
      await db
        .update(funds)
        .set({
          subTypeId: normalizedTypeId,
          sequenceNumber: next,
          code: safeCode,
          updatedAt: new Date(),
        })
        .where(eq(funds.id, row.id));
      updated += 1;
    }

    usedCodes.add(safeCode);
  }

  return updated;
}

async function main() {
  const bizRows = await db.select({ businessId: funds.businessId }).from(funds);
  const bizIds = Array.from(
    new Set(bizRows.map((r) => Number(r.businessId)).filter((n) => Number.isInteger(n) && n > 0)),
  );

  let total = 0;
  for (const bizId of bizIds) {
    const n = await normalizeBusinessFunds(bizId);
    total += n;
    if (n > 0) console.log(`business ${bizId}: fixed ${n} funds`);
  }
  console.log(`done. updated rows: ${total}`);
}

await main();
