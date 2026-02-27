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
  updateFund(id: number, d: any)                 { return this.request<any>(`/funds/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }

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

  // ===================== الموردين =====================
  getSuppliers(bizId: number)                    { return this.request<any[]>(`/businesses/${bizId}/suppliers`); }
  createSupplier(bizId: number, d: any)          { return this.request<any>(`/businesses/${bizId}/suppliers`, { method: 'POST', body: JSON.stringify(d) }); }

  // ===================== المخازن =====================
  getWarehouses(bizId: number)                   { return this.request<any[]>(`/businesses/${bizId}/warehouses`); }

  // ===================== الحسابات المعلقة =====================
  getPendingAccounts(bizId: number)              { return this.request<any[]>(`/businesses/${bizId}/pending-accounts`); }

  // ===================== تصنيفات السندات =====================
  getVoucherCategories(bizId: number)            { return this.request<any[]>(`/businesses/${bizId}/voucher-categories`); }

  // ===================== أنواع العمليات (القوالب) =====================
  getOperationTypes(bizId: number, category?: string) {
    let url = `/businesses/${bizId}/operation-types`;
    if (category) url += `?category=${category}`;
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

  // ===================== العملات =====================
  getCurrencies() { return this.request<any[]>('/currencies'); }

  // ===================== المرفقات =====================
  getAttachments(entityType: string, entityId: number) { return this.request<any[]>(`/attachments/${entityType}/${entityId}`); }
}
