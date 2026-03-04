import {
  Component, Input, inject, ChangeDetectionStrategy
} from '@angular/core';
import { ThemeService } from '../../services/theme.service';

/**
 * بطاقة إحصائيات بتأثيرات CSS 3D بدلاً من WebGL Canvas منفصل.
 * هذا يقلل عدد WebGL contexts من 13 إلى 6 في Dashboard.
 * التأثيرات البصرية محققة عبر CSS transforms و gradients و animations.
 */
@Component({
  selector: 'app-three-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-card-3d" [class.light-mode]="!isDark"
         (mouseenter)="isHovered = true" (mouseleave)="isHovered = false"
         [class.hovered]="isHovered">
      <!-- خلفية متحركة CSS بدلاً من WebGL -->
      <div class="card-bg-effect">
        <div class="floating-shape shape-1" [style.background]="color + '33'"></div>
        <div class="floating-shape shape-2" [style.background]="color + '22'"></div>
        <div class="floating-shape shape-3" [style.background]="color + '18'"></div>
        <div class="particle-dots">
          @for (d of dots; track $index) {
            <span class="dot" [style.left.%]="d.x" [style.top.%]="d.y"
                  [style.animation-delay]="d.delay + 's'" [style.background]="color + '44'"></span>
          }
        </div>
      </div>
      <div class="stat-content">
        <div class="stat-icon-wrap" [style.background]="iconBg">
          <span class="material-icons-round" [style.color]="color">{{ icon }}</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ formattedValue }}</span>
          <span class="stat-label">{{ label }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes floatShape1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
      25% { transform: translate(10px, -15px) rotate(45deg) scale(1.1); }
      50% { transform: translate(-5px, -25px) rotate(90deg) scale(0.95); }
      75% { transform: translate(15px, -10px) rotate(135deg) scale(1.05); }
    }
    @keyframes floatShape2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(-12px, 10px) rotate(-60deg); }
      66% { transform: translate(8px, -8px) rotate(60deg); }
    }
    @keyframes floatShape3 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      50% { transform: translate(5px, -12px) scale(1.15); }
    }
    @keyframes dotPulse {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 0.7; transform: scale(1.2); }
    }

    :host { display: block; }

    .stat-card-3d {
      position: relative;
      border-radius: 16px;
      overflow: hidden;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(99, 102, 241, 0.15);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
      cursor: pointer;
      perspective: 800px;
    }
    .stat-card-3d.light-mode {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(99, 102, 241, 0.12);
    }
    .stat-card-3d.hovered {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
    }
    .stat-card-3d.light-mode.hovered {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(99, 102, 241, 0.08);
    }

    .card-bg-effect {
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: 0.35;
      transition: opacity 0.3s ease;
      overflow: hidden;
    }
    .stat-card-3d.hovered .card-bg-effect { opacity: 0.65; }

    .floating-shape {
      position: absolute;
      border-radius: 30%;
      filter: blur(8px);
    }
    .shape-1 {
      width: 60px; height: 60px;
      top: -10px; right: -10px;
      animation: floatShape1 8s ease-in-out infinite;
    }
    .shape-2 {
      width: 45px; height: 45px;
      bottom: -5px; left: 10px;
      animation: floatShape2 10s ease-in-out infinite;
    }
    .shape-3 {
      width: 35px; height: 35px;
      top: 50%; right: 30%;
      animation: floatShape3 6s ease-in-out infinite;
    }

    .particle-dots {
      position: absolute;
      inset: 0;
    }
    .dot {
      position: absolute;
      width: 3px; height: 3px;
      border-radius: 50%;
      animation: dotPulse 3s ease-in-out infinite;
    }

    .stat-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 24px;
    }
    .stat-icon-wrap {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      transition: transform 0.3s ease;
    }
    .stat-card-3d.hovered .stat-icon-wrap {
      transform: scale(1.1) rotate(-5deg);
    }
    .stat-icon-wrap .material-icons-round {
      font-size: 26px;
    }
    .stat-info { display: flex; flex-direction: column; gap: 4px; }
    .stat-value {
      font-size: 1.6rem;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: -0.02em;
    }
    .light-mode .stat-value { color: #0f172a; }
    .stat-label {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 500;
    }
    .light-mode .stat-label { color: #64748b; }
  `],
})
export class ThreeStatCardComponent {
  @Input() value = 0;
  @Input() label = '';
  @Input() icon = 'analytics';
  @Input() color = '#6366f1';

  private theme = inject(ThemeService);
  isHovered = false;

  // نقاط عشوائية للتأثير البصري
  dots = Array.from({ length: 8 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
  }));

  get isDark(): boolean {
    return this.theme.isDark?.() ?? true;
  }

  get formattedValue(): string {
    return new Intl.NumberFormat('ar-YE').format(this.value);
  }

  get iconBg(): string {
    return this.color + '22';
  }
}
