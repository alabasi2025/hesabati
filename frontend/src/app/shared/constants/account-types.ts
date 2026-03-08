/**
 * أنواع الحسابات: تسميات وأيقونات وألوان للواجهة
 */
export interface AccountTypeMeta {
  label: string;
  icon: string;
  color: string;
}

export const ACCOUNT_TYPE_META: Record<string, AccountTypeMeta> = {
  fund:         { label: 'صندوق',         icon: 'savings',                  color: '#22c55e' },
  bank:         { label: 'بنك',           icon: 'account_balance',          color: '#3b82f6' },
  e_wallet:     { label: 'محفظة',         icon: 'account_balance_wallet',   color: '#8b5cf6' },
  exchange:     { label: 'صراف',          icon: 'currency_exchange',        color: '#f59e0b' },
  warehouse:    { label: 'مخزن',          icon: 'warehouse',                color: '#78716c' },
  custody:      { label: 'عهدة',          icon: 'lock',                     color: '#ec4899' },
  supplier:     { label: 'مورد',          icon: 'local_shipping',           color: '#f97316' },
  employee:     { label: 'موظف',          icon: 'person',                   color: '#06b6d4' },
  partner:      { label: 'شريك',          icon: 'handshake',                color: '#d946ef' },
  billing:      { label: 'فوترة',         icon: 'receipt',                  color: '#a855f7' },
  budget:       { label: 'ميزانية',       icon: 'account_balance_wallet',   color: '#84cc16' },
  settlement:   { label: 'تصفية',         icon: 'balance',                  color: '#0891b2' },
  pending:      { label: 'معلقة',         icon: 'pending_actions',          color: '#ef4444' },
  accounting:   { label: 'أخرى',          icon: 'book',                     color: '#14b8a6' },
};

export function getAccTypeMeta(type: string): AccountTypeMeta {
  return ACCOUNT_TYPE_META[type] ?? { label: type, icon: 'account_balance_wallet', color: '#64748b' };
}

/**
 * @deprecated استخدم التصنيفات من قاعدة البيانات بدلاً من هذا الثابت
 * التصنيفات الآن تُدار من صفحة "أنواع الحسابات" وتُخزن في جداول:
 * fund_types, bank_types, exchange_types, e_wallet_types, warehouse_types
 */
export const FUND_TYPE_LABELS: Record<string, string> = {};
