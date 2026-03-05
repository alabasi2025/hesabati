/**
 * تمديد أنواع Three.js لخصائص مخصصة على الـ meshes (تجنب استخدام as any)
 */
import type * as THREE from 'three';

export interface ExtendedMesh extends THREE.Mesh {
  userData: THREE.Mesh['userData'] & {
    velocity?: THREE.Vector3;
    originalY?: number;
    targetY?: number;
    [key: string]: unknown;
  };
}

export interface ExtendedObject3D extends THREE.Object3D {
  userData: THREE.Object3D['userData'] & {
    [key: string]: unknown;
  };
}

export interface RotationSpeed {
  x: number;
  y: number;
  z?: number;
}

export interface AnimatedMeshState {
  _origEmissive?: number;
  _targetHeight?: number;
  _currentHeight?: number;
  _growing?: boolean;
  _isHovered?: boolean;
  _growDelay?: number;
  _growStarted?: boolean;
  _reflection?: THREE.Mesh;
  _baseY?: number;
  _isPositive?: boolean;
  _targetY?: number;
  _entryDelay?: number;
  _entered?: boolean;
  _midAngle?: number;
  _rotSpeed?: RotationSpeed;
  _floatOffset?: number;
  _floatSpeed?: number;
  _basePos?: THREE.Vector3;
}

export interface ChartUserData<TData extends Record<string, unknown> = Record<string, unknown>> {
  chartItem?: TData;
  chartIndex?: number;
}

export type ExtendedMeshWithState<TData extends Record<string, unknown> = Record<string, unknown>> = ExtendedMesh &
  AnimatedMeshState & {
    userData: THREE.Mesh['userData'] & ChartUserData<TData>;
  };

export type ExtendedBufferGeometry = THREE.BufferGeometry & {
  _velocities?: Float32Array;
};
