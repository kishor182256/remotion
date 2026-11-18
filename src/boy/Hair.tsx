import { useMemo } from "react";
import { COLORS, type Vec3 } from "./config";
import { taperedSweep } from "./geometry";

const locks: { points: Vec3[]; width: number; depth: number }[] = [
  {
    points: [
      [0.55, 0.55, -0.05],
      [0.65, 0.93, 0.12],
      [0.2, 1.03, 0.27],
      [-0.25, 1.32, 0.04],
    ],
    width: 0.36,
    depth: 0.25,
  },
  {
    points: [
      [0.3, 0.76, -0.15],
      [0.04, 1.05, 0.05],
      [-0.48, 1.1, 0.1],
      [-0.62, 1.25, -0.05],
    ],
    width: 0.36,
    depth: 0.24,
  },
  {
    points: [
      [0.1, 0.7, -0.3],
      [-0.43, 0.9, -0.22],
      [-0.78, 0.96, -0.07],
      [-0.93, 1.02, -0.15],
    ],
    width: 0.3,
    depth: 0.2,
  },
  {
    points: [
      [0.38, 0.8, -0.35],
      [0.7, 0.92, -0.22],
      [0.86, 0.94, -0.08],
    ],
    width: 0.28,
    depth: 0.21,
  },
  {
    points: [
      [0.35, 0.83, 0.25],
      [0.66, 0.75, 0.4],
      [0.83, 0.4, 0.3],
      [0.97, 0.3, 0.08],
    ],
    width: 0.25,
    depth: 0.22,
  },
  {
    points: [
      [0.59, 0.66, 0.21],
      [0.81, 0.45, 0.19],
      [0.82, 0.03, 0.12],
    ],
    width: 0.22,
    depth: 0.19,
  },
  {
    points: [
      [-0.25, 0.8, 0.05],
      [-0.65, 0.65, 0.18],
      [-0.88, 0.28, 0.2],
      [-0.94, 0.36, 0.14],
    ],
    width: 0.26,
    depth: 0.22,
  },
  {
    points: [
      [-0.1, 0.83, 0.3],
      [-0.48, 0.75, 0.48],
      [-0.76, 0.36, 0.44],
      [-0.86, 0.16, 0.23],
    ],
    width: 0.3,
    depth: 0.22,
  },
  {
    points: [
      [0.26, 0.91, 0.28],
      [-0.1, 0.91, 0.56],
      [-0.46, 0.67, 0.66],
      [-0.76, 0.35, 0.48],
    ],
    width: 0.31,
    depth: 0.22,
  },
  {
    points: [
      [0.65, 0.76, 0.32],
      [0.42, 0.91, 0.55],
      [0.01, 0.66, 0.72],
      [-0.45, 0.36, 0.62],
    ],
    width: 0.33,
    depth: 0.2,
  },
  {
    points: [
      [0.57, 0.65, 0.35],
      [0.73, 0.4, 0.45],
      [0.77, -0.05, 0.25],
      [0.68, -0.2, 0.26],
    ],
    width: 0.16,
    depth: 0.16,
  },
];
export function Hair() {
  const geometries = useMemo(
    () => locks.map((l) => taperedSweep(l.points, l.width, l.depth)),
    [],
  );
  return (
    <group>
      <mesh position={[0, 0.22, -0.13]} scale={[0.85, 0.82, 0.63]} castShadow>
        <sphereGeometry args={[1, 64, 32, 0, Math.PI * 2, 0, Math.PI * 0.57]} />
        <meshStandardMaterial color={COLORS.hair} roughness={0.5} />
      </mesh>
      {geometries.map((geometry, i) => (
        <mesh key={i} geometry={geometry} castShadow receiveShadow>
          <meshStandardMaterial
            color={i % 3 === 0 ? COLORS.hairLight : COLORS.hair}
            roughness={0.46}
          />
        </mesh>
      ))}
    </group>
  );
}
