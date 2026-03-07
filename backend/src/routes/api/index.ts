import { Hono } from 'hono';
import businessesRoutes from './businesses.routes.ts';
import stationsRoutes from './stations.routes.ts';
import employeesRoutes from './employees.routes.ts';
import fundsRoutes from './funds.routes.ts';
import reportsRoutes from './reports.routes.ts';
import restRoutes from './api.rest.ts';

const api = new Hono();

api.route('/', businessesRoutes);
api.route('/', stationsRoutes);
api.route('/', employeesRoutes);
api.route('/', fundsRoutes);
api.route('/', reportsRoutes);
api.route('/', restRoutes);

export default api;
