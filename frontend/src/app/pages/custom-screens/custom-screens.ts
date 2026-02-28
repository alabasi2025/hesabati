import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Gridster, GridsterItem, GridsterConfig, GridsterItemConfig, GridType, CompactType, DisplayGrid } from 'angular-gridster2';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { AuthService } from '../../services/auth.service';

interface ScreenTemplate {
  id: number;
  businessId: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  layoutConfig: any;
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

interface ScreenPresetTemplate {
  key: string;
  name: string;
  icon: string;
  color: string;
  desc: string;
  widgets: { widgetType: string; title: string; positionX: number; positionY: number; width: number; height: number; sortOrder: number }[];
}

interface AppUser {
  id: number;
  username: string;
  fullName: string;
  role: string;
  isActive: boolean;
}

interface ScreenPermission {
  id: number;
  screenId: number;
  userId: number;
  permission: string;
  sortOrder: number;
  username: string;
  fullName: string;
  role: string;
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
  private auth = inject(AuthService);

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
  viewMode = signal<'list' | 'detail'>('list');
  editMode = signal(false);
  showWidgetLibrary = signal(false);
  hasUnsavedChanges = signal(false);

  // ===================== Wizard State =====================
  showWizard = signal(false);
  wizardStep = signal(1);
  wizardScreen = signal<ScreenTemplate | null>(null);
  wizardWidgets = signal<ScreenWidget[]>([]);
  editingScreen = signal<ScreenTemplate | null>(null);

  // ===================== Screen Form (Step 1) =====================
  screenForm = signal({
    name: '',
    description: '',
    icon: 'dashboard',
    color: '#3b82f6',
    templateKey: 'empty',
  });

  // ===================== Widget Form Modal =====================
  showWidgetForm = signal(false);
  editingWidget = signal<ScreenWidget | null>(null);
  widgetForm = signal({
    widgetType: 'templates',
    title: '',
    config: {} as any,
  });

  // ===================== Copy Widgets Modal =====================
  showCopyModal = signal(false);
  copySourceScreens = signal<ScreenTemplate[]>([]);
  copySourceWidgets = signal<ScreenWidget[]>([]);
  selectedCopyWidgets = signal<Set<number>>(new Set());
  copySourceScreenId = signal(0);

  // ===================== Permissions Modal =====================
  showPermissionsModal = signal(false);
  permissionsScreen = signal<ScreenTemplate | null>(null);
  allUsers = signal<AppUser[]>([]);
  screenPermissions = signal<ScreenPermission[]>([]);
  permissionsLoading = signal(false);

  // ===================== Sidebar Modal =====================
  showSidebarModal = signal(false);
  sidebarSections = signal<any[]>([]);
  sidebarForm = signal({ sectionId: 0, sortOrder: 99 });

  // ===================== Content Linking (Step 4) =====================
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
  selectedWidgetForLinking = signal<ScreenWidget | null>(null);
  widgetLinkedTemplates = signal<any[]>([]);
  widgetLinkedAccounts = signal<any[]>([]);
  linkingLoading = signal(false);

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

