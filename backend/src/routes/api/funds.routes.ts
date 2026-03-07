import { Hono } from "hono";
import { db } from "../../db/index.ts";
import { eq, and, inArray, sql } from "drizzle-orm";
import {
  funds,
  fundBalances,
  stations,
  currencies,
  fundTypes,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { fundSchema, validateBody } from "../../middleware/validation.ts";
import {
  safeHandler,
  normalizeBody,
  parseId,
} from "../../middleware/helpers.ts";
import {
  getNextItemInCategorySequence,
  getNextSequence,
  generateItemCode,
  TYPE_PREFIXES,
} from "../../middleware/sequencing.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import type { AppContext } from "./_shared/types.ts";

const fundsRoutes = new Hono();

const FUND_TYPE_FALLBACK_IDS: Record<string, number> = {
  collection: 1,
  salary_advance: 2,
  custody: 3,
  safe: 4,
  expense: 5,
  deposit: 6,
};

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

fundsRoutes.get(
  "/businesses/:bizId/funds",
  bizAuthMiddleware(),
  safeHandler("جلب الصناديق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const rows = await db
      .select({
        id: funds.id,
        name: funds.name,
        fundType: funds.fundType,
        sequenceNumber: funds.sequenceNumber,
        code: funds.code,
        stationId: funds.stationId,
        responsiblePerson: funds.responsiblePerson,
        description: funds.description,
        isActive: funds.isActive,
        notes: funds.notes,
        createdAt: funds.createdAt,
        stationName: stations.name,
      })
      .from(funds)
      .leftJoin(stations, eq(funds.stationId, stations.id))
      .where(eq(funds.businessId, bizId))
      .orderBy(funds.fundType, funds.name);

    const fundIds = rows.map((f) => f.id);
    let balancesArr: {
      fundId: number;
      currencyId: number;
      balance: string;
      currencyCode: string | null;
      currencySymbol: string | null;
    }[] = [];
    if (fundIds.length > 0) {
      balancesArr = await db
        .select({
          fundId: fundBalances.fundId,
          currencyId: fundBalances.currencyId,
          balance: fundBalances.balance,
          currencyCode: currencies.code,
          currencySymbol: currencies.symbol,
        })
        .from(fundBalances)
        .leftJoin(currencies, eq(fundBalances.currencyId, currencies.id))
        .where(inArray(fundBalances.fundId, fundIds));
    }
    const balanceMap: Record<number, typeof balancesArr> = {};
    for (const b of balancesArr) {
      if (!balanceMap[b.fundId]) balanceMap[b.fundId] = [];
      balanceMap[b.fundId].push(b);
    }
    return c.json(
      rows.map((f) => ({ ...f, balances: balanceMap[f.id] || [] })),
    );
  }),
);

fundsRoutes.post(
  "/businesses/:bizId/funds",
  bizAuthMiddleware(),
  checkPermission("funds", "create"),
  safeHandler("إضافة صندوق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    const validation = validateBody(fundSchema, body);
    if (!validation.success) return c.json({ error: validation.error }, 400);
    const insertPayload: Record<string, unknown> = {
      ...validation.data,
      businessId: bizId,
    };

    // ترقيم تلقائي للصندوق داخل تصنيفه (fundType) + دعم إدخال رقم يدوي عند الحاجة.
    const fundTypeKey = String((validation.data as any).fundType || "");
    const [ft] = await db
      .select({ id: fundTypes.id })
      .from(fundTypes)
      .where(
        and(
          eq(fundTypes.businessId, bizId),
          eq(fundTypes.subTypeKey, fundTypeKey),
        ),
      )
      .limit(1);

    const typeRefId = ft?.id ?? FUND_TYPE_FALLBACK_IDS[fundTypeKey] ?? 0;
    const manualSeqRaw = body.sequenceNumber;
    const manualSeq =
      typeof manualSeqRaw === "number"
        ? manualSeqRaw
        : typeof manualSeqRaw === "string"
          ? Number.parseInt(manualSeqRaw, 10)
          : null;

    if (typeRefId > 0) {
      if (manualSeq != null && Number.isInteger(manualSeq) && manualSeq > 0) {
        const existing = await db
          .select({ id: funds.id })
          .from(funds)
          .where(
            and(
              eq(funds.businessId, bizId),
              eq(funds.fundType, fundTypeKey as any),
              eq(funds.sequenceNumber, manualSeq),
            ),
          )
          .limit(1);
        if (existing.length > 0)
          return c.json(
            { error: "رقم الصندوق مستخدم مسبقاً داخل نفس التصنيف" },
            400,
          );

        insertPayload.sequenceNumber = manualSeq;
        insertPayload.code = generateItemCode(
          TYPE_PREFIXES.fund || "FND",
          manualSeq,
        );
        await ensureCounterAtLeast(
          bizId,
          "fund_in_type",
          typeRefId,
          0,
          manualSeq,
        );
      } else {
        const seq = await getNextSequence(bizId, "fund_in_type", typeRefId, 0);
        insertPayload.sequenceNumber = seq;
        insertPayload.code = generateItemCode(TYPE_PREFIXES.fund || "FND", seq);
      }
    }

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
    const body = normalizeBody(await c.req.json());
    const [updated] = await db
      .update(funds)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(funds.id, id))
      .returning();
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
    const body = normalizeBody(await c.req.json());
    const [updated] = await db
      .update(funds)
      .set({ ...body, updatedAt: new Date() })
      .where(eq(funds.id, id))
      .returning();
    if (!updated) return c.json({ error: "صندوق غير موجود" }, 404);
    return c.json(updated);
  }),
);

export default fundsRoutes;
