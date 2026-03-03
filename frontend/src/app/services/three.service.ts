import { Injectable, NgZone, inject } from '@angular/core';
import {
  Scene, PerspectiveCamera, WebGLRenderer, Clock, Vector2, Vector3,
  Raycaster, Object3D, Mesh, Points, Line, Sprite, SpriteMaterial,
  BufferGeometry, BufferAttribute, Material, MeshStandardMaterial,
  MeshPhysicalMaterial, MeshBasicMaterial, PointsMaterial, LineBasicMaterial,
  BoxGeometry, SphereGeometry, TorusGeometry, TorusKnotGeometry,
  ConeGeometry, OctahedronGeometry, DodecahedronGeometry, TetrahedronGeometry,
  IcosahedronGeometry, PlaneGeometry, CircleGeometry,
  AmbientLight, DirectionalLight, PointLight, Fog, FogExp2,
  GridHelper, LOD, Group, CanvasTexture,
  QuadraticBezierCurve3, AdditiveBlending, DoubleSide,
  PCFSoftShadowMap, ACESFilmicToneMapping,
} from 'three';

export interface SceneConfig {
  antialias?: boolean;
  alpha?: boolean;
  pixelRatio?: number;
  clearColor?: number;
  clearAlpha?: number;
  preserveDrawingBuffer?: boolean;
  fog?: { color: number; near: number; far: number };
  camera?: {
    fov?: number;
    near?: number;
    far?: number;
    position?: [number, number, number];
    lookAt?: [number, number, number];
  };
  ambient?: { color: number; intensity: number };
  directional?: { color: number; intensity: number; position: [number, number, number] };
}

export interface ManagedScene {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  animationId: number | null;
  clock: Clock;
  container: HTMLElement;
  /** هل المكون مرئي في viewport */
  isVisible: boolean;
  /** هل المشهد نشط (يرسم) */
  isActive: boolean;
}

export interface RaycastHit {
  object: Object3D;
  point: Vector3;
  distance: number;
  userData: any;
}

export interface TooltipConfig {
  text: string;
  x: number;
  y: number;
  color?: string;
  bgColor?: string;
}

@Injectable({ providedIn: 'root' })
export class ThreeService {
  private ngZone = inject(NgZone);
  private scenes = new Map<string, ManagedScene>();

  // ═══ Object Pool ═══
  private geometryPool = new Map<string, BufferGeometry[]>();
  private materialPool = new Map<string, Material[]>();

  // ═══ IntersectionObserver مشترك ═══
  private visibilityObserver: IntersectionObserver | null = null;
  private visibilityMap = new Map<HTMLElement, string>(); // container -> sceneId

  constructor() {
    this.initVisibilityObserver();
  }

