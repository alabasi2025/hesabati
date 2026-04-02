import { Component, signal, inject, effect, computed, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';
import { BusinessService, BusinessType } from '../../services/business.service';
import {
  getSearchHighlightParts,
  matchesSearchQuery,
  normalizeSearchText,
} from '../../shared/helpers';

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

/** عنصر قائمة احتياطية مع تحديد نوع العمل الذي يراه */
interface FallbackItemDef {
  icon: string;
  label: string;
  path: string; // مسار نسبي مثل 'accounts' أو مطلق مثل '/businesses'
  showFor: BusinessType[];
  badge?: number;
  badgeColor?: string;
}

interface FallbackSectionDef {
  title: string;
  items: FallbackItemDef[];
}

interface MenuSection {
  title: string;
  sectionId?: number;
  color?: string;
  icon?: string;
  items: MenuItem[];
}

/** تعريف موحّد للقائمة الاحتياطية — مصدر واحد للحقيقة حسب نوع العمل */
const FALLBACK_MENU_DEF: FallbackSectionDef[] = [
  {
    title: '1. المستخدمون والصلاحيات',
    items: [
      {
        icon: 'admin_panel_settings',
        label: 'الصلاحيات والأدوار',
        path: 'roles',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'tune',
        label: 'إعدادات التبويب',
        path: 'sidebar-settings',
        showFor: ['stations', 'single_station', 'personal'],
      },
    ],
  },
  {
    title: '2. الرئيسية والأعمال',
    items: [
      {
        icon: 'dashboard',
        label: 'لوحة التحكم',
        path: '',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'arrow_forward',
        label: 'العودة للأعمال',
        path: '/businesses',
        showFor: ['stations', 'single_station', 'personal'],
      },
      { icon: 'bolt', label: 'المحطات', path: 'stations', showFor: ['stations'] },
      {
        icon: 'groups',
        label: 'الموظفين',
        path: 'employees',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'handshake',
        label: 'الشركاء',
        path: 'partners',
        showFor: ['stations', 'single_station', 'personal'],
      },
      { icon: 'summarize', label: 'ملخص الأعمال', path: 'summary', showFor: ['personal'] },
    ],
  },
  {
    title: '3. الحسابات والأرصدة',
    items: [
      {
        icon: 'account_balance_wallet',
        label: 'الحسابات',
        path: 'accounts',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'label',
        label: 'أنواع الحسابات الفرعية',
        path: 'account-sub-natures',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'savings',
        label: 'الصناديق',
        path: 'funds',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'account_balance',
        label: 'البنوك',
        path: 'banks',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'currency_exchange',
        label: 'الصرافين',
        path: 'exchangers',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'wallet',
        label: 'المحافظ الإلكترونية',
        path: 'wallets',
        showFor: ['stations', 'single_station'],
      },
    ],
  },
  {
    title: '4. العمليات المالية',
    items: [
      {
        icon: 'receipt_long',
        label: 'سندات الصرف والقبض',
        path: 'vouchers',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'add_circle',
        label: 'تسجيل عملية',
        path: 'register-operation',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'folder_open',
        label: 'الأرشفة الإلكترونية',
        path: 'attachments-archive',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'menu_book',
        label: 'القيود المحاسبية',
        path: 'journal',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'label',
        label: 'تصنيفات القيود',
        path: 'journal-categories',
        showFor: ['stations', 'single_station', 'personal'],
      },
    ],
  },
  {
    title: '5. القوالب والترقيم',
    items: [
      {
        icon: 'folder_special',
        label: 'أصناف العمليات',
        path: 'operation-categories',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'local_shipping',
        label: 'أنواع الموردين',
        path: 'supplier-types',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'inventory_2',
        label: 'أنواع الأصناف',
        path: 'inventory-item-types',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'groups',
        label: 'الأقسام',
        path: 'departments',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'badge',
        label: 'المسميات الوظيفية',
        path: 'job-titles',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'category',
        label: 'أنواع العمليات',
        path: 'operation-types',
        showFor: ['stations', 'single_station', 'personal'],
      },
    ],
  },
  {
    title: '6. المخزون والمخازن',
    items: [
      {
        icon: 'warehouse',
        label: 'المخزن',
        path: 'warehouse',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'inventory_2',
        label: 'العمليات المخزنية',
        path: 'warehouse-operations',
        showFor: ['stations', 'single_station'],
      },
    ],
  },
  {
    title: '7. الموردين والمشتريات',
    items: [
      {
        icon: 'local_shipping',
        label: 'الموردين',
        path: 'suppliers',
        showFor: ['stations', 'single_station'],
      },
      {
        icon: 'receipt_long',
        label: 'فواتير المشتريات',
        path: 'purchase-invoices',
        showFor: ['stations', 'single_station'],
      },
    ],
  },
  {
    title: '8. المطابقات والعهد',
    items: [
      {
        icon: 'fact_check',
        label: 'المطابقات',
        path: 'reconciliations',
        showFor: ['stations', 'single_station', 'personal'],
      },
      { icon: 'lock', label: 'العهد', path: 'custody', showFor: ['stations', 'single_station'] },
    ],
  },
  {
    title: '9. الفوترة',
    items: [
      { icon: 'receipt', label: 'أنظمة الفوترة', path: 'billing-systems', showFor: ['stations'] },
    ],
  },
  {
    title: '10. التقارير',
    items: [
      {
        icon: 'assessment',
        label: 'التقارير',
        path: 'reports',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'analytics',
        label: 'التقارير المتقدمة',
        path: 'reports-advanced',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'date_range',
        label: 'الفترات المالية',
        path: 'fiscal-periods',
        showFor: ['stations', 'single_station', 'personal'],
      },
    ],
  },
  {
    title: '11. بناء الواجهات',
    items: [
      {
        icon: 'space_dashboard',
        label: 'الشاشات المخصصة',
        path: 'custom-screens',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'dashboard_customize',
        label: 'بناء الواجهات',
        path: 'ui-builder',
        showFor: ['stations', 'single_station', 'personal'],
      },
    ],
  },
  {
    title: '12. العملات وأسعار الصرف',
    items: [
      {
        icon: 'currency_exchange',
        label: 'العملات وأسعار الصرف',
        path: 'exchange-rates',
        showFor: ['stations', 'single_station', 'personal'],
      },
    ],
  },
  {
    title: '13. المعلقات والتصفيات',
    items: [
      {
        icon: 'balance',
        label: 'التصفيات',
        path: 'settlements',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'warning',
        label: 'حسابات معلقة',
        path: 'pending',
        showFor: ['stations'],
        badge: 3,
        badgeColor: 'red',
      },
    ],
  },
  {
    title: '14. الرواتب والميزانية',
    items: [
      {
        icon: 'category',
        label: 'تصنيفات المصروفات',
        path: 'expense-categories',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'account_balance_wallet',
        label: 'ميزانية المصروفات',
        path: 'expense-budget',
        showFor: ['stations', 'single_station', 'personal'],
      },
      {
        icon: 'payments',
        label: 'الرواتب',
        path: 'salaries',
        showFor: ['stations', 'single_station', 'personal'],
      },
    ],
  },
];

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  host: {
    '[style.display]': '"flex"',
    '[style.flex-shrink]': '"0"',
  },
})
export class SidebarComponent {
  private readonly sidebarSearchInputId = 'sidebar-search-input';
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  biz = inject(BusinessService);

