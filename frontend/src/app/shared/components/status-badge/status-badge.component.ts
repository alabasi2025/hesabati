import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type StatusType =
  | 'unreviewed' | 'reviewed'
  | 'active' | 'inactive' | 'suspended'
  | 'open' | 'in_progress' | 'completed' | 'disputed'
  | 'pending' | 'resolved' | 'written_off'
  | 'draft' | 'confirmed' | 'partial' | 'cancelled'
  | string;

const STATUS_CONFIG: Record<string, { label: string; cls: string }> = {
  unreviewed: { label: 'غير مراجع',  cls: 'warning' },
  reviewed:   { label: 'مراجع',      cls: 'success' },
  active:     { label: 'نشط',        cls: 'success' },
  inactive:   { label: 'غير نشط',    cls: 'neutral' },
  suspended:  { label: 'موقوف',      cls: 'danger'  },
  open:       { label: 'مفتوح',      cls: 'info'    },
  in_progress:{ label: 'جارٍ',       cls: 'warning' },
  completed:  { label: 'مكتمل',      cls: 'success' },
  disputed:   { label: 'متنازع عليه',cls: 'danger'  },
  pending:    { label: 'معلق',       cls: 'warning' },
  resolved:   { label: 'محلول',      cls: 'success' },
  written_off:{ label: 'مشطوب',      cls: 'neutral' },
  draft:      { label: 'مسودة',      cls: 'neutral' },
  confirmed:  { label: 'مؤكد',       cls: 'info'    },
  partial:    { label: 'جزئي',       cls: 'warning' },
  cancelled:  { label: 'ملغى',       cls: 'danger'  },
};

/**
 * مكوّن شارة الحالة المشترك
 * الاستخدام: <app-status-badge [status]="item.status" />
 */
@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="status-badge status-{{ config().cls }}">
      {{ config().label }}
    </span>
  `,
  styles: [`
    .status-badge {
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.65rem;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 600;
      white-space: nowrap;
    }
    .status-success { background: #e8f5e9; color: #2e7d32; }
    .status-warning { background: #fff8e1; color: #f57f17; }
    .status-danger  { background: #fce4ec; color: #c62828; }
    .status-info    { background: #e3f2fd; color: #1565c0; }
    .status-neutral { background: #f5f5f5; color: #616161; }
  `],
})
export class StatusBadgeComponent {
  status = input<StatusType>('');

  config() {
    const s = this.status();
    return STATUS_CONFIG[s] ?? { label: s, cls: 'neutral' };
  }
}
