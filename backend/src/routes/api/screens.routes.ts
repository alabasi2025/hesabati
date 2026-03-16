/**
 * Screens Routes — مسارات الشاشات المخصصة والـ Widgets
 * @module routes/api/screens.routes
 * @since Phase 4
 */
import { Hono } from 'hono';
import { db } from '../../db/index.ts';
import {
  screenTemplates, screenWidgets, screenWidgetTemplates,
  screenWidgetAccounts, screenPermissions, customScreenConfig,
  sidebarItems, sidebarSections, uiPages, uiComponents
} from '../../db/schema/core.ts';
import { eq, and, inArray, desc } from 'drizzle-orm';
import { bizAuthMiddleware, getBizId, getUserId, safeHandler, normalizeBody, parseId } from '../../middleware/auth.ts';
import * as ScreensEng from '../../engines/screens.engine.ts';

export const screensRoutes = new Hono();
const api = screensRoutes;

// ===================== الشاشات المخصصة =====================
api.get('/businesses/:bizId/screens', bizAuthMiddleware(), safeHandler('جلب الشاشات', async (c) => {
  const bizId = getBizId(c);
  const rows = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId)).orderBy(screenTemplates.name);
  return c.json(rows);
}));

api.post('/businesses/:bizId/screens', bizAuthMiddleware(), safeHandler('إضافة شاشة', async (c) => {
  const bizId = getBizId(c);
  const body = normalizeBody(await c.req.json());
  
  if (!body.name) return c.json({ error: 'اسم الشاشة مطلوب' }, 400);
  
  const { widgets, addToSidebar, sidebarSectionId, sidebarSortOrder, ...screenData } = body;
  const [created] = await db.insert(screenTemplates).values({
    ...screenData,
    businessId: bizId,
    createdBy: getUserId(c),
  }).returning();
  
  // إنشاء الويدجتس إذا وجدت
  if (widgets && Array.isArray(widgets)) {
    for (let i = 0; i < widgets.length; i++) {
      const w = widgets[i];
      await db.insert(screenWidgets).values({
        screenId: created.id,
        widgetType: w.widgetType || w.type || 'custom',
        title: w.title || `عنصر ${i + 1}`,
        config: w.config || {},
        positionX: w.positionX || 0,
        positionY: w.positionY || i,
        width: w.width || 12,
        height: w.height || 4,
        sortOrder: w.sortOrder || i,
      });
    }
  }
  
  // === إضافة الشاشة تلقائياً للسايدبار إذا طُلب ذلك ===
  if (addToSidebar) {
    try {
      // استخدام القسم المحدد من المستخدم أو البحث عن قسم افتراضي
      let sectionId: number;
      if (sidebarSectionId) {
        // التحقق من وجود القسم المحدد
        const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, sidebarSectionId));
        if (section) {
          sectionId = section.id;
        } else {
          // القسم المحدد غير موجود، استخدام الافتراضي
          const [defaultSection] = await db.select().from(sidebarSections)
            .where(and(eq(sidebarSections.businessId, bizId), eq(sidebarSections.name, 'شاشات مخصصة')));
          sectionId = defaultSection ? defaultSection.id : (await db.insert(sidebarSections).values({
            businessId: bizId, name: 'شاشات مخصصة', icon: 'space_dashboard', sortOrder: 99,
          }).returning())[0].id;
        }
      } else {
        // لم يتم تحديد قسم، البحث عن "شاشات مخصصة" أو إنشاء واحد
        const [defaultSection] = await db.select().from(sidebarSections)
          .where(and(eq(sidebarSections.businessId, bizId), eq(sidebarSections.name, 'شاشات مخصصة')));
        if (defaultSection) {
          sectionId = defaultSection.id;
        } else {
          const [newSection] = await db.insert(sidebarSections).values({
            businessId: bizId, name: 'شاشات مخصصة', icon: 'space_dashboard', sortOrder: 99,
          }).returning();
          sectionId = newSection.id;
        }
      }
      
      // إنشاء عنصر في السايدبار مع الترتيب المحدد
      const [sidebarItem] = await db.insert(sidebarItems).values({
        sectionId,
        screenKey: `custom-screen-${created.id}`,
        label: created.name,
        icon: created.icon || 'space_dashboard',
        route: `/biz/${bizId}/custom-screens?screen=${created.id}`,
        sortOrder: sidebarSortOrder || 0,
        isActive: true,
      }).returning();
      
      // إضافة العنصر لجميع المستخدمين الذين لديهم إعدادات سايدبار
      const configs = await db.select().from(userSidebarConfig).where(eq(userSidebarConfig.businessId, bizId));
      const userIds = [...new Set(configs.map((cfg: any) => cfg.userId))];
      for (const userId of userIds) {
        await db.insert(userSidebarConfig).values({
          userId, businessId: bizId, sidebarItemId: sidebarItem.id,
          isVisible: true, customSortOrder: sidebarItem.sortOrder || 0,
        });
      }
    } catch (sidebarErr: unknown) {
      console.error('خطأ في إضافة الشاشة للسايدبار:', toErrorMessage(sidebarErr));
      // لا نُفشل العملية الأساسية إذا فشلت إضافة السايدبار
    }
  }
  
  return c.json(created, 201);
}));

