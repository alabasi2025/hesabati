import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'hesabati_theme';

  theme = signal<Theme>(this.loadTheme());

  constructor() {
    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  private loadTheme(): Theme {
    const saved = localStorage.getItem(this.STORAGE_KEY) as Theme | null;
    return saved === 'dark' ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme) {
    const html = document.documentElement;

    // النمط القديم: data-theme (للتوافق مع الكود الحالي)
    html.setAttribute('data-theme', theme);

    // النمط الجديد: class dark (متوافق مع Valex Tailwind)
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }

    localStorage.setItem(this.STORAGE_KEY, theme);
  }

  toggle() {
    this.theme.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  isDark() {
    return this.theme() === 'dark';
  }
}
