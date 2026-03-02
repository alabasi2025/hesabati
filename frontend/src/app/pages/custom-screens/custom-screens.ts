import { Component, inject, OnInit, OnDestroy, signal, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Gridster, GridsterItem, GridsterConfig, GridsterItemConfig, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ColorPickerDirective } from 'ngx-color-picker';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';


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

interface ScreenWidget {
  id: number;
  screenId: number;
  widgetType: string;
  title: string;
  config: any;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  sortOrder: number;
  isVisible: boolean;
  createdAt: string;
}

interface GridWidget extends GridsterItemConfig {
  widgetData: ScreenWidget;
}

interface WizardWidget {
  widgetType: string;
  title: string;
  config: any;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  sortOrder: number;
  isVisible: boolean;
}

interface ScreenWithWidgets {
  id: number;
  name: string;
  icon: string;
  color: string;
  widgets: ScreenWidget[];
}

// Real data interfaces
interface WidgetStats {
  totalReceipts: number;
  totalPayments: number;
  operationsCount: number;
  netBalance: number;
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

@Component({
  selector: 'app-custom-screens',
  standalone: true,
  imports: [CommonModule, FormsModule, Gridster, GridsterItem, BaseChartDirective, ColorPickerDirective],
  templateUrl: './custom-screens.html',
  styleUrl: './custom-screens.scss',

})
export class CustomScreensComponent implements OnInit, OnDestroy, AfterViewInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  private toast = inject(ToastService);

  bizId = 0;
  loading = signal(true);
  saving = signal(false);

  // ===================== Data =====================
  screens = signal<ScreenTemplate[]>([]);
  activeScreen = signal<ScreenTemplate | null>(null);
  widgets = signal<ScreenWidget[]>([]);
  widgetsLoading = signal(false);

  // ===================== Real Widget Data =====================
  widgetStats = signal<WidgetStats>({ totalReceipts: 0, totalPayments: 0, operationsCount: 0, netBalance: 0 });
  widgetLogEntries = signal<LogEntry[]>([]);
  widgetLogTotal = signal(0);
  widgetAccounts = signal<AccountData[]>([]);
  widgetChartData = signal<any>(null);
  widgetOperationTypes = signal<any[]>([]);

  // Log filters
  logFilterDateFrom = signal('');
  logFilterDateTo = signal('');
  logFilterOpType = signal('');

  // ===================== Gridster =====================
  gridsterOptions: GridsterConfig = {};
  gridItems: GridWidget[] = [];

  // ===================== UI State =====================
  viewMode = signal<'list' | 'detail' | 'wizard' | 'collection_style'>('list');
  editMode = signal(false);
  showWidgetLibrary = signal(false);
  hasUnsavedChanges = signal(false);

  // ===================== Wizard State (5 steps) =====================
  wizardStep = signal(1);
  wizardScreenName = signal('');
  wizardScreenDesc = signal('');
  wizardScreenIcon = signal('dashboard');
  wizardScreenColor = signal('#3b82f6');
  wizardSelectedTemplate = signal<string>('collection_style');
  wizardAddToSidebar = signal(true);
  wizardSidebarSectionId = signal(0);
  wizardSidebarSortOrder = signal(0);
  wizardSidebarSections = signal<any[]>([]);
  wizardWidgets = signal<WizardWidget[]>([]);
  wizardEditingWidgetIdx = signal<number | null>(null);

  // Wizard Step 2: Tab 1 settings
  wizardTab1Label = signal('تحصيل');
  wizardTab1Icon = signal('arrow_downward');
  wizardTab1Color = signal('#22c55e');
  wizardTab1OperationTypeIds = signal<number[]>([]);

  // Wizard Step 3: Tab 2 settings
  wizardTab2Label = signal('توريد');
  wizardTab2Icon = signal('arrow_upward');
  wizardTab2Color = signal('#ef4444');
  wizardTab2OperationTypeIds = signal<number[]>([]);

  // Wizard Step 4: History tab
  wizardHistoryLabel = signal('السجل');

  // Wizard Step 5: Accounts/Funds tab
  wizardAccountsLabel = signal('الصناديق');
  wizardAccountIds = signal<number[]>([]);

  // ===================== Widget Customization (Step 3) =====================
  customizingWidgetIdx = signal<number | null>(null);

  // ===================== Content Binding (Step 4) =====================
  bindingWidgetIdx = signal<number | null>(null);
  operationTypes = signal<any[]>([]);
  allAccounts = signal<any[]>([]);

  // ===================== Copy Widget State =====================
  showCopyWidgetModal = signal(false);
  otherScreens = signal<ScreenWithWidgets[]>([]);
  selectedCopyScreen = signal<ScreenWithWidgets | null>(null);

  // ===================== Screen Form Modal =====================
  showScreenForm = signal(false);
  editingScreen = signal<ScreenTemplate | null>(null);
  screenForm = signal({
    name: '',
    description: '',
    icon: 'dashboard',
    color: '#3b82f6',
  });

  // ===================== Widget Edit Modal (Detail View) =====================
  showWidgetForm = signal(false);
  editingWidget = signal<ScreenWidget | null>(null);
  widgetForm = signal({
    widgetType: 'templates',
    title: '',
    config: {} as any,
  });

  // ===================== Notes Widget =====================
  notesText: { [key: number]: string } = {};
  private notesSaveTimeout: { [key: number]: any } = {};

  // ===================== Permissions Modal =====================
  showPermissionsModal = signal(false);
  permissionsScreen = signal<ScreenTemplate | null>(null);
  permissionsUsers = signal<any[]>([]);
  permissionsMap = signal<{ [userId: number]: string }>({});
  permissionsLoading = signal(false);

  // ===================== Add to Sidebar Modal =====================
  showSidebarModal = signal(false);
  sidebarScreen = signal<ScreenTemplate | null>(null);
  sidebarSections = signal<any[]>([]);
  selectedSidebarSection = signal(0);
  sidebarSortOrder = signal(99);

  // ===================== Collection Style Config =====================
  collectionStyleConfig = signal<any>(null);
  csActiveTab = signal<'tab1' | 'tab2' | 'history' | 'funds'>('tab1');
  csConfigLoading = signal(false);
  // Collection Style Wizard (4 steps)
  csWizardStep = signal(1);
  csTab1Label = signal('تحصيل');
  csTab2Label = signal('توريد');
  csAccountsSectionLabel = signal('الصناديق');
  csTab1OperationTypeIds = signal<number[]>([]);
  csTab2OperationTypeIds = signal<number[]>([]);
  csAccountIds = signal<number[]>([]);
  showCsConfigWizard = signal(false);

  // Collection Style - Operation Form
  csSelectedOpType = signal<any>(null);
  csFormEntries = signal<any[]>([]);
  csFormDescription = signal('');
  csFormDate = signal(new Date().toISOString().split('T')[0]);
  csVouchers = signal<any[]>([]);

  // ===================== Operation Execution Modal =====================
  showOperationModal = signal(false);
  selectedOperationType = signal<any>(null);
  operationEntries = signal<any[]>([]);
  operationDescription = signal('');
  operationDate = signal(new Date().toISOString().split('T')[0]);

