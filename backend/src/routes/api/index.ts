import { Hono } from 'hono';
import businessesRoutes from './businesses.routes.ts';
import stationsRoutes from './stations.routes.ts';
import employeesRoutes from './employees.routes.ts';
import fundsRoutes from './funds.routes.ts';
import reportsRoutes from './reports.routes.ts';
import restRoutes from './api.rest.ts';
import purchaseInvoicesRoutes from './purchase-invoices.routes.ts';
import operationCategoriesRoutes from './operation-categories.routes.ts';
import supplierTypesRoutes from './supplier-types.routes.ts';
import inventoryItemTypesRoutes from './inventory-item-types.routes.ts';
import departmentsRoutes from './departments.routes.ts';
import jobTitlesRoutes from './job-titles.routes.ts';
import custodyRoutes from './custody.routes.ts';

const api = new Hono();

api.route('/', businessesRoutes);
api.route('/', stationsRoutes);
api.route('/', employeesRoutes);
api.route('/', fundsRoutes);
api.route('/', reportsRoutes);
api.route('/', purchaseInvoicesRoutes);
api.route('/', operationCategoriesRoutes);
api.route('/', supplierTypesRoutes);
api.route('/', inventoryItemTypesRoutes);
api.route('/', departmentsRoutes);
api.route('/', jobTitlesRoutes);
api.route('/', custodyRoutes);
api.route('/', restRoutes);

export default api;
