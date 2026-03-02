import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastService);
  biz = inject(BusinessService);

  bizId = 0;
  stations = signal<any[]>([]);
  employees = signal<any[]>([]);
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);
  suppliers = signal<any[]>([]);
  pendingAccounts = signal<any[]>([]);
  partners = signal<any[]>([]);
  warehouses = signal<any[]>([]);
  loading = signal(true);
  totalSalaries = signal(0);
  loadError = signal('');

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.loadData();
    });
  }

  async loadData() {
    this.loading.set(true);
    this.loadError.set('');
    try {
      // تحميل البيانات بشكل متوازي مع حماية فردية لكل طلب
      const results = await Promise.allSettled([
        this.api.getStations(this.bizId),
        this.api.getEmployees(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getSuppliers(this.bizId),
        this.api.getPendingAccounts(this.bizId),
        this.api.getBusiness(this.bizId),
        this.api.getWarehouses(this.bizId),
      ]);

      // استخراج النتائج بأمان
      const getValue = (result: PromiseSettledResult<any>, fallback: any = []) => {
        return result.status === 'fulfilled' ? result.value : fallback;
      };

      this.stations.set(getValue(results[0], []));
      this.employees.set(getValue(results[1], []));
      this.accounts.set(getValue(results[2], []));
      this.funds.set(getValue(results[3], []));
      this.suppliers.set(getValue(results[4], []));
      this.pendingAccounts.set(getValue(results[5], []));
      this.warehouses.set(getValue(results[7], []));

      const bizData = getValue(results[6], {});
      if (bizData?.partners) this.partners.set(bizData.partners);

      const emps = getValue(results[1], []);
      this.totalSalaries.set(
        emps.reduce((sum: number, e: any) => sum + Number(e.salary || 0), 0)
      );

      // التحقق من وجود أخطاء جزئية
      const failedCount = results.filter(r => r.status === 'rejected').length;
      if (failedCount > 0 && failedCount < results.length) {
        this.loadError.set(`تم تحميل البيانات جزئياً (${failedCount} طلب فشل)`);
      } else if (failedCount === results.length) {
        this.loadError.set('فشل تحميل جميع البيانات — تأكد من اتصال الخادم');
      }
    } catch (e: any) {
      console.error('خطأ في تحميل بيانات لوحة التحكم:', e);
      this.loadError.set(e?.message || 'حدث خطأ غير متوقع أثناء تحميل البيانات');
    } finally {
      this.loading.set(false);
    }
  }

  navigate(path: string) {
    this.router.navigate([`/biz/${this.bizId}/${path}`]);
  }

  formatNumber(n: number): string {
    return new Intl.NumberFormat('ar-YE').format(n);
  }

  getAccountTypeLabel(type: string): string {
    const map: Record<string, string> = {
      e_wallet: 'محفظة إلكترونية', bank: 'بنك', exchange: 'صراف',
      service: 'خدمة', cash: 'نقد/خزنة', custody: 'عهدة',
      warehouse: 'مخزن', fund: 'صندوق', billing: 'فوترة',
      accounting: 'محاسبي', intermediary: 'وسيط',
    };
    return map[type] || type;
  }

  getFundTypeLabel(type: string): string {
    const map: Record<string, string> = {
      collection: 'تحصيل', salary_advance: 'سلف', custody: 'عهدة',
      safe: 'خزنة', expense: 'خرج', deposit: 'توريدات',
    };
    return map[type] || type;
  }

  getWarehouseTypeLabel(type: string): string {
    const map: Record<string, string> = {
      main: 'رئيسي', station: 'محطة', sub: 'فرعي',
    };
    return map[type] || type;
  }

  retry() {
    this.loadData();
  }
}
