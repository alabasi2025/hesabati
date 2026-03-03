import { Injectable, NgZone, inject } from '@angular/core';
import * as THREE from 'three';

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
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  animationId: number | null;
  clock: THREE.Clock;
  container: HTMLElement;
}

/** بيانات Raycasting */
export interface RaycastHit {
  object: THREE.Object3D;
  point: THREE.Vector3;
  distance: number;
  userData: any;
}

/** إعدادات Tooltip */
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
  private geometryPool = new Map<string, THREE.BufferGeometry[]>();
  private materialPool = new Map<string, THREE.Material[]>();

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

    const renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      powerPreference: 'high-performance',
      preserveDrawingBuffer,
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(clearColor, clearAlpha);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    if (fog) {
      scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
    }

    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      camConfig.fov ?? 60, aspect, camConfig.near ?? 0.1, camConfig.far ?? 1000
    );
    const pos = camConfig.position ?? [0, 0, 5];
    camera.position.set(pos[0], pos[1], pos[2]);
    const lookAt = camConfig.lookAt ?? [0, 0, 0];
    camera.lookAt(new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2]));

    if (ambient) {
      scene.add(new THREE.AmbientLight(ambient.color, ambient.intensity));
    }
    if (directional) {
      const dirLight = new THREE.DirectionalLight(directional.color, directional.intensity);
      dirLight.position.set(...directional.position);
      dirLight.castShadow = true;
      scene.add(dirLight);
    }

    const managed: ManagedScene = {
      scene, camera, renderer, animationId: null, clock: new THREE.Clock(), container,
    };
    this.scenes.set(id, managed);

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

    return managed;
  }

  /** تشغيل حلقة الرسم */
  animate(id: string, callback: (delta: number, elapsed: number) => void): void {
    const managed = this.scenes.get(id);
    if (!managed) return;

    this.ngZone.runOutsideAngular(() => {
      const loop = () => {
        managed.animationId = requestAnimationFrame(loop);
        const delta = managed.clock.getDelta();
        const elapsed = managed.clock.getElapsedTime();
        callback(delta, elapsed);
        managed.renderer.render(managed.scene, managed.camera);
      };
      loop();
    });
  }

  /** إيقاف وتدمير مشهد */
  destroyScene(id: string): void {
    const managed = this.scenes.get(id);
    if (!managed) return;

    if (managed.animationId !== null) {
      cancelAnimationFrame(managed.animationId);
    }

    if ((managed as any)._resizeObserver) {
      (managed as any)._resizeObserver.disconnect();
    }

    managed.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
      if (obj instanceof THREE.Points) {
        obj.geometry?.dispose();
        (obj.material as THREE.Material)?.dispose();
      }
      if (obj instanceof THREE.Line) {
        obj.geometry?.dispose();
        (obj.material as THREE.Material)?.dispose();
      }
      if (obj instanceof THREE.Sprite) {
        (obj.material as THREE.SpriteMaterial)?.map?.dispose();
        (obj.material as THREE.Material)?.dispose();
      }
    });

    managed.renderer.dispose();
    if (managed.renderer.domElement.parentNode) {
      managed.renderer.domElement.parentNode.removeChild(managed.renderer.domElement);
    }

    this.scenes.delete(id);
  }

  /** الحصول على مشهد */
  getScene(id: string): ManagedScene | undefined {
    return this.scenes.get(id);
  }

  // ═══════════════════════════════════════════════════════════
  // Raycasting & تفاعلية
  // ═══════════════════════════════════════════════════════════

  private raycaster = new THREE.Raycaster();
  private pointer = new THREE.Vector2();

  /** فحص Raycast على كائنات محددة */
  raycast(
    sceneId: string,
    event: MouseEvent,
    targets: THREE.Object3D[]
  ): RaycastHit | null {
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

  /** تحويل إحداثيات ثلاثية الأبعاد إلى إحداثيات شاشة */
  worldToScreen(sceneId: string, worldPos: THREE.Vector3): { x: number; y: number } | null {
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
  // تصدير المشهد كصورة
  // ═══════════════════════════════════════════════════════════

  /** تصدير المشهد الحالي كصورة PNG */
  exportAsImage(sceneId: string, filename = 'chart.png'): void {
    const managed = this.scenes.get(sceneId);
    if (!managed) return;

    // إعادة الرسم مع preserveDrawingBuffer
    managed.renderer.render(managed.scene, managed.camera);

    const canvas = managed.renderer.domElement;
    canvas.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
  }

  /** الحصول على DataURL للمشهد */
  getSceneDataURL(sceneId: string): string | null {
    const managed = this.scenes.get(sceneId);
    if (!managed) return null;

    managed.renderer.render(managed.scene, managed.camera);
    return managed.renderer.domElement.toDataURL('image/png');
  }

  // ═══════════════════════════════════════════════════════════
  // Object Pooling
  // ═══════════════════════════════════════════════════════════

  /** الحصول على geometry من المخزن أو إنشاء جديد */
  getPooledGeometry(key: string, factory: () => THREE.BufferGeometry): THREE.BufferGeometry {
    const pool = this.geometryPool.get(key);
    if (pool && pool.length > 0) {
      return pool.pop()!;
    }
    return factory();
  }

  /** إعادة geometry إلى المخزن */
  returnGeometry(key: string, geo: THREE.BufferGeometry): void {
    if (!this.geometryPool.has(key)) {
      this.geometryPool.set(key, []);
    }
    this.geometryPool.get(key)!.push(geo);
  }

  /** تنظيف المخزن */
  clearPool(): void {
    this.geometryPool.forEach(pool => pool.forEach(g => g.dispose()));
    this.geometryPool.clear();
    this.materialPool.forEach(pool => pool.forEach(m => m.dispose()));
    this.materialPool.clear();
  }

  // ═══════════════════════════════════════════════════════════
  // Post-Processing Helpers
  // ═══════════════════════════════════════════════════════════

  /** إضافة تأثير Bloom يدوي عبر طبقة إضافية */
  addBloomLayer(scene: THREE.Scene, color: number, intensity: number): THREE.PointLight {
    const bloomLight = new THREE.PointLight(color, intensity, 50);
    bloomLight.position.set(0, 5, 0);
    scene.add(bloomLight);
    return bloomLight;
  }

  /** إضافة ضباب حجمي (Volumetric Fog) */
  addVolumetricFog(scene: THREE.Scene, color: number, density: number): void {
    scene.fog = new THREE.FogExp2(color, density);
  }

  /** إضافة أضواء Rim للتوهج */
  addRimLights(scene: THREE.Scene, colors: number[], intensity: number): THREE.PointLight[] {
    const lights: THREE.PointLight[] = [];
    const positions: [number, number, number][] = [
      [-8, 5, -5], [8, 5, -5], [0, -5, 8], [0, 8, 0],
    ];
    colors.forEach((color, i) => {
      const light = new THREE.PointLight(color, intensity, 30);
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

  /** إنشاء كرة متوهجة */
  createGlowSphere(
    radius: number, color: number, emissiveIntensity = 0.5,
    position?: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.SphereGeometry(radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity,
      metalness: 0.3, roughness: 0.4, transparent: true, opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  /** إنشاء مكعب زجاجي */
  createGlassCube(
    size: number, color: number, position?: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshPhysicalMaterial({
      color, metalness: 0.1, roughness: 0.05,
      transmission: 0.9, thickness: 0.5, transparent: true, opacity: 0.6,
    });
    const mesh = new THREE.Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  /** إنشاء حلقة متوهجة (Torus) */
  createGlowTorus(
    radius: number, tube: number, color: number,
    position?: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.TorusGeometry(radius, tube, 16, 100);
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.4,
      metalness: 0.6, roughness: 0.2, transparent: true, opacity: 0.7,
    });
    const mesh = new THREE.Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  /** إنشاء نظام جسيمات */
  createParticleSystem(
    count: number, spread: number, color: number, size = 0.05
  ): THREE.Points {
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
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    (geo as any)._velocities = velocities;

    const mat = new THREE.PointsMaterial({
      color, size, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    return new THREE.Points(geo, mat);
  }

  /** تحريك نظام الجسيمات */
  animateParticles(particles: THREE.Points, delta: number, spread: number): void {
    const positions = particles.geometry.attributes['position'] as THREE.BufferAttribute;
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

  /** إنشاء خطوط شبكية متوهجة */
  createGridLines(
    size: number, divisions: number, color1: number, color2: number
  ): THREE.GridHelper {
    const grid = new THREE.GridHelper(size, divisions, color1, color2);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.15;
    return grid;
  }

  /** إنشاء عمود بياني ثري دي */
  createBar3D(
    width: number, height: number, depth: number,
    color: number, position: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshPhysicalMaterial({
      color, metalness: 0.3, roughness: 0.4,
      clearcoat: 0.5, clearcoatRoughness: 0.2,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(position[0], position[1] + height / 2, position[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /** إنشاء نص ثري دي بسيط (باستخدام Sprite) */
  createTextSprite(
    text: string, color = '#ffffff', fontSize = 48,
    position?: [number, number, number]
  ): THREE.Sprite {
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

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({
      map: texture, transparent: true, depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(4, 1, 1);
    if (position) sprite.position.set(...position);
    return sprite;
  }

  /** إنشاء نص ثري دي متعدد الأسطر */
  createMultiLineTextSprite(
    lines: string[], color = '#ffffff', fontSize = 32,
    position?: [number, number, number], bgColor?: string
  ): THREE.Sprite {
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

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({
      map: texture, transparent: true, depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    const aspect = canvas.width / canvas.height;
    sprite.scale.set(4, 4 / aspect, 1);
    if (position) sprite.position.set(...position);
    return sprite;
  }

  /** إنشاء خط منحني بين نقطتين */
  createCurvedLine(
    start: THREE.Vector3, end: THREE.Vector3, color: number, height = 2
  ): THREE.Line {
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    mid.y += height;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(50);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color, transparent: true, opacity: 0.6,
    });
    return new THREE.Line(geo, mat);
  }

  // ═══════════════════════════════════════════════════════════
  // أشكال متقدمة للرسوم البيانية المالية
  // ═══════════════════════════════════════════════════════════

  /** إنشاء عمود Waterfall (صعود/هبوط) */
  createWaterfallBar(
    width: number, height: number, depth: number,
    color: number, position: [number, number, number],
    isPositive: boolean
  ): THREE.Group {
    const group = new THREE.Group();

    const geo = new THREE.BoxGeometry(width, Math.abs(height), depth);
    const mat = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.2,
      roughness: 0.3,
      clearcoat: 0.6,
      emissive: color,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.9,
    });
    const bar = new THREE.Mesh(geo, mat);
    bar.castShadow = true;
    group.add(bar);

    // سهم اتجاه
    const arrowGeo = new THREE.ConeGeometry(width * 0.3, width * 0.5, 8);
    const arrowMat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      transparent: true, opacity: 0.8,
    });
    const arrow = new THREE.Mesh(arrowGeo, arrowMat);
    arrow.position.y = isPositive ? Math.abs(height) / 2 + width * 0.3 : -Math.abs(height) / 2 - width * 0.3;
    if (!isPositive) arrow.rotation.z = Math.PI;
    group.add(arrow);

    group.position.set(...position);
    return group;
  }

  /** إنشاء مقياس Gauge */
  createGauge(
    value: number, maxValue: number, radius: number,
    color: number, bgColor: number,
    position?: [number, number, number]
  ): THREE.Group {
    const group = new THREE.Group();
    const ratio = Math.min(value / maxValue, 1);

    // القوس الخلفي (180 درجة)
    const bgGeo = new THREE.TorusGeometry(radius, radius * 0.12, 16, 64, Math.PI);
    const bgMat = new THREE.MeshStandardMaterial({
      color: bgColor, transparent: true, opacity: 0.3,
      metalness: 0.5, roughness: 0.3,
    });
    const bgArc = new THREE.Mesh(bgGeo, bgMat);
    bgArc.rotation.z = Math.PI / 2;
    group.add(bgArc);

    // القوس الأمامي (حسب القيمة)
    const fgGeo = new THREE.TorusGeometry(radius, radius * 0.15, 16, 64, Math.PI * ratio);
    const fgMat = new THREE.MeshPhysicalMaterial({
      color, emissive: color, emissiveIntensity: 0.3,
      metalness: 0.4, roughness: 0.2, clearcoat: 0.8,
    });
    const fgArc = new THREE.Mesh(fgGeo, fgMat);
    fgArc.rotation.z = Math.PI / 2;
    group.add(fgArc);

    // إبرة المؤشر
    const needleGeo = new THREE.ConeGeometry(0.06, radius * 0.85, 8);
    const needleMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.2,
    });
    const needle = new THREE.Mesh(needleGeo, needleMat);
    const needleAngle = Math.PI / 2 - Math.PI * ratio;
    needle.rotation.z = needleAngle;
    needle.position.x = Math.cos(needleAngle + Math.PI / 2) * radius * 0.4;
    needle.position.y = Math.sin(needleAngle + Math.PI / 2) * radius * 0.4;
    group.add(needle);

    // نقطة المركز
    const centerGeo = new THREE.SphereGeometry(radius * 0.08, 16, 16);
    const centerMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 0.5,
    });
    const center = new THREE.Mesh(centerGeo, centerMat);
    group.add(center);

    if (position) group.position.set(...position);
    return group;
  }

  /** إنشاء Treemap ثلاثي الأبعاد */
  createTreemapBlocks(
    data: { label: string; value: number; color: number }[],
    totalWidth: number, totalDepth: number, maxHeight: number
  ): THREE.Group {
    const group = new THREE.Group();
    const total = data.reduce((s, d) => s + d.value, 0);
    if (total === 0) return group;

    // خوارزمية Squarified Treemap مبسطة
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

      const geo = new THREE.BoxGeometry(
        Math.max(w - 0.1, 0.1),
        height,
        Math.max(d - 0.1, 0.1)
      );
      const mat = new THREE.MeshPhysicalMaterial({
        color: item.color,
        metalness: 0.2,
        roughness: 0.3,
        clearcoat: 0.6,
        emissive: item.color,
        emissiveIntensity: 0.1,
      });
      const block = new THREE.Mesh(geo, mat);
      block.position.set(x, height / 2, z);
      block.castShadow = true;
      block.userData = { label: item.label, value: item.value };
      group.add(block);
    });

    return group;
  }

  // ═══════════════════════════════════════════════════════════
  // LOD (Level of Detail) Support
  // ═══════════════════════════════════════════════════════════

  /** إنشاء كائن LOD مع مستويات تفصيل مختلفة */
  createLOD(
    levels: { mesh: THREE.Mesh; distance: number }[]
  ): THREE.LOD {
    const lod = new THREE.LOD();
    levels.forEach(level => {
      lod.addLevel(level.mesh, level.distance);
    });
    return lod;
  }

  /** إنشاء كرة مع LOD */
  createLODSphere(
    radius: number, color: number, emissiveIntensity = 0.5,
    position?: [number, number, number]
  ): THREE.LOD {
    const mat = new THREE.MeshStandardMaterial({
      color, emissive: color, emissiveIntensity,
      metalness: 0.3, roughness: 0.4, transparent: true, opacity: 0.85,
    });

    const highMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 32, 32), mat);
    const medMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 16, 16), mat);
    const lowMesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 8, 8), mat);

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

  /** تحريك الكاميرا بسلاسة إلى موقع جديد */
  animateCameraTo(
    sceneId: string,
    targetPos: THREE.Vector3,
    targetLookAt: THREE.Vector3,
    duration: number,
    onComplete?: () => void
  ): void {
    const managed = this.scenes.get(sceneId);
    if (!managed) return;

    const startPos = managed.camera.position.clone();
    const startTime = managed.clock.getElapsedTime();

    const originalAnimate = managed.animationId;

    const moveCamera = () => {
      const elapsed = managed.clock.getElapsedTime() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease in-out cubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      managed.camera.position.lerpVectors(startPos, targetPos, eased);
      managed.camera.lookAt(targetLookAt);

      if (progress >= 1) {
        onComplete?.();
      }
    };

    // تخزين دالة تحريك الكاميرا في المشهد
    (managed as any)._cameraAnimation = moveCamera;
  }
}
