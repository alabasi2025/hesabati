import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-salaries',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './salaries.html',
  styleUrl: './salaries.scss',
})
export class SalariesComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  items = signal<any[]>([]);
  employees = signal<any[]>([]);
  currencies = signal<any[]>([]);
  loading = signal(true);
  showForm = signal(false);
  editingId = signal<number | null>(null);

  filterMonth = signal<number | null>(null);
  filterYear = signal<number | null>(null);
  months = [1,2,3,4,5,6,7,8,9,10,11,12];
  years: number[] = [];
  form: any = {
    employeeId: null as number | null, month: new Date().getMonth() + 1, year: new Date().getFullYear(),
    baseSalary: 0, advance: 0, deductions: 0, currencyId: 1, isPaid: false, attendanceDays: null as number | null, notes: '',
  };

  netSalary = computed(() => {
    const b = Number(this.form.baseSalary ?? 0);
    const a = Number(this.form.advance ?? 0);
    const d = Number(this.form.deductions ?? 0);
    return b - a - d;
  });

  override ngOnInit(): void {
    super.ngOnInit();
    const y = new Date().getFullYear();
    for (let i = y; i >= y - 5; i--) this.years.push(i);
  }

  protected override onBizIdChange(_bizId: number): void {
    this.load();
    this.api.getEmployees(this.bizId).then(e => this.employees.set(e || []));
    this.api.getCurrencies().then(c => this.currencies.set(c || []));
  }

  async load() {
    this.loading.set(true);
    try {
      const month = this.filterMonth();
      const year = this.filterYear();
      const data = await this.api.getSalaryRecords(this.bizId, month ?? undefined, year ?? undefined);
      this.items.set(data || []);
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  onFilterChange() { this.load(); }

  openAdd() {
    this.form = {
      employeeId: null, month: this.filterMonth() || new Date().getMonth() + 1, year: this.filterYear() || new Date().getFullYear(),
      baseSalary: 0, advance: 0, deductions: 0, currencyId: 1, isPaid: false, attendanceDays: null, notes: '',
    };
    this.editingId.set(null);
    this.showForm.set(true);
  }

  openEdit(item: any) {
    this.form = {
      employeeId: item.employeeId, month: item.month, year: item.year,
      baseSalary: Number(item.baseSalary || 0), advance: Number(item.advance || 0), deductions: Number(item.deductions || 0),
      currencyId: item.currencyId || 1, isPaid: !!item.isPaid, paidDate: item.paidDate || '', attendanceDays: item.attendanceDays ?? null, notes: item.notes || '',
    };
    this.editingId.set(item.id);
    this.showForm.set(true);
  }

  async save() {
    if (!this.form.employeeId) { this.toast.warning('يرجى اختيار الموظف'); return; }
    try {
      const payload = {
        employeeId: this.form.employeeId, month: Number(this.form.month), year: Number(this.form.year),
        baseSalary: Number(this.form.baseSalary), advance: Number(this.form.advance), deductions: Number(this.form.deductions),
        currencyId: this.form.currencyId, isPaid: !!this.form.isPaid, attendanceDays: this.form.attendanceDays ?? null, notes: this.form.notes || '',
      };
      const id = this.editingId();
      if (id === null) {
        await this.api.createSalaryRecord(this.bizId, payload);
        this.toast.success('تم إضافة سجل الراتب بنجاح');
      } else {
        await this.api.updateSalaryRecord(id, payload);
        this.toast.success('تم تعديل سجل الراتب بنجاح');
      }
      this.showForm.set(false);
      await this.load();
    } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ'); }
  }

  async remove(item: any) {
    const name = item.employeeName || 'الموظف';
    const confirmed = await this.toast.confirm({ title: 'تأكيد الحذف', message: `هل أنت متأكد من حذف سجل راتب "${name}"؟`, type: 'danger' });
    if (confirmed) {
      try {
        await this.api.deleteSalaryRecord(item.id);
        this.toast.success('تم الحذف');
        await this.load();
      } catch (e: unknown) { this.toast.error(e instanceof Error ? e.message : 'حدث خطأ'); }
    }
  }

  getCurrencyCode(id: number): string { return this.currencies().find(c => c.id === id)?.code || 'ر.ي'; }
  totalNet(): number { return this.items().reduce((s, i) => s + Number(i.netSalary || 0), 0); }
  paidCount(): number { return this.items().filter(i => i.isPaid).length; }
}
