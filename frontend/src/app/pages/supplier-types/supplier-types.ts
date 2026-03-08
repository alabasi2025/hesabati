import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-supplier-types',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './supplier-types.html',
  styleUrl: './supplier-types.scss',
})
export class SupplierTypesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  types = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  form: any = {
    name: '', subTypeKey: '', description: '', icon: 'local_shipping', color: '#0ea5e9',
  };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getSupplierTypes(this.bizId);
      this.types.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  openAdd() {
    this.form = { name: '', subTypeKey: '', description: '', icon: 'local_shipping', color: '#0ea5e9' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(t: any) {
    this.form = {
      name: t.name, subTypeKey: t.subTypeKey, description: t.description || '',
      icon: t.icon || 'local_shipping', color: t.color || '#0ea5e9',
    };
    this.editingId.set(t.id);
    this.showForm.set(true);
  }

  onNameChange() {
    if (!this.editingId()) {
      this.form.subTypeKey = this.form.name
        .trim().toLowerCase().replace(/\s+/g, '_').replace(/[^\u0621-\u064Aa-z0-9_]/g, '');
    }
  }

  async save() {
    if (!this.form.name?.trim()) {
      this.toast.error('يرجى إدخال الاسم');
      return;
    }
    if (!this.form.subTypeKey?.trim()) {
      this.form.subTypeKey = this.form.name.trim().toLowerCase().replace(/\s+/g, '_');
    }
    try {
      if (this.editingId()) {
        await this.api.updateSupplierType(this.editingId()!, this.form);
        this.toast.success('تم تعديل النوع بنجاح');
      } else {
        await this.api.createSupplierType(this.bizId, this.form);
        this.toast.success('تم إضافة النوع بنجاح');
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
      message: `هل أنت متأكد من حذف النوع "${t.name}"؟`,
      type: 'danger',
    });
    if (confirmed) {
      try {
        await this.api.deleteSupplierType(t.id);
        this.toast.success('تم حذف النوع');
        await this.load();
      } catch (e: unknown) {
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ');
      }
    }
  }

  availableIcons = [
    'local_shipping', 'inventory', 'store', 'storefront', 'shopping_cart',
    'handshake', 'business', 'factory', 'agriculture', 'construction',
    'precision_manufacturing', 'engineering', 'warehouse', 'science', 'biotech',
  ];
}
