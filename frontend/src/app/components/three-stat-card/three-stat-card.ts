import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy,
  Input, inject, ChangeDetectionStrategy
} from '@angular/core';
import * as THREE from 'three';
import { ThreeService } from '../../services/three.service';

@Component({
  selector: 'app-three-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-card-3d" (mouseenter)="onHover(true)" (mouseleave)="onHover(false)">
      <div #miniScene class="mini-scene"></div>
      <div class="stat-content">
        <div class="stat-icon">
          <span class="material-icons-round">{{ icon }}</span>
        </div>
        <div class="stat-info">
          <span class="stat-value">{{ formattedValue }}</span>
          <span class="stat-label">{{ label }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
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
    }
    .stat-card-3d:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
    }
    .mini-scene {
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: 0.4;
      transition: opacity 0.3s ease;
    }
    .stat-card-3d:hover .mini-scene { opacity: 0.7; }
    .stat-content {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 20px 24px;
    }
    .stat-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(6, 182, 212, 0.2));
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .stat-icon .material-icons-round {
      font-size: 26px;
      background: linear-gradient(135deg, #818cf8, #06b6d4);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .stat-info { display: flex; flex-direction: column; gap: 4px; }
    .stat-value {
      font-size: 1.6rem;
      font-weight: 700;
      color: #f1f5f9;
      letter-spacing: -0.02em;
    }
    .stat-label {
      font-size: 0.85rem;
      color: #94a3b8;
      font-weight: 500;
    }
  `],
})
export class ThreeStatCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('miniScene') sceneRef!: ElementRef<HTMLElement>;

  @Input() value = 0;
  @Input() label = '';
  @Input() icon = 'analytics';
  @Input() color = '#6366f1';

  private three = inject(ThreeService);
  private sceneId = 'stat-' + Math.random().toString(36).slice(2, 8);
  private isHovered = false;
  private shape!: THREE.Mesh;

  get formattedValue(): string {
    return new Intl.NumberFormat('ar-YE').format(this.value);
  }

  ngAfterViewInit(): void {
    const container = this.sceneRef?.nativeElement;
    if (!container) return;

    const colorHex = parseInt(this.color.replace('#', ''), 16);

    const managed = this.three.createScene(this.sceneId, container, {
      clearColor: 0x000000,
      clearAlpha: 0,
      camera: { fov: 45, position: [0, 0, 4], lookAt: [0, 0, 0] },
      ambient: { color: 0xffffff, intensity: 0.3 },
      directional: { color: 0xffffff, intensity: 0.6, position: [2, 3, 2] },
    });

    // شكل هندسي عائم حسب الأيقونة
    const shapes: Record<string, () => THREE.Mesh> = {
      account_balance: () => this.three.createGlassCube(1.2, colorHex, [0, 0, 0]),
      payments: () => this.three.createGlowTorus(0.8, 0.15, colorHex, [0, 0, 0]),
      inventory: () => this.three.createGlassCube(1, colorHex, [0, 0, 0]),
      people: () => this.three.createGlowSphere(0.7, colorHex, 0.5, [0, 0, 0]),
      default: () => this.three.createGlowSphere(0.6, colorHex, 0.4, [0, 0, 0]),
    };

    this.shape = (shapes[this.icon] || shapes['default'])();
    managed.scene.add(this.shape);

    // جسيمات صغيرة
    const particles = this.three.createParticleSystem(50, 5, colorHex, 0.03);
    managed.scene.add(particles);

    this.three.animate(this.sceneId, (delta, elapsed) => {
      const speed = this.isHovered ? 2 : 0.5;
      this.shape.rotation.x += delta * speed * 0.5;
      this.shape.rotation.y += delta * speed;
      this.shape.position.y = Math.sin(elapsed * 0.8) * 0.15;

      this.three.animateParticles(particles, delta, 5);
      particles.rotation.y += delta * 0.05;
    });
  }

  onHover(hovered: boolean): void {
    this.isHovered = hovered;
  }

  ngOnDestroy(): void {
    this.three.destroyScene(this.sceneId);
  }
}
