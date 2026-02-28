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
      throw new Error(err.error || `خطأ ${res.status}`);
    }
    return res.json();
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
  getWidgetAccounts(widgetId: number)                   { return this.request<any[]>(`/widgets/${widgetId}/accounts`); }
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

  // ===================== العملات =====================
  getCurrencies() { return this.request<any[]>('/currencies'); }

  // ===================== المرفقات =====================
  getAttachments(entityType: string, entityId: number) { return this.request<any[]>(`/attachments/${entityType}/${entityId}`); }
}
