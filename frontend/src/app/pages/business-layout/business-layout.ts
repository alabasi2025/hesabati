import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs';
import { BusinessService, BusinessType } from '../../services/business.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-business-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent, BreadcrumbsComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <div class="main-area">
        <app-header></app-header>
        <main class="content-area">
          <app-breadcrumbs></app-breadcrumbs>
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
      overflow: hidden;
    }
    .app-layout {
      display: flex;
      height: 100vh;
      direction: rtl;
      overflow: hidden;
    }
    .main-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }
    .content-area {
      flex: 1;
      padding: 24px;
      padding-top: 8px;
      overflow-y: auto;
      height: 100%;
    }
  `]
})
export class BusinessLayoutComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bizService = inject(BusinessService);
  private readonly api = inject(ApiService);

  constructor() {
    const bizId = Number.parseInt(this.route.snapshot.params['bizId'] ?? '', 10);
    if (bizId > 0) this.bizService.setBusinessId(bizId);
  }

  ngOnInit() {
    const setFromParams = (params: { bizId?: string }) => {
      const bizId = Number.parseInt(params['bizId'] ?? '', 10);
      if (!bizId) return;
      this.bizService.setBusinessId(bizId);
      this.api.getBusiness(bizId).then(
        (biz) => {
          const bizType: BusinessType = (biz.type as BusinessType) || 'stations';
          this.bizService.setBusiness(biz.id, biz.name, biz.color, biz.icon, bizType);
        },
        () => this.router.navigate(['/'])
      );
    };
    setFromParams(this.route.snapshot.params);
    this.route.params.subscribe(setFromParams);
  }
}
