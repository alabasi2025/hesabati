import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { formatAmount as formatAmountShared, formatDate as formatDateShared } from '../../shared/helpers';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collections.html',
  styleUrl: './collections.scss',
})
export class CollectionsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  loading = signal(true);
  saving = signal(false);
  error = signal('');
  success = signal('');

  // UI State
  showHowItWorks = signal(false);
  activeTab = signal<'operations' | 'funds'>('operations');
  activeOpsTab = signal<'collection' | 'delivery' | 'history'>('collection');
  // activeView maps to both tabs - 'collection'/'delivery'/'history' go to operations, 'funds' goes to funds tab
  activeView = signal<'collection' | 'delivery' | 'history' | 'funds'>('collection');

  // Data
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);
  vouchers = signal<any[]>([]);

  // Selected fund for details
  selectedFund = signal<any>(null);

  // Collection form
  selectedCollectionOT = signal<any>(null);
  collectionDate = signal(new Date().toISOString().split('T')[0]);
  collectionDescription = signal('');
  collectionEntries = signal<{ accountId: number; accountName: string; accountType: string; amount: string; notes: string }[]>([]);

  // Delivery form
  selectedDeliveryOT = signal<any>(null);
  deliveryDate = signal(new Date().toISOString().split('T')[0]);
  deliveryDescription = signal('');
  deliveryEntries = signal<{ accountId: number; accountName: string; accountType: string; amount: string; reference: string; notes: string }[]>([]);

  // Computed
  collectionOpTypes = computed(() => this.operationTypes().filter(ot => ot.category === 'collection' || ot.category === 'تحصيل'));
  deliveryOpTypes = computed(() => this.operationTypes().filter(ot =>
    ot.category === 'delivery' || ot.category === 'transfer' || ot.category === 'توريد' || ot.category === 'تحويلات'
  ));

  collectionTotal = computed(() =>
    this.collectionEntries().reduce((s, e) => s + (Number.parseFloat(e.amount) || 0), 0)
  );
  deliveryTotal = computed(() =>
    this.deliveryEntries().reduce((s, e) => s + (Number.parseFloat(e.amount) || 0), 0)
  );

  historyStats = computed(() => {
    const all = this.vouchers();
    const receipts = all.filter(v => v.voucherType === 'receipt');
    const payments = all.filter(v => v.voucherType === 'payment');
    return {
      totalReceipts: receipts.reduce((s: number, v: any) => s + Number.parseFloat(v.amount || 0), 0),
      totalPayments: payments.reduce((s: number, v: any) => s + Number.parseFloat(v.amount || 0), 0),
      receiptCount: receipts.length,
      paymentCount: payments.length,
    };
  });

  // Fund groups
  collectionFunds = computed(() => this.funds().filter(f => f.fundType === 'collection'));
  advanceFunds = computed(() => this.funds().filter(f => f.fundType === 'salary_advance'));
  custodyFunds = computed(() => this.funds().filter(f => f.fundType === 'custody'));
  safeFunds = computed(() => this.funds().filter(f => f.fundType === 'safe'));
  otherFunds = computed(() => this.funds().filter(f =>
    !['collection', 'salary_advance', 'custody', 'safe'].includes(f.fundType)
  ));

  protected override onBizIdChange(_bizId: number): void {
    void this.loadAll();
  }

  async loadAll() {
    this.loading.set(true);
    try {
      const [ots, accs, fds, vcs] = await Promise.all([
        this.api.getOperationTypes(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getVouchers(this.bizId),
      ]);
      this.operationTypes.set(ots);
      this.accounts.set(accs);
      this.funds.set(fds);
      this.vouchers.set(vcs);
    } catch (e: unknown) {
      this.error.set('خطأ في تحميل البيانات');
    }
    this.loading.set(false);
  }

  // ===================== Collection =====================
  selectCollectionOT(ot: any) {
    this.selectedCollectionOT.set(ot);
    const entries = (ot.linkedAccounts || []).filter((la: any) => la.isActive !== false).map((la: any) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || '',
      accountType: la.accountType || '',
      amount: '',
      notes: '',
    }));
    this.collectionEntries.set(entries);
  }

  updateCollectionEntry(index: number, field: string, value: string) {
    this.collectionEntries.update(entries => {
      const updated = [...entries];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  async saveCollection() {
    const entries = this.collectionEntries().filter(e => Number.parseFloat(e.amount) > 0);
    if (!entries.length) { this.showError('أدخل مبلغاً واحداً على الأقل'); return; }

    const total = entries.reduce((s, e) => s + Number.parseFloat(e.amount), 0);
    const summaryLines = entries.map(e => `\u2022 ${e.accountName}: ${Number.parseFloat(e.amount).toLocaleString('ar-SA')}`).join('\n');
    const confirmed = await this.toast.confirm({
      title: `تأكيد التحصيل - ${this.selectedCollectionOT()?.name || ''}`,
      message: `سيتم إنشاء سند قبض واحد (متعدد) يحتوي على ${entries.length} سطور بإجمالي ${total.toLocaleString('ar-SA')}:\n${summaryLines}`,
      type: 'info',
    });
    if (!confirmed) return;

    this.saving.set(true);
    this.error.set('');
    try {
      const result = await this.api.createVoucherMulti(this.bizId, {
        voucherType: 'receipt',
        operationTypeId: this.selectedCollectionOT()?.id,
        currencyId: 1,
        description: this.collectionDescription() || `تحصيل - ${this.selectedCollectionOT()?.name || ''}`,
        voucherDate: this.collectionDate(),
        entries: entries.map(e => ({
          accountId: e.accountId,
          amount: Number.parseFloat(e.amount),
          notes: e.notes || null,
        })),
      });
      this.success.set(`تم إنشاء سند قبض متعدد بنجاح - إجمالي: ${total.toLocaleString('ar-SA')} (رقم: ${result.voucherNumber || '—'})`);
      setTimeout(() => this.success.set(''), 5000);
      this.selectedCollectionOT.set(null);
      this.collectionEntries.set([]);
      this.collectionDescription.set('');
      this.activeOpsTab.set('history');
      await this.loadAll();
    } catch (e: unknown) {
      this.showError(e instanceof Error ? e.message : 'خطأ في الحفظ');
    }
    this.saving.set(false);
  }

  // ===================== Delivery =====================
  selectDeliveryOT(ot: any) {
    this.selectedDeliveryOT.set(ot);
    const entries = (ot.linkedAccounts || []).filter((la: any) => la.isActive !== false).map((la: any) => ({
      accountId: la.accountId || la.id,
      accountName: la.label || la.accountName || '',
      accountType: la.accountType || '',
      amount: '',
      reference: '',
      notes: '',
    }));
    this.deliveryEntries.set(entries);
  }

  updateDeliveryEntry(index: number, field: string, value: string) {
    this.deliveryEntries.update(entries => {
      const updated = [...entries];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }

  async saveDelivery() {
    const entries = this.deliveryEntries().filter(e => Number.parseFloat(e.amount) > 0);
    if (!entries.length) { this.showError('أدخل مبلغاً واحداً على الأقل'); return; }

    const total = entries.reduce((s, e) => s + Number.parseFloat(e.amount), 0);
    const summaryLines = entries.map(e => `\u2022 ${e.accountName}: ${Number.parseFloat(e.amount).toLocaleString('ar-SA')}`).join('\n');
    const confirmed = await this.toast.confirm({
      title: `تأكيد التوريد - ${this.selectedDeliveryOT()?.name || ''}`,
      message: `سيتم إنشاء سند صرف واحد (متعدد) يحتوي على ${entries.length} سطور بإجمالي ${total.toLocaleString('ar-SA')}:\n${summaryLines}`,
      type: 'danger',
    });
    if (!confirmed) return;

    this.saving.set(true);
    this.error.set('');
    try {
      const result = await this.api.createVoucherMulti(this.bizId, {
        voucherType: 'payment',
        operationTypeId: this.selectedDeliveryOT()?.id,
        currencyId: 1,
        description: this.deliveryDescription() || `توريد - ${this.selectedDeliveryOT()?.name || ''}`,
        voucherDate: this.deliveryDate(),
        entries: entries.map(e => ({
          accountId: e.accountId,
          amount: Number.parseFloat(e.amount),
          reference: e.reference || null,
          notes: e.notes || null,
        })),
      });
      this.success.set(`تم إنشاء سند صرف متعدد بنجاح - إجمالي: ${total.toLocaleString('ar-SA')} (رقم: ${result.voucherNumber || '—'})`);
      setTimeout(() => this.success.set(''), 5000);
      this.selectedDeliveryOT.set(null);
      this.deliveryEntries.set([]);
      this.deliveryDescription.set('');
      this.activeOpsTab.set('history');
      await this.loadAll();
    } catch (e: unknown) {
      this.showError(e instanceof Error ? e.message : 'خطأ في الحفظ');
    }
    this.saving.set(false);
  }

  // ===================== Funds =====================
  selectFund(fund: any) {
    if (this.selectedFund()?.id === fund.id) {
      this.selectedFund.set(null);
    } else {
      this.selectedFund.set(fund);
    }
  }

  getFundBalance(fund: any): number {
    const all = this.vouchers();
    let balance = 0;
    for (const v of all) {
      if (v.toFundId === fund.id) balance += Number.parseFloat(v.amount || 0);
      if (v.fromFundId === fund.id) balance -= Number.parseFloat(v.amount || 0);
    }
    return balance;
  }

  getFundVouchers(fund: any): any[] {
    return this.vouchers().filter(v =>
      v.fromFundId === fund.id || v.toFundId === fund.id
    ).slice(0, 15);
  }

  getFundTypeLabel(t: string): string {
    const m: Record<string, string> = {
      collection: 'تحصيل وتوريد',
      salary_advance: 'سلف موظفين',
      custody: 'عهدة',
      safe: 'خزنة',
      expense: 'خرج',
      deposit: 'توريدات'
    };
    return m[t] || t;
  }

  getFundTypeIcon(t: string): string {
    const m: Record<string, string> = {
      collection: 'receipt_long',
      salary_advance: 'request_quote',
      custody: 'lock',
      safe: 'savings',
      expense: 'shopping_cart',
      deposit: 'move_to_inbox'
    };
    return m[t] || 'inventory_2';
  }

  getFundTypeColor(t: string): string {
    const m: Record<string, string> = {
      collection: '#3b82f6',
      salary_advance: '#f59e0b',
      custody: '#8b5cf6',
      safe: '#10b981',
      expense: '#ef4444',
      deposit: '#06b6d4'
    };
    return m[t] || '#64748b';
  }

  getVoucherTypeLabel(t: string): string {
    const m: Record<string, string> = {
      receipt: 'قبض', payment: 'صرف', transfer: 'تحويل', journal: 'قيد'
    };
    return m[t] || t;
  }

  getVoucherTypeColor(t: string): string {
    return t === 'receipt' ? '#10b981' : t === 'payment' ? '#ef4444' : '#f59e0b';
  }

  getRecentVouchers(): any[] {
    return this.vouchers()
      .filter(v => v.voucherType === 'receipt' || v.voucherType === 'payment')
      .slice(0, 20);
  }

  // ===================== Helpers =====================
  showError(msg: string) {
    this.error.set(msg);
    setTimeout(() => this.error.set(''), 4000);
  }

  formatAmount(amount: unknown): string {
    return formatAmountShared(amount);
  }

  formatDate(d: string): string {
    return formatDateShared(d || '');
  }

  parseFloat(v: any): number { return Number.parseFloat(v) || 0; }
  trackById(_: number, item: any) { return item.id; }
  trackByIndex(i: number) { return i; }
}
