/**
 * warehouse-ops.routes.ts — Phase 15 (thin wrapper)
 * يُجمع عمليات المخزن (قراءة + كتابة)
 */
import { Hono } from 'hono';
import { warehouseOpsWriteRoutes } from './warehouse-ops-write.routes.ts';
import { warehouseOpsReadRoutes } from './warehouse-ops-read.routes.ts';

const warehouseRoutes = new Hono();
warehouseRoutes.route('/', warehouseOpsWriteRoutes);
warehouseRoutes.route('/', warehouseOpsReadRoutes);

export { warehouseRoutes, warehouseRoutes as warehouseOpsRoutes };
