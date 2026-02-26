import { Component, signal, inject, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  badge?: number;
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
  expandedSection = signal<string | null>(null);

  user = this.auth.user;

  menuSections: MenuSection[] = [
    {
      title: 'الرئيسية',
      items: [
        { icon: 'dashboard', label: 'لوحة المعلومات', route: '/dashboard' },
      ],
    },
    {
      title: 'العمليات',
      items: [
        { icon: 'bolt', label: 'المحطات', route: '/stations' },
        { icon: 'account_balance_wallet', label: 'الحسابات والمحافظ', route: '/accounts' },
        { icon: 'inventory_2', label: 'الصناديق', route: '/funds' },
        { icon: 'swap_horiz', label: 'الحركات المالية', route: '/transactions' },
        { icon: 'arrow_downward', label: 'مدخولات', route: '/income' },
        { icon: 'arrow_upward', label: 'مخروجات', route: '/expenses' },
      ],
    },
    {
      title: 'الأشخاص',
      items: [
        { icon: 'people', label: 'الموظفين', route: '/employees' },
        { icon: 'local_shipping', label: 'الموردين', route: '/suppliers' },
        { icon: 'handshake', label: 'الشركاء', route: '/partners' },
      ],
    },
    {
      title: 'المخزون',
      items: [
        { icon: 'warehouse', label: 'المخازن', route: '/warehouses' },
        { icon: 'category', label: 'الأصناف', route: '/items' },
        { icon: 'local_gas_station', label: 'استهلاك الديزل', route: '/diesel' },
      ],
    },
    {
      title: 'المالية',
      items: [
        { icon: 'payments', label: 'الرواتب', route: '/salaries' },
        { icon: 'request_page', label: 'الميزانية', route: '/budget' },
        { icon: 'balance', label: 'التصفيات', route: '/reconciliation' },
        { icon: 'receipt_long', label: 'فترات الفوترة', route: '/billing' },
      ],
    },
    {
      title: 'التقارير',
      items: [
        { icon: 'assessment', label: 'التقارير', route: '/reports' },
        { icon: 'summarize', label: 'التقرير الشهري', route: '/monthly-report' },
      ],
    },
    {
      title: 'النظام',
      items: [
        { icon: 'settings', label: 'الإعدادات', route: '/settings' },
        { icon: 'currency_exchange', label: 'العملات', route: '/currencies' },
        { icon: 'history', label: 'سجل التدقيق', route: '/audit-log' },
      ],
    },
  ];

  toggleCollapse() {
    this.isCollapsed.set(!this.isCollapsed());
  }

  toggleSection(title: string) {
    this.expandedSection.set(this.expandedSection() === title ? null : title);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
