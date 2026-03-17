/**
 * vouchers.routes.ts — Phase 8 (thin re-export wrapper)
 *
 * تم تقسيم هذا الملف في Phase 8 إلى:
 *  - vouchers-list.routes.ts   (جلب + معاينة + رصيد + تفاصيل)
 *  - vouchers-write.routes.ts  (إنشاء + تعديل + تغيير الحالة)
 */
export { vouchersListRouter } from './vouchers-list.routes';
export { vouchersWriteRouter } from './vouchers-write.routes';
