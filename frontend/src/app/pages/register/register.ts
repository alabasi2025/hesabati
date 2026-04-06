import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  private readonly auth   = inject(AuthService);
  private readonly router = inject(Router);

  fullName     = signal('');
  username     = signal('');
  password     = signal('');
  role         = signal('viewer');
  isLoading    = signal(false);
  error        = signal('');
  showPassword = signal(false);

  readonly roleOptions = [
    { value: 'viewer',     label: 'مشاهد' },
    { value: 'accountant', label: 'محاسب' },
    { value: 'manager',    label: 'مدير' },
    { value: 'admin',      label: 'مدير النظام' },
  ];

  async onRegister() {
    const name = this.fullName().trim();
    const u    = this.username().trim();
    const p    = this.password();

    if (!name || !u || !p) {
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
      await this.auth.register(u, p, name, this.role());
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
