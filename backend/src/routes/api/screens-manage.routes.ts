/**
 * screens-manage.routes.ts — Phase 10
 * إدارة الشاشات: CRUD + الويدجتس + القوالب + النسخ + السايدبار + المستخدم
 */
/**
 * screens-core.routes.ts — Phase 7
 * إدارة الشاشات المخصصة: CRUD + Widgets + Templates + Sidebar + User screens
 */
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
import { bizAuthMiddleware } from '../../middleware/bizAuth.ts';
import { getBizId, getUserId } from './_shared/context-helpers.ts';
import { safeHandler, parseId, getBody } from '../../middleware/helpers.ts';
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
  const body = await getBody(c);
  
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
  const body = await getBody(c);
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
  const body = await getBody(c);
  if (!body.widgetType) return c.json({ error: 'نوع العنصر (widgetType) مطلوب' }, 400);
  if (!body.title) return c.json({ error: 'عنوان العنصر (title) مطلوب' }, 400);
  const [created] = await db.insert(screenWidgets).values({ ...body, screenId }).returning();
  return c.json(created, 201);
}));

api.put('/widgets/:id', safeHandler('تعديل ويدجت', async (c) => {
  const id = parseId(c.req.param('id'));
  if (!id) return c.json({ error: 'معرّف العنصر غير صالح' }, 400);
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
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
  const body = await getBody(c);
  
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


// ===================== إضافة شاشة للسايدبار (إصلاح #1 الرئيسي) =====================
api.post('/businesses/:bizId/screens/:screenId/add-to-sidebar', bizAuthMiddleware(), safeHandler('إضافة شاشة للسايدبار', async (c) => {
  const bizId = getBizId(c);
  const screenId = parseId(c.req.param('screenId'));
  if (!screenId) return c.json({ error: 'معرّف الشاشة غير صالح' }, 400);
  
  // التحقق من وجود الشاشة
  const [screen] = await db.select().from(screenTemplates).where(and(eq(screenTemplates.id, screenId), eq(screenTemplates.businessId, bizId)));
  if (!screen) return c.json({ error: 'الشاشة غير موجودة أو لا تنتمي لهذا العمل' }, 404);
  
  const body = await getBody(c);
  
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




export { screensRoutes as screensManageRoutes };
