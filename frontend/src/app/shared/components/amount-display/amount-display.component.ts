import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatAmount } from '../../helpers';

/**
 * مكوّن عرض المبالغ المشترك
 * الاستخدام: <app-amount-display [amount]="item.amount" currency="YER" />
 */
@Component({
  selector: 'app-amount-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="amount-display" [class.negative]="isNegative()">
      {{ formatted() }}
      @if (currency()) {
        <span class="currency-label">{{ currency() }}</span>
      }
    </span>
  `,
  styles: [`
    .amount-display {
      font-variant-numeric: tabular-nums;
      font-weight: 500;
      direction: ltr;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
    }
    .amount-display.negative { color: var(--danger, #c62828); }
    .currency-label {
      font-size: 0.78rem;
      opacity: 0.75;
      font-weight: 400;
    }
  `],
})
export class AmountDisplayComponent {
  amount   = input<number | string | null | undefined>(0);
  currency = input<string>('');
  locale   = input<string>('ar-YE');

  formatted() {
    return formatAmount(this.amount(), this.locale());
  }
  isNegative() {
    const n = Number(this.amount());
    return !isNaN(n) && n < 0;
  }
}
