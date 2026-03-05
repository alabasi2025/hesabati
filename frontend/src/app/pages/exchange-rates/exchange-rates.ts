import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-exchange-rates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exchange-rates.html',
  styleUrl: './exchange-rates.scss',
})
export class ExchangeRatesComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);

  bizId = 0;
  rates: any[] = [];
  currencies: any[] = [];
  showForm = false;
  editId: number | null = null;
  form: any = { fromCurrencyId: '', toCurrencyId: '', rate: '', effectiveDate: new Date().toISOString().split('T')[0], source: 'manual', notes: '' };
  convertFrom = ''; convertTo = ''; convertAmount = 1000; convertResult: number | null = null;

  ngOnInit() {
    this.bizId = Number(this.route.parent?.snapshot.paramMap.get('bizId'));
    this.load();
  }

  async load() {
    this.currencies = await this.api.getCurrencies();
    this.rates = await this.api.getExchangeRates(this.bizId);
  }

  getSourceCount(source: string): number {
    return this.rates.filter(r => r.source === source).length;
  }

  getCurrencyName(id: number): string {
    const c = this.currencies.find(c => c.id === id);
    return c ? (c.nameAr || c.code) : String(id);
  }

  async save() {
    try {
      const data = { ...this.form, fromCurrencyId: Number(this.form.fromCurrencyId), toCurrencyId: Number(this.form.toCurrencyId), rate: String(this.form.rate) };
      if (this.editId) { await this.api.updateExchangeRate(this.bizId, this.editId, data); }
      else { await this.api.createExchangeRate(this.bizId, data); }
      this.toast.success('تم الحفظ بنجاح');
      this.cancel(); this.load();
    } catch (e: unknown) {
      const errObj = e && typeof e === 'object' && 'error' in e ? (e as { error?: { error?: string } }).error : undefined;
      const msg = e instanceof Error ? e.message : (errObj && typeof errObj === 'object' && errObj.error) ? errObj.error : undefined;
      this.toast.error(msg || 'حدث خطأ');
    }
  }

  edit(r: any) {
    this.editId = r.id;
    this.form = { fromCurrencyId: r.fromCurrencyId, toCurrencyId: r.toCurrencyId, rate: r.rate, effectiveDate: r.effectiveDate, source: r.source, notes: r.notes || '' };
    this.showForm = true;
  }

  async remove(id: number) {
    if (confirm('حذف سعر الصرف؟')) {
      await this.api.deleteExchangeRate(this.bizId, id);
      this.toast.success('تم الحذف');
      this.load();
    }
  }

  cancel() {
    this.showForm = false; this.editId = null;
    this.form = { fromCurrencyId: '', toCurrencyId: '', rate: '', effectiveDate: new Date().toISOString().split('T')[0], source: 'manual', notes: '' };
  }

  async convert() {
    try {
      const res = await this.api.convertCurrency(this.bizId, Number(this.convertFrom), Number(this.convertTo), this.convertAmount);
      this.convertResult = res.convertedAmount;
    } catch {
      this.convertResult = null;
      this.toast.error('لا يوجد سعر صرف بين هاتين العملتين');
    }
  }
}
