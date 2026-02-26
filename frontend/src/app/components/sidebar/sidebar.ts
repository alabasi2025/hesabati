import { Component, signal, inject, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BusinessService } from '../../services/business.service';

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
  biz = inject(BusinessService);

  isCollapsed = signal(false);
  expandedItems = signal<Set<string>>(new Set());
  menuSections = signal<MenuSection[]>([]);

  user = this.auth.user;

  constructor() {
    effect(() => {
      const bizId = this.biz.currentBusinessId();
      if (bizId) {
        this.buildMenu(bizId);
      }
    });
  }

  private buildMenu(bizId: number) {
    const b = `/biz/${bizId}`;
    this.menuSections.set([
      {
        title: 'الرئيسية',
        items: [
          { icon: 'dashboard', label: 'لوحة التحكم', route: b },
          { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
        ],
      },
      {
        title: 'الأعمال',
        items: [
          { icon: 'bolt', label: 'المحطات', route: `${b}/stations` },
          { icon: 'account_balance_wallet', label: 'الحسابات والمحافظ', route: `${b}/accounts` },
          { icon: 'savings', label: 'الصناديق', route: `${b}/funds` },
        ],
      },
      {
        title: 'العمليات المالية',
        items: [
          { icon: 'receipt_long', label: 'السندات', route: `${b}/vouchers` },
        ],
      },
      {
        title: 'الأشخاص',
        items: [
          { icon: 'groups', label: 'الموظفين والرواتب', route: `${b}/employees` },
        ],
      },
      {
        title: 'التصفيات والتقارير',
        items: [
          { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
        ],
      },
    ]);
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

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
