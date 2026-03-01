import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-exchange-rates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-6xl mx-auto" dir="rtl">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span class="material-icons text-blue-600">currency_exchange</span>
            أسعار الصرف اليومية
          </h1>
          <p class="text-gray-500 text-sm mt-1">إدارة أسعار صرف العملات وتحويل المبالغ</p>
        </div>
        <button (click)="showForm = !showForm" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-1">
          <span class="material-icons text-sm">add</span>
          سعر صرف جديد
        </button>
      </div>

      <!-- محول العملات -->
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 mb-6 border border-blue-100">
        <h3 class="font-semibold text-blue-800 mb-3 flex items-center gap-1">
          <span class="material-icons text-sm">swap_horiz</span>
          محول العملات
        </h3>
        <div class="flex flex-wrap gap-3 items-end">
          <div>
            <label class="text-xs text-gray-600 block mb-1">المبلغ</label>
            <input type="number" [(ngModel)]="convertAmount" class="border rounded-lg px-3 py-2 w-36" placeholder="المبلغ">
          </div>
          <div>
            <label class="text-xs text-gray-600 block mb-1">من عملة</label>
            <select [(ngModel)]="convertFrom" class="border rounded-lg px-3 py-2 w-40">
              <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}}</option>
            </select>
          </div>
          <span class="material-icons text-gray-400 pb-2">arrow_back</span>
          <div>
            <label class="text-xs text-gray-600 block mb-1">إلى عملة</label>
            <select [(ngModel)]="convertTo" class="border rounded-lg px-3 py-2 w-40">
              <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}}</option>
            </select>
          </div>
          <button (click)="convert()" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">تحويل</button>
          <div *ngIf="convertResult !== null" class="bg-white rounded-lg px-4 py-2 border border-blue-200 font-bold text-blue-700">
            {{convertResult | number:'1.2-4'}}
          </div>
        </div>
      </div>

      <!-- نموذج الإضافة -->
      <div *ngIf="showForm" class="bg-white rounded-xl shadow-sm border p-5 mb-6">
        <h3 class="font-semibold text-gray-700 mb-4">{{editId ? 'تعديل' : 'إضافة'}} سعر صرف</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="text-sm text-gray-600 block mb-1">من عملة</label>
            <select [(ngModel)]="form.fromCurrencyId" class="border rounded-lg px-3 py-2 w-full">
              <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}}</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">إلى عملة</label>
            <select [(ngModel)]="form.toCurrencyId" class="border rounded-lg px-3 py-2 w-full">
              <option *ngFor="let c of currencies" [value]="c.id">{{c.nameAr || c.code}}</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">سعر الصرف</label>
            <input type="number" step="0.0001" [(ngModel)]="form.rate" class="border rounded-lg px-3 py-2 w-full" placeholder="0.0037">
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">تاريخ السريان</label>
            <input type="date" [(ngModel)]="form.effectiveDate" class="border rounded-lg px-3 py-2 w-full">
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">المصدر</label>
            <select [(ngModel)]="form.source" class="border rounded-lg px-3 py-2 w-full">
              <option value="manual">يدوي</option>
              <option value="market">سوق</option>
              <option value="bank">بنك</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-gray-600 block mb-1">ملاحظات</label>
            <input type="text" [(ngModel)]="form.notes" class="border rounded-lg px-3 py-2 w-full" placeholder="ملاحظات اختيارية">
          </div>
        </div>
        <div class="flex gap-2 mt-4">
          <button (click)="save()" class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            {{editId ? 'تحديث' : 'حفظ'}}
          </button>
          <button (click)="cancel()" class="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300">إلغاء</button>
        </div>
      </div>

      <!-- جدول أسعار الصرف -->
      <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="text-right px-4 py-3 text-sm font-medium text-gray-600">من</th>
              <th class="text-right px-4 py-3 text-sm font-medium text-gray-600">إلى</th>
              <th class="text-right px-4 py-3 text-sm font-medium text-gray-600">السعر</th>
              <th class="text-right px-4 py-3 text-sm font-medium text-gray-600">التاريخ</th>
              <th class="text-right px-4 py-3 text-sm font-medium text-gray-600">المصدر</th>
              <th class="text-center px-4 py-3 text-sm font-medium text-gray-600">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let r of rates" class="border-b hover:bg-gray-50">
              <td class="px-4 py-3 text-sm">{{r.fromCurrencyCode || r.fromCurrencyId}}</td>
              <td class="px-4 py-3 text-sm">{{r.toCurrencyCode || r.toCurrencyId}}</td>
              <td class="px-4 py-3 text-sm font-mono font-bold text-blue-700">{{r.rate}}</td>
              <td class="px-4 py-3 text-sm">{{r.effectiveDate}}</td>
              <td class="px-4 py-3 text-sm">
                <span class="px-2 py-0.5 rounded text-xs" [class]="r.source === 'manual' ? 'bg-gray-100 text-gray-600' : r.source === 'market' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'">
                  {{r.source === 'manual' ? 'يدوي' : r.source === 'market' ? 'سوق' : 'بنك'}}
                </span>
              </td>
              <td class="px-4 py-3 text-center">
                <button (click)="edit(r)" class="text-blue-600 hover:text-blue-800 mx-1"><span class="material-icons text-sm">edit</span></button>
                <button (click)="remove(r.id)" class="text-red-600 hover:text-red-800 mx-1"><span class="material-icons text-sm">delete</span></button>
              </td>
            </tr>
            <tr *ngIf="rates.length === 0">
              <td colspan="6" class="text-center py-8 text-gray-400">لا توجد أسعار صرف مسجلة</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
})
export class ExchangeRatesComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
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

  async save() {
    const data = { ...this.form, fromCurrencyId: Number(this.form.fromCurrencyId), toCurrencyId: Number(this.form.toCurrencyId), rate: String(this.form.rate) };
    if (this.editId) { await this.api.updateExchangeRate(this.bizId, this.editId, data); }
    else { await this.api.createExchangeRate(this.bizId, data); }
    this.cancel(); this.load();
  }

  edit(r: any) { this.editId = r.id; this.form = { fromCurrencyId: r.fromCurrencyId, toCurrencyId: r.toCurrencyId, rate: r.rate, effectiveDate: r.effectiveDate, source: r.source, notes: r.notes || '' }; this.showForm = true; }

  async remove(id: number) { if (confirm('حذف سعر الصرف؟')) { await this.api.deleteExchangeRate(this.bizId, id); this.load(); } }

  cancel() { this.showForm = false; this.editId = null; this.form = { fromCurrencyId: '', toCurrencyId: '', rate: '', effectiveDate: new Date().toISOString().split('T')[0], source: 'manual', notes: '' }; }

  async convert() {
    try {
      const res = await this.api.convertCurrency(this.bizId, Number(this.convertFrom), Number(this.convertTo), this.convertAmount);
      this.convertResult = res.convertedAmount;
    } catch { this.convertResult = null; alert('لا يوجد سعر صرف بين هاتين العملتين'); }
  }
}
