/**
 * vouchers-write.routes.ts — Phase 13 (thin wrapper)
 * يُعيد تصدير كل مسارات الكتابة للسندات
 */
import { Hono } from 'hono';
import { vouchersCreateRouter } from './vouchers-create.routes.ts';
import { vouchersUpdateRouter } from './vouchers-update.routes.ts';

const vouchersRouter = new Hono();
vouchersRouter.route('/', vouchersCreateRouter);
vouchersRouter.route('/', vouchersUpdateRouter);

export { vouchersRouter as vouchersWriteRouter };
