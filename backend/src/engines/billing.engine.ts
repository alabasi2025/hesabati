/**
 * =====================================================================
 * محرك الفوترة (Billing Engine)
 * =====================================================================
 * Phase 2 — استخراج من billing-config.routes.ts
 * 
 * يوحّد منطق أنظمة الفوترة:
 *   - getBillingSystems()        → جلب أنظمة الفوترة مع أنواع الحسابات
 *   - createBillingSystem()      → إضافة نظام فوترة جديد
 *   - updateBillingSystem()      → تعديل نظام فوترة
 *   - deleteBillingSystem()      → حذف نظام فوترة
 *   - getBillingAccountTypes()   → جلب أنواع حسابات الفوترة
 *   - createBillingAccountType() → إضافة نوع حساب فوترة
 *   - calculateBillingPeriod()   → حساب فترة الفوترة
 *   - toSystemKey()              → توليد مفتاح النظام من الاسم
 */

import { db } from '../db/index.ts';
import { eq, and } from 'drizzle-orm';
import { billingSystemsConfig, billingAccountTypes } from '../db/schema/index.ts';

// ── واجهات ────────────────────────────────────────────────────────────────

export interface BillingSystemInput {
  name: string;
  systemKey?: string;
  stationMode?: string;
  collectionMethod?: string;
  sortOrder?: number;
  supportedMethodIds?: number[];
  isActive?: boolean;
}

export interface BillingSystem {
  id: number;
  businessId: number;
  name: string;
  systemKey: string;
  stationScope: string | null;
  collectionMethod: string | null;
  sortOrder: number | null;
  supportedMethodIds: number[];
  supportedTypes: string[];
  isActive: boolean | null;
}

export interface BillingAccountType {
  id: number;
  businessId: number;
  name: string;
  description: string | null;
}

export interface BillingPeriod {
  startDate: string;
  endDate: string;
  daysInPeriod: number;
  monthName: string;
}

// ── دالة مساعدة لتوليد مفتاح النظام ─────────────────────────────────────

/**
 * توليد systemKey من اسم النظام
 * مثال: "نظام التحصيل الشهري" → "nzam_altahsyl_alshry"
 */
export function toSystemKey(name: string): string {
  const compact = name.trim().toLowerCase().split(/\s+/).join('_');
  return compact.split('').filter((ch) => /[a-z0-9_\u0600-\u06ff]/.test(ch)).join('').substring(0, 50);
}

// ── دوال أنظمة الفوترة ───────────────────────────────────────────────────

/**
 * جلب جميع أنظمة الفوترة لعمل معين مع أسماء الأنواع المدعومة
 */
export async function getBillingSystems(bizId: number): Promise<BillingSystem[]> {
  const rows = await db
    .select()
    .from(billingSystemsConfig)
    .where(eq(billingSystemsConfig.businessId, bizId))
    .orderBy(billingSystemsConfig.sortOrder);

  const types = await db
    .select({ id: billingAccountTypes.id, name: billingAccountTypes.name })
    .from(billingAccountTypes)
    .where(eq(billingAccountTypes.businessId, bizId));

  const typeNameById = new Map(types.map((t) => [t.id, t.name]));

  return rows.map((row) => ({
    id: row.id,
    businessId: row.businessId,
    name: row.name ?? '',
    systemKey:
      typeof row.systemKey === 'string' && row.systemKey.trim().length > 0
        ? row.systemKey
        : toSystemKey(`${row.name || 'billing'}_${row.id}`),
    stationScope: row.stationMode ?? null,
    collectionMethod: row.collectionMethod ?? null,
    sortOrder: row.sortOrder ?? null,
    supportedMethodIds: (row.supportedMethodIds || []) as number[],
    supportedTypes: ((row.supportedMethodIds || []) as number[])
      .map((id) => typeNameById.get(id))
      .filter((n): n is string => Boolean(n)),
    isActive: row.isActive ?? true,
  }));
}

/**
 * إضافة نظام فوترة جديد
 */
