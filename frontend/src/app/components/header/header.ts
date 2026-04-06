import { Component, inject, input, output, signal, OnInit, OnDestroy } from '@angular/core';
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
  private readonly auth = inject(AuthService);
  private readonly api = inject(ApiService);
  readonly themeService = inject(ThemeService);
  readonly biz = inject(BusinessService);

  // ─── Inputs ───
  isSidebarCollapsed = input<boolean>(false);

  // ─── Outputs ───
  toggleSidebar = output<void>();

  // ─── State ───
  user = this.auth.user;
  dbConnected = signal<boolean | null>(null);
  private healthCheckInterval: ReturnType<typeof setInterval> | null = null;

  async ngOnInit() {
    await this.checkDbHealth();
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

  onToggleSidebar() {
    this.toggleSidebar.emit();
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

  getUserInitials(): string {
    const name = this.user()?.fullName || 'م';
    return name.charAt(0);
  }
}
