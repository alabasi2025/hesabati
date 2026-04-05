import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { form, FormField } from '@angular/forms/signals';
import { AuthService } from '../../services/auth.service';
import { CssBackgroundComponent } from '../../shared/components/css-background/css-background.component';

interface RegisterFormData {
  fullName: string;
  username: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CssBackgroundComponent, FormField],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  // ===== Signal Form =====
  registerModel = signal<RegisterFormData>({
    fullName: '',
    username: '',
    password: '',
    role: 'viewer',
  });
  registerForm = form(this.registerModel);

  isLoading = signal(false);
  error = signal('');
  showPassword = signal(false);

  readonly roleOptions = [
    { value: 'viewer', label: 'مشاهد' },
    { value: 'accountant', label: 'محاسب' },
    { value: 'manager', label: 'مدير' },
    { value: 'admin', label: 'مدير النظام' },
  ];

  async onRegister() {
    const { fullName, username, password, role } = this.registerModel();
    const u = username.trim();
    const p = password;
    const name = fullName.trim();

    if (!u || !p || !name) {
      this.error.set('يرجى تعبئة جميع الحقول المطلوبة');
      return;
    }
    if (p.length < 8) {
      this.error.set('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }
    if (!/[a-zA-Z]/.test(p)) {
      this.error.set('كلمة المرور يجب أن تحتوي على حرف واحد على الأقل');
      return;
    }
    if (!/\d/.test(p)) {
      this.error.set('كلمة المرور يجب أن تحتوي على رقم واحد على الأقل');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    try {
      await this.auth.register(u, p, name, role);
      this.router.navigate(['/login']);
    } catch (err: unknown) {
      this.error.set(err instanceof Error ? err.message : 'فشل إنشاء الحساب');
    } finally {
      this.isLoading.set(false);
    }
  }

  togglePassword() {
    this.showPassword.set(!this.showPassword());
  }
}
