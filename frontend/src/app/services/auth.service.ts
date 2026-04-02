import { Injectable, signal, computed, OnDestroy } from '@angular/core';

export interface User {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

export interface LoginResponse {
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
  private readonly API_URL = '/api/auth';

  private currentUser = signal<User | null>(null);

  isLoggedIn = computed(() => !!this.currentUser());
  user = computed(() => this.currentUser());

  private refreshTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    this.loadFromStorage();
    this.startRefreshTimer();
  }

  ngOnDestroy() {
    this.stopRefreshTimer();
  }

  private loadFromStorage() {
    const savedUser = localStorage.getItem('hesabati_user');
    if (savedUser) {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('hesabati_user');
      }
    }
  }

  private startRefreshTimer() {
    this.stopRefreshTimer();
    // تجديد الـ access token كل 12 دقيقة (قبل انتهاء الـ 15 دقيقة)
    this.refreshTimer = setInterval(
      () => {
        if (this.currentUser()) {
          this.refreshSession().catch(() => {});
        }
      },
      12 * 60 * 1000,
    );
  }

  private stopRefreshTimer() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
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
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
    } catch (e) {
      throw new Error('تعذر الاتصال بالخادم - تأكد من تشغيل الخادم الخلفي (المنفذ 3000)');
    }

    const data = await this.parseJsonOrThrow<LoginResponse | { error?: string }>(
      response,
      'حدث خطأ في تسجيل الدخول',
    );

    if (!response.ok) {
      const err = data as { error?: string };
      throw new Error(err?.error || 'فشل تسجيل الدخول');
    }

    const loginData = data as LoginResponse;
    this.currentUser.set(loginData.user);
    localStorage.setItem('hesabati_user', JSON.stringify(loginData.user));
    this.startRefreshTimer();
    return loginData;
  }

  async register(
    username: string,
    password: string,
    fullName: string,
    role?: string,
  ): Promise<{ user: User }> {
    let response: Response;
    try {
      response = await fetch(`${this.API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, fullName, role: role || 'viewer' }),
      });
    } catch (e) {
      throw new Error('تعذر الاتصال بالخادم - تأكد من تشغيل الخادم الخلفي (المنفذ 3000)');
    }

    const data = await this.parseJsonOrThrow<{ user: User } | { error?: string }>(
      response,
      'حدث خطأ في التسجيل',
    );

    if (!response.ok) {
      const err = data as { error?: string };
      throw new Error(err?.error || 'فشل إنشاء الحساب');
    }

    return data as { user: User };
  }

  async refreshSession(): Promise<void> {
    try {
      const response = await fetch(`${this.API_URL}/refresh`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) {
        this.handleSessionExpired();
        return;
      }
      const data = await response.json();
      if (data.user) {
        this.currentUser.set(data.user);
        localStorage.setItem('hesabati_user', JSON.stringify(data.user));
      }
    } catch {
      // صمت — سيعاد المحاولة في الدورة التالية
    }
  }

  logout() {
    this.stopRefreshTimer();
    fetch(`${this.API_URL}/logout`, { method: 'POST', credentials: 'include' }).catch(() => {});
    this.currentUser.set(null);
    localStorage.removeItem('hesabati_user');
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
      window.location.href = '/login';
    }
  }

  private handleSessionExpired() {
    this.stopRefreshTimer();
    this.currentUser.set(null);
    localStorage.removeItem('hesabati_user');
  }

  /** @deprecated Token is now in httpOnly cookie — use credentials: 'include' */
  getToken(): string | null {
    return null;
  }

  getUserName(): string {
    return this.currentUser()?.fullName || 'المالك';
  }
}
