/**
 * =====================================================================
 * محرك الموارد البشرية والرواتب (HR & Salary Engine)
 * =====================================================================
 * Phase 2 — استخراج من categories-expenses.routes.ts
 * 
 * يوحّد منطق الرواتب والموظفين:
 *   - getSalaryRecords()       → جلب سجلات الرواتب مع اسم الموظف
 *   - createSalaryRecord()     → إضافة راتب مع حساب صافي الراتب
 *   - updateSalaryRecord()     → تعديل راتب + إعادة حساب الصافي
 *   - deleteSalaryRecord()     → حذف راتب
 *   - markSalaryPaid()         → تحديد الراتب كمدفوع
 *   - calculateNetSalary()     → حساب صافي الراتب
 *   - getMonthlySalarySummary()→ ملخص رواتب شهر معين
 *   - getEmployeeSalaryHistory()→ تاريخ رواتب موظف معين
 */

import { db } from '../db/index.ts';
import { eq, and, desc } from 'drizzle-orm';
import { salaryRecords, employees, currencies } from '../db/schema/index.ts';

// ── واجهات ────────────────────────────────────────────────────────────────

export interface SalaryInput {
  employeeId: number;
  month: number;
  year: number;
  baseSalary: number;
  advance?: number;
  deductions?: number;
  currencyId?: number;
  isPaid?: boolean;
  paidDate?: string | null;
  attendanceDays?: number | null;
  notes?: string | null;
}

export interface SalaryRecord {
  id: number;
  businessId: number;
  employeeId: number;
  employeeName?: string | null;
  month: number;
  year: number;
  baseSalary: number;
  advance: number;
  deductions: number;
  netSalary: number;
  currencyId: number;
  isPaid: boolean;
  paidDate: string | null;
  attendanceDays: number | null;
  notes: string | null;
  createdAt: Date | null;
}

export interface MonthlySalarySummary {
  month: number;
  year: number;
  totalBaseSalary: number;
  totalDeductions: number;
  totalAdvances: number;
  totalNetSalary: number;
  employeeCount: number;
  paidCount: number;
  unpaidCount: number;
}

// ── الدالة المساعدة لحساب الصافي ─────────────────────────────────────────

/**
 * حساب صافي الراتب
 * القاعدة: صافي = أساسي - سلف - خصومات
 */
export function calculateNetSalary(
  baseSalary: number,
  advance: number = 0,
  deductions: number = 0,
): number {
  const net = baseSalary - advance - deductions;
  return Math.max(0, net); // لا يمكن أن يكون الصافي سالباً
}

// ── دوال CRUD ─────────────────────────────────────────────────────────────

/**
 * جلب سجلات الرواتب لعمل معين (مع فلتر شهر/سنة اختياري)
 */
export async function getSalaryRecords(
  bizId: number,
  filters?: { month?: number; year?: number; employeeId?: number },
): Promise<SalaryRecord[]> {
  const rows = await db
    .select({
      id: salaryRecords.id,
      businessId: salaryRecords.businessId,
      employeeId: salaryRecords.employeeId,
      employeeName: employees.fullName,
      month: salaryRecords.month,
      year: salaryRecords.year,
      baseSalary: salaryRecords.baseSalary,
      advance: salaryRecords.advance,
      deductions: salaryRecords.deductions,
      netSalary: salaryRecords.netSalary,
      currencyId: salaryRecords.currencyId,
      isPaid: salaryRecords.isPaid,
      paidDate: salaryRecords.paidDate,
      attendanceDays: salaryRecords.attendanceDays,
      notes: salaryRecords.notes,
      createdAt: salaryRecords.createdAt,
    })
    .from(salaryRecords)
    .leftJoin(employees, eq(salaryRecords.employeeId, employees.id))
    .where(eq(salaryRecords.businessId, bizId))
    .orderBy(desc(salaryRecords.year), desc(salaryRecords.month));

  let result = rows;
  if (filters?.month !== undefined) result = result.filter((r) => r.month === filters.month);
  if (filters?.year !== undefined) result = result.filter((r) => r.year === filters.year);
  if (filters?.employeeId !== undefined) result = result.filter((r) => r.employeeId === filters.employeeId);

  return result.map((r) => ({
    ...r,
    baseSalary: Number(r.baseSalary),
    advance: Number(r.advance),
    deductions: Number(r.deductions),
    netSalary: Number(r.netSalary),
    isPaid: Boolean(r.isPaid),
    paidDate: r.paidDate ?? null,
  }));
}

/**
 * إضافة سجل راتب جديد مع حساب صافي الراتب تلقائياً
 */