api.put('/screens/:id', safeHandler('تعديل شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const [rec] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(screenTemplates).set({ ...body, updatedAt: new Date() }).where(eq(screenTemplates.id, id)).returning();
  if (!updated) return c.json({ error: 'شاشة غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/screens/:id', safeHandler('حذف شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const [rec] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, id));
  const err = await requireResourceOwnership(c, rec ?? null);
  if (err) return err;
  // حذف كل العلاقات
  const widgets = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, id));
  for (const w of widgets) {
    await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, w.id));
    await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, w.id));
  }
  await db.delete(screenWidgets).where(eq(screenWidgets.screenId, id));
  await db.delete(screenPermissions).where(eq(screenPermissions.screenId, id));
  // حذف عنصر السايدبار المرتبط بالشاشة (إن وجد)
  const sidebarRoute = `custom-screens?screen=${id}`;
  const linkedSidebarItems = await db.select().from(sidebarItems).where(sql`${sidebarItems.route} LIKE ${'%' + sidebarRoute}`);
  for (const item of linkedSidebarItems) {
    await db.delete(userSidebarConfig).where(eq(userSidebarConfig.sidebarItemId, item.id));
    await db.delete(sidebarItems).where(eq(sidebarItems.id, item.id));
  }
  await db.delete(screenTemplates).where(eq(screenTemplates.id, id));
  return c.json({ success: true });
}));

// ===================== ويدجتس الشاشات =====================
api.get('/screens/:screenId/widgets', safeHandler('جلب ويدجتس الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (screenId) {
    const [scr] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, screenId));
    const scrErr = await requireResourceOwnership(c, scr ?? null);
    if (scrErr) return scrErr;
  }
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const rows = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, screenId)).orderBy(screenWidgets.sortOrder);
  return c.json(rows);
}));

api.post('/screens/:screenId/widgets', safeHandler('إضافة ويدجت', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (screenId) {
    const [scr] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, screenId));
    const scrErr = await requireResourceOwnership(c, scr ?? null);
    if (scrErr) return scrErr;
  }
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.widgetType) return c.json({ error: 'نوع العنصر (widgetType) مطلوب' }, 400);
  if (!body.title) return c.json({ error: 'عنوان العنصر (title) مطلوب' }, 400);
  const [created] = await db.insert(screenWidgets).values({ ...body, screenId }).returning();
  return c.json(created, 201);
}));

api.put('/widgets/:id', safeHandler('تعديل ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [updated] = await db.update(screenWidgets).set({ ...body, updatedAt: new Date() }).where(eq(screenWidgets.id, id)).returning();
  if (!updated) return c.json({ error: 'عنصر غير موجود' }, 404);
  return c.json(updated);
}));

api.delete('/widgets/:id', safeHandler('حذف ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, id));
  await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, id));
  await db.delete(screenWidgets).where(eq(screenWidgets.id, id));
  return c.json({ success: true });
}));

api.put('/screens/:screenId/widgets/batch', safeHandler('تحديث ويدجتس دفعة واحدة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const { widgets } = body;
  if (!widgets || !Array.isArray(widgets)) return c.json({ error: 'قائمة العناصر (widgets) مطلوبة' }, 400);
  
  const results = [];
  for (const w of widgets) {
    if (w.id) {
      const [updated] = await db.update(screenWidgets).set({
        positionX: w.positionX, positionY: w.positionY,
        width: w.width, height: w.height, sortOrder: w.sortOrder,
      }).where(eq(screenWidgets.id, w.id)).returning();
      if (updated) results.push(updated);
    }
  }
  return c.json(results);
}));

// ===================== ربط القوالب والحسابات بالعناصر =====================
api.get('/widgets/:widgetId/templates', safeHandler('جلب قوالب الويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const rows = await db.select({
    id: screenWidgetTemplates.id, widgetId: screenWidgetTemplates.widgetId,
    operationTypeId: screenWidgetTemplates.operationTypeId, sortOrder: screenWidgetTemplates.sortOrder,
    operationName: operationTypes.name, operationIcon: operationTypes.icon,
    operationColor: operationTypes.color,
  }).from(screenWidgetTemplates)
    .leftJoin(operationTypes, eq(screenWidgetTemplates.operationTypeId, operationTypes.id))
    .where(eq(screenWidgetTemplates.widgetId, widgetId));
  return c.json(rows);
}));

api.post('/widgets/:widgetId/templates', safeHandler('ربط قالب بويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.operationTypeId) return c.json({ error: 'معرّف نوع العملية مطلوب' }, 400);
  const [created] = await db.insert(screenWidgetTemplates).values({ ...body, widgetId }).returning();
  return c.json(created, 201);
}));

api.delete('/widget-templates/:id', safeHandler('فك ربط قالب من ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الربط غير صالح' }, 400);
  await db.delete(screenWidgetTemplates).where(eq(screenWidgetTemplates.id, id));
  return c.json({ success: true });
}));

