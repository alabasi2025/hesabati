import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-reports-advanced',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-advanced.html',
  styleUrl: './reports-advanced.scss',
})
export class ReportsAdvancedComponent implements OnInit {
  private readonly api = inject(ApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  readonly biz = inject(BusinessService);

  bizId = 0;
  activeTab = 'profit-loss';
  loading = false;
  tabs = [
    { key: 'profit-loss', label: 'أرباح وخسائر', icon: 'trending_up' },
    { key: 'statement', label: 'كشف حساب', icon: 'receipt' },
    { key: 'daily', label: 'ملخص يومي', icon: 'today' },
    { key: 'trial-balance', label: 'ميزان المراجعة', icon: 'balance' },
  ];
  dateFrom = new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  dateTo = new Date().toISOString().split('T')[0];
  dailyDate = new Date().toISOString().split('T')[0];
  selectedAccountId = '';
  accounts: any[] = [];
  funds: any[] = [];
  allAccountsAndFunds: any[] = [];
  profitLoss: any = null;
  statement: any = null;
  dailySummary: any = null;
  trialBalance: any = null;

  ngOnInit() {
    this.bizId = Number(this.route.parent?.snapshot.paramMap.get('bizId'));
    this.loadAccounts();
    this.loadTab();
  }

  async loadAccounts() {
    try {
      const [accs, fds] = await Promise.all([
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
      ]);
      this.accounts = accs;
      this.funds = fds;
      // دمج الحسابات والصناديق في قائمة واحدة لكشف الحساب
      this.allAccountsAndFunds = [
        ...accs.map((a: any) => ({ ...a, displayName: a.name, sourceType: 'account' })),
        ...fds.map((f: any) => ({ ...f, displayName: `${f.name} (صندوق)`, sourceType: 'fund' })),
      ];
      if (this.allAccountsAndFunds.length > 0) this.selectedAccountId = String(this.allAccountsAndFunds[0].id);
    } catch (e) {
      console.error(e);
    }
  }

  async loadTab() {
    this.loading = true;
    try {
      switch (this.activeTab) {
        case 'profit-loss':
          this.profitLoss = await this.api.getProfitLossReport(this.bizId, this.dateFrom, this.dateTo);
          break;
        case 'statement':
          if (this.selectedAccountId)
            this.statement = await this.api.getAccountStatement(this.bizId, Number(this.selectedAccountId), this.dateFrom, this.dateTo);
          break;
        case 'daily':
          this.dailySummary = await this.api.getDailySummary(this.bizId, this.dailyDate);
          break;
        case 'trial-balance':
          this.trialBalance = await this.api.getTrialBalance(this.bizId, this.dateFrom, this.dateTo);
          break;
      }
    } catch (e: unknown) {
      this.toast.error('حدث خطأ في تحميل التقرير');
      console.error(e);
    }
    this.loading = false;
  }

  getSelectedAccountName(): string {
    const item = this.allAccountsAndFunds.find(a => String(a.id) === this.selectedAccountId);
    return item?.displayName || item?.name || '';
  }

  getAccountTypeLabel(type: string): string {
    const map: Record<string, string> = {
      bank: 'بنك', exchange: 'صراف', e_wallet: 'محفظة إلكترونية',
      fund: 'صندوق', billing: 'فوترة', collection: 'تحصيل',
    };
    return map[type] || type;
  }

  printReport() {
    const tabLabel = this.tabs.find(t => t.key === this.activeTab)?.label || 'تقرير';
    const businessName = this.biz.currentBusinessName() || 'حساباتي';
    const printContent = document.querySelector('.print-area');
    if (!printContent) {
      this.toast.error('لا توجد بيانات للطباعة');
      return;
    }

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      this.toast.error('يرجى السماح بالنوافذ المنبثقة للطباعة');
      return;
    }

    printWindow.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${tabLabel} - ${businessName}</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Tajawal', sans-serif; direction: rtl; padding: 20px; color: #1e293b; }
          .print-header {
            text-align: center; margin-bottom: 24px; padding-bottom: 16px;
            border-bottom: 3px double #10b981;
          }
          .print-header h1 { font-size: 22px; font-weight: 900; color: #10b981; margin-bottom: 4px; }
          .print-header h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
          .print-header .date-range { font-size: 13px; color: #64748b; font-weight: 600; }
          .print-summary {
            display: flex; gap: 16px; margin-bottom: 20px; flex-wrap: wrap;
          }
          .summary-item {
            flex: 1; min-width: 120px; padding: 12px; border-radius: 10px;
            border: 1px solid #e2e8f0; text-align: center;
          }
          .summary-item .label { font-size: 11px; color: #64748b; font-weight: 700; }
          .summary-item .value { font-size: 18px; font-weight: 900; color: #1e293b; }
          .summary-item.green .value { color: #22c55e; }
          .summary-item.red .value { color: #ef4444; }
          .summary-item.blue .value { color: #3b82f6; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th, td { padding: 8px 12px; font-size: 12px; text-align: right; border: 1px solid #e2e8f0; }
          th { background: #f8fafc; font-weight: 800; color: #475569; font-size: 11px; }
          tbody tr:nth-child(even) { background: #fafafa; }
          .debit { color: #22c55e; font-weight: 700; font-family: monospace; }
          .credit { color: #ef4444; font-weight: 700; font-family: monospace; }
          .balance { font-weight: 800; font-family: monospace; }
          .balance.positive { color: #3b82f6; }
          .balance.negative { color: #f59e0b; }
          .footer { text-align: center; margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; }
          .type-badge { font-size: 10px; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
          .type-badge.receipt { background: #dcfce7; color: #16a34a; }
          .type-badge.payment { background: #fef2f2; color: #dc2626; }
          .totals-row { font-weight: 900; background: #f0fdf4 !important; }
          @media print { body { padding: 10px; } }
        </style>
      </head>
      <body>
        <div class="print-header">
          <h1>${businessName}</h1>
          <h2>${tabLabel}</h2>
          <div class="date-range">${this.getDateRangeText()}</div>
        </div>
        ${this.getPrintContent()}
        <div class="footer">
          تم الطباعة بواسطة نظام حساباتي | ${new Date().toLocaleDateString('ar-SA')} - ${new Date().toLocaleTimeString('ar-SA')}
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    setTimeout(() => { printWindow.print(); }, 500);
  }

  private getDateRangeText(): string {
    if (this.activeTab === 'daily') {
      return `التاريخ: ${this.dailyDate}`;
    }
    return `من ${this.dateFrom} إلى ${this.dateTo}`;
  }

  private getPrintContent(): string {
    switch (this.activeTab) {
      case 'profit-loss': return this.getProfitLossPrint();
      case 'statement': return this.getStatementPrint();
      case 'daily': return this.getDailyPrint();
      case 'trial-balance': return this.getTrialBalancePrint();
      default: return '';
    }
  }

  private getProfitLossPrint(): string {
    if (!this.profitLoss) return '<p>لا توجد بيانات</p>';
    const s = this.profitLoss.summary;
    let html = `
      <div class="print-summary">
        <div class="summary-item green"><div class="label">الإيرادات</div><div class="value">${Number(s.total_income).toLocaleString()}</div></div>
        <div class="summary-item red"><div class="label">المصروفات</div><div class="value">${Number(s.total_expenses).toLocaleString()}</div></div>
        <div class="summary-item blue"><div class="label">صافي الربح</div><div class="value">${Number(s.net_profit).toLocaleString()}</div></div>
        <div class="summary-item"><div class="label">عدد العمليات</div><div class="value">${s.total_operations}</div></div>
      </div>
    `;
    if (this.profitLoss.byCategory?.length) {
      html += `<table><thead><tr><th>التصنيف</th><th>النوع</th><th>المجموع</th><th>العدد</th></tr></thead><tbody>`;
      for (const c of this.profitLoss.byCategory) {
        html += `<tr><td>${c.category}</td><td><span class="type-badge ${c.voucher_type === 'receipt' ? 'receipt' : 'payment'}">${c.voucher_type === 'receipt' ? 'إيراد' : 'مصروف'}</span></td><td>${Number(c.total).toLocaleString()}</td><td>${c.count}</td></tr>`;
      }
      html += `</tbody></table>`;
    }
    return html;
  }

  private getStatementPrint(): string {
    if (!this.statement) return '<p>لا توجد بيانات</p>';
    let html = `<p style="margin-bottom:12px;font-weight:800;">الحساب: ${this.statement.account?.name || this.getSelectedAccountName()}</p>`;
    if (this.statement.balances?.length) {
      html += `<div class="print-summary">`;
      for (const b of this.statement.balances) {
        html += `<div class="summary-item ${b.balance >= 0 ? 'blue' : 'red'}"><div class="label">${b.currencyCode}</div><div class="value">${Number(b.balance).toLocaleString()}</div></div>`;
      }
      html += `</div>`;
    }
    html += `<table><thead><tr><th>التاريخ</th><th>المرجع</th><th>البيان</th><th>مدين</th><th>دائن</th><th>الرصيد</th></tr></thead><tbody>`;
    for (const e of (this.statement.entries || [])) {
      html += `<tr>
        <td>${e.entry_date}</td>
        <td>${e.entry_number}</td>
        <td>${e.entry_description || e.line_description || ''}</td>
        <td class="debit">${e.line_type === 'debit' ? Number(e.amount).toLocaleString() : '-'}</td>
        <td class="credit">${e.line_type === 'credit' ? Number(e.amount).toLocaleString() : '-'}</td>
        <td class="balance ${(e.runningBalance || 0) >= 0 ? 'positive' : 'negative'}">${Number(e.runningBalance || 0).toLocaleString()}</td>
      </tr>`;
    }
    html += `</tbody></table>`;
    return html;
  }

  private getDailyPrint(): string {
    if (!this.dailySummary) return '<p>لا توجد بيانات</p>';
    const s = this.dailySummary.summary;
    let html = `
      <div class="print-summary">
        <div class="summary-item green"><div class="label">التحصيل</div><div class="value">${Number(s.receipts).toLocaleString()}</div></div>
        <div class="summary-item red"><div class="label">الصرف</div><div class="value">${Number(s.payments).toLocaleString()}</div></div>
        <div class="summary-item"><div class="label">عدد العمليات</div><div class="value">${s.operations_count}</div></div>
      </div>
    `;
    if (this.dailySummary.byOperationType?.length) {
      html += `<table><thead><tr><th>نوع العملية</th><th>النوع</th><th>المجموع</th><th>العدد</th></tr></thead><tbody>`;
      for (const o of this.dailySummary.byOperationType) {
        html += `<tr><td>${o.name}</td><td><span class="type-badge ${o.voucher_type === 'receipt' ? 'receipt' : 'payment'}">${o.voucher_type === 'receipt' ? 'تحصيل' : 'صرف'}</span></td><td>${Number(o.total).toLocaleString()}</td><td>${o.count}</td></tr>`;
      }
      html += `</tbody></table>`;
    }
    return html;
  }

  private getTrialBalancePrint(): string {
    if (!this.trialBalance) return '<p>لا توجد بيانات</p>';
    const t = this.trialBalance.totals;
    let html = `
      <div class="print-summary">
        <div class="summary-item green"><div class="label">إجمالي المدين</div><div class="value">${Number(t.totalDebit).toLocaleString()}</div></div>
        <div class="summary-item red"><div class="label">إجمالي الدائن</div><div class="value">${Number(t.totalCredit).toLocaleString()}</div></div>
        <div class="summary-item ${t.isBalanced ? 'blue' : 'red'}"><div class="label">الحالة</div><div class="value">${t.isBalanced ? 'متوازن' : 'غير متوازن'}</div></div>
      </div>
    `;
    html += `<table><thead><tr><th>الحساب</th><th>النوع</th><th>مدين</th><th>دائن</th><th>الرصيد</th></tr></thead><tbody>`;
    for (const a of (this.trialBalance.accounts || [])) {
      html += `<tr>
        <td>${a.account_name}</td>
        <td>${this.getAccountTypeLabel(a.account_type)}</td>
        <td class="debit">${Number(a.total_debit).toLocaleString()}</td>
        <td class="credit">${Number(a.total_credit).toLocaleString()}</td>
        <td class="balance ${a.balance >= 0 ? 'positive' : 'negative'}">${Number(a.balance).toLocaleString()}</td>
      </tr>`;
    }
    html += `<tr class="totals-row">
      <td colspan="2" style="font-weight:900;">الإجمالي</td>
      <td class="debit" style="font-weight:900;">${Number(t.totalDebit).toLocaleString()}</td>
      <td class="credit" style="font-weight:900;">${Number(t.totalCredit).toLocaleString()}</td>
      <td class="balance" style="font-weight:900;">${Number(t.totalDebit - t.totalCredit).toLocaleString()}</td>
    </tr>`;
    html += `</tbody></table>`;
    return html;
  }
}
