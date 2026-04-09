import { Component, inject, signal, computed } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { PAGE_IMPORTS } from '../../shared/page-imports';

interface WalletForm {
  name: string;
  accountId: number | null;
  accountNumber: string;
  provider: string;
  responsiblePerson: string;
  description: string;
  notes: string;
}

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [...PAGE_IMPORTS],
  templateUrl: './wallets.html',
  styleUrl: './wallets.scss',
})
export class WalletsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  walletsData = signal<any[]>([]);
  walletAccounts = signal<any[]>([]);
  loading = signal(true);
  activeFilter = signal<string>('all');
  accountFilter = signal<number | null>(null);

  showWalletForm = signal(false);
  editingWalletId = signal<number | null>(null);
  walletForm: WalletForm = {
    name: '',
    accountId: null,
    accountNumber: '',
    provider: '',
    responsiblePerson: '',
    description: '',
    notes: '',
  };
  accountCurrencies = signal<any[]>([]);
  selectedCurrencyIds = signal<number[]>([]);
  defaultCurrencyId = signal<number | null>(null);

  showDeleteConfirm = signal(false);
  deleteTarget = signal<{ type: 'wallet'; id: number; name: string } | null>(null);

  // Backward compatibility
  get accounts() {
    return this.walletsData;
  }
  showAccountForm = this.showWalletForm;
  editingAccountId = this.editingWalletId;
  get accountForm() {
    return this.walletForm;
  }
  set accountForm(v: any) {
    this.walletForm = v;
  }

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const walletsList = await this.api.getWallets(this.bizId);
      this.walletsData.set(walletsList);
      this.activeFilter.set('all');
      try {
        const allAccounts = await this.api.getAccounts(this.bizId);
        this.walletAccounts.set(
          (allAccounts || []).filter((a: any) => a.accountType === 'e_wallet' && a.isLeafAccount === false),
        );
      } catch {
        this.walletAccounts.set([]);
      }
    } catch (e: unknown) {
      console.error(e);
    }
    this.loading.set(false);
  }

  getFilterTabs() {
    return [
      { value: 'all', label: 'الكل', icon: 'apps', count: this.walletsData().length },
      {
        value: 'active',
        label: 'نشط',
        icon: 'check_circle',
        count: this.walletsData().filter((w) => w.isActive).length,
      },
      {
        value: 'inactive',
        label: 'غير نشط',
        icon: 'cancel',
        count: this.walletsData().filter((w) => !w.isActive).length,
      },
    ];
  }

  filteredData = computed(() => {
    let data = this.walletsData();
    const filter = this.activeFilter();
    if (filter === 'active') data = data.filter((w) => w.isActive);
    else if (filter === 'inactive') data = data.filter((w) => !w.isActive);
    const accId = this.accountFilter();
    if (accId) data = data.filter((w) => w.accountId === accId);
    return data;
  });

  uniqueAccounts = computed(() => {
    const seen = new Map<number, { id: number; name: string; code: string }>();
    for (const w of this.walletsData()) {
      if (w.accountId && !seen.has(w.accountId)) {
        seen.set(w.accountId, {
          id: w.accountId,
          name: w.accountName || w.name,
          code: w.accountCode || w.code,
        });
      }
    }
    return Array.from(seen.values());
  });

  openAddAccount(subType?: string) {
    this.walletForm = {
      name: '',
      accountId: null,
      accountNumber: '',
      provider: '',
      responsiblePerson: '',
      description: '',
      notes: '',
    };
    this.accountCurrencies.set([]);
    this.selectedCurrencyIds.set([]);
    this.defaultCurrencyId.set(null);
    this.editingWalletId.set(null);
    this.showWalletForm.set(true);
  }

  openEditAccount(wallet: any) {
    this.walletForm = {
      name: wallet.name,
      accountId: wallet.accountId || null,
      accountNumber: wallet.accountNumber || '',
      provider: wallet.provider || '',
      responsiblePerson: wallet.responsiblePerson || '',
      description: wallet.description || '',
      notes: wallet.notes || '',
    };
    this.accountCurrencies.set([]);
    this.selectedCurrencyIds.set([]);
    this.defaultCurrencyId.set(null);
    if (wallet.accountId) {
      this.onAccountChange(wallet.accountId);
      if (wallet.defaultCurrencyId) {
        setTimeout(() => this.defaultCurrencyId.set(wallet.defaultCurrencyId), 300);
      }
    }
    this.editingWalletId.set(wallet.id);
    this.showWalletForm.set(true);
  }

  async saveAccount() {
    try {
      if (!this.walletForm.name?.trim()) {
        this.toast.error('اسم المحفظة مطلوب');
        return;
      }
      if (this.selectedCurrencyIds().length === 0) {
        this.toast.error('يجب اختيار عملة واحدة على الأقل');
        return;
      }
      if (!this.defaultCurrencyId()) {
        this.toast.error('يجب اختيار العملة الافتراضية');
        return;
      }
      if (!this.selectedCurrencyIds().includes(this.defaultCurrencyId()!)) {
        this.toast.error('العملة الافتراضية يجب أن تكون من العملات المحددة');
        return;
      }

      const data: any = { ...this.walletForm };
      data.currencyIds = this.selectedCurrencyIds();
      data.defaultCurrencyId = this.defaultCurrencyId();
      delete data.sequenceNumber;
      if (this.editingWalletId()) {
        await this.api.updateWallet(this.bizId, this.editingWalletId()!, data);
      } else {
        await this.api.createWallet(this.bizId, data);
      }
      this.showWalletForm.set(false);
      this.toast.success(
        this.editingWalletId() ? 'تم تحديث المحفظة بنجاح' : 'تم إنشاء المحفظة بنجاح',
      );
      await this.load();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء حفظ المحفظة');
    }
  }

  confirmDelete(type: 'wallet', id: number, name: string) {
    this.deleteTarget.set({ type, id, name });
    this.showDeleteConfirm.set(true);
  }

  async executeDelete() {
    const target = this.deleteTarget();
    if (!target) return;
    try {
      await this.api.deleteWallet(this.bizId, target.id);
      this.showDeleteConfirm.set(false);
      this.deleteTarget.set(null);
      this.toast.success('تم الحذف بنجاح');
      await this.load();
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء الحذف');
    }
  }

  getBalanceDisplay(acc: any): string {
    if (!acc.balances || acc.balances.length === 0) return '0';
    return acc.balances
      .map((b: any) => `${Number(b.balance).toLocaleString()} ${b.currencySymbol || ''}`)
      .join(' | ');
  }

  async loadAccountCurrencies(accountId: number) {
    try {
      const currencies = await this.api.getAccountCurrencies(accountId);
      this.accountCurrencies.set(currencies || []);
    } catch (e) {
      console.error(e);
      this.accountCurrencies.set([]);
    }
  }

  async onAccountChange(accountId: number) {
    if (accountId) {
      await this.loadAccountCurrencies(accountId);
      const allCurrencyIds = this.accountCurrencies().map((c: any) => c.currencyId);
      this.selectedCurrencyIds.set(allCurrencyIds);
      this.defaultCurrencyId.set(null);
    } else {
      this.accountCurrencies.set([]);
      this.selectedCurrencyIds.set([]);
      this.defaultCurrencyId.set(null);
    }
  }

  toggleCurrency(currencyId: number) {
    const current = this.selectedCurrencyIds();
    if (current.includes(currencyId)) {
      this.selectedCurrencyIds.set(current.filter((id) => id !== currencyId));
      if (this.defaultCurrencyId() === currencyId) this.defaultCurrencyId.set(null);
    } else {
      this.selectedCurrencyIds.set([...current, currencyId]);
    }
  }

  isCurrencySelected(currencyId: number): boolean {
    return this.selectedCurrencyIds().includes(currencyId);
  }

  setDefaultCurrency(currencyId: number) {
    this.defaultCurrencyId.set(currencyId);
  }
}