api.get('/widgets/:widgetId/accounts', safeHandler('جلب حسابات الويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const rows = await db.select({
    id: screenWidgetAccounts.id, widgetId: screenWidgetAccounts.widgetId,
    accountId: screenWidgetAccounts.accountId, sortOrder: screenWidgetAccounts.sortOrder,
    accountName: accounts.name, accountType: accounts.accountType,
  }).from(screenWidgetAccounts)
    .leftJoin(accounts, eq(screenWidgetAccounts.accountId, accounts.id))
    .where(eq(screenWidgetAccounts.widgetId, widgetId));
  return c.json(rows);
}));

api.post('/widgets/:widgetId/accounts', safeHandler('ربط حساب بويدجت', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.accountId) return c.json({ error: 'معرّف الحساب مطلوب' }, 400);
  const [created] = await db.insert(screenWidgetAccounts).values({ ...body, widgetId }).returning();
  return c.json(created, 201);
}));

api.delete('/widget-accounts/:id', safeHandler('فك ربط حساب من ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الربط غير صالح' }, 400);
  await db.delete(screenWidgetAccounts).where(eq(screenWidgetAccounts.id, id));
  return c.json({ success: true });
}));

// ===================== نسخ الشاشات =====================
api.post('/screens/:screenId/clone', safeHandler('نسخ شاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  
  const [original] = await db.select().from(screenTemplates).where(eq(screenTemplates.id, screenId));
  if (!original) return c.json({ error: 'الشاشة الأصلية غير موجودة' }, 404);
  
  const [cloned] = await db.insert(screenTemplates).values({
    businessId: original.businessId,
    name: body.name || `${original.name} (نسخة)`,
    description: body.description || original.description,
    icon: original.icon,
    color: original.color,
    layoutConfig: original.layoutConfig,
    templateKey: original.templateKey,
  }).returning();
  
  // نسخ الويدجتس
  const originalWidgets = await db.select().from(screenWidgets).where(eq(screenWidgets.screenId, screenId));
  for (const w of originalWidgets) {
    const [newWidget] = await db.insert(screenWidgets).values({
      screenId: cloned.id, widgetType: w.widgetType, title: w.title,
      config: w.config, positionX: w.positionX, positionY: w.positionY,
      width: w.width, height: w.height, sortOrder: w.sortOrder,
    }).returning();
    
    // نسخ القوالب المرتبطة
    const wTemplates = await db.select().from(screenWidgetTemplates).where(eq(screenWidgetTemplates.widgetId, w.id));
    for (const t of wTemplates) {
      await db.insert(screenWidgetTemplates).values({
        widgetId: newWidget.id, operationTypeId: t.operationTypeId, sortOrder: t.sortOrder,
      });
    }
    
    // نسخ الحسابات المرتبطة
    const wAccounts = await db.select().from(screenWidgetAccounts).where(eq(screenWidgetAccounts.widgetId, w.id));
    for (const a of wAccounts) {
      await db.insert(screenWidgetAccounts).values({
        widgetId: newWidget.id, accountId: a.accountId, sortOrder: a.sortOrder,
      });
    }
  }
  
  return c.json(cloned, 201);
}));

api.post('/widgets/:widgetId/copy-to/:targetScreenId', safeHandler('نسخ ويدجت لشاشة أخرى', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  const targetScreenId = parseId(c.req.param('targetScreenId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  if (!targetScreenId) return c.json({ error: 'معرّف الشاشة الهدف غير صالح' }, 400);
  
  const [original] = await db.select().from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!original) return c.json({ error: 'العنصر الأصلي غير موجود' }, 404);
  
  const [copied] = await db.insert(screenWidgets).values({
    screenId: targetScreenId, widgetType: original.widgetType, title: original.title,
    config: original.config, positionX: original.positionX, positionY: original.positionY,
    width: original.width, height: original.height, sortOrder: original.sortOrder,
  }).returning();
  
  return c.json(copied, 201);
}));

api.get('/businesses/:bizId/screens-with-widgets', bizAuthMiddleware(), safeHandler('جلب الشاشات مع الويدجتس', async (c) => {
  const bizId = getBizId(c);
  const screensArr = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId)).orderBy(screenTemplates.name);
  
  const screenIds = screensArr.map(s => s.id);
  let allWidgets: any[] = [];
  if (screenIds.length > 0) {
    allWidgets = await db.select().from(screenWidgets).where(inArray(screenWidgets.screenId, screenIds)).orderBy(screenWidgets.sortOrder);
  }
  
  const widgetMap: Record<number, any[]> = {};
  for (const w of allWidgets) {
    if (!widgetMap[w.screenId]) widgetMap[w.screenId] = [];
    widgetMap[w.screenId].push(w);
  }
  
  return c.json(screensArr.map(s => ({ ...s, widgets: widgetMap[s.id] || [] })));
}));

