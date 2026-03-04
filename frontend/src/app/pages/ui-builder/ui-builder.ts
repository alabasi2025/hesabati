import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

interface UiPage {
  id: number;
  businessId: number;
  pageKey: string;
  title: string;
  description?: string;
  icon: string;
  color: string;
  layout: string;
  config: any;
  isActive: boolean;
  sortOrder: number;
}

interface UiComponent {
  id: number;
  businessId: number;
  pageId: number;
  componentType: string;
  title?: string;
  config: any;
  dataSourceId?: number;
  positionX: number;
  positionY: number;
  width: number;
  height: number;
  isVisible: boolean;
  sortOrder: number;
}

interface UiDataSource {
  id: number;
  businessId: number;
  name: string;
  sourceType: string;
  tableName?: string;
  queryTemplate?: string;
  filters: any;
  sorting: any;
  config: any;
  isActive: boolean;
}

const COMPONENT_TYPES = [
  { value: 'stat_card', label: 'بطاقة إحصائية', icon: 'analytics', desc: 'عرض رقم أو مؤشر', defaultW: 3, defaultH: 2 },
  { value: 'data_table', label: 'جدول بيانات', icon: 'table_chart', desc: 'عرض بيانات في جدول', defaultW: 6, defaultH: 4 },
  { value: 'chart', label: 'رسم بياني', icon: 'bar_chart', desc: 'رسم بياني تفاعلي', defaultW: 6, defaultH: 4 },
  { value: 'text', label: 'نص', icon: 'text_fields', desc: 'نص حر أو ملاحظات', defaultW: 4, defaultH: 2 },
  { value: 'iframe', label: 'إطار خارجي', icon: 'web', desc: 'تضمين صفحة خارجية', defaultW: 6, defaultH: 4 },
  { value: 'list', label: 'قائمة', icon: 'list', desc: 'عرض قائمة عناصر', defaultW: 4, defaultH: 4 },
];

const SOURCE_TYPES = [
  { value: 'table', label: 'جدول مباشر', icon: 'storage', desc: 'جلب بيانات من جدول في قاعدة البيانات' },
  { value: 'query', label: 'استعلام مخصص', icon: 'code', desc: 'تنفيذ استعلام SQL مخصص' },
];

