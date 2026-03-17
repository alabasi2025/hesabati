/**
 * middleware/sequencing.ts — Phase 7 Refactored
 * 
 * هذا الملف أصبح thin wrapper يعيد التصدير من engines/sequencing.engine.ts
 * المنطق الفعلي كله في: engines/sequencing.engine.ts
 * 
 * محتوى الملف الأصلي (741 سطر) ← نُقل إلى engines/sequencing.engine.ts
 */

// Re-export everything from sequencing.engine for backward compatibility
export * from '../engines/sequencing.engine.ts';
