import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { formatAmount as formatAmountShared } from '../../shared/helpers';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

type TreasuryKind = 'fund' | 'bank' | 'exchange' | 'e_wallet' | 'warehouse';
type VoucherTypeTreasury = 'receipt' | 'payment';

@Component({
  selector: 'app-register-operation',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent, StatusBadgeComponent],
  templateUrl: './register-operation.html',
  styleUrl: './register-operation.scss',
})
export class RegisterOperationComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  saving = signal(false);
  error = signal('');

  // Step 1: نوع الجهة
  treasuryKind = signal<TreasuryKind | ''>('');
  // Step 2: الخزينة/المخزن المحدد { id, name, type }
  selectedTreasury = signal<{ id: number; name: string; type: TreasuryKind } | null>(null);
  // Step 3: نوع السند (للخزائن: قبض/صرف؛ للمخزن نعرض رسالة أو نوجّه لصفحة المخازن)
  voucherType = signal<VoucherTypeTreasury | ''>('');
  // Step 4: القالب المختار
  selectedTemplate = signal<any>(null);
  // Step 5: بيانات التنفيذ
  execDate = signal(new Date().toISOString().split('T')[0]);
  execCurrencyId = signal(1);
  execDescription = signal('');
  execReference = signal('');
  execEntries = signal<{ accountId: number; accountName: string; amount: string; description: string }[]>([]);
  execSingleAmount = signal('');
  execSingleDescription = signal('');

  operationTypes = signal<any[]>([]);
  funds = signal<any[]>([]);
  accounts = signal<any[]>([]);
  warehouses = signal<any[]>([]);
  currencies = signal<any[]>([]);

  treasuryKindOptions: { value: TreasuryKind; label: string; icon: string }[] = [
    { value: 'fund', label: 'صندوق', icon: 'savings' },
    { value: 'bank', label: 'بنك', icon: 'account_balance' },
    { value: 'exchange', label: 'صراف', icon: 'swap_horiz' },
    { value: 'e_wallet', label: 'محفظة', icon: 'account_balance_wallet' },
    { value: 'warehouse', label: 'مخزن', icon: 'warehouse' },
  ];

  voucherTypeOptions: { value: VoucherTypeTreasury; label: string; icon: string }[] = [
    { value: 'receipt', label: 'سند قبض', icon: 'call_received' },
    { value: 'payment', label: 'سند صرف', icon: 'call_made' },
  ];

  treasuryList = computed(() => {
    const kind = this.treasuryKind();
    if (!kind) return [];
    if (kind === 'fund') return this.funds().map(f => ({ id: f.id, name: f.name, type: 'fund' as TreasuryKind }));
    if (kind === 'warehouse') return this.warehouses().map(w => ({ id: w.id, name: w.name, type: 'warehouse' as TreasuryKind }));
    const accType = kind === 'bank' ? 'bank' : kind === 'exchange' ? 'exchange' : 'e_wallet';
    return this.accounts()
      .filter((a: any) => (a.accountType || a.account_type) === accType)
      .map((a: any) => ({ id: a.id, name: a.name, type: kind }));
  });

  filteredTemplates = computed(() => {
    const opTypes = this.operationTypes();
    const treasury = this.selectedTreasury();
    const vType = this.voucherType();
    if (!treasury || !vType) return [];
    const kind = treasury.type;
    return opTypes.filter((ot: any) => {
      const vt = (ot.voucherType || ot.voucher_type || '').trim();
      if (vt !== vType) return false;
      if (kind === 'fund') {
        const srcFund = ot.sourceFundId ?? ot.source_fund_id;
        return srcFund === treasury.id;
      }
      if (kind === 'bank' || kind === 'exchange' || kind === 'e_wallet') {
        const srcAcc = ot.sourceAccountId ?? ot.source_account_id;
        return srcAcc === treasury.id;
      }
      if (kind === 'warehouse') {
        const srcWh = ot.sourceWarehouseId ?? ot.source_warehouse_id;
        return srcWh === treasury.id;
      }
      return false;
    }).filter((ot: any) => ot.isActive !== false);
  });

  isMultiLine = computed(() => {
    const t = this.selectedTemplate();
    if (!t) return false;
    const linked = t.linkedAccounts || t.accounts || [];
    return (t.hasMultiLines !== false) && linked.length > 0;
  });

  formEntriesForMulti = computed(() => {
    const t = this.selectedTemplate();
    const linked = (t?.linkedAccounts || t?.accounts || []).map((la: any) => ({
      accountId: la.accountId ?? la.account_id ?? la.id,
      accountName: la.displayName ?? la.label ?? la.accountName ?? la.account_name ?? la.name ?? '',
    }));
    const current = this.execEntries();
    if (current.length === linked.length) return current;
    return linked.map((la: any) => {
      const existing = current.find(e => e.accountId === la.accountId);
      return existing ?? { accountId: la.accountId, accountName: la.accountName, amount: '', description: '' };
    });
  });

  protected override onBizIdChange(): void {
    void this.loadAll();
  }

  async loadAll() {
    this.loading.set(true);
    this.error.set('');
    try {
      const [opTypes, funds, accounts, warehouses, currencies] = await Promise.all([
        this.api.getOperationTypes(this.bizId).catch(() => []),
        this.api.getFunds(this.bizId).catch(() => []),
        this.api.getAccounts(this.bizId).catch(() => []),
        this.api.getWarehouses(this.bizId).catch(() => []),
        this.api.getCurrencies().catch(() => []),
      ]);
      this.operationTypes.set(opTypes || []);
      this.funds.set(funds || []);
      this.accounts.set(accounts || []);
      this.warehouses.set(warehouses || []);
      const curList = currencies || [];
      this.currencies.set(curList);
      if (curList.length > 0 && !curList.find((c: any) => c.id === this.execCurrencyId())) {
        this.execCurrencyId.set(curList[0].id);
      }
    } catch (e) {
      this.error.set(e instanceof Error ? e.message : 'فشل تحميل البيانات');
    } finally {
      this.loading.set(false);
    }
  }

  setTreasuryKind(kind: TreasuryKind | '') {
    this.treasuryKind.set(kind);
    this.selectedTreasury.set(null);
    this.voucherType.set('');
    this.selectedTemplate.set(null);
  }

  setTreasury(item: { id: number; name: string; type: TreasuryKind }) {
    this.selectedTreasury.set(item);
    this.voucherType.set('');
    this.selectedTemplate.set(null);
  }

  setVoucherType(vt: VoucherTypeTreasury) {
    this.voucherType.set(vt);
    this.selectedTemplate.set(null);
  }

  setTemplate(ot: any) {
    this.selectedTemplate.set(ot);
    this.execEntries.set([]);
    const linked = (ot?.linkedAccounts || ot?.accounts || []).map((la: any) => ({
      accountId: la.accountId ?? la.account_id ?? la.id,
      accountName: la.displayName ?? la.label ?? la.accountName ?? la.account_name ?? la.name ?? '',
      amount: '',
      description: '',
    }));
    this.execEntries.set(linked);
    const defCur = ot?.currencyId ?? ot?.currency_id;
    if (defCur && this.currencies().some((c: any) => c.id === defCur)) this.execCurrencyId.set(defCur);
  }

  goBack() {
    if (this.selectedTemplate()) {
      this.selectedTemplate.set(null);
      this.execEntries.set([]);
      return;
    }
    if (this.voucherType()) {
      this.voucherType.set('');
      return;
    }
    if (this.selectedTreasury()) {
      this.selectedTreasury.set(null);
      return;
    }
    if (this.treasuryKind()) {
      this.treasuryKind.set('');
      return;
    }
    this.router.navigate(['/biz', this.bizId, 'vouchers']);
  }

  updateEntryAmount(index: number, value: string) {
    this.execEntries.update(entries => {
      const next = [...entries];
      if (next[index]) next[index] = { ...next[index], amount: value };
      return next;
    });
  }

  updateEntryDescription(index: number, value: string) {
    this.execEntries.update(entries => {
      const next = [...entries];
      if (next[index]) next[index] = { ...next[index], description: value };
      return next;
    });
  }

  getFormTotal(): number {
    if (this.isMultiLine()) {
      return this.execEntries().reduce((s, e) => s + (Number.parseFloat(e.amount) || 0), 0);
    }
    return Number.parseFloat(this.execSingleAmount()) || 0;
  }

  getCurrencyCode(): string {
    const id = this.execCurrencyId();
    return this.currencies().find((c: any) => c.id === id)?.code || 'ر.ي';
  }

  async save() {
    const t = this.selectedTemplate();
    if (!t) return;
    this.error.set('');

    const isMulti = this.isMultiLine();
    if (isMulti) {
      const entries = this.execEntries().filter(e => Number.parseFloat(e.amount) > 0);
      if (entries.length === 0) {
        this.toast.warning('أدخل مبلغاً واحداً على الأقل');
        return;
      }
    } else {
      const amt = Number.parseFloat(this.execSingleAmount());
      if (!amt || amt <= 0) {
        this.toast.warning('أدخل المبلغ');
        return;
      }
    }

    this.saving.set(true);
    try {
      const voucherType = (t.voucherType || t.voucher_type || 'receipt') as 'receipt' | 'payment';
      const payload: any = {
        operationTypeId: t.id,
        voucherType,
        currencyId: this.execCurrencyId(),
        description: this.execDescription() || t.name,
        voucherDate: this.execDate(),
        reference: this.execReference() || null,
      };

      const treasury = this.selectedTreasury();
      if (treasury?.type === 'fund') {
        payload.fromFundId = voucherType === 'payment' ? treasury.id : null;
        payload.toFundId = voucherType === 'receipt' ? treasury.id : null;
      } else if (treasury && treasury.type !== 'warehouse') {
        payload.fromAccountId = voucherType === 'payment' ? treasury.id : null;
        payload.toAccountId = voucherType === 'receipt' ? treasury.id : null;
      }

      if (isMulti) {
        const entries = this.execEntries().filter(e => Number.parseFloat(e.amount) > 0).map(e => ({
          accountId: e.accountId,
          amount: Number.parseFloat(e.amount),
          notes: e.description || null,
        }));
        payload.entries = entries;
        const result = await this.api.createVoucherMulti(this.bizId, payload);
        this.toast.success(`تم إنشاء السند بنجاح - رقم: ${(result as any)?.voucherNumber ?? '-'}`);
      } else {
        const amount = Number.parseFloat(this.execSingleAmount());
        payload.amount = String(amount);
        payload.description = this.execDescription() || this.execSingleDescription() || t.name;
        if (voucherType === 'receipt') {
          const firstAcc = (t.linkedAccounts || t.accounts || [])[0];
          const accId = firstAcc?.accountId ?? firstAcc?.account_id ?? firstAcc?.id;
          if (accId) payload.fromAccountId = accId;
          payload.toFundId = treasury?.type === 'fund' ? treasury.id : null;
          payload.toAccountId = treasury?.type !== 'fund' ? treasury?.id : null;
        } else {
          const firstAcc = (t.linkedAccounts || t.accounts || [])[0];
          const accId = firstAcc?.accountId ?? firstAcc?.account_id ?? firstAcc?.id;
          if (accId) payload.toAccountId = accId;
          payload.fromFundId = treasury?.type === 'fund' ? treasury.id : null;
          payload.fromAccountId = treasury?.type !== 'fund' ? treasury?.id : null;
        }
        const result = await this.api.createVoucher(this.bizId, payload);
        this.toast.success(`تم إنشاء السند بنجاح - رقم: ${(result as any)?.voucherNumber ?? '-'}`);
      }

      this.router.navigate(['/biz', this.bizId, 'vouchers']);
    } catch (e: unknown) {
      this.error.set(e instanceof Error ? e.message : String(e));
    } finally {
      this.saving.set(false);
    }
  }

  formatAmount(val: unknown): string {
    return formatAmountShared(val);
  }
}
