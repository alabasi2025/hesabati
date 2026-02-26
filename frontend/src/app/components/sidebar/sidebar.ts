import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  badge?: number;
  badgeColor?: string;
  children?: MenuItem[];
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class SidebarComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  isCollapsed = signal(false);
  expandedItems = signal<Set<string>>(new Set());

  user = this.auth.user;

  menuSections: MenuSection[] = [
    {
      title: 'الرئيسية',
      items: [
        { icon: 'dashboard', label: 'لوحة التحكم', route: '/dashboard' },
      ],
    },
    {
      title: 'الأعمال',
      items: [
        {
          icon: 'bolt', label: 'المحطات',
          children: [
            { icon: 'location_on', label: 'الدهمية', route: '/stations/dahmiya' },
            { icon: 'location_on', label: 'الصبالية وجمال', route: '/stations/sabaliya' },
            { icon: 'location_on', label: 'غليل', route: '/stations/ghalil' },
            { icon: 'location_on', label: 'الساحل الغربي', route: '/stations/west-coast' },
            { icon: 'location_on', label: 'معبر', route: '/stations/mabar' },
          ],
        },
        {
          icon: 'account_balance_wallet', label: 'الحسابات والمحافظ',
          children: [
            { icon: 'phone_android', label: 'جوالي', route: '/accounts/jawali' },
            { icon: 'payments', label: 'ون كاش', route: '/accounts/one-cash' },
            { icon: 'credit_card', label: 'جيب', route: '/accounts/jeeb' },
            { icon: 'computer', label: 'خدمة حاسب', route: '/accounts/haseb' },
            { icon: 'account_balance', label: 'كريمي', route: '/accounts/kreimi' },
            { icon: 'currency_exchange', label: 'الصرافين', route: '/accounts/exchanges' },
            { icon: 'savings', label: 'الخزائن والنقد', route: '/accounts/cash' },
            { icon: 'assignment', label: 'العهد', route: '/accounts/custody' },
          ],
        },
      ],
    },
    {
      title: 'العمليات المالية',
      items: [
        {
          icon: 'receipt_long', label: 'التحصيل والتوريد',
          children: [
            { icon: 'point_of_sale', label: 'التحصيل اليومي', route: '/collections/daily' },
            { icon: 'date_range', label: 'فترات الفوترة', route: '/collections/billing-periods' },
            { icon: 'upload', label: 'التوريدات', route: '/collections/deliveries' },
          ],
        },
        {
          icon: 'description', label: 'سندات القبض والصرف',
          children: [
            { icon: 'arrow_downward', label: 'سند قبض', route: '/vouchers/receipt' },
            { icon: 'arrow_upward', label: 'سند صرف', route: '/vouchers/payment' },
            { icon: 'swap_horiz', label: 'تحويل', route: '/vouchers/transfer' },
            { icon: 'list_alt', label: 'كل السندات', route: '/vouchers/all' },
          ],
        },
        {
          icon: 'currency_exchange', label: 'الصرافين',
          children: [
            { icon: 'star', label: 'النجم', route: '/exchanges/najm' },
            { icon: 'store', label: 'الحوشبي', route: '/exchanges/houshbi' },
            { icon: 'store', label: 'النهمي', route: '/exchanges/nahmi' },
            { icon: 'store', label: 'ابن عامر', route: '/exchanges/ibn-amer' },
          ],
        },
      ],
    },
    {
      title: 'الأشخاص',
      items: [
        {
          icon: 'groups', label: 'الموظفين والرواتب',
          children: [
            { icon: 'person', label: 'قائمة الموظفين', route: '/employees/list' },
            { icon: 'payments', label: 'الرواتب', route: '/employees/salaries' },
            { icon: 'request_quote', label: 'السلف', route: '/employees/advances' },
            { icon: 'fingerprint', label: 'البصمة والحضور', route: '/employees/attendance' },
          ],
        },
        {
          icon: 'local_shipping', label: 'الموردين',
          children: [
            { icon: 'list', label: 'قائمة الموردين', route: '/suppliers/list' },
            { icon: 'local_gas_station', label: 'الديزل', route: '/suppliers/diesel' },
            { icon: 'oil_barrel', label: 'الزيوت', route: '/suppliers/oil' },
            { icon: 'electrical_services', label: 'العدادات والمواد', route: '/suppliers/materials' },
          ],
        },
        {
          icon: 'handshake', label: 'الشركاء',
          children: [
            { icon: 'person', label: 'محمد المراني', route: '/partners/marani' },
            { icon: 'person', label: 'عمر إسحاق', route: '/partners/omar' },
            { icon: 'person', label: 'إبراهيم نجم الدين', route: '/partners/ibrahim' },
          ],
        },
      ],
    },
    {
      title: 'المخزون',
      items: [
        {
          icon: 'warehouse', label: 'المخزن',
          children: [
            { icon: 'inventory', label: 'المخزن الرئيسي', route: '/inventory/main' },
            { icon: 'inventory_2', label: 'مخازن المحطات', route: '/inventory/stations' },
            { icon: 'add_box', label: 'دخول مواد', route: '/inventory/in' },
            { icon: 'indeterminate_check_box', label: 'خروج مواد', route: '/inventory/out' },
            { icon: 'fact_check', label: 'الجرد', route: '/inventory/audit' },
          ],
        },
      ],
    },
    {
      title: 'التصفيات والتقارير',
      items: [
        {
          icon: 'balance', label: 'التصفيات',
          children: [
            { icon: 'supervisor_account', label: 'تصفية مع المدراء', route: '/reconciliation/managers' },
            { icon: 'currency_exchange', label: 'تصفية مع الصرافين', route: '/reconciliation/exchanges' },
            { icon: 'person_search', label: 'تصفية مع المحاسب', route: '/reconciliation/accountant' },
            { icon: 'local_shipping', label: 'تصفية مع الموردين', route: '/reconciliation/suppliers' },
          ],
        },
        {
          icon: 'assessment', label: 'التقارير',
          children: [
            { icon: 'summarize', label: 'التقرير الشهري للشراكة', route: '/reports/monthly-partnership' },
            { icon: 'analytics', label: 'تقرير كل محطة', route: '/reports/station' },
            { icon: 'data_usage', label: 'تقرير الاستهلاك', route: '/reports/consumption' },
            { icon: 'receipt', label: 'كشف حساب', route: '/reports/account-statement' },
            { icon: 'pie_chart', label: 'الميزانية الشهرية', route: '/reports/budget' },
          ],
        },
        {
          icon: 'pending_actions', label: 'الحسابات المعلقة', route: '/pending-accounts',
          badge: 3, badgeColor: '#ef4444',
        },
      ],
    },
    {
      title: 'النظام',
      items: [
        {
          icon: 'settings', label: 'الإعدادات',
          children: [
            { icon: 'currency_exchange', label: 'العملات وأسعار الصرف', route: '/settings/currencies' },
            { icon: 'manage_accounts', label: 'المستخدمين', route: '/settings/users' },
            { icon: 'category', label: 'تصنيفات السندات', route: '/settings/categories' },
            { icon: 'backup', label: 'النسخ الاحتياطي', route: '/settings/backup' },
          ],
        },
      ],
    },
  ];

  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  toggleItem(label: string) {
    const current = new Set(this.expandedItems());
    if (current.has(label)) {
      current.delete(label);
    } else {
      current.add(label);
    }
    this.expandedItems.set(current);
  }

  isExpanded(label: string): boolean {
    return this.expandedItems().has(label);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
