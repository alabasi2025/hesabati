import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './partners.html',
  styleUrl: './partners.scss',
})
export class PartnersComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  business = signal<any>(null);
  partners = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  showDeleteConfirm = signal(false);
  deleteTarget = signal<any>(null);

  form: any = { fullName: '', sharePercentage: 0, phone: '', role: '', notes: '' };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [biz, partners] = await Promise.all([
        this.api.getBusiness(this.bizId),
        this.api.getPartners(this.bizId),
      ]);
      this.business.set(biz);
      this.partners.set(partners);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  totalShares() {
    return this.partners().reduce((s, p) => s + Number(p.sharePercentage || 0), 0);
  }

  openAdd() {
    this.form = { fullName: '', sharePercentage: 0, phone: '', role: '', notes: '' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(p: any) {
    this.form = {
      fullName: p.fullName, sharePercentage: Number(p.sharePercentage),
      phone: p.phone || '', role: p.role || '', notes: p.notes || '',
    };
    this.editingId.set(p.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      const data = { ...this.form, sharePercentage: String(this.form.sharePercentage), businessId: this.bizId };
      if (this.editingId()) {
        await this.api.updatePartner(this.editingId()!, data);
      } else {
        await this.api.createPartner(this.bizId, data);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? 'تم تحديث الشريك بنجاح' : 'تم إضافة الشريك بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ الشريك'); }
  }

  confirmDelete(p: any) {
    this.deleteTarget.set(p);
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const t = this.deleteTarget();
    if (!t) return;
    try {
      await this.api.deletePartner(t.id);
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success('تم حذف الشريك بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف'); }
  }

  getShareColor(pct: number): string {
    if (pct >= 50) return '#f59e0b';
    if (pct >= 25) return '#3b82f6';
    return '#22c55e';
  }
}