// ===================== صلاحيات الشاشات =====================
api.get('/screens/:screenId/permissions', safeHandler('جلب صلاحيات الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const rows = await db.select({
    id: screenPermissions.id, screenId: screenPermissions.screenId,
    userId: screenPermissions.userId, permission: screenPermissions.permission,
    sortOrder: screenPermissions.sortOrder,
    username: users.username, fullName: users.fullName,
  }).from(screenPermissions)
    .leftJoin(users, eq(screenPermissions.userId, users.id))
    .where(eq(screenPermissions.screenId, screenId));
  return c.json(rows);
}));

api.post('/screens/:screenId/permissions', safeHandler('تعيين صلاحيات الشاشة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  if (!body.userId) return c.json({ error: 'معرّف المستخدم مطلوب' }, 400);
  const [created] = await db.insert(screenPermissions).values({
    screenId,
    userId: body.userId,
    permission: body.permission || body.canView ? 'view' : 'execute',
    sortOrder: body.sortOrder || 0,
  }).returning();
  return c.json(created, 201);
}));

api.put('/screen-permissions/:id', safeHandler('تعديل صلاحية شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصلاحية غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const updateData: any = {};
  if (body.permission !== undefined) updateData.permission = body.permission;
  if (body.sortOrder !== undefined) updateData.sortOrder = body.sortOrder;
  // تحويل canView/canEdit/canDelete إلى permission
  if (body.canView !== undefined || body.canEdit !== undefined || body.canDelete !== undefined) {
    if (body.canEdit || body.canDelete) updateData.permission = 'execute';
    else if (body.canView) updateData.permission = 'view';
  }
  const [updated] = await db.update(screenPermissions).set(updateData).where(eq(screenPermissions.id, id)).returning();
  if (!updated) return c.json({ error: 'صلاحية غير موجودة' }, 404);
  return c.json(updated);
}));

api.delete('/screen-permissions/:id', safeHandler('حذف صلاحية شاشة', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف الصلاحية غير صالح' }, 400);
  await db.delete(screenPermissions).where(eq(screenPermissions.id, id));
  return c.json({ success: true });
}));

api.put('/screens/:screenId/permissions/batch', safeHandler('تحديث صلاحيات دفعة واحدة', async (c) => {
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const { permissions } = body;
  if (!permissions || !Array.isArray(permissions)) return c.json({ error: 'قائمة الصلاحيات مطلوبة' }, 400);
  
  for (const p of permissions) {
    const permission = (p.canEdit || p.canDelete) ? 'execute' : (p.permission || 'view');
    if (p.id) {
      await db.update(screenPermissions).set({ permission }).where(eq(screenPermissions.id, p.id));
    } else if (p.userId) {
      await db.insert(screenPermissions).values({
        screenId, userId: p.userId, permission, sortOrder: p.sortOrder || 0,
      });
    }
  }
  return c.json({ success: true });
}));

// ===================== إضافة شاشة للسايدبار (إصلاح #1 الرئيسي) =====================
api.post('/businesses/:bizId/screens/:screenId/add-to-sidebar', bizAuthMiddleware(), safeHandler('إضافة شاشة للسايدبار', async (c) => {
  const bizId = getBizId(c);
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  
  // التحقق من وجود الشاشة
  const [screen] = await db.select().from(screenTemplates).where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));
  if (!screen) return c.json({ error: 'الشاشة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  
  const body = normalizeBody(await c.req.json());
  
  // إصلاح #1: التحقق من sectionId مع قيمة افتراضية
  let sectionId = body.sectionId || body.section_id;
  
  if (sectionId) {
    // التحقق من وجود القسم المحدد
    const [section] = await db.select().from(sidebarSections).where(eq(sidebarSections.id, sectionId));
    if (!section) return c.json({ error: 'القسم المحدد غير موجود' }, 404);
  } else {
    // البحث عن قسم افتراضي أو إنشاء واحد
    const [defaultSection] = await db.select().from(sidebarSections)
      .where(and(eq(sidebarSections.businessId, bizId), eq(sidebarSections.name, 'شاشات مخصصة')));
    
    if (defaultSection) {
      sectionId = defaultSection.id;
    } else {
      // إنشاء قسم افتراضي
      const [newSection] = await db.insert(sidebarSections).values({
        businessId: bizId, name: 'شاشات مخصصة', icon: 'pi pi-desktop', sortOrder: 99,
      }).returning();
      sectionId = newSection.id;
    }
  }
  
  const [sidebarItem] = await db.insert(sidebarItems).values({
    sectionId,
    screenKey: `custom-screen-${screenId}`,
    label: body.label || screen.name,
    icon: body.icon || screen.icon || 'space_dashboard',
    route: body.route || `/biz/${bizId}/custom-screens?screen=${screenId}`,
    sortOrder: body.sortOrder || 0,
    isActive: true,
  }).returning();
  
  // إضافة العنصر لجميع المستخدمين
  const configs = await db.select().from(userSidebarConfig).where(eq(userSidebarConfig.businessId, bizId));
  const userIds = [...new Set(configs.map(c => c.userId))];
  for (const userId of userIds) {
    await db.insert(userSidebarConfig).values({
      userId, businessId: bizId, sidebarItemId: sidebarItem.id,
      isVisible: true, customSortOrder: sidebarItem.sortOrder || 0,
    });
  }
  
  return c.json(sidebarItem, 201);
}));

