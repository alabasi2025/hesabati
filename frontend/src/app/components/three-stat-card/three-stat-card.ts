import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy,
  Input, inject, ChangeDetectionStrategy
} from '@angular/core';
import * as THREE from 'three';
import { ThreeService } from '../../services/three.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-three-stat-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="stat-card-3d" [class.light-mode]="!isDark"
         (mouseenter)="onHover(true)" (mouseleave)="onHover(false)">
      <div #miniScene class="mini-scene"></div>
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
    .stat-card-3d.light-mode {
      background: rgba(255, 255, 255, 0.85);
      border-color: rgba(99, 102, 241, 0.12);
    }
    .stat-card-3d:hover {
      transform: translateY(-4px) scale(1.02);
      box-shadow: 0 20px 40px rgba(99, 102, 241, 0.2), 0 0 30px rgba(99, 102, 241, 0.1);
      border-color: rgba(99, 102, 241, 0.3);
    }
    .stat-card-3d.light-mode:hover {
      box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(99, 102, 241, 0.08);
    }
    .mini-scene {
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: 0.35;
      transition: opacity 0.3s ease;
    }
    .stat-card-3d:hover .mini-scene { opacity: 0.6; }
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
    .stat-card-3d:hover .stat-icon-wrap {
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
export class ThreeStatCardComponent implements AfterViewInit, OnDestroy {
  @ViewChild('miniScene') sceneRef!: ElementRef<HTMLElement>;

  @Input() value = 0;
  @Input() label = '';
  @Input() icon = 'analytics';
  @Input() color = '#6366f1';

  private three = inject(ThreeService);
  private theme = inject(ThemeService);
  private sceneId = 'stat-' + Math.random().toString(36).slice(2, 8);
  private isHovered = false;
  private shape!: THREE.Mesh;

  isDark = true;

  get formattedValue(): string {
    return new Intl.NumberFormat('ar-YE').format(this.value);
  }

  get iconBg(): string {
    return this.color + '22';
  }

  ngAfterViewInit(): void {
    const container = this.sceneRef?.nativeElement;
    if (!container) return;

    this.isDark = this.theme.isDark?.() ?? true;
    const colorHex = parseInt(this.color.replace('#', ''), 16);

    const managed = this.three.createScene(this.sceneId, container, {
      clearColor: 0x000000,
      clearAlpha: 0,
      camera: { fov: 45, position: [0, 0, 4], lookAt: [0, 0, 0] },
      ambient: { color: 0xffffff, intensity: this.isDark ? 0.3 : 0.5 },
      directional: { color: 0xffffff, intensity: this.isDark ? 0.6 : 0.4, position: [2, 3, 2] },
    });

    // شكل هندسي عائم حسب الأيقونة
    const shapes: Record<string, () => THREE.Mesh> = {
      bolt: () => this.createOctahedron(colorHex),
      groups: () => this.three.createGlowSphere(0.7, colorHex, 0.5, [0, 0, 0]),
      account_balance_wallet: () => this.three.createGlassCube(1, colorHex, [0, 0, 0]),
      inventory_2: () => this.three.createGlowTorus(0.7, 0.12, colorHex, [0, 0, 0]),
      payments: () => this.createDodecahedron(colorHex),
      local_shipping: () => this.three.createGlassCube(0.9, colorHex, [0, 0, 0]),
      warehouse: () => this.createTetrahedron(colorHex),
      default: () => this.three.createGlowSphere(0.6, colorHex, 0.4, [0, 0, 0]),
    };

    this.shape = (shapes[this.icon] || shapes['default'])();
    managed.scene.add(this.shape);

    // جسيمات صغيرة
    const particles = this.three.createParticleSystem(40, 4, colorHex, 0.025);
    managed.scene.add(particles);

    this.three.animate(this.sceneId, (delta, elapsed) => {
      const speed = this.isHovered ? 2.5 : 0.5;
      this.shape.rotation.x += delta * speed * 0.5;
      this.shape.rotation.y += delta * speed;
      this.shape.position.y = Math.sin(elapsed * 0.8) * 0.12;

      // نبض التوهج عند hover
      if (this.isHovered) {
        const mat = this.shape.material as THREE.MeshStandardMaterial;
        if (mat.emissiveIntensity !== undefined) {
          mat.emissiveIntensity = 0.4 + Math.sin(elapsed * 3) * 0.2;
        }
      }

      this.three.animateParticles(particles, delta, 4);
      particles.rotation.y += delta * 0.05;
    });
  }

  private createOctahedron(color: number): THREE.Mesh {
    const geo = new THREE.OctahedronGeometry(0.8, 0);
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      metalness: 0.5, roughness: 0.3, transparent: true, opacity: 0.8,
    });
    return new THREE.Mesh(geo, mat);
  }

  private createDodecahedron(color: number): THREE.Mesh {
    const geo = new THREE.DodecahedronGeometry(0.7, 0);
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      metalness: 0.4, roughness: 0.3, transparent: true, opacity: 0.8,
    });
    return new THREE.Mesh(geo, mat);
  }

  private createTetrahedron(color: number): THREE.Mesh {
    const geo = new THREE.TetrahedronGeometry(0.9, 0);
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      metalness: 0.5, roughness: 0.3, transparent: true, opacity: 0.8,
    });
    return new THREE.Mesh(geo, mat);
  }

  onHover(hovered: boolean): void {
    this.isHovered = hovered;
  }

  ngOnDestroy(): void {
    this.three.destroyScene(this.sceneId);
  }
}
