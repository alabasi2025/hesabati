/**
 * report-export.service.ts
 * خدمة مشتركة لتصدير التقارير إلى Excel (xlsx)
 */
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

export interface ExcelColumn {
  header: string;
  key: string;
  width?: number;
  format?: (val: any, row: any) => string | number;
}

export interface ExcelSheet {
  name: string;
  columns: ExcelColumn[];
  rows: any[];
  totals?: Record<string, string | number>;
}

export interface ExcelOptions {
  filename: string;
  sheets: ExcelSheet[];
}

@Injectable({ providedIn: 'root' })
export class ReportExportService {

  exportExcel(options: ExcelOptions): void {
    const wb = XLSX.utils.book_new();

    for (const sheet of options.sheets) {
      const headers = sheet.columns.map(c => c.header);
      const dataRows = sheet.rows.map(row =>
        sheet.columns.map(c => {
          const val = row[c.key];
          return c.format ? c.format(val, row) : (val ?? '');
        })
      );

      const wsData: any[][] = [headers, ...dataRows];

      if (sheet.totals) {
        const totalsRow = sheet.columns.map(c =>
          sheet.totals![c.key] !== undefined ? sheet.totals![c.key] : ''
        );
        wsData.push(totalsRow);
      }

      const ws = XLSX.utils.aoa_to_sheet(wsData);

      // ضبط عرض الأعمدة
      ws['!cols'] = sheet.columns.map(c => ({ wch: c.width ?? 18 }));

      XLSX.utils.book_append_sheet(wb, ws, sheet.name.substring(0, 31));
    }

    const filename = options.filename.endsWith('.xlsx')
      ? options.filename
      : `${options.filename}-${new Date().toISOString().split('T')[0]}.xlsx`;

    XLSX.writeFile(wb, filename);
  }

  /** تصدير جدول بسيط (ورقة واحدة) */
  exportSimple(
    filename: string,
    sheetName: string,
    columns: ExcelColumn[],
    rows: any[],
    totals?: Record<string, string | number>
  ): void {
    this.exportExcel({ filename, sheets: [{ name: sheetName, columns, rows, totals }] });
  }
}
