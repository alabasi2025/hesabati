import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-inventory-item-types',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './inventory-item-types.html',
  styleUrl: './inventory-item-types.scss',
})
export class InventoryItemTypesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  types = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  form: any = {
    name: '', subTypeKey: '', description: '', icon: 'inventory_2', color: '#6366f1',
  };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getInventoryItemTypes(this.bizId);
      this.types.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = { name: '', subTypeKey: '', description: '', icon: 'inventory_2', color: '#6366f1' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(t: any) {
    this.form = {
      name: t.name, subTypeKey: t.subTypeKey, description: t.description || '',
      icon: t.icon || 'inventory_2', color: t.color || '#6366f1',
    };
    this.editingId.set(t.id);
    this.showForm.set(true);
  }

  onNameChange() {
    if (!this.editingId()) {
      this.form.subTypeKey = this.form.name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '_')
        .replace(/[^\w\u0621-\u064A]/g, '');
    }
  }

  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error('يرجى إدخال اسم النوع');
      return;
    }
    try {
      if (this.editingId()) {
        await this.api.updateInventoryItemType(this.editingId()!, this.form);
        this.toast.success('تم تعديل نوع الصنف بنجاح');
      } else {
        await this.api.createInventoryItemType(this.bizId, this.form);
        this.toast.success('تم إضافة نوع الصنف بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) {
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
    }
  }

  async remove(t: any) {
    const confirmed = await this.toast.confirm({
      title: 'تأكيد الحذف',
      message: `هل أنت متأكد من حذف نوع الصنف "${t.name}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteInventoryItemType(t.id);
        this.toast.success('تم حذف نوع الصنف');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  availableIcons = [
    'inventory_2', 'category', 'widgets', 'view_in_ar', 'local_offer',
    'shopping_bag', 'store', 'conveyor_belt', 'forklift', 'package_2',
    'deployed_code', 'pallet', 'warehouse', 'precision_manufacturing', 'settings_input_component',
  ];
}