  isCollapsed = signal(false);
  expandedItems = signal<Set<string>>(new Set());
  collapsedSections = signal<Set<string>>(new Set());
  menuSections = signal<MenuSection[]>([]);
  isLoading = signal(false);
  sidebarSearchQuery = signal('');

  user = this.auth.user;

  filteredMenuSections = computed(() => {
    const query = normalizeSearchText(this.sidebarSearchQuery());
    const sections = this.menuSections();
    if (!query) return sections;

    return sections
      .map((section) => {
        const sectionMatch = normalizeSearchText(section.title).includes(query);
        if (sectionMatch) return section;

        const items = (section.items || [])
          .map((item) => {
            const itemMatch = this.isMenuItemMatch(item, query);
            if (itemMatch) return item;

            if (!item.children?.length) return null;
            const matchedChildren = item.children.filter((child) =>
              this.isMenuItemMatch(child, query),
            );
            return matchedChildren.length ? { ...item, children: matchedChildren } : null;
          })
          .filter((item): item is MenuItem => item !== null);

        return items.length ? { ...section, items } : null;
      })
      .filter((section): section is MenuSection => section !== null);
  });

  hasSidebarSearchResults = computed(() => this.filteredMenuSections().length > 0);

  areAllSectionsCollapsed = computed(() => {
    const sections = this.menuSections();
    if (sections.length === 0) return false;
    const collapsed = this.collapsedSections();
    return sections.every((s) => collapsed.has(s.sectionId?.toString() ?? s.title));
  });

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
            color: cfg.sectionColor || undefined,
            icon: cfg.sectionIcon || undefined,
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

