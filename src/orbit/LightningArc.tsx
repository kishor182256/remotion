import { useMemo } from "react";
import {
  AdditiveBlending,
  CatmullRomCurve3,
  TubeGeometry,
  Vector3,
} from "three";
import type { Vec3 } from "../boy/config";

const hash = (value: number) => {
  const x = Math.sin(value * 127.1) * 43758.5453;
  return x - Math.floor(x);
};

function makeLightningPath(start: Vec3, end: Vec3, seed: number) {
  const a = new Vector3(...start);
  const b = new Vector3(...end);
  const direction = b.clone().sub(a).normalize();
  const basisA = direction
    .clone()
    .cross(
      Math.abs(direction.y) > 0.88
        ? new Vector3(1, 0, 0)
        : new Vector3(0, 1, 0),
    )
    .normalize();
  const basisB = direction.clone().cross(basisA).normalize();
  const points = Array.from({ length: 17 }, (_, index) => {
    const u = index / 16;
    const envelope = Math.sin(Math.PI * u);
    const jitterA = (hash(seed + index * 3.17) - 0.5) * 0.34 * envelope;
    const jitterB = (hash(seed + index * 7.31 + 11) - 0.5) * 0.24 * envelope;
    return a
      .clone()
      .lerp(b, u)
      .addScaledVector(basisA, jitterA)
      .addScaledVector(basisB, jitterB);
  });
  return new CatmullRomCurve3(points);
}

export function LightningArc({
  start,
  end,
  amount,
  seed,
}: {
  start: Vec3;
  end: Vec3;
  amount: number;
  seed: number;
}) {
  const { core, glow } = useMemo(() => {
    const path = makeLightningPath(start, end, seed);
    return {
      core: new TubeGeometry(path, 72, 0.018, 8, false),
      glow: new TubeGeometry(path, 72, 0.065, 10, false),
    };
  }, [end, seed, start]);

  if (amount <= 0) return null;
  return (
    <group>
      <mesh geometry={glow}>
        <meshBasicMaterial
          color="#6fdcff"
          transparent
          opacity={0.22 * amount}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={core}>
        <meshBasicMaterial
          color="#f8ffff"
          transparent
          opacity={0.98 * amount}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        position={end}
        color="#9cecff"
        intensity={3.1 * amount}
        distance={3.2}
        decay={2}
      />
    </group>
  );
}

export function ImpactFlash({
  position,
  progress,
}: {
  position: Vec3;
  progress: number;
}) {
  if (progress < 0 || progress > 1) return null;
  const opacity = Math.pow(1 - progress, 1.8);
  return (
    <group position={position} scale={0.24 + progress * 0.78}>
      <mesh>
        <sphereGeometry args={[1, 24, 18]} />
        <meshBasicMaterial
          color="#efffff"
          transparent
          opacity={opacity * 0.68}
          blending={AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <pointLight
        color="#b8f2ff"
        intensity={5.2 * opacity}
        distance={4}
        decay={2}
      />
    </group>
  );
}
