/**
 * reporting.service.ts — Phase 9 (thin re-export wrapper)
 * تم التقسيم في Phase 9 إلى:
 *  - reporting.types.ts           (الأنواع + التخزين المؤقت)
 *  - reporting-core.service.ts    (P&L + Trial Balance + Account Statement)
 *  - reporting-summary.service.ts (Daily + Aggregated + Monthly)
 */
export type { ReportFilters, ProfitLossResult, TrialBalanceResult, AccountStatementResult } from './reporting.types';
export { getCachedReport, cacheReport } from './reporting.types';
export { getProfitAndLoss, getTrialBalance, getAccountStatement } from './reporting-core.service';
export { getDailySummary, getAggregatedProfitAndLoss, getAggregatedSummary, getMonthlyRevenueExpenses } from './reporting-summary.service';
