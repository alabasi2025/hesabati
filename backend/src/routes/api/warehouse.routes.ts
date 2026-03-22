/**
 * warehouse.routes.ts — Phase 9 (thin re-export wrapper)
 * تم التقسيم في Phase 9 إلى:
 *  - warehouse-crud.routes.ts  (CRUD المخازن)
 *  - warehouse-ops.routes.ts   (عمليات + جرد + ملخصات)
 */
export { warehouseCrudRoutes } from './warehouse-crud.routes';
export { warehouseRoutes as warehouseOpsRoutes } from './warehouse-ops.routes';
