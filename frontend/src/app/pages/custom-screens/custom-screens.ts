import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-custom-screens',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  // ===================== UI State =====================
  viewMode = signal<'list' | 'detail'>('list');
  editMode = signal(false);
  showScreenForm = signal(false);
  editingScreen = signal<ScreenTemplate | null>(null);
  showWidgetForm = signal(false);
  editingWidget = signal<ScreenWidget | null>(null);

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
    positionX: 0,
    positionY: 0,
    width: 4,
    height: 3,
  });

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
    { value: 'templates', label: 'عنصر القوالب', icon: 'receipt_long', desc: 'عرض قوالب العمليات وتنفيذها', color: '#3b82f6' },
    { value: 'log', label: 'عنصر السجل', icon: 'history', desc: 'عرض سجل العمليات المنفذة', color: '#22c55e' },
    { value: 'accounts', label: 'مراقبة الحسابات', icon: 'account_balance', desc: 'مراقبة أرصدة الحسابات', color: '#f59e0b' },
    { value: 'stats', label: 'الإحصائيات', icon: 'analytics', desc: 'أرقام ملخصة وKPIs', color: '#8b5cf6' },
    { value: 'chart', label: 'رسم بياني', icon: 'bar_chart', desc: 'تحليل بصري للبيانات', color: '#14b8a6' },
    { value: 'notes', label: 'ملاحظات', icon: 'sticky_note_2', desc: 'ملاحظات وتذكيرات', color: '#f97316' },
  ];

  getWidgetTypeInfo(type: string) {
    return this.widgetTypes.find(w => w.value === type) || this.widgetTypes[0];
  }

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadScreens();
    });
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
    } catch (e: any) {
      this.toast.error(e.message || 'خطأ في تحميل العناصر');
    } finally {
      this.widgetsLoading.set(false);
    }
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
    await this.loadWidgets(screen.id);
  }

  backToList() {
    this.viewMode.set('list');
    this.activeScreen.set(null);
    this.widgets.set([]);
    this.editMode.set(false);
  }

  toggleEditMode() {
    this.editMode.set(!this.editMode());
  }

  // ===================== Widget CRUD =====================
  openWidgetForm(widget?: ScreenWidget) {
    if (widget) {
      this.editingWidget.set(widget);
      this.widgetForm.set({
        widgetType: widget.widgetType,
        title: widget.title,
        positionX: widget.positionX,
        positionY: widget.positionY,
        width: widget.width,
        height: widget.height,
      });
    } else {
      this.editingWidget.set(null);
      const typeInfo = this.widgetTypes[0];
      this.widgetForm.set({
        widgetType: 'templates',
        title: typeInfo.label,
        positionX: 0,
        positionY: 0,
        width: 4,
        height: 3,
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
        await this.api.updateWidget(editing.id, form);
        this.toast.success('تم تحديث العنصر');
      } else {
        await this.api.createScreenWidget(screen.id, form);
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

  // ===================== Helpers =====================
  getGridStyle(widget: ScreenWidget) {
    return {
      'grid-column': `${widget.positionX + 1} / span ${widget.width}`,
      'grid-row': `${widget.positionY + 1} / span ${widget.height}`,
    };
  }

  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' });
  }
}
