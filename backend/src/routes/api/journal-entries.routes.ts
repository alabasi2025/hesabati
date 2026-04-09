/**
 * مسارات القيود المحاسبية (journal entries)
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, desc, and, inArray, sql } from "drizzle-orm";
import {
  journalEntries,
  journalEntryLines,
  accounts,
  operationTypes,
  operationCategories,
  journalEntryCategories,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { safeHandler, parseId, getBody } from "../../middleware/helpers.ts";
import { getNextSequence } from "../../middleware/sequencing.ts";
import { generateJournalEntryFullSequence } from "../../engines/sequencing-entity.engine.ts";
import { getBizId, getUserId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import { validateEntityAccountLinks } from "./_shared/account-guards.ts";
import {
  auditCreate,
  auditUpdate,
  auditDelete,
  makeAuditCtx,
} from "../../engines/audit-middleware.engine.ts";
import {
  isForeignCurrency,
  requireExchangeDiffAccount,
} from "../../engines/currency.engine.ts";

const journalEntriesRoutes = new Hono();

journalEntriesRoutes.get(
  "/businesses/:bizId/journal-entries/preview-number",
  bizAuthMiddleware(),
  safeHandler("معاينة الرقم التسلسلي للقيد", async (c) => {
    const bizId = getBizId(c);
    const categoryKey = c.req.query("categoryKey") || "";
    const year = Number(c.req.query("year") || new Date().getFullYear());

    if (!categoryKey) return c.json({ previewNumber: `JE-${year}-????` });

    const [jeCat] = await db
      .select()
      .from(journalEntryCategories)
      .where(
        and(
          eq(journalEntryCategories.businessId, bizId),
          eq(journalEntryCategories.categoryKey, categoryKey),
        ),
      );

    if (!jeCat) return c.json({ previewNumber: `JE-${year}-????` });

    const catSeq = jeCat.sequenceNumber || 1;
    const operationTypeId = Number(c.req.query("operationTypeId") || 0);

    // peek at the next sequence without consuming it (read last_number + 1)
    const result = await db.execute(sql`
    SELECT COALESCE(
      (SELECT last_number FROM sequence_counters
       WHERE business_id = ${bizId}
         AND counter_type = 'journal_entry'
         AND entity_id = ${operationTypeId}
         AND year = ${year}
      ), 0) + 1 AS next_val
  `);
    const rows = Array.isArray(result) ? result : (result as any).rows || [];
    const nextVal = Number(rows[0]?.next_val || 1);
    const previewNumber = `${catSeq}-${year}-${String(nextVal).padStart(4, "0")}`;
    return c.json({
      previewNumber,
      categoryName: jeCat.name,
      categorySeq: catSeq,
    });
  }),
);

journalEntriesRoutes.get(
  "/businesses/:bizId/journal-entries",
  bizAuthMiddleware(),
  safeHandler("جلب القيود المحاسبية", async (c) => {
    const bizId = getBizId(c);
    const entries = await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.businessId, bizId))
      .orderBy(desc(journalEntries.entryDate));

    const entryIds = entries.map((e) => e.id);
    type LineRow = {
      id: number;
      journalEntryId: number;
      accountId: number | null;
      lineType: string;
      amount: string;
      description: string | null;
      sortOrder: number | null;
      accountName: string | null;
      entityType: string | null;
      entityId: number | null;
      currencyId: number | null;
      foreignAmount: string | null;
      exchangeRate: string | null;
    };
    let allLines: LineRow[] = [];
    if (entryIds.length > 0) {
      allLines = await db
        .select({
          id: journalEntryLines.id,
          journalEntryId: journalEntryLines.journalEntryId,
          accountId: journalEntryLines.accountId,
          lineType: journalEntryLines.lineType,
          amount: journalEntryLines.amount,
          description: journalEntryLines.description,
          sortOrder: journalEntryLines.sortOrder,
          accountName: accounts.name,
          accountCode: accounts.code,
          entityType: journalEntryLines.entityType,
          entityId: journalEntryLines.entityId,
          currencyId: journalEntryLines.currencyId,
          foreignAmount: journalEntryLines.foreignAmount,
          exchangeRate: journalEntryLines.exchangeRate,
        })
        .from(journalEntryLines)
        .leftJoin(accounts, eq(journalEntryLines.accountId, accounts.id))
        .where(inArray(journalEntryLines.journalEntryId, entryIds));
    }

    const lineMap: Record<number, LineRow[]> = {};
    for (const l of allLines) {
      if (!lineMap[l.journalEntryId]) lineMap[l.journalEntryId] = [];
      lineMap[l.journalEntryId].push(l);
    }

    return c.json(entries.map((e) => ({ ...e, lines: lineMap[e.id] || [] })));
  }),
);

journalEntriesRoutes.post(
  "/businesses/:bizId/journal-entries",
  bizAuthMiddleware(),
  checkPermission("vouchers", "create"),
  safeHandler("إضافة قيد محاسبي", async (c) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as {
      lines?: {
        accountId: number;
        amount: string | number;
        lineType?: string;
        type?: string;
        description?: string;
        entityType?: string;
        entityId?: number;
        currencyId?: number;
        foreignAmount?: string | number;
        exchangeRate?: string | number;
      }[];
      entryDate?: string;
      date?: string;
      reference?: string;
      description?: string;
      operationTypeId?: number;
      categoryKey?: string;
      currencyId?: number;
      status?: string;
    };
    const { lines, ...entryData } = body;
    if (!lines || !Array.isArray(lines) || lines.length < 2) {
      return c.json(
        { error: "القيد يجب أن يحتوي على سطرين على الأقل (مدين ودائن)" },
        400,
      );
    }
    if (!entryData.categoryKey?.trim()) {
      return c.json({ error: "نوع القيد مطلوب" }, 400);
    }
    const currencyId = entryData.currencyId || 1;

    // ⛔ حماية حرجة: منع العمليات بعملة أجنبية بدون حساب فروقات عملة
    if (await isForeignCurrency(currencyId)) {
      const diffCheck = await requireExchangeDiffAccount(bizId);
      if (!diffCheck.exists) {
        return c.json(
          {
            error:
              'لا يمكن تنفيذ قيد بعملة أجنبية بدون وجود حساب فروقات العملة. يرجى إنشاء حساب وسيط باسم "فروقات عملة" أولاً.',
          },
          400,
        );
      }
    }

    const entryDate =
      entryData.entryDate ||
      entryData.date ||
      new Date().toISOString().split("T")[0];

    let totalDebit = 0;
    let totalCredit = 0;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!line.accountId)
        return c.json({ error: `السطر ${i + 1}: معرّف الحساب مطلوب` }, 400);
      if (!line.amount || Number.parseFloat(String(line.amount)) <= 0)
        return c.json(
          { error: `السطر ${i + 1}: المبلغ مطلوب ويجب أن يكون أكبر من صفر` },
          400,
        );
      const lineType = line.lineType || line.type;
      if (!lineType || !["debit", "credit"].includes(lineType))
        return c.json(
          { error: `السطر ${i + 1}: نوع السطر يجب أن يكون debit أو credit` },
          400,
        );
      const amt = Number.parseFloat(String(line.amount));
      if (lineType === "debit") totalDebit += amt;
      else totalCredit += amt;
    }
    const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

    // حماية: منع تنفيذ قيد على حسابات فرعية بدون كيان مرتبط
    const lineAccountIds = lines.map((l: any) => l.accountId).filter(Boolean);
    const guardError = await validateEntityAccountLinks(lineAccountIds);
    if (guardError) return c.json({ error: guardError }, 400);

    const year = new Date().getFullYear();
    let journalFullSeqNum: string | null = null;
    let journalCategorySeq: string | null = null;
    let journalTemplateSeq: string | null = null;
    let entryNumber = entryData.reference || "";

    if (entryData.operationTypeId) {
      const [opType] = await db
        .select()
        .from(operationTypes)
        .where(eq(operationTypes.id, entryData.operationTypeId));
      if (opType) {
        let catSeqNum = 1;
        let catName = "عام";
        if (opType.categoryId) {
          const [opCat] = await db
            .select({ categoryKey: operationCategories.categoryKey })
            .from(operationCategories)
            .where(eq(operationCategories.id, opType.categoryId))
            .limit(1);
          if (opCat?.categoryKey) catName = opCat.categoryKey;
        }
        const [jeCat] = await db
          .select()
          .from(journalEntryCategories)
          .where(
            and(
              eq(journalEntryCategories.businessId, bizId),
              eq(journalEntryCategories.categoryKey, catName),
            ),
          );
        if (jeCat?.sequenceNumber) catSeqNum = jeCat.sequenceNumber;

        const jeSeqResult = await generateJournalEntryFullSequence(
          bizId,
          catSeqNum,
          entryData.operationTypeId,
          year,
        );
        journalFullSeqNum = jeSeqResult.fullSequenceNumber;
        entryNumber = entryNumber || journalFullSeqNum;
        journalCategorySeq = String(catSeqNum);
        journalTemplateSeq = String(jeSeqResult.sequentialNumber);
      }
    } else if (entryData.categoryKey) {
      // توليد التسلسل من نوع القيد مباشرةً بدون operationTypeId
      const [jeCat] = await db
        .select()
        .from(journalEntryCategories)
        .where(
          and(
            eq(journalEntryCategories.businessId, bizId),
            eq(journalEntryCategories.categoryKey, entryData.categoryKey),
          ),
        );
      if (jeCat) {
        const catSeqNum = jeCat.sequenceNumber || 1;
        const seqNum = await getNextSequence(
          bizId,
          "journal_entry",
          jeCat.id,
          year,
        );
        journalFullSeqNum = `${catSeqNum}-${year}-${String(seqNum).padStart(4, "0")}`;
        entryNumber = entryNumber || journalFullSeqNum;
        journalCategorySeq = String(catSeqNum);
        journalTemplateSeq = String(seqNum);
      }
    }

    if (!entryNumber) {
      const fallbackSeq = await getNextSequence(
        bizId,
        "journal_entry",
        0,
        year,
      );
      entryNumber = `JE-${year}-${String(fallbackSeq).padStart(4, "0")}`;
      journalFullSeqNum = entryNumber;
    }

    const categoryToSave = entryData.categoryKey || body.categoryKey || null;

    const [entry] = await db
      .insert(journalEntries)
      .values({
        businessId: bizId,
        entryNumber,
        entryDate,
        description: entryData.description || "",
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
      })
      .returning();

    if (!entry) return c.json({ error: "فشل إنشاء القيد" }, 500);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineType = line.lineType || line.type;
      const amt = Number.parseFloat(String(line.amount));
      await db.insert(journalEntryLines).values({
        journalEntryId: entry.id,
        accountId: line.accountId,
        lineType: (lineType as "debit" | "credit") ?? "debit",
        amount: String(line.amount),
        description: (line.description as string) ?? "",
        sortOrder: i,
        entityType: (line.entityType as string) || null,
        entityId: line.entityId ? Number(line.entityId) : null,
        currencyId: line.currencyId ? Number(line.currencyId) : null,
        foreignAmount: line.foreignAmount ? String(line.foreignAmount) : null,
        exchangeRate: line.exchangeRate ? String(line.exchangeRate) : null,
      });

      // تحديث رصيد الحساب (مدين = +، دائن = -)
      const delta = lineType === "debit" ? amt : -amt;
      await db.execute(sql`
      INSERT INTO account_balances (account_id, currency_id, balance)
      VALUES (${line.accountId}, ${currencyId}, ${delta})
      ON CONFLICT (account_id, currency_id) DO UPDATE SET
        balance = account_balances.balance + ${delta},
        updated_at = NOW()
    `);
    }

    return c.json(entry, 201);
  }),
);

journalEntriesRoutes.put(
  "/businesses/:bizId/journal-entries/:id",
  bizAuthMiddleware(),
  checkPermission("vouchers", "create"),
  safeHandler("تعديل قيد محاسبي", async (c) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف القيد غير صالح" }, 400);

    const body = (await getBody(c)) as {
      lines?: any[];
      entryDate?: string;
      date?: string;
      reference?: string;
      description?: string;
      operationTypeId?: number;
      status?: string;
    };
    const { lines, ...entryData } = body;

    if (!lines || !Array.isArray(lines) || lines.length < 2)
      return c.json({ error: "القيد يجب أن يحتوي على سطرين على الأقل" }, 400);

    let totalDebit = 0,
      totalCredit = 0;
    for (const line of lines) {
      const lt = line.lineType || line.type;
      const amt = Number.parseFloat(String(line.amount));
      if (lt === "debit") totalDebit += amt;
      else totalCredit += amt;
    }
    const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01;

    const entryDate =
      entryData.entryDate ||
      entryData.date ||
      new Date().toISOString().split("T")[0];

    // حذف السطور القديمة وإعادة إنشائها
    await db
      .delete(journalEntryLines)
      .where(eq(journalEntryLines.journalEntryId, id));

    await db
      .update(journalEntries)
      .set({
        entryDate,
        description: entryData.description || "",
        reference: entryData.reference || null,
        operationTypeId: entryData.operationTypeId || null,
        totalDebit: String(totalDebit),
        totalCredit: String(totalCredit),
        isBalanced,
        status: (entryData.status as any) || undefined,
      })
      .where(
        and(eq(journalEntries.id, id), eq(journalEntries.businessId, bizId)),
      );

    const currencyId = 1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineType = line.lineType || line.type;
      const amt = Number.parseFloat(String(line.amount));
      await db.insert(journalEntryLines).values({
        journalEntryId: id,
        accountId: line.accountId,
        lineType: lineType as "debit" | "credit",
        amount: String(amt),
        description: line.description ?? "",
        sortOrder: i,
        entityType: line.entityType || null,
        entityId: line.entityId ? Number(line.entityId) : null,
        currencyId: line.currencyId ? Number(line.currencyId) : null,
        foreignAmount: line.foreignAmount ? String(line.foreignAmount) : null,
        exchangeRate: line.exchangeRate ? String(line.exchangeRate) : null,
      });
    }

    const [updated] = await db
      .select()
      .from(journalEntries)
      .where(eq(journalEntries.id, id));
    return c.json(updated);
  }),
);

journalEntriesRoutes.delete(
  "/journal-entries/:id",
  safeHandler("حذف قيد محاسبي", async (c) => {
    return c.json(
      { error: "لا يمكن حذف القيود المحاسبية — القيود محمية من الحذف" },
      403,
    );
  }),
);

export default journalEntriesRoutes;
