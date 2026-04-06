import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

/**
 * مكوّن شريط الفلترة — تصميم Valex
 * الاستخدام:
 * <app-filter-bar searchPlaceholder="ابحث عن موظف..." (searchChange)="onSearch($event)">
 *   <!-- فلاتر إضافية -->
 *   <select ...>...</select>
 * </app-filter-bar>
 */
@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent {
  searchPlaceholder = input<string>('بحث...');

  searchChange = output<string>();

  searchValue = '';

  onSearch(value: string) {
    this.searchValue = value;
    this.searchChange.emit(value);
  }

  clearSearch() {
    this.searchValue = '';
    this.searchChange.emit('');
  }
}
