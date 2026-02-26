import { Component, signal, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';

interface StatCard {
  icon: string;
  label: string;
  value: string | number;
  color: string;
  gradient: string;
}

interface QuickAction {
  icon: string;
  label: string;
  route: string;
  color: string;
}

interface StationInfo {
  name: string;
  code: string;
  manager: string;
  employees: number;
  systems: string;
  status: string;
}

interface PendingItem {
  person: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, HeaderComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  isLoading = signal(true);

  statCards = signal<StatCard[]>([]);

  quickActions: QuickAction[] = [
    { icon: 'arrow_downward', label: 'سند قبض', route: '/vouchers/receipt', color: '#22c55e' },
    { icon: 'arrow_upward', label: 'سند صرف', route: '/vouchers/payment', color: '#ef4444' },
    { icon: 'swap_horiz', label: 'تحويل', route: '/vouchers/transfer', color: '#a855f7' },
    { icon: 'point_of_sale', label: 'تسجيل تحصيل', route: '/collections/daily', color: '#3b82f6' },
    { icon: 'balance', label: 'تصفية', route: '/reconciliation/managers', color: '#06b6d4' },
    { icon: 'assessment', label: 'تقرير شهري', route: '/reports/monthly-partnership', color: '#f59e0b' },
  ];

  stations = signal<StationInfo[]>([]);
  pendingItems = signal<PendingItem[]>([]);

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.isLoading.set(true);
    try {
      this.statCards.set([
        { icon: 'bolt', label: 'المحطات', value: 5, color: '#f59e0b', gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.08))' },
        { icon: 'groups', label: 'الموظفين', value: 25, color: '#3b82f6', gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.08))' },
        { icon: 'account_balance_wallet', label: 'الحسابات والمحافظ', value: 28, color: '#8b5cf6', gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(124, 58, 237, 0.08))' },
        { icon: 'inventory_2', label: 'الصناديق', value: 13, color: '#06b6d4', gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(8, 145, 178, 0.08))' },
        { icon: 'payments', label: 'إجمالي الرواتب', value: '3,830 ألف ر.ي', color: '#ef4444', gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.08))' },
        { icon: 'local_shipping', label: 'الموردين', value: 8, color: '#22c55e', gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.08))' },
        { icon: 'handshake', label: 'الشركاء', value: 3, color: '#ec4899', gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.08))' },
        { icon: 'pending_actions', label: 'حسابات معلقة', value: 3, color: '#f97316', gradient: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 88, 12, 0.08))' },
      ]);

      this.stations.set([
        { name: 'الدهمية', code: 'DHM', manager: 'رايد العباسي', employees: 5, systems: 'المغربي v1 + صندوق الدعم + مسبق', status: 'active' },
        { name: 'الصبالية وجمال', code: 'SBL', manager: 'علي المجهلي', employees: 10, systems: 'المغربي v2 + صندوق الدعم + مسبق', status: 'active' },
        { name: 'غليل', code: 'GHL', manager: 'قايد حسن العباسي', employees: 8, systems: 'المغربي v3 + صندوق الدعم + مسبق', status: 'active' },
        { name: 'الساحل الغربي', code: 'WST', manager: 'شريك', employees: 0, systems: 'صندوق الدعم', status: 'partner' },
        { name: 'معبر', code: 'MBR', manager: 'شراكة', employees: 0, systems: '-', status: 'partner' },
      ]);

      this.pendingItems.set([
        { person: 'علي الصعدي - حساب 2023', description: 'صندوق مخلوط فيه عجز - يحتاج تصفية كاملة', status: 'معلق' },
        { person: 'أمجد الصلوي', description: 'حساب العدادات فيه شعبطة كبيرة', status: 'معلق' },
        { person: 'المهندس محمد حسن', description: 'شاشات وقواطع - له سنة ما كمل', status: 'معلق' },
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
