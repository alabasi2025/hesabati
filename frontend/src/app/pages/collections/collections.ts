import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './collections.html',
  styleUrl: './collections.scss',
})
export class CollectionsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  biz = inject(BusinessService);

  bizId = 0;
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
    this.collectionEntries().reduce((s, e) => s + (parseFloat(e.amount) || 0), 0)
  );
  deliveryTotal = computed(() =>
    this.deliveryEntries().reduce((s, e) => s + (parseFloat(e.amount) || 0), 0)
  );

  historyStats = computed(() => {
    const all = this.vouchers();
    const receipts = all.filter(v => v.voucherType === 'receipt');
    const payments = all.filter(v => v.voucherType === 'payment');
    return {
      totalReceipts: receipts.reduce((s: number, v: any) => s + parseFloat(v.amount || 0), 0),
      totalPayments: payments.reduce((s: number, v: any) => s + parseFloat(v.amount || 0), 0),
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

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) await this.loadAll();
    });
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
    } catch (e: any) {
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
    const entries = this.collectionEntries().filter(e => parseFloat(e.amount) > 0);
    if (!entries.length) { this.showError('أدخل مبلغاً واحداً على الأقل'); return; }
    this.saving.set(true);
    this.error.set('');
    try {
      for (const entry of entries) {
        await this.api.createVoucher(this.bizId, {
          voucherType: 'receipt',
          operationTypeId: this.selectedCollectionOT()?.id,
          toAccountId: entry.accountId,
          amount: parseFloat(entry.amount),
          currencyId: 1,
          description: this.collectionDescription() || `تحصيل - ${entry.accountName}`,
          voucherDate: this.collectionDate(),
        });
      }
      this.success.set(`✅ تم حفظ ${entries.length} قيد تحصيل بنجاح`);
      setTimeout(() => this.success.set(''), 4000);
      this.selectedCollectionOT.set(null);
      this.collectionEntries.set([]);
      this.collectionDescription.set('');
      this.activeOpsTab.set('history');
      await this.loadAll();
    } catch (e: any) {
      this.showError('خطأ في الحفظ');
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
    const entries = this.deliveryEntries().filter(e => parseFloat(e.amount) > 0);
    if (!entries.length) { this.showError('أدخل مبلغاً واحداً على الأقل'); return; }
    this.saving.set(true);
    this.error.set('');
    try {
      for (const entry of entries) {
        await this.api.createVoucher(this.bizId, {
          voucherType: 'payment',
          operationTypeId: this.selectedDeliveryOT()?.id,
          toAccountId: entry.accountId,
          amount: parseFloat(entry.amount),
          currencyId: 1,
          description: this.deliveryDescription() || `توريد - ${entry.accountName}`,
          voucherDate: this.deliveryDate(),
          reference: entry.reference,
        });
      }
      this.success.set(`✅ تم حفظ ${entries.length} قيد توريد بنجاح`);
      setTimeout(() => this.success.set(''), 4000);
      this.selectedDeliveryOT.set(null);
      this.deliveryEntries.set([]);
      this.deliveryDescription.set('');
      this.activeOpsTab.set('history');
      await this.loadAll();
    } catch (e: any) {
      this.showError('خطأ في الحفظ');
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
      if (v.toFundId === fund.id) balance += parseFloat(v.amount || 0);
      if (v.fromFundId === fund.id) balance -= parseFloat(v.amount || 0);
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

  formatAmount(amount: any): string {
    return parseFloat(amount || 0).toLocaleString('ar-YE');
  }

  formatDate(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('ar-YE', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  parseFloat(v: any): number { return parseFloat(v) || 0; }
  trackById(_: number, item: any) { return item.id; }
  trackByIndex(i: number) { return i; }
}
