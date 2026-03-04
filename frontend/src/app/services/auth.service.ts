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

  async login(username: string, password: string): Promise<LoginResponse> {
    const response = await fetch(`${this.API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل تسجيل الدخول');
    }

    const data: LoginResponse = await response.json();
    this.token.set(data.token);
    this.currentUser.set(data.user);
    localStorage.setItem('hesabati_token', data.token);
    localStorage.setItem('hesabati_user', JSON.stringify(data.user));
    return data;
  }

  async register(username: string, password: string, fullName: string, role?: string): Promise<{ user: User }> {
    const response = await fetch(`${this.API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, fullName, role: role || 'viewer' }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'فشل إنشاء الحساب');
    }

    return response.json();
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
