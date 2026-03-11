import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-account-sub-natures',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './account-sub-natures.html',
  styleUrl: './account-sub-natures.scss',
})
export class AccountSubNaturesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  items = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  form: any = { name: '', natureKey: '', icon: 'category', color: '#64748b', requiresStation: false, requiresEmployee: false, requiresProvider: false, requiresAccountNumber: false, requiresSupplierType: false, supportsCashOperations: true, canReceivePayment: true, canMakePayment: true, isActive: true };

  protected override onBizIdChange(): void { this.load(); }

  async load() {
    this.loading.set(true);
    try { this.items.set(await this.api.getAccountSubNatures(this.bizId)); }
    catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'تعذر جلب الأنواع الفرعية'); this.items.set([]); }
    this.loading.set(false);
  }

  openAdd() {
    this.editingId.set(null);
    this.form = { name: '', natureKey: '', icon: 'category', color: '#64748b', requiresStation: false, requiresEmployee: false, requiresProvider: false, requiresAccountNumber: false, requiresSupplierType: false, supportsCashOperations: true, canReceivePayment: true, canMakePayment: true, isActive: true };
    this.showForm.set(true);
  }

  openEdit(item: any) {
    this.editingId.set(item.id);
    this.form = { ...item };
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.name?.trim()) return this.toast.error('اسم النوع مطلوب');
    if (!this.form.natureKey?.trim()) return this.toast.error('مفتاح النوع مطلوب');
    try {
      if (this.editingId()) {
        await this.api.updateAccountSubNature(this.bizId, this.editingId()!, this.form);
        this.toast.success('تم تعديل النوع الفرعي');
      } else {
        await this.api.createAccountSubNature(this.bizId, this.form);
        this.toast.success('تم إضافة النوع الفرعي');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'فشل الحفظ'); }
  }

  async remove(item: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل تريد حذف النوع "${item.name}"؟`, type: 'danger' });
    if (!confirmed) return;
    try { await this.api.deleteAccountSubNature(this.bizId, item.id); this.toast.success('تم الحذف'); await this.load(); }
    catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'تعذر الحذف'); }
  }
}
