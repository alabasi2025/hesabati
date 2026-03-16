/**
 * CRUD Engine – محرك العمليات الأساسية
 * ========================================
 * يوفر دوالاً موحدة لـ CRUD بدلاً من تكرار
 * db.select / db.insert / db.update / db.delete في كل route.
 *
 * يُقلّص كل route بسيط من ~200 سطر إلى ~30 سطر.
 */

import { db } from "../db/index.ts";
import { eq, and, desc, asc, ilike, sql, SQL, type AnyColumn } from "drizzle-orm";
import { PgTable, type PgColumn } from "drizzle-orm/pg-core";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PaginationOptions {
  page?: number;
  pageSize?: number;
}

export interface SortOptions {
  column?: string;
  direction?: "asc" | "desc";
}

export interface CrudListOptions extends PaginationOptions, SortOptions {
  filters?: Record<string, unknown>;
  searchColumn?: AnyColumn;
  searchTerm?: string;
}

export interface CrudListResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CrudConfig<TTable extends PgTable> {
  table: TTable;
  bizIdColumn: PgColumn;
  orderByColumn?: PgColumn;
  searchColumns?: PgColumn[];
  /** دوال تُستدعى قبل/بعد العمليات */
  hooks?: {
    beforeCreate?: (data: Record<string, unknown>, bizId: number) => Promise<Record<string, unknown>>;
    afterCreate?: (record: Record<string, unknown>, bizId: number) => Promise<void>;
    beforeUpdate?: (data: Record<string, unknown>, bizId: number) => Promise<Record<string, unknown>>;
    afterUpdate?: (record: Record<string, unknown>, bizId: number) => Promise<void>;
    beforeDelete?: (id: number, bizId: number) => Promise<void>;
    afterDelete?: (id: number, bizId: number) => Promise<void>;
  };
}

type DbOrTx = NodePgDatabase<any> | Parameters<Parameters<NodePgDatabase<any>["transaction"]>[0]>[0];

// ─── Core Functions ───────────────────────────────────────────────────────────

/**
 * جلب جميع السجلات مع دعم pagination والبحث والفلترة
 */
