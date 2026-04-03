/**
 * account-guards.ts
 * حماية: منع تنفيذ عمليات على حسابات فرعية (صندوق/بنك/محفظة/صراف/مورد/موظف/شريك)
 * إذا لم يكن هناك كيان تحليلي مرتبط بالحساب
 *
 * القاعدة الصارمة: كل حساب فرعي له حسابات تحليلية (كيانات) يجب أن تنفَّذ
 * العملية على الحساب التحليلي وليس مباشرة على الحساب الفرعي.
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

/** أنواع الحسابات التي تتطلب كياناً تحليلياً (مورد/موظف/شريك/مخزن/عهدة) */
const SUBLEDGER_ACCOUNT_TYPES = ['supplier', 'employee', 'partner', 'warehouse', 'custody'] as const;

const SUBLEDGER_LABELS: Record<string, string> = {
  supplier: 'مورد',
  employee: 'موظف',
  partner: 'شريك',
  warehouse: 'مخزن',
  custody: 'عهدة',
};

/**
 * تتحقق من أن كل إدخال على حساب من نوع subledger (مورد/موظف/شريك/مخزن/عهدة)
 * يحتوي على entityId صالح.
 * entriesWithAccounts: مصفوفة من { accountId, entityId? }
 */
export async function validateSubledgerAccountEntries(
  entriesWithAccounts: Array<{ accountId: number; entityId?: number | null }>
): Promise<string | null> {
  if (!entriesWithAccounts.length) return null;

  const accountIds = [...new Set(entriesWithAccounts.map(e => e.accountId).filter(Boolean))];
  if (!accountIds.length) return null;

  const rows = await db
    .select({ id: accounts.id, name: accounts.name, accountType: accounts.accountType })
    .from(accounts)
    .where(inArray(accounts.id, accountIds));

  const subledgerAccounts = rows.filter(
    r => r.accountType && (SUBLEDGER_ACCOUNT_TYPES as readonly string[]).includes(r.accountType)
  );

  for (const acc of subledgerAccounts) {
    const entry = entriesWithAccounts.find(e => e.accountId === acc.id);
    const entityId = entry?.entityId ? Number(entry.entityId) : null;
    if (!entityId || !Number.isInteger(entityId) || entityId <= 0) {
      const label = SUBLEDGER_LABELS[acc.accountType as string] || acc.accountType || 'كيان';
      return `لا يمكن الترحيل مباشرة على الحساب "${acc.name}" — يجب اختيار ${label} محدد (الحساب التحليلي) لكل عملية`;
    }
  }

  return null;
}
