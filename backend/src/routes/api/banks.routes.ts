/**
 * banks.routes.ts — thin re-export wrapper
 * تم التقسيم إلى:
 *  - banks-read.routes.ts   (جلب القائمة + التفاصيل)
 *  - banks-write.routes.ts  (إنشاء + تعديل + حذف)
 */
export { banksReadRoutes } from './banks-read.routes';
export { banksWriteRoutes } from './banks-write.routes';
