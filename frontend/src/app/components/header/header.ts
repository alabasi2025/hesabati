import { Component, inject, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ThemeService } from '../../services/theme.service';
import { BusinessService } from '../../services/business.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private auth = inject(AuthService);
  themeService = inject(ThemeService);
  biz = inject(BusinessService);

  pageTitle = input<string>('لوحة التحكم');
  user = this.auth.user;

  getCurrentDate(): string {
    return new Date().toLocaleDateString('ar-YE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
