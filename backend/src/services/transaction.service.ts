/**
 * transaction.service.ts — Phase 7 (thin re-export wrapper)
 * 
 * تم تقسيم هذا الملف في Phase 7 إلى:
 *  - transaction.types.ts         (الأنواع)
 *  - transaction-post.service.ts  (postTransaction + postMultiTransaction)
 *  - transaction-cancel.service.ts (cancelTransaction + confirmDraftTransaction)
 * 
 * هذا الملف يعيد التصدير للتوافق مع الاستيرادات الموجودة.
 */

export type { TransactionData, TransactionResult, TransactionLine, MultiTransactionData } from './transaction.types';
export { postTransaction, postMultiTransaction, applyAccountingForConfirmedVoucher } from './transaction-post.service';
export { cancelTransaction, confirmDraftTransaction, isConfirmingTransition } from './transaction-cancel.service';
