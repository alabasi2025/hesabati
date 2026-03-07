/**
 * مسارات بناء الواجهات الديناميكية (UI Builder) — صفحات، مكونات، مصادر بيانات
 */
import { Hono } from 'hono';
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { checkPermission } from '../../middleware/permissions.ts';
import { safeHandler, normalizeBody, parseId } from '../../middleware/helpers.ts';
import { getBizId } from './_shared/context-helpers.ts';
import {
  getPages,
  getPage,
  getPageById,
  createPage,
  updatePage,
  deletePage,
  addComponent,
  updateComponent,
  deleteComponent,
  getDataSources,
  createDataSource,
  updateDataSource,
  deleteDataSource,
  executeDataSource,
} from '../../services/ui-builder.service.ts';

const uiBuilderRoutes = new Hono();

uiBuilderRoutes.get('/businesses/:bizId/ui/pages', bizAuthMiddleware(), safeHandler('جلب الصفحات', async (c) => {
  const bizId = getBizId(c);
  const pages = await getPages(bizId);
  return c.json(pages);
}));

uiBuilderRoutes.get('/businesses/:bizId/ui/pages/key/:pageKey', bizAuthMiddleware(), safeHandler('جلب صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageKey = c.req.param('pageKey');
  const result = await getPage(bizId, pageKey);
  if (!result) return c.json({ error: 'الصفحة غير موجودة' }, 404);
  return c.json(result);
}));

uiBuilderRoutes.get('/businesses/:bizId/ui/pages/:pageId', bizAuthMiddleware(), safeHandler('جلب صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const result = await getPageById(bizId, pageId);
  if (!result) return c.json({ error: 'الصفحة غير موجودة' }, 404);
  return c.json(result);
}));

uiBuilderRoutes.post('/businesses/:bizId/ui/pages', bizAuthMiddleware(), checkPermission('ui_builder', 'create'), safeHandler('إنشاء صفحة', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.pageKey || !body.title) return c.json({ error: 'المفتاح والعنوان مطلوبان' }, 400);
  const page = await createPage(bizId, body);
  return c.json(page, 201);
}));

uiBuilderRoutes.put('/businesses/:bizId/ui/pages/:pageId', bizAuthMiddleware(), safeHandler('تحديث صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const result = await updatePage(bizId, pageId, body);
  return c.json(result);
}));

uiBuilderRoutes.delete('/businesses/:bizId/ui/pages/:pageId', bizAuthMiddleware(), safeHandler('حذف صفحة', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  await deletePage(bizId, pageId);
  return c.json({ success: true });
}));

uiBuilderRoutes.post('/businesses/:bizId/ui/pages/:pageId/components', bizAuthMiddleware(), safeHandler('إضافة مكون', async (c) => {
  const bizId = getBizId(c);
  const pageId = parseId(c.req.param('pageId'));
  if (!pageId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.componentType) return c.json({ error: 'نوع المكون مطلوب' }, 400);
  const component = await addComponent(bizId, pageId, body);
  return c.json(component, 201);
}));

uiBuilderRoutes.put('/businesses/:bizId/ui/components/:componentId', bizAuthMiddleware(), safeHandler('تحديث مكون', async (c) => {
  const bizId = getBizId(c);
  const componentId = parseId(c.req.param('componentId'));
  if (!componentId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  await updateComponent(bizId, componentId, body);
  return c.json({ success: true });
}));

uiBuilderRoutes.delete('/businesses/:bizId/ui/components/:componentId', bizAuthMiddleware(), safeHandler('حذف مكون', async (c) => {
  const bizId = getBizId(c);
  const componentId = parseId(c.req.param('componentId'));
  if (!componentId) return c.json({ error: 'معرّف غير صالح' }, 400);
  await deleteComponent(bizId, componentId);
  return c.json({ success: true });
}));

uiBuilderRoutes.get('/businesses/:bizId/ui/data-sources', bizAuthMiddleware(), safeHandler('جلب مصادر بيانات', async (c) => {
  const bizId = getBizId(c);
  const sources = await getDataSources(bizId);
  return c.json(sources);
}));

uiBuilderRoutes.post('/businesses/:bizId/ui/data-sources', bizAuthMiddleware(), safeHandler('إنشاء مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  if (!body.name || !body.sourceType) return c.json({ error: 'الاسم والنوع مطلوبان' }, 400);
  const user = c.get('user') as { role?: string } | undefined;
  if (body.sourceType === 'query' && user?.role !== 'admin') {
    return c.json({ error: 'إنشاء مصدر بيانات من نوع استعلام مخصص متاح للمسؤول فقط' }, 403);
  }
  const ds = await createDataSource(bizId, body);
  return c.json(ds, 201);
}));

uiBuilderRoutes.put('/businesses/:bizId/ui/data-sources/:dsId', bizAuthMiddleware(), safeHandler('تحديث مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const dsId = parseId(c.req.param('dsId'));
  if (!dsId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const user = c.get('user') as { role?: string } | undefined;
  const isAdmin = user?.role === 'admin';
  const touchesQuery = body.sourceType === 'query' || body.queryTemplate !== undefined;
  if (!isAdmin && touchesQuery) {
    return c.json({ error: 'تعديل مصدر بيانات استعلام مخصص أو قالب الاستعلام متاح للمسؤول فقط' }, 403);
  }
  const sources = await getDataSources(bizId);
  const existing = sources.find((s: { id: number; sourceType?: string }) => s.id === dsId);
  if (existing?.sourceType === 'query' && !isAdmin) {
    return c.json({ error: 'تعديل مصدر بيانات من نوع استعلام مخصص متاح للمسؤول فقط' }, 403);
  }
  await updateDataSource(bizId, dsId, body);
  return c.json({ success: true });
}));

uiBuilderRoutes.delete('/businesses/:bizId/ui/data-sources/:dsId', bizAuthMiddleware(), safeHandler('حذف مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const dsId = parseId(c.req.param('dsId'));
  if (!dsId) return c.json({ error: 'معرّف غير صالح' }, 400);
  await deleteDataSource(bizId, dsId);
  return c.json({ success: true });
}));

uiBuilderRoutes.post('/businesses/:bizId/ui/data-sources/:dsId/execute', bizAuthMiddleware(), safeHandler('تنفيذ مصدر بيانات', async (c) => {
  const bizId = getBizId(c);
  const dsId = parseId(c.req.param('dsId'));
  if (!dsId) return c.json({ error: 'معرّف غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const result = await executeDataSource(bizId, dsId, body);
  return c.json(result);
}));

export default uiBuilderRoutes;