export async function createSalaryRecord(
  bizId: number,
  input: SalaryInput,
): Promise<SalaryRecord> {
  const advance = input.advance ?? 0;
  const deductions = input.deductions ?? 0;
  const netSalary = calculateNetSalary(input.baseSalary, advance, deductions);

  const [created] = await db
    .insert(salaryRecords)
    .values({
      businessId: bizId,
      employeeId: input.employeeId,
      month: input.month,
      year: input.year,
      baseSalary: String(input.baseSalary),
      advance: String(advance),
      deductions: String(deductions),
      netSalary: String(netSalary),
      currencyId: input.currencyId ?? 1,
      isPaid: input.isPaid ?? false,
      paidDate: input.paidDate ?? null,
      attendanceDays: input.attendanceDays ?? null,
      notes: input.notes ?? null,
    })
    .returning();

  return {
    ...created,
    baseSalary: Number(created.baseSalary),
    advance: Number(created.advance),
    deductions: Number(created.deductions),
    netSalary: Number(created.netSalary),
    isPaid: Boolean(created.isPaid),
    paidDate: created.paidDate ?? null,
    attendanceDays: created.attendanceDays ?? null,
    notes: created.notes ?? null,
    createdAt: created.createdAt ?? null,
  };
}

/**
 * تعديل سجل راتب + إعادة حساب الصافي تلقائياً
 */
export async function updateSalaryRecord(
  id: number,
  input: Partial<SalaryInput>,
): Promise<SalaryRecord | null> {
  const [existing] = await db
    .select()
    .from(salaryRecords)
    .where(eq(salaryRecords.id, id));

  if (!existing) return null;

  const baseSalary = input.baseSalary ?? Number(existing.baseSalary);
  const advance = input.advance ?? Number(existing.advance);
  const deductions = input.deductions ?? Number(existing.deductions);
  const netSalary = calculateNetSalary(baseSalary, advance, deductions);

  const [updated] = await db
    .update(salaryRecords)
    .set({
      ...(input.employeeId !== undefined && { employeeId: input.employeeId }),
      ...(input.month !== undefined && { month: input.month }),
      ...(input.year !== undefined && { year: input.year }),
      baseSalary: String(baseSalary),
      advance: String(advance),
      deductions: String(deductions),
      netSalary: String(netSalary),
      ...(input.currencyId !== undefined && { currencyId: input.currencyId }),
      ...(input.isPaid !== undefined && { isPaid: input.isPaid }),
      ...(input.paidDate !== undefined && { paidDate: input.paidDate }),
      ...(input.attendanceDays !== undefined && { attendanceDays: input.attendanceDays }),
      ...(input.notes !== undefined && { notes: input.notes }),
    })
    .where(eq(salaryRecords.id, id))
    .returning();

  return {
    ...updated,
    baseSalary: Number(updated.baseSalary),
    advance: Number(updated.advance),
    deductions: Number(updated.deductions),
    netSalary: Number(updated.netSalary),
    isPaid: Boolean(updated.isPaid),
    paidDate: updated.paidDate ?? null,
    attendanceDays: updated.attendanceDays ?? null,
    notes: updated.notes ?? null,
    createdAt: updated.createdAt ?? null,
  };
}

/**
 * حذف سجل راتب
 */
export async function deleteSalaryRecord(id: number): Promise<boolean> {
  const result = await db
    .delete(salaryRecords)
    .where(eq(salaryRecords.id, id))
    .returning({ id: salaryRecords.id });

  return result.length > 0;
}

/**
 * تحديد راتب كمدفوع مع تسجيل تاريخ الدفع
 */
export async function markSalaryPaid(
  id: number,
  paidDate?: string,
): Promise<SalaryRecord | null> {
  const date = paidDate ?? new Date().toISOString().split('T')[0];

  const [updated] = await db
    .update(salaryRecords)
    .set({ isPaid: true, paidDate: date })
    .where(eq(salaryRecords.id, id))
    .returning();

  if (!updated) return null;

  return {
    ...updated,
    baseSalary: Number(updated.baseSalary),
    advance: Number(updated.advance),
    deductions: Number(updated.deductions),
    netSalary: Number(updated.netSalary),
    isPaid: true,
    paidDate: date,
    attendanceDays: updated.attendanceDays ?? null,
    notes: updated.notes ?? null,
    createdAt: updated.createdAt ?? null,
  };
}

/**
 * ملخص رواتب شهر معين (إجماليات + عدد المدفوعين/غير المدفوعين)
 */
export async function getMonthlySalarySummary(
  bizId: number,
  month: number,
  year: number,
): Promise<MonthlySalarySummary> {
  const records = await getSalaryRecords(bizId, { month, year });

  const summary: MonthlySalarySummary = {
    month,
    year,
    totalBaseSalary: 0,
    totalDeductions: 0,
    totalAdvances: 0,
    totalNetSalary: 0,
    employeeCount: records.length,
    paidCount: 0,
    unpaidCount: 0,
  };

  for (const r of records) {
    summary.totalBaseSalary += r.baseSalary;
    summary.totalDeductions += r.deductions;
    summary.totalAdvances += r.advance;
    summary.totalNetSalary += r.netSalary;
    if (r.isPaid) summary.paidCount++;
    else summary.unpaidCount++;
  }

  return summary;
}

/**
 * جلب تاريخ رواتب موظف معين مرتباً تنازلياً
 */
export async function getEmployeeSalaryHistory(
  bizId: number,
  employeeId: number,
): Promise<SalaryRecord[]> {
  return getSalaryRecords(bizId, { employeeId });
}
