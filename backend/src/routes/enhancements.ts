/**
 * enhancements.ts - Phase 6 Refactored
 * 
 * المحتوى انتقل إلى:
 * - api/vouchers.routes.ts         (سندات القبض/الصرف/المعاملات)
 * - api/operation-enhancements.routes.ts (أنواع العمليات)
 * - api/sidebar-enhancements.routes.ts  (إعدادات التبويب الجانبي)
 * - api/screen-enhancements.routes.ts   (الشاشات المخصصة)
 * 
 * هذا الملف يُحتفظ به فقط لضمان التوافق مع imports موجودة
 */
import { Hono } from 'hono';

// Re-export from sub-routers for backward compatibility
export { vouchersListRouter, vouchersWriteRouter } from './api/vouchers.routes.ts';
export { default as operationEnhRouter } from './api/operation-enhancements.routes.ts';
export { default as sidebarEnhRouter } from './api/sidebar-enhancements.routes.ts';
export { default as screenEnhRouter } from './api/screen-enhancements.routes.ts';

// Empty router for backward compatibility (all routes moved)
const enhancements = new Hono();
export default enhancements;
