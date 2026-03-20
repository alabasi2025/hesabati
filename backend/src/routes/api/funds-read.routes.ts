/**
 * funds-read.routes.ts — Phase 10
 * قراءة الصناديق: جلب القائمة + التفاصيل
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
  fundTypes,
} from "../../db/schema/index.ts";
import { bizAuthMiddleware } from "../../middleware/bizAuth.ts";
import { fundSchema, validateBody } from "../../middleware/validation.ts";
import {
  safeHandler,
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

/**
 * توليد كود الصندوق
 * 
 * آلية الترقيم:
 * - الكود: FND-01, FND-02, FND-03...
 * - التصنيفات (fund_types) للتنظيم والفلترة فقط وليس لها علاقة بالترقيم
 * - الترقيم يعتمد على النوع الفرعي "صندوق" من account_sub_natures
 * 
 * @param businessId - معرف العمل (غير مستخدم حالياً)
 * @param categorySequence - رقم التصنيف (غير مستخدم في الكود الفعلي)
 * @param sequenceNumber - رقم الصندوق التسلسلي
 */
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


export { fundsRoutes as fundsReadRoutes };
