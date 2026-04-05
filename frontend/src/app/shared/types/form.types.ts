/**
 * أنواع مشتركة للنماذج (Forms) في المشروع
 */

/** خيار في قائمة منسدلة */
export interface SelectOption {
  value: string | number;
  label: string;
  icon?: string;
  color?: string;
}

/** تبويب فلترة */
export interface FilterTab {
  value: string;
  label: string;
  icon?: string;
  count?: number;
}

/** عنصر ملخص (summary card) */
export interface SummaryItem {
  label: string;
  value: number | string;
  icon: string;
  color: 'amber' | 'blue' | 'green' | 'red' | 'purple' | 'teal';
}

/** رصيد عملة */
export interface CurrencyBalance {
  currencyId: number;
  currencyCode: string;
  currencySymbol: string;
  balance: string | number;
  isDefault?: boolean;
}

/** نموذج حذف */
export interface DeleteConfirm {
  id: number;
  name: string;
  type: string;
}
