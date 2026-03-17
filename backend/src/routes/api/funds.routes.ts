/**
 * funds.routes.ts — Phase 10 (thin re-export wrapper)
 * تم التقسيم في Phase 10 إلى:
 *  - funds-read.routes.ts   (جلب القائمة + التفاصيل)
 *  - funds-write.routes.ts  (إنشاء + تعديل + حذف + تحويل)
 */
export { fundsReadRoutes } from './funds-read.routes';
export { fundsWriteRoutes } from './funds-write.routes';
