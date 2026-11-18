import { useMemo } from "react";
import type { ThreeElements } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import {
  BufferGeometry,
  Float32BufferAttribute,
  CatmullRomCurve3,
  Vector3,
  SphereGeometry,
  TubeGeometry,
} from "three";
import type { Vec3 } from "./config";

export const curve = (points: Vec3[]) =>
  new CatmullRomCurve3(points.map((p) => new Vector3(...p)));

// An elliptical, tapered sweep with parallel-transport frames. Both ends close
// to a point: unlike cones, the entire silhouette follows the curved spine.
export function taperedSweep(points: Vec3[], width: number, depth: number) {
  const path = curve(points),
    segments = 40,
    sides = 14;
  const frames = path.computeFrenetFrames(segments, false);
  const vertices: number[] = [],
    indices: number[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments,
      center = path.getPointAt(t);
    const taper = Math.pow(Math.sin(Math.PI * t), 0.65) * (1 - 0.55 * t);
    for (let j = 0; j <= sides; j++) {
      const angle = (j / sides) * Math.PI * 2;
      const v = center
        .clone()
        .addScaledVector(frames.normals[i], Math.cos(angle) * width * taper)
        .addScaledVector(frames.binormals[i], Math.sin(angle) * depth * taper);
      vertices.push(v.x, v.y, v.z);
      if (i < segments && j < sides) {
        const a = i * (sides + 1) + j,
          b = a + sides + 1;
        indices.push(a, a + 1, b, b, a + 1, b + 1);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

export function sculptHead() {
  const geometry = new SphereGeometry(1, 80, 64);
  const p = geometry.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i),
      y = p.getY(i),
      z = p.getZ(i);
    const jaw = 1 - 0.21 * Math.pow(Math.max(0, -y), 1.1);
    const cheeks = Math.exp(-Math.pow((y + 0.25) / 0.3, 2));
    const front = Math.max(0, z);
    p.setXYZ(
      i,
      x * 0.82 * jaw,
      y * 0.96,
      z * 0.66 +
        front *
          0.045 *
          cheeks *
          Math.exp(-Math.pow((Math.abs(x) - 0.5) / 0.3, 2)),
    );
  }
  geometry.computeVertexNormals();
  return geometry;
}

// Thick, open-front jacket shell, with a gently curved waist and shoulders.
export function jacketShell() {
  const profile = curve([
    [0.64, 1.27, 0.34],
    [0.68, 1.55, 0.37],
    [0.68, 2.05, 0.38],
    [0.77, 2.47, 0.36],
    [0.65, 2.68, 0.31],
    [0.34, 2.81, 0.27],
  ]);
  const vertices: number[] = [],
    indices: number[] = [];
  const rows = 42,
    cols = 64;
  for (let layer = 0; layer < 2; layer++) {
    for (let i = 0; i <= rows; i++) {
      const p = profile.getPoint(i / rows);
      for (let j = 0; j <= cols; j++) {
        const angle = 0.6 + (j / cols) * (Math.PI * 2 - 1.2);
        vertices.push(
          Math.sin(angle) * (p.x - layer * 0.045),
          p.y,
          Math.cos(angle) * (p.z - layer * 0.045),
        );
      }
    }
  }
  const offset = (rows + 1) * (cols + 1);
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++) {
      const a = i * (cols + 1) + j,
        b = a + cols + 1;
      indices.push(
        a,
        b,
        a + 1,
        b,
        b + 1,
        a + 1,
        offset + a,
        offset + a + 1,
        offset + b,
        offset + b,
        offset + a + 1,
        offset + b + 1,
      );
    }
  for (let i = 0; i < rows; i++)
    for (const j of [0, cols]) {
      const a = i * (cols + 1) + j,
        b = a + cols + 1;
      indices.push(a, offset + a, b, b, offset + a, offset + b);
    }
  for (const i of [0, rows])
    for (let j = 0; j < cols; j++) {
      const a = i * (cols + 1) + j;
      indices.push(a, a + 1, offset + a, a + 1, offset + a + 1, offset + a);
    }
  const geo = new BufferGeometry();
  geo.setAttribute("position", new Float32BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

type EllipsoidProps = {
  position?: Vec3;
  scale: Vec3;
  color: string;
  roughness?: number;
} & Pick<ThreeElements["mesh"], "rotation">;
export function Ellipsoid({
  position,
  scale,
  color,
  rotation,
  roughness = 0.65,
}: EllipsoidProps) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 40, 32]} />
      <meshStandardMaterial color={color} roughness={roughness} />
    </mesh>
  );
}
export function Box({
  position,
  size,
  color,
  radius = 0.04,
  rotation,
  metalness = 0,
}: {
  position: Vec3;
  size: Vec3;
  color: string;
  radius?: number;
  rotation?: Vec3;
  metalness?: number;
}) {
  return (
    <RoundedBox
      position={position}
      args={size}
      radius={radius}
      smoothness={4}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        roughness={metalness ? 0.36 : 0.72}
        metalness={metalness}
      />
    </RoundedBox>
  );
}
export function Stroke({
  points,
  radius,
  color,
}: {
  points: Vec3[];
  radius: number;
  color: string;
}) {
  const geometry = useMemo(
    () => new TubeGeometry(curve(points), 36, radius, 10, false),
    [points, radius],
  );
  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <meshStandardMaterial color={color} roughness={0.65} />
    </mesh>
  );
}
