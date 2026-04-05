import { eq, and, like, desc } from "drizzle-orm";
import { accounts } from "../db/schema/schema-business.ts";
import { TYPE_PREFIXES } from "./sequencing.types.ts";

// NATURE_PREFIXES: بادئات رقمية للـ ledgerCode (للتقارير المحاسبية)
// بينما TYPE_PREFIXES: بادئات حرفية للـ code (للتعريف التشغيلي)
const NATURE_PREFIXES: Record<string, string> = {
  fund: "001",
  bank: "002",
  e_wallet: "003",
  exchange: "004",
  warehouse: "005",
  custody: "006",
  supplier: "007",
  employee: "008",
  partner: "009",
  billing: "010",
  intermediary: "011",
  budget: "012",
  settlement: "013",
  pending: "014",
};

/**
 * توليد الرقم المحاسبي لحساب رقابي (XXX-YYY)
 */
export function generateControlLedgerCode(
  natureKey: string,
  controlSequence: number,
): string {
  const prefix = NATURE_PREFIXES[natureKey] || "UNK";
  return `${prefix}-${String(controlSequence).padStart(2, "0")}`;
}

/**
 * توليد الرقم المحاسبي لكيان تحليلي (XXX-YYY-ZZZ)
 */
export function generateEntityLedgerCode(
  controlLedgerCode: string,
  entitySequence: number,
): string {
  return `${controlLedgerCode}-${String(entitySequence).padStart(2, "0")}`;
}

/**
 * الحصول على البادئة حسب نوع الحساب الفرعي
 */
export function getNaturePrefix(natureKey: string): string {
  return NATURE_PREFIXES[natureKey] || "UNK";
}

/**
 * الحصول على التسلسل التالي للحساب الرقابي ضمن نوع فرعي معين
 */
export async function getNextControlSequence(
  bizId: number,
  natureKey: string,
  dbInstance: any,
): Promise<number> {
  const prefix = NATURE_PREFIXES[natureKey] || "UNK";
  const pattern = `${prefix}-%`;

  const existing = await dbInstance
    .select({ ledgerCode: accounts.ledgerCode })
    .from(accounts)
    .where(
      and(eq(accounts.businessId, bizId), like(accounts.ledgerCode, pattern)),
    )
    .orderBy(desc(accounts.ledgerCode));

  if (existing.length === 0) return 1;

  // استخراج أعلى تسلسل YYY من حسابات التحكم فقط (XXX-YYY بدون ZZZ)
  let maxSeq = 0;
  for (const row of existing) {
    const code = row.ledgerCode as string;
    const parts = code.split("-");
    // فقط حسابات التحكم (جزئين بالضبط)
    if (parts.length === 2) {
      const seq = Number.parseInt(parts[1], 10);
      if (!Number.isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }
  }

  return maxSeq + 1;
}

/**
 * الحصول على التسلسل التالي لكيان تحليلي ضمن حساب رقابي معين
 */
export async function getNextEntitySequence(
  bizId: number,
  controlLedgerCode: string,
  dbInstance: any,
): Promise<number> {
  const pattern = `${controlLedgerCode}-%`;

  const existing = await dbInstance
    .select({ ledgerCode: accounts.ledgerCode })
    .from(accounts)
    .where(
      and(eq(accounts.businessId, bizId), like(accounts.ledgerCode, pattern)),
    )
    .orderBy(desc(accounts.ledgerCode));

  if (existing.length === 0) return 1;

  let maxSeq = 0;
  for (const row of existing) {
    const code = row.ledgerCode as string;
    const parts = code.split("-");
    if (parts.length === 3) {
      const seq = Number.parseInt(parts[2], 10);
      if (!Number.isNaN(seq) && seq > maxSeq) {
        maxSeq = seq;
      }
    }
  }

  return maxSeq + 1;
}

/**
 * توليد رقم محاسبي كامل لحساب فرعي جديد (leaf account)
 * يبحث عن الحساب الرقابي الموجود أو ينشئ تسلسل جديد
 */
export async function generateFullLedgerCode(
  bizId: number,
  natureKey: string,
  dbInstance: any,
): Promise<string> {
  const prefix = NATURE_PREFIXES[natureKey] || "UNK";

  // ابحث عن آخر كود محاسبي لهذا النوع
  const pattern = `${prefix}-%`;
  const existing = await dbInstance
    .select({ ledgerCode: accounts.ledgerCode })
    .from(accounts)
    .where(
      and(eq(accounts.businessId, bizId), like(accounts.ledgerCode, pattern)),
    )
    .orderBy(desc(accounts.ledgerCode));

  if (existing.length === 0) {
    // أول حساب من هذا النوع: XXX-001-001
    return `${prefix}-01-01`;
  }

  // استخراج أعلى تسلسل ZZZ ضمن أعلى YYY
  let maxControl = 1;
  let maxEntity = 0;

  for (const row of existing) {
    const code = row.ledgerCode as string;
    const parts = code.split("-");
    if (parts.length === 3) {
      const ctrl = Number.parseInt(parts[1], 10);
      const ent = Number.parseInt(parts[2], 10);
      if (!Number.isNaN(ctrl) && ctrl > maxControl) {
        maxControl = ctrl;
        maxEntity = ent;
      } else if (
        !Number.isNaN(ctrl) &&
        ctrl === maxControl &&
        !Number.isNaN(ent) &&
        ent > maxEntity
      ) {
        maxEntity = ent;
      }
    } else if (parts.length === 2) {
      const ctrl = Number.parseInt(parts[1], 10);
      if (!Number.isNaN(ctrl) && ctrl > maxControl) {
        maxControl = ctrl;
      }
    }
  }

  // كل حساب جديد = تحكم مستقل جديد (YYY+1) + كيان أول (ZZZ=001)
  return `${prefix}-${String(maxControl + 1).padStart(2, "0")}-01`;
}

export { NATURE_PREFIXES, TYPE_PREFIXES };
