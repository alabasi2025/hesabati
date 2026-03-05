import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-settlements',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settlements.html',
  styleUrl: './settlements.scss',
})
export class SettlementsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  settlements = signal<any[]>([]);
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  filterType = signal<string>('all');
  filterStatus = signal<string>('all');

  form: any = {
    title: '', reconciliationType: 'manager', status: 'open', withPerson: '',
    accountId: null, fundId: null, stationId: null,
    periodStart: '', periodEnd: '', expectedAmount: 0, actualAmount: 0,
    notes: '',
  };

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [sett, accs, fds, sts] = await Promise.all([
        this.api.getSettlements(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getStations(this.bizId),
      ]);
      this.settlements.set(sett);
      this.accounts.set(accs);
      this.funds.set(fds);
      this.stations.set(sts);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء تحميل بيانات التصفيات');
    }
    this.loading.set(false);
  }

  filteredSettlements() {
    let list = this.settlements();
    const t = this.filterType();
    const s = this.filterStatus();
    if (t !== 'all') list = list.filter(r => r.reconciliationType === t);
    if (s !== 'all') list = list.filter(r => r.status === s);
    return list;
  }

  totalExpected() { return this.filteredSettlements().reduce((s, r) => s + Number(r.expectedAmount || 0), 0); }
  totalActual() { return this.filteredSettlements().reduce((s, r) => s + Number(r.actualAmount || 0), 0); }
  totalDifference() { return this.totalExpected() - this.totalActual(); }

  openAdd() {
    this.form = {
      title: '', reconciliationType: 'manager', status: 'open', withPerson: '',
      accountId: null, fundId: null, stationId: null,
      periodStart: '', periodEnd: '', expectedAmount: 0, actualAmount: 0, notes: '',
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(r: any) {
    this.form = {
      title: r.title, reconciliationType: r.reconciliationType, status: r.status,
      withPerson: r.withPerson || '', accountId: r.accountId, fundId: r.fundId, stationId: r.stationId,
      periodStart: r.periodStart || '', periodEnd: r.periodEnd || '',
      expectedAmount: Number(r.expectedAmount || 0), actualAmount: Number(r.actualAmount || 0),
      notes: r.notes || '',
    };
    this.editingId.set(r.id);
    this.showForm.set(true);
  }

  async save() {
    try {
      const data = {
        ...this.form,
        expectedAmount: String(this.form.expectedAmount),
        actualAmount: String(this.form.actualAmount),
      };
      if (this.editingId()) {
        await this.api.updateSettlement(this.editingId()!, data);
      } else {
        await this.api.createSettlement(this.bizId, data);
      }
      this.showForm.set(false);
      this.toast.success(this.editingId() ? 'تم تحديث التصفية بنجاح' : 'تم إنشاء التصفية بنجاح');
      await this.load();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ التصفية');
    }
  }

  async remove(r: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل أنت متأكد من حذف التصفية "${r.title}"؟`, type: 'danger' });
    if (confirmed) {
      try {
        await this.api.deleteSettlement(r.id);
        this.toast.success('تم حذف التصفية بنجاح');
        await this.load();
      } catch (e: unknown) {
        console.error(e);
        this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف');
      }
    }
  }

  getTypeLabel(t: string): string {
    const map: Record<string, string> = { manager: 'مدير', exchange: 'صراف', accountant: 'محاسب', supplier: 'مورد', custody: 'عهدة' };
    return map[t] || t;
  }
  getTypeIcon(t: string): string {
    const map: Record<string, string> = { manager: 'manage_accounts', exchange: 'currency_exchange', accountant: 'calculate', supplier: 'local_shipping', custody: 'lock' };
    return map[t] || 'receipt_long';
  }
  getStatusLabel(s: string): string {
    const map: Record<string, string> = { open: 'مفتوحة', in_progress: 'قيد التنفيذ', completed: 'مكتملة', disputed: 'متنازع عليها' };
    return map[s] || s;
  }
  getStatusClass(s: string): string {
    const map: Record<string, string> = { open: 'open', in_progress: 'progress', completed: 'completed', disputed: 'disputed' };
    return map[s] || '';
  }

  getAccountName(id: number | null): string {
    if (!id) return '-';
    const a = this.accounts().find(a => a.id === id);
    return a ? a.name : '-';
  }
  getStationName(id: number | null): string {
    if (!id) return '-';
    const s = this.stations().find(s => s.id === id);
    return s ? s.name : '-';
  }
}
