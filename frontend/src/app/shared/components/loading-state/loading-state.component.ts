import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * مكوّن حالة التحميل المشترك
 * الاستخدام: <app-loading-state [loading]="loading()" />
 */
@Component({
  selector: 'app-loading-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loading()) {
      <div class="loading-state">
        <div class="loading-spinner">
          <span class="material-icons spinning">sync</span>
        </div>
        @if (message()) {
          <p class="loading-message">{{ message() }}</p>
        }
      </div>
    }
  `,
  styles: [`
    .loading-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem 1rem;
      color: var(--text-secondary, #666);
      gap: 0.75rem;
    }
    .loading-spinner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .spinning {
      font-size: 2.5rem;
      color: var(--primary, #1976d2);
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    .loading-message {
      font-size: 0.95rem;
      margin: 0;
    }
  `],
})
export class LoadingStateComponent {
  loading = input<boolean>(false);
  message = input<string>('جاري التحميل...');
}