@Component({
  selector: 'app-ui-builder',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  templateUrl: './ui-builder.html',
  styleUrl: './ui-builder.scss',
})
export class UiBuilderComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private api = inject(ApiService);
  private toast = inject(ToastService);

  bizId = 0;
  loading = signal(true);
  saving = signal(false);

  // Data
  pages = signal<UiPage[]>([]);
  activePage = signal<UiPage | null>(null);
  pageComponents = signal<UiComponent[]>([]);
  dataSources = signal<UiDataSource[]>([]);
  componentData = signal<Record<number, any>>({});

  // View
  viewMode = signal<'list' | 'page' | 'edit'>('list');

  // Create/Edit Page Modal
  showPageModal = signal(false);
  editingPage = signal<UiPage | null>(null);
  pageForm = signal({ pageKey: '', title: '', description: '', icon: 'dashboard', color: '#3b82f6', layout: 'grid' });

  // Add Component Modal
  showComponentModal = signal(false);
  editingComponent = signal<UiComponent | null>(null);
  componentForm = signal({ componentType: 'stat_card', title: '', config: '{}', dataSourceId: 0, positionX: 0, positionY: 0, width: 3, height: 2 });

  // Data Source Modal
  showDataSourceModal = signal(false);
  editingDataSource = signal<UiDataSource | null>(null);
  dsForm = signal({ name: '', sourceType: 'table', tableName: '', queryTemplate: '', config: '{}' });

  // Data Source Preview
  showDsPreview = signal(false);
  dsPreviewData = signal<any>(null);
  dsPreviewLoading = signal(false);

  componentTypes = COMPONENT_TYPES;
  sourceTypes = SOURCE_TYPES;

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await this.loadPages();
    });
  }

  // ===================== Pages CRUD =====================
  async loadPages() {
    this.loading.set(true);
    try {
      const pages = await this.api.getUiPages(this.bizId);
      this.pages.set(pages || []);
    } catch (e) { this.toast.error('خطأ في تحميل الصفحات'); }
    finally { this.loading.set(false); }
  }

  openCreatePage() {
    this.editingPage.set(null);
    this.pageForm.set({ pageKey: '', title: '', description: '', icon: 'dashboard', color: '#3b82f6', layout: 'grid' });
    this.showPageModal.set(true);
  }

  openEditPage(page: UiPage) {
    this.editingPage.set(page);
    this.pageForm.set({
      pageKey: page.pageKey, title: page.title, description: page.description || '',
      icon: page.icon, color: page.color, layout: page.layout,
    });
    this.showPageModal.set(true);
  }

  async savePage() {
    const form = this.pageForm();
    if (!form.title || !form.pageKey) { this.toast.warning('أدخل اسم ومفتاح الصفحة'); return; }
    this.saving.set(true);
    try {
      if (this.editingPage()) {
        await this.api.updateUiPage(this.bizId, this.editingPage()!.id, form);
        this.toast.success('تم تحديث الصفحة');
      } else {
        await this.api.createUiPage(this.bizId, form);
        this.toast.success('تم إنشاء الصفحة');
      }
      this.showPageModal.set(false);
      await this.loadPages();
    } catch (e: any) { this.toast.error(e.message || 'خطأ في حفظ الصفحة'); }
    finally { this.saving.set(false); }
  }

  async deletePage(page: UiPage) {
    const confirmed = await this.toast.confirm({ title: 'حذف الصفحة', message: `هل تريد حذف "${page.title}"؟`, type: 'danger' });
    if (!confirmed) return;
    try {
      await this.api.deleteUiPage(this.bizId, page.id);
      this.toast.success('تم حذف الصفحة');
      if (this.activePage()?.id === page.id) { this.activePage.set(null); this.viewMode.set('list'); }
      await this.loadPages();
    } catch (e: any) { this.toast.error(e.message || 'خطأ في حذف الصفحة'); }
  }

  async openPage(page: UiPage) {
    this.activePage.set(page);
    this.viewMode.set('page');
    this.loading.set(true);
    try {
      const result = await this.api.getUiPage(this.bizId, page.id);
      if (result) {
        this.pageComponents.set(result.components || []);
      }
      const ds = await this.api.getUiDataSources(this.bizId);
      this.dataSources.set(ds || []);
      // Load data for each component
      await this.loadAllComponentData();
    } catch (e) { this.toast.error('خطأ في تحميل الصفحة'); }
    finally { this.loading.set(false); }
  }

  async loadAllComponentData() {
    const data: Record<number, any> = {};
    for (const comp of this.pageComponents()) {
      if (comp.dataSourceId) {
        try {
          const result = await this.api.executeUiDataSource(this.bizId, comp.dataSourceId);
          data[comp.id] = result;
        } catch (e) { data[comp.id] = { error: 'خطأ في تحميل البيانات' }; }
      }
    }
    this.componentData.set(data);
  }

  backToList() { this.viewMode.set('list'); this.activePage.set(null); }

  toggleEditMode() {
    this.viewMode.set(this.viewMode() === 'edit' ? 'page' : 'edit');
  }

  // ===================== Components CRUD =====================
  openAddComponent() {
    this.editingComponent.set(null);
    const nextY = this.pageComponents().length > 0
      ? Math.max(...this.pageComponents().map(c => c.positionY + c.height)) : 0;
    this.componentForm.set({ componentType: 'stat_card', title: '', config: '{}', dataSourceId: 0, positionX: 0, positionY: nextY, width: 3, height: 2 });
    this.showComponentModal.set(true);
  }

  openEditComponent(comp: UiComponent) {
    this.editingComponent.set(comp);
    this.componentForm.set({
      componentType: comp.componentType, title: comp.title || '',
      config: JSON.stringify(comp.config || {}, null, 2),
      dataSourceId: comp.dataSourceId || 0,
      positionX: comp.positionX, positionY: comp.positionY,
      width: comp.width, height: comp.height,
    });
    this.showComponentModal.set(true);
  }

  async saveComponent() {
    const form = this.componentForm();
    let config: any = {};
    try { config = JSON.parse(form.config || '{}'); } catch (e) { this.toast.warning('JSON غير صالح في الإعدادات'); return; }
    this.saving.set(true);
    try {
      const data = { ...form, config, dataSourceId: form.dataSourceId || null };
      if (this.editingComponent()) {
        await this.api.updateUiComponent(this.bizId, this.editingComponent()!.id, data);
        this.toast.success('تم تحديث المكون');
      } else {
        await this.api.addUiComponent(this.bizId, this.activePage()!.id, data);
        this.toast.success('تم إضافة المكون');
      }
      this.showComponentModal.set(false);
      await this.openPage(this.activePage()!);
    } catch (e: any) { this.toast.error(e.message || 'خطأ في حفظ المكون'); }
    finally { this.saving.set(false); }
  }

  async deleteComponent(comp: UiComponent) {
    const confirmed = await this.toast.confirm({ title: 'حذف المكون', message: `هل تريد حذف "${comp.title || comp.componentType}"؟`, type: 'danger' });
    if (!confirmed) return;
    try {
      await this.api.deleteUiComponent(this.bizId, comp.id);
      this.toast.success('تم حذف المكون');
      await this.openPage(this.activePage()!);
    } catch (e: any) { this.toast.error(e.message || 'خطأ في حذف المكون'); }
  }

  // ===================== Data Sources CRUD =====================
  openDataSources() {
    this.showDataSourceModal.set(true);
    this.editingDataSource.set(null);
    this.dsForm.set({ name: '', sourceType: 'table', tableName: '', queryTemplate: '', config: '{}' });
  }

  editDataSource(ds: UiDataSource) {
    this.editingDataSource.set(ds);
    this.dsForm.set({
      name: ds.name, sourceType: ds.sourceType,
      tableName: ds.tableName || '', queryTemplate: ds.queryTemplate || '',
      config: JSON.stringify(ds.config || {}, null, 2),
    });
  }

  async saveDataSource() {
    const form = this.dsForm();
    if (!form.name) { this.toast.warning('أدخل اسم مصدر البيانات'); return; }
    let config: any = {};
    try { config = JSON.parse(form.config || '{}'); } catch (e) { this.toast.warning('JSON غير صالح'); return; }
    this.saving.set(true);
    try {
      const data = { ...form, config };
      if (this.editingDataSource()) {
        await this.api.updateUiDataSource(this.bizId, this.editingDataSource()!.id, data);
        this.toast.success('تم تحديث مصدر البيانات');
      } else {
        await this.api.createUiDataSource(this.bizId, data);
        this.toast.success('تم إنشاء مصدر البيانات');
      }
      this.editingDataSource.set(null);
      this.dsForm.set({ name: '', sourceType: 'table', tableName: '', queryTemplate: '', config: '{}' });
      const ds = await this.api.getUiDataSources(this.bizId);
      this.dataSources.set(ds || []);
    } catch (e: any) { this.toast.error(e.message || 'خطأ في حفظ مصدر البيانات'); }
    finally { this.saving.set(false); }
  }

  async deleteDataSource(ds: UiDataSource) {
    const confirmed = await this.toast.confirm({ title: 'حذف مصدر البيانات', message: `هل تريد حذف "${ds.name}"؟`, type: 'danger' });
    if (!confirmed) return;
    try {
      await this.api.deleteUiDataSource(this.bizId, ds.id);
      this.toast.success('تم حذف مصدر البيانات');
      const dsList = await this.api.getUiDataSources(this.bizId);
      this.dataSources.set(dsList || []);
    } catch (e: any) { this.toast.error(e.message || 'خطأ في حذف مصدر البيانات'); }
  }

  async previewDataSource(ds: UiDataSource) {
    this.dsPreviewLoading.set(true);
    this.showDsPreview.set(true);
    try {
      const result = await this.api.executeUiDataSource(this.bizId, ds.id, { limit: 10 });
      this.dsPreviewData.set(result);
    } catch (e: any) { this.dsPreviewData.set({ error: e.message || 'خطأ' }); }
    finally { this.dsPreviewLoading.set(false); }
  }

  // ===================== Helpers =====================
  getComponentTypeInfo(type: string) {
    return COMPONENT_TYPES.find(t => t.value === type) || { label: type, icon: 'widgets', desc: '' };
  }

  getDataSourceName(id: number): string {
    return this.dataSources().find(ds => ds.id === id)?.name || '-';
  }

  getComponentGridStyle(comp: UiComponent): Record<string, string> {
    return {
      'grid-column': `${comp.positionX + 1} / span ${comp.width}`,
      'grid-row': `${comp.positionY + 1} / span ${comp.height}`,
    };
  }

  getDataKeys(data: any): string[] {
    if (data?.data?.length > 0) return Object.keys(data.data[0]);
    return [];
  }

  onComponentTypeChange(type: string) {
    const info = COMPONENT_TYPES.find(t => t.value === type);
    if (info) {
      this.componentForm.update(f => ({ ...f, componentType: type, width: info.defaultW, height: info.defaultH }));
    }
  }

  updatePageForm(field: string, value: any) {
    this.pageForm.update(f => ({ ...f, [field]: value }));
  }

  updateComponentForm(field: string, value: any) {
    this.componentForm.update(f => ({ ...f, [field]: value }));
  }

  updateDsForm(field: string, value: any) {
    this.dsForm.update(f => ({ ...f, [field]: value }));
  }
}
