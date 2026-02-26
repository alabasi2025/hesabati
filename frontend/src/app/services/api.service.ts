import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

export interface DashboardStats {
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

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly API_URL = 'http://localhost:3000/api';
  private auth = inject(AuthService);

  private getHeaders(): HeadersInit {
    const token = this.auth.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await fetch(`${this.API_URL}/dashboard/stats`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب الإحصائيات');
    return response.json();
  }

  async getStations(): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/dashboard/stations`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب المحطات');
    return response.json();
  }

  async getEmployees(): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/dashboard/employees`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب الموظفين');
    return response.json();
  }

  async getAccounts(): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/dashboard/accounts`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب الحسابات');
    return response.json();
  }

  async getFunds(): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/dashboard/funds`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب الصناديق');
    return response.json();
  }

  async getSuppliers(): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/dashboard/suppliers`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب الموردين');
    return response.json();
  }

  async getPartners(): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/dashboard/partners`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب الشركاء');
    return response.json();
  }

  async getPendingAccounts(): Promise<any[]> {
    const response = await fetch(`${this.API_URL}/dashboard/pending-accounts`, {
      headers: this.getHeaders(),
    });
    if (!response.ok) throw new Error('فشل جلب الحسابات المعلقة');
    return response.json();
  }
}
