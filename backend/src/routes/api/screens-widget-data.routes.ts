/**
 * screens-widget-data.routes.ts — Phase 15 (thin wrapper)
 * يُجمع بيانات العناصر: أساسية + محسّنة
 */
import { Hono } from 'hono';
import { widgetBasicApi } from './screens-widget-basic.routes.ts';
import { widgetEnhancedApi } from './screens-widget-enhanced.routes.ts';

const api = new Hono();
api.route('/', widgetBasicApi);
api.route('/', widgetEnhancedApi);

export { api as screensWidgetData };
export default api;