      this.menuSections.set(this.appendArchiveMenuItem(sections, bizId));
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
      queryString.split('&').forEach((pair) => {
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
    return !!route?.includes('?');
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
      currentQuery.split('&').forEach((pair) => {
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
      {
        title: '1. المستخدمون والصلاحيات',
        items: [
          { icon: 'admin_panel_settings', label: 'الصلاحيات والأدوار', route: `${b}/roles` },
          { icon: 'tune', label: 'إعدادات التبويب', route: `${b}/sidebar-settings` },
        ],
      },
      {
        title: '2. الرئيسية والأعمال',
        items: [
          { icon: 'dashboard', label: 'لوحة التحكم', route: b },
          { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
          { icon: 'bolt', label: 'المحطات', route: `${b}/stations` },
          { icon: 'groups', label: 'الموظفين', route: `${b}/employees` },
          { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
        ],
      },
      {
        title: '3. الحسابات والأرصدة',
        items: [
          { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
          { icon: 'label', label: 'أنواع الحسابات الفرعية', route: `${b}/account-sub-natures` },
          { icon: 'savings', label: 'الصناديق', route: `${b}/funds` },
          { icon: 'account_balance', label: 'البنوك', route: `${b}/banks` },
          { icon: 'currency_exchange', label: 'الصرافين', route: `${b}/exchangers` },
          { icon: 'wallet', label: 'المحافظ الإلكترونية', route: `${b}/wallets` },
        ],
      },
      {
        title: '4. العمليات المالية',
        items: [
          { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
          { icon: 'folder_open', label: 'الأرشفة الإلكترونية', route: `${b}/attachments-archive` },
          { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
          { icon: 'label', label: 'تصنيفات القيود', route: `${b}/journal-categories` },
        ],
      },
      {
        title: '5. القوالب والترقيم',
        items: [{ icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` }],
      },
      {
        title: '6. المخزون والمخازن',
        items: [
          { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
          { icon: 'inventory_2', label: 'العمليات المخزنية', route: `${b}/warehouse-operations` },
        ],
      },
      {
        title: '7. الموردين والمشتريات',
        items: [
          { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
          { icon: 'receipt_long', label: 'فواتير المشتريات', route: `${b}/purchase-invoices` },
        ],
      },
      {
        title: '8. التحصيل والفوترة',
        items: [
          { icon: 'receipt_long', label: 'التحصيل والتوريد', route: `${b}/collections` },
          { icon: 'receipt', label: 'أنظمة الفوترة', route: `${b}/billing-systems` },
        ],
      },
      {
        title: '9. التقارير',
        items: [
          { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
          { icon: 'analytics', label: 'التقارير المتقدمة', route: `${b}/reports-advanced` },
        ],
      },
      {
        title: '10. بناء الواجهات',
        items: [
          { icon: 'space_dashboard', label: 'الشاشات المخصصة', route: `${b}/custom-screens` },
          { icon: 'dashboard_customize', label: 'بناء الواجهات', route: `${b}/ui-builder` },
        ],
      },
      {
        title: '11. العملات وأسعار الصرف',
        items: [{ icon: 'currency_exchange', label: 'أسعار الصرف', route: `${b}/exchange-rates` }],
      },
      {
        title: '12. المعلقات والتصفيات',
        items: [
          { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
          {
            icon: 'warning',
            label: 'حسابات معلقة',
            route: `${b}/pending`,
            badge: 3,
            badgeColor: 'red',
          },
        ],
      },
      {
        title: '13. الرواتب والميزانية',
        items: [
          { icon: 'category', label: 'تصنيفات المصروفات', route: `${b}/expense-categories` },
          {
            icon: 'account_balance_wallet',
            label: 'ميزانية المصروفات',
            route: `${b}/expense-budget`,
          },
          { icon: 'payments', label: 'الرواتب', route: `${b}/salaries` },
        ],
      },
    ];

    const sectionsSingleStation: MenuSection[] = [
      {
        title: '1. المستخدمون والصلاحيات',
        items: [
          { icon: 'admin_panel_settings', label: 'الصلاحيات والأدوار', route: `${b}/roles` },
          { icon: 'tune', label: 'إعدادات التبويب', route: `${b}/sidebar-settings` },
        ],
      },
      {
        title: '2. الرئيسية والأعمال',
        items: [
          { icon: 'dashboard', label: 'لوحة التحكم', route: b },
          { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
          { icon: 'groups', label: 'الموظفين', route: `${b}/employees` },
          { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
        ],
      },
      {
        title: '3. الحسابات والأرصدة',
        items: [
          { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
          { icon: 'label', label: 'أنواع الحسابات الفرعية', route: `${b}/account-sub-natures` },
          { icon: 'savings', label: 'الصناديق', route: `${b}/funds` },
          { icon: 'account_balance', label: 'البنوك', route: `${b}/banks` },
          { icon: 'currency_exchange', label: 'الصرافين', route: `${b}/exchangers` },
          { icon: 'wallet', label: 'المحافظ الإلكترونية', route: `${b}/wallets` },
        ],
      },
      {
        title: '4. العمليات المالية',
        items: [
          { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
          { icon: 'folder_open', label: 'الأرشفة الإلكترونية', route: `${b}/attachments-archive` },
          { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
          { icon: 'label', label: 'تصنيفات القيود', route: `${b}/journal-categories` },
        ],
      },
      {
        title: '5. القوالب والترقيم',
        items: [{ icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` }],
      },
      {
        title: '6. المخزون والمخازن',
        items: [
          { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
          { icon: 'inventory_2', label: 'العمليات المخزنية', route: `${b}/warehouse-operations` },
        ],
      },
      {
        title: '7. الموردين والمشتريات',
        items: [
          { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
          { icon: 'receipt_long', label: 'فواتير المشتريات', route: `${b}/purchase-invoices` },
        ],
      },
      {
        title: '9. التقارير',
        items: [
          { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
          { icon: 'analytics', label: 'التقارير المتقدمة', route: `${b}/reports-advanced` },
        ],
      },
      {
        title: '10. بناء الواجهات',
        items: [
          { icon: 'space_dashboard', label: 'الشاشات المخصصة', route: `${b}/custom-screens` },
          { icon: 'dashboard_customize', label: 'بناء الواجهات', route: `${b}/ui-builder` },
        ],
      },
      {
        title: '11. العملات وأسعار الصرف',
        items: [{ icon: 'currency_exchange', label: 'أسعار الصرف', route: `${b}/exchange-rates` }],
      },
      {
        title: '12. المعلقات والتصفيات',
        items: [{ icon: 'balance', label: 'التصفيات', route: `${b}/settlements` }],
      },
      {
        title: '13. الرواتب والميزانية',
        items: [
          { icon: 'category', label: 'تصنيفات المصروفات', route: `${b}/expense-categories` },
          {
            icon: 'account_balance_wallet',
            label: 'ميزانية المصروفات',
            route: `${b}/expense-budget`,
          },
          { icon: 'payments', label: 'الرواتب', route: `${b}/salaries` },
        ],
      },
    ];

    const sectionsPersonal: MenuSection[] = [
      {
        title: '1. المستخدمون والصلاحيات',
        items: [
          { icon: 'admin_panel_settings', label: 'الصلاحيات والأدوار', route: `${b}/roles` },
          { icon: 'tune', label: 'إعدادات التبويب', route: `${b}/sidebar-settings` },
        ],
      },
      {
        title: '2. الرئيسية والأعمال',
        items: [
          { icon: 'dashboard', label: 'لوحة التحكم', route: b },
          { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
          { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
          { icon: 'summarize', label: 'ملخص الأعمال', route: `${b}/summary` },
        ],
      },
      {
        title: '3. الحسابات والأرصدة',
        items: [
          { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
          { icon: 'label', label: 'أنواع الحسابات الفرعية', route: `${b}/account-sub-natures` },
        ],
      },
      {
        title: '4. العمليات المالية',
        items: [
          { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
          { icon: 'folder_open', label: 'الأرشفة الإلكترونية', route: `${b}/attachments-archive` },
          { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
          { icon: 'label', label: 'تصنيفات القيود', route: `${b}/journal-categories` },
        ],
      },
      {
        title: '5. القوالب والترقيم',
        items: [{ icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` }],
      },
      {
        title: '9. التقارير',
        items: [
          { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
          { icon: 'analytics', label: 'التقارير المتقدمة', route: `${b}/reports-advanced` },
        ],
      },
      {
        title: '10. بناء الواجهات',
        items: [
          { icon: 'space_dashboard', label: 'الشاشات المخصصة', route: `${b}/custom-screens` },
          { icon: 'dashboard_customize', label: 'بناء الواجهات', route: `${b}/ui-builder` },
        ],
      },
      {
        title: '11. العملات وأسعار الصرف',
        items: [{ icon: 'currency_exchange', label: 'أسعار الصرف', route: `${b}/exchange-rates` }],
      },
      {
        title: '12. المعلقات والتصفيات',
        items: [{ icon: 'balance', label: 'التصفيات', route: `${b}/settlements` }],
      },
      {
        title: '13. الرواتب والميزانية',
        items: [
          { icon: 'category', label: 'تصنيفات المصروفات', route: `${b}/expense-categories` },
          {
            icon: 'account_balance_wallet',
            label: 'ميزانية المصروفات',
            route: `${b}/expense-budget`,
          },
          { icon: 'payments', label: 'الرواتب', route: `${b}/salaries` },
        ],
      },
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

  setSidebarSearchQuery(value: string) {
    this.sidebarSearchQuery.set(String(value || ''));
  }

  clearSidebarSearch() {
    this.sidebarSearchQuery.set('');
  }

  onSidebarSearchKeydown(event: KeyboardEvent) {
    if (event.key !== 'Escape') return;
    if (this.sidebarSearchQuery().trim()) {
      event.preventDefault();
      this.clearSidebarSearch();
    }
  }

  getSidebarHighlightParts(text: string): { before: string; match: string; after: string } {
    return getSearchHighlightParts(text, this.sidebarSearchQuery());
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

  toggleSection(sectionKey: string) {
    const current = new Set(this.collapsedSections());
    if (current.has(sectionKey)) current.delete(sectionKey);
    else current.add(sectionKey);
    this.collapsedSections.set(current);
  }

  isSectionCollapsed(sectionKey: string): boolean {
    return this.collapsedSections().has(sectionKey);
  }

  collapseAllSections() {
    const keys = new Set(this.menuSections().map((s) => s.sectionId?.toString() ?? s.title));
    this.collapsedSections.set(keys);
  }

  expandAllSections() {
    this.collapsedSections.set(new Set());
  }

  toggleAllSections() {
    if (this.areAllSectionsCollapsed()) {
      this.expandAllSections();
    } else {
      this.collapseAllSections();
    }
  }

  // ============================================
  // Icon Color System - Professional Unique Colors
  // ============================================
  private readonly iconColorMap: Record<string, [string, string]> = {
    dashboard: ['#3b82f6', '#60a5fa'],
    arrow_forward: ['#94a3b8', '#cbd5e1'],
    bolt: ['#f59e0b', '#fbbf24'],
    receipt_long: ['#10b981', '#34d399'],
    receipt: ['#8b5cf6', '#a78bfa'],
    account_balance_wallet: ['#06b6d4', '#22d3ee'],
    category: ['#f97316', '#fb923c'],
    savings: ['#eab308', '#facc15'],
    account_balance: ['#6366f1', '#818cf8'],
    currency_exchange: ['#ec4899', '#f472b6'],
    wallet: ['#14b8a6', '#2dd4bf'],
    tune: ['#64748b', '#94a3b8'],
    space_dashboard: ['#a855f7', '#c084fc'],
    admin_panel_settings: ['#ef4444', '#f87171'],
    menu_book: ['#0ea5e9', '#38bdf8'],
    groups: ['#22c55e', '#4ade80'],
    handshake: ['#d946ef', '#e879f9'],
    warehouse: ['#78716c', '#a8a29e'],
    local_shipping: ['#f97316', '#fdba74'],
    balance: ['#0891b2', '#22d3ee'],
    assessment: ['#7c3aed', '#a78bfa'],
    analytics: ['#2563eb', '#60a5fa'],
    warning: ['#ef4444', '#fca5a5'],
    summarize: ['#059669', '#34d399'],
    shopping_cart: ['#e11d48', '#fb7185'],
    settings: ['#64748b', '#94a3b8'],
    person: ['#f59e0b', '#fbbf24'],
    logout: ['#ef4444', '#f87171'],
    payments: ['#10b981', '#34d399'],
    shopping_bag: ['#f97316', '#fb923c'],
    open_in_new: ['#3b82f6', '#60a5fa'],
    edit: ['#f59e0b', '#fbbf24'],
    delete: ['#ef4444', '#f87171'],
    lock: ['#64748b', '#94a3b8'],
    content_copy: ['#8b5cf6', '#a78bfa'],
    add_to_home_screen: ['#06b6d4', '#22d3ee'],
    inventory_2: ['#78716c', '#a8a29e'],
    widgets: ['#a855f7', '#c084fc'],
    trending_up: ['#22c55e', '#4ade80'],
    label: ['#0ea5e9', '#38bdf8'],
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
      case 'admin':
        return 'مدير النظام';
      case 'accountant':
        return 'محاسب';
      case 'manager':
        return 'مدير محطة';
      case 'viewer':
        return 'مشاهد';
      default:
        return 'مستخدم';
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  @HostListener('document:keydown', ['$event'])
  onGlobalKeydown(event: KeyboardEvent) {
    if (event.key !== '/') return;
    if (this.isCollapsed()) return;

    const target = event.target as HTMLElement | null;
    const tag = String(target?.tagName || '').toLowerCase();
    const isTypingContext = tag === 'input' || tag === 'textarea' || target?.isContentEditable;
    if (isTypingContext) return;

    event.preventDefault();
    this.focusSidebarSearchInput();
  }

  private isMenuItemMatch(item: MenuItem, query: string): boolean {
    return matchesSearchQuery(query, item?.label, item?.route);
  }

  private focusSidebarSearchInput() {
    const input = globalThis.document?.getElementById(
      this.sidebarSearchInputId,
    ) as HTMLInputElement | null;
    if (!input) return;
    input.focus();
    input.select();
  }

  private appendArchiveMenuItem(sections: MenuSection[], bizId: number): MenuSection[] {
    const archiveRoute = `/biz/${bizId}/attachments-archive`;
    const alreadyExists = sections.some((section) =>
      (section.items || []).some((item) => item.route === archiveRoute),
    );
    if (alreadyExists) return sections;

    const archiveItem: MenuItem = {
      icon: 'folder_open',
      label: 'الأرشفة الإلكترونية',
      route: archiveRoute,
      screenKey: 'attachments_archive',
    };

    const targetSection = sections.find((section) =>
      (section.items || []).some((item) => item.route?.includes('/vouchers')),
    );
    if (targetSection) {
      return sections.map((section) =>
        section === targetSection
          ? { ...section, items: [...section.items, archiveItem] }
          : section,
      );
    }

    if (sections.length === 0) {
      return [{ title: 'الأرشفة', items: [archiveItem] }];
    }

    const cloned = [...sections];
    const last = cloned[cloned.length - 1];
    cloned[cloned.length - 1] = { ...last, items: [...(last.items || []), archiveItem] };
    return cloned;
  }
}
