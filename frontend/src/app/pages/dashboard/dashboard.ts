import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';

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
  biz = inject(BusinessService);

  bizId = 0;
  stations = signal<any[]>([]);
  employees = signal<any[]>([]);
  accounts = signal<any[]>([]);
  funds = signal<any[]>([]);
  suppliers = signal<any[]>([]);
  pendingAccounts = signal<any[]>([]);
  partners = signal<any[]>([]);
  loading = signal(true);
  totalSalaries = signal(0);

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.loadData();
    });
  }

  async loadData() {
    try {
      const [stationsData, empsData, accsData, fundsData, suppData, pendData, bizData] = await Promise.all([
        this.api.getStations(this.bizId),
        this.api.getEmployees(this.bizId),
        this.api.getAccounts(this.bizId),
        this.api.getFunds(this.bizId),
        this.api.getSuppliers(this.bizId),
        this.api.getPendingAccounts(this.bizId),
        this.api.getBusiness(this.bizId),
      ]);
      this.stations.set(stationsData);
      this.employees.set(empsData);
      this.accounts.set(accsData);
      this.funds.set(fundsData);
      this.suppliers.set(suppData);
      this.pendingAccounts.set(pendData);
      if (bizData.partners) this.partners.set(bizData.partners);
      this.totalSalaries.set(empsData.reduce((sum: number, e: any) => sum + Number(e.salary || 0), 0));
    } catch (e) {
      console.error(e);
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
}
