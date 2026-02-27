import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

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

  bizId = 0;
  loading = signal(true);
  saving = signal(false);
  error = signal('');

  // UI State
  showHowItWorks = signal(false);
  activeView = signal<'collection' | 'delivery' | 'history'>('collection');

  // Data
  operationTypes = signal<any[]>([]);
  accounts = signal<any[]>([]);
  vouchers = signal<any[]>([]);

  // Selected operation types
  selectedCollectionOT = signal<any>(null);
  selectedDeliveryOT = signal<any>(null);

  // Collection form
  collectionDate = signal(new Date().toISOString().split('T')[0]);
  collectionDescription = signal('');
  collectionEntries = signal<{ accountId: number; accountName: string; amount: string; notes: string }[]>([]);

  // Delivery form
  deliveryDate = signal(new Date().toISOString().split('T')[0]);
  deliveryDescription = signal('');
  deliveryEntries = signal<{ accountId: number; accountName: string; amount: string; reference: string; notes: string }[]>([]);

  // Computed
  collectionOpTypes = computed(() => {
    return this.operationTypes().filter(ot => ot.category === 'collection');
  });

  deliveryOpTypes = computed(() => {
    return this.operationTypes().filter(ot => ot.category === 'delivery');
  });

  allOpTypes = computed(() => {
    return this.operationTypes().filter(ot =>
      ot.category === 'collection' || ot.category === 'delivery'
    );
  });

  collectionTotal = computed(() => {
    return this.collectionEntries().reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  });

  deliveryTotal = computed(() => {
    return this.deliveryEntries().reduce((s, e) => s + (parseFloat(e.amount) || 0), 0);
  });

  historyStats = computed(() => {
    const all = this.vouchers();
    const receipts = all.filter(v => v.voucherType === 'receipt');
    const payments = all.filter(v => v.voucherType === 'payment');
    return {
      totalReceipts: receipts.reduce((s, v) => s + parseFloat(v.amount || 0), 0),
      totalPayments: payments.reduce((s, v) => s + parseFloat(v.amount || 0), 0),
      receiptCount: receipts.length,
      paymentCount: payments.length,
    };
  });

  async ngOnInit() {
    this.route.parent?.params.subscribe(async (params) => {
      this.bizId = parseInt(params['bizId']);
      await Promise.all([this.loadOperationTypes(), this.loadAccounts(), this.loadVouchers()]);
    });
  }

  async loadOperationTypes() {
    this.loading.set(true);
    try {
      const data = await this.api.getOperationTypes(this.bizId);
      this.operationTypes.set(data);
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.loading.set(false);
    }
  }

  async loadAccounts() {
    try {
      const data = await this.api.getAccounts(this.bizId);
      this.accounts.set(data);
    } catch (e) { /* ignore */ }
  }

  async loadVouchers() {
    try {
      const data = await this.api.getVouchers(this.bizId);
      this.vouchers.set(data);
    } catch (e) { /* ignore */ }
  }

  // ===== Collection =====
  selectCollectionOT(ot: any) {
    this.selectedCollectionOT.set(ot);
    const entries = (ot.accounts || []).map((la: any) => ({
      accountId: la.accountId,
      accountName: la.accountName || la.account?.name || '',
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
    if (entries.length === 0) { this.error.set('أدخل مبلغاً واحداً على الأقل'); return; }

    this.saving.set(true);
    try {
      for (const entry of entries) {
        await this.api.createVoucher(this.bizId, {
          voucherType: 'receipt',
          operationTypeId: this.selectedCollectionOT()?.id,
          toAccountId: entry.accountId,
          amount: String(parseFloat(entry.amount)),
          description: this.collectionDescription() || `تحصيل ${entry.accountName}`,
          voucherDate: this.collectionDate(),
          notes: entry.notes,
        });
      }
      await this.loadVouchers();
      this.selectedCollectionOT.set(null);
      this.collectionEntries.set([]);
      this.collectionDescription.set('');
      this.activeView.set('history');
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.saving.set(false);
    }
  }

  // ===== Delivery =====
  selectDeliveryOT(ot: any) {
    this.selectedDeliveryOT.set(ot);
    const entries = (ot.accounts || []).map((la: any) => ({
      accountId: la.accountId,
      accountName: la.accountName || la.account?.name || '',
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
    if (entries.length === 0) { this.error.set('أدخل مبلغاً واحداً على الأقل'); return; }

    this.saving.set(true);
    try {
      for (const entry of entries) {
        await this.api.createVoucher(this.bizId, {
          voucherType: 'payment',
          operationTypeId: this.selectedDeliveryOT()?.id,
          fromAccountId: entry.accountId,
          amount: String(parseFloat(entry.amount)),
          description: this.deliveryDescription() || `توريد ${entry.accountName}`,
          voucherDate: this.deliveryDate(),
          reference: entry.reference,
          notes: entry.notes,
        });
      }
      await this.loadVouchers();
      this.selectedDeliveryOT.set(null);
      this.deliveryEntries.set([]);
      this.deliveryDescription.set('');
      this.activeView.set('history');
    } catch (e: any) {
      this.error.set(e.message);
    } finally {
      this.saving.set(false);
    }
  }

  // ===== Helpers =====
  formatAmount(amount: any): string {
    return parseFloat(amount || 0).toLocaleString('ar-YE');
  }

  formatDate(d: string): string {
    if (!d) return '';
    return new Date(d).toLocaleDateString('ar-YE');
  }

  getAccountName(id: number): string {
    return this.accounts().find(a => a.id === id)?.name || '-';
  }

  trackById(_: number, item: any) { return item.id; }
  trackByIndex(i: number) { return i; }
  parseFloat(v: any): number { return parseFloat(v) || 0; }
}
