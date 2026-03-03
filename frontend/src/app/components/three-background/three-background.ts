import {
  Component, ElementRef, ViewChild, AfterViewInit, OnDestroy,
  Input, inject, ChangeDetectionStrategy
} from '@angular/core';
import {
  Scene, Mesh, Points, Line, GridHelper, Group,
  MeshStandardMaterial, MeshBasicMaterial, PointsMaterial, Material,
  TorusKnotGeometry, TorusGeometry, IcosahedronGeometry,
  OctahedronGeometry, DodecahedronGeometry, TetrahedronGeometry,
  PlaneGeometry, BufferGeometry, BufferAttribute,
  PointLight, Vector3,
  AdditiveBlending, DoubleSide,
} from 'three';
import { ThreeService } from '../../services/three.service';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-three-background',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<div #threeCanvas class="three-bg-canvas"></div>`,
  styles: [`
    :host { display: block; position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
    .three-bg-canvas { width: 100%; height: 100%; }
  `],
})
export class ThreeBackgroundComponent implements AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') canvasRef!: ElementRef<HTMLElement>;

  /** نوع المشهد: login | dashboard | page */
  @Input() variant: 'login' | 'dashboard' | 'page' = 'login';

  private three = inject(ThreeService);
  private theme = inject(ThemeService);
  private sceneId = 'bg-' + Math.random().toString(36).slice(2, 8);

  // كائنات المشهد
  private particles!: Points;
  private orbs: Mesh[] = [];
  private torusKnot!: Mesh;
  private grid!: GridHelper;
  private floatingCubes: Mesh[] = [];
  private icosahedrons: Mesh[] = [];
  private rings: Mesh[] = [];
  private connectionLines: Line[] = [];
  private nebulaClouds: Mesh[] = [];
  private mouseX = 0;
  private mouseY = 0;
  private mouseMoveHandler!: (e: MouseEvent) => void;

  ngAfterViewInit(): void {
    const container = this.canvasRef.nativeElement;
    if (!container) return;

    const isDark = this.theme.isDark?.() ?? true;

    if (this.variant === 'login') {
      this.buildLoginScene(container, isDark);
    } else if (this.variant === 'dashboard') {
      this.buildDashboardScene(container, isDark);
    } else {
      this.buildPageScene(container, isDark);
    }

    // تتبع حركة الماوس لتأثير parallax
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
  }

  // ═══════════════════════════════════════════════════════════
  // مشهد صفحة تسجيل الدخول - تأثيرات فضائية متقدمة
  // ═══════════════════════════════════════════════════════════
  private buildLoginScene(container: HTMLElement, isDark: boolean): void {
    const colors = isDark
      ? {
          bg: 0x050816, accent1: 0x6366f1, accent2: 0x06b6d4,
          accent3: 0x8b5cf6, accent4: 0xec4899, grid1: 0x1a1a3e,
          grid2: 0x2a2a5e, particle: 0x818cf8, nebula1: 0x4338ca,
          nebula2: 0x0e7490
        }
      : {
          bg: 0xf0f4ff, accent1: 0x4f46e5, accent2: 0x0891b2,
          accent3: 0x7c3aed, accent4: 0xdb2777, grid1: 0xc7d2fe,
          grid2: 0xe0e7ff, particle: 0x6366f1, nebula1: 0xa5b4fc,
          nebula2: 0x67e8f9
        };

    // pixelRatio مخفض للخلفية (1.0 بدلاً من devicePixelRatio)
    const managed = this.three.createScene(this.sceneId, container, {
      clearColor: colors.bg,
      clearAlpha: isDark ? 0.98 : 0.3,
      pixelRatio: 1.0,
      fog: { color: colors.bg, near: 8, far: 60 },
      camera: {
        fov: 55,
        position: [0, 2, 15],
        lookAt: [0, 0, 0],
      },
      ambient: { color: 0xffffff, intensity: isDark ? 0.25 : 0.6 },
      directional: { color: 0xffffff, intensity: isDark ? 0.7 : 0.5, position: [5, 10, 7] },
    });

    const { scene } = managed;

    // ═══ ضوء نقطي ملون ═══
    const pointLight1 = new PointLight(colors.accent1, isDark ? 2 : 0.5, 25);
    pointLight1.position.set(-5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new PointLight(colors.accent2, isDark ? 1.5 : 0.3, 20);
    pointLight2.position.set(5, -3, 3);
    scene.add(pointLight2);

    // ═══ جسيمات نجمية — مخفضة من 1200 إلى 600 ═══
    this.particles = this.createStarField(600, 40, colors.particle);
    scene.add(this.particles);

    // ═══ سحب سديمية ═══
    this.createNebulaClouds(scene, colors, isDark);

    // ═══ كرات متوهجة — مخفضة من 5 إلى 3 ═══
    const orbConfigs: Array<{ r: number; c: number; p: [number, number, number]; ei: number }> = [
      { r: 1.8, c: colors.accent1, p: [-5, 3, -8], ei: 0.7 },
      { r: 1.2, c: colors.accent2, p: [6, -2, -10], ei: 0.6 },
      { r: 1.0, c: colors.accent3, p: [3, 4, -5], ei: 0.8 },
    ];
    orbConfigs.forEach(cfg => {
      const orb = this.three.createGlowSphere(cfg.r, cfg.c, cfg.ei, cfg.p);
      this.orbs.push(orb);
      scene.add(orb);
    });

    // ═══ TorusKnot مركزي ═══
    const torusKnotGeo = new TorusKnotGeometry(2.5, 0.15, 100, 12, 2, 3);
    const torusKnotMat = new MeshStandardMaterial({
      color: colors.accent1,
      emissive: colors.accent2,
      emissiveIntensity: isDark ? 0.3 : 0.15,
      metalness: 0.7,
      roughness: 0.2,
      transparent: true,
      opacity: isDark ? 0.35 : 0.2,
      wireframe: true,
    });
    this.torusKnot = new Mesh(torusKnotGeo, torusKnotMat);
    this.torusKnot.position.set(0, 0, -8);
    scene.add(this.torusKnot);

    // ═══ حلقات Torus — مخفضة segments ═══
    for (let i = 0; i < 3; i++) {
      const torusGeo = new TorusGeometry(3 + i * 1.5, 0.04, 12, 64);
      const torusMat = new MeshStandardMaterial({
        color: [colors.accent1, colors.accent2, colors.accent3][i],
        emissive: [colors.accent1, colors.accent2, colors.accent3][i],
        emissiveIntensity: isDark ? 0.5 : 0.2,
        metalness: 0.8,
        roughness: 0.1,
        transparent: true,
        opacity: isDark ? 0.4 : 0.25,
      });
      const torusMesh = new Mesh(torusGeo, torusMat);
      torusMesh.position.set(0, 0, -6 - i * 2);
      torusMesh.rotation.x = Math.PI / 4 + i * 0.3;
      torusMesh.rotation.y = i * 0.5;
      this.rings.push(torusMesh);
      scene.add(torusMesh);
    }

    // ═══ شبكة أرضية ═══
    this.grid = this.three.createGridLines(60, 40, colors.grid1, colors.grid2);
    this.grid.position.y = -4;
    (this.grid.material as Material).opacity = isDark ? 0.12 : 0.08;
    scene.add(this.grid);

    // ═══ مكعبات زجاجية — مخفضة من 12 إلى 8 ═══
    for (let i = 0; i < 8; i++) {
      const size = 0.15 + Math.random() * 0.4;
      const color = [colors.accent1, colors.accent2, colors.accent3, colors.accent4][i % 4];
      const pos: [number, number, number] = [
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 12,
        -5 - Math.random() * 20,
      ];
      const cube = this.three.createGlassCube(size, color, pos);
      (cube as any)._rotSpeed = {
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      };
      (cube as any)._floatOffset = Math.random() * Math.PI * 2;
      (cube as any)._floatSpeed = 0.2 + Math.random() * 0.4;
      (cube as any)._baseY = pos[1];
      this.floatingCubes.push(cube);
      scene.add(cube);
    }

    // ═══ Icosahedrons — مخفضة من 5 إلى 3 ═══
    for (let i = 0; i < 3; i++) {
      const radius = 0.3 + Math.random() * 0.5;
      const color = [colors.accent1, colors.accent3, colors.accent4][i % 3];
      const geo = new IcosahedronGeometry(radius, 1);
      const mat = new MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.3,
        metalness: 0.5,
        roughness: 0.3,
        wireframe: Math.random() > 0.5,
        transparent: true,
        opacity: 0.6,
      });
      const mesh = new Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        -8 - Math.random() * 10
      );
      (mesh as any)._rotSpeed = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
      };
      (mesh as any)._floatOffset = Math.random() * Math.PI * 2;
      (mesh as any)._baseY = mesh.position.y;
      this.icosahedrons.push(mesh);
      scene.add(mesh);
    }

    // ═══ خطوط اتصال بين الكرات ═══
    for (let i = 0; i < this.orbs.length - 1; i++) {
      const line = this.three.createCurvedLine(
        this.orbs[i].position,
        this.orbs[i + 1].position,
        colors.accent2,
        2
      );
      this.connectionLines.push(line);
      scene.add(line);
    }

    // ═══ حلقة الرسم الرئيسية ═══
    this.three.animate(this.sceneId, (delta, elapsed) => {
      // تحريك الجسيمات النجمية
      this.three.animateParticles(this.particles, delta, 40);
      this.particles.rotation.y += delta * 0.02;
      this.particles.rotation.x += delta * 0.005;

      // تحريك TorusKnot
      if (this.torusKnot) {
        this.torusKnot.rotation.x = elapsed * 0.08;
        this.torusKnot.rotation.y = elapsed * 0.12;
        this.torusKnot.rotation.z = elapsed * 0.05;
        const scale = 1 + Math.sin(elapsed * 0.5) * 0.05;
        this.torusKnot.scale.set(scale, scale, scale);
      }

      // تحريك الحلقات
      this.rings.forEach((ring, i) => {
        ring.rotation.x += delta * (0.05 + i * 0.02);
        ring.rotation.y += delta * (0.03 + i * 0.015);
        ring.rotation.z += delta * (0.02 + i * 0.01);
      });

      // تحريك الكرات
      this.orbs.forEach((orb, i) => {
        const speed = 0.15 + i * 0.08;
        const amp = 0.2 + i * 0.08;
        orb.position.y += Math.sin(elapsed * speed + i * 1.5) * amp * delta;
        orb.position.x += Math.cos(elapsed * speed * 0.6 + i * 2.5) * amp * 0.4 * delta;
        const mat = orb.material as MeshStandardMaterial;
        mat.emissiveIntensity = 0.3 + Math.sin(elapsed * 0.8 + i) * 0.3;
      });

      // تحريك السحب السديمية
      this.nebulaClouds.forEach((cloud, i) => {
        cloud.rotation.z += delta * 0.01 * (i % 2 === 0 ? 1 : -1);
        const mat = cloud.material as MeshBasicMaterial;
        mat.opacity = 0.06 + Math.sin(elapsed * 0.3 + i * 2) * 0.03;
      });

      // تحريك المكعبات الزجاجية
      this.floatingCubes.forEach(cube => {
        const rs = (cube as any)._rotSpeed;
        const fo = (cube as any)._floatOffset;
        const fs = (cube as any)._floatSpeed;
        const by = (cube as any)._baseY;
        cube.rotation.x += rs.x;
        cube.rotation.y += rs.y;
        cube.rotation.z += rs.z;
        cube.position.y = by + Math.sin(elapsed * fs + fo) * 0.4;
      });

      // تحريك Icosahedrons
      this.icosahedrons.forEach((ico) => {
        const rs = (ico as any)._rotSpeed;
        ico.rotation.x += rs.x;
        ico.rotation.y += rs.y;
        ico.position.y = (ico as any)._baseY + Math.sin(elapsed * 0.3 + (ico as any)._floatOffset) * 0.3;
      });

      // تأثير parallax مع الماوس
      const cam = managed.camera;
      cam.position.x += (this.mouseX * 0.8 - cam.position.x) * 0.015;
      cam.position.y += (-this.mouseY * 0.4 + 2 - cam.position.y) * 0.015;
      cam.lookAt(0, 0, 0);

      // تحريك الأضواء النقطية
      pointLight1.position.x = Math.sin(elapsed * 0.3) * 8;
      pointLight1.position.y = Math.cos(elapsed * 0.2) * 5 + 3;
      pointLight2.position.x = Math.cos(elapsed * 0.25) * 6;
      pointLight2.position.z = Math.sin(elapsed * 0.15) * 5 + 3;
    });
  }

  // ═══════════════════════════════════════════════════════════
  // مشهد لوحة التحكم - تأثيرات خفيفة
  // ═══════════════════════════════════════════════════════════
  private buildDashboardScene(container: HTMLElement, isDark: boolean): void {
    const colors = isDark
      ? {
          bg: 0x0a0e1a, accent1: 0x6366f1, accent2: 0x06b6d4,
          accent3: 0x10b981, accent4: 0xf59e0b, grid1: 0x1e293b,
          grid2: 0x334155, particle: 0x818cf8
        }
      : {
          bg: 0xf8fafc, accent1: 0x4f46e5, accent2: 0x0891b2,
          accent3: 0x059669, accent4: 0xd97706, grid1: 0xc7d2fe,
          grid2: 0xe0e7ff, particle: 0x6366f1
        };

    // pixelRatio مخفض للخلفية
    const managed = this.three.createScene(this.sceneId, container, {
      clearColor: colors.bg,
      clearAlpha: isDark ? 0.6 : 0.15,
      pixelRatio: 1.0,
      fog: { color: colors.bg, near: 10, far: 80 },
      camera: {
        fov: 50,
        position: [0, 3, 18],
        lookAt: [0, 0, 0],
      },
      ambient: { color: 0xffffff, intensity: isDark ? 0.2 : 0.5 },
      directional: { color: 0xffffff, intensity: isDark ? 0.5 : 0.3, position: [5, 10, 7] },
    });

    const { scene } = managed;

    // ═══ جسيمات خفيفة — مخفضة من 300 إلى 150 ═══
    this.particles = this.createStarField(150, 50, colors.particle);
    (this.particles.material as PointsMaterial).opacity = 0.3;
    (this.particles.material as PointsMaterial).size = 0.03;
    scene.add(this.particles);

    // ═══ كرات متوهجة — مخفضة إلى 2 ═══
    const orb1 = this.three.createGlowSphere(1.0, colors.accent1, 0.3, [-8, 2, -15]);
    const orb2 = this.three.createGlowSphere(0.7, colors.accent2, 0.2, [8, -1, -12]);
    this.orbs.push(orb1, orb2);
    scene.add(orb1, orb2);

    // ═══ شبكة أرضية خفيفة ═══
    this.grid = this.three.createGridLines(80, 30, colors.grid1, colors.grid2);
    this.grid.position.y = -5;
    (this.grid.material as Material).opacity = isDark ? 0.08 : 0.05;
    scene.add(this.grid);

    // ═══ أشكال هندسية — مخفضة إلى 3 ═══
    const shapes = [
      { type: 'octahedron', color: colors.accent1, pos: [-10, 3, -20] as [number, number, number], size: 0.8 },
      { type: 'dodecahedron', color: colors.accent2, pos: [10, -2, -18] as [number, number, number], size: 0.6 },
      { type: 'tetrahedron', color: colors.accent3, pos: [-5, -3, -22] as [number, number, number], size: 0.7 },
    ];

    shapes.forEach(s => {
      let geo: BufferGeometry;
      switch (s.type) {
        case 'octahedron': geo = new OctahedronGeometry(s.size, 0); break;
        case 'dodecahedron': geo = new DodecahedronGeometry(s.size, 0); break;
        default: geo = new TetrahedronGeometry(s.size, 0);
      }
      const mat = new MeshStandardMaterial({
        color: s.color,
        emissive: s.color,
        emissiveIntensity: 0.2,
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: isDark ? 0.5 : 0.3,
        wireframe: true,
      });
      const mesh = new Mesh(geo, mat);
      mesh.position.set(...s.pos);
      (mesh as any)._rotSpeed = { x: (Math.random() - 0.5) * 0.008, y: (Math.random() - 0.5) * 0.008 };
      (mesh as any)._floatOffset = Math.random() * Math.PI * 2;
      (mesh as any)._baseY = s.pos[1];
      this.icosahedrons.push(mesh);
      scene.add(mesh);
    });

    // ═══ مكعبات زجاجية — مخفضة من 6 إلى 4 ═══
    for (let i = 0; i < 4; i++) {
      const size = 0.1 + Math.random() * 0.25;
      const color = [colors.accent1, colors.accent2, colors.accent3, colors.accent4][i % 4];
      const pos: [number, number, number] = [
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 15,
        -10 - Math.random() * 20,
      ];
      const cube = this.three.createGlassCube(size, color, pos);
      (cube as any)._rotSpeed = {
        x: (Math.random() - 0.5) * 0.008,
        y: (Math.random() - 0.5) * 0.008,
        z: (Math.random() - 0.5) * 0.005,
      };
      (cube as any)._floatOffset = Math.random() * Math.PI * 2;
      (cube as any)._floatSpeed = 0.15 + Math.random() * 0.3;
      (cube as any)._baseY = pos[1];
      this.floatingCubes.push(cube);
      scene.add(cube);
    }

    // ═══ حلقة الرسم ═══
    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.three.animateParticles(this.particles, delta, 50);
      this.particles.rotation.y += delta * 0.01;

      this.orbs.forEach((orb, i) => {
        orb.position.y += Math.sin(elapsed * 0.1 + i * 2) * 0.1 * delta;
        const mat = orb.material as MeshStandardMaterial;
        mat.emissiveIntensity = 0.15 + Math.sin(elapsed * 0.5 + i) * 0.1;
      });

      this.icosahedrons.forEach((mesh) => {
        const rs = (mesh as any)._rotSpeed;
        mesh.rotation.x += rs.x;
        mesh.rotation.y += rs.y;
        mesh.position.y = (mesh as any)._baseY + Math.sin(elapsed * 0.2 + (mesh as any)._floatOffset) * 0.2;
      });

      this.floatingCubes.forEach(cube => {
        const rs = (cube as any)._rotSpeed;
        cube.rotation.x += rs.x;
        cube.rotation.y += rs.y;
        cube.rotation.z += rs.z;
        cube.position.y = (cube as any)._baseY + Math.sin(elapsed * (cube as any)._floatSpeed + (cube as any)._floatOffset) * 0.3;
      });

      const cam = managed.camera;
      cam.position.x += (this.mouseX * 0.3 - cam.position.x) * 0.01;
      cam.position.y += (-this.mouseY * 0.15 + 3 - cam.position.y) * 0.01;
      cam.lookAt(0, 0, 0);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // مشهد الصفحات العامة - خلفية بسيطة
  // ═══════════════════════════════════════════════════════════
  private buildPageScene(container: HTMLElement, isDark: boolean): void {
    const colors = isDark
      ? { bg: 0x0a0e1a, particle: 0x818cf8, grid1: 0x1e293b, grid2: 0x334155 }
      : { bg: 0xf8fafc, particle: 0x6366f1, grid1: 0xc7d2fe, grid2: 0xe0e7ff };

    const managed = this.three.createScene(this.sceneId, container, {
      clearColor: colors.bg,
      clearAlpha: isDark ? 0.4 : 0.1,
      pixelRatio: 1.0,
      camera: {
        fov: 50,
        position: [0, 2, 20],
        lookAt: [0, 0, 0],
      },
      ambient: { color: 0xffffff, intensity: 0.3 },
    });

    const { scene } = managed;

    // جسيمات مخفضة من 150 إلى 80
    this.particles = this.createStarField(80, 60, colors.particle);
    (this.particles.material as PointsMaterial).opacity = 0.2;
    (this.particles.material as PointsMaterial).size = 0.02;
    scene.add(this.particles);

    this.grid = this.three.createGridLines(100, 30, colors.grid1, colors.grid2);
    this.grid.position.y = -6;
    (this.grid.material as Material).opacity = 0.05;
    scene.add(this.grid);

    this.three.animate(this.sceneId, (delta, elapsed) => {
      this.three.animateParticles(this.particles, delta, 60);
      this.particles.rotation.y += delta * 0.005;

      const cam = managed.camera;
      cam.position.x += (this.mouseX * 0.15 - cam.position.x) * 0.008;
      cam.position.y += (-this.mouseY * 0.08 + 2 - cam.position.y) * 0.008;
      cam.lookAt(0, 0, 0);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // أدوات مساعدة
  // ═══════════════════════════════════════════════════════════

  private createStarField(count: number, spread: number, color: number): Points {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      velocities[i * 3] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.015;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.015;
    }

    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    (geo as any)._velocities = velocities;

    const mat = new PointsMaterial({
      color,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
      blending: AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });

    return new Points(geo, mat);
  }

  private createNebulaClouds(scene: Scene, colors: any, isDark: boolean): void {
    const nebulaColors = [colors.nebula1, colors.nebula2, colors.accent3];

    // مخفضة من 3 إلى 2
    for (let i = 0; i < 2; i++) {
      const geo = new PlaneGeometry(20 + i * 5, 15 + i * 3);
      const mat = new MeshBasicMaterial({
        color: nebulaColors[i],
        transparent: true,
        opacity: isDark ? 0.06 : 0.03,
        side: DoubleSide,
        blending: AdditiveBlending,
        depthWrite: false,
      });
      const cloud = new Mesh(geo, mat);
      cloud.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8,
        -15 - i * 5
      );
      cloud.rotation.z = Math.random() * Math.PI;
      this.nebulaClouds.push(cloud);
      scene.add(cloud);
    }
  }

  ngOnDestroy(): void {
    if (this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    this.three.destroyScene(this.sceneId);
  }
}
