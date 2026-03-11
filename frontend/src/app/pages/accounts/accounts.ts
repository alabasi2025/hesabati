import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './accounts.html',
  styleUrl: './accounts.scss',
})
export class AccountsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  accounts = signal<any[]>([]);
  accountSubNatures = signal<any[]>([]);
  stations = signal<any[]>([]);
  showForm = signal(false);
  editingId = signal<number | null>(null);
  searchQuery = signal('');
  activeNatureFilter = signal<number | null>(null);

  form = signal<any>({
    isLeafAccount: true, parentAccountId: null, accountSubNatureId: null,
    name: '', code: '', stationId: null, provider: '', accountNumber: '',
    responsiblePerson: '', notes: '', isActive: true,
  });

  selectedSubNature = computed(() => {
    const id = this.form().accountSubNatureId;
    if (!id || !Number.isInteger(id) || id <= 0) return null;
    return this.accountSubNatures().find(n => n.id === id) || null;
  });

  showStationField = computed(() => this.selectedSubNature()?.requiresStation === true);
  showProviderField = computed(() => this.selectedSubNature()?.requiresProvider === true);
  showAccountNumberField = computed(() => this.selectedSubNature()?.requiresAccountNumber === true);

  parentAccountOptions = computed(() => this.accounts().filter(a => a.isLeafAccount === false));

  filteredAccounts = computed(() => {
    let list = this.accounts();
    const query = this.searchQuery().toLowerCase().trim();
    if (query) list = list.filter(a => a.name?.toLowerCase().includes(query));
    const natureFilter = this.activeNatureFilter();
    if (natureFilter && Number.isInteger(natureFilter) && natureFilter > 0) {
      list = list.filter(a => a.accountSubNatureId === natureFilter);
    }
    return list;
  });

  naturesStats = computed(() => {
    const natures = this.accountSubNatures();
    const accs = this.accounts();
    return natures.map(n => ({ ...n, count: accs.filter(a => a.accountSubNatureId === n.id).length }));
  });

  protected override onBizIdChange(_bizId: number): void { if (this.bizId > 0) void this.loadAccounts(); }

  async loadAccounts() {
    if (this.bizId <= 0) { this.loading.set(false); return; }
    this.loading.set(true);
    try {
      const [accountsData, naturesData, stationsData] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getAccountSubNatures(this.bizId),
        this.api.getStations(this.bizId).catch(() => []),
      ]);
      this.accounts.set((accountsData || []).map((a: any) => ({ ...a, isLeafAccount: a.isLeafAccount !== false })));
      this.accountSubNatures.set(naturesData || []);
      this.stations.set(stationsData || []);
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'فشل التحميل'); this.accounts.set([]); }
    finally { this.loading.set(false); }
  }

  openCreate() {
    this.editingId.set(null);
    this.form.set({ isLeafAccount: true, parentAccountId: null, accountSubNatureId: null, name: '', code: '', stationId: null, provider: '', accountNumber: '', responsiblePerson: '', notes: '', isActive: true });
    this.showForm.set(true);
  }

  openEdit(acc: any) {
    this.editingId.set(acc.id);
    this.form.set({ isLeafAccount: acc.isLeafAccount !== false, parentAccountId: acc.parentAccountId || null, accountSubNatureId: acc.accountSubNatureId || null, name: acc.name || '', code: acc.code || '', stationId: acc.stationId || null, provider: acc.provider || '', accountNumber: acc.accountNumber || '', responsiblePerson: acc.responsiblePerson || '', notes: acc.notes || '', isActive: acc.isActive !== false });
    this.showForm.set(true);
  }

  async saveForm() {
    const f = this.form();
    if (!f.name?.trim()) { this.toast.error('اسم الحساب مطلوب'); return; }
    if (f.isLeafAccount && (!f.accountSubNatureId || !Number.isInteger(f.accountSubNatureId) || f.accountSubNatureId <= 0)) {
      this.toast.error('يجب اختيار نوع الحساب الفرعي'); return;
    }
    try {
      const payload: any = { name: f.name, isLeafAccount: f.isLeafAccount, parentAccountId: f.parentAccountId || null, accountSubNatureId: f.accountSubNatureId || null, code: f.code || null, stationId: f.stationId || null, provider: f.provider || null, accountNumber: f.accountNumber || null, responsiblePerson: f.responsiblePerson || null, notes: f.notes || null, isActive: f.isActive !== false };
      if (this.editingId()) { await this.api.updateAccount(this.bizId, this.editingId()!, payload); this.toast.success('تم تحديث الحساب'); }
      else { await this.api.createAccount(this.bizId, payload); this.toast.success('تم إنشاء الحساب'); }
      this.showForm.set(false); await this.loadAccounts();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'فشل الحفظ'); }
  }

  async deleteAccount(acc: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل تريد حذف الحساب "${acc.name}"؟`, type: 'danger' });
    if (!confirmed) return;
    try { await this.api.deleteAccount(this.bizId, acc.id); this.toast.success('تم الحذف'); await this.loadAccounts(); }
    catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'فشل الحذف'); }
  }

  selectSubNature(id: number) { this.form.update(f => ({ ...f, accountSubNatureId: id })); }
  setNatureFilter(id: number | null) { this.activeNatureFilter.set(id); }
  trackById(_: number, item: any) { return item?.id; }
}
