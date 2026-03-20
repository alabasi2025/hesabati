/**
 * vouchers.routes.ts — Phase 8 (thin re-export wrapper)
 *
 * تم تقسيم هذا الملف في Phase 8 إلى:
 *  - vouchers-list.routes.ts   (جلب + معاينة + رصيد + تفاصيل)
 *  - vouchers-write.routes.ts  (إنشاء + تعديل + تغيير الحالة)
 */
import { Hono } from 'hono';
import { vouchersListRouter } from './vouchers-list.routes';
import { vouchersWriteRouter } from './vouchers-write.routes';

const vouchersRouter = new Hono();
vouchersRouter.route('/', vouchersListRouter);
vouchersRouter.route('/', vouchersWriteRouter);

export { vouchersListRouter, vouchersWriteRouter, vouchersRouter };
export default vouchersRouter;
