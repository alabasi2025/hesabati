import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-vouchers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vouchers.html',
  styleUrl: './vouchers.scss',
})
export class VouchersComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);

  bizId = 0;
  vouchers = signal<any[]>([]);
  accounts = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  activeTab = signal<string>('all');

  form: any = {
    voucherType: 'receipt', amount: 0, currencyId: 1,
    fromAccountId: null, toAccountId: null, description: '', reference: '',
  };

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [v, a] = await Promise.all([this.api.getVouchers(this.bizId), this.api.getAccounts(this.bizId)]);
      this.vouchers.set(v); this.accounts.set(a);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  async switchTab(tab: string) { this.activeTab.set(tab); await this.load(); }

  filteredVouchers() {
    const t = this.activeTab();
    if (t === 'all') return this.vouchers();
    return this.vouchers().filter(v => v.voucherType === t);
  }

  getTypeLabel(t: string): string {
    const m: Record<string, string> = { receipt: 'سند قبض', payment: 'سند صرف', transfer: 'تحويل', collection: 'تحصيل', delivery: 'توريد' };
    return m[t] || t;
  }
  getTypeClass(t: string): string {
    const m: Record<string, string> = { receipt: 'receipt', payment: 'payment', transfer: 'transfer', collection: 'receipt', delivery: 'payment' };
    return m[t] || '';
  }
  getStatusLabel(s: string): string { return s === 'confirmed' ? 'مؤكد' : s === 'draft' ? 'مسودة' : 'ملغي'; }
  getStatusClass(s: string): string { return s === 'confirmed' ? 'active' : s === 'draft' ? 'partner' : 'inactive'; }
  getAccountName(id: number | null): string { if (!id) return '-'; return this.accounts().find(a => a.id === id)?.name || '-'; }

  openAdd(type: string = 'receipt') {
    this.form = { voucherType: type, amount: 0, currencyId: 1, fromAccountId: null, toAccountId: null, description: '', reference: '' };
    this.showForm.set(true);
  }

  async save() {
    try {
      await this.api.createVoucher(this.bizId, { ...this.form, amount: String(this.form.amount) });
      this.showForm.set(false); await this.load();
    } catch (e) { console.error(e); }
  }

  async cancel(id: number) {
    if (confirm('هل أنت متأكد من إلغاء هذا السند؟')) { await this.api.deleteVoucher(id); await this.load(); }
  }

  formatDate(d: string): string { return new Date(d).toLocaleDateString('ar-YE', { year: 'numeric', month: 'short', day: 'numeric' }); }

  tabs = [
    { value: 'all', label: 'الكل', icon: 'receipt_long' },
    { value: 'receipt', label: 'سندات القبض', icon: 'arrow_downward' },
    { value: 'payment', label: 'سندات الصرف', icon: 'arrow_upward' },
    { value: 'transfer', label: 'التحويلات', icon: 'swap_horiz' },
  ];
}
