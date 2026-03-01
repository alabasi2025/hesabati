import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-reports-advanced',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-advanced.html',
  styleUrl: './reports-advanced.scss',
})
export class ReportsAdvancedComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToastService);

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
    } catch (e: any) {
      this.toast.error('حدث خطأ في تحميل التقرير');
      console.error(e);
    }
    this.loading = false;
  }
}
