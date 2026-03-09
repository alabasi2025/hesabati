import { Injectable, signal, computed } from '@angular/core';

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = '/api/auth';
  
  private currentUser = signal<User | null>(null);
  private token = signal<string | null>(null);

  isLoggedIn = computed(() => !!this.token());
  user = computed(() => this.currentUser());

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const savedToken = localStorage.getItem('hesabati_token');
    const savedUser = localStorage.getItem('hesabati_user');
    if (savedToken && savedUser) {
      this.token.set(savedToken);
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  private async parseJsonOrThrow<T>(response: Response, fallbackError: string): Promise<T> {
    const text = await response.text();
    if (!text?.trim()) {
      throw new Error(response.ok ? 'استجابة فارغة من الخادم' : fallbackError);
    }
    try {
      return JSON.parse(text) as T;
    } catch {
      throw new Error(fallbackError);
    }
  }

  async login(username: string, password: string): Promise<LoginResponse> {
    let response: Response;
    try {
      response = await fetch(`${this.API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
    } catch (e) {
      throw new Error('تعذر الاتصال بالخادم - تأكد من تشغيل الخادم الخلفي (المنفذ 3000)');
    }

    const data = await this.parseJsonOrThrow<LoginResponse | { error?: string }>(
      response,
      'حدث خطأ في تسجيل الدخول'
    );

    if (!response.ok) {
      const err = data as { error?: string };
      throw new Error(err?.error || 'فشل تسجيل الدخول');
    }

    const loginData = data as LoginResponse;
    this.token.set(loginData.token);
    this.currentUser.set(loginData.user);
    localStorage.setItem('hesabati_token', loginData.token);
    localStorage.setItem('hesabati_user', JSON.stringify(loginData.user));
    return loginData;
  }

  async register(username: string, password: string, fullName: string, role?: string): Promise<{ user: User }> {
    let response: Response;
    try {
      response = await fetch(`${this.API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, fullName, role: role || 'viewer' }),
      });
    } catch (e) {
      throw new Error('تعذر الاتصال بالخادم - تأكد من تشغيل الخادم الخلفي (المنفذ 3000)');
    }

    const data = await this.parseJsonOrThrow<{ user: User } | { error?: string }>(
      response,
      'حدث خطأ في التسجيل'
    );

    if (!response.ok) {
      const err = data as { error?: string };
      throw new Error(err?.error || 'فشل إنشاء الحساب');
    }

    return data as { user: User };
  }

  logout() {
    this.token.set(null);
    this.currentUser.set(null);
    localStorage.removeItem('hesabati_token');
    localStorage.removeItem('hesabati_user');
    // إعادة التوجيه إلى صفحة تسجيل الدخول
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  getToken(): string | null {
    return this.token();
  }

  getUserName(): string {
    return this.currentUser()?.fullName || 'المالك';
  }
}
