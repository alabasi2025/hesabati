/**
 * api.types.ts — أنواع مشتركة لجميع استدعاءات API
 * يُستخدم بدلاً من `any` في واجهة ApiService
 */

/** بيانات الإنشاء/التعديل العامة — كائن مفاتيحه نصية */
export type EntityPayload = Record<string, unknown>;

/** بيانات إنشاء/تعديل عمل تجاري */
export interface BusinessPayload {
  name: string;
  code?: string;
  type?: string;
  description?: string;
  icon?: string;
  color?: string;
  sortOrder?: number;
  notes?: string;
}

/** بيانات إنشاء/تعديل محطة */
export interface StationPayload {
  name: string;
  code?: string;
  location?: string | null;
  managerId?: number | null;
  billingSystems?: unknown[];
  hasEmployees?: boolean;
  isActive?: boolean;
  notes?: string | null;
}

/** بيانات إنشاء/تعديل موظف */
export interface EmployeePayload {
  fullName: string;
  stationId?: number | null;
  department?: string | null;
  departmentId?: number | null;
  jobTitle?: string | null;
  jobTitleId?: number | null;
  salary?: string;
  salaryCurrency?: string;
  phone?: string | null;
  status?: string;
  notes?: string | null;
  isManager?: boolean;
}

/** بيانات إنشاء/تعديل حساب */
export interface AccountPayload {
  name: string;
  accountType?: string;
  parentAccountId?: number | null;
  accountSubNatureId?: number | null;
  isActive?: boolean;
  notes?: string | null;
  [key: string]: unknown;
}

/** بيانات إنشاء/تعديل صندوق */
export interface FundPayload {
  name: string;
  fundType?: string;
  isActive?: boolean;
  notes?: string | null;
  [key: string]: unknown;
}

/** بيانات إنشاء/تعديل سند */
export interface VoucherPayload {
  voucherType: 'receipt' | 'payment' | 'journal' | 'transfer' | 'exchange';
  amount?: number | string;
  currencyId: number;
  fromAccountId?: number | null;
  toAccountId?: number | null;
  fromFundId?: number | null;
  toFundId?: number | null;
  description?: string;
  [key: string]: unknown;
}

/** فلاتر البحث المتقدم للسندات */
export interface VoucherFilters {
  type?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
  minAmount?: number;
  maxAmount?: number;
  operationTypeId?: number;
  limit?: number;
  offset?: number;
  [key: string]: unknown;
}

/** بيانات شاشة مخصصة */
export interface ScreenPayload {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  templateKey?: string;
  layoutConfig?: unknown;
  [key: string]: unknown;
}

/** بيانات widget */
export interface WidgetPayload {
  widgetType: string;
  title: string;
  config?: unknown;
  positionX?: number;
  positionY?: number;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

/** بيانات قسم السايدبار */
export interface SidebarSectionPayload {
  name: string;
  icon?: string;
  color?: string;
  sortOrder?: number;
}

/** بيانات عنصر السايدبار */
export interface SidebarItemPayload {
  sectionId: number;
  screenKey: string;
  label: string;
  icon: string;
  color?: string;
  route: string;
  sortOrder?: number;
  [key: string]: unknown;
}
