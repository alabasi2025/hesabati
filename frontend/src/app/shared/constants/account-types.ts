/**
 * أنواع الحسابات: تسميات وأيقونات وألوان للواجهة
 */
export interface AccountTypeMeta {
  label: string;
  icon: string;
  color: string;
}

export const ACCOUNT_TYPE_META: Record<string, AccountTypeMeta> = {
  billing:      { label: 'فوترة',    icon: 'receipt',                  color: '#a855f7' },
  fund:         { label: 'صندوق',    icon: 'savings',                  color: '#22c55e' },
  bank:         { label: 'بنك',      icon: 'account_balance',          color: '#3b82f6' },
  e_wallet:     { label: 'محفظة',    icon: 'account_balance_wallet',   color: '#8b5cf6' },
  exchange:     { label: 'صراف',     icon: 'currency_exchange',        color: '#f59e0b' },
  accounting:   { label: 'محاسبي',   icon: 'book',                     color: '#14b8a6' },
  intermediary: { label: 'وسيط',     icon: 'swap_horiz',               color: '#f97316' },
  cash:         { label: 'نقد',      icon: 'payments',                 color: '#84cc16' },
  custody:      { label: 'عهدة',     icon: 'lock',                     color: '#ec4899' },
  service:      { label: 'خدمة',     icon: 'miscellaneous_services',   color: '#06b6d4' },
  warehouse:    { label: 'مخزن',     icon: 'warehouse',                color: '#f59e0b' },
};

export function getAccTypeMeta(type: string): AccountTypeMeta {
  return ACCOUNT_TYPE_META[type] ?? { label: type, icon: 'account_balance_wallet', color: '#64748b' };
}

/** ترجمة أنواع الصناديق */
export const FUND_TYPE_LABELS: Record<string, string> = {
  collection: 'تحصيل وتوريد',
  salary_advance: 'سلف',
  custody: 'عهدة',
  safe: 'خزنة',
  expense: 'مصروفات',
  deposit: 'إيداع',
  personal: 'شخصي',
};
