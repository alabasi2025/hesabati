import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * مكوّن رأس الصفحة — تصميم Valex
 * الاستخدام:
 * <app-page-header title="الموظفين" icon="people" [breadcrumb]="['الرئيسية','الأشخاص','الموظفين']">
 *   <button class="valex-btn valex-btn-primary valex-btn-sm">إضافة</button>
 * </app-page-header>
 */
@Component({
  selector: 'app-page-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
})
export class PageHeaderComponent {
  title      = input<string>('');
  icon       = input<string>('');
  breadcrumb = input<string[]>([]);
}
