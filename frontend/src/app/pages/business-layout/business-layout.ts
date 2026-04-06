import {
  Component,
  inject,
  signal,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';
import { BusinessService, BusinessType } from '../../services/business.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-business-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './business-layout.html',
  styleUrl: './business-layout.scss',
})
export class BusinessLayoutComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bizService = inject(BusinessService);
  private readonly api = inject(ApiService);

  /** حالة السايدبار */
  isSidebarCollapsed = signal<boolean>(false);
  isSidebarOpen = signal<boolean>(false);
  isMobile = signal<boolean>(false);

  private readonly MOBILE_BREAKPOINT = 1024;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    const bizId = Number.parseInt(this.route.snapshot.params['bizId'] ?? '', 10);
    if (bizId > 0) this.bizService.setBusinessId(bizId);
    this.checkMobile();
  }

  ngOnInit() {
    this.setupResizeObserver();

    const setFromParams = (params: { bizId?: string }) => {
      const bizId = Number.parseInt(params['bizId'] ?? '', 10);
      if (!bizId) return;
      this.bizService.setBusinessId(bizId);
      this.api.getBusiness(bizId).then(
        (biz) => {
          const bizType: BusinessType = (biz.type as BusinessType) || 'stations';
          this.bizService.setBusiness(biz.id, biz.name, biz.color, biz.icon, bizType);
        },
        () => this.router.navigate(['/']),
      );
    };
    setFromParams(this.route.snapshot.params);
    this.route.params.subscribe(setFromParams);
  }

  ngOnDestroy() {
    this.resizeObserver?.disconnect();
  }

  private setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => this.checkMobile());
    this.resizeObserver.observe(document.body);
  }

  @HostListener('window:resize')
  checkMobile() {
    const mobile = window.innerWidth < this.MOBILE_BREAKPOINT;
    this.isMobile.set(mobile);
    if (!mobile) {
      // على الشاشات الكبيرة: أغلق overlay mode
      this.isSidebarOpen.set(false);
    }
  }

  toggleSidebar() {
    if (this.isMobile()) {
      this.isSidebarOpen.update((v) => !v);
    } else {
      this.isSidebarCollapsed.update((v) => !v);
    }
  }

  closeSidebarOnMobile() {
    if (this.isMobile()) {
      this.isSidebarOpen.set(false);
    }
  }
}
