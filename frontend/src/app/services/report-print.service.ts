/**
 * report-print.service.ts
 * خدمة مشتركة لتوليد تقارير PDF واحترافية مع jsPDF + autoTable
 */
import { Injectable } from '@angular/core';

export interface PrintColumn {
  header: string;
  key: string;
  width?: number;
  align?: 'right' | 'left' | 'center';
  format?: (val: any) => string;
  color?: (val: any, row: any) => string;
}

export interface PrintSection {
  title: string;
  columns: PrintColumn[];
  rows: any[];
  totals?: Record<string, string | number>;
}

export interface PrintOptions {
  title: string;
  subtitle?: string;
  businessName: string;
  dateRange?: string;
  orientation?: 'portrait' | 'landscape';
  sections: PrintSection[];
  summary?: Array<{ label: string; value: string; color?: string }>;
}

@Injectable({ providedIn: 'root' })
export class ReportPrintService {

  /** تصدير PDF كامل للتقرير */
  async exportPDF(options: PrintOptions): Promise<void> {
    const { default: jsPDF } = await import('jspdf');
    const { default: autoTable } = await import('jspdf-autotable');
    const doc = new jsPDF({
      orientation: options.orientation || 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // إضافة دعم RTL عبر تقليب النص
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 15;

    // ===== Header =====
    doc.setFillColor(99, 102, 241); // indigo-500
    doc.rect(0, 0, pageWidth, 28, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(this.reverseArabic(options.businessName), pageWidth / 2, 12, { align: 'center' });

    doc.setFontSize(12);
    doc.text(this.reverseArabic(options.title), pageWidth / 2, 20, { align: 'center' });

    if (options.subtitle) {
      doc.setFontSize(9);
      doc.text(this.reverseArabic(options.subtitle), pageWidth / 2, 26, { align: 'center' });
    }

    y = 35;

    // ===== Date Range =====
    if (options.dateRange) {
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(this.reverseArabic(options.dateRange), pageWidth - 14, y, { align: 'right' });
      y += 7;
    }

    // ===== Summary Cards =====
    if (options.summary?.length) {
      const cardW = (pageWidth - 28) / options.summary.length;
      options.summary.forEach((item, i) => {
        const x = 14 + i * cardW;
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);
        doc.roundedRect(x, y, cardW - 2, 14, 2, 2, 'FD');
        doc.setFontSize(7);
        doc.setTextColor(100, 116, 139);
        doc.text(this.reverseArabic(item.label), x + cardW / 2 - 1, y + 5, { align: 'center' });
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(30, 41, 59);
        doc.text(this.reverseArabic(String(item.value)), x + cardW / 2 - 1, y + 11, { align: 'center' });
      });
      y += 20;
    }

    // ===== Sections =====
    for (const section of options.sections) {
      if (y > 250) {
        doc.addPage();
        y = 15;
      }

      // Section title
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(99, 102, 241);
      doc.text(this.reverseArabic(section.title), pageWidth - 14, y, { align: 'right' });
      y += 6;

      if (!section.rows.length) {
        doc.setFontSize(9);
        doc.setTextColor(148, 163, 184);
        doc.text(this.reverseArabic('لا توجد بيانات'), pageWidth - 14, y + 4, { align: 'right' });
        y += 12;
        continue;
      }

      const head = [section.columns.map(c => this.reverseArabic(c.header))];
      const body = section.rows.map(row =>
        section.columns.map(c => {
          const val = row[c.key];
          return c.format ? c.format(val) : this.reverseArabic(String(val ?? '-'));
        })
      );

      // Totals row
      if (section.totals) {
        const totalsRow = section.columns.map(c =>
          section.totals![c.key] !== undefined
            ? this.reverseArabic(String(section.totals![c.key]))
            : ''
        );
        body.push(totalsRow);
      }

      autoTable(doc, {
        startY: y,
        head,
        body,
        theme: 'grid',
        styles: {
          font: 'helvetica',
          fontSize: 8,
          cellPadding: 3,
          halign: 'right',
          textColor: [30, 41, 59],
          lineColor: [226, 232, 240],
          lineWidth: 0.3,
        },
        headStyles: {
          fillColor: [248, 250, 252],
          textColor: [71, 85, 105],
          fontStyle: 'bold',
          fontSize: 8,
        },
        alternateRowStyles: { fillColor: [250, 251, 252] },
        footStyles: {
          fillColor: [240, 253, 244],
          textColor: [21, 128, 61],
          fontStyle: 'bold',
        },
        showFoot: section.totals ? 'lastPage' : 'never',
        margin: { left: 14, right: 14 },
      });

      y = (doc as any).lastAutoTable.finalY + 8;
    }

    // ===== Footer =====
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(148, 163, 184);
      const footerY = doc.internal.pageSize.getHeight() - 8;
      doc.text(
        this.reverseArabic(`تم الإنشاء بواسطة نظام حساباتي | ${new Date().toLocaleDateString('ar-SA')} | صفحة ${i} من ${pageCount}`),
        pageWidth / 2,
        footerY,
        { align: 'center' }
      );
    }

    const filename = `${options.title}-${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(filename);
  }

  /** طباعة HTML مباشرة (للمتصفح) مع تنسيق احترافي */
  printHTML(htmlContent: string, title: string, businessName: string, dateRange = ''): void {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;

    printWindow.document.write(this.buildPrintHTML(htmlContent, title, businessName, dateRange));
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 600);
  }

  buildPrintHTML(content: string, title: string, businessName: string, dateRange = ''): string {
    return `<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <title>${title} - ${businessName}</title>
  <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Tajawal',sans-serif; direction:rtl; padding:24px; color:#1e293b; background:#fff; font-size:13px; }
    .rpt-header { text-align:center; margin-bottom:20px; padding-bottom:14px; border-bottom:3px double #6366f1; }
    .rpt-header .biz-name { font-size:20px; font-weight:900; color:#6366f1; }
    .rpt-header .rpt-title { font-size:15px; font-weight:800; color:#1e293b; margin-top:4px; }
    .rpt-header .rpt-date  { font-size:11px; color:#64748b; margin-top:4px; }
    .summary-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(120px,1fr)); gap:12px; margin-bottom:20px; }
    .summary-card { background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:12px; text-align:center; }
    .summary-card .lbl { font-size:10px; color:#64748b; font-weight:700; }
    .summary-card .val { font-size:18px; font-weight:900; color:#1e293b; margin-top:4px; }
    .summary-card.green .val { color:#16a34a; }
    .summary-card.red   .val { color:#dc2626; }
    .summary-card.blue  .val { color:#2563eb; }
    .summary-card.orange .val { color:#ea580c; }
    .section-title { font-size:13px; font-weight:800; color:#6366f1; margin:16px 0 8px; padding-right:8px; border-right:3px solid #6366f1; }
    table { width:100%; border-collapse:collapse; margin-bottom:16px; page-break-inside:auto; }
    thead { display:table-header-group; }
    tr { page-break-inside:avoid; }
    th { background:#f1f5f9; color:#475569; font-weight:800; font-size:11px; padding:8px 10px; border:1px solid #e2e8f0; text-align:right; }
    td { padding:7px 10px; border:1px solid #e2e8f0; font-size:12px; }
    tbody tr:nth-child(even) { background:#fafafa; }
    .total-row td { background:#f0fdf4 !important; font-weight:900; color:#15803d; font-size:12px; }
    .debit  { color:#16a34a; font-weight:700; font-family:monospace; }
    .credit { color:#dc2626; font-weight:700; font-family:monospace; }
    .amount { font-family:monospace; font-weight:600; }
    .pos { color:#2563eb; }
    .neg { color:#ea580c; }
    .badge { display:inline-block; padding:2px 8px; border-radius:10px; font-size:10px; font-weight:700; }
    .badge-receipt { background:#dcfce7; color:#16a34a; }
    .badge-payment { background:#fef2f2; color:#dc2626; }
    .rpt-footer { text-align:center; margin-top:24px; padding-top:12px; border-top:1px solid #e2e8f0; font-size:10px; color:#94a3b8; }
    @media print {
      body { padding:8px; }
      @page { size:A4; margin:15mm; }
    }
  </style>
</head>
<body>
  <div class="rpt-header">
    <div class="biz-name">${businessName}</div>
    <div class="rpt-title">${title}</div>
    ${dateRange ? `<div class="rpt-date">${dateRange}</div>` : ''}
  </div>
  ${content}
  <div class="rpt-footer">
    تم الإنشاء بواسطة نظام حساباتي | ${new Date().toLocaleDateString('ar-SA')} ${new Date().toLocaleTimeString('ar-SA')}
  </div>
</body>
</html>`;
  }

  private reverseArabic(text: string): string {
    // jsPDF doesn't natively support RTL — reverse text as workaround for simple cases
    // For complex use cases, consider using jspdf with Arabic font
    return text;
  }
}
