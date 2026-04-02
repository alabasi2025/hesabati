import { Component, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ColorPickerDirective } from 'ngx-color-picker';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { WebSocketService } from '../../services/websocket.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { ACCOUNT_TYPE_META, getAccTypeMeta } from '../../shared/constants/account-types';
import { formatAmount as formatAmountShared, formatAmountPrecise, formatDate as formatDateShared } from '../../shared/helpers';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';
import { takeUntil } from 'rxjs';

// ===== Tab Type Definitions =====
interface TabDefinition {
  id: string;
  label: string;
  icon: string;
  color: string;
  type: 'operations' | 'log' | 'accounts' | 'stats' | 'chart' | 'notes' | 'inventory' | 'reports';
  sortOrder: number;
  config: any;
}

interface ScreenTemplate {
  id: number;
  businessId: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  layoutConfig: any;
  templateKey: string;
  isSystem: boolean;
  isActive: boolean;
  createdBy?: number;
  createdAt: string;
  updatedAt: string;
}

interface LogEntry {
  id: number;
  entry_number: string;
  description: string;
  entry_date: string;
  reference: string;
  total_debit: string;
  total_credit: string;
  status: string;
  created_at: string;
  operation_type_name: string;
  operation_type_icon: string;
  operation_type_color: string;
  voucher_type: string;
  operation_category: string;
}

interface AccountData {
  id: number;
  name: string;
  account_type: string;
  is_active: boolean;
  total_balance: number;
  balances: any[];
  last_movements: any[];
}

// ===== Tab Type Options (for wizard) =====
const TAB_TYPE_OPTIONS = [
  { value: 'operations', label: 'قوالب عمليات', icon: 'receipt_long', desc: 'أزرار لتنفيذ عمليات (تحصيل/توريد/تحويل)', color: '#3b82f6', defaultIcon: 'receipt_long', defaultColor: '#3b82f6' },
  { value: 'log', label: 'سجل العمليات', icon: 'history', desc: 'جدول العمليات مع فلاتر وإحصائيات', color: '#22c55e', defaultIcon: 'history', defaultColor: '#6366f1' },
  { value: 'accounts', label: 'مراقبة حسابات', icon: 'account_balance', desc: 'عرض أرصدة حسابات مع اتجاه وآخر حركة', color: '#f59e0b', defaultIcon: 'savings', defaultColor: '#10b981' },
  { value: 'inventory', label: 'مراقبة أصناف', icon: 'inventory_2', desc: 'عرض أصناف المخازن مع الكميات والتكاليف وآخر حركة', color: '#0ea5e9', defaultIcon: 'inventory_2', defaultColor: '#0ea5e9' },
  { value: 'stats', label: 'إحصائيات', icon: 'analytics', desc: 'أرقام ملخصة (تحصيل، صرف، عدد عمليات، صافي)', color: '#8b5cf6', defaultIcon: 'analytics', defaultColor: '#8b5cf6' },
  { value: 'chart', label: 'رسم بياني', icon: 'bar_chart', desc: 'رسم بياني للتحصيل والصرف', color: '#14b8a6', defaultIcon: 'bar_chart', defaultColor: '#14b8a6' },
  { value: 'reports', label: 'تقارير', icon: 'summarize', desc: 'استخراج تقارير للحسابات المختارة', color: '#ec4899', defaultIcon: 'summarize', defaultColor: '#ec4899' },
  { value: 'notes', label: 'ملاحظات', icon: 'sticky_note_2', desc: 'منطقة نص حر مع حفظ تلقائي', color: '#f97316', defaultIcon: 'sticky_note_2', defaultColor: '#f97316' },
];

@Component({
  selector: 'app-custom-screens',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective, ColorPickerDirective, CdkDrag, CdkDropList,
    LoadingStateComponent, StatusBadgeComponent],
  templateUrl: './custom-screens.html',
  styleUrl: './custom-screens.scss',
})
export class CustomScreensComponent extends BasePageComponent implements OnDestroy {
  private readonly api = inject(ApiService);
  private readonly auth = inject(AuthService);
  private readonly toast = inject(ToastService);
  private readonly wsService = inject(WebSocketService);

  loading = signal(true);
  saving = signal(false);

  // ===================== Data =====================
  screens = signal<ScreenTemplate[]>([]);
  activeScreen = signal<ScreenTemplate | null>(null);

  // ===================== UI State =====================
  viewMode = signal<'list' | 'wizard' | 'screen'>('list');
  openedFromSidebar = signal(false);

  // ===================== Dynamic Tabs (Screen View) =====================
  screenTabs = signal<TabDefinition[]>([]);
  activeTabId = signal('');
  screenNotes = signal('');
  private notesSaveTimeout: any = null;

  // ===================== Tab Data (loaded per tab) =====================
  operationTypes = signal<any[]>([]);
  allAccounts = signal<any[]>([]);

  // Operations tab
  csSelectedOpType = signal<any>(null);
  csFormEntries = signal<any[]>([]);
  csFormDescription = signal('');
  csFormDate = signal(new Date().toISOString().split('T')[0]);

  // Log tab
  logEntries = signal<LogEntry[]>([]);
  logTotal = signal(0);
  logFilterDateFrom = signal('');
  logFilterDateTo = signal('');
  logFilterOpType = signal('');
  logSearchQuery = signal('');
  logMinAmount = signal<number | null>(null);
  logMaxAmount = signal<number | null>(null);
  logPage = signal(1);
  logPageSize = signal(20);
  logSortBy = signal('entry_date');
  logSortDir = signal<'asc' | 'desc'>('desc');

  // Auto-refresh
  autoRefreshEnabled = signal(false);
  private autoRefreshInterval: any = null;
  autoRefreshCountdown = signal(30);
  private countdownInterval: any = null;

  // Chart period filter
  chartGroupBy = signal<'weekly' | 'monthly' | 'yearly'>('monthly');
  chartMonths = signal(6);
  chartDateFrom = signal('');
  chartDateTo = signal('');

  // Stats period filter
  statsPeriod = signal<'all' | 'today' | 'week' | 'month' | 'year'>('all');
  statsDateFrom = signal('');
  statsDateTo = signal('');

  // Voucher details modal
  showVoucherDetails = signal(false);
  selectedVoucherDetails = signal<any>(null);
  voucherDetailsLoading = signal(false);

  // Accounts tab
  widgetAccounts = signal<AccountData[]>([]);

  // Inventory tab (مراقبة الأصناف)
  widgetInventory = signal<any[]>([]);
  inventoryWarehouses = signal<any[]>([]);

  // Stats tab
  widgetStats = signal<any>({ totalReceipts: 0, totalPayments: 0, operationsCount: 0, netBalance: 0 });

