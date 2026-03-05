import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './suppliers.html',
  styleUrl: './suppliers.scss',
})
export class SuppliersComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  suppliers = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterCategory = signal<string>('all');
  searchQuery = signal<string>('');

  form: any = { name: '', category: '', phone: '', address: '', contactPerson: '', notes: '' };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getSuppliers(this.bizId);
      this.suppliers.set(data);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء تحميل بيانات الموردين');
    }
    this.loading.set(false);
  }

  categories() {
    const cats = new Set(this.suppliers().map(s => s.category).filter(Boolean));
    return Array.from(cats);
  }

  filteredSuppliers() {
    let list = this.suppliers();
    const cat = this.filterCategory();
    const q = this.searchQuery().toLowerCase();
    if (cat !== 'all') list = list.filter(s => s.category === cat);
    if (q) list = list.filter(s => s.name.toLowerCase().includes(q) || (s.contactPerson || '').toLowerCase().includes(q));
    return list;
  }

  openAdd() {
    this.form = { name: '', category: '', phone: '', address: '', contactPerson: '', notes: '' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(s: any) {
    this.form = {
      name: s.name, category: s.category || '', phone: s.phone || '',
      address: s.address || '', contactPerson: s.contactPerson || '', notes: s.notes || '',
    };
    this.editingId.set(s.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      if (this.editingId()) {
        await this.api.updateSupplier(this.editingId()!, this.form);
      } else {
        await this.api.createSupplier(this.bizId, this.form);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? 'تم تحديث المورد بنجاح' : 'تم إضافة المورد بنجاح');
      await this.load();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ المورد');
    }
  }

  async remove(s: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل أنت متأكد من حذف المورد "${s.name}"؟`, type: 'danger' });
    if (confirmed) {
      try {
        await this.api.deleteSupplier(s.id);
        this.toast.success('تم حذف المورد بنجاح');
        await this.load();
      } catch (e: unknown) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف');
      }
    }
  }

  getCategoryIcon(cat: string): string {
    const map: Record<string, string> = { 'وقود': 'local_gas_station', 'زيوت': 'oil_barrel', 'قطع غيار': 'build', 'مواد غذائية': 'restaurant' };
    return map[cat] || 'inventory_2';
  }
}
