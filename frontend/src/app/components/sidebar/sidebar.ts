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
  private auth = inject(AuthService);
  private router = inject(Router);
  private api = inject(ApiService);
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
        if (!sectionMap.has(secId)) {
          sectionMap.set(secId, {
            title: cfg.customSectionName || cfg.sectionName,
            sectionId: secId,
            items: [],
          });
        }
        const section = sectionMap.get(secId)!;
        const resolvedRoute = cfg.route.replace('{bizId}', String(bizId));
        section.items.push({
          icon: cfg.icon,
          label: cfg.label,
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
    } catch (err) {
      console.error('Error loading sidebar config:', err);
      this.buildFallbackMenu(bizId, type);
    } finally {
      this.isLoading.set(false);
    }
  }

  private buildFallbackMenu(bizId: number, type: BusinessType) {
    const b = `/biz/${bizId}`;

    if (type === 'stations') {
      this.menuSections.set([
        { title: 'الرئيسية', items: [
          { icon: 'dashboard', label: 'لوحة التحكم', route: b },
          { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
        ]},
        { title: 'المحطات', items: [
          { icon: 'bolt', label: 'المحطات', route: `${b}/stations` },
          { icon: 'receipt_long', label: 'التحصيل والتوريد', route: `${b}/collections` },
          { icon: 'receipt', label: 'أنظمة الفوترة', route: `${b}/billing-systems` },
        ]},
        { title: 'الإعداد', items: [
          { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
          { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
          { icon: 'savings', label: 'إدارة الصناديق', route: `${b}/funds` },
        ]},
        { title: 'العمليات المالية', items: [
          { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
          { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
          { icon: 'currency_exchange', label: 'الصرافين', route: `${b}/exchangers` },
        ]},
        { title: 'الأشخاص', items: [
          { icon: 'groups', label: 'الموظفين والرواتب', route: `${b}/employees` },
          { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
        ]},
        { title: 'المخزن والموردين', items: [
          { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
          { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
        ]},
        { title: 'التصفيات والتقارير', items: [
          { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
          { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
          { icon: 'warning', label: 'حسابات معلقة', route: `${b}/pending`, badge: 3, badgeColor: 'red' },
        ]},
      ]);
    } else if (type === 'single_station') {
      this.menuSections.set([
        { title: 'الرئيسية', items: [
          { icon: 'dashboard', label: 'لوحة التحكم', route: b },
          { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
        ]},
        { title: 'المحطة', items: [
          { icon: 'bolt', label: 'المحطة', route: `${b}/stations` },
        ]},
        { title: 'الإعداد', items: [
          { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
          { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
        ]},
        { title: 'العمليات المالية', items: [
          { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
          { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
          { icon: 'savings', label: 'الصناديق', route: `${b}/funds` },
        ]},
        { title: 'الأشخاص', items: [
          { icon: 'groups', label: 'الموظفين والرواتب', route: `${b}/employees` },
          { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
        ]},
        { title: 'المخزن والموردين', items: [
          { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
          { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
        ]},
        { title: 'التصفيات والتقارير', items: [
          { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
          { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
        ]},
      ]);
    } else if (type === 'personal') {
      this.menuSections.set([
        { title: 'الرئيسية', items: [
          { icon: 'dashboard', label: 'لوحة التحكم', route: b },
          { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
        ]},
        { title: 'الإعداد', items: [
          { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
          { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
        ]},
        { title: 'المالية الشخصية', items: [
          { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
          { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
        ]},
        { title: 'المجمع', items: [
          { icon: 'summarize', label: 'ملخص كل الأعمال', route: `${b}/summary` },
          { icon: 'assessment', label: 'التقارير الشخصية', route: `${b}/reports` },
        ]},
      ]);
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