  /** تهيئة IntersectionObserver لمراقبة رؤية المكونات */
  private initVisibilityObserver(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const sceneId = this.visibilityMap.get(entry.target as HTMLElement);
          if (!sceneId) return;
          const managed = this.scenes.get(sceneId);
          if (!managed) return;

          managed.isVisible = entry.isIntersecting;
          if (entry.isIntersecting && !managed.isActive) {
            managed.isActive = true;
            managed.clock.start();
          }
        });
      },
      { threshold: 0.05, rootMargin: '50px' }
    );
  }

  /** إنشاء مشهد ثري دي جديد وربطه بعنصر HTML */
  createScene(id: string, container: HTMLElement, config: SceneConfig = {}): ManagedScene {
    this.destroyScene(id);

    const {
      antialias = true,
      alpha = true,
      pixelRatio = Math.min(window.devicePixelRatio, 2),
      clearColor = 0x000000,
      clearAlpha = 0,
      preserveDrawingBuffer = false,
      fog,
      camera: camConfig = {},
      ambient,
      directional,
    } = config;

    const renderer = new WebGLRenderer({
      antialias,
      alpha,
      powerPreference: 'high-performance',
      preserveDrawingBuffer,
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(clearColor, clearAlpha);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = PCFSoftShadowMap;
    renderer.toneMapping = ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new Scene();
    if (fog) {
      scene.fog = new Fog(fog.color, fog.near, fog.far);
    }

    const aspect = container.clientWidth / container.clientHeight || 1;
    const camera = new PerspectiveCamera(
      camConfig.fov ?? 60, aspect, camConfig.near ?? 0.1, camConfig.far ?? 1000
    );
    const pos = camConfig.position ?? [0, 0, 5];
    camera.position.set(pos[0], pos[1], pos[2]);
    const lookAt = camConfig.lookAt ?? [0, 0, 0];
    camera.lookAt(new Vector3(lookAt[0], lookAt[1], lookAt[2]));

    if (ambient) {
      scene.add(new AmbientLight(ambient.color, ambient.intensity));
    }
    if (directional) {
      const dirLight = new DirectionalLight(directional.color, directional.intensity);
      dirLight.position.set(...directional.position);
      dirLight.castShadow = true;
      scene.add(dirLight);
    }

    const managed: ManagedScene = {
      scene, camera, renderer, animationId: null, clock: new Clock(),
      container, isVisible: true, isActive: true,
    };
    this.scenes.set(id, managed);

    // ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    resizeObserver.observe(container);
    (managed as any)._resizeObserver = resizeObserver;

    // IntersectionObserver - مراقبة الرؤية
    if (this.visibilityObserver) {
      this.visibilityMap.set(container, id);
      this.visibilityObserver.observe(container);
    }

    return managed;
  }

  /** تشغيل حلقة الرسم مع دعم الإيقاف عند عدم الرؤية */
  animate(id: string, callback: (delta: number, elapsed: number) => void): void {
    const managed = this.scenes.get(id);
    if (!managed) return;

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        managed.animationId = requestAnimationFrame(loop);

        // إيقاف الرسم إذا المكون غير مرئي
        if (!managed.isVisible) return;

        const delta = managed.clock.getDelta();
        const elapsed = managed.clock.getElapsedTime();
        callback(delta, elapsed);
        managed.renderer.render(managed.scene, managed.camera);
      };
      loop();
    });
  }

  /** إيقاف وتدمير مشهد مع تنظيف شامل */
  destroyScene(id: string): void {
    const managed = this.scenes.get(id);
    if (!managed) return;

    // إيقاف الرسم
    if (managed.animationId !== null) {
      cancelAnimationFrame(managed.animationId);
      managed.animationId = null;
    }

    // إيقاف ResizeObserver
    if ((managed as any)._resizeObserver) {
      (managed as any)._resizeObserver.disconnect();
      (managed as any)._resizeObserver = null;
    }

    // إيقاف IntersectionObserver
    if (this.visibilityObserver) {
      this.visibilityObserver.unobserve(managed.container);
      this.visibilityMap.delete(managed.container);
    }

    // تنظيف شامل لجميع الكائنات
    managed.scene.traverse((obj) => {
      if (obj instanceof Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => {
            this.disposeMaterial(m);
          });
        } else if (obj.material) {
          this.disposeMaterial(obj.material);
        }
      }
      if (obj instanceof Points) {
        obj.geometry?.dispose();
        this.disposeMaterial(obj.material as Material);
      }
      if (obj instanceof Line) {
        obj.geometry?.dispose();
        this.disposeMaterial(obj.material as Material);
      }
      if (obj instanceof Sprite) {
        (obj.material as SpriteMaterial)?.map?.dispose();
        this.disposeMaterial(obj.material as Material);
      }
    });

    // تنظيف المشهد
    managed.scene.clear();

    // تنظيف Renderer
    managed.renderer.dispose();
    managed.renderer.forceContextLoss();
    if (managed.renderer.domElement.parentNode) {
      managed.renderer.domElement.parentNode.removeChild(managed.renderer.domElement);
    }

    // إيقاف الساعة
    managed.clock.stop();

    // تنظيف camera animation
    (managed as any)._cameraAnimation = null;

    this.scenes.delete(id);
  }

  /** تنظيف Material بشكل شامل */
  private disposeMaterial(mat: Material): void {
    if (!mat) return;
    // تنظيف textures
    const m = mat as any;
    if (m.map) m.map.dispose();
    if (m.normalMap) m.normalMap.dispose();
    if (m.roughnessMap) m.roughnessMap.dispose();
    if (m.metalnessMap) m.metalnessMap.dispose();
    if (m.emissiveMap) m.emissiveMap.dispose();
    if (m.envMap) m.envMap.dispose();
    mat.dispose();
  }

  /** الحصول على مشهد */
  getScene(id: string): ManagedScene | undefined {
    return this.scenes.get(id);
  }

  // ═══════════════════════════════════════════════════════════
  // Raycasting & تفاعلية
  // ═══════════════════════════════════════════════════════════

  private raycaster = new Raycaster();
  private pointer = new Vector2();

  raycast(sceneId: string, event: MouseEvent, targets: Object3D[]): RaycastHit | null {
    const managed = this.scenes.get(sceneId);
    if (!managed) return null;

    const rect = managed.container.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.pointer, managed.camera);
    const intersects = this.raycaster.intersectObjects(targets, false);

    if (intersects.length > 0) {
      const hit = intersects[0];
      return {
        object: hit.object,
        point: hit.point,
        distance: hit.distance,
        userData: hit.object.userData,
      };
    }
    return null;
  }

  worldToScreen(sceneId: string, worldPos: Vector3): { x: number; y: number } | null {
    const managed = this.scenes.get(sceneId);
    if (!managed) return null;

    const vec = worldPos.clone().project(managed.camera);
    const rect = managed.container.getBoundingClientRect();
    return {
      x: ((vec.x + 1) / 2) * rect.width,
      y: ((-vec.y + 1) / 2) * rect.height,
    };
  }

  // ═══════════════════════════════════════════════════════════
  // تصدير المشهد كصورة — بدون preserveDrawingBuffer
  // ═══════════════════════════════════════════════════════════

  /** تصدير المشهد كصورة PNG عبر Canvas مؤقت */
  exportAsImage(sceneId: string, filename = 'chart.png'): void {
    const managed = this.scenes.get(sceneId);
    if (!managed) return;

    // إنشاء renderer مؤقت مع preserveDrawingBuffer
    const tempRenderer = new WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    const w = managed.container.clientWidth;
    const h = managed.container.clientHeight;
    tempRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    tempRenderer.setSize(w, h);
    tempRenderer.setClearColor(0x0f172a, 1);
    tempRenderer.toneMapping = ACESFilmicToneMapping;
    tempRenderer.toneMappingExposure = 1.2;

    // رسم إطار واحد
    tempRenderer.render(managed.scene, managed.camera);

    // تصدير
    tempRenderer.domElement.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');

    // تنظيف renderer المؤقت
    setTimeout(() => {
      tempRenderer.dispose();
      tempRenderer.forceContextLoss();
    }, 500);
  }

  getSceneDataURL(sceneId: string): string | null {
    const managed = this.scenes.get(sceneId);
    if (!managed) return null;

    const tempRenderer = new WebGLRenderer({
      antialias: true, alpha: true, preserveDrawingBuffer: true,
    });
    tempRenderer.setPixelRatio(1);
    tempRenderer.setSize(managed.container.clientWidth, managed.container.clientHeight);
    tempRenderer.render(managed.scene, managed.camera);
    const url = tempRenderer.domElement.toDataURL('image/png');
    tempRenderer.dispose();
    tempRenderer.forceContextLoss();
    return url;
  }

  // ═══════════════════════════════════════════════════════════
  // Object Pooling
  // ═══════════════════════════════════════════════════════════

  getPooledGeometry(key: string, factory: () => BufferGeometry): BufferGeometry {
    const pool = this.geometryPool.get(key);
    if (pool && pool.length > 0) {
      return pool.pop()!;
    }
    return factory();
  }

  returnGeometry(key: string, geo: BufferGeometry): void {
    if (!this.geometryPool.has(key)) {
      this.geometryPool.set(key, []);
    }
    this.geometryPool.get(key)!.push(geo);
  }

  clearPool(): void {
    this.geometryPool.forEach(pool => pool.forEach(g => g.dispose()));
    this.geometryPool.clear();
    this.materialPool.forEach(pool => pool.forEach(m => m.dispose()));
    this.materialPool.clear();
  }

  // ═══════════════════════════════════════════════════════════
  // Post-Processing Helpers
  // ═══════════════════════════════════════════════════════════

  addBloomLayer(scene: Scene, color: number, intensity: number): PointLight {
    const bloomLight = new PointLight(color, intensity, 50);
    bloomLight.position.set(0, 5, 0);
    scene.add(bloomLight);
    return bloomLight;
  }

  addVolumetricFog(scene: Scene, color: number, density: number): void {
    scene.fog = new FogExp2(color, density);
  }

  addRimLights(
    scene: Scene,
    colors: number[],
    intensity = 1.5
  ): PointLight[] {
    const lights: PointLight[] = [];
    const positions: [number, number, number][] = [
      [-8, 5, -5], [8, 5, -5], [0, -5, 8], [0, 8, 0],
    ];
    colors.forEach((color, i) => {
      const light = new PointLight(color, intensity, 30);
      const pos = positions[i % positions.length];
      light.position.set(...pos);
      scene.add(light);
      lights.push(light);
    });
    return lights;
  }

  // ═══════════════════════════════════════════════════════════
  // أشكال هندسية ثري دي جاهزة
  // ═══════════════════════════════════════════════════════════

  createGlowSphere(
    radius: number, color: number, emissiveIntensity = 0.5,
    position?: [number, number, number]
  ): Mesh {
    const geo = new SphereGeometry(radius, 32, 32);
    const mat = new MeshStandardMaterial({
      color, emissive: color, emissiveIntensity,
      metalness: 0.3, roughness: 0.4, transparent: true, opacity: 0.85,
    });
    const mesh = new Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  createGlassCube(
    size: number, color: number, position?: [number, number, number]
  ): Mesh {
    const geo = new BoxGeometry(size, size, size);
    const mat = new MeshPhysicalMaterial({
      color, metalness: 0.1, roughness: 0.05,
      transmission: 0.9, thickness: 0.5, transparent: true, opacity: 0.6,
    });
    const mesh = new Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  createGlowTorus(
    radius: number, tube: number, color: number,
    position?: [number, number, number]
  ): Mesh {
    const geo = new TorusGeometry(radius, tube, 16, 100);
    const mat = new MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.4,
      metalness: 0.6, roughness: 0.2, transparent: true, opacity: 0.7,
    });
    const mesh = new Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  createParticleSystem(
    count: number, spread: number, color: number, size = 0.05
  ): Points {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new BufferAttribute(positions, 3));
    (geo as any)._velocities = velocities;

    const mat = new PointsMaterial({
      color, size, transparent: true, opacity: 0.6,
      blending: AdditiveBlending, depthWrite: false,
    });
    return new Points(geo, mat);
  }

  animateParticles(particles: Points, delta: number, spread: number): void {
    const positions = particles.geometry.attributes['position'] as BufferAttribute;
    const velocities = (particles.geometry as any)._velocities as Float32Array;
    const arr = positions.array as Float32Array;
    const half = spread / 2;

    for (let i = 0; i < arr.length; i += 3) {
      arr[i] += velocities[i] * delta * 60;
      arr[i + 1] += velocities[i + 1] * delta * 60;
      arr[i + 2] += velocities[i + 2] * delta * 60;
      if (Math.abs(arr[i]) > half) arr[i] *= -0.9;
      if (Math.abs(arr[i + 1]) > half) arr[i + 1] *= -0.9;
      if (Math.abs(arr[i + 2]) > half) arr[i + 2] *= -0.9;
    }
    positions.needsUpdate = true;
  }

  createGridLines(
    size: number, divisions: number, color1: number, color2: number
  ): GridHelper {
    const grid = new GridHelper(size, divisions, color1, color2);
    (grid.material as Material).transparent = true;
    (grid.material as Material).opacity = 0.15;
    return grid;
  }

  createBar3D(
    width: number, height: number, depth: number,
    color: number, position: [number, number, number]
  ): Mesh {
    const geo = new BoxGeometry(width, height, depth);
    const mat = new MeshPhysicalMaterial({
      color, metalness: 0.3, roughness: 0.4,
      clearcoat: 0.5, clearcoatRoughness: 0.2,
    });
    const mesh = new Mesh(geo, mat);
    mesh.position.set(position[0], position[1] + height / 2, position[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  createTextSprite(
    text: string, color = '#ffffff', fontSize = 48,
    position?: [number, number, number]
  ): Sprite {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 512;
    canvas.height = 128;
    ctx.fillStyle = 'transparent';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `bold ${fontSize}px 'Tajawal', Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new CanvasTexture(canvas);
    const mat = new SpriteMaterial({
      map: texture, transparent: true, depthWrite: false,
    });
    const sprite = new Sprite(mat);
    sprite.scale.set(4, 1, 1);
    if (position) sprite.position.set(...position);
    return sprite;
  }

  createMultiLineTextSprite(
    lines: string[], color = '#ffffff', fontSize = 32,
    position?: [number, number, number], bgColor?: string
  ): Sprite {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    canvas.width = 512;
    canvas.height = 64 * Math.max(lines.length, 1);

    if (bgColor) {
      ctx.fillStyle = bgColor;
      const r = 12;
      ctx.beginPath();
      ctx.moveTo(r, 0);
      ctx.lineTo(canvas.width - r, 0);
      ctx.quadraticCurveTo(canvas.width, 0, canvas.width, r);
      ctx.lineTo(canvas.width, canvas.height - r);
      ctx.quadraticCurveTo(canvas.width, canvas.height, canvas.width - r, canvas.height);
      ctx.lineTo(r, canvas.height);
      ctx.quadraticCurveTo(0, canvas.height, 0, canvas.height - r);
      ctx.lineTo(0, r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.closePath();
      ctx.fill();
    }

    ctx.font = `bold ${fontSize}px 'Tajawal', Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = color;

    lines.forEach((line, i) => {
      const y = (canvas.height / (lines.length + 1)) * (i + 1);
      ctx.fillText(line, canvas.width / 2, y);
    });

    const texture = new CanvasTexture(canvas);
    const mat = new SpriteMaterial({
      map: texture, transparent: true, depthWrite: false,
    });
    const sprite = new Sprite(mat);
    const aspect = canvas.width / canvas.height;
    sprite.scale.set(4, 4 / aspect, 1);
    if (position) sprite.position.set(...position);
    return sprite;
  }

  createCurvedLine(
    start: Vector3, end: Vector3, color: number, height = 2
  ): Line {
    const mid = new Vector3().lerpVectors(start, end, 0.5);
    mid.y += height;
    const curve = new QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(50);
    const geo = new BufferGeometry().setFromPoints(points);
    const mat = new LineBasicMaterial({
      color, transparent: true, opacity: 0.6,
    });
    return new Line(geo, mat);
  }

  // ═══════════════════════════════════════════════════════════
  // أشكال متقدمة للرسوم البيانية المالية
  // ═══════════════════════════════════════════════════════════

  createWaterfallBar(
    width: number, height: number, depth: number,
    color: number, position: [number, number, number],
    isPositive: boolean
  ): Group {
    const group = new Group();

    const geo = new BoxGeometry(width, Math.abs(height), depth);
    const mat = new MeshPhysicalMaterial({
      color, metalness: 0.2, roughness: 0.3,
      clearcoat: 0.6, emissive: color, emissiveIntensity: 0.1,
      transparent: true, opacity: 0.9,
    });
    const bar = new Mesh(geo, mat);
    bar.castShadow = true;
    group.add(bar);

    const arrowGeo = new ConeGeometry(width * 0.3, width * 0.5, 8);
    const arrowMat = new MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      transparent: true, opacity: 0.8,
    });
    const arrow = new Mesh(arrowGeo, arrowMat);
    arrow.position.y = isPositive ? Math.abs(height) / 2 + width * 0.3 : -Math.abs(height) / 2 - width * 0.3;
    if (!isPositive) arrow.rotation.z = Math.PI;
    group.add(arrow);

    group.position.set(...position);
    return group;
  }

  createGauge(
    value: number, maxValue: number, radius: number,
    color: number, bgColor: number,
    position?: [number, number, number]
  ): Group {
    const group = new Group();
    const ratio = Math.min(value / maxValue, 1);

    const bgGeo = new TorusGeometry(radius, radius * 0.12, 16, 64, Math.PI);
    const bgMat = new MeshStandardMaterial({
      color: bgColor, transparent: true, opacity: 0.3,
      metalness: 0.5, roughness: 0.3,
    });
    const bgArc = new Mesh(bgGeo, bgMat);
    bgArc.rotation.z = Math.PI / 2;
    group.add(bgArc);

    const fgGeo = new TorusGeometry(radius, radius * 0.15, 16, 64, Math.PI * ratio);
    const fgMat = new MeshPhysicalMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      metalness: 0.4, roughness: 0.2, clearcoat: 0.8,
    });
    const fgArc = new Mesh(fgGeo, fgMat);
    fgArc.rotation.z = Math.PI / 2;
    group.add(fgArc);

    const needleGeo = new ConeGeometry(0.06, radius * 0.85, 8);
    const needleMat = new MeshStandardMaterial({
      color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.2,
    });
    const needle = new Mesh(needleGeo, needleMat);
    const needleAngle = Math.PI / 2 - Math.PI * ratio;
    needle.rotation.z = needleAngle;
    needle.position.x = Math.cos(needleAngle + Math.PI / 2) * radius * 0.4;
    needle.position.y = Math.sin(needleAngle + Math.PI / 2) * radius * 0.4;
    group.add(needle);

    const centerGeo = new SphereGeometry(radius * 0.08, 16, 16);
    const centerMat = new MeshStandardMaterial({
      color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5,
    });
    const center = new Mesh(centerGeo, centerMat);
    group.add(center);

    if (position) group.position.set(...position);
    return group;
  }

  createTreemapBlocks(
    data: { label: string; value: number; color: number }[],
    totalWidth: number, totalDepth: number, maxHeight: number
  ): Group {
    const group = new Group();
    const total = data.reduce((s, d) => s + d.value, 0);
    if (total === 0) return group;

    const sorted = [...data].sort((a, b) => b.value - a.value);
    let currentX = -totalWidth / 2;
    let currentZ = -totalDepth / 2;
    let remainingWidth = totalWidth;
    let remainingDepth = totalDepth;
    let remainingTotal = total;
    let isHorizontal = true;

    sorted.forEach((item, i) => {
      const ratio = item.value / remainingTotal;
      const height = (item.value / total) * maxHeight + 0.2;

      let w: number, d: number, x: number, z: number;

      if (isHorizontal) {
        w = remainingWidth * ratio;
        d = remainingDepth * 0.5;
        x = currentX + w / 2;
        z = currentZ + d / 2;
        currentX += w;
        if (i % 2 === 1) {
          currentX = -totalWidth / 2;
          currentZ += d;
          remainingDepth -= d;
          isHorizontal = !isHorizontal;
        }
      } else {
        w = remainingWidth * 0.5;
        d = remainingDepth * ratio;
        x = currentX + w / 2;
        z = currentZ + d / 2;
        currentZ += d;
        if (i % 2 === 1) {
          currentZ = -totalDepth / 2 + (totalDepth - remainingDepth);
          currentX += w;
          remainingWidth -= w;
          isHorizontal = !isHorizontal;
        }
      }

      remainingTotal -= item.value;

      const geo = new BoxGeometry(
        Math.max(w - 0.1, 0.1), height, Math.max(d - 0.1, 0.1)
      );
      const mat = new MeshPhysicalMaterial({
        color: item.color, metalness: 0.2, roughness: 0.3,
        clearcoat: 0.6, emissive: item.color, emissiveIntensity: 0.1,
      });
      const block = new Mesh(geo, mat);
      block.position.set(x, height / 2, z);
      block.castShadow = true;
      block.userData = { label: item.label, value: item.value };
      group.add(block);
    });

    return group;
  }

  // ═══════════════════════════════════════════════════════════
  // LOD (Level of Detail)
  // ═══════════════════════════════════════════════════════════

  createLOD(levels: { mesh: Mesh; distance: number }[]): LOD {
    const lod = new LOD();
    levels.forEach(level => {
      lod.addLevel(level.mesh, level.distance);
    });
    return lod;
  }

  createLODSphere(
    radius: number, color: number, emissiveIntensity = 0.5,
    position?: [number, number, number]
  ): LOD {
    const mat = new MeshStandardMaterial({
      color, emissive: color, emissiveIntensity,
      metalness: 0.3, roughness: 0.4, transparent: true, opacity: 0.85,
    });

    const highMesh = new Mesh(new SphereGeometry(radius, 32, 32), mat);
    const medMesh = new Mesh(new SphereGeometry(radius, 16, 16), mat);
    const lowMesh = new Mesh(new SphereGeometry(radius, 8, 8), mat);

    const lod = this.createLOD([
      { mesh: highMesh, distance: 0 },
      { mesh: medMesh, distance: 15 },
      { mesh: lowMesh, distance: 30 },
    ]);

    if (position) lod.position.set(...position);
    return lod;
  }

  // ═══════════════════════════════════════════════════════════
  // Presentation Mode
  // ═══════════════════════════════════════════════════════════

  animateCameraTo(
    sceneId: string,
    targetPos: Vector3,
    targetLookAt: Vector3,
    duration: number,
    onComplete?: () => void
  ): void {
    const managed = this.scenes.get(sceneId);
    if (!managed) return;

    const startPos = managed.camera.position.clone();
    const startTime = managed.clock.getElapsedTime();

    const moveCamera = () => {
      const elapsed = managed.clock.getElapsedTime() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      managed.camera.position.lerpVectors(startPos, targetPos, eased);
      managed.camera.lookAt(targetLookAt);

      if (progress >= 1) {
        onComplete?.();
      }
    };

    (managed as any)._cameraAnimation = moveCamera;
  }
}
