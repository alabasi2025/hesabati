import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-warehouse',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './warehouse.html',
  styleUrl: './warehouse.scss',
})
export class WarehouseComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  warehouses = signal<any[]>([]);
  stations = signal<any[]>([]);
  warehouseTypes = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterType = signal<string>('all');
  filterSubType = signal<string>('all');

  // نموذج إضافة/تعديل مخزن
  form: any = {
    name: '', warehouseType: 'main', subType: '',
    stationId: null, responsiblePerson: '', location: '', notes: '',
  };

  // إدارة تصنيفات المخازن
  showTypeForm = signal(false);
  editingTypeId = signal<number | null>(null);
  typeForm: any = {
    name: '', subTypeKey: '', description: '', icon: 'warehouse', color: '#4CAF50',
  };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [wh, sts, types] = await Promise.allSettled([
        this.api.getWarehouses(this.bizId),
        this.api.getStations(this.bizId),
        this.api.getWarehouseTypes(this.bizId),
      ]);
      this.warehouses.set(wh.status === 'fulfilled' ? wh.value : []);
      this.stations.set(sts.status === 'fulfilled' ? sts.value : []);
      this.warehouseTypes.set(types.status === 'fulfilled' ? types.value : []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  // ===== الفلترة =====
  filteredWarehouses() {
    const f = this.filterType();
    const sf = this.filterSubType();
    let list = this.warehouses();
    if (f !== 'all') list = list.filter(w => w.warehouseType === f);
    if (sf !== 'all') list = list.filter(w => (w.subType || '') === sf);
    return list;
  }

  mainCount() { return this.warehouses().filter(w => w.warehouseType === 'main').length; }
  stationCount() { return this.warehouses().filter(w => w.warehouseType === 'station').length; }
  subCount() { return this.warehouses().filter(w => w.warehouseType === 'sub').length; }

  // الفلاتر الفرعية الديناميكية حسب التصنيف
  subTypeFilters = computed(() => {
    const whs = this.warehouses();
    const types = this.warehouseTypes();
    const subTypes = [...new Set(whs.map(w => w.subType).filter(Boolean))];
    return subTypes.map(st => {
      const typeInfo = types.find((t: any) => t.subTypeKey === st);
      return {
        key: st,
        label: typeInfo?.name || st,
        icon: typeInfo?.icon || 'label',
        color: typeInfo?.color || '#64748b',
        count: whs.filter(w => w.subType === st).length,
      };
    });
  });

  getStationName(stationId: number | null): string {
    if (!stationId) return '-';
    const st = this.stations().find(s => s.id === stationId);
    return st ? st.name : '-';
  }

  getSubTypeName(subType: string | null): string {
    if (!subType) return '';
    const t = this.warehouseTypes().find((wt: any) => wt.subTypeKey === subType);
    return t ? t.name : subType;
  }

  // ===== إضافة/تعديل مخزن =====
  openAdd() {
    this.form = {
      name: '', warehouseType: 'main', subType: '',
      stationId: null, responsiblePerson: '', location: '', notes: '',
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(w: any) {
    this.form = {
      name: w.name, warehouseType: w.warehouseType, subType: w.subType || '',
      stationId: w.stationId, responsiblePerson: w.responsiblePerson || '',
      location: w.location || '', notes: w.notes || '',
    };
    this.editingId.set(w.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error('يرجى إدخال اسم المخزن');
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateWarehouse(this.editingId()!, this.form);
        this.toast.success('تم تعديل المخزن بنجاح');
      } else {
        await this.api.createWarehouse(this.bizId, this.form);
        this.toast.success('تم إضافة المخزن بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  async remove(w: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف المخزن "${w.name}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteWarehouse(w.id);
        this.toast.success('تم حذف المخزن');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  // ===== إدارة تصنيفات المخازن =====
  openAddType() {
    this.typeForm = { name: '', subTypeKey: '', description: '', icon: 'warehouse', color: '#4CAF50' };
    this.editingTypeId.set(null);
    this.showTypeForm.set(true);
  }

  openEditType(t: any) {
    this.typeForm = {
      name: t.name, subTypeKey: t.subTypeKey, description: t.description || '',
      icon: t.icon || 'warehouse', color: t.color || '#4CAF50',
    };
    this.editingTypeId.set(t.id);
    this.showTypeForm.set(true);
  }

  async saveType() {
    if (!this.typeForm.name?.trim() || !this.typeForm.subTypeKey?.trim()) {
      this.toast.error('يرجى إدخال الاسم والمفتاح');
      return;
    }
    try {
      if (this.editingTypeId()) {
        await this.api.updateWarehouseType(this.editingTypeId()!, this.typeForm);
        this.toast.success('تم تعديل التصنيف بنجاح');
      } else {
        await this.api.createWarehouseType(this.bizId, this.typeForm);
        this.toast.success('تم إضافة التصنيف بنجاح');
      }
      this.showTypeForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  async removeType(t: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف التصنيف "${t.name}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteWarehouseType(t.id);
        this.toast.success('تم حذف التصنيف');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  // ===== مساعدات =====
  getTypeLabel(t: string): string {
    const map: Record<string, string> = { main: 'رئيسي', station: 'محطة', sub: 'فرعي' };
    return map[t] || t;
  }

  getTypeClass(t: string): string {
    const map: Record<string, string> = { main: 'active', station: 'partner', sub: 'info' };
    return map[t] || 'default';
  }

  getTypeIcon(t: string): string {
    const map: Record<string, string> = { main: 'store', station: 'local_gas_station', sub: 'inventory_2' };
    return map[t] || 'warehouse';
  }

  getTypeColor(t: string): string {
    const map: Record<string, string> = { main: '#f59e0b', station: '#3b82f6', sub: '#8b5cf6' };
    return map[t] || '#64748b';
  }

  // أيقونات متاحة للتصنيفات
  availableIcons = [
    'warehouse', 'store', 'inventory_2', 'local_shipping', 'local_gas_station',
    'storefront', 'factory', 'domain', 'business', 'apartment',
    'home_work', 'garage', 'archive', 'inbox', 'shelves',
  ];
}
