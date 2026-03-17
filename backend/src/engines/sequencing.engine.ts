/**
 * sequencing.engine.ts — Phase 11 (thin re-export wrapper)
 * تم التقسيم إلى:
 *  - sequencing.types.ts          (الأنواع والثوابت)
 *  - sequencing-core.engine.ts    (الدوال الأساسية + التصنيفات)
 *  - sequencing-entity.engine.ts  (ترقيم الكيانات + الموحّدة)
 */
export * from './sequencing.types.ts';
export * from './sequencing-core.engine.ts';
export * from './sequencing-entity.engine.ts';
