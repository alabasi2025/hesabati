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
  viewMode = signal<'list' | 'detail'>('list');
  editMode = signal(false);
  showScreenForm = signal(false);
  editingScreen = signal<ScreenTemplate | null>(null);
  showWidgetForm = signal(false);
  editingWidget = signal<ScreenWidget | null>(null);
  showWidgetLibrary = signal(false);
  hasUnsavedChanges = signal(false);

  // ===================== Screen Form =====================
  screenForm = signal({
    name: '',
    description: '',
    icon: 'dashboard',
    color: '#3b82f6',
  });

  // ===================== Widget Form =====================
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
    // Initialize notes
    widgets.forEach(w => {
      if (w.widgetType === 'notes') {
        this.notesText[w.id] = w.config?.text || '';
      }
    });
  }

  // ===================== Screen CRUD =====================
  openScreenForm(screen?: ScreenTemplate) {
    if (screen) {
      this.editingScreen.set(screen);
      this.screenForm.set({
        name: screen.name,
        description: screen.description || '',
        icon: screen.icon || 'dashboard',
        color: screen.color || '#3b82f6',
      });
    } else {
      this.editingScreen.set(null);
      this.screenForm.set({ name: '', description: '', icon: 'dashboard', color: '#3b82f6' });
    }
    this.showScreenForm.set(true);
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
        this.toast.success('تم تحديث الشاشة بنجاح');
      } else {
        await this.api.createScreen(this.bizId, form);
        this.toast.success('تم إنشاء الشاشة بنجاح');
      }
      this.closeScreenForm();
      await this.loadScreens();
    } catch (e: any) {
      this.toast.error(e.message || 'حدث خطأ');
    } finally {
      this.saving.set(false);
    }
  }

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

  onWidgetTypeChange() {
    const form = this.widgetForm();
    const typeInfo = this.getWidgetTypeInfo(form.widgetType);
    this.widgetForm.set({ ...form, title: typeInfo.label });
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
}
