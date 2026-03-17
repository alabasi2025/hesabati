/**
 * check-schema-match.ts — Phase 12 (thin wrapper)
 * تم التقسيم إلى:
 *  - check-schema-tables.ts  (تعريف الجداول المتوقعة)
 *  - check-schema-runner.ts  (دوال المقارنة + التشغيل)
 * تشغيل: npx tsx src/db/check-schema-runner.ts
 */
export * from './check-schema-tables.ts';
