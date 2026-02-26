import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BusinessService {
  currentBusinessId = signal<number | null>(null);
  currentBusinessName = signal<string>('');
  currentBusinessColor = signal<string>('#f59e0b');
  currentBusinessIcon = signal<string>('bolt');

  setBusiness(id: number, name: string, color: string, icon: string) {
    this.currentBusinessId.set(id);
    this.currentBusinessName.set(name);
    this.currentBusinessColor.set(color);
    this.currentBusinessIcon.set(icon);
    localStorage.setItem('hesabati_biz', JSON.stringify({ id, name, color, icon }));
  }

  loadFromStorage(): boolean {
    const saved = localStorage.getItem('hesabati_biz');
    if (saved) {
      const { id, name, color, icon } = JSON.parse(saved);
      this.currentBusinessId.set(id);
      this.currentBusinessName.set(name);
      this.currentBusinessColor.set(color);
      this.currentBusinessIcon.set(icon);
      return true;
    }
    return false;
  }

  clear() {
    this.currentBusinessId.set(null);
    this.currentBusinessName.set('');
    localStorage.removeItem('hesabati_biz');
  }
}
