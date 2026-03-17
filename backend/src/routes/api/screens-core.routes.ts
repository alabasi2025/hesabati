/**
 * screens-core.routes.ts — Phase 10 (thin re-export wrapper)
 * تم التقسيم في Phase 10 إلى:
 *  - screens-manage.routes.ts      (CRUD + Widgets + Templates + Sidebar + User)
 *  - screens-permissions.routes.ts (صلاحيات الشاشات)
 */
export { screensManageRoutes } from './screens-manage.routes';
export { screensPermRoutes } from './screens-permissions.routes';
