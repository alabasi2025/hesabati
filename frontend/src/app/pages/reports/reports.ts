import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
})
export class ReportsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  biz = inject(BusinessService);

  bizId = 0;
  loading = signal(true);
  activeReport = signal<string>('overview');

  // بيانات التقارير
  stats = signal<any>({});
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);
  employees = signal<any[]>([]);
  vouchers = signal<any[]>([]);
  journalEntries = signal<any[]>([]);

  // فلاتر
  dateFrom = signal('');
  dateTo = signal('');

  reportTypes = [
    { id: 'overview', label: 'نظرة عامة', icon: 'dashboard' },
    { id: 'accounts', label: 'الحسابات', icon: 'account_balance' },
    { id: 'funds', label: 'الصناديق', icon: 'savings' },
    { id: 'employees', label: 'الرواتب', icon: 'groups' },
    { id: 'vouchers', label: 'السندات', icon: 'receipt_long' },
    { id: 'journal', label: 'القيود', icon: 'menu_book' },
  ];

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const [accs, fds, emps, vouchers, journal] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getEmployees(this.bizId),
        this.api.getVouchers(this.bizId),
        this.api.getJournalEntries(this.bizId),
      ]);
      this.accounts.set(accs);
      this.funds.set(fds);
      this.employees.set(emps);
      this.vouchers.set(vouchers);
      this.journalEntries.set(journal);

      this.stats.set({
        totalAccounts: accs.length,
        totalFunds: fds.length,
        totalEmployees: emps.length,
        totalVouchers: vouchers.length,
        totalJournal: journal.length,
        totalSalaries: emps.reduce((s: number, e: any) => s + Number(e.salary || 0), 0),
        receiptVouchers: vouchers.filter((v: any) => v.voucherType === 'receipt').length,
        paymentVouchers: vouchers.filter((v: any) => v.voucherType === 'payment').length,
        totalReceipts: vouchers.filter((v: any) => v.voucherType === 'receipt').reduce((s: number, v: any) => s + Number(v.amount || 0), 0),
        totalPayments: vouchers.filter((v: any) => v.voucherType === 'payment').reduce((s: number, v: any) => s + Number(v.amount || 0), 0),
      });
    } catch (e) { console.error(e); }
    this.loading.set(false);
  }

  setReport(id: string) { this.activeReport.set(id); }

  // تجميع الحسابات حسب النوع
  accountsByType() {
    const groups: Record<string, any[]> = {};
    for (const a of this.accounts()) {
      const t = a.accountType || 'other';
      if (!groups[t]) groups[t] = [];
      groups[t].push(a);
    }
    return Object.entries(groups).map(([type, items]) => ({ type, items, count: items.length }));
  }

  // تجميع الصناديق حسب النوع
  fundsByType() {
    const groups: Record<string, any[]> = {};
    for (const f of this.funds()) {
      const t = f.fundType || 'other';
      if (!groups[t]) groups[t] = [];
      groups[t].push(f);
    }
    return Object.entries(groups).map(([type, items]) => ({ type, items, count: items.length }));
  }

  // تجميع الموظفين حسب المحطة
  employeesByStation() {
    const groups: Record<string, any[]> = {};
    for (const e of this.employees()) {
      const s = e.stationName || 'الإدارة';
      if (!groups[s]) groups[s] = [];
      groups[s].push(e);
    }
    return Object.entries(groups).map(([station, items]) => ({
      station, items, count: items.length,
      totalSalary: items.reduce((s: number, e: any) => s + Number(e.salary || 0), 0),
    }));
  }

  getAccountTypeLabel(t: string): string {
    const map: Record<string, string> = {
      fund: 'صندوق', bank: 'بنك', e_wallet: 'محفظة', exchange: 'صراف',
      accounting: 'محاسبي', intermediary: 'وسيط', cash: 'نقدي', custody: 'عهدة', service: 'خدمات',
    };
    return map[t] || t;
  }

  getFundTypeLabel(t: string): string {
    const map: Record<string, string> = {
      collection: 'تحصيل', salary_advance: 'سلف رواتب', custody: 'عهدة',
      safe: 'خزنة', expense: 'مصروفات', deposit: 'إيداع',
    };
    return map[t] || t;
  }
}
