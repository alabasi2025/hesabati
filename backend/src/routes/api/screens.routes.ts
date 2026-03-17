/**
 * screens.routes.ts — Phase 7 (thin re-export wrapper)
 * 
 * تم تقسيم هذا الملف في Phase 7 إلى:
 *  - screens-core.routes.ts        (CRUD + Widgets + Templates + Sidebar + User)
 *  - screens-widget-data.routes.ts (Widget Data APIs + Enhanced Widget APIs)
 */
export { screensRoutes } from './screens-core.routes';
export { screensWidgetData } from './screens-widget-data.routes';