export async function getAll<T extends Record<string, unknown>>(
  config: CrudConfig<any>,
  bizId: number,
  options: CrudListOptions = {},
  dbOrTx: DbOrTx = db
): Promise<CrudListResult<T>> {
  const { page = 1, pageSize = 50, searchTerm } = options;
  const offset = (page - 1) * pageSize;

  const conditions: SQL[] = [eq(config.bizIdColumn, bizId)];

  // بحث نصي
  if (searchTerm && config.searchColumns && config.searchColumns.length > 0) {
    const searchConditions = config.searchColumns.map(
      (col) => ilike(col, `%${searchTerm}%`)
    );
    if (searchConditions.length === 1) {
      conditions.push(searchConditions[0]);
    } else {
      const { or } = await import("drizzle-orm");
      conditions.push(or(...searchConditions) as SQL);
    }
  }

  const whereClause = conditions.length === 1 ? conditions[0] : and(...conditions);

  // الحصول على الإجمالي
  const [countResult] = await (dbOrTx as any)
    .select({ count: sql<number>`count(*)::int` })
    .from(config.table)
    .where(whereClause);

  const total = Number(countResult?.count ?? 0);

  // الحصول على البيانات
  let query = (dbOrTx as any)
    .select()
    .from(config.table)
    .where(whereClause)
    .limit(pageSize)
    .offset(offset);

  if (config.orderByColumn) {
    query = query.orderBy(desc(config.orderByColumn));
  }

  const data = await query;

  return {
    data: data as T[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

/**
 * جلب سجل واحد بالـ ID مع التحقق من الملكية
 */
export async function getOne<T extends Record<string, unknown>>(
  config: CrudConfig<any>,
  id: number,
  bizId: number,
  dbOrTx: DbOrTx = db
): Promise<T | null> {
  const table = config.table as any;

  const [record] = await (dbOrTx as any)
    .select()
    .from(table)
    .where(and(eq(table.id, id), eq(config.bizIdColumn, bizId)));

  return (record as T) ?? null;
}

/**
 * إنشاء سجل جديد مع تشغيل الـ hooks
 */
export async function createRecord<T extends Record<string, unknown>>(
  config: CrudConfig<any>,
  data: Record<string, unknown>,
  bizId: number,
  dbOrTx: DbOrTx = db
): Promise<T> {
  let processedData = { ...data, businessId: bizId };

  if (config.hooks?.beforeCreate) {
    processedData = await config.hooks.beforeCreate(processedData, bizId);
  }

  const [created] = await (dbOrTx as any)
    .insert(config.table)
    .values(processedData)
    .returning();

  if (config.hooks?.afterCreate) {
    await config.hooks.afterCreate(created, bizId);
  }

  return created as T;
}

/**
 * تحديث سجل مع التحقق من الملكية
 */
export async function updateRecord<T extends Record<string, unknown>>(
  config: CrudConfig<any>,
  id: number,
  data: Record<string, unknown>,
  bizId: number,
  dbOrTx: DbOrTx = db
): Promise<T | null> {
  const table = config.table as any;

  // التحقق من الوجود
  const existing = await getOne(config, id, bizId, dbOrTx);
  if (!existing) return null;

  let processedData = { ...data, updatedAt: new Date() };

  if (config.hooks?.beforeUpdate) {
    processedData = await config.hooks.beforeUpdate(processedData, bizId);
  }

  const [updated] = await (dbOrTx as any)
    .update(table)
    .set(processedData)
    .where(and(eq(table.id, id), eq(config.bizIdColumn, bizId)))
    .returning();

  if (config.hooks?.afterUpdate && updated) {
    await config.hooks.afterUpdate(updated, bizId);
  }

  return (updated as T) ?? null;
}

/**
 * حذف سجل مع التحقق من الملكية
 */
export async function deleteRecord(
  config: CrudConfig<any>,
  id: number,
  bizId: number,
  dbOrTx: DbOrTx = db
): Promise<boolean> {
  const table = config.table as any;

  const existing = await getOne(config, id, bizId, dbOrTx);
  if (!existing) return false;

  if (config.hooks?.beforeDelete) {
    await config.hooks.beforeDelete(id, bizId);
  }

  await (dbOrTx as any)
    .delete(table)
    .where(and(eq(table.id, id), eq(config.bizIdColumn, bizId)));

  if (config.hooks?.afterDelete) {
    await config.hooks.afterDelete(id, bizId);
  }

  return true;
}

/**
 * التحقق من وجود تكرار في حقل معين
 */
export async function checkDuplicate(
  config: CrudConfig<any>,
  field: PgColumn,
  value: unknown,
  bizId: number,
  excludeId?: number,
  dbOrTx: DbOrTx = db
): Promise<boolean> {
  const table = config.table as any;

  const conditions: SQL[] = [
    eq(config.bizIdColumn, bizId),
    eq(field, value as any),
  ];

  if (excludeId) {
    const { ne } = await import("drizzle-orm");
    conditions.push(ne(table.id, excludeId));
  }

  const [result] = await (dbOrTx as any)
    .select({ count: sql<number>`count(*)::int` })
    .from(table)
    .where(and(...conditions));

  return Number(result?.count ?? 0) > 0;
}

/**
 * دالة مساعدة لبناء response موحدة لقائمة السجلات
 */
export function buildListResponse<T>(result: CrudListResult<T>) {
  return {
    data: result.data,
    pagination: {
      total: result.total,
      page: result.page,
      pageSize: result.pageSize,
      totalPages: result.totalPages,
    },
  };
}

// Alias for backward compatibility
export const getRecord = getOne;