export async function createBillingSystem(
  bizId: number,
  input: BillingSystemInput,
): Promise<BillingSystem> {
  const systemKey = input.systemKey || toSystemKey(input.name);

  const [created] = await db
    .insert(billingSystemsConfig)
    .values({
      businessId: bizId,
      name: input.name,
      systemKey,
      stationMode: input.stationMode ?? null,
      collectionMethod: input.collectionMethod ?? null,
      sortOrder: input.sortOrder ?? 0,
      supportedMethodIds: input.supportedMethodIds ?? [],
      isActive: input.isActive ?? true,
    })
    .returning();

  return {
    id: created.id,
    businessId: created.businessId,
    name: created.name ?? '',
    systemKey: created.systemKey ?? systemKey,
    stationScope: created.stationMode ?? null,
    collectionMethod: created.collectionMethod ?? null,
    sortOrder: created.sortOrder ?? null,
    supportedMethodIds: (created.supportedMethodIds || []) as number[],
    supportedTypes: [],
    isActive: created.isActive ?? true,
  };
}

/**
 * تعديل نظام فوترة موجود
 */
export async function updateBillingSystem(
  id: number,
  bizId: number,
  input: Partial<BillingSystemInput>,
): Promise<BillingSystem | null> {
  const updateData: Record<string, unknown> = {};
  if (input.name !== undefined) updateData.name = input.name;
  if (input.systemKey !== undefined) updateData.systemKey = input.systemKey;
  if (input.stationMode !== undefined) updateData.stationMode = input.stationMode;
  if (input.collectionMethod !== undefined) updateData.collectionMethod = input.collectionMethod;
  if (input.sortOrder !== undefined) updateData.sortOrder = input.sortOrder;
  if (input.supportedMethodIds !== undefined) updateData.supportedMethodIds = input.supportedMethodIds;
  if (input.isActive !== undefined) updateData.isActive = input.isActive;

  const [updated] = await db
    .update(billingSystemsConfig)
    .set(updateData)
    .where(and(eq(billingSystemsConfig.id, id), eq(billingSystemsConfig.businessId, bizId)))
    .returning();

  if (!updated) return null;

  return {
    id: updated.id,
    businessId: updated.businessId,
    name: updated.name ?? '',
    systemKey: updated.systemKey ?? toSystemKey(updated.name || 'billing'),
    stationScope: updated.stationMode ?? null,
    collectionMethod: updated.collectionMethod ?? null,
    sortOrder: updated.sortOrder ?? null,
    supportedMethodIds: (updated.supportedMethodIds || []) as number[],
    supportedTypes: [],
    isActive: updated.isActive ?? true,
  };
}

/**
 * حذف نظام فوترة
 */
export async function deleteBillingSystem(id: number, bizId: number): Promise<boolean> {
  const result = await db
    .delete(billingSystemsConfig)
    .where(and(eq(billingSystemsConfig.id, id), eq(billingSystemsConfig.businessId, bizId)))
    .returning({ id: billingSystemsConfig.id });

  return result.length > 0;
}

// ── دوال أنواع حسابات الفوترة ─────────────────────────────────────────────

/**
 * جلب أنواع حسابات الفوترة لعمل معين
 */
export async function getBillingAccountTypes(bizId: number): Promise<BillingAccountType[]> {
  return db
    .select({
      id: billingAccountTypes.id,
      businessId: billingAccountTypes.businessId,
      name: billingAccountTypes.name,
      description: billingAccountTypes.description,
    })
    .from(billingAccountTypes)
    .where(eq(billingAccountTypes.businessId, bizId));
}

/**
 * إضافة نوع حساب فوترة جديد
 */
export async function createBillingAccountType(
  bizId: number,
  name: string,
  description?: string,
): Promise<BillingAccountType> {
  const [created] = await db
    .insert(billingAccountTypes)
    .values({ businessId: bizId, name, description: description ?? null })
    .returning();

  return {
    id: created.id,
    businessId: created.businessId,
    name: created.name,
    description: created.description ?? null,
  };
}

// ── دوال حسابية ──────────────────────────────────────────────────────────

/**
 * حساب فترة الفوترة لشهر ومحاسبة معين
 * @param month رقم الشهر (1-12)
 * @param year السنة
 */
export function calculateBillingPeriod(month: number, year: number): BillingPeriod {
  const MONTH_NAMES = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
  ];

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0); // آخر يوم في الشهر

  const fmt = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  return {
    startDate: fmt(startDate),
    endDate: fmt(endDate),
    daysInPeriod: endDate.getDate(),
    monthName: MONTH_NAMES[month - 1] ?? String(month),
  };
}
