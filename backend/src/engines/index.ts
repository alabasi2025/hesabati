/**
 * Engines Index – نقطة الدخول الموحدة لجميع محركات النظام
 * ==========================================================
 * Phase 2 — اكتمال الـ 15 محرك
 * 
 * الاستخدام:
 *   import { TransactionEngine, HREngine, BillingEngine } from '../engines';
 *   import { postTransaction, getSalaryRecords } from '../engines';
 * 
 * ─────────────────────────────────────────────────────────────
 * المحركات المكتملة (15/15):
 * ─────────────────────────────────────────────────────────────
 * P0 ✅: CRUD, Currency, Inventory (bug fixed), Transaction
 * P1 ✅: Sequencing, Permissions
 * P2 ✅: Reporting, UIBuilder, Notification (WebSocket), HR, Billing, Attachment
 * P3 ✅: Audit
 * إضافي ✅: Workflow
 */

// ── P0: المحركات الحرجة ───────────────────────────────────────────────────
export * as CrudEngine        from './crud.engine.ts';
export * as CurrencyEngine    from './currency.engine.ts';
export * as TransactionEngine from './transaction.engine.ts';

// ── P1: الأولوية العالية ──────────────────────────────────────────────────
export * as SequencingEngine  from './sequencing.engine.ts';
export * as PermissionsEngine from './permissions.engine.ts';

// ── Screens (Phase 3) ──────────────────────────────────────────────────────
export * as ScreensEngine    from './screens.engine.ts';

// ── P2: الأولوية المتوسطة ─────────────────────────────────────────────────
export * as HREngine          from './hr.engine.ts';
export * as BillingEngine     from './billing.engine.ts';
export * as AttachmentEngine  from './attachment.engine.ts';
export * as AuditEngine       from './audit.engine.ts';

// ── محركات في services/ (re-exported للتوافق) ─────────────────────────────
export * as InventoryEngine   from '../services/inventory.service.ts';
export * as ReportingEngine   from '../services/reporting.service.ts';
export * as UIBuilderEngine   from '../services/ui-builder.service.ts';
export * as WorkflowEngine    from '../services/workflow.service.ts';
export * as NotificationEngine from '../services/websocket.service.ts';

// ── تصدير مباشر للدوال الأكثر استخداماً ──────────────────────────────────
// Transaction
export {
  postTransaction,
  postMultiTransaction,
  cancelTransaction,
  confirmDraftTransaction,
  applyAccountingForConfirmedVoucher,
  createVoucher,
  getVoucherSummary,
  bulkCancelVouchers,
  getRecentVouchers,
  canCancelVoucher,
} from './transaction.engine.ts';

// HR
export {
  getSalaryRecords,
  createSalaryRecord,
  updateSalaryRecord,
  deleteSalaryRecord,
  markSalaryPaid,
  calculateNetSalary,
  getMonthlySalarySummary,
  getEmployeeSalaryHistory,
} from './hr.engine.ts';

// Billing
export {
  getBillingSystems,
  createBillingSystem,
  updateBillingSystem,
  deleteBillingSystem,
  getBillingAccountTypes,
  createBillingAccountType,
  calculateBillingPeriod,
  toSystemKey,
} from './billing.engine.ts';

// Audit
export {
  logAction,
  getAuditLog,
  getRecordHistory,
  exportAuditReport,
  purgeOldLogs,
  getAuditStats,
} from './audit.engine.ts';

// Attachment
export {
  getAttachments,
  saveAttachment,
  deleteAttachment,
  getAttachmentById,
  resolveStoragePath,
  getArchiveSettings,
  validateFile,
  ensureStorageDir,
} from './attachment.engine.ts';

// Currency (re-export من currency.engine)
export {
  getExchangeRate,
  addExchangeRate,
  getExchangeRateHistory,
  getUnifiedBalances,
  validateCurrency,
  clearRateCache,
} from './currency.engine.ts';
