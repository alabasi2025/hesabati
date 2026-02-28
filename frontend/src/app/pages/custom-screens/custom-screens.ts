import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Gridster, GridsterItem, GridsterConfig, GridsterItemConfig, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
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

@Component({
  selector: 'app-custom-screens',
  standalone: true,
  imports: [CommonModule, FormsModule, Gridster, GridsterItem, BaseChartDirective],
  templateUrl: './custom-screens.html',
  styleUrl: './custom-screens.scss',
})
export class CustomScreensComponent implements OnInit {
  private route = inject(ActivatedRoute);
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

  // ===================== Gridster =====================
  gridsterOptions: GridsterConfig = {};
  gridItems: GridWidget[] = [];

  // ===================== UI State =====================
  viewMode = signal<'list' | 'detail' | 'wizard'>('list');
  editMode = signal(false);
  showWidgetLibrary = signal(false);
  hasUnsavedChanges = signal(false);

  // ===================== Wizard State =====================
  wizardStep = signal(1);
  wizardScreenName = signal('');
  wizardScreenDesc = signal('');
  wizardScreenIcon = signal('dashboard');
  wizardScreenColor = signal('#3b82f6');
  wizardSelectedTemplate = signal<string>('blank');
  wizardWidgets = signal<WizardWidget[]>([]);
  wizardEditingWidgetIdx = signal<number | null>(null);

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
      key: 'collection',
      name: 'قالب تحصيل',
      desc: 'شاشة تحصيل يومي مع قوالب عمليات وسجل ومراقبة حسابات',
      icon: 'payments',
      color: '#22c55e',
      widgets: [
        { widgetType: 'templates', title: 'قوالب العمليات', config: {}, positionX: 0, positionY: 0, width: 6, height: 4, sortOrder: 0, isVisible: true },
        { widgetType: 'log', title: 'سجل العمليات', config: {}, positionX: 6, positionY: 0, width: 6, height: 4, sortOrder: 1, isVisible: true },
        { widgetType: 'accounts', title: 'مراقبة الحسابات', config: {}, positionX: 0, positionY: 4, width: 12, height: 4, sortOrder: 2, isVisible: true },
      ],
    },
    {
      key: 'delivery',
      name: 'قالب توريد',
      desc: 'شاشة توريد مع قوالب عمليات وسجل وإحصائيات',
      icon: 'local_shipping',
      color: '#3b82f6',
      widgets: [
        { widgetType: 'templates', title: 'قوالب العمليات', config: {}, positionX: 0, positionY: 0, width: 6, height: 4, sortOrder: 0, isVisible: true },
        { widgetType: 'log', title: 'سجل العمليات', config: {}, positionX: 6, positionY: 0, width: 6, height: 4, sortOrder: 1, isVisible: true },
        { widgetType: 'stats', title: 'الإحصائيات', config: {}, positionX: 0, positionY: 4, width: 12, height: 2, sortOrder: 2, isVisible: true },
      ],
    },
    {
      key: 'monitoring',
      name: 'قالب مراقبة',
      desc: 'شاشة مراقبة ومتابعة مع حسابات وإحصائيات ورسم بياني',
      icon: 'monitor',
      color: '#f59e0b',
      widgets: [
        { widgetType: 'accounts', title: 'مراقبة الحسابات', config: {}, positionX: 0, positionY: 0, width: 12, height: 5, sortOrder: 0, isVisible: true },
        { widgetType: 'stats', title: 'الإحصائيات', config: {}, positionX: 0, positionY: 5, width: 6, height: 2, sortOrder: 1, isVisible: true },
        { widgetType: 'chart', title: 'رسم بياني', config: {}, positionX: 6, positionY: 5, width: 6, height: 5, sortOrder: 2, isVisible: true },
      ],
    },
    {
      key: 'reports',
      name: 'قالب تقارير',
      desc: 'شاشة تقارير مع رسم بياني وإحصائيات وسجل',
      icon: 'assessment',
      color: '#8b5cf6',
      widgets: [
        { widgetType: 'chart', title: 'رسم بياني', config: {}, positionX: 0, positionY: 0, width: 8, height: 5, sortOrder: 0, isVisible: true },
        { widgetType: 'stats', title: 'الإحصائيات', config: {}, positionX: 8, positionY: 0, width: 4, height: 2, sortOrder: 1, isVisible: true },
        { widgetType: 'log', title: 'سجل العمليات', config: {}, positionX: 0, positionY: 5, width: 12, height: 5, sortOrder: 2, isVisible: true },
      ],
    },
    {
      key: 'blank',
      name: 'قالب فارغ',
      desc: 'ابدأ من الصفر - بدون عناصر',
      icon: 'add_circle_outline',
      color: '#94a3b8',
      widgets: [],
    },
  ];

  // ===================== Demo Data =====================
  demoLogEntries = [
    { id: 1, type: 'تحصيل', amount: '5,000', date: '2026/02/28', account: 'الصندوق الرئيسي' },
    { id: 2, type: 'توريد', amount: '3,200', date: '2026/02/27', account: 'حساب البنك' },
    { id: 3, type: 'صرف', amount: '1,500', date: '2026/02/27', account: 'مصروفات' },
    { id: 4, type: 'تحصيل', amount: '8,000', date: '2026/02/26', account: 'الصندوق الرئيسي' },
    { id: 5, type: 'تحويل', amount: '2,000', date: '2026/02/26', account: 'حساب التوفير' },
  ];

  demoAccounts = [
    { name: 'الصندوق الرئيسي', balance: '25,430', trend: 'up', icon: 'account_balance_wallet' },
    { name: 'حساب البنك', balance: '142,800', trend: 'up', icon: 'account_balance' },
    { name: 'المصروفات', balance: '8,650', trend: 'down', icon: 'payments' },
    { name: 'حساب التوفير', balance: '50,000', trend: 'stable', icon: 'savings' },
  ];

  demoStats = [
    { label: 'إجمالي التحصيل', value: '156,200', icon: 'trending_up', color: '#22c55e', change: '+12%' },
    { label: 'إجمالي الصرف', value: '43,800', icon: 'trending_down', color: '#ef4444', change: '-5%' },
    { label: 'عدد العمليات', value: '284', icon: 'receipt_long', color: '#3b82f6', change: '+8%' },
    { label: 'صافي الرصيد', value: '112,400', icon: 'account_balance', color: '#8b5cf6', change: '+18%' },
  ];

  demoTemplates = [
    { name: 'تحصيل يومي', icon: 'payments', color: '#22c55e' },
    { name: 'توريد بنكي', icon: 'account_balance', color: '#3b82f6' },
    { name: 'صرف مصروفات', icon: 'receipt', color: '#ef4444' },
    { name: 'تحويل داخلي', icon: 'swap_horiz', color: '#f59e0b' },
  ];

  // Chart data
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
    datasets: [
      {
        data: [65000, 59000, 80000, 81000, 56000, 95000],
        label: 'التحصيل',
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        data: [28000, 48000, 40000, 19000, 36000, 27000],
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

  // ===================== WIZARD =====================
  startWizard() {
    this.viewMode.set('wizard');
    this.wizardStep.set(1);
    this.wizardScreenName.set('');
    this.wizardScreenDesc.set('');
    this.wizardScreenIcon.set('dashboard');
    this.wizardScreenColor.set('#3b82f6');
    this.wizardSelectedTemplate.set('blank');
    this.wizardWidgets.set([]);
    this.customizingWidgetIdx.set(null);
    this.bindingWidgetIdx.set(null);
  }

  cancelWizard() {
    this.viewMode.set('list');
  }

  selectTemplate(key: string) {
    this.wizardSelectedTemplate.set(key);
    const tpl = this.screenTemplateOptions.find(t => t.key === key);
    if (tpl) {
      this.wizardWidgets.set(tpl.widgets.map(w => ({ ...w })));
      if (key !== 'blank') {
        this.wizardScreenIcon.set(tpl.icon);
        this.wizardScreenColor.set(tpl.color);
        if (!this.wizardScreenName()) {
          this.wizardScreenName.set(tpl.name.replace('قالب ', 'شاشة '));
        }
      }
    }
  }

  nextWizardStep() {
    const step = this.wizardStep();
    if (step === 1) {
      // Validate template selection
      this.wizardStep.set(2);
    } else if (step === 2) {
      this.wizardStep.set(3);
    } else if (step === 3) {
      this.wizardStep.set(4);
      this.loadContentBindingData();
    }
  }

  prevWizardStep() {
    const step = this.wizardStep();
    if (step > 1) {
      this.wizardStep.set(step - 1);
      this.customizingWidgetIdx.set(null);
      this.bindingWidgetIdx.set(null);
    }
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
      const payload = {
        name,
        description: this.wizardScreenDesc(),
        icon: this.wizardScreenIcon(),
        color: this.wizardScreenColor(),
        templateKey: this.wizardSelectedTemplate(),
        widgets: this.wizardWidgets(),
        addToSidebar: true,
      };
      await this.api.createScreen(this.bizId, payload);
      this.toast.success('تم إنشاء الشاشة بنجاح');
      this.viewMode.set('list');
      await this.loadScreens();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ أثناء الإنشاء');
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
      // New screen -> go to wizard
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
    this.viewMode.set('detail');
    this.editMode.set(false);
    this.hasUnsavedChanges.set(false);
    this.updateGridsterEditMode(false);
    await this.loadWidgets(screen.id);
  }

  backToList() {
    this.viewMode.set('list');
    this.activeScreen.set(null);
    this.widgets.set([]);
    this.gridItems = [];
    this.editMode.set(false);
    this.hasUnsavedChanges.set(false);
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
          await this.api.updateWidget(item.widgetData.id, {
            config: { text: this.notesText[item.widgetData.id] },
          });
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
  }

  // ===================== Helpers =====================
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
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
}
