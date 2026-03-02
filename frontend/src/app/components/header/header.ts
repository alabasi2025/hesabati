import { Component, inject, input, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { BusinessService } from '../../services/business.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private auth = inject(AuthService);
  private api = inject(ApiService);
  themeService = inject(ThemeService);
  biz = inject(BusinessService);

  pageTitle = input<string>('لوحة التحكم');
  user = this.auth.user;

  // مؤشر حالة الاتصال بقاعدة البيانات
  dbConnected = signal<boolean | null>(null); // null = جاري الفحص
  private healthCheckInterval: any = null;

  async ngOnInit() {
    await this.checkDbHealth();
    // فحص كل 30 ثانية
    this.healthCheckInterval = setInterval(() => this.checkDbHealth(), 30000);
  }

  ngOnDestroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval);
    }
  }

  async checkDbHealth() {
    try {
      const result = await this.api.checkDbHealth();
      this.dbConnected.set(result?.status === 'connected');
    } catch {
      this.dbConnected.set(false);
    }
  }

  getDbStatusIcon(): string {
    const status = this.dbConnected();
    if (status === null) return 'sync';
    return status ? 'cloud_done' : 'cloud_off';
  }

  getDbStatusColor(): string {
    const status = this.dbConnected();
    if (status === null) return '#f59e0b';
    return status ? '#22c55e' : '#ef4444';
  }

  getDbStatusTitle(): string {
    const status = this.dbConnected();
    if (status === null) return 'جاري فحص الاتصال...';
    return status ? 'متصل بقاعدة البيانات' : 'غير متصل بقاعدة البيانات';
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString('ar-YE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
