import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { BusinessService } from '../../services/business.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-stations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stations.html',
  styleUrl: './stations.scss',
})
export class StationsComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  biz = inject(BusinessService);
  private toast = inject(ToastService);

  bizId = 0;
  stations = signal<any[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.route.parent?.params.subscribe(params => {
      this.bizId = parseInt(params['bizId']);
      if (this.bizId) this.load();
    });
  }

  async load() {
    this.loading.set(true);
    try {
      const data = await this.api.getStations(this.bizId);
      this.stations.set(data);
    } catch (e: any) {
      console.error(e);
      this.toast.error(e?.message || 'حدث خطأ أثناء تحميل المحطات');
    }
    this.loading.set(false);
  }

  getBillingLabel(sys: string): string {
    const map: Record<string, string> = {
      'moghrabi_v1': 'المغربي v1', 'moghrabi_v2': 'المغربي v2', 'moghrabi_v3': 'المغربي v3',
      'support_fund': 'صندوق الدعم', 'support_fund_west': 'صندوق الدعم (غرب)', 'prepaid': 'مسبق الدفع',
    };
    return map[sys] || sys;
  }
}
