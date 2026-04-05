import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { CssBackgroundComponent } from '../../shared/components/css-background/css-background.component';

interface LoginFormData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CssBackgroundComponent, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // ===== Signal Form =====
  loginModel = signal<LoginFormData>({ username: '', password: '' });
  loginForm = form(this.loginModel);

  isLoading = signal(false);
  error = signal('');
  showPassword = signal(false);

  async onLogin() {
    const username = this.loginModel().username.trim();
    const password = this.loginModel().password.trim();

    if (!username || !password) {
      this.error.set('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    try {
      await this.auth.login(username, password);
      this.router.navigate(['/businesses']);
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'فشل تسجيل الدخول');
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
}
