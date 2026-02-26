import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService, Business } from '../../services/api.service';
import { ThemeService } from '../../services/theme.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-business-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './business-select.html',
  styleUrl: './business-select.scss',
})
export class BusinessSelectComponent implements OnInit {
  private api = inject(ApiService);
  private router = inject(Router);
  private auth = inject(AuthService);
  theme = inject(ThemeService);

  businesses = signal<Business[]>([]);
  loading = signal(true);
  userName = signal('');

  ngOnInit() {
    this.userName.set(this.auth.getUserName() || 'المالك');
    this.loadBusinesses();
  }

  async loadBusinesses() {
    try {
      const data = await this.api.getBusinesses();
      this.businesses.set(data);
    } catch (e) {
      console.error(e);
    } finally {
      this.loading.set(false);
    }
  }

  enterBusiness(biz: Business) {
    this.router.navigate(['/biz', biz.id]);
  }

  toggleTheme() {
    this.theme.toggle();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير';
    if (hour < 17) return 'مساء الخير';
    return 'مساء الخير';
  }
}
