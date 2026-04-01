import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';

@Component({
  selector: 'app-fiscal-periods',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fiscal-periods.html',
  styleUrl: './fiscal-periods.scss',
})
export class FiscalPeriodsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  fiscalYears: any[] = [];
  selectedYear: any = null;
  periods: any[] = [];
  showCreateForm = false;
  newYear = new Date().getFullYear();
  showBulkForm = false;
  bulkStartYear = new Date().getFullYear();
  bulkEndYear = new Date().getFullYear();

  protected onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.fiscalYears = await this.api.getFiscalYears(this.bizId);
    if (this.selectedYear) {
      await this.loadPeriods(this.selectedYear);
    } else if (this.fiscalYears.length > 0) {
      await this.loadPeriods(this.fiscalYears[0]);
    }
  }

  async loadPeriods(fy: any) {
    this.selectedYear = fy;
    this.periods = await this.api.getFiscalPeriods(this.bizId, fy.id);
  }

  get openPeriodsCount() { return this.periods.filter(p => !p.isClosed).length; }
  get closedPeriodsCount() { return this.periods.filter(p => p.isClosed).length; }

  getMonthName(month: number): string {
    const names = ['', 'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    return names[month] || '';
  }

  async createYear() {
    try {
      await this.api.createFiscalYear(this.bizId, { year: this.newYear });
      this.toast.success(`تم إنشاء السنة المالية ${this.newYear}`);
      this.showCreateForm = false;
      this.load();
    } catch (e: any) {
      this.toast.error(e?.error?.error || 'حدث خطأ');
    }
  }

  async createBulkYears() {
    try {
      const res = await this.api.createFiscalYearsBulk(this.bizId, { startYear: this.bulkStartYear, endYear: this.bulkEndYear });
      this.toast.success(`تم إنشاء ${res.created} سنة مالية`);
      this.showBulkForm = false;
      this.load();
    } catch (e: any) {
      this.toast.error(e?.error?.error || 'حدث خطأ');
    }
  }

  async closePeriod(period: any) {
    if (!confirm(`هل تريد إقفال فترة ${this.getMonthName(period.month)} ${this.selectedYear?.year}؟`)) return;
    try {
      await this.api.closeFiscalPeriod(this.bizId, period.id);
      this.toast.success(`تم إقفال فترة ${this.getMonthName(period.month)}`);
      this.loadPeriods(this.selectedYear);
    } catch (e: any) {
      this.toast.error(e?.error?.error || 'حدث خطأ');
    }
  }

  async closeYear() {
    if (!this.selectedYear) return;
    if (!confirm(`هل تريد إقفال السنة المالية ${this.selectedYear.year}؟ هذا الإجراء لا يمكن التراجع عنه.`)) return;
    try {
      await this.api.closeFiscalYear(this.bizId, this.selectedYear.id);
      this.toast.success(`تم إقفال السنة المالية ${this.selectedYear.year}`);
      this.load();
    } catch (e: any) {
      this.toast.error(e?.error?.error || 'حدث خطأ');
    }
  }
}
