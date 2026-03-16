/**
 * محرك بناء الواجهات الديناميكي (Dynamic UI Builder Engine)
 * ====================================
 * حسب الخطة التنفيذية - محرك 2
 * 
 * تطوير من محرك الشاشات المخصصة الموجود
 * 
 * الدوال:
 * - getPage(bizId, pageKey) → جلب صفحة ديناميكية مع مكوناتها ومصادر بياناتها
 * - getPages(bizId) → جلب كل الصفحات الديناميكية
 * - createPage(bizId, data) → إنشاء صفحة جديدة
 * - updatePage(bizId, pageId, data) → تحديث صفحة
 * - deletePage(bizId, pageId) → حذف صفحة
 * - addComponent(bizId, pageId, data) → إضافة مكون لصفحة
 * - updateComponent(bizId, componentId, data) → تحديث مكون
 * - deleteComponent(bizId, componentId) → حذف مكون
 * - createDataSource(bizId, data) → إنشاء مصدر بيانات
 * - getDataSources(bizId) → جلب مصادر البيانات
 * - executeDataSource(bizId, dataSourceId, params) → تنفيذ مصدر بيانات وجلب النتائج
 */

import { db } from '../db/index.ts';
import { eq, and, sql, asc } from 'drizzle-orm';
import { normalizeDbResult } from '../utils/db-result.ts';
import {
  uiPages, uiComponents, uiDataSources,
} from '../db/schema/index.ts';

// ===================== الصفحات =====================

export async function getPages(bizId: number) {
  const pages = await db.select()
    .from(uiPages)
    .where(and(eq(uiPages.businessId, bizId), eq(uiPages.isActive, true)))
    .orderBy(uiPages.sortOrder);
  return pages;
}

export async function getPage(bizId: number, pageKey: string) {
  const [page] = await db.select()
    .from(uiPages)
    .where(and(eq(uiPages.businessId, bizId), eq(uiPages.pageKey, pageKey)));

  if (!page) return null;

  // جلب مكونات الصفحة
  const components = await db.select()
    .from(uiComponents)
    .where(and(eq(uiComponents.pageId, page.id), eq(uiComponents.isVisible, true)))
    .orderBy(uiComponents.sortOrder);

  // جلب مصادر البيانات المرتبطة
  const dataSourceIds = components
    .filter(c => c.dataSourceId)
    .map(c => c.dataSourceId!);

  let dataSources: any[] = [];
  if (dataSourceIds.length > 0) {
    dataSources = await db.select()
      .from(uiDataSources)
      .where(and(eq(uiDataSources.businessId, bizId), eq(uiDataSources.isActive, true)));
    dataSources = dataSources.filter(ds => dataSourceIds.includes(ds.id));
  }

  return { page, components, dataSources };
}

export async function getPageById(bizId: number, pageId: number) {
  const [page] = await db.select()
    .from(uiPages)
    .where(and(eq(uiPages.id, pageId), eq(uiPages.businessId, bizId)));

  if (!page) return null;

  const components = await db.select()
    .from(uiComponents)
    .where(eq(uiComponents.pageId, page.id))
    .orderBy(uiComponents.sortOrder);

  return { page, components };
}

export async function createPage(bizId: number, data: {
  pageKey: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  layout?: string;
  config?: any;
  createdBy?: number;
}) {
  const [page] = await db.insert(uiPages).values({
    businessId: bizId,
    pageKey: data.pageKey,
    title: data.title,
    description: data.description || null,
    icon: data.icon || 'dashboard',
    color: data.color || '#3b82f6',
    layout: data.layout || 'grid',
    config: data.config || {},
    createdBy: data.createdBy || null,
  }).returning();

  return page;
}

export async function updatePage(bizId: number, pageId: number, data: any) {
  const updateData: any = { updatedAt: new Date() };
  if (data.title !== undefined) updateData.title = data.title;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.icon !== undefined) updateData.icon = data.icon;
  if (data.color !== undefined) updateData.color = data.color;
  if (data.layout !== undefined) updateData.layout = data.layout;
  if (data.config !== undefined) updateData.config = data.config;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;
  if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

  await db.update(uiPages)
    .set(updateData)
    .where(and(eq(uiPages.id, pageId), eq(uiPages.businessId, bizId)));

  return getPageById(bizId, pageId);
}

