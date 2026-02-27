import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, Router } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';
import { BusinessService, BusinessType } from '../../services/business.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-business-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, HeaderComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      <div class="main-area">
        <app-header></app-header>
        <main class="content-area">
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
      overflow-y: auto;
      height: 100%;
    }
  `]
})
export class BusinessLayoutComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private bizService = inject(BusinessService);
  private api = inject(ApiService);

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      const bizId = parseInt(params['bizId']);
      if (bizId) {
        try {
          const biz = await this.api.getBusiness(bizId);
          const bizType: BusinessType = (biz.type as BusinessType) || 'stations';
          this.bizService.setBusiness(biz.id, biz.name, biz.color, biz.icon, bizType);
        } catch (e) {
          this.router.navigate(['/']);
        }
      }
    });
  }
}
