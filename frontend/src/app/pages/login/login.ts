import { Component, signal, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ThreeBackgroundComponent } from '../../components/three-background/three-background';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, ThreeBackgroundComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  username = signal('');
  password = signal('');
  isLoading = signal(false);
  error = signal('');
  showPassword = signal(false);

  async onLogin() {
    if (!this.username().trim() || !this.password().trim()) {
      this.error.set('يرجى إدخال اسم المستخدم وكلمة المرور');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    try {
      await this.auth.login(this.username(), this.password());
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
