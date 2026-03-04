import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { BusinessService } from '../../services/business.service';
import { Subscription, filter } from 'rxjs';

interface BreadcrumbItem {
  label: string;
  icon: string;
  url: string;
  isActive: boolean;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumbs" *ngIf="items.length > 0">
      @for (item of items; track item.url; let last = $last) {
        @if (item.isActive) {
          <span class="bc-item active">
            <span class="material-icons-round bc-icon">{{ item.icon }}</span>
            <span class="bc-label">{{ item.label }}</span>
          </span>
        } @else {
          <a class="bc-item" [routerLink]="item.url">
            <span class="material-icons-round bc-icon">{{ item.icon }}</span>
            <span class="bc-label">{{ item.label }}</span>
          </a>
        }
        @if (!last) {
          <span class="material-icons-round bc-separator">chevron_left</span>
        }
      }
    </nav>
  `,
  styles: [`
    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 8px 16px;
      margin-bottom: 8px;
      direction: rtl;
      flex-wrap: wrap;
    }
    .bc-item {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s;
      color: var(--text-muted, #94a3b8);
    }
    .bc-item:not(.active):hover {
      background: rgba(16,185,129,0.08);
      color: #10b981;
    }
    .bc-item.active {
      color: var(--text-primary, #1e293b);
      background: rgba(16,185,129,0.06);
      font-weight: 800;
    }
    .bc-icon { font-size: 15px; }
    .bc-separator {
      font-size: 14px;
      color: var(--text-muted, #cbd5e1);
    }
  `]
})
export class BreadcrumbsComponent implements OnDestroy {
  private router = inject(Router);
  biz = inject(BusinessService);
  items: BreadcrumbItem[] = [];
  private sub: Subscription;

  private routeMap: Record<string, { label: string; icon: string }> = {
    '': { label: 'لوحة التحكم', icon: 'dashboard' },
    'stations': { label: 'المحطات', icon: 'bolt' },
    'accounts': { label: 'الحسابات المركزية', icon: 'account_balance' },
    'employees': { label: 'الموظفين', icon: 'people' },
    'funds': { label: 'الصناديق', icon: 'savings' },
    'vouchers': { label: 'السندات', icon: 'receipt_long' },
    'journal': { label: 'قيود اليومية', icon: 'menu_book' },
    'operation-types': { label: 'أنواع العمليات', icon: 'category' },
    'collections': { label: 'التحصيل', icon: 'point_of_sale' },
    'billing-systems': { label: 'أنظمة الفوترة', icon: 'receipt' },
    'sidebar-settings': { label: 'إعدادات القائمة', icon: 'tune' },
    'summary': { label: 'ملخص الأعمال', icon: 'summarize' },
    'reports': { label: 'التقارير', icon: 'assessment' },
    'reports-advanced': { label: 'التقارير المتقدمة', icon: 'analytics' },
    'banks': { label: 'البنوك', icon: 'account_balance' },
    'exchangers': { label: 'الصرافين', icon: 'currency_exchange' },
    'wallets': { label: 'المحافظ الإلكترونية', icon: 'account_balance_wallet' },
    'partners': { label: 'الشركاء', icon: 'handshake' },
    'warehouse': { label: 'المخازن', icon: 'warehouse' },
    'warehouse-operations': { label: 'العمليات المخزنية', icon: 'inventory' },
    'suppliers': { label: 'الموردين', icon: 'local_shipping' },
    'settlements': { label: 'التصفيات', icon: 'gavel' },
    'pending': { label: 'الحسابات المعلقة', icon: 'pending_actions' },
    'custom-screens': { label: 'الشاشات المخصصة', icon: 'dashboard_customize' },
    'ui-builder': { label: 'بناء الواجهات', icon: 'widgets' },
    'exchange-rates': { label: 'أسعار الصرف', icon: 'trending_up' },
    'roles': { label: 'الأدوار والصلاحيات', icon: 'admin_panel_settings' },
    'journal-categories': { label: 'تصنيفات القيود', icon: 'label' },
    'expense-categories': { label: 'تصنيفات المصروفات', icon: 'category' },
    'expense-budget': { label: 'ميزانية المصروفات', icon: 'account_balance_wallet' },
    'salaries': { label: 'الرواتب', icon: 'payments' },
  };

  constructor() {
    this.sub = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(() => this.buildBreadcrumbs());
    // Build initial breadcrumbs
    this.buildBreadcrumbs();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  private buildBreadcrumbs() {
    const url = this.router.url;
    const parts = url.split('/').filter(Boolean);
    this.items = [];

    // Check if we're in a business context: /biz/:bizId/...
    if (parts[0] === 'biz' && parts[1]) {
      const bizId = parts[1];
      const bizName = this.biz.currentBusinessName() || 'العمل';
      const bizIcon = this.biz.currentBusinessIcon() || 'business';

      // Add home
      this.items.push({
        label: 'الرئيسية',
        icon: 'home',
        url: '/businesses',
        isActive: false,
      });

      // Add business
      this.items.push({
        label: bizName,
        icon: bizIcon,
        url: `/biz/${bizId}`,
        isActive: parts.length <= 2,
      });

      // Add current page
      if (parts.length > 2) {
        const pageKey = parts[2];
        const pageInfo = this.routeMap[pageKey] || { label: pageKey, icon: 'article' };
        this.items.push({
          label: pageInfo.label,
          icon: pageInfo.icon,
          url: `/biz/${bizId}/${pageKey}`,
          isActive: true,
        });
      }
    }
  }
}