  // ===================== Screen Preset Templates =====================
  presetTemplates: ScreenPresetTemplate[] = [
    {
      key: 'collection', name: 'قالب تحصيل', icon: 'payments', color: '#22c55e',
      desc: 'شاشة تحصيل يومي مع قوالب عمليات وسجل ومراقبة حسابات',
      widgets: [
        { widgetType: 'templates', title: 'قوالب العمليات', positionX: 0, positionY: 0, width: 6, height: 4, sortOrder: 0 },
        { widgetType: 'log', title: 'سجل العمليات', positionX: 6, positionY: 0, width: 6, height: 4, sortOrder: 1 },
        { widgetType: 'accounts', title: 'مراقبة الحسابات', positionX: 0, positionY: 4, width: 12, height: 3, sortOrder: 2 },
      ],
    },
    {
      key: 'delivery', name: 'قالب توريد', icon: 'local_shipping', color: '#3b82f6',
      desc: 'شاشة توريد مع قوالب عمليات وسجل وإحصائيات',
      widgets: [
        { widgetType: 'templates', title: 'قوالب العمليات', positionX: 0, positionY: 0, width: 6, height: 4, sortOrder: 0 },
        { widgetType: 'log', title: 'سجل التوريدات', positionX: 6, positionY: 0, width: 6, height: 4, sortOrder: 1 },
        { widgetType: 'stats', title: 'إحصائيات التوريد', positionX: 0, positionY: 4, width: 12, height: 2, sortOrder: 2 },
      ],
    },
    {
      key: 'monitoring', name: 'قالب مراقبة', icon: 'monitoring', color: '#f59e0b',
      desc: 'شاشة مراقبة ومتابعة مع حسابات وإحصائيات ورسم بياني',
      widgets: [
        { widgetType: 'accounts', title: 'مراقبة الحسابات', positionX: 0, positionY: 0, width: 6, height: 5, sortOrder: 0 },
        { widgetType: 'stats', title: 'الإحصائيات', positionX: 6, positionY: 0, width: 6, height: 2, sortOrder: 1 },
        { widgetType: 'chart', title: 'رسم بياني', positionX: 6, positionY: 2, width: 6, height: 5, sortOrder: 2 },
      ],
    },
    {
      key: 'reports', name: 'قالب تقارير', icon: 'assessment', color: '#8b5cf6',
      desc: 'شاشة تقارير مع رسم بياني وإحصائيات وسجل',
      widgets: [
        { widgetType: 'chart', title: 'رسم بياني', positionX: 0, positionY: 0, width: 6, height: 5, sortOrder: 0 },
        { widgetType: 'stats', title: 'الإحصائيات', positionX: 6, positionY: 0, width: 6, height: 2, sortOrder: 1 },
        { widgetType: 'log', title: 'سجل العمليات', positionX: 6, positionY: 2, width: 6, height: 5, sortOrder: 2 },
      ],
    },
    {
      key: 'empty', name: 'شاشة فارغة', icon: 'add_box', color: '#94a3b8',
      desc: 'ابدأ من الصفر وأضف العناصر التي تحتاجها',
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
    widgets.forEach(w => {
      if (w.widgetType === 'notes') {
        this.notesText[w.id] = w.config?.text || '';
      }
    });
  }

  // ===================== WIZARD: إنشاء شاشة جديدة =====================

  openWizard(editScreen?: ScreenTemplate) {
    if (editScreen) {
      this.editingScreen.set(editScreen);
      this.screenForm.set({
        name: editScreen.name,
        description: editScreen.description || '',
        icon: editScreen.icon || 'dashboard',
        color: editScreen.color || '#3b82f6',
        templateKey: 'empty',
      });
      this.wizardStep.set(1);
    } else {
      this.editingScreen.set(null);
      this.screenForm.set({ name: '', description: '', icon: 'dashboard', color: '#3b82f6', templateKey: 'empty' });
      this.wizardStep.set(1);
    }
    this.wizardScreen.set(null);
    this.wizardWidgets.set([]);
    this.showWizard.set(true);
  }

  closeWizard() {
    this.showWizard.set(false);
    this.wizardStep.set(1);
    this.editingScreen.set(null);
  }

  async wizardNext() {
    const step = this.wizardStep();

    if (step === 1) {
      // Validate and create/update screen
      const form = this.screenForm();
      if (!form.name.trim()) {
        this.toast.warning('يرجى إدخال اسم الشاشة');
        return;
      }
      this.saving.set(true);
      try {
        const editing = this.editingScreen();
        if (editing) {
          const updated = await this.api.updateScreen(editing.id, {
            name: form.name,
            description: form.description,
            icon: form.icon,
            color: form.color,
          });
          this.wizardScreen.set(updated);
          // Load existing widgets
          const wds = await this.api.getScreenWidgets(editing.id);
          this.wizardWidgets.set(wds);
        } else {
          // Create screen from template
          const preset = this.presetTemplates.find(p => p.key === form.templateKey);
          const screen = await this.api.createScreenFromTemplate(this.bizId, {
            name: form.name,
            description: form.description,
            icon: form.icon,
            color: form.color,
            widgets: preset?.widgets || [],
          });
          this.wizardScreen.set(screen);
          // Load created widgets
          const wds = await this.api.getScreenWidgets(screen.id);
          this.wizardWidgets.set(wds);
        }
        this.wizardStep.set(2);
      } catch (e: any) {
        this.toast.error(e.message || 'حدث خطأ');
      } finally {
        this.saving.set(false);
      }
    } else if (step === 2) {
      this.wizardStep.set(3);
    } else if (step === 3) {
      this.wizardStep.set(4);
      // Load operation types and accounts for linking
      try {
        const [opTypes, accs] = await Promise.all([
          this.api.getOperationTypes(this.bizId),
          this.api.getAccounts(this.bizId),
        ]);
        this.operationTypes.set(opTypes);
        this.accounts.set(accs);
      } catch (e) {
        console.error(e);
      }
    } else if (step === 4) {
      // Finish wizard
      this.closeWizard();
      await this.loadScreens();
      const ws = this.wizardScreen();
      if (ws) {
        await this.openScreen(ws);
      }
      this.toast.success('تم إنشاء الشاشة بنجاح! يمكنك الآن تخصيصها.');
    }
  }

  wizardBack() {
    const step = this.wizardStep();
    if (step > 1) {
      this.wizardStep.set(step - 1);
    }
  }

  // Step 2: Add widget in wizard
  async wizardAddWidget(type: any) {
    const screen = this.wizardScreen();
    if (!screen) return;
    this.saving.set(true);
    try {
      await this.api.createScreenWidget(screen.id, {
        widgetType: type.value,
        title: type.label,
        width: type.defaultW,
        height: type.defaultH,
        config: {},
      });
      const wds = await this.api.getScreenWidgets(screen.id);
      this.wizardWidgets.set(wds);
      this.toast.success(`تم إضافة "${type.label}"`);
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    } finally {
      this.saving.set(false);
    }
  }

  // Step 2: Delete widget in wizard
  async wizardDeleteWidget(widget: ScreenWidget) {
    try {
      await this.api.deleteWidget(widget.id);
      const screen = this.wizardScreen();
      if (screen) {
        const wds = await this.api.getScreenWidgets(screen.id);
        this.wizardWidgets.set(wds);
      }
      this.toast.success('تم حذف العنصر');
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  // Step 2: Open copy widgets modal
  async openCopyWidgetsModal() {
    const currentScreenId = this.wizardScreen()?.id || this.activeScreen()?.id;
    const otherScreens = this.screens().filter(s => s.id !== currentScreenId);
    this.copySourceScreens.set(otherScreens);
    this.copySourceWidgets.set([]);
    this.selectedCopyWidgets.set(new Set());
    this.copySourceScreenId.set(0);
    this.showCopyModal.set(true);
  }

  async loadCopySourceWidgets(screenId: number) {
    this.copySourceScreenId.set(screenId);
    try {
      const wds = await this.api.getScreenWidgets(screenId);
      this.copySourceWidgets.set(wds);
      this.selectedCopyWidgets.set(new Set());
    } catch (e) {
      console.error(e);
    }
  }

  toggleCopyWidget(widgetId: number) {
    const current = new Set(this.selectedCopyWidgets());
    if (current.has(widgetId)) {
      current.delete(widgetId);
    } else {
      current.add(widgetId);
    }
    this.selectedCopyWidgets.set(current);
  }

  async executeCopyWidgets() {
    const targetId = this.wizardScreen()?.id || this.activeScreen()?.id;
    if (!targetId) return;
    const widgetIds = Array.from(this.selectedCopyWidgets());
    if (widgetIds.length === 0) {
      this.toast.warning('اختر عنصراً واحداً على الأقل');
      return;
    }
    this.saving.set(true);
    try {
      await this.api.copyWidgets(targetId, widgetIds);
      this.toast.success(`تم نسخ ${widgetIds.length} عنصر`);
      this.showCopyModal.set(false);
      // Refresh widgets
      const wds = await this.api.getScreenWidgets(targetId);
      if (this.showWizard()) {
        this.wizardWidgets.set(wds);
      } else {
        this.widgets.set(wds);
        this.buildGridItems(wds);
      }
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ أثناء النسخ');
    } finally {
      this.saving.set(false);
    }
  }

  // Step 3: Toggle visibility
  async wizardToggleVisibility(widget: ScreenWidget) {
    try {
      await this.api.updateWidget(widget.id, { isVisible: !widget.isVisible });
      const screen = this.wizardScreen();
      if (screen) {
        const wds = await this.api.getScreenWidgets(screen.id);
        this.wizardWidgets.set(wds);
      }
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  // Step 3: Update widget title
  async wizardUpdateTitle(widget: ScreenWidget, newTitle: string) {
    if (!newTitle.trim()) return;
    try {
      await this.api.updateWidget(widget.id, { title: newTitle });
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  // Step 4: Content linking
  async selectWidgetForLinking(widget: ScreenWidget) {
    this.selectedWidgetForLinking.set(widget);
    this.linkingLoading.set(true);
    try {
      if (widget.widgetType === 'templates') {
        const tpls = await this.api.getWidgetTemplates(widget.id);
        this.widgetLinkedTemplates.set(tpls);
      } else if (widget.widgetType === 'accounts') {
        const accs = await this.api.getWidgetAccounts(widget.id);
        this.widgetLinkedAccounts.set(accs);
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.linkingLoading.set(false);
    }
  }

  async addOperationTypeToWidget(opTypeId: number) {
    const widget = this.selectedWidgetForLinking();
    if (!widget) return;
    try {
      await this.api.addWidgetTemplate(widget.id, { operationTypeId: opTypeId });
      const tpls = await this.api.getWidgetTemplates(widget.id);
      this.widgetLinkedTemplates.set(tpls);
      this.toast.success('تم ربط القالب');
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  async removeOperationTypeFromWidget(linkId: number) {
    try {
      await this.api.removeWidgetTemplate(linkId);
      const widget = this.selectedWidgetForLinking();
      if (widget) {
        const tpls = await this.api.getWidgetTemplates(widget.id);
        this.widgetLinkedTemplates.set(tpls);
      }
      this.toast.success('تم إزالة الربط');
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  async addAccountToWidget(accountId: number) {
    const widget = this.selectedWidgetForLinking();
    if (!widget) return;
    try {
      await this.api.addWidgetAccount(widget.id, { accountId });
      const accs = await this.api.getWidgetAccounts(widget.id);
      this.widgetLinkedAccounts.set(accs);
      this.toast.success('تم ربط الحساب');
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  async removeAccountFromWidget(linkId: number) {
    try {
      await this.api.removeWidgetAccount(linkId);
      const widget = this.selectedWidgetForLinking();
      if (widget) {
        const accs = await this.api.getWidgetAccounts(widget.id);
        this.widgetLinkedAccounts.set(accs);
      }
      this.toast.success('تم إزالة الربط');
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  isOperationTypeLinked(opTypeId: number): boolean {
    return this.widgetLinkedTemplates().some((t: any) => t.operationTypeId === opTypeId);
  }

  isAccountLinked(accountId: number): boolean {
    return this.widgetLinkedAccounts().some((a: any) => a.accountId === accountId);
  }

  getLinkableWidgets(): ScreenWidget[] {
    return this.wizardWidgets().filter(w => w.widgetType === 'templates' || w.widgetType === 'accounts');
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
      await this.api.createScreenWidget(screen.id, {
        widgetType: type.value,
        title: type.label,
        width: type.defaultW,
        height: type.defaultH,
        config: {},
      });
      this.toast.success(`تم إضافة "${type.label}"`);
      await this.loadWidgets(screen.id);
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
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
      this.widgetForm.set({ widgetType: 'templates', title: this.widgetTypes[0].label, config: {} });
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

  // ===================== Permissions =====================
  async openPermissionsModal(screen: ScreenTemplate) {
    this.permissionsScreen.set(screen);
    this.permissionsLoading.set(true);
    this.showPermissionsModal.set(true);
    try {
      const [users, perms] = await Promise.all([
        this.api.getUsers(),
        this.api.getScreenPermissions(screen.id),
      ]);
      this.allUsers.set(users);
      this.screenPermissions.set(perms);
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

  getUserPermission(userId: number): ScreenPermission | undefined {
    return this.screenPermissions().find(p => p.userId === userId);
  }

  async toggleUserPermission(user: AppUser, permission: string) {
    const screen = this.permissionsScreen();
    if (!screen) return;
    const existing = this.getUserPermission(user.id);
    try {
      if (existing && existing.permission === permission) {
        // Remove permission
        await this.api.deleteScreenPermission(existing.id);
      } else {
        // Add or update permission
        await this.api.addScreenPermission(screen.id, { userId: user.id, permission });
      }
      const perms = await this.api.getScreenPermissions(screen.id);
      this.screenPermissions.set(perms);
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    }
  }

  async savePermissions() {
    const screen = this.permissionsScreen();
    if (!screen) return;
    this.saving.set(true);
    try {
      const permissions = this.screenPermissions().map(p => ({
        userId: p.userId,
        permission: p.permission,
        sortOrder: p.sortOrder,
      }));
      await this.api.batchUpdateScreenPermissions(screen.id, permissions);
      this.toast.success('تم حفظ الصلاحيات');
      this.closePermissionsModal();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    } finally {
      this.saving.set(false);
    }
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'admin': return 'مدير النظام';
      case 'accountant': return 'محاسب';
      case 'manager': return 'مدير محطة';
      case 'viewer': return 'مشاهد';
      default: return 'مستخدم';
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'admin': return 'admin_panel_settings';
      case 'accountant': return 'calculate';
      case 'manager': return 'manage_accounts';
      case 'viewer': return 'visibility';
      default: return 'person';
    }
  }

  // ===================== Add to Sidebar =====================
  async openSidebarModal(screen: ScreenTemplate) {
    this.permissionsScreen.set(screen);
    try {
      const sections = await this.api.getSidebarSections(this.bizId);
      this.sidebarSections.set(sections);
      this.sidebarForm.set({
        sectionId: sections.length > 0 ? sections[0].id : 0,
        sortOrder: 99,
      });
      this.showSidebarModal.set(true);
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل الأقسام');
    }
  }

  closeSidebarModal() {
    this.showSidebarModal.set(false);
  }

  async addToSidebar() {
    const screen = this.permissionsScreen();
    if (!screen) return;
    const form = this.sidebarForm();
    if (!form.sectionId) {
      this.toast.warning('اختر قسماً');
      return;
    }
    this.saving.set(true);
    try {
      await this.api.addScreenToSidebar(this.bizId, screen.id, form);
      this.toast.success(`تم إضافة "${screen.name}" للقائمة الجانبية`);
      this.closeSidebarModal();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
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

  getWizardStepTitle(): string {
    switch (this.wizardStep()) {
      case 1: return 'اختيار القالب والإعدادات الأساسية';
      case 2: return 'إضافة وإدارة العناصر';
      case 3: return 'التخصيص (ألوان، مسميات، إخفاء/إظهار)';
      case 4: return 'ربط المحتوى';
      default: return '';
    }
  }

  getWizardStepIcon(): string {
    switch (this.wizardStep()) {
      case 1: return 'dashboard_customize';
      case 2: return 'widgets';
      case 3: return 'palette';
      case 4: return 'link';
      default: return 'circle';
    }
  }
}
