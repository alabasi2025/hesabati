/**
 * transaction-post.service.ts — Phase 15 (thin wrapper)
 * يُعيد تصدير postTransaction و postMultiTransaction
 */
export { postTransaction } from './transaction-single.service.ts';
export { postMultiTransaction } from './transaction-multi.service.ts';
