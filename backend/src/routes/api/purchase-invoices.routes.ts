/**
 * purchase-invoices.routes.ts — Phase 9 (thin re-export wrapper)
 * تم التقسيم في Phase 9 إلى:
 *  - purchase-invoices-read.routes.ts  (جلب القائمة + جلب بالمعرف)
 *  - purchase-invoices-write.routes.ts (إنشاء + تعديل + اعتماد + إلغاء + حذف)
 */
export { purchaseInvoicesReadRoutes } from './purchase-invoices-read.routes';
export { purchaseInvoicesWriteRoutes } from './purchase-invoices-write.routes';
