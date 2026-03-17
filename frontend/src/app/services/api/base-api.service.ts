import { Injectable, inject } from '@angular/core';
import { AuthService } from '../auth.service';

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

/** الـ Service الأساسي - يحتوي على منطق HTTP المشترك */
@Injectable({ providedIn: 'root' })
export class BaseApiService {
  readonly API_URL = '/api';
  private readonly auth = inject(AuthService);

  protected getHeaders(): HeadersInit {
    const token = this.auth.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    };
  }

  async request<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.API_URL}${path}`, {
      ...options,
      headers: { ...this.getHeaders(), ...options?.headers },
    });
    const text = await res.text();
    if (!res.ok) {
      let err: { error?: string; details?: string; location?: string } = {};
      try {
        if (text?.trim()) err = JSON.parse(text);
      } catch {
        err = { error: this.getArabicHttpError(res.status) };
      }
      if (res.status === 401) {
        this.auth.logout();
        throw new Error('الجلسة منتهية - يرجى تسجيل الدخول مجدداً');
      }
      let errorMsg = err.error || this.getArabicHttpError(res.status);
      if (err.details) errorMsg += ` (التفاصيل: ${err.details})`;
      if (err.location) errorMsg += ` [الموقع: ${err.location}]`;
      const error: any = new Error(errorMsg);
      error.status = res.status;
      error.details = err.details;
      error.location = err.location;
      error.originalError = err;
      throw error;
    }
    if (!text?.trim()) return undefined as T;
    try {
      return JSON.parse(text) as T;
    } catch {
      return undefined as T;
    }
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
}
