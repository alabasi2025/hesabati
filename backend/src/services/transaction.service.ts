/**
 * transaction.service.ts — Phase 7 & 15 Fix
 * Re-export wrapper for all transaction modules
 */
export type { TransactionData, TransactionResult, TransactionLine, MultiTransactionData } from './transaction.types.ts';
export * from './transaction-helpers.ts';
export { postTransaction } from './transaction-single.service.ts';
export { postMultiTransaction } from './transaction-multi.service.ts';
export { cancelTransaction, confirmDraftTransaction, isConfirmingTransition, applyAccountingForConfirmedVoucher } from './transaction-cancel.service.ts';

