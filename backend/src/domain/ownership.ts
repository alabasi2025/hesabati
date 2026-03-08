/**
 * التحقق من ملكية الموارد (حسابات، صناديق) — طبقة نطاق (domain).
 * يُستورد من services (مثل transaction) و routes/api/_shared دون انعكاس اعتماد.
 */
import { and, eq } from 'drizzle-orm';
import { db } from '../db/index.ts';
import { accounts, funds } from '../db/schema/index.ts';

/**
 * التحقق من ملكية حساب (ينتمي للعمل المحدد).
 */
export async function verifyAccountOwnership(accountId: number, bizId: number): Promise<boolean> {
  const [acc] = await db
    .select({ id: accounts.id })
    .from(accounts)
    .where(and(eq(accounts.id, accountId), eq(accounts.businessId, bizId)));
  return !!acc;
}

/**
 * التحقق من ملكية صندوق (ينتمي للعمل المحدد).
 */
export async function verifyFundOwnership(fundId: number, bizId: number): Promise<boolean> {
  const [f] = await db
    .select({ id: funds.id })
    .from(funds)
    .where(and(eq(funds.id, fundId), eq(funds.businessId, bizId)));
  return !!f;
}
