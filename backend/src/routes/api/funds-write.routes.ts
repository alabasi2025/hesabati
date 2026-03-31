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
    const insertPayload: Record<string, unknown> = {
      ...validation.data,
      businessId: bizId,
    };

    // آلية الترقيم المبسطة: FND-01, FND-02, FND-03...
    const manualSeq = parsePositiveIntOrNull(body.sequenceNumber);

    if (manualSeq != null && Number.isInteger(manualSeq) && manualSeq > 0) {
      const existing = await db
        .select({ id: funds.id })
        .from(funds)
        .where(
          and(
            eq(funds.businessId, bizId),
            eq(funds.sequenceNumber, manualSeq),
          ),
        )
        .limit(1);
      if (existing.length > 0)
        return c.json(
          { error: "رقم الصندوق مستخدم مسبقاً" },
          400,
        );

      insertPayload.sequenceNumber = manualSeq;
      insertPayload.code = buildFundCode(manualSeq);
      await ensureCounterAtLeast(
        bizId,
        "fund",
        0,
        0,
        manualSeq,
      );
    } else {
      const seq = await getNextSequence(bizId, "fund", 0, 0);
      insertPayload.sequenceNumber = seq;
      insertPayload.code = buildFundCode(seq);
    }

    const [created] = await db
      .insert(funds)
      .values(insertPayload as typeof funds.$inferInsert)
      .returning();

    // ربط الصندوق بحساب مالي تلقائياً
    // إذا أرسل المستخدم accountSubNatureId نستخدمه، وإلا نأخذ أول تصنيف fund
    const requestedSubNatureId = body.accountSubNatureId ? Number(body.accountSubNatureId) : null;
    let accountSubNatureId: number | null = null;

    if (requestedSubNatureId) {
      const [subNature] = await db.select({ id: accountSubNatures.id }).from(accountSubNatures).where(and(eq(accountSubNatures.id, requestedSubNatureId), eq(accountSubNatures.businessId, bizId), eq(accountSubNatures.natureKey, 'fund'))).limit(1);
      if (subNature) accountSubNatureId = subNature.id;
    }

    if (!accountSubNatureId) {
      const [defaultNature] = await db.select({ id: accountSubNatures.id }).from(accountSubNatures).where(and(eq(accountSubNatures.businessId, bizId), eq(accountSubNatures.natureKey, 'fund'))).limit(1);
      if (defaultNature) accountSubNatureId = defaultNature.id;
    }

    if (created && accountSubNatureId) {
      const [createdAccount] = await db.insert(accounts).values({
        businessId: bizId, name: created.name, accountType: 'fund', accountSubNatureId,
        isLeafAccount: true, code: created.code, sequenceNumber: created.sequenceNumber,
        notes: created.notes, isActive: created.isActive,
      }).returning();
      if (createdAccount) {
        await db.update(funds).set({ accountId: createdAccount.id, updatedAt: new Date() }).where(eq(funds.id, created.id));
      }
    }

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
