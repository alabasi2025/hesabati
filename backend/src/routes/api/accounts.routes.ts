/**
 * accounts.routes.ts — Phase 11 (thin re-export wrapper)
 * تم التقسيم إلى:
 *  - accounts-read.routes.ts  (مسارات قراءة الحسابات)
 *  - accounts-write.routes.ts (إنشاء + تحديث + حذف)
 */
import accountsReadRoutes from './accounts-read.routes.ts';
import accountsWriteRoutes from './accounts-write.routes.ts';
export { accountsReadRoutes, accountsWriteRoutes };
