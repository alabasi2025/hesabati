import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * مكوّن الحالة الفارغة المشترك
 * الاستخدام: <app-empty-state icon="group" title="لا يوجد موظفين" (addClick)="openForm()" />
 */
@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="empty-state">
      <span class="material-icons empty-icon">{{ icon() }}</span>
      <h3 class="empty-title">{{ title() }}</h3>
      @if (subtitle()) {
        <p class="empty-subtitle">{{ subtitle() }}</p>
      }
      @if (actionLabel()) {
        <button class="btn-add" (click)="addClick.emit()">
          <span class="material-icons">add</span>
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 4rem 1rem;
      text-align: center;
      gap: 0.75rem;
      color: var(--text-secondary, #888);
    }
    .empty-icon {
      font-size: 4rem;
      opacity: 0.35;
      margin-bottom: 0.5rem;
    }
    .empty-title {
      font-size: 1.15rem;
      font-weight: 600;
      margin: 0;
      color: var(--text-primary, #333);
    }
    .empty-subtitle {
      font-size: 0.9rem;
      margin: 0;
      max-width: 320px;
    }
    .btn-add {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      margin-top: 0.5rem;
      padding: 0.55rem 1.25rem;
      background: var(--primary, #1976d2);
      color: #fff;
      border: none;
      border-radius: 8px;
      font-size: 0.95rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-add:hover { background: var(--primary-dark, #1565c0); }
    .btn-add .material-icons { font-size: 1.1rem; }
  `],
})
export class EmptyStateComponent {
  icon        = input<string>('inbox');
  title       = input<string>('لا توجد بيانات');
  subtitle    = input<string>('');
  actionLabel = input<string>('');
  addClick    = output<void>();
}