export async function deletePage(bizId: number, pageId: number) {
  // حذف المكونات أولاً
  await db.delete(uiComponents)
    .where(and(eq(uiComponents.pageId, pageId), eq(uiComponents.businessId, bizId)));
  // حذف الصفحة
  await db.delete(uiPages)
    .where(and(eq(uiPages.id, pageId), eq(uiPages.businessId, bizId)));
}

// ===================== المكونات =====================

export async function addComponent(bizId: number, pageId: number, data: {
  componentType: string;
  title?: string;
  config?: any;
  dataSourceId?: number;
  positionX?: number;
  positionY?: number;
  width?: number;
  height?: number;
}) {
  const [component] = await db.insert(uiComponents).values({
    businessId: bizId,
    pageId,
    componentType: data.componentType,
    title: data.title || null,
    config: data.config || {},
    dataSourceId: data.dataSourceId || null,
    positionX: data.positionX || 0,
    positionY: data.positionY || 0,
    width: data.width || 6,
    height: data.height || 4,
  }).returning();

  return component;
}

export async function updateComponent(bizId: number, componentId: number, data: any) {
  const updateData: any = { updatedAt: new Date() };
  if (data.componentType !== undefined) updateData.componentType = data.componentType;
  if (data.title !== undefined) updateData.title = data.title;
  if (data.config !== undefined) updateData.config = data.config;
  if (data.dataSourceId !== undefined) updateData.dataSourceId = data.dataSourceId;
  if (data.positionX !== undefined) updateData.positionX = data.positionX;
  if (data.positionY !== undefined) updateData.positionY = data.positionY;
  if (data.width !== undefined) updateData.width = data.width;
  if (data.height !== undefined) updateData.height = data.height;
  if (data.isVisible !== undefined) updateData.isVisible = data.isVisible;
  if (data.sortOrder !== undefined) updateData.sortOrder = data.sortOrder;

  await db.update(uiComponents)
    .set(updateData)
    .where(and(eq(uiComponents.id, componentId), eq(uiComponents.businessId, bizId)));
}

export async function deleteComponent(bizId: number, componentId: number) {
  await db.delete(uiComponents)
    .where(and(eq(uiComponents.id, componentId), eq(uiComponents.businessId, bizId)));
}

// ===================== مصادر البيانات =====================

export async function getDataSources(bizId: number) {
  return db.select()
    .from(uiDataSources)
    .where(and(eq(uiDataSources.businessId, bizId), eq(uiDataSources.isActive, true)));
}

export async function createDataSource(bizId: number, data: {
  name: string;
  sourceType: string;
  tableName?: string;
  queryTemplate?: string;
  filters?: any;
  sorting?: any;
  config?: any;
}) {
  const [ds] = await db.insert(uiDataSources).values({
    businessId: bizId,
    name: data.name,
    sourceType: data.sourceType,
    tableName: data.tableName || null,
    queryTemplate: data.queryTemplate || null,
    filters: data.filters || {},
    sorting: data.sorting || {},
    config: data.config || {},
  }).returning();

  return ds;
}

export async function updateDataSource(bizId: number, dsId: number, data: any) {
  const updateData: any = { updatedAt: new Date() };
  if (data.name !== undefined) updateData.name = data.name;
  if (data.sourceType !== undefined) updateData.sourceType = data.sourceType;
  if (data.tableName !== undefined) updateData.tableName = data.tableName;
  if (data.queryTemplate !== undefined) updateData.queryTemplate = data.queryTemplate;
  if (data.filters !== undefined) updateData.filters = data.filters;
  if (data.sorting !== undefined) updateData.sorting = data.sorting;
  if (data.config !== undefined) updateData.config = data.config;
  if (data.isActive !== undefined) updateData.isActive = data.isActive;

  await db.update(uiDataSources)
    .set(updateData)
    .where(and(eq(uiDataSources.id, dsId), eq(uiDataSources.businessId, bizId)));
}

