/**
 * pagination.ts — مساعد الترقيم (Pagination)
 * يوفر دوال لاستخراج معاملات الترقيم من الطلبات وبناء الاستجابة
 */
import { Context } from "hono";

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
  search?: string;
  sortBy?: string;
  sortOrder: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

/**
 * استخراج معاملات الترقيم من query parameters
 * @param c - Hono Context
 * @param defaults - القيم الافتراضية
 */
export function getPaginationParams(
  c: Context,
  defaults: { limit?: number; maxLimit?: number; sortBy?: string } = {},
): PaginationParams {
  const {
    limit: defaultLimit = 50,
    maxLimit = 200,
    sortBy: defaultSortBy,
  } = defaults;

  const page = Math.max(
    1,
    Number.parseInt(c.req.query("page") || "1", 10) || 1,
  );
  const rawLimit =
    Number.parseInt(c.req.query("limit") || String(defaultLimit), 10) ||
    defaultLimit;
  const limit = Math.min(Math.max(1, rawLimit), maxLimit);
  const offset = (page - 1) * limit;
  const search = c.req.query("search")?.trim() || undefined;
  const sortBy = c.req.query("sortBy") || defaultSortBy;
  const rawOrder = c.req.query("sortOrder")?.toLowerCase();
  const sortOrder: "asc" | "desc" = rawOrder === "desc" ? "desc" : "asc";

  return { page, limit, offset, search, sortBy, sortOrder };
}

/**
 * بناء استجابة مرقمة
 */
export function paginatedResult<T>(
  data: T[],
  total: number,
  params: PaginationParams,
): PaginatedResponse<T> {
  const totalPages = Math.ceil(total / params.limit) || 1;
  return {
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages,
      hasNext: params.page < totalPages,
      hasPrev: params.page > 1,
    },
  };
}