  // Chart tab
  barChartData: ChartConfiguration<'bar'>['data'] = { labels: [], datasets: [
    { data: [], label: 'التحصيل', backgroundColor: 'rgba(59, 130, 246, 0.6)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1, borderRadius: 6 },
    { data: [], label: 'الصرف', backgroundColor: 'rgba(239, 68, 68, 0.6)', borderColor: 'rgba(239, 68, 68, 1)', borderWidth: 1, borderRadius: 6 },
  ]};
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { position: 'top', labels: { font: { family: 'Tajawal', size: 12 }, padding: 16 } } },
    scales: {
      y: { beginAtZero: true, ticks: { font: { family: 'Tajawal', size: 11 } }, grid: { color: 'rgba(0,0,0,0.05)' } },
      x: { ticks: { font: { family: 'Tajawal', size: 11 } }, grid: { display: false } },
    },
  };

  // ===================== Wizard State =====================
  wizardStep = signal(1); // 1=basic info, 2=add tabs, 3+=configure each tab, last=preview
  wizardScreenName = signal('');
  wizardScreenDesc = signal('');
  wizardScreenIcon = signal('dashboard');
  wizardScreenColor = signal('#3b82f6');
  wizardAddToSidebar = signal(true);
  wizardSidebarSectionId = signal(0);
  wizardSidebarSortOrder = signal(0);
  wizardSidebarSections = signal<any[]>([]);
  wizardTabs = signal<TabDefinition[]>([]);
  wizardConfigTabIdx = signal(0); // which tab is being configured in step 3+
  wizardIsEditing = signal(false); // true if editing existing screen

  // ===================== Account Filter (for accounts tab config) =====================
  accFilterType = signal('all');
  accSearchQuery = signal('');

  accDynamicFilters = computed(() => {
    const all = this.allAccounts();
    const typesInDB = [...new Set(all.map(a => a.accountType).filter(Boolean))];
    const priority = ['billing', 'fund', 'bank', 'exchange', 'e_wallet', 'warehouse', 'custody', 'supplier', 'employee', 'partner', 'budget', 'settlement', 'pending', 'accounting'];
    const sorted = typesInDB.sort((a: string, b: string) => {
      const ia = priority.indexOf(a); const ib = priority.indexOf(b);
      if (ia >= 0 && ib >= 0) return ia - ib;
      if (ia >= 0) return -1; if (ib >= 0) return 1;
      return getAccTypeMeta(a).label.localeCompare(getAccTypeMeta(b).label, 'ar');
    });
    return sorted.map(type => ({ value: type, ...getAccTypeMeta(type) }));
  });

  accFiltered = computed(() => {
    const type = this.accFilterType();
    const q = this.accSearchQuery().toLowerCase();
    return this.allAccounts().filter(a => {
      const matchType = type === 'all' || a.accountType === type;
      const matchQ = !q || (a.name || '').toLowerCase().includes(q) || (a.provider || '').toLowerCase().includes(q) || (a.subType || '').toLowerCase().includes(q);
      return matchType && matchQ;
    });
  });

  // ===================== Config Wizard (for existing screens) =====================
  showConfigWizard = signal(false);
  configWizardStep = signal(1);
  configWizardTabs = signal<TabDefinition[]>([]);
  configWizardConfigTabIdx = signal(0);

  // ===================== Permissions Modal =====================
  showPermissionsModal = signal(false);
  permissionsScreen = signal<ScreenTemplate | null>(null);
  permissionsUsers = signal<any[]>([]);
  permissionsMap = signal<{ [userId: number]: string }>({});
  permissionsLoading = signal(false);

  // ===================== Screen Form Modal (Edit name/icon/color) =====================
  showScreenForm = signal(false);
  editingScreen = signal<ScreenTemplate | null>(null);
  screenForm = signal({ name: '', description: '', icon: 'dashboard', color: '#3b82f6' });

  // ===================== Add to Sidebar Modal =====================
  showSidebarModal = signal(false);
  sidebarScreen = signal<ScreenTemplate | null>(null);
  sidebarSections = signal<any[]>([]);
  selectedSidebarSection = signal(0);
  sidebarSortOrder = signal(99);

  // ===================== Embedded Reports =====================
  reportLoading = signal(false);
  reportData = signal<any>(null);
  reportType = signal('');
  reportDateFrom = signal('');
  reportDateTo = signal('');

  // ===================== Options =====================
  tabTypeOptions = TAB_TYPE_OPTIONS;

  icons = [
    'dashboard', 'bolt', 'receipt_long', 'receipt', 'account_balance_wallet',
    'category', 'savings', 'menu_book', 'currency_exchange', 'groups',
    'handshake', 'warehouse', 'local_shipping', 'balance', 'assessment',
    'monitor', 'grid_view', 'view_module', 'widgets', 'space_dashboard',
    'analytics', 'pie_chart', 'bar_chart', 'trending_up', 'speed',
    'history', 'sticky_note_2', 'arrow_downward', 'arrow_upward',
    'call_received', 'call_made', 'payments', 'lock', 'miscellaneous_services',
  ];

  colors = [
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#14b8a6', '#f97316', '#ec4899', '#06b6d4', '#84cc16',
  ];

  // ===================== Lifecycle =====================
  private wsEffect: any = null;

  constructor() {
    super();
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe(async (qp) => {
      if (qp['screen']) {
        this.openedFromSidebar.set(true);
        const screenId = Number.parseInt(qp['screen'], 10);
        const screen = this.screens().find(s => s.id === screenId);
        if (screen) await this.openScreen(screen);
      }
    });
  }

  protected override onBizIdChange(_bizId: number): void {
    void this.loadScreens();
    this.loadCurrencies();
    try {
      if (this.auth.isLoggedIn() && this.bizId) {
        this.wsService.connect('cookie', this.bizId);
      }
    } catch (e) { /* WebSocket optional */ }
  }

  override ngOnDestroy(): void {
    if (this.notesSaveTimeout) clearTimeout(this.notesSaveTimeout);
    this.stopAutoRefresh();
    this.wsService.disconnect();
    super.ngOnDestroy();
  }

  // ===================== Load Data =====================
  async loadScreens() {
    this.loading.set(true);
    try {
      const data = await this.api.getScreens(this.bizId);
      this.screens.set(data);
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'خطأ في تحميل الشاشات');
    } finally {
      this.loading.set(false);
    }
  }

  // ===================== Open Screen (Dynamic Tabs) =====================
  async openScreen(screen: ScreenTemplate) {
    this.activeScreen.set(screen);
    this.viewMode.set('screen');
    this.loading.set(true);

    try {
      // Load config (tabs)
      const config = await this.api.getCollectionStyleConfig(this.bizId, screen.id);
      const tabs: TabDefinition[] = config.tabs || [];
      this.screenTabs.set(tabs);
      this.screenNotes.set(config.notes || '');

      // Set first tab as active
      if (tabs.length > 0) {
        this.activeTabId.set(tabs[0].id);
      }

      // Load shared data
      const [opTypes, accountsData] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId),
      ]);
      this.operationTypes.set(opTypes);
      this.allAccounts.set(accountsData.accounts || []);

      // Load data for each tab type
      await this.loadTabsData(tabs);
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'خطأ في تحميل الشاشة');
    } finally {
      this.loading.set(false);
    }
  }

  async loadTabsData(tabs: TabDefinition[]) {
    const types = new Set(tabs.map(t => t.type));
    const promises: Promise<void>[] = [];

    if (types.has('log')) promises.push(this.loadLogData());
    if (types.has('stats')) promises.push(this.loadStatsData());
    if (types.has('chart')) promises.push(this.loadChartData());

    // Load accounts for accounts tabs
    const accountTabs = tabs.filter(t => t.type === 'accounts');
    if (accountTabs.length > 0) {
      const allAccountIds = new Set<number>();
      accountTabs.forEach(t => (t.config?.accountIds || []).forEach((id: number) => allAccountIds.add(id)));
      if (allAccountIds.size > 0) {
        promises.push(this.loadAccountsData(Array.from(allAccountIds)));
      }
    }

    // Load inventory for inventory tabs
    const inventoryTabs = tabs.filter(t => t.type === 'inventory');
    if (inventoryTabs.length > 0) {
      const allWarehouseIds = new Set<number>();
      inventoryTabs.forEach(t => (t.config?.warehouseIds || []).forEach((id: number) => allWarehouseIds.add(id)));
      if (allWarehouseIds.size > 0) {
        promises.push(this.loadInventoryData(Array.from(allWarehouseIds)));
      }
    }

    await Promise.allSettled(promises);
  }

  async loadLogData() {
    try {
      const filters: any = {
        limit: this.logPageSize(),
        offset: (this.logPage() - 1) * this.logPageSize(),
      };
      if (this.logFilterDateFrom()) filters.dateFrom = this.logFilterDateFrom();
      if (this.logFilterDateTo()) filters.dateTo = this.logFilterDateTo();
      if (this.logFilterOpType()) filters.operationTypeId = Number.parseInt(this.logFilterOpType(), 10);
      if (this.logSearchQuery()) filters.search = this.logSearchQuery();
      if (this.logMinAmount()) filters.minAmount = this.logMinAmount();
      if (this.logMaxAmount()) filters.maxAmount = this.logMaxAmount();
      const result = await this.api.getWidgetLogEnhanced(this.bizId, filters);
      this.logEntries.set(result.entries || []);
      this.logTotal.set(result.total || 0);
    } catch (e) {
      // fallback to old API
      try {
        const filters: any = { limit: 50 };
        if (this.logFilterDateFrom()) filters.dateFrom = this.logFilterDateFrom();
        if (this.logFilterDateTo()) filters.dateTo = this.logFilterDateTo();
        if (this.logFilterOpType()) filters.operationTypeId = Number.parseInt(this.logFilterOpType(), 10);
        const result = await this.api.getWidgetLog(this.bizId, filters);
        this.logEntries.set(result.entries || []);
        this.logTotal.set(result.total || 0);
      } catch (e2) { console.error('Error loading log:', e2); }
    }
  }

  // Pagination
  get logTotalPages(): number {
    return Math.ceil(this.logTotal() / this.logPageSize()) || 1;
  }

  async goToLogPage(page: number) {
    if (page < 1 || page > this.logTotalPages) return;
    this.logPage.set(page);
    await this.loadLogData();
  }

  getLogPageNumbers(): number[] {
    const total = this.logTotalPages;
    const current = this.logPage();
    const pages: number[] = [];
    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }

  // Sort
  toggleLogSort(column: string) {
    if (this.logSortBy() === column) {
      this.logSortDir.set(this.logSortDir() === 'asc' ? 'desc' : 'asc');
    } else {
      this.logSortBy.set(column);
      this.logSortDir.set('desc');
    }
    this.logPage.set(1);
    this.loadLogData();
  }

  // Auto-refresh
  toggleAutoRefresh() {
    if (this.autoRefreshEnabled()) {
      this.stopAutoRefresh();
    } else {
      this.startAutoRefresh();
    }
  }

  private startAutoRefresh() {
    this.autoRefreshEnabled.set(true);
    this.autoRefreshCountdown.set(30);
    this.countdownInterval = setInterval(() => {
      this.autoRefreshCountdown.update(c => c - 1);
    }, 1000);
    this.autoRefreshInterval = setInterval(async () => {
      this.autoRefreshCountdown.set(30);
      const screen = this.activeScreen();
      if (screen) {
        const tabs = this.screenTabs();
        await this.loadTabsData(tabs);
      }
    }, 30000);
  }

  private stopAutoRefresh() {
    this.autoRefreshEnabled.set(false);
    if (this.autoRefreshInterval) { clearInterval(this.autoRefreshInterval); this.autoRefreshInterval = null; }
    if (this.countdownInterval) { clearInterval(this.countdownInterval); this.countdownInterval = null; }
  }

  // Voucher Details
  async openVoucherDetails(entryId: number) {
    this.voucherDetailsLoading.set(true);
    this.showVoucherDetails.set(true);
    try {
      const details = await this.api.getVoucherDetails(this.bizId, entryId);
      this.selectedVoucherDetails.set(details);
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'خطأ في جلب التفاصيل');
      this.showVoucherDetails.set(false);
    } finally {
      this.voucherDetailsLoading.set(false);
    }
  }

  closeVoucherDetails() {
    this.showVoucherDetails.set(false);
    this.selectedVoucherDetails.set(null);
  }

  async loadStatsData() {
    try {
      const stats = await this.api.getWidgetStatsEnhanced(
        this.bizId,
        this.statsPeriod() !== 'all' ? this.statsPeriod() : undefined,
        this.statsDateFrom() || undefined,
        this.statsDateTo() || undefined
      );
      this.widgetStats.set(stats);
    } catch (e) {
      try {
        const stats = await this.api.getWidgetStats(this.bizId);
        this.widgetStats.set(stats);
      } catch (e2) { console.error('Error loading stats:', e2); }
    }
  }

  async changeStatsPeriod(period: string) {
    this.statsPeriod.set(period as any);
    await this.loadStatsData();
  }

  async loadChartData() {
    try {
      const chartData = await this.api.getWidgetChartEnhanced(
        this.bizId,
        this.chartGroupBy(),
        this.chartMonths(),
        this.chartDateFrom() || undefined,
        this.chartDateTo() || undefined
      );
      this.barChartData = {
        labels: chartData.labels || [],
        datasets: [
          { data: chartData.receipts || [], label: 'التحصيل', backgroundColor: 'rgba(59, 130, 246, 0.6)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1, borderRadius: 6 },
          { data: chartData.payments || [], label: 'الصرف', backgroundColor: 'rgba(239, 68, 68, 0.6)', borderColor: 'rgba(239, 68, 68, 1)', borderWidth: 1, borderRadius: 6 },
        ],
      };
    } catch (e) {
      try {
        const chartData = await this.api.getWidgetChart(this.bizId, 6);
        this.barChartData = {
          labels: chartData.labels || [],
          datasets: [
            { data: chartData.receipts || [], label: 'التحصيل', backgroundColor: 'rgba(59, 130, 246, 0.6)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 1, borderRadius: 6 },
            { data: chartData.payments || [], label: 'الصرف', backgroundColor: 'rgba(239, 68, 68, 0.6)', borderColor: 'rgba(239, 68, 68, 1)', borderWidth: 1, borderRadius: 6 },
          ],
        };
      } catch (e2) { console.error('Error loading chart:', e2); }
    }
  }

  async changeChartGroupBy(groupBy: string) {
    this.chartGroupBy.set(groupBy as any);
    await this.loadChartData();
  }

  async changeChartMonths(months: number) {
    this.chartMonths.set(months);
    await this.loadChartData();
  }

  async loadAccountsData(accountIds: number[]) {
    try {
      const accounts = await this.api.getWidgetAccounts(this.bizId, accountIds);
      this.widgetAccounts.set(accounts);
    } catch (e) { console.error('Error loading accounts:', e); }
  }

  async loadInventoryData(warehouseIds: number[]) {
    try {
      const results: any[] = [];
      for (const whId of warehouseIds) {
        const inventory = await this.api.getWarehouseInventory(this.bizId, whId);
        results.push(...(inventory || []));
      }
      this.widgetInventory.set(results);
    } catch (e) { console.error('خطأ في تحميل بيانات المخزون:', e); }
  }

  // ===================== Tab Helpers =====================
  setActiveTab(tabId: string) { this.activeTabId.set(tabId); }

  getTabOperationTypes(tab: TabDefinition): any[] {
    const ids = tab.config?.operationTypeIds || [];
    if (ids.length === 0) return this.operationTypes();
    return this.operationTypes().filter((ot: any) => ids.includes(ot.id));
  }

  getTabAccounts(tab: TabDefinition): AccountData[] {
    const ids = tab.config?.accountIds || [];
    if (ids.length === 0) return this.widgetAccounts();
    return this.widgetAccounts().filter((a: any) => ids.includes(a.id));
  }

  getTabInventory(tab: TabDefinition): any[] {
    const ids = tab.config?.warehouseIds || [];
    if (ids.length === 0) return this.widgetInventory();
    return this.widgetInventory().filter((item: any) => ids.includes(item.warehouseId));
  }

  getStatsCards(): { label: string; value: string; icon: string; color: string }[] {
    const s = this.widgetStats();
    return [
      { label: 'إجمالي التحصيل', value: this.formatNumber(s.totalReceipts), icon: 'trending_up', color: '#22c55e' },
      { label: 'إجمالي الصرف', value: this.formatNumber(s.totalPayments), icon: 'trending_down', color: '#ef4444' },
      { label: 'عدد العمليات', value: String(s.operationsCount), icon: 'receipt_long', color: '#3b82f6' },
      { label: 'صافي الرصيد', value: this.formatNumber(s.netBalance), icon: 'account_balance', color: '#8b5cf6' },
    ];
  }

  getTotalAccountsBalance(): number {
    return this.widgetAccounts().reduce((sum, a) => sum + (a.total_balance || 0), 0);
  }

  // ===================== Operations Form =====================
  selectOpType(ot: any) {
    this.csSelectedOpType.set(ot);
    const accounts = ot.linkedAccounts || ot.accounts || [];
    const entries = accounts.filter((la: any) => la.isActive !== false).map((la: any) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || '',
      amount: '', notes: '',
    }));
    if (entries.length === 0) entries.push({ accountId: null, accountName: '', amount: '', notes: '' });
    this.csFormEntries.set(entries);
    this.csFormDescription.set('');
    this.csFormDate.set(new Date().toISOString().split('T')[0]);
  }

  cancelOpType() { this.csSelectedOpType.set(null); this.csFormEntries.set([]); }

  updateFormEntry(index: number, field: string, value: string) {
    this.csFormEntries.update(entries => {
      const updated = [...entries];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  getFormTotal(): number {
    return this.csFormEntries().reduce((sum, e) => { const amt = Number.parseFloat(e.amount); return sum + (Number.isNaN(amt) ? 0 : amt); }, 0);
  }

  getFilledEntriesCount(): number {
    return this.csFormEntries().filter(e => Number.parseFloat(e.amount) > 0).length;
  }

  getAccountBalance(accountId: number): number {
    const acc = this.widgetAccounts().find(a => a.id === accountId);
    return acc?.total_balance || 0;
  }

  // Currencies for multi-currency support
  currencies = signal<any[]>([]);
  csFormCurrencyId = signal<number>(1);
  // Transfer mode
  csTransferFromAccountId = signal<number | null>(null);
  csTransferToAccountId = signal<number | null>(null);
  csTransferAmount = signal<string>('');

  async loadCurrencies() {
    try { const c = await this.api.getCurrencies(); this.currencies.set(c || []); } catch (e) { /* fallback */ }
  }

  isTransferType(): boolean {
    const ot = this.csSelectedOpType();
    return ot && (ot.voucherType === 'transfer' || ot.voucherType === 'journal' || (ot.name || '').includes('تحويل'));
  }

  async saveOperation() {
    const opType = this.csSelectedOpType();
    if (!opType) return;

    // Transfer operation
    if (this.isTransferType()) {
      const fromId = this.csTransferFromAccountId();
      const toId = this.csTransferToAccountId();
      const amount = Number.parseFloat(this.csTransferAmount());
      if (!fromId || !toId) { this.toast.warning('اختر حساب المصدر والوجهة'); return; }
      if (fromId === toId) { this.toast.warning('لا يمكن التحويل لنفس الحساب'); return; }
      if (!amount || amount <= 0) { this.toast.warning('أدخل مبلغاً صحيحاً'); return; }

      const fromAcc = this.allAccounts().find(a => a.id === fromId);
      const toAcc = this.allAccounts().find(a => a.id === toId);
      const confirmed = await this.toast.confirm({
        title: `تأكيد تحويل - ${opType.name}`,
        message: `تحويل ${amount.toLocaleString('ar-SA')} من "${fromAcc?.name || fromId}" إلى "${toAcc?.name || toId}"`,
        type: 'info',
      });
      if (!confirmed) return;

      this.saving.set(true);
      try {
        const result = await this.api.createVoucher(this.bizId, {
          voucherType: 'journal', operationTypeId: opType.id,
          fromAccountId: fromId, toAccountId: toId,
          amount, currencyId: this.csFormCurrencyId(),
          description: this.csFormDescription() || `${opType.name} - تحويل`,
          voucherDate: this.csFormDate(),
        });
        this.toast.success(`تم التحويل بنجاح - ${amount.toLocaleString('ar-SA')}`);
        this.csSelectedOpType.set(null); this.csTransferFromAccountId.set(null); this.csTransferToAccountId.set(null); this.csTransferAmount.set('');
        const screen = this.activeScreen();
        if (screen) await this.openScreen(screen);
      } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ في التحويل'); }
      finally { this.saving.set(false); }
      return;
    }

    // Regular operation (receipt/payment)
    const entries = this.csFormEntries().filter(e => Number.parseFloat(e.amount) > 0);
    if (!entries.length) { this.toast.warning('أدخل مبلغاً واحداً على الأقل'); return; }

    const total = this.getFormTotal();
    const vTypeLabel = opType.voucherType === 'receipt' ? 'تحصيل' : opType.voucherType === 'payment' ? 'توريد' : 'عملية';
    const vType: 'receipt' | 'payment' = (opType.voucherType === 'payment' ? 'payment' : 'receipt');
    const useMulti = opType.hasMultiLines !== false;
    // إلزامية تحديد الخزينة (المصدر) في القالب قبل التنفيذ
    const pm = String(opType.paymentMethod || '').trim();
    if (!pm) { this.toast.warning('حدد وسيلة الدفع والخزينة (المصدر) في القالب قبل التنفيذ'); return; }
    if (pm === 'cash') {
      if (!opType.sourceFundId) { this.toast.warning('حدد الخزينة (الصندوق) في القالب قبل التنفيذ'); return; }
    } else {
      if (!opType.sourceAccountId) { this.toast.warning('حدد الخزينة (حساب بنك/صراف/محفظة) في القالب قبل التنفيذ'); return; }
    }
    const summaryLines = entries.map(e => `\u2022 ${e.accountName}: ${Number.parseFloat(e.amount).toLocaleString('ar-SA')}`).join('\n');
    const confirmed = await this.toast.confirm({
      title: `تأكيد ${vTypeLabel} - ${opType.name}`,
      message: useMulti
        ? `سيتم إنشاء سند ${vTypeLabel} واحد (متعدد) يحتوي على ${entries.length} سطور بإجمالي ${total.toLocaleString('ar-SA')}:\n${summaryLines}`
        : `سيتم تنفيذ ${entries.length} سند بإجمالي ${total.toLocaleString('ar-SA')}:\n${summaryLines}`,
      type: opType.voucherType === 'payment' ? 'danger' : 'info',
    });
    if (!confirmed) return;

    this.saving.set(true);
    const results: any[] = []; const errors: string[] = [];
    try {
      if (useMulti) {
        // سند واحد متعدد السطور - يعتمد على القالب لتحديد الطرف الأول (المصدر)
        const result = await this.api.createVoucherMulti(this.bizId, {
          voucherType: vType,
          operationTypeId: opType.id,
          currencyId: this.csFormCurrencyId(),
          description: this.csFormDescription() || `${opType.name}`,
          voucherDate: this.csFormDate(),
          entries: entries.map(e => ({
            accountId: e.accountId,
            amount: Number.parseFloat(e.amount),
            notes: e.notes || null,
          })),
        });
        results.push(result);
      } else {
        // سندات منفصلة - كل سطر = سند مستقل
        for (const entry of entries) {
          try {
            const payload: any = {
              voucherType: vType,
              operationTypeId: opType.id,
              amount: Number.parseFloat(entry.amount),
              currencyId: this.csFormCurrencyId(),
              description: this.csFormDescription() || `${opType.name} - ${entry.accountName}`,
              voucherDate: this.csFormDate(),
            };

            // منطق القالب:
            // - سند قبض: الطرف الأول (المصدر) يستلم ← القالب يحدد toAccountId (sourceAccountId)
            // - الطرف الثاني (المرتبط) يُقبض منه ← fromAccountId = حساب السطر
            if (vType === 'receipt') {
              payload.fromAccountId = entry.accountId;
            } else {
              // سند صرف: الطرف الأول (المصدر) يصرف ← القالب يحدد fromAccountId (sourceAccountId)
              // الطرف الثاني يستلم ← toAccountId = حساب السطر
              payload.toAccountId = entry.accountId;
            }

            const result = await this.api.createVoucher(this.bizId, payload);
            results.push(result);
          } catch (e: unknown) {
            errors.push(`${entry.accountName}: ${e instanceof Error ? e.message : 'خطأ'}`);
          }
        }
      }

      if (results.length > 0 && errors.length === 0) {
        const countLabel = useMulti ? 'سند واحد' : `${results.length} سند`;
        const vNo = (results[0] as any)?.voucherNumber ? ` (رقم: ${(results[0] as any).voucherNumber})` : '';
        this.toast.success(`تم تنفيذ ${countLabel} بنجاح - إجمالي: ${total.toLocaleString('ar-SA')}${vNo}`);
      } else if (results.length > 0) {
        this.toast.warning(`تم ${results.length} عملية بنجاح، فشلت ${errors.length}`);
      } else {
        this.toast.error(errors.length > 0 ? errors[0] : 'فشلت العمليات');
      }

      if (results.length > 0) { this.csSelectedOpType.set(null); this.csFormEntries.set([]); this.csFormCurrencyId.set(1); }
      const screen = this.activeScreen();
      if (screen) await this.openScreen(screen);
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ في تنفيذ العملية'); }
    finally { this.saving.set(false); }
  }

  // ===================== Log Filters =====================
  async applyLogFilters() {
    this.logPage.set(1);
    await this.loadLogData();
  }
  async clearLogFilters() {
    this.logFilterDateFrom.set(''); this.logFilterDateTo.set(''); this.logFilterOpType.set('');
    this.logSearchQuery.set(''); this.logMinAmount.set(null); this.logMaxAmount.set(null);
    this.logPage.set(1);
    await this.loadLogData();
  }

  // ===================== Notes =====================
  onNotesChange(text: string) {
    this.screenNotes.set(text);
    if (this.notesSaveTimeout) clearTimeout(this.notesSaveTimeout);
    this.notesSaveTimeout = setTimeout(async () => {
      const screen = this.activeScreen();
      if (!screen) return;
      try {
        const tabs = this.screenTabs();
        await this.api.saveCollectionStyleConfig(this.bizId, screen.id, { tabs, notes: text });
      } catch (e) { console.error('Error auto-saving notes:', e); }
    }, 2000);
  }

  // ===================== WIZARD (Create New Screen) =====================
  startWizard() {
    this.viewMode.set('wizard');
    this.wizardStep.set(1);
    this.wizardScreenName.set('');
    this.wizardScreenDesc.set('');
    this.wizardScreenIcon.set('dashboard');
    this.wizardScreenColor.set('#3b82f6');
    this.wizardAddToSidebar.set(true);
    this.wizardSidebarSectionId.set(0);
    this.wizardSidebarSortOrder.set(0);
    this.wizardTabs.set([]);
    this.wizardConfigTabIdx.set(0);
    this.wizardIsEditing.set(false);
    this.loadWizardData();
  }

  async loadWizardData() {
    try {
      const [sections, opTypes, accountsData, warehouses] = await Promise.all([
        this.api.getSidebarSections(this.bizId),
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId),
        this.api.getWarehouses(this.bizId),
      ]);
      this.wizardSidebarSections.set(sections);
      if (sections.length > 0) this.wizardSidebarSectionId.set(sections[0].id);
      this.operationTypes.set(opTypes);
      this.allAccounts.set(accountsData.accounts || []);
      this.inventoryWarehouses.set(warehouses || []);
    } catch (e) { console.error('Error loading wizard data:', e); }
  }

  cancelWizard() { this.viewMode.set('list'); }

  // Wizard: total steps = 2 (basic + tabs) + number of tabs that need config + 1 (preview)
  getWizardTotalSteps(): number {
    return 2 + this.getConfigurableTabs().length + 1;
  }

  getConfigurableTabs(): TabDefinition[] {
    return this.wizardTabs().filter(t => t.type === 'operations' || t.type === 'accounts' || t.type === 'inventory');
  }

  getWizardStepTitle(): string {
    const step = this.wizardStep();
    if (step === 1) return 'بيانات الشاشة';
    if (step === 2) return 'إضافة التبويبات';
    const configTabs = this.getConfigurableTabs();
    const configIdx = step - 3;
    if (configIdx >= 0 && configIdx < configTabs.length) {
      return `إعداد: ${configTabs[configIdx].label}`;
    }
    return 'معاينة وحفظ';
  }

  nextWizardStep() {
    const step = this.wizardStep();
    if (step === 1 && !this.wizardScreenName().trim()) {
      this.toast.warning('يرجى إدخال اسم الشاشة'); return;
    }
    if (step === 2 && this.wizardTabs().length === 0) {
      this.toast.warning('يرجى إضافة تبويب واحد على الأقل'); return;
    }
    const total = this.getWizardTotalSteps();
    if (step < total) {
      this.wizardStep.set(step + 1);
      // Update configTabIdx
      const configIdx = step + 1 - 3;
      if (configIdx >= 0) this.wizardConfigTabIdx.set(configIdx);
    } else {
      this.saveWizardScreen();
    }
  }

  prevWizardStep() {
    const step = this.wizardStep();
    if (step > 1) this.wizardStep.set(step - 1);
  }

  // Wizard: Add tab
  addWizardTab(typeValue: string) {
    const typeInfo = TAB_TYPE_OPTIONS.find(t => t.value === typeValue);
    if (!typeInfo) return;
    const tabs = [...this.wizardTabs()];
    const newTab: TabDefinition = {
      id: `tab_${Date.now()}`,
      label: typeInfo.label,
      icon: typeInfo.defaultIcon,
      color: typeInfo.defaultColor,
      type: typeValue as any,
      sortOrder: tabs.length + 1,
      config: {},
    };
    tabs.push(newTab);
    this.wizardTabs.set(tabs);
  }

  removeWizardTab(idx: number) {
    const tabs = [...this.wizardTabs()];
    tabs.splice(idx, 1);
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.wizardTabs.set(tabs);
  }

  moveWizardTab(idx: number, direction: 'up' | 'down') {
    const tabs = [...this.wizardTabs()];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= tabs.length) return;
    [tabs[idx], tabs[targetIdx]] = [tabs[targetIdx], tabs[idx]];
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.wizardTabs.set(tabs);
  }

  updateWizardTab(idx: number, field: string, value: any) {
    const tabs = [...this.wizardTabs()];
    tabs[idx] = { ...tabs[idx], [field]: value };
    this.wizardTabs.set(tabs);
  }

  // Wizard: Toggle operation type for tab config
  toggleWizardTabOpType(tabIdx: number, opTypeId: number) {
    const tabs = [...this.wizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...(tab.config?.operationTypeIds || [])];
    const idx = ids.indexOf(opTypeId);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(opTypeId);
    tabs[tabIdx] = { ...tab, config: { ...tab.config, operationTypeIds: ids } };
    this.wizardTabs.set(tabs);
  }

  // Wizard: Toggle account for tab config
  toggleWizardTabAccount(tabIdx: number, accountId: number) {
    const tabs = [...this.wizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...(tab.config?.accountIds || [])];
    const idx = ids.indexOf(accountId);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(accountId);
    tabs[tabIdx] = { ...tab, config: { ...tab.config, accountIds: ids } };
    this.wizardTabs.set(tabs);
  }

  setAccFilterType(type: string) { this.accFilterType.set(type); }
  getAccTypeMeta(type: string) { return getAccTypeMeta(type); }

  // Wizard: Toggle warehouse for inventory tab config
  toggleWizardTabWarehouse(tabIdx: number, warehouseId: number) {
    const tabs = [...this.wizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...(tab.config?.warehouseIds || [])];
    const idx = ids.indexOf(warehouseId);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(warehouseId);
    tabs[tabIdx] = { ...tab, config: { ...tab.config, warehouseIds: ids } };
    this.wizardTabs.set(tabs);
  }

  toggleConfigWizardTabWarehouse(tabIdx: number, warehouseId: number) {
    const tabs = [...this.configWizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...(tab.config?.warehouseIds || [])];
    const idx = ids.indexOf(warehouseId);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(warehouseId);
    tabs[tabIdx] = { ...tab, config: { ...tab.config, warehouseIds: ids } };
    this.configWizardTabs.set(tabs);
  }

  async saveWizardScreen() {
    const name = this.wizardScreenName();
    if (!name.trim()) { this.toast.warning('يرجى إدخال اسم الشاشة'); return; }

    this.saving.set(true);
    try {
      const payload: any = {
        name, description: this.wizardScreenDesc(),
        icon: this.wizardScreenIcon(), color: this.wizardScreenColor(),
        templateKey: 'collection_style', widgets: [],
        addToSidebar: this.wizardAddToSidebar(),
      };
      if (this.wizardAddToSidebar()) {
        const sectionId = this.wizardSidebarSectionId();
        if (sectionId) payload.sidebarSectionId = sectionId;
        payload.sidebarSortOrder = this.wizardSidebarSortOrder();
      }

      let screenId: number;
      if (this.wizardIsEditing() && this.activeScreen()) {
        // Update existing screen
        screenId = this.activeScreen()!.id;
        await this.api.updateScreen(screenId, { name, description: this.wizardScreenDesc(), icon: this.wizardScreenIcon(), color: this.wizardScreenColor() });
      } else {
        // Create new screen
        const newScreen = await this.api.createScreen(this.bizId, payload);
        screenId = newScreen.id;
      }

      // Save tabs config
      await this.api.saveCollectionStyleConfig(this.bizId, screenId, { tabs: this.wizardTabs(), notes: '' });

      this.toast.success(this.wizardIsEditing() ? 'تم تحديث الشاشة بنجاح' : 'تم إنشاء الشاشة بنجاح');
      await this.loadScreens();

      const screen = this.screens().find(s => s.id === screenId);
      if (screen) await this.openScreen(screen);
      else this.viewMode.set('list');
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ أثناء الحفظ'); }
    finally { this.saving.set(false); }
  }

  // ===================== Config Wizard (Edit Existing Screen Tabs) =====================
  async openConfigWizard() {
    const screen = this.activeScreen();
    if (!screen) return;
    const config = await this.api.getCollectionStyleConfig(this.bizId, screen.id);
    this.configWizardTabs.set([...(config.tabs || [])]);
    this.configWizardStep.set(1);
    this.configWizardConfigTabIdx.set(0);
    await this.loadWizardData();
    this.showConfigWizard.set(true);
  }

  closeConfigWizard() { this.showConfigWizard.set(false); }

  getConfigWizardTotalSteps(): number {
    return 1 + this.getConfigWizardConfigurableTabs().length + 1;
  }

  getConfigWizardConfigurableTabs(): TabDefinition[] {
    return this.configWizardTabs().filter(t => t.type === 'operations' || t.type === 'accounts' || t.type === 'inventory');
  }

  nextConfigWizardStep() {
    const step = this.configWizardStep();
    const total = this.getConfigWizardTotalSteps();
    if (step === 1 && this.configWizardTabs().length === 0) {
      this.toast.warning('يرجى إضافة تبويب واحد على الأقل'); return;
    }
    if (step < total) {
      this.configWizardStep.set(step + 1);
      const configIdx = step + 1 - 2;
      if (configIdx >= 0) this.configWizardConfigTabIdx.set(configIdx);
    } else {
      this.saveConfigWizard();
    }
  }

  prevConfigWizardStep() {
    const step = this.configWizardStep();
    if (step > 1) this.configWizardStep.set(step - 1);
  }

  addConfigWizardTab(typeValue: string) {
    const typeInfo = TAB_TYPE_OPTIONS.find(t => t.value === typeValue);
    if (!typeInfo) return;
    const tabs = [...this.configWizardTabs()];
    tabs.push({
      id: `tab_${Date.now()}`, label: typeInfo.label, icon: typeInfo.defaultIcon,
      color: typeInfo.defaultColor, type: typeValue as any, sortOrder: tabs.length + 1, config: {},
    });
    this.configWizardTabs.set(tabs);
  }

  removeConfigWizardTab(idx: number) {
    const tabs = [...this.configWizardTabs()];
    tabs.splice(idx, 1);
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.configWizardTabs.set(tabs);
  }

  moveConfigWizardTab(idx: number, direction: 'up' | 'down') {
    const tabs = [...this.configWizardTabs()];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= tabs.length) return;
    [tabs[idx], tabs[targetIdx]] = [tabs[targetIdx], tabs[idx]];
    tabs.forEach((t, i) => t.sortOrder = i + 1);
    this.configWizardTabs.set(tabs);
  }

  updateConfigWizardTab(idx: number, field: string, value: any) {
    const tabs = [...this.configWizardTabs()];
    tabs[idx] = { ...tabs[idx], [field]: value };
    this.configWizardTabs.set(tabs);
  }

  toggleConfigWizardTabOpType(tabIdx: number, opTypeId: number) {
    const tabs = [...this.configWizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...(tab.config?.operationTypeIds || [])];
    const idx = ids.indexOf(opTypeId);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(opTypeId);
    tabs[tabIdx] = { ...tab, config: { ...tab.config, operationTypeIds: ids } };
    this.configWizardTabs.set(tabs);
  }

  toggleConfigWizardTabAccount(tabIdx: number, accountId: number) {
    const tabs = [...this.configWizardTabs()];
    const tab = tabs[tabIdx];
    const ids = [...(tab.config?.accountIds || [])];
    const idx = ids.indexOf(accountId);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(accountId);
    tabs[tabIdx] = { ...tab, config: { ...tab.config, accountIds: ids } };
    this.configWizardTabs.set(tabs);
  }

  async saveConfigWizard() {
    const screen = this.activeScreen();
    if (!screen) return;
    this.saving.set(true);
    try {
      await this.api.saveCollectionStyleConfig(this.bizId, screen.id, {
        tabs: this.configWizardTabs(), notes: this.screenNotes(),
      });
      this.toast.success('تم حفظ الإعداد بنجاح');
      this.closeConfigWizard();
      await this.openScreen(screen);
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ في حفظ الإعداد'); }
    finally { this.saving.set(false); }
  }

  // ===================== Screen CRUD =====================
  backToList() {
    this.viewMode.set('list');
    this.activeScreen.set(null);
    this.screenTabs.set([]);
    this.openedFromSidebar.set(false);
  }

  openScreenForm(screen?: ScreenTemplate) {
    if (screen) {
      this.editingScreen.set(screen);
      this.screenForm.set({ name: screen.name, description: screen.description || '', icon: screen.icon || 'dashboard', color: screen.color || '#3b82f6' });
      this.showScreenForm.set(true);
    } else {
      this.startWizard();
    }
  }

  closeScreenForm() { this.showScreenForm.set(false); this.editingScreen.set(null); }

  async saveScreen() {
    const form = this.screenForm();
    if (!form.name.trim()) { this.toast.warning('يرجى إدخال اسم الشاشة'); return; }
    this.saving.set(true);
    try {
      const editing = this.editingScreen();
      if (editing) {
        await this.api.updateScreen(editing.id, form);
        this.toast.success('تم تحديث الشاشة');
      }
      this.closeScreenForm();
      await this.loadScreens();
      // Refresh active screen if editing
      if (editing && this.activeScreen()?.id === editing.id) {
        const updated = this.screens().find(s => s.id === editing.id);
        if (updated) this.activeScreen.set(updated);
      }
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ'); }
    finally { this.saving.set(false); }
  }

  async deleteScreen(screen: ScreenTemplate) {
    const confirmed = await this.toast.confirm({
      title: 'حذف الشاشة', message: `هل تريد حذف الشاشة "${screen.name}"؟`, type: 'danger',
    });
    if (!confirmed) return;
    try {
      await this.api.deleteScreen(screen.id);
      this.toast.success('تم حذف الشاشة');
      await this.loadScreens();
      if (this.activeScreen()?.id === screen.id) this.backToList();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف'); }
  }

  async cloneScreen(screen: ScreenTemplate) {
    this.saving.set(true);
    try {
      await this.api.cloneScreen(screen.id, { name: `${screen.name} (نسخة)` });
      this.toast.success('تم نسخ الشاشة بنجاح');
      await this.loadScreens();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء النسخ'); }
    finally { this.saving.set(false); }
  }

  // ===================== Permissions =====================
  async openPermissionsModal(screen: ScreenTemplate) {
    this.permissionsScreen.set(screen);
    this.permissionsLoading.set(true);
    this.showPermissionsModal.set(true);
    try {
      const [users, perms] = await Promise.all([this.api.getUsers(), this.api.getScreenPermissions(screen.id)]);
      this.permissionsUsers.set(users);
      const map: { [userId: number]: string } = {};
      for (const p of perms) map[p.userId] = p.permission;
      this.permissionsMap.set(map);
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ في تحميل الصلاحيات'); }
    finally { this.permissionsLoading.set(false); }
  }

  closePermissionsModal() { this.showPermissionsModal.set(false); this.permissionsScreen.set(null); }

  setUserPermission(userId: number, permission: string) {
    const map = { ...this.permissionsMap() };
    if (permission === 'none') delete map[userId]; else map[userId] = permission;
    this.permissionsMap.set(map);
  }

  getUserPermission(userId: number): string { return this.permissionsMap()[userId] || 'none'; }

  async savePermissions() {
    const screen = this.permissionsScreen();
    if (!screen) return;
    this.saving.set(true);
    try {
      const map = this.permissionsMap();
      const permissions = Object.entries(map).map(([userId, permission]) => ({ userId: Number.parseInt(userId, 10), permission }));
      await this.api.batchUpdateScreenPermissions(screen.id, permissions);
      this.toast.success('تم حفظ الصلاحيات بنجاح');
      this.closePermissionsModal();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ أثناء حفظ الصلاحيات'); }
    finally { this.saving.set(false); }
  }

  // ===================== Sidebar Modal =====================
  async openSidebarModal(screen: ScreenTemplate) {
    this.sidebarScreen.set(screen);
    this.selectedSidebarSection.set(0);
    this.sidebarSortOrder.set(99);
    try {
      const sections = await this.api.getSidebarSections(this.bizId);
      this.sidebarSections.set(sections);
      if (sections.length > 0) this.selectedSidebarSection.set(sections[0].id);
      this.showSidebarModal.set(true);
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ في تحميل الأقسام'); }
  }

  closeSidebarModal() { this.showSidebarModal.set(false); this.sidebarScreen.set(null); }

  async addToSidebar() {
    const screen = this.sidebarScreen();
    const sectionId = this.selectedSidebarSection();
    if (!screen || !sectionId) { this.toast.warning('يرجى اختيار القسم'); return; }
    this.saving.set(true);
    try {
      await this.api.addScreenToSidebar(this.bizId, screen.id, { sectionId, sortOrder: this.sidebarSortOrder() });
      this.toast.success('تم إضافة الشاشة للقائمة الجانبية');
      this.closeSidebarModal();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'خطأ أثناء الإضافة'); }
    finally { this.saving.set(false); }
  }

  // ===================== Color Picker =====================
  onColorPickerChange(color: string, target: string, idx?: number) {
    switch (target) {
      case 'wizard': this.wizardScreenColor.set(color); break;
      case 'screen': this.screenForm.set({ ...this.screenForm(), color }); break;
      case 'wizardTab':
        if (idx !== undefined) this.updateWizardTab(idx, 'color', color);
        break;
      case 'configTab':
        if (idx !== undefined) this.updateConfigWizardTab(idx, 'color', color);
        break;
    }
  }

  // ===================== Helpers =====================
  formatDate(dateStr: string): string {
    return formatDateShared(dateStr || '', 'ar-SA');
  }

  formatNumber(num: number): string {
    if (!num && num !== 0) return '0';
    return num.toLocaleString('ar-SA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formatAmount(amount: string | number): string {
    return formatAmountPrecise(amount, 0, 2, 'ar-SA');
  }

  getVoucherTypeLabel(type: string): string {
    switch (type) { case 'receipt': return 'تحصيل'; case 'payment': return 'صرف'; case 'journal': return 'قيد'; default: return type || 'عملية'; }
  }

  getVoucherTypeClass(type: string): string {
    switch (type) { case 'receipt': return 'collection'; case 'payment': return 'expense'; case 'journal': return 'transfer'; default: return 'collection'; }
  }

  getAccountIcon(type: string): string {
    return getAccTypeMeta(type).icon;
  }

  getBalanceTrend(account: AccountData): string {
    const movements = account.last_movements || [];
    if (movements.length < 2) return 'stable';
    return movements[0]?.line_type === 'debit' ? 'up' : 'down';
  }

  getTrendIcon(trend: string): string {
    switch (trend) { case 'up': return 'trending_up'; case 'down': return 'trending_down'; default: return 'trending_flat'; }
  }

  getTrendColor(trend: string): string {
    switch (trend) { case 'up': return '#22c55e'; case 'down': return '#ef4444'; default: return '#94a3b8'; }
  }

  getTabTypeInfo(type: string) {
    return TAB_TYPE_OPTIONS.find(t => t.value === type) || TAB_TYPE_OPTIONS[0];
  }

  // ===== Inventory Helpers =====
  getInventoryTotalCost(tab: TabDefinition): number {
    return this.getTabInventory(tab).reduce((sum: number, item: any) => sum + (Number(item.total_cost) || 0), 0);
  }

  // ===== Reports =====
  async generateReport(reportType: string, tab: TabDefinition) {
    this.reportType.set(reportType);
    this.reportLoading.set(true);
    this.reportData.set(null);
    try {
      if (reportType === 'account_statement') {
        const accountIds = tab.config?.accountIds || [];
        if (accountIds.length === 0) { this.toast.error('يرجى تحديد حسابات للتقرير'); this.reportLoading.set(false); return; }
        const results: any[] = [];
        for (const accId of accountIds) {
          try {
            const params: any = { accountId: accId };
            if (this.reportDateFrom()) params.dateFrom = this.reportDateFrom();
            if (this.reportDateTo()) params.dateTo = this.reportDateTo();
            const data = await this.api.getAccountStatement(this.bizId, accId, this.reportDateFrom() || undefined, this.reportDateTo() || undefined);
            results.push({ accountId: accId, accountName: this.allAccounts().find(a => a.id === accId)?.name || `حساب ${accId}`, ...data });
          } catch (e) { results.push({ accountId: accId, error: true }); }
        }
        this.reportData.set({ type: 'account_statement', results });
      } else if (reportType === 'inventory_report') {
        const warehouseIds = tab.config?.warehouseIds || [];
        try {
          let data: any[] = [];
          for (const wId of warehouseIds) {
            try {
              const items = await this.api.getWarehouseInventory(this.bizId, wId);
              data = data.concat(items || []);
            } catch (e) { /* skip */ }
          }
          this.reportData.set({ type: 'inventory_report', data });
        } catch (e) { this.reportData.set({ type: 'inventory_report', data: [], error: true }); }
      } else if (reportType === 'operations_summary') {
        try {
          const data = await this.api.getWidgetStatsEnhanced(this.bizId, undefined, this.reportDateFrom() || undefined, this.reportDateTo() || undefined);
          this.reportData.set({ type: 'operations_summary', data });
        } catch (e) { this.reportData.set({ type: 'operations_summary', data: null, error: true }); }
      }
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ'); }
    finally { this.reportLoading.set(false); }
  }

  closeReport() {
    this.reportData.set(null);
    this.reportType.set('');
  }

  // ===================== Export & Print =====================
  exportTableToCSV(data: any[], filename: string) {
    if (!data || data.length === 0) { this.toast.warning('لا توجد بيانات للتصدير'); return; }
    const BOM = '\uFEFF';
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    for (const row of data) {
      csvRows.push(headers.map(h => {
        let val = row[h] ?? '';
        val = String(val).replace(/"/g, '""');
        return `"${val}"`;
      }).join(','));
    }
    const blob = new Blob([BOM + csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    this.toast.success('تم تصدير البيانات بنجاح');
  }

  exportLogToCSV() {
    const data = this.logEntries().map(e => ({
      'التاريخ': this.formatDate(e.entry_date),
      'النوع': this.getVoucherTypeLabel(e.voucher_type),
      'الوصف': e.description || e.operation_type_name || '-',
      'المدين': e.total_debit,
      'الدائن': e.total_credit,
    }));
    this.exportTableToCSV(data, 'سجل_العمليات');
  }

  exportAccountsToCSV() {
    const data = this.widgetAccounts().map(a => ({
      'الحساب': a.name,
      'النوع': a.account_type,
      'الرصيد': a.total_balance,
    }));
    this.exportTableToCSV(data, 'الحسابات');
  }

  exportInventoryToCSV(tab: TabDefinition) {
    const items = this.getTabInventory(tab);
    const data = items.map((i: any) => ({
      'الصنف': i.item_name,
      'المخزن': i.warehouse_name,
      'الكمية': i.quantity,
      'التكلفة': i.total_cost,
    }));
    this.exportTableToCSV(data, 'المخزون');
  }

  printCurrentTab() {
    window.print();
  }

  // ===================== Drag & Drop Tabs =====================
  onTabDrop(event: CdkDragDrop<any[]>) {
    const tabs = [...this.screenTabs()];
    moveItemInArray(tabs, event.previousIndex, event.currentIndex);
    this.screenTabs.set(tabs);
    // تحديث sortOrder في الباكند
    const updates = tabs.map((t, i) => ({ id: t.id, sortOrder: i }));
    if (this.activeScreen()) {
      this.api.updateScreen(this.activeScreen()!.id, { layoutConfig: { tabs } }).catch(() => {});
    }
  }

  // ===================== Screen Templates (Presets) =====================
  showTemplatesModal = signal(false);
  screenPresets = [
    {
      name: 'شاشة محطة كهرباء',
      description: 'شاشة جاهزة لإدارة محطة كهرباء مع تحصيل وصرف وسجل وإحصائيات',
      icon: 'bolt',
      color: '#f59e0b',
      tabs: [
        { type: 'operations', label: 'العمليات', icon: 'receipt_long', color: '#3b82f6' },
        { type: 'log', label: 'السجل', icon: 'history', color: '#22c55e' },
        { type: 'accounts', label: 'الحسابات', icon: 'account_balance', color: '#f59e0b' },
        { type: 'stats', label: 'إحصائيات', icon: 'analytics', color: '#8b5cf6' },
        { type: 'chart', label: 'رسم بياني', icon: 'bar_chart', color: '#14b8a6' },
      ]
    },
    {
      name: 'شاشة مخزن',
      description: 'شاشة لإدارة المخزون مع مراقبة الأصناف وتقارير',
      icon: 'warehouse',
      color: '#0ea5e9',
      tabs: [
        { type: 'inventory', label: 'الأصناف', icon: 'inventory_2', color: '#0ea5e9' },
        { type: 'operations', label: 'العمليات', icon: 'receipt_long', color: '#3b82f6' },
        { type: 'log', label: 'السجل', icon: 'history', color: '#22c55e' },
        { type: 'reports', label: 'تقارير', icon: 'summarize', color: '#ec4899' },
      ]
    },
    {
      name: 'شاشة حسابات شخصية',
      description: 'شاشة بسيطة لمتابعة الحسابات الشخصية',
      icon: 'person',
      color: '#8b5cf6',
      tabs: [
        { type: 'accounts', label: 'الحسابات', icon: 'account_balance', color: '#f59e0b' },
        { type: 'log', label: 'السجل', icon: 'history', color: '#22c55e' },
        { type: 'stats', label: 'إحصائيات', icon: 'analytics', color: '#8b5cf6' },
        { type: 'notes', label: 'ملاحظات', icon: 'sticky_note_2', color: '#f97316' },
      ]
    },
    {
      name: 'لوحة تحكم شاملة',
      description: 'لوحة تحكم مع كل أنواع التبويبات',
      icon: 'dashboard',
      color: '#3b82f6',
      tabs: [
        { type: 'stats', label: 'إحصائيات', icon: 'analytics', color: '#8b5cf6' },
        { type: 'chart', label: 'رسم بياني', icon: 'bar_chart', color: '#14b8a6' },
        { type: 'operations', label: 'العمليات', icon: 'receipt_long', color: '#3b82f6' },
        { type: 'log', label: 'السجل', icon: 'history', color: '#22c55e' },
        { type: 'accounts', label: 'الحسابات', icon: 'account_balance', color: '#f59e0b' },
        { type: 'inventory', label: 'المخزون', icon: 'inventory_2', color: '#0ea5e9' },
        { type: 'reports', label: 'تقارير', icon: 'summarize', color: '#ec4899' },
        { type: 'notes', label: 'ملاحظات', icon: 'sticky_note_2', color: '#f97316' },
      ]
    },
  ];

  async applyPreset(preset: any) {
    if (!this.activeScreen()) {
      // إنشاء شاشة جديدة من القالب
      try {
        const screen = await this.api.createScreen(this.bizId, {
          name: preset.name,
          icon: preset.icon,
          color: preset.color,
          layoutConfig: { tabs: preset.tabs.map((t: any, i: number) => ({ ...t, id: Date.now() + i, sortOrder: i, config: {} })) },
        });
        this.screens.set([...this.screens(), screen]);
        this.activeScreen.set(screen);
        this.screenTabs.set(screen.layoutConfig?.tabs || []);
        if (this.screenTabs().length > 0) this.activeTabId.set(this.screenTabs()[0].id);
        this.viewMode.set('screen');
        this.toast.success(`تم إنشاء شاشة "${preset.name}" بنجاح`);
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حث خطأ');
      }
    } else {
      // تطبيق القالب على الشاشة الحالية
      const tabs = preset.tabs.map((t: any, i: number) => ({ ...t, id: Date.now() + i, sortOrder: i, config: {} }));
      this.screenTabs.set(tabs);
      try {
        await this.api.updateScreen(this.activeScreen()!.id, {
          layoutConfig: { tabs },
        });
        this.toast.success('تم تطبيق القالب بنجاح');
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
    this.showTemplatesModal.set(false);
  }
}
