import { Injectable, signal } from '@angular/core';

export type BusinessType = 'stations' | 'single_station' | 'personal';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  currentBusinessId = signal<number | null>(null);
  currentBusinessName = signal<string>('');
  currentBusinessColor = signal<string>('#f59e0b');
  currentBusinessIcon = signal<string>('bolt');
  currentBusinessType = signal<BusinessType>('stations');

  setBusiness(id: number, name: string, color: string, icon: string, type: BusinessType = 'stations') {
    this.currentBusinessId.set(id);
    this.currentBusinessName.set(name);
    this.currentBusinessColor.set(color);
    this.currentBusinessIcon.set(icon);
    this.currentBusinessType.set(type);
    localStorage.setItem('hesabati_biz', JSON.stringify({ id, name, color, icon, type }));
  }

  loadFromStorage(): boolean {
    const saved = localStorage.getItem('hesabati_biz');
    if (saved) {
      const { id, name, color, icon, type } = JSON.parse(saved);
      this.currentBusinessId.set(id);
      this.currentBusinessName.set(name);
      this.currentBusinessColor.set(color);
      this.currentBusinessIcon.set(icon);
      this.currentBusinessType.set(type || 'stations');
      return true;
    }
    return false;
  }

  current() {
    return {
      id: this.currentBusinessId(),
      name: this.currentBusinessName(),
      color: this.currentBusinessColor(),
      icon: this.currentBusinessIcon(),
      type: this.currentBusinessType(),
    };
  }

  clear() {
    this.currentBusinessId.set(null);
    this.currentBusinessName.set('');
    this.currentBusinessType.set('stations');
    localStorage.removeItem('hesabati_biz');
  }
}
