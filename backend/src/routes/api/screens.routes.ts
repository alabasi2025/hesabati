/**
 * screens.routes.ts — Phase 10 (thin re-export wrapper)
 * تم التقسيم في Phase 10 إلى:
 *  - screens-manage.routes.ts      (CRUD + Widgets + Templates + Sidebar + User)
 *  - screens-permissions.routes.ts (صلاحيات الشاشات)
 *  - screens-widget-data.routes.ts (Widget Data APIs)
 */
export { screensManageRoutes } from './screens-manage.routes';
export { screensPermRoutes } from './screens-permissions.routes';
export { screensWidgetData } from './screens-widget-data.routes';
