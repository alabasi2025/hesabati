import { Component, input } from '@angular/core';

/**
 * مكوّن حالة التحميل — تصميم Valex
 * الاستخدام: <app-loading-state [loading]="loading()" />
 */
@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [],
  template: `
    @if (loading()) {
      <div class="valex-loading-state">
        <div class="valex-spinner spinner-lg"></div>
        @if (message()) {
          <p class="loading-text">{{ message() }}</p>
        }
      </div>
    }
  `,
  styles: [`
    :host { display: contents; }
    .valex-loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3.5rem 1rem;
      gap: 1rem;
    }
    .loading-text {
      font-size: 0.875rem;
      color: var(--color-textmuted);
      margin: 0;
      font-family: var(--font-primary);
    }
  `],
})
export class LoadingStateComponent {
  loading = input<boolean>(false);
  message = input<string>('جاري التحميل...');
}
