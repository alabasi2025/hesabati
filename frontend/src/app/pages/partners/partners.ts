import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './partners.html',
  styleUrl: './partners.scss',
})
export class PartnersComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  business = signal<any>(null);
  partners = signal<any[]>([]);
  partnerAccounts = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  showDeleteConfirm = signal(false);
  deleteTarget = signal<any>(null);

  accountCurrencies = signal<any[]>([]);
  selectedCurrencyIds = signal<number[]>([]);
  defaultCurrencyId = signal<number | null>(null);
  form: any = { fullName: '', accountId: null, sharePercentage: 0, phone: '', role: '', notes: '' };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [biz, partners, accs] = await Promise.all([
        this.api.getBusiness(this.bizId),
        this.api.getPartners(this.bizId),
        this.api.getAccounts(this.bizId).catch(() => []),
      ]);
      this.business.set(biz);
      this.partners.set(partners);
      this.partnerAccounts.set((accs as any[]).filter((a: any) => a.accountType === 'partner'));
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  totalShares() {
    return this.partners().reduce((s, p) => s + Number(p.sharePercentage || 0), 0);
  }

  openAdd() {
    const defaultAcc = this.partnerAccounts()[0];
    this.form = { fullName: '', accountId: defaultAcc?.id ?? null, sharePercentage: 0, phone: '', role: '', notes: '' };
    this.accountCurrencies.set([]);
    this.selectedCurrencyIds.set([]);
    this.defaultCurrencyId.set(null);
    this.editingId.set(null);
    this.showForm.set(true);
    if (defaultAcc?.id) this.onAccountChange(defaultAcc.id);
  }

  openEdit(p: any) {
    this.form = {
      fullName: p.fullName, accountId: p.accountId ?? null,
      sharePercentage: Number(p.sharePercentage),
      phone: p.phone || '', role: p.role || '', notes: p.notes || '',
    };
    this.accountCurrencies.set([]);
    this.selectedCurrencyIds.set([]);
    this.defaultCurrencyId.set(null);
    if (p.accountId) {
      this.onAccountChange(p.accountId).then(() => {
        const allIds = this.accountCurrencies().map((c: any) => c.currencyId);
        this.selectedCurrencyIds.set(allIds);
        if (p.defaultCurrencyId) this.defaultCurrencyId.set(p.defaultCurrencyId);
      });
    }
    this.editingId.set(p.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      const data = {
        ...this.form,
        sharePercentage: String(this.form.sharePercentage),
        businessId: this.bizId,
        currencyIds: this.selectedCurrencyIds(),
        defaultCurrencyId: this.defaultCurrencyId(),
      };
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

  async onAccountChange(accountId: number) {
    if (accountId) {
      try {
        const currencies = await this.api.getAccountCurrencies(accountId);
        this.accountCurrencies.set(currencies || []);
        const allIds = (currencies || []).map((c: any) => c.currencyId);
        this.selectedCurrencyIds.set(allIds);
        this.defaultCurrencyId.set(allIds[0] || null);
      } catch (e) {
        console.error(e);
        this.accountCurrencies.set([]);
      }
    } else {
      this.accountCurrencies.set([]);
      this.selectedCurrencyIds.set([]);
      this.defaultCurrencyId.set(null);
    }
  }

  toggleCurrency(currencyId: number) {
    const ids = [...this.selectedCurrencyIds()];
    const idx = ids.indexOf(currencyId);
    if (idx >= 0) {
      ids.splice(idx, 1);
      if (this.defaultCurrencyId() === currencyId) this.defaultCurrencyId.set(ids[0] || null);
    } else {
      ids.push(currencyId);
    }
    this.selectedCurrencyIds.set(ids);
  }

  setDefaultCurrency(currencyId: number) {
    this.defaultCurrencyId.set(currencyId);
    if (!this.selectedCurrencyIds().includes(currencyId)) {
      this.selectedCurrencyIds.update(ids => [...ids, currencyId]);
    }
  }
}
