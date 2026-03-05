import { Component, signal, inject, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { BusinessService, BusinessType } from '../../services/business.service';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  badge?: number;
  badgeColor?: string;
  screenKey?: string;
  itemId?: number;
  children?: MenuItem[];
}

interface MenuSection {
  title: string;
  sectionId?: number;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[style.display]': '"flex"',
    '[style.flex-shrink]': '"0"',
  }
})
export class SidebarComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  biz = inject(BusinessService);

  isCollapsed = signal(false);
  expandedItems = signal<Set<string>>(new Set());
  menuSections = signal<MenuSection[]>([]);
  isLoading = signal(false);

  user = this.auth.user;

  constructor() {
    effect(() => {
      const bizId = this.biz.currentBusinessId();
      const bizType = this.biz.currentBusinessType();
      if (bizId) {
        this.loadSidebarFromDB(bizId, bizType);
      }
    });
  }

  private async loadSidebarFromDB(bizId: number, type: BusinessType) {
    const userId = this.auth.user()?.id;
    if (!userId) {
      // Fallback to hardcoded if no user
      this.buildFallbackMenu(bizId, type);
      return;
    }

    try {
      this.isLoading.set(true);
      const configs = await this.api.getUserSidebar(bizId, userId);

      if (!configs || configs.length === 0) {
        // No config found, use fallback
        this.buildFallbackMenu(bizId, type);
        return;
      }

      // Group by section, only show visible items
      const visibleConfigs = configs.filter((c: any) => c.isVisible);
      const sectionMap = new Map<number, MenuSection>();

      for (const cfg of visibleConfigs) {
        const secId = cfg.sectionId;
        const route = cfg.route;
        if (route == null || route === '') continue; // تجاهل عناصر بدون مسار
        if (!sectionMap.has(secId)) {
          sectionMap.set(secId, {
            title: cfg.customSectionName || cfg.sectionName || 'قسم',
            sectionId: secId,
            items: [],
          });
        }
        const section = sectionMap.get(secId)!;
        const resolvedRoute = String(route).replaceAll('{bizId}', String(bizId));
        section.items.push({
          icon: cfg.icon || 'circle',
          label: cfg.label || 'عنصر',
          route: resolvedRoute,
          badge: cfg.badge || undefined,
          badgeColor: cfg.badgeColor || undefined,
          screenKey: cfg.screenKey,
          itemId: cfg.itemId,
        });
      }

      // Sort sections by sectionSortOrder (from first item in each section)
      const sectionOrder = new Map<number, number>();
      for (const cfg of visibleConfigs) {
        if (!sectionOrder.has(cfg.sectionId)) {
          sectionOrder.set(cfg.sectionId, cfg.sectionSortOrder);
        }
      }

      const sections = Array.from(sectionMap.values()).sort((a, b) => {
        const orderA = sectionOrder.get(a.sectionId!) || 0;
        const orderB = sectionOrder.get(b.sectionId!) || 0;
        return orderA - orderB;
      });

      // Sort items within each section by customSortOrder
      for (const section of sections) {
        const itemOrders = new Map<number, number>();
        for (const cfg of visibleConfigs) {
          if (cfg.sectionId === section.sectionId) {
            itemOrders.set(cfg.itemId, cfg.customSortOrder || 0);
          }
        }
        section.items.sort((a, b) => {
          const orderA = itemOrders.get(a.itemId!) || 0;
          const orderB = itemOrders.get(b.itemId!) || 0;
          return orderA - orderB;
        });
      }

      this.menuSections.set(sections);
    } catch (err: unknown) {
      console.error('Error loading sidebar config:', err);
      this.buildFallbackMenu(bizId, type);
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * استخراج الـ path والـ query params من الـ route string
   * مثال: /biz/1/custom-screens?screen=3 -> { path: '/biz/1/custom-screens', queryParams: { screen: '3' } }
   */
  parseRoute(route: string): { path: string; queryParams: Record<string, string> } {
    if (!route) return { path: '/', queryParams: {} };
    const [path, queryString] = route.split('?');
    const queryParams: Record<string, string> = {};
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
      });
    }
    return { path, queryParams };
  }

  /**
   * التحقق إذا كان الـ route يحتوي على query params
   */
  hasQueryParams(route: string | undefined): boolean {
    return !!(route?.includes('?'));
  }

  /**
   * الحصول على الـ path فقط بدون query params (لـ routerLink)
   */
  getRoutePath(route: string | undefined): string {
    if (!route) return '/';
    return route.split('?')[0];
  }

  /**
   * الحصول على الـ query params كـ object (لـ [queryParams])
   */
  getQueryParams(route: string | undefined): Record<string, string> {
    if (!route?.includes('?')) return {};
    const { queryParams } = this.parseRoute(route);
    return queryParams;
  }

  /**
   * التنقل لعنصر القائمة مع دعم query params
   */
  navigateTo(item: MenuItem): void {
    if (!item.route) return;
    const { path, queryParams } = this.parseRoute(item.route);
    if (Object.keys(queryParams).length > 0) {
      this.router.navigate([path], { queryParams });
    } else {
      this.router.navigate([path]);
    }
  }

  /**
   * التحقق من أن العنصر نشط (للـ routerLinkActive البديل)
   */
  isItemActive(route: string | undefined): boolean {
    if (!route) return false;
    const { path, queryParams } = this.parseRoute(route);
    const currentUrl = this.router.url;
    const [currentPath, currentQuery] = currentUrl.split('?');
    if (currentPath !== path) return false;
    if (Object.keys(queryParams).length === 0) return true;
    // التحقق من الـ query params
    const currentParams: Record<string, string> = {};
    if (currentQuery) {
      currentQuery.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        if (key) currentParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
      });
    }
    return Object.entries(queryParams).every(([k, v]) => currentParams[k] === v);
  }

  private buildFallbackMenu(bizId: number, type: BusinessType) {
    const b = `/biz/${bizId}`;

    // أقسام التبويب حسب الوحدات الـ13 (MODULES.md) — نفس ترتيب seed
    const sectionsStations: MenuSection[] = [
      { title: '1. المستخدمون والصلاحيات', items: [
        { icon: 'admin_panel_settings', label: 'الصلاحيات والأدوار', route: `${b}/roles` },
        { icon: 'tune', label: 'إعدادات التبويب', route: `${b}/sidebar-settings` },
      ]},
      { title: '2. الرئيسية والأعمال', items: [
        { icon: 'dashboard', label: 'لوحة التحكم', route: b },
        { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
        { icon: 'bolt', label: 'المحطات', route: `${b}/stations` },
        { icon: 'groups', label: 'الموظفين', route: `${b}/employees` },
        { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
      ]},
      { title: '3. الحسابات والأرصدة', items: [
        { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
        { icon: 'savings', label: 'الصناديق', route: `${b}/funds` },
        { icon: 'account_balance', label: 'البنوك', route: `${b}/banks` },
        { icon: 'currency_exchange', label: 'الصرافين', route: `${b}/exchangers` },
        { icon: 'wallet', label: 'المحافظ الإلكترونية', route: `${b}/wallets` },
      ]},
      { title: '4. العمليات المالية', items: [
        { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
        { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
        { icon: 'label', label: 'تصنيفات القيود', route: `${b}/journal-categories` },
      ]},
      { title: '5. القوالب والترقيم', items: [
        { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
      ]},
      { title: '6. المخزون والمخازن', items: [
        { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
        { icon: 'inventory_2', label: 'العمليات المخزنية', route: `${b}/warehouse-operations` },
      ]},
      { title: '7. الموردين', items: [
        { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
      ]},
      { title: '8. التحصيل والفوترة', items: [
        { icon: 'receipt_long', label: 'التحصيل والتوريد', route: `${b}/collections` },
        { icon: 'receipt', label: 'أنظمة الفوترة', route: `${b}/billing-systems` },
      ]},
      { title: '9. التقارير', items: [
        { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
        { icon: 'analytics', label: 'التقارير المتقدمة', route: `${b}/reports-advanced` },
      ]},
      { title: '10. بناء الواجهات', items: [
        { icon: 'space_dashboard', label: 'الشاشات المخصصة', route: `${b}/custom-screens` },
        { icon: 'dashboard_customize', label: 'بناء الواجهات', route: `${b}/ui-builder` },
      ]},
      { title: '11. العملات وأسعار الصرف', items: [
        { icon: 'currency_exchange', label: 'أسعار الصرف', route: `${b}/exchange-rates` },
      ]},
      { title: '12. المعلقات والتصفيات', items: [
        { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
        { icon: 'warning', label: 'حسابات معلقة', route: `${b}/pending`, badge: 3, badgeColor: 'red' },
      ]},
      { title: '13. الرواتب والميزانية', items: [
        { icon: 'category', label: 'تصنيفات المصروفات', route: `${b}/expense-categories` },
        { icon: 'account_balance_wallet', label: 'ميزانية المصروفات', route: `${b}/expense-budget` },
        { icon: 'payments', label: 'الرواتب', route: `${b}/salaries` },
      ]},
    ];

    const sectionsSingleStation: MenuSection[] = [
      { title: '1. المستخدمون والصلاحيات', items: [
        { icon: 'admin_panel_settings', label: 'الصلاحيات والأدوار', route: `${b}/roles` },
        { icon: 'tune', label: 'إعدادات التبويب', route: `${b}/sidebar-settings` },
      ]},
      { title: '2. الرئيسية والأعمال', items: [
        { icon: 'dashboard', label: 'لوحة التحكم', route: b },
        { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
        { icon: 'groups', label: 'الموظفين', route: `${b}/employees` },
        { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
      ]},
      { title: '3. الحسابات والأرصدة', items: [
        { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
        { icon: 'savings', label: 'الصناديق', route: `${b}/funds` },
        { icon: 'account_balance', label: 'البنوك', route: `${b}/banks` },
        { icon: 'currency_exchange', label: 'الصرافين', route: `${b}/exchangers` },
        { icon: 'wallet', label: 'المحافظ الإلكترونية', route: `${b}/wallets` },
      ]},
      { title: '4. العمليات المالية', items: [
        { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
        { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
        { icon: 'label', label: 'تصنيفات القيود', route: `${b}/journal-categories` },
      ]},
      { title: '5. القوالب والترقيم', items: [
        { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
      ]},
      { title: '6. المخزون والمخازن', items: [
        { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
        { icon: 'inventory_2', label: 'العمليات المخزنية', route: `${b}/warehouse-operations` },
      ]},
      { title: '7. الموردين', items: [
        { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
      ]},
      { title: '9. التقارير', items: [
        { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
        { icon: 'analytics', label: 'التقارير المتقدمة', route: `${b}/reports-advanced` },
      ]},
      { title: '10. بناء الواجهات', items: [
        { icon: 'space_dashboard', label: 'الشاشات المخصصة', route: `${b}/custom-screens` },
        { icon: 'dashboard_customize', label: 'بناء الواجهات', route: `${b}/ui-builder` },
      ]},
      { title: '11. العملات وأسعار الصرف', items: [
        { icon: 'currency_exchange', label: 'أسعار الصرف', route: `${b}/exchange-rates` },
      ]},
      { title: '12. المعلقات والتصفيات', items: [
        { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
      ]},
      { title: '13. الرواتب والميزانية', items: [
        { icon: 'category', label: 'تصنيفات المصروفات', route: `${b}/expense-categories` },
        { icon: 'account_balance_wallet', label: 'ميزانية المصروفات', route: `${b}/expense-budget` },
        { icon: 'payments', label: 'الرواتب', route: `${b}/salaries` },
      ]},
    ];

    const sectionsPersonal: MenuSection[] = [
      { title: '1. المستخدمون والصلاحيات', items: [
        { icon: 'admin_panel_settings', label: 'الصلاحيات والأدوار', route: `${b}/roles` },
        { icon: 'tune', label: 'إعدادات التبويب', route: `${b}/sidebar-settings` },
      ]},
      { title: '2. الرئيسية والأعمال', items: [
        { icon: 'dashboard', label: 'لوحة التحكم', route: b },
        { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
        { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
        { icon: 'summarize', label: 'ملخص الأعمال', route: `${b}/summary` },
      ]},
      { title: '3. الحسابات والأرصدة', items: [
        { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
      ]},
      { title: '4. العمليات المالية', items: [
        { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
        { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
        { icon: 'label', label: 'تصنيفات القيود', route: `${b}/journal-categories` },
      ]},
      { title: '5. القوالب والترقيم', items: [
        { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
      ]},
      { title: '9. التقارير', items: [
        { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
        { icon: 'analytics', label: 'التقارير المتقدمة', route: `${b}/reports-advanced` },
      ]},
      { title: '10. بناء الواجهات', items: [
        { icon: 'space_dashboard', label: 'الشاشات المخصصة', route: `${b}/custom-screens` },
        { icon: 'dashboard_customize', label: 'بناء الواجهات', route: `${b}/ui-builder` },
      ]},
      { title: '11. العملات وأسعار الصرف', items: [
        { icon: 'currency_exchange', label: 'أسعار الصرف', route: `${b}/exchange-rates` },
      ]},
      { title: '12. المعلقات والتصفيات', items: [
        { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
      ]},
      { title: '13. الرواتب والميزانية', items: [
        { icon: 'category', label: 'تصنيفات المصروفات', route: `${b}/expense-categories` },
        { icon: 'account_balance_wallet', label: 'ميزانية المصروفات', route: `${b}/expense-budget` },
        { icon: 'payments', label: 'الرواتب', route: `${b}/salaries` },
      ]},
    ];

    if (type === 'stations') {
      this.menuSections.set(sectionsStations);
    } else if (type === 'single_station') {
      this.menuSections.set(sectionsSingleStation);
    } else {
      this.menuSections.set(sectionsPersonal);
    }
  }

  /** Reload sidebar from DB (called after settings change) */
  async reloadSidebar() {
    const bizId = this.biz.currentBusinessId();
    const bizType = this.biz.currentBusinessType();
    if (bizId) {
      await this.loadSidebarFromDB(bizId, bizType);
    }
  }

  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  toggleItem(label: string) {
    const current = new Set(this.expandedItems());
    if (current.has(label)) current.delete(label);
    else current.add(label);
    this.expandedItems.set(current);
  }

  isExpanded(label: string): boolean {
    return this.expandedItems().has(label);
  }

  // ============================================
  // Icon Color System - Professional Unique Colors
  // ============================================
  private readonly iconColorMap: Record<string, [string, string]> = {
    'dashboard':              ['#3b82f6', '#60a5fa'],
    'arrow_forward':          ['#94a3b8', '#cbd5e1'],
    'bolt':                   ['#f59e0b', '#fbbf24'],
    'receipt_long':           ['#10b981', '#34d399'],
    'receipt':                ['#8b5cf6', '#a78bfa'],
    'account_balance_wallet': ['#06b6d4', '#22d3ee'],
    'category':               ['#f97316', '#fb923c'],
    'savings':                ['#eab308', '#facc15'],
    'account_balance':        ['#6366f1', '#818cf8'],
    'currency_exchange':      ['#ec4899', '#f472b6'],
    'wallet':                 ['#14b8a6', '#2dd4bf'],
    'tune':                   ['#64748b', '#94a3b8'],
    'space_dashboard':        ['#a855f7', '#c084fc'],
    'admin_panel_settings':   ['#ef4444', '#f87171'],
    'menu_book':              ['#0ea5e9', '#38bdf8'],
    'groups':                 ['#22c55e', '#4ade80'],
    'handshake':              ['#d946ef', '#e879f9'],
    'warehouse':              ['#78716c', '#a8a29e'],
    'local_shipping':         ['#f97316', '#fdba74'],
    'balance':                ['#0891b2', '#22d3ee'],
    'assessment':             ['#7c3aed', '#a78bfa'],
    'analytics':              ['#2563eb', '#60a5fa'],
    'warning':                ['#ef4444', '#fca5a5'],
    'summarize':              ['#059669', '#34d399'],
    'shopping_cart':          ['#e11d48', '#fb7185'],
    'settings':               ['#64748b', '#94a3b8'],
    'person':                 ['#f59e0b', '#fbbf24'],
    'logout':                 ['#ef4444', '#f87171'],
    'payments':               ['#10b981', '#34d399'],
    'shopping_bag':           ['#f97316', '#fb923c'],
    'open_in_new':            ['#3b82f6', '#60a5fa'],
    'edit':                   ['#f59e0b', '#fbbf24'],
    'delete':                 ['#ef4444', '#f87171'],
    'lock':                   ['#64748b', '#94a3b8'],
    'content_copy':           ['#8b5cf6', '#a78bfa'],
    'add_to_home_screen':     ['#06b6d4', '#22d3ee'],
    'inventory_2':            ['#78716c', '#a8a29e'],
    'widgets':                ['#a855f7', '#c084fc'],
    'trending_up':            ['#22c55e', '#4ade80'],
    'label':                  ['#0ea5e9', '#38bdf8'],
  };

  getIconColor(icon: string): string {
    const colors = this.iconColorMap[icon];
    return colors ? colors[0] : '#94a3b8';
  }

  getIconGlow(icon: string): string {
    const colors = this.iconColorMap[icon];
    return colors ? colors[1] : '#cbd5e1';
  }

  getRoleLabel(): string {
    const role = this.auth.user()?.role;
    switch (role) {
      case 'admin': return 'مدير النظام';
      case 'accountant': return 'محاسب';
      case 'manager': return 'مدير محطة';
      case 'viewer': return 'مشاهد';
      default: return 'مستخدم';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
