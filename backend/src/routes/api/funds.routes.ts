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
  buildAccountHierarchyCode,
  getNextSequence,
  TYPE_PREFIXES,
} from "../../middleware/sequencing.ts";
import { checkPermission } from "../../middleware/permissions.ts";
import { getBizId } from "./_shared/context-helpers.ts";
import { requireResourceOwnership } from "./_shared/ownership.ts";
import type { AppContext } from "./_shared/types.ts";

const fundsRoutes = new Hono();

function buildFundCode(
  businessId: number,
  categorySequence: number,
  sequenceNumber: number,
): string {
  const hierarchy = buildAccountHierarchyCode(
    businessId,
    "fund",
    categorySequence,
    sequenceNumber,
  );
  return hierarchy || `${TYPE_PREFIXES.fund || "FND"}-${String(sequenceNumber).padStart(2, "0")}`;
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

async function resolveFundTypeInfo(bizId: number, fundTypeKey: string) {
  const [ft] = await db
    .select({ id: fundTypes.id, sequenceNumber: fundTypes.sequenceNumber })
    .from(fundTypes)
    .where(
      and(
        eq(fundTypes.businessId, bizId),
        eq(fundTypes.subTypeKey, fundTypeKey),
      ),
    )
    .limit(1);

  if (!ft?.id) return null;
  return {
    id: Number(ft.id),
    categorySequence: Number(ft.sequenceNumber) || 0,
  };
}

async function hasAnyFundTypes(bizId: number): Promise<boolean> {
  const [row] = await db
    .select({ id: fundTypes.id })
    .from(fundTypes)
    .where(eq(fundTypes.businessId, bizId))
    .limit(1);
  return !!row?.id;
}

function parsePositiveIntOrNull(raw: unknown): number | null {
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") return Number.parseInt(raw, 10);
  return null;
}

fundsRoutes.get(
  "/businesses/:bizId/funds",
  bizAuthMiddleware(),
  safeHandler("جلب الصناديق", async (c: AppContext) => {
    const bizId = getBizId(c);
    const includeCustody = c.req.query("includeCustody") === "true";
    const whereCondition = includeCustody
      ? eq(funds.businessId, bizId)
      : and(eq(funds.businessId, bizId), ne(funds.fundType, "custody"));
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
      .where(whereCondition)
      .orderBy(funds.fundType, funds.sequenceNumber, funds.name);

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
    const typeInfo = await resolveFundTypeInfo(bizId, fundTypeKey);
    if (!typeInfo) {
      const anyTypes = await hasAnyFundTypes(bizId);
      return c.json(
        {
          error: anyTypes
            ? "التصنيف المختار غير موجود. اختر تصنيفاً من القائمة."
            : "لا توجد تصنيفات صناديق. أنشئ تصنيفاً أولاً ثم أضف الصندوق.",
        },
        400,
      );
    }
    const typeRefId = typeInfo.id;
    const categorySequence = typeInfo.categorySequence;
    const manualSeq = parsePositiveIntOrNull(body.sequenceNumber);

    insertPayload.subTypeId = typeRefId;
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
      insertPayload.code = buildFundCode(bizId, categorySequence, manualSeq);
      await ensureCounterAtLeast(
        bizId,
        "item_in_fund_type",
        typeRefId,
        0,
        manualSeq,
      );
    } else {
      const seq = await getNextSequence(bizId, "item_in_fund_type", typeRefId, 0);
      insertPayload.sequenceNumber = seq;
      insertPayload.code = buildFundCode(bizId, categorySequence, seq);
    }

    const [created] = await db
      .insert(funds)
      .values(insertPayload as typeof funds.$inferInsert)
      .returning();

    // ربط الصندوق بحساب مالي تلقائياً
    const [fundNature] = await db.select({ id: accountSubNatures.id }).from(accountSubNatures).where(and(eq(accountSubNatures.businessId, bizId), eq(accountSubNatures.natureKey, 'fund'))).limit(1);
    if (created && fundNature) {
      const [createdAccount] = await db.insert(accounts).values({
        businessId: bizId, name: created.name, accountType: 'fund', accountSubNatureId: fundNature.id,
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
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    let nextFundType = "";
    if (typeof body.fundType === "string") nextFundType = body.fundType;
    else if (typeof existing.fundType === "string") nextFundType = existing.fundType;
    const typeInfo = await resolveFundTypeInfo(bizId, nextFundType);
    if (!typeInfo) {
      const anyTypes = await hasAnyFundTypes(bizId);
      return c.json(
        {
          error: anyTypes
            ? "التصنيف المختار غير موجود. اختر تصنيفاً من القائمة."
            : "لا توجد تصنيفات صناديق. أنشئ تصنيفاً أولاً ثم أضف الصندوق.",
        },
        400,
      );
    }

    const payload: Record<string, unknown> = { ...body, subTypeId: typeInfo.id, updatedAt: new Date() };

    const manualSeq = parsePositiveIntOrNull(body.sequenceNumber);

    if (manualSeq != null && Number.isInteger(manualSeq) && manualSeq > 0) {
      const dup = await db
        .select({ id: funds.id })
        .from(funds)
        .where(
          and(
            eq(funds.businessId, bizId),
            eq(funds.fundType, nextFundType as any),
            eq(funds.sequenceNumber, manualSeq),
            ne(funds.id, id),
          ),
        )
        .limit(1);
      if (dup.length > 0) {
        return c.json({ error: "رقم الصندوق مستخدم مسبقاً داخل نفس التصنيف" }, 400);
      }
      payload.sequenceNumber = manualSeq;
      payload.code = buildFundCode(bizId, typeInfo.categorySequence, manualSeq);
      await ensureCounterAtLeast(bizId, "item_in_fund_type", typeInfo.id, 0, manualSeq);
    } else if (body.fundType !== undefined && typeof body.fundType === "string" && body.fundType !== existing.fundType) {
      // عند نقل الصندوق لتصنيف آخر بدون رقم يدوي: أعطه تسلسلاً جديداً داخل التصنيف الجديد.
      const seq = await getNextSequence(bizId, "item_in_fund_type", typeInfo.id, 0);
      payload.sequenceNumber = seq;
      payload.code = buildFundCode(bizId, typeInfo.categorySequence, seq);
    }

    const [updated] = await db
      .update(funds)
      .set(payload)
      .where(eq(funds.id, id))
      .returning();

    if (updated.accountId) {
      await db.update(accounts).set({
        name: updated.name,
        subTypeId: typeInfo.id,
        subType: nextFundType,
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
    const body = normalizeBody(await c.req.json()) as Record<string, unknown>;
    let nextFundType = "";
    if (typeof body.fundType === "string") nextFundType = body.fundType;
    else if (typeof existing.fundType === "string") nextFundType = existing.fundType;

    const typeInfo = await resolveFundTypeInfo(existing.businessId, nextFundType);
    if (!typeInfo) {
      const anyTypes = await hasAnyFundTypes(existing.businessId);
      return c.json(
        {
          error: anyTypes
            ? "التصنيف المختار غير موجود. اختر تصنيفاً من القائمة."
            : "لا توجد تصنيفات صناديق. أنشئ تصنيفاً أولاً ثم أضف الصندوق.",
        },
        400,
      );
    }

    const payload: Record<string, unknown> = { ...body, subTypeId: typeInfo.id, updatedAt: new Date() };
    const manualSeq = parsePositiveIntOrNull(body.sequenceNumber);
    if (manualSeq != null && Number.isInteger(manualSeq) && manualSeq > 0) {
      const dup = await db
        .select({ id: funds.id })
        .from(funds)
        .where(
          and(
            eq(funds.businessId, existing.businessId),
            eq(funds.fundType, nextFundType as any),
            eq(funds.sequenceNumber, manualSeq),
            ne(funds.id, id),
          ),
        )
        .limit(1);
      if (dup.length > 0) {
        return c.json({ error: "رقم الصندوق مستخدم مسبقاً داخل نفس التصنيف" }, 400);
      }
      payload.sequenceNumber = manualSeq;
      payload.code = buildFundCode(existing.businessId, typeInfo.categorySequence, manualSeq);
      await ensureCounterAtLeast(existing.businessId, "item_in_fund_type", typeInfo.id, 0, manualSeq);
    } else if (body.fundType !== undefined && typeof body.fundType === "string" && body.fundType !== existing.fundType) {
      const seq = await getNextSequence(existing.businessId, "item_in_fund_type", typeInfo.id, 0);
      payload.sequenceNumber = seq;
      payload.code = buildFundCode(existing.businessId, typeInfo.categorySequence, seq);
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
