import { DecimalPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingStateComponent } from './components/loading-state/loading-state.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';

/**
 * الاستيرادات المشتركة لجميع صفحات CRUD.
 * استخدم: imports: [...PAGE_IMPORTS, ...أي مكوّنات إضافية]
 */
export const PAGE_IMPORTS = [
  FormsModule,
  DecimalPipe,
  DatePipe,
  LoadingStateComponent,
  EmptyStateComponent,
  StatusBadgeComponent,
] as const;
