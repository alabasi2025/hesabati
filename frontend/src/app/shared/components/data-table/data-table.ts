import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'amount' | 'date';
}

/**
 * مكوّن جدول البيانات — تصميم Valex
 * الاستخدام:
 * <app-data-table [columns]="cols" [data]="rows" [loading]="isLoading"
 *   (edit)="onEdit($event)" (delete)="onDelete($event)">
 * </app-data-table>
 */
@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [DecimalPipe, DatePipe],
  templateUrl: './data-table.html',
  styleUrl: './data-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {
  columns    = input<TableColumn[]>([]);
  data       = input<any[]>([]);
  loading    = input<boolean>(false);
  emptyMessage = input<string>('لا توجد بيانات للعرض');

  edit   = output<any>();
  delete = output<any>();

  onEdit(row: any) {
    this.edit.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  getCellValue(row: any, col: TableColumn): any {
    return row[col.key];
  }
}
