import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-banks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './banks.html',
  styleUrl: './banks.scss',
})
export class BanksComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  accounts = signal<any[]>([]);
  bankTypes = signal<any[]>([]);
  accountSubNatures = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');

  showAccountForm = signal(false);
  editingAccountId = signal<number | null>(null);
  accountForm: any = { name: '', subType: '', accountNumber: '', provider: '', responsiblePerson: '', notes: '' };

  showTypeForm = signal(false);
  editingTypeId = signal<number | null>(null);
  typeForm: any = { name: '', subTypeKey: '', description: '', icon: 'account_balance', color: '#4CAF50' };

  showDeleteConfirm = signal(false);
  deleteTarget = signal<{ type: 'account' | 'type'; id: number; name: string } | null>(null);

  iconOptions = [
    'account_balance', 'credit_card', 'savings', 'local_atm', 'payments',
    'attach_money', 'monetization_on', 'toll', 'currency_exchange', 'language',
    'public', 'store', 'business', 'corporate_fare', 'domain',
  ];

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const [accs, types, subNatures] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getBankTypes(this.bizId),
        this.api.getAccountSubNatures(this.bizId),
      ]);
      this.accounts.set(accs.filter((a: any) => a.accountType === 'bank'));
      this.bankTypes.set(types);
      this.accountSubNatures.set(subNatures || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [{ value: 'all', label: 'الكل', icon: 'apps', count: this.accounts().length },
      ...this.bankTypes().map(t => ({
        value: t.subTypeKey, label: t.name, icon: t.icon,
        count: this.accounts().filter(a => a.subType === t.subTypeKey).length,
      }))
    ];
  }

  filteredAccounts() {
    const f = this.activeFilter();
    if (f === 'all') return this.accounts();
    return this.accounts().filter(a => a.subType === f);
  }

  getTypeInfo(subType: string) {
    const t = this.bankTypes().find(bt => bt.subTypeKey === subType);
    return t || { name: subType || 'غير مصنف', icon: 'account_balance', color: '#607D8B' };
  }

  openAddAccount(subType?: string) {
    if (!this.bankTypes().length) {
      this.toast.error('لا يمكن إضافة حساب بنكي بدون تصنيف. أضف تصنيف بنك أولاً.');
      return;
    }
    this.accountForm = { name: '', subType: subType || (this.bankTypes().length ? this.bankTypes()[0].subTypeKey : ''), accountNumber: '', provider: '', responsiblePerson: '', notes: '' };
    this.editingAccountId.set(null);
    this.showAccountForm.set(true);
  }

  openEditAccount(acc: any) {
    this.accountForm = { name: acc.name, subType: acc.subType || '', accountNumber: acc.accountNumber || '', provider: acc.provider || '', responsiblePerson: acc.responsiblePerson || '', notes: acc.notes || '' };
    this.editingAccountId.set(acc.id);
    this.showAccountForm.set(true);
  }

  async saveAccount() {
    try {
      const bankSubNatureId = this.accountSubNatures().find((n: any) => n.natureKey === 'bank')?.id;
      if (!bankSubNatureId) {
        this.toast.error('نوع الحساب الفرعي "بنك" غير موجود. أضفه من أنواع الحسابات الفرعية أولاً.');
        return;
      }
      const selectedSubType = String(this.accountForm?.subType || '').trim();
      const validSubType = this.bankTypes().some((t: any) => String(t.subTypeKey) === selectedSubType);
      if (!selectedSubType || !validSubType) {
        this.toast.error('اختيار تصنيف بنك صحيح إلزامي قبل الحفظ.');
        return;
      }

      const data = { ...this.accountForm, accountType: 'bank', accountSubNatureId: bankSubNatureId, isLeafAccount: true };
      if (this.editingAccountId()) {
        await this.api.updateAccount(this.bizId, this.editingAccountId()!, data);
      } else {
        await this.api.createAccount(this.bizId, data);
      }
      this.showAccountForm.set(false);
      this.toast.success(this.editingAccountId() ? 'تم تحديث الحساب بنجاح' : 'تم إنشاء الحساب بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ الحساب'); }
  }

  openAddType() {
    this.typeForm = { name: '', subTypeKey: '', description: '', icon: 'account_balance', color: '#4CAF50' };
    this.editingTypeId.set(null);
    this.showTypeForm.set(true);
  }

  openEditType(t: any) {
    this.typeForm = { name: t.name, subTypeKey: t.subTypeKey, description: t.description || '', icon: t.icon || 'account_balance', color: t.color || '#4CAF50' };
    this.editingTypeId.set(t.id);
    this.showTypeForm.set(true);
  }

  async saveType() {
    try {
      if (this.editingTypeId()) {
        await this.api.updateBankType(this.editingTypeId()!, this.typeForm);
      } else {
        await this.api.createBankType(this.bizId, this.typeForm);
      }
      this.showTypeForm.set(false);
      this.toast.success(this.editingTypeId() ? 'تم تحديث النوع بنجاح' : 'تم إنشاء النوع بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ النوع'); }
  }

  confirmDelete(type: 'account' | 'type', id: number, name: string) {
    this.deleteTarget.set({ type, id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      if (target.type === 'account') await this.api.deleteAccount(this.bizId, target.id);
      else await this.api.deleteBankType(target.id);
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success('تم الحذف بنجاح');
      await this.load();
    } catch (e: unknown) { console.error(e); this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف'); }
  }

  getBalanceDisplay(acc: any): string {
    if (!acc.balances || acc.balances.length === 0) return '0';
    return acc.balances.map((b: any) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ''}`).join(' | ');
  }
}
