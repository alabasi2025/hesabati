import type { AppContext } from './types.ts';

/**
 * استخراج معرف العمل من السياق (بعد bizAuthMiddleware)
 * يقبل أي سياق Hono لاستخدامه من api.rest وغيره.
 */
export function getBizId(c: AppContext | { get(key: string): unknown }): number {
  const v = c.get('bizId');
  return typeof v === 'number' ? v : 0;
}

/**
 * استخراج معرف المستخدم من السياق (بعد authMiddleware)
 * يقبل أي سياق Hono لاستخدامه من api.rest وغيره.
 */
export function getUserId(c: AppContext | { get(key: string): unknown }): number | undefined {
  const user = c.get('user');
  return user && typeof user === 'object' && 'userId' in user ? (user as { userId: number }).userId : undefined;
}
