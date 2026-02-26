import { Component, signal, inject, OnInit } from '@angular/core';
import { ApiService, type DashboardStats } from '../../services/api.service';
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
  stats = signal<DashboardStats | null>(null);

  statCards = signal<StatCard[]>([]);

  quickActions: QuickAction[] = [
    { icon: 'add_circle', label: 'حركة مالية جديدة', route: '/transactions/new', color: '#3b82f6' },
    { icon: 'arrow_downward', label: 'تسجيل مدخول', route: '/income/new', color: '#22c55e' },
    { icon: 'arrow_upward', label: 'تسجيل مخروج', route: '/expenses/new', color: '#ef4444' },
    { icon: 'swap_horiz', label: 'تحويل بين حسابات', route: '/transactions/transfer', color: '#a855f7' },
    { icon: 'receipt_long', label: 'فاتورة مشتريات', route: '/purchases/new', color: '#f59e0b' },
    { icon: 'balance', label: 'تصفية حساب', route: '/reconciliation/new', color: '#06b6d4' },
  ];

  stations = signal<any[]>([]);

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.isLoading.set(true);
    try {
      // For demo, use mock data since DB might not be running
      const mockStats: DashboardStats = {
        stations: 5,
        employees: 24,
        accounts: 28,
        funds: 16,
        suppliers: 8,
        partners: 3,
        transactions: 0,
        totalSalaries: '3830000',
      };

      this.stats.set(mockStats);
      this.statCards.set([
        { icon: 'bolt', label: 'المحطات', value: mockStats.stations, color: '#f59e0b', gradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(217, 119, 6, 0.08))' },
        { icon: 'people', label: 'الموظفين', value: mockStats.employees, color: '#3b82f6', gradient: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(37, 99, 235, 0.08))' },
        { icon: 'account_balance_wallet', label: 'الحسابات', value: mockStats.accounts, color: '#8b5cf6', gradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(124, 58, 237, 0.08))' },
        { icon: 'inventory_2', label: 'الصناديق', value: mockStats.funds, color: '#06b6d4', gradient: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(8, 145, 178, 0.08))' },
        { icon: 'local_shipping', label: 'الموردين', value: mockStats.suppliers, color: '#22c55e', gradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.15), rgba(22, 163, 74, 0.08))' },
        { icon: 'handshake', label: 'الشركاء', value: mockStats.partners, color: '#ec4899', gradient: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15), rgba(219, 39, 119, 0.08))' },
        { icon: 'payments', label: 'إجمالي الرواتب', value: formatNumber(mockStats.totalSalaries) + ' ر.ي', color: '#ef4444', gradient: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.08))' },
        { icon: 'swap_horiz', label: 'الحركات المالية', value: mockStats.transactions, color: '#64748b', gradient: 'linear-gradient(135deg, rgba(100, 116, 139, 0.15), rgba(71, 85, 105, 0.08))' },
      ]);

      this.stations.set([
        { name: 'الدهمية', code: 'DHM', manager: 'رايد العباسي', employees: 5, status: 'active' },
        { name: 'الصبالية', code: 'SBL', manager: 'علي المجهلي', employees: 10, status: 'active' },
        { name: 'جمال', code: 'JML', manager: 'علي المجهلي', employees: 0, status: 'active' },
        { name: 'غليل', code: 'GHL', manager: 'قايد حسن العباسي', employees: 8, status: 'active' },
        { name: 'الساحل الغربي', code: 'WST', manager: '-', employees: 0, status: 'inactive' },
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  formatCurrency(value: string | number): string {
    return formatNumber(String(value));
  }
}

function formatNumber(value: string): string {
  const num = parseInt(value);
  if (isNaN(num)) return '0';
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',') + 'K';
  return num.toLocaleString('ar-SA');
}
