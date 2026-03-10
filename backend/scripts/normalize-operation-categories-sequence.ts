import { asc, eq } from 'drizzle-orm';
import { db } from '../src/db/index.ts';
import { operationCategories } from '../src/db/schema/index.ts';
import { generateItemCode } from '../src/middleware/sequencing.ts';

type CategoryRow = {
  id: number;
  businessId: number;
  sequenceNumber: number | null;
  code: string | null;
};

async function normalizeBusinessCategories(businessId: number): Promise<number> {
  const rows = await db
    .select({
      id: operationCategories.id,
      businessId: operationCategories.businessId,
      sequenceNumber: operationCategories.sequenceNumber,
      code: operationCategories.code,
    })
    .from(operationCategories)
    .where(eq(operationCategories.businessId, businessId))
    .orderBy(
      asc(operationCategories.sortOrder),
      asc(operationCategories.name),
      asc(operationCategories.id),
    );

  if (rows.length === 0) return 0;

  const usedSeq = new Set<number>();
  const usedCode = new Set<string>();

  for (const row of rows) {
    if (Number.isInteger(row.sequenceNumber) && Number(row.sequenceNumber) > 0) {
      usedSeq.add(Number(row.sequenceNumber));
    }
    if (row.code && row.code.trim()) {
      usedCode.add(row.code.trim());
    }
  }

  let nextSeq = usedSeq.size > 0 ? Math.max(...usedSeq) + 1 : 1;
  let updated = 0;

  for (const row of rows as CategoryRow[]) {
    const hasValidSeq = Number.isInteger(row.sequenceNumber) && Number(row.sequenceNumber) > 0;
    const hasValidCode = Boolean(row.code && row.code.trim());
    if (hasValidSeq && hasValidCode) continue;

    let seq = hasValidSeq ? Number(row.sequenceNumber) : nextSeq;
    while (usedSeq.has(seq) && (!hasValidSeq || seq !== Number(row.sequenceNumber))) {
      seq += 1;
    }

    let code = hasValidCode ? String(row.code).trim() : generateItemCode('OPC', seq);
    if (usedCode.has(code)) {
      let i = 2;
      while (usedCode.has(`${code}-${i}`)) i += 1;
      code = `${code}-${i}`;
    }

    await db
      .update(operationCategories)
      .set({
        sequenceNumber: seq,
        code,
        updatedAt: new Date(),
      })
      .where(eq(operationCategories.id, row.id));

    usedSeq.add(seq);
    usedCode.add(code);
    if (seq >= nextSeq) nextSeq = seq + 1;
    updated += 1;
  }

  return updated;
}

async function main() {
  const businesses = await db
    .select({ businessId: operationCategories.businessId })
    .from(operationCategories);

  const bizIds = Array.from(new Set(businesses.map((r) => Number(r.businessId)).filter((n) => Number.isInteger(n) && n > 0)));

  let totalUpdated = 0;
  for (const bizId of bizIds) {
    const updated = await normalizeBusinessCategories(bizId);
    totalUpdated += updated;
    if (updated > 0) {
      console.log(`business ${bizId}: fixed ${updated} operation categories`);
    }
  }

  console.log(`done. updated rows: ${totalUpdated}`);
}

await main();
