import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reports-advanced',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 max-w-7xl mx-auto" dir="rtl">
      <h1 class="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <span class="material-icons text-emerald-600">analytics</span>
        التقارير المتقدمة
      </h1>

      <!-- تبويبات -->
      <div class="flex gap-1 mb-6 bg-gray-100 rounded-lg p-1 w-fit">
        <button *ngFor="let t of tabs" (click)="activeTab = t.key; loadTab()" class="px-4 py-2 rounded-lg text-sm font-medium transition-all"
          [class]="activeTab === t.key ? 'bg-white text-emerald-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'">
          <span class="material-icons text-sm align-middle ml-1">{{t.icon}}</span>{{t.label}}
        </button>
      </div>

      <!-- فلاتر التاريخ -->
      <div class="bg-white rounded-xl shadow-sm border p-4 mb-6 flex flex-wrap gap-3 items-end" *ngIf="activeTab !== 'daily'">
        <div>
          <label class="text-xs text-gray-600 block mb-1">من تاريخ</label>
          <input type="date" [(ngModel)]="dateFrom" class="border rounded-lg px-3 py-2">
        </div>
        <div>
          <label class="text-xs text-gray-600 block mb-1">إلى تاريخ</label>
          <input type="date" [(ngModel)]="dateTo" class="border rounded-lg px-3 py-2">
        </div>
        <div *ngIf="activeTab === 'statement'">
          <label class="text-xs text-gray-600 block mb-1">الحساب</label>
          <select [(ngModel)]="selectedAccountId" class="border rounded-lg px-3 py-2 w-56">
            <option *ngFor="let a of accounts" [value]="a.id">{{a.name}}</option>
          </select>
        </div>
        <button (click)="loadTab()" class="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700">عرض</button>
      </div>

      <!-- فلتر يومي -->
      <div class="bg-white rounded-xl shadow-sm border p-4 mb-6 flex gap-3 items-end" *ngIf="activeTab === 'daily'">
        <div>
          <label class="text-xs text-gray-600 block mb-1">التاريخ</label>
          <input type="date" [(ngModel)]="dailyDate" class="border rounded-lg px-3 py-2">
        </div>
        <button (click)="loadTab()" class="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700">عرض</button>
      </div>

      <!-- تقرير الأرباح والخسائر -->
      <div *ngIf="activeTab === 'profit-loss' && profitLoss" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-green-50 rounded-xl p-5 border border-green-100">
            <div class="text-sm text-green-600">الإيرادات</div>
            <div class="text-2xl font-bold text-green-700 mt-1">{{profitLoss.summary.total_income | number:'1.0-0'}}</div>
          </div>
          <div class="bg-red-50 rounded-xl p-5 border border-red-100">
            <div class="text-sm text-red-600">المصروفات</div>
            <div class="text-2xl font-bold text-red-700 mt-1">{{profitLoss.summary.total_expenses | number:'1.0-0'}}</div>
          </div>
          <div class="rounded-xl p-5 border" [class]="profitLoss.summary.net_profit >= 0 ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'">
            <div class="text-sm" [class]="profitLoss.summary.net_profit >= 0 ? 'text-blue-600' : 'text-orange-600'">صافي الربح</div>
            <div class="text-2xl font-bold mt-1" [class]="profitLoss.summary.net_profit >= 0 ? 'text-blue-700' : 'text-orange-700'">{{profitLoss.summary.net_profit | number:'1.0-0'}}</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div class="text-sm text-gray-600">عدد العمليات</div>
            <div class="text-2xl font-bold text-gray-700 mt-1">{{profitLoss.summary.total_operations}}</div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden" *ngIf="profitLoss.byCategory?.length">
          <table class="w-full">
            <thead class="bg-gray-50 border-b"><tr>
              <th class="text-right px-4 py-3 text-sm">التصنيف</th><th class="text-right px-4 py-3 text-sm">النوع</th>
              <th class="text-right px-4 py-3 text-sm">المجموع</th><th class="text-right px-4 py-3 text-sm">العدد</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let c of profitLoss.byCategory" class="border-b">
                <td class="px-4 py-3 text-sm">{{c.category}}</td>
                <td class="px-4 py-3 text-sm"><span class="px-2 py-0.5 rounded text-xs" [class]="c.voucher_type === 'receipt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">{{c.voucher_type === 'receipt' ? 'إيراد' : 'مصروف'}}</span></td>
                <td class="px-4 py-3 text-sm font-mono font-bold">{{c.total | number:'1.0-0'}}</td>
                <td class="px-4 py-3 text-sm">{{c.count}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- كشف حساب -->
      <div *ngIf="activeTab === 'statement' && statement" class="space-y-4">
        <div class="bg-blue-50 rounded-xl p-4 border border-blue-100 flex items-center justify-between">
          <div>
            <span class="text-sm text-blue-600">الحساب:</span>
            <span class="font-bold text-blue-800 mr-2">{{statement.account?.name}}</span>
          </div>
          <div class="text-sm text-blue-600">عدد الحركات: <span class="font-bold">{{statement.totalEntries}}</span></div>
        </div>
        <div class="flex gap-3">
          <div *ngFor="let b of statement.balances" class="bg-white rounded-lg p-3 border">
            <span class="text-xs text-gray-500">{{b.currencyCode}}</span>
            <span class="font-bold text-lg mr-2" [class]="b.balance >= 0 ? 'text-green-700' : 'text-red-700'">{{b.balance | number:'1.0-2'}}</span>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50 border-b"><tr>
              <th class="text-right px-4 py-3 text-sm">التاريخ</th><th class="text-right px-4 py-3 text-sm">المرجع</th>
              <th class="text-right px-4 py-3 text-sm">البيان</th><th class="text-right px-4 py-3 text-sm">مدين</th>
              <th class="text-right px-4 py-3 text-sm">دائن</th><th class="text-right px-4 py-3 text-sm">الرصيد</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let e of statement.entries" class="border-b hover:bg-gray-50">
                <td class="px-4 py-2 text-sm">{{e.entry_date}}</td>
                <td class="px-4 py-2 text-sm font-mono text-xs">{{e.entry_number}}</td>
                <td class="px-4 py-2 text-sm">{{e.entry_description || e.line_description}}</td>
                <td class="px-4 py-2 text-sm font-mono" [class]="e.line_type === 'debit' ? 'text-green-700 font-bold' : 'text-gray-300'">{{e.line_type === 'debit' ? (e.amount | number:'1.0-2') : '-'}}</td>
                <td class="px-4 py-2 text-sm font-mono" [class]="e.line_type === 'credit' ? 'text-red-700 font-bold' : 'text-gray-300'">{{e.line_type === 'credit' ? (e.amount | number:'1.0-2') : '-'}}</td>
                <td class="px-4 py-2 text-sm font-mono font-bold" [class]="e.runningBalance >= 0 ? 'text-blue-700' : 'text-red-700'">{{e.runningBalance | number:'1.0-2'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ملخص يومي -->
      <div *ngIf="activeTab === 'daily' && dailySummary" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-green-50 rounded-xl p-5 border border-green-100">
            <div class="text-sm text-green-600">التحصيل</div>
            <div class="text-2xl font-bold text-green-700 mt-1">{{dailySummary.summary.receipts | number:'1.0-0'}}</div>
          </div>
          <div class="bg-red-50 rounded-xl p-5 border border-red-100">
            <div class="text-sm text-red-600">الصرف</div>
            <div class="text-2xl font-bold text-red-700 mt-1">{{dailySummary.summary.payments | number:'1.0-0'}}</div>
          </div>
          <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div class="text-sm text-gray-600">عدد العمليات</div>
            <div class="text-2xl font-bold text-gray-700 mt-1">{{dailySummary.summary.operations_count}}</div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden" *ngIf="dailySummary.byOperationType?.length">
          <table class="w-full">
            <thead class="bg-gray-50 border-b"><tr>
              <th class="text-right px-4 py-3 text-sm">نوع العملية</th><th class="text-right px-4 py-3 text-sm">النوع</th>
              <th class="text-right px-4 py-3 text-sm">المجموع</th><th class="text-right px-4 py-3 text-sm">العدد</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let o of dailySummary.byOperationType" class="border-b">
                <td class="px-4 py-3 text-sm flex items-center gap-1">
                  <span *ngIf="o.icon" class="material-icons text-sm" [style.color]="o.color">{{o.icon}}</span>{{o.name}}
                </td>
                <td class="px-4 py-3 text-sm"><span class="px-2 py-0.5 rounded text-xs" [class]="o.voucher_type === 'receipt' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">{{o.voucher_type === 'receipt' ? 'تحصيل' : 'صرف'}}</span></td>
                <td class="px-4 py-3 text-sm font-mono font-bold">{{o.total | number:'1.0-0'}}</td>
                <td class="px-4 py-3 text-sm">{{o.count}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- ميزان المراجعة -->
      <div *ngIf="activeTab === 'trial-balance' && trialBalance" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-green-50 rounded-xl p-5 border border-green-100">
            <div class="text-sm text-green-600">إجمالي المدين</div>
            <div class="text-2xl font-bold text-green-700 mt-1">{{trialBalance.totals.totalDebit | number:'1.0-2'}}</div>
          </div>
          <div class="bg-red-50 rounded-xl p-5 border border-red-100">
            <div class="text-sm text-red-600">إجمالي الدائن</div>
            <div class="text-2xl font-bold text-red-700 mt-1">{{trialBalance.totals.totalCredit | number:'1.0-2'}}</div>
          </div>
          <div class="rounded-xl p-5 border" [class]="trialBalance.totals.isBalanced ? 'bg-blue-50 border-blue-100' : 'bg-orange-50 border-orange-100'">
            <div class="text-sm" [class]="trialBalance.totals.isBalanced ? 'text-blue-600' : 'text-orange-600'">الحالة</div>
            <div class="text-xl font-bold mt-1" [class]="trialBalance.totals.isBalanced ? 'text-blue-700' : 'text-orange-700'">
              {{trialBalance.totals.isBalanced ? 'متوازن ✓' : 'غير متوازن ✗'}}
            </div>
          </div>
        </div>
        <div class="bg-white rounded-xl shadow-sm border overflow-hidden">
          <table class="w-full">
            <thead class="bg-gray-50 border-b"><tr>
              <th class="text-right px-4 py-3 text-sm">الحساب</th><th class="text-right px-4 py-3 text-sm">النوع</th>
              <th class="text-right px-4 py-3 text-sm">مدين</th><th class="text-right px-4 py-3 text-sm">دائن</th>
              <th class="text-right px-4 py-3 text-sm">الرصيد</th>
            </tr></thead>
            <tbody>
              <tr *ngFor="let a of trialBalance.accounts" class="border-b hover:bg-gray-50">
                <td class="px-4 py-2 text-sm font-medium">{{a.account_name}}</td>
                <td class="px-4 py-2 text-sm text-gray-500">{{a.account_type}}</td>
                <td class="px-4 py-2 text-sm font-mono text-green-700">{{a.total_debit | number:'1.0-2'}}</td>
                <td class="px-4 py-2 text-sm font-mono text-red-700">{{a.total_credit | number:'1.0-2'}}</td>
                <td class="px-4 py-2 text-sm font-mono font-bold" [class]="a.balance >= 0 ? 'text-blue-700' : 'text-orange-700'">{{a.balance | number:'1.0-2'}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- حالة فارغة -->
      <div *ngIf="!loading && ((activeTab === 'profit-loss' && !profitLoss) || (activeTab === 'statement' && !statement) || (activeTab === 'daily' && !dailySummary) || (activeTab === 'trial-balance' && !trialBalance))" class="text-center py-12 text-gray-400">
        اضغط "عرض" لتحميل التقرير
      </div>
      <div *ngIf="loading" class="text-center py-12 text-gray-400">جاري التحميل...</div>
    </div>
  `,
})
export class ReportsAdvancedComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
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
    const accs = await this.api.getAccounts(this.bizId);
    this.accounts = accs;
    if (accs.length > 0) this.selectedAccountId = String(accs[0].id);
  }

  async loadTab() {
    this.loading = true;
    try {
      switch (this.activeTab) {
        case 'profit-loss':
          this.profitLoss = await this.api.getProfitLossReport(this.bizId, this.dateFrom, this.dateTo);
          break;
        case 'statement':
          if (this.selectedAccountId) this.statement = await this.api.getAccountStatement(this.bizId, Number(this.selectedAccountId), this.dateFrom, this.dateTo);
          break;
        case 'daily':
          this.dailySummary = await this.api.getDailySummary(this.bizId, this.dailyDate);
          break;
        case 'trial-balance':
          this.trialBalance = await this.api.getTrialBalance(this.bizId, this.dateFrom, this.dateTo);
          break;
      }
    } catch (e) { console.error(e); }
    this.loading = false;
  }
}
