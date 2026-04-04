import { Component, inject, signal } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { PAGE_IMPORTS } from '../../shared/page-imports';

@Component({
  selector: 'app-intermediary-accounts',
  standalone: true,
  imports: [...PAGE_IMPORTS],
  templateUrl: './intermediary-accounts.html',
  styleUrl: './intermediary-accounts.scss',
})
export class IntermediaryAccountsComponent extends BasePageComponent {
  private readonly api = inject(ApiService);
  private readonly toast = inject(ToastService);

  accounts = signal<any[]>([]);
  loading = signal(true);

  protected override onBizIdChange(_bizId: number): void {
    this.load();
  }

  async load() {
    this.loading.set(true);
    try {
      const intermediaryAccounts = await this.api.getIntermediaryAccounts(this.bizId);
      this.accounts.set(intermediaryAccounts || []);
    } catch (e: unknown) {
      console.error(e);
      this.toast.error(e instanceof Error ? e.message : 'حدث خطأ أثناء تحميل الحسابات الوسيطة');
    }
    this.loading.set(false);
  }

  getBalanceDisplay(acc: any): string {
    if (!acc.balances || acc.balances.length === 0) return '0';
    return acc.balances.map((b: any) => `${Number(b.balance).toLocaleString('en')} ${b.currencySymbol || ''}`).join(' | ');
  }
}