  // ===================== Options =====================
  icons = [
    'dashboard', 'bolt', 'receipt_long', 'receipt', 'account_balance_wallet',
    'category', 'savings', 'menu_book', 'currency_exchange', 'groups',
    'handshake', 'warehouse', 'local_shipping', 'balance', 'assessment',
    'monitor', 'grid_view', 'view_module', 'widgets', 'space_dashboard',
    'analytics', 'pie_chart', 'bar_chart', 'trending_up', 'speed',
  ];

  colors = [
    '#3b82f6', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6',
    '#14b8a6', '#f97316', '#ec4899', '#06b6d4', '#84cc16',
  ];

  widgetTypes = [
    { value: 'templates', label: 'عنصر القوالب', icon: 'receipt_long', desc: 'عرض قوالب العمليات وتنفيذها', color: '#3b82f6', defaultW: 6, defaultH: 4 },
    { value: 'log', label: 'عنصر السجل', icon: 'history', desc: 'عرض سجل العمليات المنفذة', color: '#22c55e', defaultW: 6, defaultH: 5 },
    { value: 'accounts', label: 'مراقبة الحسابات', icon: 'account_balance', desc: 'مراقبة أرصدة الحسابات', color: '#f59e0b', defaultW: 4, defaultH: 4 },
    { value: 'stats', label: 'الإحصائيات', icon: 'analytics', desc: 'أرقام ملخصة وKPIs', color: '#8b5cf6', defaultW: 12, defaultH: 2 },
    { value: 'chart', label: 'رسم بياني', icon: 'bar_chart', desc: 'تحليل بصري للبيانات', color: '#14b8a6', defaultW: 6, defaultH: 5 },
    { value: 'notes', label: 'ملاحظات', icon: 'sticky_note_2', desc: 'ملاحظات وتذكيرات', color: '#f97316', defaultW: 4, defaultH: 3 },
  ];

  // ===================== Screen Templates =====================
  screenTemplateOptions = [
    {
      key: 'collection_style',
      name: 'شاشة مخصصة',
      desc: 'شاشة ثابتة بتبويبين للعمليات + سجل + مراقبة حسابات - قابلة للتخصيص',
      icon: 'receipt_long',
      color: '#14b8a6',
      widgets: [],
    },
  ];

