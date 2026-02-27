import { Component, signal, inject, effect } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { BusinessService, BusinessType } from '../../services/business.service';

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
  host: {
    '[style.display]': '"flex"',
    '[style.flex-shrink]': '"0"',
  }
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
      const bizType = this.biz.currentBusinessType();
      if (bizId) {
        this.buildMenu(bizId, bizType);
      }
    });
  }

  private buildMenu(bizId: number, type: BusinessType) {
    const b = `/biz/${bizId}`;

    // ===== عمل المحطات (شراكة المراني) =====
    if (type === 'stations') {
      this.menuSections.set([
        {
          title: 'الرئيسية',
          items: [
            { icon: 'dashboard', label: 'لوحة التحكم', route: b },
            { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
          ],
        },
        {
          title: 'المحطات',
          items: [
            { icon: 'bolt', label: 'المحطات', route: `${b}/stations` },
            { icon: 'receipt_long', label: 'التحصيل والتوريد', route: `${b}/collections` },
            { icon: 'receipt', label: 'أنظمة الفوترة', route: `${b}/billing-systems` },
          ],
        },
        {
          title: 'الإعداد',
          items: [
            { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
            { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
            { icon: 'savings', label: 'إدارة الصناديق', route: `${b}/funds` },
          ],
        },
        {
          title: 'العمليات المالية',
          items: [
            { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
            { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
            { icon: 'currency_exchange', label: 'الصرافين', route: `${b}/exchangers` },
          ],
        },
        {
          title: 'الأشخاص',
          items: [
            { icon: 'groups', label: 'الموظفين والرواتب', route: `${b}/employees` },
            { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
          ],
        },
        {
          title: 'المخزن والموردين',
          items: [
            { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
            { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
          ],
        },
        {
          title: 'التصفيات والتقارير',
          items: [
            { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
            { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
            { icon: 'warning', label: 'حسابات معلقة', route: `${b}/pending`, badge: 3, badgeColor: 'red' },
          ],
        },
      ]);
    }

    // ===== محطة معبر (محطة واحدة) =====
    else if (type === 'single_station') {
      this.menuSections.set([
        {
          title: 'الرئيسية',
          items: [
            { icon: 'dashboard', label: 'لوحة التحكم', route: b },
            { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
          ],
        },
        {
          title: 'المحطة',
          items: [
            { icon: 'bolt', label: 'المحطة', route: `${b}/stations` },
          ],
        },
        {
          title: 'الإعداد',
          items: [
            { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
            { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
          ],
        },
        {
          title: 'العمليات المالية',
          items: [
            { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
            { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
            { icon: 'savings', label: 'الصناديق', route: `${b}/funds` },
          ],
        },
        {
          title: 'الأشخاص',
          items: [
            { icon: 'groups', label: 'الموظفين والرواتب', route: `${b}/employees` },
            { icon: 'handshake', label: 'الشركاء', route: `${b}/partners` },
          ],
        },
        {
          title: 'المخزن والموردين',
          items: [
            { icon: 'warehouse', label: 'المخزن', route: `${b}/warehouse` },
            { icon: 'local_shipping', label: 'الموردين', route: `${b}/suppliers` },
          ],
        },
        {
          title: 'التصفيات والتقارير',
          items: [
            { icon: 'balance', label: 'التصفيات', route: `${b}/settlements` },
            { icon: 'assessment', label: 'التقارير', route: `${b}/reports` },
          ],
        },
      ]);
    }

    // ===== الأعمال الشخصية =====
    else if (type === 'personal') {
      this.menuSections.set([
        {
          title: 'الرئيسية',
          items: [
            { icon: 'dashboard', label: 'لوحة التحكم', route: b },
            { icon: 'arrow_forward', label: 'العودة للأعمال', route: '/businesses' },
          ],
        },
        {
          title: 'الإعداد',
          items: [
            { icon: 'account_balance_wallet', label: 'الحسابات', route: `${b}/accounts` },
            { icon: 'category', label: 'أنواع العمليات', route: `${b}/operation-types` },
          ],
        },
        {
          title: 'المالية الشخصية',
          items: [
            { icon: 'receipt_long', label: 'سندات الصرف والقبض', route: `${b}/vouchers` },
            { icon: 'menu_book', label: 'القيود المحاسبية', route: `${b}/journal` },
          ],
        },
        {
          title: 'المجمع',
          items: [
            { icon: 'summarize', label: 'ملخص كل الأعمال', route: `${b}/summary` },
            { icon: 'assessment', label: 'التقارير الشخصية', route: `${b}/reports` },
          ],
        },
      ]);
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

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
