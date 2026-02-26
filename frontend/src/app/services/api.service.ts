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

  // ===================== المحطات (حسب العمل) =====================
  getStations(bizId: number)                   { return this.request<any[]>(`/businesses/${bizId}/stations`); }
  getStation(bizId: number, id: number)        { return this.request<any>(`/businesses/${bizId}/stations/${id}`); }
  updateStation(id: number, d: any)            { return this.request<any>(`/stations/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }

  // ===================== الموظفين (حسب العمل) =====================
  getEmployees(bizId: number)                    { return this.request<any[]>(`/businesses/${bizId}/employees`); }
  createEmployee(bizId: number, d: any)          { return this.request<any>(`/businesses/${bizId}/employees`, { method: 'POST', body: JSON.stringify(d) }); }
  updateEmployee(id: number, d: any)             { return this.request<any>(`/employees/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteEmployee(id: number)                     { return this.request<any>(`/employees/${id}`, { method: 'DELETE' }); }

  // ===================== الحسابات (حسب العمل) =====================
  getAccounts(bizId: number)                     { return this.request<any[]>(`/businesses/${bizId}/accounts`); }
  createAccount(bizId: number, d: any)           { return this.request<any>(`/businesses/${bizId}/accounts`, { method: 'POST', body: JSON.stringify(d) }); }
  updateAccount(id: number, d: any)              { return this.request<any>(`/accounts/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteAccount(id: number)                      { return this.request<any>(`/accounts/${id}`, { method: 'DELETE' }); }

  // ===================== الصناديق (حسب العمل) =====================
  getFunds(bizId: number)                        { return this.request<any[]>(`/businesses/${bizId}/funds`); }
  createFund(bizId: number, d: any)              { return this.request<any>(`/businesses/${bizId}/funds`, { method: 'POST', body: JSON.stringify(d) }); }
  updateFund(id: number, d: any)                 { return this.request<any>(`/funds/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }

  // ===================== السندات (حسب العمل) =====================
  getVouchers(bizId: number, type?: string)      { return this.request<any[]>(`/businesses/${bizId}/vouchers${type ? '?type=' + type : ''}`); }
  createVoucher(bizId: number, d: any)           { return this.request<any>(`/businesses/${bizId}/vouchers`, { method: 'POST', body: JSON.stringify(d) }); }
  deleteVoucher(id: number)                      { return this.request<any>(`/vouchers/${id}`, { method: 'DELETE' }); }

  // ===================== الموردين (حسب العمل) =====================
  getSuppliers(bizId: number)                    { return this.request<any[]>(`/businesses/${bizId}/suppliers`); }
  createSupplier(bizId: number, d: any)          { return this.request<any>(`/businesses/${bizId}/suppliers`, { method: 'POST', body: JSON.stringify(d) }); }

  // ===================== المخازن (حسب العمل) =====================
  getWarehouses(bizId: number)                   { return this.request<any[]>(`/businesses/${bizId}/warehouses`); }

  // ===================== الحسابات المعلقة (حسب العمل) =====================
  getPendingAccounts(bizId: number)              { return this.request<any[]>(`/businesses/${bizId}/pending-accounts`); }

  // ===================== تصنيفات السندات (حسب العمل) =====================
  getVoucherCategories(bizId: number)            { return this.request<any[]>(`/businesses/${bizId}/voucher-categories`); }

  // ===================== العملات (عامة) =====================
  getCurrencies() { return this.request<any[]>('/currencies'); }
}
