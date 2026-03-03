import { Injectable, NgZone, inject } from '@angular/core';
import * as THREE from 'three';

export interface SceneConfig {
  antialias?: boolean;
  alpha?: boolean;
  pixelRatio?: number;
  clearColor?: number;
  clearAlpha?: number;
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

@Injectable({ providedIn: 'root' })
export class ThreeService {
  private ngZone = inject(NgZone);
  private scenes = new Map<string, ManagedScene>();

  /** إنشاء مشهد ثري دي جديد وربطه بعنصر HTML */
  createScene(id: string, container: HTMLElement, config: SceneConfig = {}): ManagedScene {
    // تنظيف المشهد القديم إن وجد
    this.destroyScene(id);

    const {
      antialias = true,
      alpha = true,
      pixelRatio = Math.min(window.devicePixelRatio, 2),
      clearColor = 0x000000,
      clearAlpha = 0,
      fog,
      camera: camConfig = {},
      ambient,
      directional,
    } = config;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias,
      alpha,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(clearColor, clearAlpha);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Scene
    const scene = new THREE.Scene();
    if (fog) {
      scene.fog = new THREE.Fog(fog.color, fog.near, fog.far);
    }

    // Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(
      camConfig.fov ?? 60,
      aspect,
      camConfig.near ?? 0.1,
      camConfig.far ?? 1000
    );
    const pos = camConfig.position ?? [0, 0, 5];
    camera.position.set(pos[0], pos[1], pos[2]);
    const lookAt = camConfig.lookAt ?? [0, 0, 0];
    camera.lookAt(new THREE.Vector3(lookAt[0], lookAt[1], lookAt[2]));

    // Lights
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
      scene,
      camera,
      renderer,
      animationId: null,
      clock: new THREE.Clock(),
      container,
    };
    this.scenes.set(id, managed);

    // Resize observer
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

    // تنظيف ResizeObserver
    if ((managed as any)._resizeObserver) {
      (managed as any)._resizeObserver.disconnect();
    }

    // تنظيف الكائنات
    managed.scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach(m => m.dispose());
        } else {
          obj.material?.dispose();
        }
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
  // أشكال هندسية ثري دي جاهزة
  // ═══════════════════════════════════════════════════════════

  /** إنشاء كرة متوهجة */
  createGlowSphere(
    radius: number,
    color: number,
    emissiveIntensity = 0.5,
    position?: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.SphereGeometry(radius, 32, 32);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity,
      metalness: 0.3,
      roughness: 0.4,
      transparent: true,
      opacity: 0.85,
    });
    const mesh = new THREE.Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  /** إنشاء مكعب زجاجي */
  createGlassCube(
    size: number,
    color: number,
    position?: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(size, size, size);
    const mat = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.6,
    });
    const mesh = new THREE.Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  /** إنشاء حلقة متوهجة (Torus) */
  createGlowTorus(
    radius: number,
    tube: number,
    color: number,
    position?: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.TorusGeometry(radius, tube, 16, 100);
    const mat = new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.4,
      metalness: 0.6,
      roughness: 0.2,
      transparent: true,
      opacity: 0.7,
    });
    const mesh = new THREE.Mesh(geo, mat);
    if (position) mesh.position.set(...position);
    return mesh;
  }

  /** إنشاء نظام جسيمات */
  createParticleSystem(
    count: number,
    spread: number,
    color: number,
    size = 0.05
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
      color,
      size,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
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

      // إعادة الجسيمات عند الخروج من النطاق
      if (Math.abs(arr[i]) > half) arr[i] *= -0.9;
      if (Math.abs(arr[i + 1]) > half) arr[i + 1] *= -0.9;
      if (Math.abs(arr[i + 2]) > half) arr[i + 2] *= -0.9;
    }
    positions.needsUpdate = true;
  }

  /** إنشاء خطوط شبكية متوهجة */
  createGridLines(
    size: number,
    divisions: number,
    color1: number,
    color2: number
  ): THREE.GridHelper {
    const grid = new THREE.GridHelper(size, divisions, color1, color2);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.15;
    return grid;
  }

  /** إنشاء عمود بياني ثري دي */
  createBar3D(
    width: number,
    height: number,
    depth: number,
    color: number,
    position: [number, number, number]
  ): THREE.Mesh {
    const geo = new THREE.BoxGeometry(width, height, depth);
    const mat = new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.3,
      roughness: 0.4,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(position[0], position[1] + height / 2, position[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  }

  /** إنشاء نص ثري دي بسيط (باستخدام Sprite) */
  createTextSprite(
    text: string,
    color = '#ffffff',
    fontSize = 48,
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
      map: texture,
      transparent: true,
      depthWrite: false,
    });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(4, 1, 1);
    if (position) sprite.position.set(...position);
    return sprite;
  }

  /** إنشاء خط منحني بين نقطتين */
  createCurvedLine(
    start: THREE.Vector3,
    end: THREE.Vector3,
    color: number,
    height = 2
  ): THREE.Line {
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5);
    mid.y += height;
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(50);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.6,
    });
    return new THREE.Line(geo, mat);
  }
}
