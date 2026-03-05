import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, Business } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';
import { BusinessService, BusinessType } from '../../services/business.service';

@Component({
  selector: 'app-business-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-select.html',
  styleUrl: './business-select.scss',
})
export class BusinessSelectComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly auth = inject(AuthService);
  private readonly bizService = inject(BusinessService);
  readonly theme = inject(ThemeService);

  businesses = signal<Business[]>([]);
  loading = signal(true);
  loadError = signal('');
  noAccessMessage = signal('');
  userName = signal('');

  ngOnInit() {
    this.userName.set(this.auth.getUserName() || 'المالك');
    this.noAccessMessage.set(this.route.snapshot.queryParamMap.get('error') === 'no_access'
      ? 'ليس لديك صلاحية على العمل المحدد. يرجى اختيار عمل آخر أو التواصل مع المسؤول.'
      : '');
    this.loadBusinesses();
  }

  async loadBusinesses() {
    this.loadError.set('');
    if (!this.auth.getToken()) {
      this.loading.set(false);
      this.loadError.set('لم يتم تسجيل الدخول. جاري التوجيه...');
      setTimeout(() => this.auth.logout(), 800);
      return;
    }
    try {
      const data = await this.api.getBusinesses();
      this.businesses.set(Array.isArray(data) ? data : []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'فشل تحميل قائمة الأعمال';
      this.loadError.set(msg);
      this.businesses.set([]);
    } finally {
      this.loading.set(false);
    }
  }

  enterBusiness(biz: Business) {
    const type: BusinessType = (biz.type as BusinessType) || 'stations';
    this.bizService.setBusiness(biz.id, biz.name, biz.color, biz.icon, type);
    this.router.navigate(['/biz', biz.id]);
  }

  toggleTheme() {
    this.theme.toggle();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  }
}
