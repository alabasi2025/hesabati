import { Injectable, inject } from '@angular/core';
import { BaseApiService, DashboardStats, Business } from './base-api.service';

/** خدمة الأعمال والمحطات والـ Dashboard */
@Injectable({ providedIn: 'root' })
export class BusinessApiService {
  private readonly api = inject(BaseApiService);

  // ===================== Dashboard =====================
  getDashboardStats() { return this.api.request<DashboardStats>('/dashboard/stats'); }

  // ===================== الأعمال =====================
  getBusinesses()               { return this.api.request<Business[]>('/businesses'); }
  getBusiness(id: number)       { return this.api.request<Business>(`/businesses/${id}`); }
  createBusiness(d: any)        { return this.api.request<Business>('/businesses', { method: 'POST', body: JSON.stringify(d) }); }
  updateBusiness(id: number, d: any) { return this.api.request<Business>(`/businesses/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteBusiness(id: number)     { return this.api.request<{ success: boolean; message: string }>(`/businesses/${id}`, { method: 'DELETE' }); }

  // ===================== المحطات =====================
  getStations(bizId: number)                   { return this.api.request<any[]>(`/businesses/${bizId}/stations`); }
  getStation(bizId: number, id: number)        { return this.api.request<any>(`/businesses/${bizId}/stations/${id}`); }
  createStation(bizId: number, d: any)         { return this.api.request<any>(`/businesses/${bizId}/stations`, { method: 'POST', body: JSON.stringify(d) }); }
  updateStation(id: number, d: any)            { return this.api.request<any>(`/stations/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  updateStationByBiz(bizId: number, id: number, d: any) { return this.api.request<any>(`/businesses/${bizId}/stations/${id}`, { method: 'PUT', body: JSON.stringify(d) }); }
  deleteStation(bizId: number, id: number)     { return this.api.request<any>(`/businesses/${bizId}/stations/${id}`, { method: 'DELETE' }); }

  // فحص الاتصال
  async checkDbHealth(): Promise<{ status: string; message: string; latency?: string }> {
    try {
      const res = await fetch('/health/db');
      return await res.json();
    } catch {
      return { status: 'disconnected', message: 'فشل الاتصال بالخادم' };
    }
  }
}