  // Chart data (real data)
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'التحصيل',
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        data: [],
        label: 'الصرف',
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: { font: { family: 'Tajawal', size: 12 }, padding: 16 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { font: { family: 'Tajawal', size: 11 } },
        grid: { color: 'rgba(0,0,0,0.05)' },
      },
      x: {
        ticks: { font: { family: 'Tajawal', size: 11 } },
        grid: { display: false },
      },
    },
  };

  getWidgetTypeInfo(type: string) {
    return this.widgetTypes.find(w => w.value === type) || this.widgetTypes[0];
  }

  async ngOnInit() {
    this.initGridsterOptions();
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadScreens();

      // Check if URL has ?screen= param to open directly
      this.route.queryParams.subscribe(async (qp) => {
        if (qp['screen']) {
          const screenId = parseInt(qp['screen']);
          const screen = this.screens().find(s => s.id === screenId);
          if (screen) {
            await this.openScreen(screen);
          }
        }
      });
    });
  }

  ngAfterViewInit() {
    // No animations
  }

  ngOnDestroy() {
    // Clear notes save timeouts
    Object.values(this.notesSaveTimeout).forEach(t => clearTimeout(t));
  }

  // ===================== GSAP Animations =====================
  // Animations removed - static design

  initGridsterOptions() {
    this.gridsterOptions = {
      gridType: GridType.ScrollVertical,
      compactType: CompactType.CompactUpAndLeft,
      displayGrid: DisplayGrid.OnDragAndResize,
      pushItems: true,
      draggable: {
        enabled: false,
        ignoreContentClass: 'widget-body-content',
      },
      resizable: {
        enabled: false,
      },
      minCols: 12,
      maxCols: 12,
      minRows: 4,
      margin: 12,
      outerMargin: true,
      outerMarginTop: 12,
      outerMarginRight: 12,
      outerMarginBottom: 12,
      outerMarginLeft: 12,
      mobileBreakpoint: 640,
      defaultItemCols: 4,
      defaultItemRows: 3,
      fixedColWidth: 0,
      fixedRowHeight: 80,
      itemChangeCallback: (item: GridsterItemConfig) => {
        this.onItemChange(item as GridWidget);
      },
      itemResizeCallback: (item: GridsterItemConfig) => {
        this.onItemChange(item as GridWidget);
      },
    };
  }

  updateGridsterEditMode(isEdit: boolean) {
    this.gridsterOptions = {
      ...this.gridsterOptions,
      draggable: {
        ...this.gridsterOptions.draggable,
        enabled: isEdit,
      },
      resizable: {
        ...this.gridsterOptions.resizable,
        enabled: isEdit,
      },
      displayGrid: isEdit ? DisplayGrid.Always : DisplayGrid.None,
    };
  }

  onItemChange(item: GridWidget) {
    if (item.widgetData) {
      item.widgetData.positionX = item.x;
      item.widgetData.positionY = item.y;
      item.widgetData.width = item.cols;
      item.widgetData.height = item.rows;
      this.hasUnsavedChanges.set(true);
    }
  }

  // ===================== Load Data =====================
  async loadScreens() {
    this.loading.set(true);
    try {
      const data = await this.api.getScreens(this.bizId);
      this.screens.set(data);

    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل الشاشات');
    } finally {
      this.loading.set(false);
    }
  }

  async loadWidgets(screenId: number) {
    this.widgetsLoading.set(true);
    try {
      const data = await this.api.getScreenWidgets(screenId);
      this.widgets.set(data);
      this.buildGridItems(data);
      // Load real data for all widget types
      await this.loadAllWidgetData(data);

    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل العناصر');
    } finally {
      this.widgetsLoading.set(false);
    }
  }

  buildGridItems(widgets: ScreenWidget[]) {
    this.gridItems = widgets.map(w => {
      const item: GridWidget = {
        x: w.positionX,
        y: w.positionY,
        cols: w.width,
        rows: w.height,
        widgetData: w,
      };
      return item;
    });
    // Initialize notes
    widgets.forEach(w => {
      if (w.widgetType === 'notes') {
        this.notesText[w.id] = w.config?.text || '';
      }
    });
  }

  // ===================== Load Real Widget Data =====================
  async loadAllWidgetData(widgets: ScreenWidget[]) {
    const types = new Set(widgets.map(w => w.widgetType));
    const promises: Promise<void>[] = [];

    if (types.has('stats')) promises.push(this.loadWidgetStats());
    if (types.has('log')) promises.push(this.loadWidgetLog());
    if (types.has('chart')) promises.push(this.loadWidgetChart());
    if (types.has('templates')) promises.push(this.loadWidgetTemplates(widgets));
    if (types.has('accounts')) promises.push(this.loadWidgetAccounts(widgets));
    if (types.has('notes')) {
      for (const w of widgets.filter(w => w.widgetType === 'notes')) {
        promises.push(this.loadWidgetNotes(w));
      }
    }

    await Promise.allSettled(promises);
  }

  async loadWidgetStats() {
    try {
      const stats = await this.api.getWidgetStats(this.bizId);
      this.widgetStats.set(stats);
    } catch (e) {
      console.error('Error loading widget stats:', e);
    }
  }

  async loadWidgetLog() {
    try {
      const filters: any = { limit: 50 };
      if (this.logFilterDateFrom()) filters.dateFrom = this.logFilterDateFrom();
      if (this.logFilterDateTo()) filters.dateTo = this.logFilterDateTo();
      if (this.logFilterOpType()) filters.operationTypeId = parseInt(this.logFilterOpType());
      const result = await this.api.getWidgetLog(this.bizId, filters);
      this.widgetLogEntries.set(result.entries || []);
      this.widgetLogTotal.set(result.total || 0);
    } catch (e) {
      console.error('Error loading widget log:', e);
    }
  }

  async loadWidgetChart() {
    try {
      const chartData = await this.api.getWidgetChart(this.bizId, 6);
      this.widgetChartData.set(chartData);
      // Update chart data
      this.barChartData = {
        labels: chartData.labels || [],
        datasets: [
          {
            data: chartData.receipts || [],
            label: 'التحصيل',
            backgroundColor: 'rgba(59, 130, 246, 0.6)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
            borderRadius: 6,
          },
          {
            data: chartData.payments || [],
            label: 'الصرف',
            backgroundColor: 'rgba(239, 68, 68, 0.6)',
            borderColor: 'rgba(239, 68, 68, 1)',
            borderWidth: 1,
            borderRadius: 6,
          },
        ],
      };
    } catch (e) {
      console.error('Error loading widget chart:', e);
    }
  }

  async loadWidgetTemplates(widgets: ScreenWidget[]) {
    try {
      // Collect all operation type IDs from all template widgets
      const allOpTypeIds = new Set<number>();
      widgets.filter(w => w.widgetType === 'templates').forEach(w => {
        (w.config?.operationTypeIds || []).forEach((id: number) => allOpTypeIds.add(id));
      });

      let opTypes: any[];
      if (allOpTypeIds.size > 0) {
        opTypes = await this.api.getWidgetOperationTypes(this.bizId, Array.from(allOpTypeIds));
      } else {
        opTypes = await this.api.getWidgetOperationTypes(this.bizId);
      }
      this.widgetOperationTypes.set(opTypes);
    } catch (e) {
      console.error('Error loading widget templates:', e);
    }
  }

  async loadWidgetAccounts(widgets: ScreenWidget[]) {
    try {
      const allAccountIds = new Set<number>();
      widgets.filter(w => w.widgetType === 'accounts').forEach(w => {
        (w.config?.accountIds || []).forEach((id: number) => allAccountIds.add(id));
      });

      let accounts: any[];
      if (allAccountIds.size > 0) {
        accounts = await this.api.getWidgetAccounts(this.bizId, Array.from(allAccountIds));
      } else {
        accounts = await this.api.getWidgetAccounts(this.bizId);
      }
      this.widgetAccounts.set(accounts);
    } catch (e) {
      console.error('Error loading widget accounts:', e);
    }
  }

  async loadWidgetNotes(widget: ScreenWidget) {
    try {
      const result = await this.api.getWidgetNotes(widget.id);
      this.notesText[widget.id] = result.text || '';
    } catch (e) {
      console.error('Error loading widget notes:', e);
    }
  }

  // ===================== Widget Data Getters =====================
  getTemplatesForWidget(widget: ScreenWidget): any[] {
    const opTypeIds = widget.config?.operationTypeIds || [];
    if (opTypeIds.length === 0) return this.widgetOperationTypes();
    return this.widgetOperationTypes().filter((ot: any) => opTypeIds.includes(ot.id));
  }

  getAccountsForWidget(widget: ScreenWidget): AccountData[] {
    const accountIds = widget.config?.accountIds || [];
    if (accountIds.length === 0) return this.widgetAccounts();
    return this.widgetAccounts().filter((a: any) => accountIds.includes(a.id));
  }

  getStatsData(): { label: string; value: string; icon: string; color: string }[] {
    const stats = this.widgetStats();
    return [
      { label: 'إجمالي التحصيل', value: this.formatNumber(stats.totalReceipts), icon: 'trending_up', color: '#22c55e' },
      { label: 'إجمالي الصرف', value: this.formatNumber(stats.totalPayments), icon: 'trending_down', color: '#ef4444' },
      { label: 'عدد العمليات', value: String(stats.operationsCount), icon: 'receipt_long', color: '#3b82f6' },
      { label: 'صافي الرصيد', value: this.formatNumber(stats.netBalance), icon: 'account_balance', color: '#8b5cf6' },
    ];
  }

  // ===================== Log Filter Actions =====================
  async applyLogFilters() {
    await this.loadWidgetLog();
  }

  async clearLogFilters() {
    this.logFilterDateFrom.set('');
    this.logFilterDateTo.set('');
    this.logFilterOpType.set('');
    await this.loadWidgetLog();
  }

  // ===================== Operation Execution =====================
  openOperationExecution(opType: any) {
    this.selectedOperationType.set(opType);
    const accounts = opType.accounts || [];
    this.operationEntries.set(
      accounts.map((acc: any) => ({
        accountId: acc.accountId,
        accountName: acc.label || acc.accountName || '',
        amount: '',
        notes: '',
      }))
    );
    if (accounts.length === 0) {
      this.operationEntries.set([{ accountId: null, accountName: '', amount: '', notes: '' }]);
    }
    this.operationDescription.set('');
    this.operationDate.set(new Date().toISOString().split('T')[0]);
    this.showOperationModal.set(true);

  }

  closeOperationModal() {
    this.showOperationModal.set(false);
    this.selectedOperationType.set(null);
  }

  updateOperationEntry(index: number, field: string, value: string) {
    this.operationEntries.update(entries => {
      const updated = [...entries];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  // حساب إجمالي المبالغ المدخلة
  getOperationTotal(): number {
    return this.operationEntries().reduce((sum, e) => {
      const amt = parseFloat(e.amount);
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0);
  }

  // عدد الحسابات التي أدخل فيها مبلغ
  getFilledEntriesCount(): number {
    return this.operationEntries().filter(e => parseFloat(e.amount) > 0).length;
  }

  // جلب رصيد حساب معين من widgetAccounts
  getAccountBalance(accountId: number): number {
    const acc = this.widgetAccounts().find(a => a.id === accountId);
    return acc?.total_balance || 0;
  }

  async executeOperation() {
    const opType = this.selectedOperationType();
    if (!opType) return;

    const entries = this.operationEntries().filter(e => parseFloat(e.amount) > 0);
    if (!entries.length) {
      this.toast.warning('أدخل مبلغاً واحداً على الأقل');
      return;
    }

    const total = this.getOperationTotal();
    const vTypeLabel = opType.voucherType === 'receipt' ? 'تحصيل' : opType.voucherType === 'payment' ? 'صرف' : 'تحويل';

    // === تأكيد قبل التنفيذ ===
    const summaryLines = entries.map(e => `• ${e.accountName}: ${parseFloat(e.amount).toLocaleString('ar-SA')}`).join('\n');
    const confirmed = await this.toast.confirm({
      title: `تأكيد ${vTypeLabel} - ${opType.name}`,
      message: `سيتم تنفيذ ${entries.length} عملية بإجمالي ${total.toLocaleString('ar-SA')} ريال:\n${summaryLines}`,
      type: opType.voucherType === 'payment' ? 'danger' : 'info',
    });
    if (!confirmed) return;

    this.saving.set(true);
    const results: any[] = [];
    const errors: string[] = [];

    try {
      for (const entry of entries) {
        try {
          const result = await this.api.createVoucher(this.bizId, {
            voucherType: opType.voucherType || 'receipt',
            operationTypeId: opType.id,
            toAccountId: entry.accountId,
            amount: parseFloat(entry.amount),
            currencyId: 1,
            description: this.operationDescription() || `${opType.name} - ${entry.accountName}`,
            voucherDate: this.operationDate(),
          });
          results.push(result);
        } catch (e: any) {
          errors.push(`${entry.accountName}: ${e.message || 'خطأ'}`);
        }
      }

      if (results.length > 0 && errors.length === 0) {
        this.toast.success(`تم تنفيذ ${results.length} عملية بنجاح - إجمالي: ${total.toLocaleString('ar-SA')}`);
      } else if (results.length > 0 && errors.length > 0) {
        this.toast.warning(`تم تنفيذ ${results.length} عملية بنجاح، وفشلت ${errors.length} عملية`);
      } else {
        const firstError = errors.length > 0 ? errors[0] : '';
        const errorDetail = firstError.includes('غير مفعّل') 
          ? 'نوع العملية غير مفعّل - يرجى تفعيله من صفحة أنواع العمليات'
          : firstError.includes('غير موجود')
          ? 'نوع العملية غير موجود - يرجى التحقق من الإعدادات'
          : firstError.includes('لا ينتمي')
          ? 'الحساب لا ينتمي لهذا العمل - يرجى التحقق من إعدادات الحسابات'
          : firstError.includes('المستهدف')
          ? 'الحساب المستهدف مطلوب - يرجى التحقق من إعدادات نوع العملية'
          : `فشلت العمليات:\n${errors.join('\n')}`;
        this.toast.error(errorDetail);
      }

      this.closeOperationModal();
      // Refresh widget data (أرصدة + سجل + إحصائيات)
      await this.loadAllWidgetData(this.widgets());
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تنفيذ العملية');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== WIZARD (5 Steps) =====================
  startWizard() {
    this.viewMode.set('wizard');
    this.wizardStep.set(1);
    this.wizardScreenName.set('');
    this.wizardScreenDesc.set('');
    this.wizardScreenIcon.set('dashboard');
    this.wizardScreenColor.set('#3b82f6');
    this.wizardSelectedTemplate.set('collection_style');
    this.wizardAddToSidebar.set(true);
    this.wizardSidebarSectionId.set(0);
    this.wizardSidebarSortOrder.set(0);
    this.wizardWidgets.set([]);
    this.customizingWidgetIdx.set(null);
    this.bindingWidgetIdx.set(null);

    // Step 2: Tab 1
    this.wizardTab1Label.set('تحصيل');
    this.wizardTab1Icon.set('arrow_downward');
    this.wizardTab1Color.set('#22c55e');
    this.wizardTab1OperationTypeIds.set([]);

    // Step 3: Tab 2
    this.wizardTab2Label.set('توريد');
    this.wizardTab2Icon.set('arrow_upward');
    this.wizardTab2Color.set('#ef4444');
    this.wizardTab2OperationTypeIds.set([]);

    // Step 4: History
    this.wizardHistoryLabel.set('السجل');

    // Step 5: Accounts
    this.wizardAccountsLabel.set('الصناديق');
    this.wizardAccountIds.set([]);

    // تحميل أقسام السايدبار والبيانات
    this.loadWizardSidebarSections();
    this.loadContentBindingData();
  }

  async loadWizardSidebarSections() {
    try {
      const sections = await this.api.getSidebarSections(this.bizId);
      this.wizardSidebarSections.set(sections);
      if (sections.length > 0) {
        this.wizardSidebarSectionId.set(sections[0].id);
      }
    } catch (e) {
      console.error('خطأ في تحميل أقسام السايدبار:', e);
    }
  }

  cancelWizard() {
    this.viewMode.set('list');

  }

  selectTemplate(key: string) {
    this.wizardSelectedTemplate.set(key);
    const tpl = this.screenTemplateOptions.find(t => t.key === key);
    if (tpl) {
      this.wizardWidgets.set([]);
      this.wizardScreenIcon.set(tpl.icon);
      this.wizardScreenColor.set(tpl.color);
      if (!this.wizardScreenName()) {
        this.wizardScreenName.set('شاشة مخصصة');
      }
    }
  }

  nextWizardStep() {
    const step = this.wizardStep();
    if (step === 1) {
      // التحقق من اسم الشاشة
      if (!this.wizardScreenName().trim()) {
        this.toast.warning('يرجى إدخال اسم الشاشة');
        return;
      }
    }
    if (step < 5) {
      this.wizardStep.set(step + 1);
    } else {
      // الخطوة 5 → حفظ
      this.saveWizardScreen();
    }
  }

  prevWizardStep() {
    const step = this.wizardStep();
    if (step > 1) {
      this.wizardStep.set(step - 1);
    }
  }

  toggleWizardTab1OpType(id: number) {
    const ids = [...this.wizardTab1OperationTypeIds()];
    const idx = ids.indexOf(id);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(id);
    this.wizardTab1OperationTypeIds.set(ids);
  }

  toggleWizardTab2OpType(id: number) {
    const ids = [...this.wizardTab2OperationTypeIds()];
    const idx = ids.indexOf(id);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(id);
    this.wizardTab2OperationTypeIds.set(ids);
  }

  toggleWizardAccount(id: number) {
    const ids = [...this.wizardAccountIds()];
    const idx = ids.indexOf(id);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(id);
    this.wizardAccountIds.set(ids);
  }

  async loadContentBindingData() {
    try {
      const [opTypes, accountsData] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId),
      ]);
      this.operationTypes.set(opTypes);
      this.allAccounts.set(accountsData.accounts || []);
    } catch (e) {
      console.error('Error loading binding data:', e);
    }
  }

  // Wizard Step 2: Add/Remove widgets
  addWizardWidget(type: any) {
    const widgets = [...this.wizardWidgets()];
    widgets.push({
      widgetType: type.value,
      title: type.label,
      config: {},
      positionX: 0,
      positionY: widgets.length * 3,
      width: type.defaultW,
      height: type.defaultH,
      sortOrder: widgets.length,
      isVisible: true,
    });
    this.wizardWidgets.set(widgets);
  }

  removeWizardWidget(idx: number) {
    const widgets = [...this.wizardWidgets()];
    widgets.splice(idx, 1);
    this.wizardWidgets.set(widgets);
    if (this.customizingWidgetIdx() === idx) this.customizingWidgetIdx.set(null);
    if (this.bindingWidgetIdx() === idx) this.bindingWidgetIdx.set(null);
  }

  // Wizard Step 3: Customize widgets
  startCustomizing(idx: number) {
    this.customizingWidgetIdx.set(idx);
  }

  updateWizardWidgetTitle(idx: number, title: string) {
    const widgets = [...this.wizardWidgets()];
    widgets[idx] = { ...widgets[idx], title };
    this.wizardWidgets.set(widgets);
  }

  updateWizardWidgetColor(idx: number, color: string) {
    const widgets = [...this.wizardWidgets()];
    widgets[idx] = { ...widgets[idx], config: { ...widgets[idx].config, color } };
    this.wizardWidgets.set(widgets);
  }

  toggleWizardWidgetVisibility(idx: number) {
    const widgets = [...this.wizardWidgets()];
    widgets[idx] = { ...widgets[idx], isVisible: !widgets[idx].isVisible };
    this.wizardWidgets.set(widgets);
  }

  // Wizard Step 4: Content binding
  startBinding(idx: number) {
    this.bindingWidgetIdx.set(idx);
  }

  toggleOperationType(idx: number, opTypeId: number) {
    const widgets = [...this.wizardWidgets()];
    const w = widgets[idx];
    const selectedOps = w.config.operationTypeIds || [];
    const newOps = selectedOps.includes(opTypeId)
      ? selectedOps.filter((id: number) => id !== opTypeId)
      : [...selectedOps, opTypeId];
    widgets[idx] = { ...w, config: { ...w.config, operationTypeIds: newOps } };
    this.wizardWidgets.set(widgets);
  }

  toggleAccount(idx: number, accountId: number) {
    const widgets = [...this.wizardWidgets()];
    const w = widgets[idx];
    const selectedAccs = w.config.accountIds || [];
    const newAccs = selectedAccs.includes(accountId)
      ? selectedAccs.filter((id: number) => id !== accountId)
      : [...selectedAccs, accountId];
    widgets[idx] = { ...w, config: { ...w.config, accountIds: newAccs } };
    this.wizardWidgets.set(widgets);
  }

  updateLogFilter(idx: number, field: string, value: string) {
    const widgets = [...this.wizardWidgets()];
    const w = widgets[idx];
    const filters = w.config.filters || {};
    filters[field] = value;
    widgets[idx] = { ...w, config: { ...w.config, filters } };
    this.wizardWidgets.set(widgets);
  }

  // Wizard: Save
  async saveWizardScreen() {
    const name = this.wizardScreenName();
    if (!name.trim()) {
      this.toast.warning('يرجى إدخال اسم الشاشة');
      return;
    }

    this.saving.set(true);
    try {
      const addToSidebar = this.wizardAddToSidebar();
      const payload: any = {
        name,
        description: this.wizardScreenDesc(),
        icon: this.wizardScreenIcon(),
        color: this.wizardScreenColor(),
        templateKey: 'collection_style',
        widgets: [],
        addToSidebar,
      };
      // إضافة معلومات السايدبار إذا تم اختيار الإضافة
      if (addToSidebar) {
        const sectionId = this.wizardSidebarSectionId();
        if (sectionId) payload.sidebarSectionId = sectionId;
        payload.sidebarSortOrder = this.wizardSidebarSortOrder();
      }
      const newScreen = await this.api.createScreen(this.bizId, payload);

      // حفظ إعدادات التبويبات والحسابات مباشرة
      if (newScreen?.id) {
        const configPayload = {
          tab1Label: this.wizardTab1Label(),
          tab1Icon: this.wizardTab1Icon(),
          tab1Color: this.wizardTab1Color(),
          tab1OperationTypeIds: this.wizardTab1OperationTypeIds(),
          tab2Label: this.wizardTab2Label(),
          tab2Icon: this.wizardTab2Icon(),
          tab2Color: this.wizardTab2Color(),
          tab2OperationTypeIds: this.wizardTab2OperationTypeIds(),
          historyLabel: this.wizardHistoryLabel(),
          accountsSectionLabel: this.wizardAccountsLabel(),
          accountIds: this.wizardAccountIds(),
        };
        await this.api.saveCollectionStyleConfig(this.bizId, newScreen.id, configPayload);
      }

      this.toast.success('تم إنشاء الشاشة بنجاح');
      await this.loadScreens();

      // فتح الشاشة مباشرة
      if (newScreen?.id) {
        const screen = this.screens().find(s => s.id === newScreen.id) || { ...newScreen };
        await this.openScreen(screen);
      } else {
        this.viewMode.set('list');
      }
    } catch (e: any) {
      this.toast.error(e.message || 'حث خطأ أثناء الإنشاء');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Screen Form (Edit existing) =====================
  openScreenForm(screen?: ScreenTemplate) {
    if (screen) {
      this.editingScreen.set(screen);
      this.screenForm.set({
        name: screen.name,
        description: screen.description || '',
        icon: screen.icon || 'dashboard',
        color: screen.color || '#3b82f6',
      });
      this.showScreenForm.set(true);
  
    } else {
      this.startWizard();
    }
  }

  closeScreenForm() {
    this.showScreenForm.set(false);
    this.editingScreen.set(null);
  }

  async saveScreen() {
    const form = this.screenForm();
    if (!form.name.trim()) {
      this.toast.warning('يرجى إدخال اسم الشاشة');
      return;
    }

    this.saving.set(true);
    try {
      const editing = this.editingScreen();
      if (editing) {
        await this.api.updateScreen(editing.id, form);
        this.toast.success('تم تحديث الشاشة');
      } else {
        await this.api.createScreen(this.bizId, form);
        this.toast.success('تم إنشاء الشاشة');
      }
      this.closeScreenForm();
      await this.loadScreens();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Screen CRUD =====================
  async deleteScreen(screen: ScreenTemplate) {
    const confirmed = await this.toast.confirm({
      title: 'حذف الشاشة',
      message: `هل تريد حذف الشاشة "${screen.name}"؟ سيتم حذف جميع العناصر بداخلها.`,
      type: 'danger',
    });
    if (!confirmed) return;

    try {
      await this.api.deleteScreen(screen.id);
      this.toast.success('تم حذف الشاشة');
      await this.loadScreens();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ أثناء الحذف');
    }
  }

  async cloneScreen(screen: ScreenTemplate) {
    this.saving.set(true);
    try {
      await this.api.cloneScreen(screen.id, { name: `${screen.name} (نسخة)` });
      this.toast.success('تم نسخ الشاشة بنجاح');
      await this.loadScreens();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ أثناء النسخ');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Screen Detail View =====================
  async openScreen(screen: ScreenTemplate) {
    this.activeScreen.set(screen);
    this.editMode.set(false);
    this.hasUnsavedChanges.set(false);
    this.updateGridsterEditMode(false);

    // إذا كانت الشاشة من نوع collection_style → فتح واجهة collection-style
    if (screen.templateKey === 'collection_style') {
      this.viewMode.set('collection_style');
      try {
        await this.loadCollectionStyleScreen(screen);
      } catch (err) {
        console.error('loadCollectionStyleScreen error:', err);
      }
  
      return;
    }

    this.viewMode.set('detail');
    // Load operation types for log filter dropdown
    try {
      const opTypes = await this.api.getOperationTypes(this.bizId);
      this.operationTypes.set(opTypes);
    } catch (e) {}
    await this.loadWidgets(screen.id);

  }

  // ===================== Collection Style Screen =====================
  async loadCollectionStyleScreen(screen: ScreenTemplate) {
    this.csConfigLoading.set(true);
    this.csSelectedOpType.set(null);
    this.csFormEntries.set([]);
    try {
      const [config, opTypes, accountsData] = await Promise.all([
        this.api.getCollectionStyleConfig(this.bizId, screen.id),
        this.api.getOperationTypes(this.bizId),
        this.api.getAllAccounts(this.bizId),
      ]);
      this.collectionStyleConfig.set(config);
      this.operationTypes.set(opTypes);
      this.allAccounts.set(accountsData.accounts || []);
      this.csActiveTab.set('tab1');
      // تحميل السجل
      await this.loadWidgetLog();
      // تحميل الفاوتشرات
      try {
        const vouchers = await this.api.getVouchers(this.bizId);
        this.csVouchers.set(vouchers || []);
      } catch (e) { this.csVouchers.set([]); }
      // تحميل أرصدة الحسابات
      if (config.accountIds && config.accountIds.length > 0) {
        const accounts = await this.api.getWidgetAccounts(this.bizId, config.accountIds);
        this.widgetAccounts.set(accounts);
      } else {
        this.widgetAccounts.set([]);
      }
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل إعداد الشاشة');
    } finally {
      this.csConfigLoading.set(false);
    }
  }

  getCsTab1Templates(): any[] {
    const config = this.collectionStyleConfig();
    if (!config || !config.tab1OperationTypeIds?.length) return [];
    return this.operationTypes().filter((ot: any) => config.tab1OperationTypeIds.includes(ot.id));
  }

  getCsTab2Templates(): any[] {
    const config = this.collectionStyleConfig();
    if (!config || !config.tab2OperationTypeIds?.length) return [];
    return this.operationTypes().filter((ot: any) => config.tab2OperationTypeIds.includes(ot.id));
  }

  getCsAccounts(): AccountData[] {
    const config = this.collectionStyleConfig();
    if (!config || !config.accountIds?.length) return [];
    return this.widgetAccounts().filter((a: any) => config.accountIds.includes(a.id));
  }

  // ===================== Collection Style - Operation Form =====================
  selectCsOpType(ot: any) {
    this.csSelectedOpType.set(ot);
    const accounts = ot.linkedAccounts || ot.accounts || [];
    const entries = accounts.filter((la: any) => la.isActive !== false).map((la: any) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || '',
      amount: '',
      notes: '',
    }));
    if (entries.length === 0) {
      entries.push({ accountId: null, accountName: '', amount: '', notes: '' });
    }
    this.csFormEntries.set(entries);
    this.csFormDescription.set('');
    this.csFormDate.set(new Date().toISOString().split('T')[0]);
  }

  cancelCsOpType() {
    this.csSelectedOpType.set(null);
    this.csFormEntries.set([]);
  }

  updateCsFormEntry(index: number, field: string, value: string) {
    this.csFormEntries.update(entries => {
      const updated = [...entries];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  getCsFormTotal(): number {
    return this.csFormEntries().reduce((sum, e) => {
      const amt = parseFloat(e.amount);
      return sum + (isNaN(amt) ? 0 : amt);
    }, 0);
  }

  getCsFilledEntriesCount(): number {
    return this.csFormEntries().filter(e => parseFloat(e.amount) > 0).length;
  }

  async saveCsOperation() {
    const opType = this.csSelectedOpType();
    if (!opType) return;

    const entries = this.csFormEntries().filter(e => parseFloat(e.amount) > 0);
    if (!entries.length) {
      this.toast.warning('أدخل مبلغاً واحداً على الأقل');
      return;
    }

    const total = this.getCsFormTotal();
    const vTypeLabel = opType.voucherType === 'receipt' ? 'تحصيل' : opType.voucherType === 'payment' ? 'توريد' : 'عملية';
    const summaryLines = entries.map(e => `\u2022 ${e.accountName}: ${parseFloat(e.amount).toLocaleString('ar-SA')}`).join('\n');
    const confirmed = await this.toast.confirm({
      title: `تأكيد ${vTypeLabel} - ${opType.name}`,
      message: `سيتم تنفيذ ${entries.length} عملية بإجمالي ${total.toLocaleString('ar-SA')}:\n${summaryLines}`,
      type: opType.voucherType === 'payment' ? 'danger' : 'info',
    });
    if (!confirmed) return;

    this.saving.set(true);
    const results: any[] = [];
    const errors: string[] = [];

    try {
      for (const entry of entries) {
        try {
          const result = await this.api.createVoucher(this.bizId, {
            voucherType: opType.voucherType || 'receipt',
            operationTypeId: opType.id,
            toAccountId: entry.accountId,
            amount: parseFloat(entry.amount),
            currencyId: 1,
            description: this.csFormDescription() || `${opType.name} - ${entry.accountName}`,
            voucherDate: this.csFormDate(),
          });
          results.push(result);
        } catch (e: any) {
          const errMsg = e.message || 'خطأ غير معروف';
          errors.push(`${entry.accountName}: ${errMsg}`);
        }
      }

      if (results.length > 0 && errors.length === 0) {
        this.toast.success(`تم تنفيذ ${results.length} عملية بنجاح - إجمالي: ${total.toLocaleString('ar-SA')}`);
      } else if (results.length > 0 && errors.length > 0) {
        this.toast.warning(`تم ${results.length} عملية بنجاح، فشلت ${errors.length} عملية:\n${errors.join('\n')}`);
      } else {
        // عرض تفاصيل الخطأ الأول لتوضيح السبب
        const firstError = errors.length > 0 ? errors[0] : '';
        const errorDetail = firstError.includes('غير مفعّل') 
          ? 'نوع العملية غير مفعّل - يرجى تفعيله من صفحة أنواع العمليات'
          : firstError.includes('غير موجود')
          ? 'نوع العملية غير موجود - يرجى التحقق من الإعدادات'
          : firstError.includes('لا ينتمي')
          ? 'الحساب لا ينتمي لهذا العمل - يرجى التحقق من إعدادات الحسابات'
          : firstError.includes('المبلغ')
          ? 'المبلغ غير صالح - يرجى إدخال مبلغ صحيح'
          : firstError.includes('المستهدف')
          ? 'الحساب المستهدف مطلوب - يرجى التحقق من إعدادات نوع العملية'
          : errors.length > 0 
          ? `فشلت العمليات:\n${errors.join('\n')}`
          : 'فشلت العمليات - خطأ غير متوقع';
        this.toast.error(errorDetail);
      }

      if (results.length > 0) {
        this.csSelectedOpType.set(null);
        this.csFormEntries.set([]);
      }
      // إعادة تحميل البيانات
      const screen = this.activeScreen();
      if (screen) await this.loadCollectionStyleScreen(screen);
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تنفيذ العملية');
    } finally {
      this.saving.set(false);
    }
  }

  getCsHistoryStats() {
    const all = this.csVouchers();
    const receipts = all.filter((v: any) => v.voucherType === 'receipt');
    const payments = all.filter((v: any) => v.voucherType === 'payment');
    return {
      totalReceipts: receipts.reduce((s: number, v: any) => s + parseFloat(v.amount || 0), 0),
      totalPayments: payments.reduce((s: number, v: any) => s + parseFloat(v.amount || 0), 0),
      receiptCount: receipts.length,
      paymentCount: payments.length,
    };
  }

  getCsFundBalance(acc: AccountData): number {
    return acc.total_balance || 0;
  }

  // فتح معالج إعداد collection-style
  async openCsConfigWizard() {
    const screen = this.activeScreen();
    if (!screen) return;
    const config = this.collectionStyleConfig();
    this.csTab1Label.set(config?.tab1Label || 'تحصيل');
    this.csTab2Label.set(config?.tab2Label || 'توريد');
    this.csAccountsSectionLabel.set(config?.accountsSectionLabel || 'الصناديق');
    this.csTab1OperationTypeIds.set(config?.tab1OperationTypeIds || []);
    this.csTab2OperationTypeIds.set(config?.tab2OperationTypeIds || []);
    this.csAccountIds.set(config?.accountIds || []);
    this.csWizardStep.set(1);
    // تحميل البيانات
    await this.loadContentBindingData();
    this.showCsConfigWizard.set(true);

  }

  closeCsConfigWizard() {
    this.showCsConfigWizard.set(false);
  }

  nextCsWizardStep() {
    const step = this.csWizardStep();
    if (step < 4) this.csWizardStep.set(step + 1);
  }

  prevCsWizardStep() {
    const step = this.csWizardStep();
    if (step > 1) this.csWizardStep.set(step - 1);
  }

  toggleCsTab1OpType(id: number) {
    const ids = [...this.csTab1OperationTypeIds()];
    const idx = ids.indexOf(id);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(id);
    this.csTab1OperationTypeIds.set(ids);
  }

  toggleCsTab2OpType(id: number) {
    const ids = [...this.csTab2OperationTypeIds()];
    const idx = ids.indexOf(id);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(id);
    this.csTab2OperationTypeIds.set(ids);
  }

  toggleCsAccount(id: number) {
    const ids = [...this.csAccountIds()];
    const idx = ids.indexOf(id);
    if (idx >= 0) ids.splice(idx, 1); else ids.push(id);
    this.csAccountIds.set(ids);
  }

  async saveCsConfig() {
    const screen = this.activeScreen();
    if (!screen) return;
    this.saving.set(true);
    try {
      const payload = {
        tab1Label: this.csTab1Label(),
        tab1OperationTypeIds: this.csTab1OperationTypeIds(),
        tab2Label: this.csTab2Label(),
        tab2OperationTypeIds: this.csTab2OperationTypeIds(),
        accountsSectionLabel: this.csAccountsSectionLabel(),
        accountIds: this.csAccountIds(),
      };
      await this.api.saveCollectionStyleConfig(this.bizId, screen.id, payload);
      this.toast.success('تم حفظ الإعداد بنجاح');
      this.closeCsConfigWizard();
      // إعادة تحميل الشاشة
      await this.loadCollectionStyleScreen(screen);
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في حفظ الإعداد');
    } finally {
      this.saving.set(false);
    }
  }

  backToList() {
    this.viewMode.set('list');
    this.activeScreen.set(null);
    this.widgets.set([]);
    this.gridItems = [];
    this.editMode.set(false);
    this.hasUnsavedChanges.set(false);
    this.collectionStyleConfig.set(null);

  }

  toggleEditMode() {
    const newMode = !this.editMode();
    this.editMode.set(newMode);
    this.updateGridsterEditMode(newMode);
  }

  // ===================== Widget Library (Sidebar) =====================
  toggleWidgetLibrary() {
    this.showWidgetLibrary.set(!this.showWidgetLibrary());
  }

  // Open widget library - auto-enables edit mode if not already enabled
  openWidgetLibrary() {
    if (!this.editMode()) {
      this.editMode.set(true);
      this.updateGridsterEditMode(true);
    }
    this.showWidgetLibrary.set(!this.showWidgetLibrary());
  }

  async addWidgetFromLibrary(type: any) {
    const screen = this.activeScreen();
    if (!screen) return;

    this.saving.set(true);
    try {
      const newWidget = {
        widgetType: type.value,
        title: type.label,
        positionX: 0,
        positionY: 0,
        width: type.defaultW,
        height: type.defaultH,
        config: {},
      };
      await this.api.createScreenWidget(screen.id, newWidget);
      this.toast.success(`تم إضافة "${type.label}"`);
      await this.loadWidgets(screen.id);
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Copy Widget from Other Screens =====================
  async openCopyWidgetModal() {
    try {
      const data = await this.api.getScreensWithWidgets(this.bizId);
      const currentScreenId = this.activeScreen()?.id;
      this.otherScreens.set(data.filter((s: any) => s.id !== currentScreenId && s.widgets?.length > 0));
      this.selectedCopyScreen.set(null);
      this.showCopyWidgetModal.set(true);
  
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل الشاشات');
    }
  }

  closeCopyWidgetModal() {
    this.showCopyWidgetModal.set(false);
    this.selectedCopyScreen.set(null);
  }

  selectCopyScreen(screen: ScreenWithWidgets) {
    this.selectedCopyScreen.set(screen);
  }

  async copyWidgetFromOtherScreen(widget: ScreenWidget) {
    const screen = this.activeScreen();
    if (!screen) return;

    this.saving.set(true);
    try {
      await this.api.copyWidgetToScreen(widget.id, screen.id);
      this.toast.success(`تم نسخ "${widget.title}" بنجاح`);
      await this.loadWidgets(screen.id);
      this.closeCopyWidgetModal();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ أثناء النسخ');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Widget CRUD =====================
  openWidgetForm(widget?: ScreenWidget) {
    if (widget) {
      this.editingWidget.set(widget);
      this.widgetForm.set({
        widgetType: widget.widgetType,
        title: widget.title,
        config: widget.config || {},
      });
    } else {
      this.editingWidget.set(null);
      const typeInfo = this.widgetTypes[0];
      this.widgetForm.set({
        widgetType: 'templates',
        title: typeInfo.label,
        config: {},
      });
    }
    this.showWidgetForm.set(true);

  }

  closeWidgetForm() {
    this.showWidgetForm.set(false);
    this.editingWidget.set(null);
  }

  async saveWidget() {
    const form = this.widgetForm();
    const screen = this.activeScreen();
    if (!screen || !form.title.trim()) {
      this.toast.warning('يرجى إدخال عنوان العنصر');
      return;
    }

    this.saving.set(true);
    try {
      const editing = this.editingWidget();
      if (editing) {
        await this.api.updateWidget(editing.id, {
          title: form.title,
          widgetType: form.widgetType,
          config: form.config,
        });
        this.toast.success('تم تحديث العنصر');
      } else {
        const typeInfo = this.getWidgetTypeInfo(form.widgetType);
        await this.api.createScreenWidget(screen.id, {
          widgetType: form.widgetType,
          title: form.title,
          width: typeInfo.defaultW,
          height: typeInfo.defaultH,
          config: form.config,
        });
        this.toast.success('تم إضافة العنصر');
      }
      this.closeWidgetForm();
      await this.loadWidgets(screen.id);
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    } finally {
      this.saving.set(false);
    }
  }

  async deleteWidget(widget: ScreenWidget) {
    const confirmed = await this.toast.confirm({
      title: 'حذف العنصر',
      message: `هل تريد حذف العنصر "${widget.title}"؟`,
      type: 'danger',
    });
    if (!confirmed) return;

    try {
      await this.api.deleteWidget(widget.id);
      this.toast.success('تم حذف العنصر');
      const screen = this.activeScreen();
      if (screen) await this.loadWidgets(screen.id);
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ أثناء الحذف');
    }
  }

  async toggleWidgetVisibility(widget: ScreenWidget) {
    try {
      await this.api.updateWidget(widget.id, { isVisible: !widget.isVisible });
      const screen = this.activeScreen();
      if (screen) await this.loadWidgets(screen.id);
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  // ===================== Save Layout =====================
  async saveLayout() {
    const screen = this.activeScreen();
    if (!screen) return;

    this.saving.set(true);
    try {
      const widgetUpdates = this.gridItems.map(item => ({
        id: item.widgetData.id,
        positionX: item.x,
        positionY: item.y,
        width: item.cols,
        height: item.rows,
      }));
      await this.api.batchUpdateWidgets(screen.id, widgetUpdates);

      // Save notes text
      for (const item of this.gridItems) {
        if (item.widgetData.widgetType === 'notes' && this.notesText[item.widgetData.id] !== undefined) {
          await this.api.saveWidgetNotes(item.widgetData.id, this.notesText[item.widgetData.id]);
        }
      }

      this.hasUnsavedChanges.set(false);
      this.toast.success('تم حفظ التخطيط بنجاح');
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ أثناء الحفظ');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Notes =====================
  onNotesChange(widgetId: number, text: string) {
    this.notesText[widgetId] = text;
    this.hasUnsavedChanges.set(true);

    // Auto-save notes after 2 seconds of inactivity
    if (this.notesSaveTimeout[widgetId]) clearTimeout(this.notesSaveTimeout[widgetId]);
    this.notesSaveTimeout[widgetId] = setTimeout(async () => {
      try {
        await this.api.saveWidgetNotes(widgetId, text);
      } catch (e) {
        console.error('Error auto-saving notes:', e);
      }
    }, 2000);
  }

  // ===================== Helpers =====================
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatNumber(num: number): string {
    if (!num && num !== 0) return '0';
    return num.toLocaleString('ar-SA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  formatAmount(amount: string | number): string {
    const n = typeof amount === 'string' ? parseFloat(amount) : amount;
    if (isNaN(n)) return '0';
    return n.toLocaleString('ar-SA', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }

  getVoucherTypeLabel(type: string): string {
    switch (type) {
      case 'receipt': return 'تحصيل';
      case 'payment': return 'صرف';
      case 'journal': return 'قيد';
      default: return type || 'عملية';
    }
  }

  getVoucherTypeClass(type: string): string {
    switch (type) {
      case 'receipt': return 'collection';
      case 'payment': return 'expense';
      case 'journal': return 'transfer';
      default: return 'collection';
    }
  }

  getAccountIcon(type: string): string {
    switch (type) {
      case 'fund': return 'account_balance_wallet';
      case 'bank': return 'account_balance';
      case 'exchange': return 'currency_exchange';
      case 'e_wallet': return 'smartphone';
      default: return 'account_balance_wallet';
    }
  }

  getBalanceTrend(account: AccountData): string {
    const movements = account.last_movements || [];
    if (movements.length < 2) return 'stable';
    const lastType = movements[0]?.line_type;
    return lastType === 'debit' ? 'up' : 'down';
  }

  getTrendIcon(trend: string): string {
    switch (trend) {
      case 'up': return 'trending_up';
      case 'down': return 'trending_down';
      default: return 'trending_flat';
    }
  }

  getTrendColor(trend: string): string {
    switch (trend) {
      case 'up': return '#22c55e';
      case 'down': return '#ef4444';
      default: return '#94a3b8';
    }
  }

  getWizardWidgetColor(w: WizardWidget): string {
    return w.config?.color || this.getWidgetTypeInfo(w.widgetType).color;
  }

  hasBindableContent(w: WizardWidget): boolean {
    return ['templates', 'accounts', 'log'].includes(w.widgetType);
  }

  getBindingLabel(w: WizardWidget): string {
    switch (w.widgetType) {
      case 'templates': return `${(w.config?.operationTypeIds || []).length} قالب مرتبط`;
      case 'accounts': return `${(w.config?.accountIds || []).length} حساب مرتبط`;
      case 'log': return w.config?.filters ? 'فلاتر محددة' : 'بدون فلاتر';
      default: return '';
    }
  }

  // ===================== Permissions Modal =====================
  async openPermissionsModal(screen: ScreenTemplate) {
    this.permissionsScreen.set(screen);
    this.permissionsLoading.set(true);
    this.showPermissionsModal.set(true);

    try {
      const [users, perms] = await Promise.all([
        this.api.getUsers(),
        this.api.getScreenPermissions(screen.id),
      ]);
      this.permissionsUsers.set(users);
      const map: { [userId: number]: string } = {};
      for (const p of perms) {
        map[p.userId] = p.permission;
      }
      this.permissionsMap.set(map);
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل الصلاحيات');
    } finally {
      this.permissionsLoading.set(false);
    }
  }

  closePermissionsModal() {
    this.showPermissionsModal.set(false);
    this.permissionsScreen.set(null);
  }

  setUserPermission(userId: number, permission: string) {
    const map = { ...this.permissionsMap() };
    if (permission === 'none') {
      delete map[userId];
    } else {
      map[userId] = permission;
    }
    this.permissionsMap.set(map);
  }

  getUserPermission(userId: number): string {
    return this.permissionsMap()[userId] || 'none';
  }

  async savePermissions() {
    const screen = this.permissionsScreen();
    if (!screen) return;

    this.saving.set(true);
    try {
      const map = this.permissionsMap();
      const permissions = Object.entries(map).map(([userId, permission]) => ({
        userId: parseInt(userId),
        permission,
      }));
      await this.api.batchUpdateScreenPermissions(screen.id, permissions);
      this.toast.success('تم حفظ الصلاحيات بنجاح');
      this.closePermissionsModal();
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ أثناء حفظ الصلاحيات');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Add to Sidebar Modal =====================
  async openSidebarModal(screen: ScreenTemplate) {
    this.sidebarScreen.set(screen);
    this.selectedSidebarSection.set(0);
    this.sidebarSortOrder.set(99);
    try {
      const sections = await this.api.getSidebarSections(this.bizId);
      this.sidebarSections.set(sections);
      if (sections.length > 0) {
        this.selectedSidebarSection.set(sections[0].id);
      }
      this.showSidebarModal.set(true);
  
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل الأقسام');
    }
  }

  closeSidebarModal() {
    this.showSidebarModal.set(false);
    this.sidebarScreen.set(null);
  }

  async addToSidebar() {
    const screen = this.sidebarScreen();
    const sectionId = this.selectedSidebarSection();
    if (!screen || !sectionId) {
      this.toast.warning('يرجى اختيار القسم');
      return;
    }

    this.saving.set(true);
    try {
      await this.api.addScreenToSidebar(this.bizId, screen.id, {
        sectionId,
        sortOrder: this.sidebarSortOrder(),
      });
      this.toast.success('تم إضافة الشاشة للقائمة الجانبية');
      this.closeSidebarModal();
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ أثناء الإضافة');
    } finally {
      this.saving.set(false);
    }
  }

  // ===================== Color Picker Helper =====================
  onColorPickerChange(color: string, target: 'screen' | 'wizard' | 'widget' | 'wizardWidget', idx?: number) {
    switch (target) {
      case 'screen':
        this.screenForm.set({ ...this.screenForm(), color });
        break;
      case 'wizard':
        this.wizardScreenColor.set(color);
        break;
      case 'widget':
        this.widgetForm.set({ ...this.widgetForm(), config: { ...this.widgetForm().config, color } });
        break;
      case 'wizardWidget':
        if (idx !== undefined) this.updateWizardWidgetColor(idx, color);
        break;
    }
  }
}
