/**
 * funds-write.routes.ts — Phase 10
 * تعديل الصناديق: إنشاء + تعديل + حذف + تحويل
 */
import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, inArray, ne, sql } from "drizzle-orm";
import {
  accounts,
  accountSubNatures,
  funds,
  fundBalances,
  vouchers,
  voucherLines,
  journalEntryLines,
  stations,
  currencies,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { fundSchema, validateBody } from "../../middleware/validation.ts";
import {
  safeHandler,
  parseId,
  getBody,
} from "../../middleware/helpers.ts";
import {
  buildAccountHierarchyCode,
  getNextSequence,
  TYPE_PREFIXES,
} from "../../middleware/sequencing.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import type { AppContext } from "./_shared/types.ts";

const fundsRoutes = new Hono();

/**
 * توليد كود الصندوق
 * الكود: FND-01, FND-02, FND-03...
 */
function buildFundCode(sequenceNumber: number): string {
  return `${TYPE_PREFIXES.fund || "FND"}-${String(sequenceNumber).padStart(2, "0")}`;
}

async function ensureCounterAtLeast(
  businessId: number,
  counterType: string,
  entityId: number,
  year: number,
  lastNumber: number,
): Promise<void> {
  await db.execute(sql`
    INSERT INTO sequence_counters (business_id, counter_type, entity_id, year, last_number)
    VALUES (${businessId}, ${counterType}, ${entityId}, ${year}, ${lastNumber})
    ON CONFLICT (business_id, counter_type, entity_id, year)
    DO UPDATE SET
      last_number = GREATEST(sequence_counters.last_number, EXCLUDED.last_number),
      updated_at = NOW()
  `);
}


function parsePositiveIntOrNull(raw: unknown): number | null {
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") return Number.parseInt(raw, 10);
  return null;
}


fundsRoutes.post(
  "/businesses/:bizId/funds",
  bizAuthMiddleware(),
  checkPermission("funds", "create"),
  safeHandler("إضافة صندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = (await getBody(c)) as Record<string, unknown>;
    const validation = validateBody(fundSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const vd = validation.data as Record<string, unknown>;
    // الحساب المرتبط إلزامي — يُنشأ أولاً من صفحة الحسابات
    const accountId = body.accountId != null && Number(body.accountId) > 0 ? Number(body.accountId) : null;
    if (!accountId) return c.json({ error: 'يجب اختيار حساب مرتبط بالصندوق' }, 400);

    const [acc] = await db.select({ id: accounts.id, sequenceNumber: accounts.sequenceNumber, code: accounts.code })
      .from(accounts)
      .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)))
      .limit(1);
    if (!acc) return c.json({ error: 'الحساب المحدد غير موجود' }, 400);

    // كود مركّب: كود الحساب/رقم فرعي (FND-01/1, FND-01/2)
    const existingFunds = await db.select({ id: funds.id }).from(funds)
      .where(and(eq(funds.businessId, bizId), eq(funds.accountId, accountId)));
    const subSeq = existingFunds.length + 1;
    const fundCode = `${acc.code}/${subSeq}`;

    const insertPayload: typeof funds.$inferInsert = {
      businessId: bizId,
      name: String(vd.name),
      accountId: accountId,
      sequenceNumber: acc.sequenceNumber,
      code: fundCode,
      stationId: vd.stationId != null && Number(vd.stationId) > 0 ? Number(vd.stationId) : null,
      responsiblePerson: typeof vd.responsiblePerson === 'string' && vd.responsiblePerson.trim() ? vd.responsiblePerson.trim() : null,
      description: typeof vd.description === 'string' && vd.description.trim() ? vd.description.trim() : null,
      notes: typeof vd.notes === 'string' && vd.notes.trim() ? vd.notes.trim() : null,
      isActive: vd.isActive !== false,
    };

    const [created] = await db
      .insert(funds)
      .values(insertPayload as typeof funds.$inferInsert)
      .returning();

    return c.json(created, 201);
  }),
);

