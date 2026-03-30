/**
 * مسارات القيود المحاسبية (journal entries)
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import { eq, desc, and, inArray } from 'drizzle-orm';
import {
  journalEntries,
  journalEntryLines,
  accounts,
  operationTypes,
  operationCategories,
  journalEntryCategories,
} from '../../db/schema/index.ts';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
import { getNextSequence } from '../../middleware/sequencing.ts';
import { generateJournalEntryFullSequence } from '../../engines/sequencing-entity.engine.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { requireResourceOwnership } from './_shared/ownership.ts';
import { auditCreate, auditUpdate, auditDelete, makeAuditCtx } from '../../engines/audit-middleware.engine.ts';

const journalEntriesRoutes = new Hono();

journalEntriesRoutes.get('/businesses/:bizId/journal-entries', bizAuthMiddleware(), safeHandler('جلب القيود المحاسبية', async (c) => {
  const bizId = getBizId(c);
  const entries = await db.select().from(journalEntries).where(eq(journalEntries.businessId, bizId)).orderBy(desc(journalEntries.entryDate));

  const entryIds = entries.map(e => e.id);
  type LineRow = { id: number; journalEntryId: number; accountId: number | null; lineType: string; amount: string; description: string | null; sortOrder: number | null; accountName: string | null };
  let allLines: LineRow[] = [];
  if (entryIds.length > 0) {
    allLines = await db.select({
      id: journalEntryLines.id,
      journalEntryId: journalEntryLines.journalEntryId,
      accountId: journalEntryLines.accountId,
      lineType: journalEntryLines.lineType,
      amount: journalEntryLines.amount,
      description: journalEntryLines.description,
      sortOrder: journalEntryLines.sortOrder,
      accountName: accounts.name,
    }).from(journalEntryLines)
      .leftJoin(accounts, eq(journalEntryLines.accountId, accounts.id))
      .where(inArray(journalEntryLines.journalEntryId, entryIds));
  }

  const lineMap: Record<number, LineRow[]> = {};
  for (const l of allLines) {
    if (!lineMap[l.journalEntryId]) lineMap[l.journalEntryId] = [];
    lineMap[l.journalEntryId].push(l);
  }

  return c.json(entries.map(e => ({ ...e, lines: lineMap[e.id] || [] })));
}));

journalEntriesRoutes.post('/businesses/:bizId/journal-entries', bizAuthMiddleware(), checkPermission('vouchers', 'create'), safeHandler('إضافة قيد محاسبي', async (c) => {
  const bizId = getBizId(c);
  const body = await getBody(c) as { lines?: { accountId: number; amount: string | number; lineType?: string; type?: string; description?: string }[]; entryDate?: string; date?: string; reference?: string; description?: string; operationTypeId?: number; categoryKey?: string };
  const { lines, ...entryData } = body;
  if (!lines || !Array.isArray(lines) || lines.length < 2) {
    return c.json({ error: 'القيد يجب أن يحتوي على سطرين على الأقل (مدين ودائن)' }, 400);
  }
  if (!entryData.operationTypeId) {
    return c.json({ error: 'معرّف نوع العملية (القالب) مطلوب - operationTypeId' }, 400);
  }

  const entryDate = entryData.entryDate || entryData.date || new Date().toISOString().split('T')[0];

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

  const year = new Date().getFullYear();
  let journalFullSeqNum: string | null = null;
  let journalCategorySeq: string | null = null;
  let journalTemplateSeq: string | null = null;
  let entryNumber = entryData.reference || '';

  if (entryData.operationTypeId) {
    const [opType] = await db.select().from(operationTypes).where(eq(operationTypes.id, entryData.operationTypeId));
    if (opType) {
      let catSeqNum = 1;
      let catName = 'عام';
      if (opType.categoryId) {
        const [opCat] = await db.select({ categoryKey: operationCategories.categoryKey }).from(operationCategories).where(eq(operationCategories.id, opType.categoryId)).limit(1);
        if (opCat?.categoryKey) catName = opCat.categoryKey;
      }
      const [jeCat] = await db.select().from(journalEntryCategories)
        .where(and(eq(journalEntryCategories.businessId, bizId), eq(journalEntryCategories.categoryKey, catName)));
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

  if (!entryNumber) {
    const fallbackSeq = await getNextSequence(bizId, 'journal_entry', 0, year);
    entryNumber = `JE-${year}-${String(fallbackSeq).padStart(4, '0')}`;
    journalFullSeqNum = entryNumber;
  }

  const categoryToSave = entryData.categoryKey || body.categoryKey || null;

  const [entry] = await db.insert(journalEntries).values({
    businessId: bizId,
    entryNumber,
    entryDate,
    description: entryData.description || '',
    reference: entryData.reference || null,
    category: categoryToSave,
    operationTypeId: entryData.operationTypeId || null,
    totalDebit: String(totalDebit),
    totalCredit: String(totalCredit),
    isBalanced,
    createdBy: getUserId(c),
    fullSequenceNumber: journalFullSeqNum,
    categorySequence: journalCategorySeq,
    templateSequence: journalTemplateSeq,
  }).returning();

  if (!entry) return c.json({ error: 'فشل إنشاء القيد' }, 500);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineType = line.lineType || line.type;
    await db.insert(journalEntryLines).values({
      journalEntryId: entry.id,
      accountId: line.accountId,
      lineType: (lineType as 'debit' | 'credit') ?? 'debit',
      amount: String(line.amount),
      description: (line.description as string) ?? '',
      sortOrder: i,
    });
  }

  return c.json(entry, 201);
}));

journalEntriesRoutes.delete('/journal-entries/:id', safeHandler('حذف قيد محاسبي', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف القيد غير صالح' }, 400);
  const [entry] = await db.select().from(journalEntries).where(eq(journalEntries.id, id));
  const err = await requireResourceOwnership(c, entry ?? null);
  if (err) return err;
  await db.delete(journalEntryLines).where(eq(journalEntryLines.journalEntryId, id));
  await db.delete(journalEntries).where(eq(journalEntries.id, id));
  return c.json({ success: true });
}));

export default journalEntriesRoutes;
