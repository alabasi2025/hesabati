/**
 * account-guards.ts
 * حماية: منع تنفيذ عمليات على حسابات فرعية (صندوق/بنك/محفظة/صراف)
 * إذا لم يكن هناك كيان فعلي مرتبط بالحساب
 */
import { db } from '../../../db/index.ts';
import { eq, inArray } from 'drizzle-orm';
import {
  accounts,
  funds,
  banks,
  wallets,
  exchanges,
} from '../../../db/schema/index.ts';

const ENTITY_ACCOUNT_TYPES = ['fund', 'bank', 'e_wallet', 'exchange'] as const;

type EntityAccountType = (typeof ENTITY_ACCOUNT_TYPES)[number];

/**
 * يتحقق من أن كل حساب من نوع fund/bank/e_wallet/exchange
 * مرتبط فعلاً بكيان (صندوق/بنك/محفظة/صراف).
 * يُرجع رسالة خطأ إذا وُجد حساب يتيم، أو null إذا كل شيء صحيح.
 */
export async function validateEntityAccountLinks(accountIds: number[]): Promise<string | null> {
  if (!accountIds.length) return null;

  const unique = [...new Set(accountIds)];
  const rows = await db
    .select({ id: accounts.id, name: accounts.name, accountType: accounts.accountType })
    .from(accounts)
    .where(inArray(accounts.id, unique));

  const entityAccounts = rows.filter(
    (r) => r.accountType && (ENTITY_ACCOUNT_TYPES as readonly string[]).includes(r.accountType)
  );

  if (!entityAccounts.length) return null;

  for (const acc of entityAccounts) {
    const type = acc.accountType as EntityAccountType;
    let hasEntity = false;

    if (type === 'fund') {
      const [row] = await db.select({ id: funds.id }).from(funds).where(eq(funds.accountId, acc.id)).limit(1);
      hasEntity = !!row;
    } else if (type === 'bank') {
      const [row] = await db.select({ id: banks.id }).from(banks).where(eq(banks.accountId, acc.id)).limit(1);
      hasEntity = !!row;
    } else if (type === 'e_wallet') {
      const [row] = await db.select({ id: wallets.id }).from(wallets).where(eq(wallets.accountId, acc.id)).limit(1);
      hasEntity = !!row;
    } else if (type === 'exchange') {
      const [row] = await db.select({ id: exchanges.id }).from(exchanges).where(eq(exchanges.accountId, acc.id)).limit(1);
      hasEntity = !!row;
    }

    if (!hasEntity) {
      const typeLabels: Record<EntityAccountType, string> = {
        fund: 'صندوق',
        bank: 'بنك',
        e_wallet: 'محفظة إلكترونية',
        exchange: 'صراف',
      };
      return `لا يمكن تنفيذ عملية على الحساب "${acc.name}" لأنه من نوع ${typeLabels[type]} ولا يوجد ${typeLabels[type]} مرتبط به. أنشئ ${typeLabels[type]} مرتبطاً بهذا الحساب أولاً`;
    }
  }

  return null;
}
