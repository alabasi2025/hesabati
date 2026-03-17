/**
 * schema/index.ts — Phase 12
 * نقطة الدخول الموحدة لجميع جداول قاعدة البيانات
 * تم التقسيم في Phase 12 إلى ملفات نطاق منفصلة
 */
export * from './schema-base.ts';
export * from './schema-users.ts';
export * from './schema-business.ts';
export * from './schema-finance.ts';
export * from './schema-warehouse.ts';
export * from './schema-lookups.ts';
