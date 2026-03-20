import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { BasePageComponent } from '../../shared/base-page.component';
import { LoadingStateComponent } from '../../shared/components/loading-state/loading-state.component';
import { EmptyStateComponent } from '../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-forensic-analysis',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './forensic-analysis.html',
  styleUrl: './forensic-analysis.scss',
})
export class ForensicAnalysisComponent extends BasePageComponent {
  private readonly api   = inject(ApiService);
  private readonly toast = inject(ToastService);

  activeTab = 'summary';
  loading   = signal(false);

  tabs = [
    { key: 'summary',            label: 'الملخص العام',          icon: 'security' },
    { key: 'suspicious',         label: 'المعاملات المشبوهة',    icon: 'warning' },
    { key: 'duplicates',         label: 'الإدخالات المكررة',     icon: 'content_copy' },
    { key: 'large-transactions', label: 'المعاملات الكبيرة',     icon: 'trending_up' },
    { key: 'unreviewed',         label: 'غير المراجعة',          icon: 'pending_actions' },
  ];

  dateFrom = new Date(new Date().getFullYear(), 0, 1).toISOString().split('T')[0];
  dateTo   = new Date().toISOString().split('T')[0];

  summary:           any = null;
  suspicious:        any[] = [];
  duplicates:        any[] = [];
  largeTransactions: any[] = [];
  unreviewed:        any[] = [];

  protected onBizIdChange(_bizId: number): void {
    this.loadTab();
  }

  switchTab(key: string): void {
    this.activeTab = key;
    this.loadTab();
  }

  async loadTab(): Promise<void> {
    if (!this.bizId) return;
    this.loading.set(true);
    try {
      const df = this.dateFrom || undefined;
      const dt = this.dateTo   || undefined;
      switch (this.activeTab) {
        case 'summary':
          this.summary = await this.api.getForensicSummary(this.bizId, df, dt);
          break;
        case 'suspicious':
          this.suspicious = await this.api.getForensicSuspicious(this.bizId, df, dt);
          break;
        case 'duplicates':
          this.duplicates = await this.api.getForensicDuplicates(this.bizId, df, dt);
          break;
        case 'large-transactions':
          this.largeTransactions = await this.api.getForensicLargeTransactions(this.bizId, df, dt);
          break;
        case 'unreviewed':
          this.unreviewed = await this.api.getForensicUnreviewed(this.bizId, df, dt);
          break;
      }
    } catch (e) {
      this.toast.error('حدث خطأ أثناء تحميل بيانات التحليل');
      console.error(e);
    } finally {
      this.loading.set(false);
    }
  }

  formatAmount(v: number): string {
    return new Intl.NumberFormat('ar-YE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v || 0);
  }

  formatDate(d: string): string {
    if (!d) return '';
    try { return new Date(d).toLocaleDateString('ar-YE'); } catch { return d; }
  }

  voucherTypeLabel(t: string): string {
    const map: Record<string, string> = {
      receipt:          'قبض',
      payment:          'صرف',
      transfer:         'تحويل',
      journal:          'قيد يومية',
      collection:       'تحصيل',
      delivery:         'تسليم',
      supply_invoice:   'فاتورة مشتريات',
      supply_order:     'أمر توريد',
      dispatch:         'إرسالية',
      transfer_out:     'تحويل خارجي',
      receive_transfer: 'استلام تحويل',
    };
    return map[t] || t;
  }

  riskLevelLabel(level: string): string {
    const map: Record<string, string> = {
      critical: 'حرج',
      high:     'عالي',
      medium:   'متوسط',
      low:      'منخفض',
    };
    return map[level] || level;
  }

  riskLevelClass(level: string): string {
    const map: Record<string, string> = {
      critical: 'risk-critical',
      high:     'risk-high',
      medium:   'risk-medium',
      low:      'risk-low',
    };
    return map[level] || '';
  }

  printReport(): void {
    const title = this.tabs.find(t => t.key === this.activeTab)?.label || 'التحليل الجنائي';
    const content = document.querySelector('.print-area')?.innerHTML || '';
    const win = window.open('', '_blank');
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; direction: rtl; margin: 20px; color: #1e293b; }
          h2 { color: #0f172a; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
          table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
          th { background: #1e40af; color: #fff; padding: 8px 12px; text-align: right; }
          td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
          tr:nth-child(even) td { background: #f8fafc; }
          .risk-critical { color: #dc2626; font-weight: bold; }
          .risk-high     { color: #ea580c; font-weight: bold; }
          .risk-medium   { color: #d97706; }
          .risk-low      { color: #16a34a; }
          .stat-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin: 16px 0; }
          .stat-card { border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; text-align: center; }
          .stat-value { font-size: 24px; font-weight: bold; color: #1e40af; }
          .stat-label { font-size: 13px; color: #64748b; margin-top: 4px; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <h2>📊 ${title} — التحليل الجنائي المالي</h2>
        <p style="color:#64748b">الفترة: ${this.dateFrom} إلى ${this.dateTo}</p>
        ${content}
        <p style="margin-top:24px;font-size:12px;color:#94a3b8">تقرير تحليل جنائي • ${new Date().toLocaleString('ar-YE')}</p>
      </body>
      </html>
    `);
    win.document.close();
    win.print();
  }
}
