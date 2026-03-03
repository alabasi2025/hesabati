import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

export interface DashboardStats {
  businesses: number;
  stations: number;
  employees: number;
  accounts: number;
  funds: number;
  suppliers: number;
  partners: number;
  vouchers: number;
  pendingAccounts: number;
  warehouses: number;
  totalSalaries: string;
}

export interface Business {
  id: number;
  name: string;
  code: string;
  type: 'stations' | 'single_station' | 'personal';
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  sortOrder: number;
  partners: any[];
  stats: {
    stations: number;
    employees: number;
    accounts: number;
    funds: number;
    suppliers: number;
    pendingAccounts: number;
  };
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = '/api';
  private auth = inject(AuthService);

  private getHeaders(): HeadersInit {
    const token = this.auth.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.API_URL}${path}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options?.headers },
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      // بناء رسالة خطأ عربية مفصلة
      let errorMsg = err.error || this.getArabicHttpError(res.status);
      if (err.details) {
        errorMsg += ` (التفاصيل: ${err.details})`;
      }
      if (err.location) {
        errorMsg += ` [الموقع: ${err.location}]`;
      }
      const error: any = new Error(errorMsg);
      error.status = res.status;
      error.details = err.details;
      error.location = err.location;
      error.originalError = err;
      throw error;
    }
    return res.json();
  }

  private getArabicHttpError(status: number): string {
    const errors: Record<number, string> = {
      400: 'طلب غير صحيح — تأكد من البيانات المدخلة',
      401: 'غير مصرح — يرجى تسجيل الدخول مرة أخرى',
      403: 'ليس لديك صلاحية لهذه العملية',
      404: 'العنصر المطلوب غير موجود',
      409: 'تعارض في البيانات — العنصر موجود مسبقاً',
      422: 'بيانات غير صالحة — تأكد من جميع الحقول المطلوبة',
      500: 'خطأ في الخادم — يرجى المحاولة لاحقاً',
      502: 'الخادم غير متاح حالياً',
      503: 'الخدمة متوقفة مؤقتاً',
    };
    return errors[status] || `خطأ غير متوقع (رمز: ${status})`;
  }

  // ===================== Dashboard =====================
  getDashboardStats() { return this.request<DashboardStats>('/dashboard/stats'); }

  // ===================== الأعمال =====================
  getBusinesses()          { return this.request<Business[]>('/businesses'); }
  getBusiness(id: number)  { return this.request<Business>(`/businesses/${id}`); }

  // ===================== المحطات =====================
  getStations(bizId: number)                   { return this.request<any[]>(`/businesses/${bizId}/stations`); }
  getStation(bizId: number, id: number)        { return this.request<any>(`/businesses/${bizId}/stations/${id}`); }
  updateStation(id: number, d: any)            { return this.request<any>(`/stations/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }

  // ===================== الموظفين =====================
  getEmployees(bizId: number)                    { return this.request<any[]>(`/businesses/${bizId}/employees`); }
  createEmployee(bizId: number, d: any)          { return this.request<any>(`/businesses/${bizId}/employees`, { method: 'POST', body: JSON.stringify(d) }); }
  updateEmployee(id: number, d: any)             { return this.request<any>(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteEmployee(id: number)                     { return this.request<any>(`/employees/${id}`, { method: 'DELETE' }); }

  // ===================== حسابات الموظفين في أنظمة الفوترة =====================
  getEmployeeBillingAccounts(bizId: number, stationId?: number) {
    let url = `/businesses/${bizId}/employee-billing-accounts`;
    if (stationId) url += `?stationId=${stationId}`;
    return this.request<any[]>(url);
  }
  createEmployeeBillingAccount(d: any)           { return this.request<any>(`/employee-billing-accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  updateEmployeeBillingAccount(id: number, d: any) { return this.request<any>(`/employee-billing-accounts/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteEmployeeBillingAccount(id: number)       { return this.request<any>(`/employee-billing-accounts/${id}`, { method: 'DELETE' }); }

  // ===================== الحسابات مع الصلاحيات =====================
  getAccounts(bizId: number)                     { return this.request<any[]>(`/businesses/${bizId}/accounts`); }
  getAllAccounts(bizId: number)                   { return this.request<{ accounts: any[]; stations: any[] }>(`/businesses/${bizId}/accounts?all=true`); }
  createAccount(bizId: number, d: any)           { return this.request<any>(`/businesses/${bizId}/accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  updateAccount(id: number, d: any)              { return this.request<any>(`/accounts/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteAccount(id: number)                      { return this.request<any>(`/accounts/${id}`, { method: 'DELETE' }); }

  // ===================== ربط الحسابات المسموحة =====================
  getAccountLinks(accountId: number)             { return this.request<any[]>(`/accounts/${accountId}/allowed-links`); }
  getAccountAllowedTargets(accountId: number, type: string) { return this.request<any[]>(`/accounts/${accountId}/allowed-targets?type=${type}`); }
  createAccountLink(d: any)                      { return this.request<any>(`/account-links`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteAccountLink(id: number)                  { return this.request<any>(`/account-links/${id}`, { method: 'DELETE' }); }

  // ===================== الصناديق =====================
  getFunds(bizId: number)                        { return this.request<any[]>(`/businesses/${bizId}/funds`); }
  createFund(bizId: number, d: any)              { return this.request<any>(`/businesses/${bizId}/funds`, { method: 'POST', body: JSON.stringify(d) }); }
  updateFund(bizId: number, id: number, d: any)  { return this.request<any>(`/businesses/${bizId}/funds/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteFund(bizId: number, id: number)           { return this.request<any>(`/businesses/${bizId}/funds/${id}`, { method: 'DELETE' }); }

  // ===================== السندات =====================
  getVouchers(bizId: number, type?: string)      { return this.request<any[]>(`/businesses/${bizId}/vouchers${type ? '?type=' + type : ''}`); }
  createVoucher(bizId: number, d: any)           { return this.request<any>(`/businesses/${bizId}/vouchers`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteVoucher(id: number)                      { return this.request<any>(`/vouchers/${id}`, { method: 'DELETE' }); }

  // ===================== التحصيل اليومي =====================
  getCollections(bizId: number, stationId?: number, date?: string) {
    let url = `/businesses/${bizId}/collections`;
    const params: string[] = [];
    if (stationId) params.push(`stationId=${stationId}`);
    if (date) params.push(`date=${date}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any[]>(url);
  }
  getCollection(id: number)                      { return this.request<any>(`/collections/${id}`); }
  createCollection(bizId: number, d: any)        { return this.request<any>(`/businesses/${bizId}/collections`, { method: 'POST', body: JSON.stringify(d) }); }

  // ===================== التوريد =====================
  createDelivery(collectionId: number, d: any)   { return this.request<any>(`/collections/${collectionId}/deliveries`, { method: 'POST', body: JSON.stringify(d) }); }

  // ===================== الشركاء =====================
  getPartners(bizId: number)                     { return this.request<any[]>(`/businesses/${bizId}/partners`); }
  createPartner(bizId: number, d: any)           { return this.request<any>(`/businesses/${bizId}/partners`, { method: 'POST', body: JSON.stringify(d) }); }
  updatePartner(id: number, d: any)              { return this.request<any>(`/partners/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deletePartner(id: number)                      { return this.request<any>(`/partners/${id}`, { method: 'DELETE' }); }

  // ===================== الموردين =====================
  getSuppliers(bizId: number)                    { return this.request<any[]>(`/businesses/${bizId}/suppliers`); }
  createSupplier(bizId: number, d: any)          { return this.request<any>(`/businesses/${bizId}/suppliers`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSupplier(id: number, d: any)             { return this.request<any>(`/suppliers/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSupplier(id: number)                     { return this.request<any>(`/suppliers/${id}`, { method: 'DELETE' }); }

  // ===================== المخازن =====================
  getWarehouses(bizId: number)                   { return this.request<any[]>(`/businesses/${bizId}/warehouses`); }
  createWarehouse(bizId: number, d: any)         { return this.request<any>(`/businesses/${bizId}/warehouses`, { method: 'POST', body: JSON.stringify(d) }); }
  updateWarehouse(id: number, d: any)            { return this.request<any>(`/warehouses/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteWarehouse(id: number)                    { return this.request<any>(`/warehouses/${id}`, { method: 'DELETE' }); }

  // ===================== الحسابات المعلقة =====================
  getPendingAccounts(bizId: number)              { return this.request<any[]>(`/businesses/${bizId}/pending-accounts`); }
  createPendingAccount(bizId: number, d: any)    { return this.request<any>(`/businesses/${bizId}/pending-accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  updatePendingAccount(id: number, d: any)       { return this.request<any>(`/pending-accounts/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deletePendingAccount(id: number)               { return this.request<any>(`/pending-accounts/${id}`, { method: 'DELETE' }); }

  // ===================== التصفيات =====================
  getSettlements(bizId: number)                  { return this.request<any[]>(`/businesses/${bizId}/settlements`); }
  createSettlement(bizId: number, d: any)        { return this.request<any>(`/businesses/${bizId}/settlements`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSettlement(id: number, d: any)           { return this.request<any>(`/settlements/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSettlement(id: number)                   { return this.request<any>(`/settlements/${id}`, { method: 'DELETE' }); }

  // ===================== تصنيفات السندات =====================
  getVoucherCategories(bizId: number)            { return this.request<any[]>(`/businesses/${bizId}/voucher-categories`); }

  // ===================== أنواع العمليات (القوالب) =====================
  getOperationTypes(bizId: number, category?: string, screen?: string) {
    let url = `/businesses/${bizId}/operation-types`;
    const params: string[] = [];
    if (category) params.push(`category=${category}`);
    if (screen) params.push(`screen=${screen}`);
    if (params.length) url += `?${params.join('&')}`;
    return this.request<any[]>(url);
  }
  getOperationType(id: number)                      { return this.request<any>(`/operation-types/${id}`); }
  createOperationType(bizId: number, d: any)        { return this.request<any>(`/businesses/${bizId}/operation-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateOperationType(id: number, d: any)           { return this.request<any>(`/operation-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteOperationType(id: number)                   { return this.request<any>(`/operation-types/${id}`, { method: 'DELETE' }); }
  addOperationTypeAccount(otId: number, d: any)     { return this.request<any>(`/operation-types/${otId}/accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  removeOperationTypeAccount(id: number)            { return this.request<any>(`/operation-type-accounts/${id}`, { method: 'DELETE' }); }

  // ===================== القيود المحاسبية =====================
  getJournalEntries(bizId: number)              { return this.request<any[]>(`/businesses/${bizId}/journal-entries`); }
  createJournalEntry(bizId: number, d: any)     { return this.request<any>(`/businesses/${bizId}/journal-entries`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteJournalEntry(id: number)                { return this.request<any>(`/journal-entries/${id}`, { method: 'DELETE' }); }

  // ===================== إعدادات أنظمة الفوترة =====================
  getBillingSystemsConfig(bizId: number)              { return this.request<any[]>(`/businesses/${bizId}/billing-systems-config`); }
  createBillingSystemConfig(bizId: number, d: any)    { return this.request<any>(`/businesses/${bizId}/billing-systems-config`, { method: 'POST', body: JSON.stringify(d) }); }
  updateBillingSystemConfig(id: number, d: any)       { return this.request<any>(`/billing-systems-config/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteBillingSystemConfig(id: number)               { return this.request<any>(`/billing-systems-config/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع حسابات الفوترة =====================
  getBillingAccountTypes(bizId: number)               { return this.request<any[]>(`/businesses/${bizId}/billing-account-types`); }
  createBillingAccountType(bizId: number, d: any)     { return this.request<any>(`/businesses/${bizId}/billing-account-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateBillingAccountType(id: number, d: any)        { return this.request<any>(`/billing-account-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteBillingAccountType(id: number)                { return this.request<any>(`/billing-account-types/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع الصناديق =====================
  getFundTypes(bizId: number)                         { return this.request<any[]>(`/businesses/${bizId}/fund-types`); }
  createFundType(bizId: number, d: any)               { return this.request<any>(`/businesses/${bizId}/fund-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateFundType(id: number, d: any)                  { return this.request<any>(`/fund-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteFundType(id: number)                          { return this.request<any>(`/fund-types/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع البنوك =====================
  getBankTypes(bizId: number)                         { return this.request<any[]>(`/businesses/${bizId}/bank-types`); }
  createBankType(bizId: number, d: any)               { return this.request<any>(`/businesses/${bizId}/bank-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateBankType(id: number, d: any)                  { return this.request<any>(`/bank-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteBankType(id: number)                          { return this.request<any>(`/bank-types/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع الصرافين =====================
  getExchangeTypes(bizId: number)                     { return this.request<any[]>(`/businesses/${bizId}/exchange-types`); }
  createExchangeType(bizId: number, d: any)           { return this.request<any>(`/businesses/${bizId}/exchange-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateExchangeType(id: number, d: any)              { return this.request<any>(`/exchange-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteExchangeType(id: number)                      { return this.request<any>(`/exchange-types/${id}`, { method: 'DELETE' }); }

  // ===================== أنواع المحافظ الإلكترونية =====================
  getEWalletTypes(bizId: number)                      { return this.request<any[]>(`/businesses/${bizId}/e-wallet-types`); }
  createEWalletType(bizId: number, d: any)            { return this.request<any>(`/businesses/${bizId}/e-wallet-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateEWalletType(id: number, d: any)               { return this.request<any>(`/e-wallet-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteEWalletType(id: number)                       { return this.request<any>(`/e-wallet-types/${id}`, { method: 'DELETE' }); }

  // ===================== التبويب الجانبي =====================
  getSidebarSections(bizId: number)                      { return this.request<any[]>(`/businesses/${bizId}/sidebar-sections`); }
  createSidebarSection(bizId: number, d: any)            { return this.request<any>(`/businesses/${bizId}/sidebar-sections`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSidebarSection(id: number, d: any)               { return this.request<any>(`/sidebar-sections/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSidebarSection(id: number)                       { return this.request<any>(`/sidebar-sections/${id}`, { method: 'DELETE' }); }

  getSidebarItems(bizId: number)                         { return this.request<any[]>(`/businesses/${bizId}/sidebar-items`); }
  createSidebarItem(d: any)                              { return this.request<any>(`/sidebar-items`, { method: 'POST', body: JSON.stringify(d) }); }
  updateSidebarItem(id: number, d: any)                  { return this.request<any>(`/sidebar-items/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteSidebarItem(id: number)                          { return this.request<any>(`/sidebar-items/${id}`, { method: 'DELETE' }); }

  getUserSidebar(bizId: number, userId: number)          { return this.request<any[]>(`/businesses/${bizId}/users/${userId}/sidebar`); }
  updateUserSidebar(bizId: number, userId: number, d: any) { return this.request<any>(`/businesses/${bizId}/users/${userId}/sidebar`, { method: 'PUT', body: JSON.stringify(d) }); }

  getUsers()                                             { return this.request<any[]>('/users'); }

  // ===================== الشاشات المخصصة =====================
  getScreens(bizId: number)                          { return this.request<any[]>(`/businesses/${bizId}/screens`); }
  createScreen(bizId: number, d: any)                { return this.request<any>(`/businesses/${bizId}/screens`, { method: 'POST', body: JSON.stringify(d) }); }
  updateScreen(id: number, d: any)                   { return this.request<any>(`/screens/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteScreen(id: number)                           { return this.request<any>(`/screens/${id}`, { method: 'DELETE' }); }
  getScreenWidgets(screenId: number)                  { return this.request<any[]>(`/screens/${screenId}/widgets`); }
  createScreenWidget(screenId: number, d: any)        { return this.request<any>(`/screens/${screenId}/widgets`, { method: 'POST', body: JSON.stringify(d) }); }
  updateWidget(id: number, d: any)                   { return this.request<any>(`/widgets/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteWidget(id: number)                           { return this.request<any>(`/widgets/${id}`, { method: 'DELETE' }); }
  batchUpdateWidgets(screenId: number, widgets: any[])  { return this.request<any[]>(`/screens/${screenId}/widgets/batch`, { method: 'PUT', body: JSON.stringify({ widgets }) }); }

  // ===================== ربط القوالب والحسابات بالعناصر =====================
  getWidgetTemplates(widgetId: number)                  { return this.request<any[]>(`/widgets/${widgetId}/templates`); }
  addWidgetTemplate(widgetId: number, d: any)           { return this.request<any>(`/widgets/${widgetId}/templates`, { method: 'POST', body: JSON.stringify(d) }); }
  removeWidgetTemplate(id: number)                      { return this.request<any>(`/widget-templates/${id}`, { method: 'DELETE' }); }
  getWidgetAccountLinks(widgetId: number)               { return this.request<any[]>(`/widgets/${widgetId}/accounts`); }
  addWidgetAccount(widgetId: number, d: any)            { return this.request<any>(`/widgets/${widgetId}/accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  removeWidgetAccount(id: number)                       { return this.request<any>(`/widget-accounts/${id}`, { method: 'DELETE' }); }

  // ===================== نسخ الشاشات والعناصر =====================
  cloneScreen(screenId: number, d: any)                 { return this.request<any>(`/screens/${screenId}/clone`, { method: 'POST', body: JSON.stringify(d) }); }
  copyWidgetToScreen(widgetId: number, targetScreenId: number) { return this.request<any>(`/widgets/${widgetId}/copy-to/${targetScreenId}`, { method: 'POST', body: JSON.stringify({}) }); }
  getScreensWithWidgets(bizId: number)                  { return this.request<any[]>(`/businesses/${bizId}/screens-with-widgets`); }

  // ===================== صلاحيات الشاشات =====================
  getScreenPermissions(screenId: number)                { return this.request<any[]>(`/screens/${screenId}/permissions`); }
  setScreenPermissions(screenId: number, d: any)        { return this.request<any>(`/screens/${screenId}/permissions`, { method: 'POST', body: JSON.stringify(d) }); }
  updateScreenPermission(id: number, d: any)            { return this.request<any>(`/screen-permissions/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteScreenPermission(id: number)                    { return this.request<any>(`/screen-permissions/${id}`, { method: 'DELETE' }); }
  batchUpdateScreenPermissions(screenId: number, permissions: any[]) { return this.request<any>(`/screens/${screenId}/permissions/batch`, { method: 'PUT', body: JSON.stringify({ permissions }) }); }

  // ===================== إنشاء شاشة من قالب وربط بالقائمة الجانبية =====================
  createScreenFromTemplate(bizId: number, d: any)       { return this.request<any>(`/businesses/${bizId}/screens`, { method: 'POST', body: JSON.stringify(d) }); }
  addScreenToSidebar(bizId: number, screenId: number, d: any) { return this.request<any>(`/businesses/${bizId}/screens/${screenId}/add-to-sidebar`, { method: 'POST', body: JSON.stringify(d) }); }
  getUserScreens(bizId: number, userId: number)         { return this.request<any[]>(`/businesses/${bizId}/users/${userId}/screens`); }

  // ===================== بيانات العناصر الحقيقية =====================
  getWidgetStats(bizId: number, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/widget-stats`;
    const params: string[] = [];
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }
  getWidgetLog(bizId: number, filters?: { dateFrom?: string; dateTo?: string; operationTypeId?: number; limit?: number; offset?: number }) {
    let url = `/businesses/${bizId}/widget-log`;
    const params: string[] = [];
    if (filters?.dateFrom) params.push(`dateFrom=${filters.dateFrom}`);
    if (filters?.dateTo) params.push(`dateTo=${filters.dateTo}`);
    if (filters?.operationTypeId) params.push(`operationTypeId=${filters.operationTypeId}`);
    if (filters?.limit) params.push(`limit=${filters.limit}`);
    if (filters?.offset) params.push(`offset=${filters.offset}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }
  getWidgetAccounts(bizId: number, accountIds?: number[]) {
    let url = `/businesses/${bizId}/widget-accounts`;
    if (accountIds?.length) url += `?accountIds=${accountIds.join(',')}`;
    return this.request<any[]>(url);
  }
  getWidgetChart(bizId: number, months?: number) {
    let url = `/businesses/${bizId}/widget-chart`;
    if (months) url += `?months=${months}`;
    return this.request<any>(url);
  }
  getWidgetNotes(widgetId: number)                    { return this.request<any>(`/widgets/${widgetId}/notes`); }
  saveWidgetNotes(widgetId: number, text: string)     { return this.request<any>(`/widgets/${widgetId}/notes`, { method: 'PUT', body: JSON.stringify({ text }) }); }
  getWidgetOperationTypes(bizId: number, ids?: number[]) {
    let url = `/businesses/${bizId}/widget-operation-types`;
    if (ids?.length) url += `?ids=${ids.join(',')}`;
    return this.request<any[]>(url);
  }

  // ===================== العملات =====================
  getCurrencies() { return this.request<any[]>('/currencies'); }

  // ===================== المرفقات =====================
  getAttachments(entityType: string, entityId: number) { return this.request<any[]>(`/attachments/${entityType}/${entityId}`); }
  uploadAttachment(bizId: number, d: any)              { return this.request<any>(`/businesses/${bizId}/attachments`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteAttachment(bizId: number, id: number)          { return this.request<any>(`/businesses/${bizId}/attachments/${id}`, { method: 'DELETE' }); }

  // ===================== أسعار الصرف =====================
  getExchangeRates(bizId: number, date?: string) {
    let url = `/businesses/${bizId}/exchange-rates`;
    if (date) url += `?date=${date}`;
    return this.request<any[]>(url);
  }
  createExchangeRate(bizId: number, d: any)            { return this.request<any>(`/businesses/${bizId}/exchange-rates`, { method: 'POST', body: JSON.stringify(d) }); }
  updateExchangeRate(bizId: number, id: number, d: any) { return this.request<any>(`/businesses/${bizId}/exchange-rates/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteExchangeRate(bizId: number, id: number)        { return this.request<any>(`/businesses/${bizId}/exchange-rates/${id}`, { method: 'DELETE' }); }
  convertCurrency(bizId: number, from: number, to: number, amount: number) {
    return this.request<any>(`/businesses/${bizId}/exchange-rates/convert?from=${from}&to=${to}&amount=${amount}`);
  }

  // ===================== الأدوار والصلاحيات RBAC =====================
  getRoles(bizId: number)                              { return this.request<any[]>(`/businesses/${bizId}/roles`); }
  createRole(bizId: number, d: any)                    { return this.request<any>(`/businesses/${bizId}/roles`, { method: 'POST', body: JSON.stringify(d) }); }
  updateRole(bizId: number, id: number, d: any)        { return this.request<any>(`/businesses/${bizId}/roles/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteRole(bizId: number, id: number)                { return this.request<any>(`/businesses/${bizId}/roles/${id}`, { method: 'DELETE' }); }
  getUserRoles(bizId: number)                          { return this.request<any[]>(`/businesses/${bizId}/user-roles`); }
  assignUserRole(bizId: number, d: any)                { return this.request<any>(`/businesses/${bizId}/user-roles`, { method: 'POST', body: JSON.stringify(d) }); }
  removeUserRole(bizId: number, userId: number)        { return this.request<any>(`/businesses/${bizId}/user-roles/${userId}`, { method: 'DELETE' }); }

  // ===================== عكس العمليات =====================
  reverseVoucher(bizId: number, voucherId: number, reason: string) {
    return this.request<any>(`/businesses/${bizId}/vouchers/${voucherId}/reverse`, { method: 'POST', body: JSON.stringify({ reason }) });
  }

  // ===================== التقارير =====================
  getProfitLossReport(bizId: number, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/reports/profit-loss`;
    const params: string[] = [];
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }
  getAccountStatement(bizId: number, accountId: number, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/reports/account-statement/${accountId}`;
    const params: string[] = [];
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }
  getDailySummary(bizId: number, date?: string) {
    let url = `/businesses/${bizId}/reports/daily-summary`;
    if (date) url += `?date=${date}`;
    return this.request<any>(url);
  }
  getTrialBalance(bizId: number, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/reports/trial-balance`;
    const params: string[] = [];
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }

  // ===================== إعداد الشاشة المخصصة (collection-style) =====================
  getCollectionStyleConfig(bizId: number, screenId: number) {
    return this.request<any>(`/businesses/${bizId}/screens/${screenId}/collection-style-config`);
  }
  saveCollectionStyleConfig(bizId: number, screenId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/screens/${screenId}/collection-style-config`, { method: 'PUT', body: JSON.stringify(d) });
  }

  // ===================== تحسينات السندات =====================
  getVouchersEnhanced(bizId: number, filters?: {
    type?: string; status?: string; dateFrom?: string; dateTo?: string;
    search?: string; minAmount?: number; maxAmount?: number;
    operationTypeId?: number; limit?: number; offset?: number;
    sortBy?: string; sortDir?: string;
  }) {
    let url = `/businesses/${bizId}/vouchers-enhanced`;
    const params: string[] = [];
    if (filters?.type) params.push(`type=${filters.type}`);
    if (filters?.status) params.push(`status=${filters.status}`);
    if (filters?.dateFrom) params.push(`dateFrom=${filters.dateFrom}`);
    if (filters?.dateTo) params.push(`dateTo=${filters.dateTo}`);
    if (filters?.search) params.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters?.minAmount) params.push(`minAmount=${filters.minAmount}`);
    if (filters?.maxAmount) params.push(`maxAmount=${filters.maxAmount}`);
    if (filters?.operationTypeId) params.push(`operationTypeId=${filters.operationTypeId}`);
    if (filters?.limit) params.push(`limit=${filters.limit}`);
    if (filters?.offset !== undefined) params.push(`offset=${filters.offset}`);
    if (filters?.sortBy) params.push(`sortBy=${filters.sortBy}`);
    if (filters?.sortDir) params.push(`sortDir=${filters.sortDir}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }
  updateVoucher(bizId: number, id: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/vouchers/${id}`, { method: 'PUT', body: JSON.stringify(d) });
  }
  changeVoucherStatus(bizId: number, id: number, status: string) {
    return this.request<any>(`/businesses/${bizId}/vouchers/${id}/status`, { method: 'POST', body: JSON.stringify({ status }) });
  }
  getAccountBalance(bizId: number, accountId: number) {
    return this.request<any>(`/businesses/${bizId}/account-balance/${accountId}`);
  }
  getVoucherDetails(bizId: number, id: number) {
    return this.request<any>(`/businesses/${bizId}/vouchers/${id}/details`);
  }
  createVoucherDraft(bizId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/vouchers-draft`, { method: 'POST', body: JSON.stringify(d) });
  }

  // ===================== تحسينات أنواع العمليات =====================
  cloneOperationType(bizId: number, id: number, d?: any) {
    return this.request<any>(`/businesses/${bizId}/operation-types/${id}/clone`, { method: 'POST', body: JSON.stringify(d || {}) });
  }
  toggleOperationType(bizId: number, id: number) {
    return this.request<any>(`/businesses/${bizId}/operation-types/${id}/toggle`, { method: 'POST', body: '{}' });
  }
  getOperationTypesStats(bizId: number) {
    return this.request<any[]>(`/businesses/${bizId}/operation-types-stats`);
  }
  checkOperationTypeName(bizId: number, name: string, excludeId?: number) {
    let url = `/businesses/${bizId}/operation-types/check-name?name=${encodeURIComponent(name)}`;
    if (excludeId) url += `&excludeId=${excludeId}`;
    return this.request<{ exists: boolean; name: string }>(url);
  }

  // ===================== تحسينات إعدادات السايدبار =====================
  copySidebarConfig(bizId: number, fromUserId: number, toUserId: number) {
    return this.request<any>(`/businesses/${bizId}/sidebar-config/copy`, { method: 'POST', body: JSON.stringify({ fromUserId, toUserId }) });
  }
  resetSidebarConfig(bizId: number, userId: number) {
    return this.request<any>(`/businesses/${bizId}/sidebar-config/reset/${userId}`, { method: 'POST', body: '{}' });
  }

  // ===================== تحسينات الشاشات المخصصة =====================
  getWidgetLogEnhanced(bizId: number, filters?: {
    dateFrom?: string; dateTo?: string; operationTypeId?: number;
    search?: string; minAmount?: number; maxAmount?: number;
    status?: string; limit?: number; offset?: number;
  }) {
    let url = `/businesses/${bizId}/widget-log-enhanced`;
    const params: string[] = [];
    if (filters?.dateFrom) params.push(`dateFrom=${filters.dateFrom}`);
    if (filters?.dateTo) params.push(`dateTo=${filters.dateTo}`);
    if (filters?.operationTypeId) params.push(`operationTypeId=${filters.operationTypeId}`);
    if (filters?.search) params.push(`search=${encodeURIComponent(filters.search)}`);
    if (filters?.minAmount) params.push(`minAmount=${filters.minAmount}`);
    if (filters?.maxAmount) params.push(`maxAmount=${filters.maxAmount}`);
    if (filters?.status) params.push(`status=${filters.status}`);
    if (filters?.limit) params.push(`limit=${filters.limit}`);
    if (filters?.offset !== undefined) params.push(`offset=${filters.offset}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }
  getWidgetStatsEnhanced(bizId: number, period?: string, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/widget-stats-enhanced`;
    const params: string[] = [];
    if (period) params.push(`period=${period}`);
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }
  getWidgetChartEnhanced(bizId: number, groupBy?: string, months?: number, dateFrom?: string, dateTo?: string) {
    let url = `/businesses/${bizId}/widget-chart-enhanced`;
    const params: string[] = [];
    if (groupBy) params.push(`groupBy=${groupBy}`);
    if (months) params.push(`months=${months}`);
    if (dateFrom) params.push(`dateFrom=${dateFrom}`);
    if (dateTo) params.push(`dateTo=${dateTo}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any>(url);
  }

  // ===================== تصنيفات المخازن =====================
  getWarehouseTypes(bizId: number)                { return this.request<any[]>(`/businesses/${bizId}/warehouse-types`); }
  createWarehouseType(bizId: number, d: any)      { return this.request<any>(`/businesses/${bizId}/warehouse-types`, { method: 'POST', body: JSON.stringify(d) }); }
  updateWarehouseType(id: number, d: any)         { return this.request<any>(`/warehouse-types/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteWarehouseType(id: number)                 { return this.request<any>(`/warehouse-types/${id}`, { method: 'DELETE' }); }

  // ===================== تصنيفات قيود اليومية =====================
  getJournalEntryCategories(bizId: number)        { return this.request<any[]>(`/businesses/${bizId}/journal-entry-categories`); }
  createJournalEntryCategory(bizId: number, d: any) { return this.request<any>(`/businesses/${bizId}/journal-entry-categories`, { method: 'POST', body: JSON.stringify(d) }); }
  updateJournalEntryCategory(id: number, d: any)  { return this.request<any>(`/journal-entry-categories/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteJournalEntryCategory(id: number)          { return this.request<any>(`/journal-entry-categories/${id}`, { method: 'DELETE' }); }

  // ===================== العمليات المخزنية =====================
  getWarehouseOperations(bizId: number, type?: string, warehouseId?: number) {
    let url = `/businesses/${bizId}/warehouse-operations`;
    const params: string[] = [];
    if (type) params.push(`type=${type}`);
    if (warehouseId) params.push(`warehouseId=${warehouseId}`);
    if (params.length) url += '?' + params.join('&');
    return this.request<any[]>(url);
  }
  getWarehouseOperationsByWarehouse(bizId: number, warehouseId: number) {
    return this.request<any[]>(`/businesses/${bizId}/warehouses/${warehouseId}/operations`);
  }
  createWarehouseOperation(bizId: number, d: any) { return this.request<any>(`/businesses/${bizId}/warehouse-operations`, { method: 'POST', body: JSON.stringify(d) }); }
  getWarehouseOperation(id: number)               { return this.request<any>(`/warehouse-operations/${id}`); }
  getWarehouseInventory(bizId: number, warehouseId: number) {
    return this.request<any[]>(`/businesses/${bizId}/warehouses/${warehouseId}/inventory`);
  }

  // ===================== سير العمل (Workflow) =====================
  getVoucherTransitions(bizId: number, voucherId: number) {
    return this.request<any[]>(`/businesses/${bizId}/vouchers/${voucherId}/transitions`);
  }
  executeVoucherTransition(bizId: number, voucherId: number, transitionId: number, note?: string) {
    return this.request<any>(`/businesses/${bizId}/vouchers/${voucherId}/transition`, { method: 'POST', body: JSON.stringify({ transitionId, note }) });
  }
  getVoucherWorkflowHistory(bizId: number, voucherId: number) {
    return this.request<any[]>(`/businesses/${bizId}/vouchers/${voucherId}/workflow-history`);
  }
  setupDefaultWorkflow(bizId: number, opTypeId: number) {
    return this.request<any>(`/businesses/${bizId}/operation-types/${opTypeId}/setup-workflow`, { method: 'POST' });
  }
  getOperationTypeTransitions(bizId: number, opTypeId: number) {
    return this.request<any[]>(`/businesses/${bizId}/operation-types/${opTypeId}/transitions`);
  }
  addOperationTypeTransition(bizId: number, opTypeId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/operation-types/${opTypeId}/transitions`, { method: 'POST', body: JSON.stringify(d) });
  }
  deleteTransition(bizId: number, transitionId: number) {
    return this.request<any>(`/businesses/${bizId}/transitions/${transitionId}`, { method: 'DELETE' });
  }

  // ===================== بناء الواجهات الديناميكية (UI Builder) =====================
  getUiPages(bizId: number) {
    return this.request<any[]>(`/businesses/${bizId}/ui/pages`);
  }
  getUiPageByKey(bizId: number, pageKey: string) {
    return this.request<any>(`/businesses/${bizId}/ui/pages/key/${pageKey}`);
  }
  getUiPage(bizId: number, pageId: number) {
    return this.request<any>(`/businesses/${bizId}/ui/pages/${pageId}`);
  }
  createUiPage(bizId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/ui/pages`, { method: 'POST', body: JSON.stringify(d) });
  }
  updateUiPage(bizId: number, pageId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/ui/pages/${pageId}`, { method: 'PUT', body: JSON.stringify(d) });
  }
  deleteUiPage(bizId: number, pageId: number) {
    return this.request<any>(`/businesses/${bizId}/ui/pages/${pageId}`, { method: 'DELETE' });
  }
  addUiComponent(bizId: number, pageId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/ui/pages/${pageId}/components`, { method: 'POST', body: JSON.stringify(d) });
  }
  updateUiComponent(bizId: number, componentId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/ui/components/${componentId}`, { method: 'PUT', body: JSON.stringify(d) });
  }
  deleteUiComponent(bizId: number, componentId: number) {
    return this.request<any>(`/businesses/${bizId}/ui/components/${componentId}`, { method: 'DELETE' });
  }
  getUiDataSources(bizId: number) {
    return this.request<any[]>(`/businesses/${bizId}/ui/data-sources`);
  }
  createUiDataSource(bizId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/ui/data-sources`, { method: 'POST', body: JSON.stringify(d) });
  }
  updateUiDataSource(bizId: number, dsId: number, d: any) {
    return this.request<any>(`/businesses/${bizId}/ui/data-sources/${dsId}`, { method: 'PUT', body: JSON.stringify(d) });
  }
  deleteUiDataSource(bizId: number, dsId: number) {
    return this.request<any>(`/businesses/${bizId}/ui/data-sources/${dsId}`, { method: 'DELETE' });
  }
  executeUiDataSource(bizId: number, dsId: number, params?: any) {
    return this.request<any>(`/businesses/${bizId}/ui/data-sources/${dsId}/execute`, { method: 'POST', body: JSON.stringify(params || {}) });
  }

  // ===================== التقارير المتقدمة =====================
  getMonthlyRevenue(bizId: number, year?: number) {
    const q = year ? `?year=${year}` : '';
    return this.request<any>(`/businesses/${bizId}/reports/monthly-revenue${q}`);
  }
  getAggregatedProfitLoss(dateFrom?: string, dateTo?: string) {
    const params = new URLSearchParams();
    if (dateFrom) params.set('dateFrom', dateFrom);
    if (dateTo) params.set('dateTo', dateTo);
    const q = params.toString() ? `?${params}` : '';
    return this.request<any>(`/reports/aggregated-profit-loss${q}`);
  }
  getAggregatedSummary() {
    return this.request<any>(`/reports/aggregated-summary`);
  }

  // ===================== محرك المخزون - دوال جديدة =====================
  getStockLevels(bizId: number, warehouseId?: number) {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : '';
    return this.request<any>(`/businesses/${bizId}/stock-levels${q}`);
  }
  getStockAlerts(bizId: number) {
    return this.request<any>(`/businesses/${bizId}/stock-alerts`);
  }
  getStockValuation(bizId: number, warehouseId?: number) {
    const q = warehouseId ? `?warehouseId=${warehouseId}` : '';
    return this.request<any>(`/businesses/${bizId}/stock-valuation${q}`);
  }
  getItemMovements(bizId: number, itemId: number, limit?: number) {
    const q = limit ? `?limit=${limit}` : '';
    return this.request<any>(`/businesses/${bizId}/items/${itemId}/movements${q}`);
  }
  createStockMovement(bizId: number, data: any) {
    return this.request<any>(`/businesses/${bizId}/stock-movements`, { method: 'POST', body: JSON.stringify(data) });
  }

  // ===================== فحص الاتصال =====================
  async checkDbHealth(): Promise<{ status: string; message: string; latency?: string }> {
    try {
      const res = await fetch('/health/db');
      return await res.json();
    } catch {
      return { status: 'disconnected', message: 'فشل الاتصال بالخادم' };
    }
  }
}