fundsRoutes.put(
  "/businesses/:bizId/funds/:id",
  bizAuthMiddleware(),
  safeHandler("تعديل صندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصندوق غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(funds)
      .where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
    if (!existing)
      return c.json({ error: "صندوق غير موجود أو لا ينتمي لهذا العمل" }, 404);
    const body = (await getBody(c)) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body, updatedAt: new Date() };

    const manualSeq = parsePositiveIntOrNull(body.sequenceNumber);

    if (manualSeq != null && Number.isInteger(manualSeq) && manualSeq > 0 && manualSeq !== existing.sequenceNumber) {
      const dup = await db
        .select({ id: funds.id })
        .from(funds)
        .where(
          and(
            eq(funds.businessId, bizId),
            eq(funds.sequenceNumber, manualSeq),
            ne(funds.id, id),
          ),
        )
        .limit(1);
      if (dup.length > 0) {
        return c.json({ error: "رقم الصندوق مستخدم مسبقاً" }, 400);
      }
      payload.sequenceNumber = manualSeq;
      payload.code = buildFundCode(manualSeq);
      await ensureCounterAtLeast(bizId, "fund", 0, 0, manualSeq);
    }

    const [updated] = await db
      .update(funds)
      .set(payload)
      .where(eq(funds.id, id))
      .returning();

    if (updated.accountId) {
      await db.update(accounts).set({
        name: updated.name,
        code: updated.code,
        sequenceNumber: updated.sequenceNumber,
        responsiblePerson: updated.responsiblePerson,
        notes: updated.notes,
        isActive: updated.isActive,
        updatedAt: new Date(),
      }).where(eq(accounts.id, updated.accountId));
    }

    return c.json(updated);
  }),
);

fundsRoutes.delete(
  "/businesses/:bizId/funds/:id",
  bizAuthMiddleware(),
  checkPermission("funds", "delete"),
  safeHandler("حذف صندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصندوق غير صالح" }, 400);
    const [existing] = await db
      .select()
      .from(funds)
      .where(and(eq(funds.id, id), eq(funds.businessId, bizId)));
    if (!existing)
      return c.json({ error: "صندوق غير موجود أو لا ينتمي لهذا العمل" }, 404);

    // حماية: لا يمكن حذف صندوق تم تنفيذ عمليات فيه
    const [linkedVoucher] = await db.select({ id: vouchers.id }).from(vouchers)
      .where(and(eq(vouchers.businessId, bizId), sql`(${vouchers.fromFundId} = ${id} OR ${vouchers.toFundId} = ${id})`))
      .limit(1);
    if (linkedVoucher) return c.json({ error: 'لا يمكن حذف الصندوق لأنه مرتبط بسندات. احذف السندات أولاً' }, 400);

    const [nonZeroBalance] = await db.select({ id: fundBalances.id }).from(fundBalances)
      .where(and(eq(fundBalances.fundId, id), ne(fundBalances.balance, '0')))
      .limit(1);
    if (nonZeroBalance) return c.json({ error: 'لا يمكن حذف الصندوق لأنه يحتوي على رصيد غير صفري' }, 400);

    if (existing.accountId) {
      const [linkedVoucherLine] = await db.select({ id: voucherLines.id }).from(voucherLines)
        .where(eq(voucherLines.accountId, existing.accountId)).limit(1);
      if (linkedVoucherLine) return c.json({ error: 'لا يمكن حذف الصندوق لأن حسابه المرتبط يحتوي على قيود' }, 400);

      const [linkedJournal] = await db.select({ id: journalEntryLines.id }).from(journalEntryLines)
        .where(eq(journalEntryLines.accountId, existing.accountId)).limit(1);
      if (linkedJournal) return c.json({ error: 'لا يمكن حذف الصندوق لأن حسابه المرتبط يحتوي على قيود يومية' }, 400);
    }

    await db.delete(funds).where(eq(funds.id, id));
    return c.json({ success: true });
  }),
);

fundsRoutes.put(
  "/funds/:id",
  safeHandler("تعديل صندوق (legacy)", async (c: AppContext) => {
    const id = parseId(c.req.param("id"));
    if (!id) return c.json({ error: "معرّف الصندوق غير صالح" }, 400);
    const [existing] = await db.select().from(funds).where(eq(funds.id, id));
    const err = await requireResourceOwnership(c, existing ?? null);
    if (err) return err;
    const body = (await getBody(c)) as Record<string, unknown>;
    const payload: Record<string, unknown> = { ...body, updatedAt: new Date() };
    const manualSeq = parsePositiveIntOrNull(body.sequenceNumber);
    if (manualSeq != null && Number.isInteger(manualSeq) && manualSeq > 0) {
      const dup = await db
        .select({ id: funds.id })
        .from(funds)
        .where(
          and(
            eq(funds.businessId, existing.businessId),
            eq(funds.sequenceNumber, manualSeq),
            ne(funds.id, id),
          ),
        )
        .limit(1);
      if (dup.length > 0) {
        return c.json({ error: "رقم الصندوق مستخدم مسبقاً" }, 400);
      }
      payload.sequenceNumber = manualSeq;
    }

    const [updated] = await db
      .update(funds)
      .set(payload)
      .where(eq(funds.id, id))
      .returning();
    if (!updated) return c.json({ error: "صندوق غير موجود" }, 404);
    return c.json(updated);
  }),
);

export default fundsRoutes;


export { fundsRoutes as fundsWriteRoutes };