// ===================== شاشات المستخدم =====================
api.get('/businesses/:bizId/users/:userId/screens', bizAuthMiddleware(), safeHandler('جلب شاشات المستخدم', async (c) => {
  const bizId = getBizId(c);
  const userId = parseId(c.req.param('userId'));
  if (!userId) return c.json({ error: 'معرّف المستخدم غير صالح' }, 400);
  
  // جلب الشاشات التي لديه صلاحية عليها
  const perms = await db.select({
    screenId: screenPermissions.screenId, permission: screenPermissions.permission,
  }).from(screenPermissions).where(eq(screenPermissions.userId, userId));
  
  const permScreenIds = new Set(perms.map(p => p.screenId));
  
  // جلب كل شاشات العمل
  const allScreens = await db.select().from(screenTemplates).where(eq(screenTemplates.businessId, bizId));
  
  // المستخدم يرى الشاشات التي لديه صلاحية عليها + الشاشات التي لا يوجد لها صلاحيات (عامة)
  const screensWithPerms = new Set(perms.map(p => p.screenId));
  const result = allScreens.filter(s => {
    if (permScreenIds.has(s.id)) return true;
    if (!screensWithPerms.has(s.id)) return true; // شاشة بدون صلاحيات = عامة
    return false;
  });
  
  return c.json(result);
}));

// ===================== بيانات العناصر الحقيقية (Widget Data APIs) =====================

// جلب إحصائيات الشاشة المخصصة (KPIs)
api.get('/businesses/:bizId/widget-stats', bizAuthMiddleware(), safeHandler('جلب إحصائيات العناصر', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // إجمالي التحصيل (receipt vouchers)
  const receiptResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // إجمالي الصرف (payment vouchers)
  const paymentResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(total_debit AS NUMERIC)), 0) as total
    FROM journal_entries
    WHERE business_id = ${bizId}
    AND EXISTS (
      SELECT 1 FROM operation_types ot
      WHERE ot.id = journal_entries.operation_type_id
      AND (ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%')
    )
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // عدد العمليات
  const opsResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries
    WHERE business_id = ${bizId}
    ${dateFrom ? sql`AND entry_date >= ${dateFrom}` : sql``}
    ${dateTo ? sql`AND entry_date <= ${dateTo}` : sql``}
  `);

  // صافي الرصيد (مجموع أرصدة الحسابات)
  const balanceResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(ab.balance AS NUMERIC)), 0) as total
    FROM account_balances ab
    INNER JOIN accounts a ON a.id = ab.account_id
    WHERE a.business_id = ${bizId}
  `);

  const receiptRows = normalizeDbResult(receiptResult);
  const paymentRows = normalizeDbResult(paymentResult);
  const opsRows = normalizeDbResult(opsResult);
  const balanceRows = normalizeDbResult(balanceResult);

  return c.json({
    totalReceipts: Number((receiptRows[0] as any)?.total || 0),
    totalPayments: Number((paymentRows[0] as any)?.total || 0),
    operationsCount: Number((opsRows[0] as any)?.total || 0),
    netBalance: Number(getFirstRow<{ total: string }>(balanceRows)?.total || 0),
  });
}));

// جلب سجل العمليات الحقيقي
api.get('/businesses/:bizId/widget-log', bizAuthMiddleware(), safeHandler('جلب سجل العمليات للعنصر', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const limitParam = c.req.query('limit') || '50';
  const offsetParam = c.req.query('offset') || '0';

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${Number.parseInt(opTypeId)}`;

  const rows = await db.execute(sql`
    SELECT
      je.id,
      je.entry_number,
      je.description,
      je.entry_date,
      je.reference,
      je.total_debit,
      je.total_credit,
      je.status,
      je.created_at,
      ot.name as operation_type_name,
      ot.icon as operation_type_icon,
      ot.color as operation_type_color,
      ot.voucher_type,
      je.category as operation_category
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
    ORDER BY je.created_at DESC
    LIMIT ${Number.parseInt(limitParam)} OFFSET ${Number.parseInt(offsetParam)}
  `);

  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries je WHERE ${conditions}
  `);
  const countRows = normalizeDbResult(countResult);

  const resultRows = normalizeDbResult(rows);
  return c.json({
    entries: resultRows,
    total: Number((countRows[0] as any)?.total || 0),
  });
}));