export async function deleteDataSource(bizId: number, dsId: number) {
  await db.delete(uiDataSources)
    .where(and(eq(uiDataSources.id, dsId), eq(uiDataSources.businessId, bizId)));
}

// ===================== تنفيذ مصدر بيانات =====================

export async function executeDataSource(bizId: number, dataSourceId: number, params?: any) {
  const [ds] = await db.select()
    .from(uiDataSources)
    .where(and(eq(uiDataSources.id, dataSourceId), eq(uiDataSources.businessId, bizId)));

  if (!ds) throw new Error('مصدر البيانات غير موجود');

  if (ds.sourceType === 'table' && ds.tableName) {
    // جلب بيانات من جدول مباشرة (مع فلتر bizId)
    const limit = params?.limit || 100;
    const offset = params?.offset || 0;
    const result = await db.execute(sql`
      SELECT * FROM ${sql.identifier(ds.tableName)}
      WHERE business_id = ${bizId}
      LIMIT ${limit} OFFSET ${offset}
    `);
    const rows = normalizeDbResult(result);
    return { data: rows, total: rows.length };
  }

  if (ds.sourceType === 'query' && ds.queryTemplate) {
    // ── حماية SQL Injection المعززة (Phase 2) ──────────────────────────
    
    // قائمة الجداول المسموح بالاستعلام منها فقط (whitelist)
    const ALLOWED_TABLES = new Set([
      'vouchers', 'voucher_lines', 'accounts', 'account_balances',
      'funds', 'fund_balances', 'employees', 'salary_records',
      'inventory_items', 'inventory_stock', 'inventory_movements',
      'warehouse_operations', 'warehouse_operation_items', 'warehouses',
      'purchase_invoices', 'purchase_invoice_items',
      'journal_entries', 'journal_entry_lines',
      'operation_types', 'operation_categories',
      'currencies', 'exchange_rates',
      'suppliers', 'supplier_balances',
      'expense_categories', 'expense_budget',
      'reconciliations', 'reconciliation_items',
      'audit_log', 'analytics_snapshots',
      'departments', 'job_titles',
    ]);

    const template = ds.queryTemplate.trim();

    // 1. يجب أن يبدأ بـ SELECT فقط
    if (!/^SELECT/i.test(template)) {
      throw new Error('يُسمح فقط باستعلامات SELECT');
    }

    // 2. رفض الكلمات المحظورة
    const forbidden = /(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE|EXEC|EXECUTE|GRANT|REVOKE|COPY|LOAD|INTO\s+OUTFILE|ATTACH|DETACH|PRAGMA)/i;
    if (forbidden.test(template)) {
      throw new Error('الاستعلام يحتوي على عمليات غير مسموح بها');
    }

    // 3. رفض التعليقات والاستعلامات المتعددة
    if (/--|\/\*|;|UNION.*SELECT/i.test(template)) {
      throw new Error('الاستعلام يحتوي على أنماط غير مسموح بها');
    }

    // 4. التحقق أن الاستعلام يستخدم جداول من القائمة المسموحة فقط
    const fromMatches = template.matchAll(/FROM\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi);
    const joinMatches = template.matchAll(/JOIN\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi);
    const allTables = [
      ...[...fromMatches].map(m => m[1].toLowerCase()),
      ...[...joinMatches].map(m => m[1].toLowerCase()),
    ];
    for (const tbl of allTables) {
      if (!ALLOWED_TABLES.has(tbl)) {
        throw new Error(`الجدول '${tbl}' غير مسموح بالاستعلام منه`);
      }
    }

    // 5. تنفيذ الاستعلام مع إلزامية business_id
    const result = await db.execute(sql`SELECT * FROM (${sql.raw(template)}) AS q WHERE q.business_id = ${bizId} LIMIT 1000`);
    const rows = normalizeDbResult(result);
    return { data: rows, total: rows.length };
  }

  return { data: [], total: 0 };
}
