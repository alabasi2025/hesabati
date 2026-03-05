import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-expense-budget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-budget.html',
  styleUrl: './expense-budget.scss',
})
export class ExpenseBudgetComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  items = signal<any[]>([]);
  currencies = signal<any[]>([]);
  stations = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  filterMonth = signal<number | null>(null);
  filterYear = signal<number | null>(null);
  months = [1,2,3,4,5,6,7,8,9,10,11,12];
  years: number[] = [];
  form: any = { name: '', stationId: null as number | null, amount: 0, currencyId: 1, expenseType: 'variable', month: null as number | null, year: null as number | null, notes: '' };

  ngOnInit(): void {
    const y = new Date().getFullYear();
    for (let i = y; i >= y - 5; i--) this.years.push(i);
  }

  protected override onBizIdChange(_bizId: number): void {
    this.load();
    this.api.getCurrencies().then(c => this.currencies.set(c || []));
    this.api.getStations(this.bizId).then(s => this.stations.set(s || []));
  }

  async load() {
    this.loading.set(true);
    try {
      const month = this.filterMonth();
      const year = this.filterYear();
      const data = await this.api.getExpenseBudget(this.bizId, month ?? undefined, year ?? undefined);
      this.items.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  onFilterChange() { this.load(); }

  openAdd() {
    this.form = { name: '', stationId: null, amount: 0, currencyId: 1, expenseType: 'variable', month: this.filterMonth() || null, year: this.filterYear() || new Date().getFullYear(), notes: '' };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(item: any) {
    this.form = {
      name: item.name, stationId: item.stationId || null, amount: Number(item.amount || 0), currencyId: item.currencyId || 1,
      expenseType: item.expenseType || 'variable', month: item.month ?? null, year: item.year ?? null, notes: item.notes || '',
    };
    this.editingId.set(item.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.name?.trim()) { this.toast.warning('يرجى إدخال اسم البند'); return; }
    try {
      const payload = { ...this.form, amount: Number(this.form.amount) };
      const id = this.editingId();
      if (id !== null) {
        await this.api.updateExpenseBudget(id, payload);
        this.toast.success('تم تعديل البند بنجاح');
      } else {
        await this.api.createExpenseBudget(this.bizId, payload);
        this.toast.success('تم إضافة بند الميزانية بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ'); }
  }

  async remove(item: any) {
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل أنت متأكد من حذف "${item.name}"؟`, type: 'danger' });
    if (confirmed) {
      try {
        await this.api.deleteExpenseBudget(item.id);
        this.toast.success('تم الحذف');
        await this.load();
      } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ'); }
    }
  }

  getExpenseTypeLabel(t: string): string {
    const map: Record<string, string> = { fixed: 'ثابت', variable: 'متغير', annual: 'سنوي' };
    return map[t] || t;
  }
  getStationName(id: number | null): string {
    if (!id) return '-';
    return this.stations().find(s => s.id === id)?.name || '-';
  }
  getCurrencyCode(id: number): string {
    return this.currencies().find(c => c.id === id)?.code || 'ر.ي';
  }
  totalAmount(): number { return this.items().reduce((s, i) => s + Number(i.amount || 0), 0); }
}