// جلب بيانات مراقبة الحسابات (أرصدة حقيقية + آخر حركات)
api.get('/businesses/:bizId/widget-accounts', bizAuthMiddleware(), safeHandler('جلب بيانات مراقبة الحسابات', async (c) => {
  const bizId = getBizId(c);
  const accountIdsParam = c.req.query('accountIds');

  let accountFilter = sql`a.business_id = ${bizId}`;
  if (accountIdsParam) {
    const ids = accountIdsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n));
    if (ids.length > 0) {
      const idFragments = ids.map((id: number) => sql`${id}`);
      const inClause = sql.join(idFragments, sql`, `);
      accountFilter = sql`a.business_id = ${bizId} AND a.id IN (${inClause})`;
    }
  }

  const rows = await db.execute(sql`
    SELECT
      a.id,
      a.name,
      a.account_type,
      a.is_active,
      COALESCE((
        SELECT SUM(CAST(ab.balance AS NUMERIC))
        FROM account_balances ab WHERE ab.account_id = a.id
      ), 0) as total_balance,
      (
        SELECT json_agg(bal_row) FROM (
          SELECT ab.id, ab.currency_id, ab.balance, c.code as currency_code, c.symbol as currency_symbol
          FROM account_balances ab
          LEFT JOIN currencies c ON c.id = ab.currency_id
          WHERE ab.account_id = a.id
        ) bal_row
      ) as balances,
      (
        SELECT json_agg(last_mov) FROM (
          SELECT jel.id, jel.line_type, jel.amount, jel.description, je.entry_date, je.entry_number
          FROM journal_entry_lines jel
          INNER JOIN journal_entries je ON je.id = jel.journal_entry_id
          WHERE jel.account_id = a.id
          ORDER BY je.created_at DESC
          LIMIT 5
        ) last_mov
      ) as last_movements
    FROM accounts a
    WHERE ${accountFilter}
    ORDER BY a.name
  `);

  const resultRows = normalizeDbResult(rows);
  return c.json(resultRows);
}));

// جلب بيانات الرسم البياني (حركات شهرية)
api.get('/businesses/:bizId/widget-chart', bizAuthMiddleware(), safeHandler('جلب بيانات الرسم البياني', async (c) => {
  const bizId = getBizId(c);
  const months = Number.parseInt(c.req.query('months') || '6');

  const rows = await db.execute(sql`
    SELECT
      TO_CHAR(je.entry_date, 'YYYY-MM') as period,
      TO_CHAR(je.entry_date, 'Mon') as period_label,
      EXTRACT(MONTH FROM je.entry_date) as month_num,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month' * ${months})
    GROUP BY TO_CHAR(je.entry_date, 'YYYY-MM'), TO_CHAR(je.entry_date, 'Mon'), EXTRACT(MONTH FROM je.entry_date)
    ORDER BY period
  `);

  const resultRows = normalizeDbResult(rows);

  const arabicMonths: Record<number, string> = {
    1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل', 5: 'مايو', 6: 'يونيو',
    7: 'يوليو', 8: 'أغسطس', 9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر',
  };

  return c.json({
    labels: (resultRows as any[]).map((r: any) => arabicMonths[Number(r.month_num)] || r.period_label),
    receipts: (resultRows as any[]).map((r: any) => Number(r.receipts)),
    payments: (resultRows as any[]).map((r: any) => Number(r.payments)),
    operationsCounts: (resultRows as any[]).map((r: any) => Number(r.operations_count)),
  });
}));

// ===================== Enhanced Widget APIs =====================

// إحصائيات محسّنة مع فلتر فترة زمنية
api.get('/businesses/:bizId/widget-stats-enhanced', bizAuthMiddleware(), safeHandler('جلب إحصائيات محسّنة', async (c) => {
  const bizId = getBizId(c);
  const period = c.req.query('period'); // today | week | month | year
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  // حساب نطاق التاريخ بناءً على الفترة
  let dateCondition = sql``;
  if (dateFrom && dateTo) {
    dateCondition = sql`AND je.entry_date >= ${dateFrom} AND je.entry_date <= ${dateTo}`;
  } else if (period === 'today') {
    dateCondition = sql`AND je.entry_date = CURRENT_DATE`;
  } else if (period === 'week') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '7 days')`;
  } else if (period === 'month') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month')`;
  } else if (period === 'year') {
    dateCondition = sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 year')`;
  }

  const result = await db.execute(sql`
    SELECT
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as total_payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    ${dateCondition}
  `);

  const balanceResult = await db.execute(sql`
    SELECT COALESCE(SUM(CAST(ab.balance AS NUMERIC)), 0) as total
    FROM account_balances ab
    INNER JOIN accounts a ON a.id = ab.account_id
    WHERE a.business_id = ${bizId}
  `);

  const rows = normalizeDbResult(result);
  const balanceRows = normalizeDbResult(balanceResult);
  const r = getFirstRow<Record<string, unknown>>(rows) || {};

  return c.json({
    totalReceipts: Number(r.total_receipts || 0),
    totalPayments: Number(r.total_payments || 0),
    operationsCount: Number(r.operations_count || 0),
    netBalance: Number(getFirstRow<{ total: string }>(balanceRows)?.total || 0),
  });
}));

