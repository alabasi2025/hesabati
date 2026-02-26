import { Component, signal, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');
  showPassword = signal(false);

  async onLogin() {
    if (!this.username() || !this.password()) {
      this.error.set('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    try {
      await this.auth.login(this.username(), this.password());
      this.router.navigate(['/businesses']);
    } catch (err: any) {
      this.error.set(err.message || 'فشل تسجيل الدخول');
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
}
