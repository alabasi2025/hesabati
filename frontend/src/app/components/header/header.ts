import { Component, inject, input } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class HeaderComponent {
  private auth = inject(AuthService);
  
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