// سجل عمليات محسّن مع بحث نصي وفلتر مبلغ وترقيم صفحات
api.get('/businesses/:bizId/widget-log-enhanced', bizAuthMiddleware(), safeHandler('جلب سجل عمليات محسّن', async (c) => {
  const bizId = getBizId(c);
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');
  const opTypeId = c.req.query('operationTypeId');
  const search = c.req.query('search');
  const minAmount = c.req.query('minAmount');
  const maxAmount = c.req.query('maxAmount');
  const status = c.req.query('status');
  const limitParam = c.req.query('limit') || '20';
  const offsetParam = c.req.query('offset') || '0';
  const sortBy = c.req.query('sortBy') || 'entry_date';
  const sortDir = c.req.query('sortDir') || 'desc';

  let conditions = sql`je.business_id = ${bizId}`;
  if (dateFrom) conditions = sql`${conditions} AND je.entry_date >= ${dateFrom}`;
  if (dateTo) conditions = sql`${conditions} AND je.entry_date <= ${dateTo}`;
  if (opTypeId) conditions = sql`${conditions} AND je.operation_type_id = ${Number.parseInt(opTypeId)}`;
  if (status) conditions = sql`${conditions} AND je.status = ${status}`;
  if (search) {
    conditions = sql`${conditions} AND (
      je.description ILIKE ${'%' + search + '%'}
      OR je.entry_number ILIKE ${'%' + search + '%'}
      OR je.reference ILIKE ${'%' + search + '%'}
      OR ot.name ILIKE ${'%' + search + '%'}
    )`;
  }
  if (minAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) >= ${Number.parseFloat(minAmount)}`;
  if (maxAmount) conditions = sql`${conditions} AND CAST(je.total_debit AS NUMERIC) <= ${Number.parseFloat(maxAmount)}`;

  // ترتيب ديناميكي
  const validSortColumns: Record<string, any> = {
    'entry_date': sql`je.entry_date`,
    'created_at': sql`je.created_at`,
    'total_debit': sql`CAST(je.total_debit AS NUMERIC)`,
    'entry_number': sql`je.entry_number`,
  };
  const sortColumn = validSortColumns[sortBy] || sql`je.entry_date`;
  const orderClause = sortDir === 'asc' ? sql`${sortColumn} ASC` : sql`${sortColumn} DESC`;

  const rows = await db.execute(sql`
    SELECT
      je.id, je.entry_number, je.description, je.entry_date, je.reference,
      je.total_debit, je.total_credit, je.status, je.created_at,
      ot.name as operation_type_name, ot.icon as operation_type_icon,
      ot.color as operation_type_color, ot.voucher_type, je.category as operation_category
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
    ORDER BY ${orderClause}
    LIMIT ${Number.parseInt(limitParam)} OFFSET ${Number.parseInt(offsetParam)}
  `);

  const countResult = await db.execute(sql`
    SELECT COUNT(*) as total FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE ${conditions}
  `);
  const countRows = normalizeDbResult(countResult);
  const resultRows = normalizeDbResult(rows);

  return c.json({
    entries: resultRows,
    total: Number(getFirstRow<{ total: string }>(countRows)?.total || 0),
  });
}));

// رسم بياني محسّن مع تجميع أسبوعي/شهري/سنوي وتواريخ مخصصة
api.get('/businesses/:bizId/widget-chart-enhanced', bizAuthMiddleware(), safeHandler('جلب بيانات رسم بياني محسّن', async (c) => {
  const bizId = getBizId(c);
  const groupBy = c.req.query('groupBy') || 'monthly'; // weekly | monthly | yearly
  const months = Number.parseInt(c.req.query('months') || '6');
  const dateFrom = c.req.query('dateFrom');
  const dateTo = c.req.query('dateTo');

  const dateCondition = (dateFrom && dateTo)
    ? sql`AND je.entry_date >= ${dateFrom} AND je.entry_date <= ${dateTo}`
    : sql`AND je.entry_date >= (CURRENT_DATE - INTERVAL '1 month' * ${months})`;

  const arabicMonths: Record<number, string> = {
    1: 'يناير', 2: 'فبراير', 3: 'مارس', 4: 'أبريل', 5: 'مايو', 6: 'يونيو',
    7: 'يوليو', 8: 'أغسطس', 9: 'سبتمبر', 10: 'أكتوبر', 11: 'نوفمبر', 12: 'ديسمبر',
  };

  let periodExpr: any, periodLabel: any, orderExpr: any;

  if (groupBy === 'weekly') {
    periodExpr = sql`TO_CHAR(je.entry_date, 'IYYY-IW')`;
    periodLabel = sql`'أسبوع ' || TO_CHAR(je.entry_date, 'IW')`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'IYYY-IW')`;
  } else if (groupBy === 'yearly') {
    periodExpr = sql`TO_CHAR(je.entry_date, 'YYYY')`;
    periodLabel = sql`TO_CHAR(je.entry_date, 'YYYY')`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'YYYY')`;
  } else {
    periodExpr = sql`TO_CHAR(je.entry_date, 'YYYY-MM')`;
    periodLabel = sql`EXTRACT(MONTH FROM je.entry_date)`;
    orderExpr = sql`TO_CHAR(je.entry_date, 'YYYY-MM')`;
  }

  const rows = await db.execute(sql`
    SELECT
      ${periodExpr} as period,
      ${periodLabel} as period_label,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'receipt' OR je.category ILIKE '%تحصيل%' OR ot.name ILIKE '%تحصيل%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as receipts,
      COALESCE(SUM(CASE WHEN ot.voucher_type = 'payment' OR je.category ILIKE '%صرف%' OR je.category ILIKE '%مصروفات%' OR ot.name ILIKE '%صرف%' OR ot.name ILIKE '%مصروفات%' THEN CAST(je.total_debit AS NUMERIC) ELSE 0 END), 0) as payments,
      COUNT(*) as operations_count
    FROM journal_entries je
    LEFT JOIN operation_types ot ON ot.id = je.operation_type_id
    WHERE je.business_id = ${bizId}
    ${dateCondition}
    GROUP BY ${periodExpr}, ${periodLabel}
    ORDER BY ${orderExpr}
  `);

  const resultRows = normalizeDbResult(rows);

  const labels = (resultRows as any[]).map((r: any) => {
    if (groupBy === 'monthly') {
      const monthNum = Number(r.period_label);
      return arabicMonths[monthNum] || r.period;
    }
    return String(r.period_label);
  });

  return c.json({
    labels,
    receipts: (resultRows as any[]).map((r: any) => Number(r.receipts)),
    payments: (resultRows as any[]).map((r: any) => Number(r.payments)),
    operationsCounts: (resultRows as any[]).map((r: any) => Number(r.operations_count)),
  });
}));

// حفظ/جلب ملاحظات العنصر
api.get('/widgets/:widgetId/notes', safeHandler('جلب ملاحظات العنصر', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'عنصر غير موجود' }, 404);
  return c.json({ text: (widget.config as any)?.text || '' });
}));

api.put('/widgets/:widgetId/notes', safeHandler('حفظ ملاحظات العنصر', async (c) => {
  const widgetId = parseId(c.req.param('widgetId'));
  if (!widgetId) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = normalizeBody(await c.req.json());
  const [widget] = await db.select({ config: screenWidgets.config }).from(screenWidgets).where(eq(screenWidgets.id, widgetId));
  if (!widget) return c.json({ error: 'عنصر غير موجود' }, 404);
  const baseConfig = widget.config && typeof widget.config === 'object' ? widget.config : {};
  const newConfig = { ...baseConfig, text: body.text || '' };
  const [updated] = await db.update(screenWidgets).set({ config: newConfig, updatedAt: new Date() }).where(eq(screenWidgets.id, widgetId)).returning();
  return c.json(updated);
}));

// جلب قوالب العمليات مع تفاصيلها لعنصر القوالب
api.get('/businesses/:bizId/widget-operation-types', bizAuthMiddleware(), safeHandler('جلب قوالب العمليات للعنصر', async (c) => {
  const bizId = getBizId(c);
  const idsParam = c.req.query('ids');

  let rows: any[] = [];
  if (idsParam) {
    const ids = idsParam.split(',').map(Number).filter((n: number) => !Number.isNaN(n));
    if (ids.length > 0) {
      rows = await db.select().from(operationTypes)
        .where(and(eq(operationTypes.businessId, bizId), inArray(operationTypes.id, ids)))
        .orderBy(operationTypes.sortOrder);
    } else {
      rows = [];
    }
  } else {
    rows = await db.select().from(operationTypes)
      .where(and(eq(operationTypes.businessId, bizId), eq(operationTypes.isActive, true)))
      .orderBy(operationTypes.sortOrder);
  }

  // جلب الحسابات المرتبطة بكل نوع عملية
  const opTypeIds = rows.map(r => r.id);
  let opAccounts: any[] = [];
  if (opTypeIds.length > 0) {
    opAccounts = await db.select({
      id: operationTypeAccounts.id,
      operationTypeId: operationTypeAccounts.operationTypeId,
      accountId: operationTypeAccounts.accountId,
      label: operationTypeAccounts.label,
      permission: operationTypeAccounts.permission,
      accountName: accounts.name,
      accountType: accounts.accountType,
    }).from(operationTypeAccounts)
      .leftJoin(accounts, eq(operationTypeAccounts.accountId, accounts.id))
      .where(inArray(operationTypeAccounts.operationTypeId, opTypeIds));
  }

  const accMap: Record<number, any[]> = {};
  for (const a of opAccounts) {
    if (!accMap[a.operationTypeId]) accMap[a.operationTypeId] = [];
    accMap[a.operationTypeId].push(a);
  }

  return c.json(rows.map(r => ({ ...r, accounts: accMap[r.id] || [] })));
}));
// ── المسارات المستخرجة (Phase 3) ──────────────────────────────────────────────
// currency.routes.ts    → /businesses/:bizId/exchange-rates
// rbac.routes.ts        → /businesses/:bizId/roles
// attachments-enhanced  → /businesses/:bizId/attachments
// misc-categories       → /businesses/:bizId/warehouse-types
// screens.engine.ts     → يُستخدم مباشرة من engines/
