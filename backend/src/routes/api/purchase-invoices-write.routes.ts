/**
 * purchase-invoices-write.routes.ts — Phase 13 (thin wrapper)
 * يُجمع مسارات الكتابة لفواتير الشراء
 */
import { Hono } from 'hono';
import { piCreateRoutes } from './purchase-invoices-create.routes.ts';
import { piActionsRoutes } from './purchase-invoices-actions.routes.ts';

const purchaseInvoicesRoutes = new Hono();
purchaseInvoicesRoutes.route('/', piCreateRoutes);
purchaseInvoicesRoutes.route('/', piActionsRoutes);

export { purchaseInvoicesRoutes as purchaseInvoicesWriteRoutes };
