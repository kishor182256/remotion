import { useMemo } from "react";
import { Color, Vector3 } from "three";
import type { Vec3 } from "../boy/config";

const hash = (value: number) => {
  const x = Math.sin(value * 91.3458) * 47453.5453;
  return x - Math.floor(x);
};

type Fragment = {
  direction: Vec3;
  rotation: Vec3;
  size: number;
  speed: number;
  color: string;
};

export function ExplosionFragments({
  position,
  progress,
  seed,
  color,
  assetScale,
}: {
  position: Vec3;
  progress: number;
  seed: number;
  color: string;
  assetScale: number;
}) {
  const fragments = useMemo<Fragment[]>(() => {
    const base = new Color(color);
    return Array.from({ length: 24 }, (_, index) => {
      const azimuth = hash(seed * 41 + index * 5.1) * Math.PI * 2;
      const elevation = (hash(seed * 79 + index * 8.7) - 0.42) * Math.PI;
      const direction = new Vector3(
        Math.cos(azimuth) * Math.cos(elevation),
        Math.sin(elevation),
        Math.sin(azimuth) * Math.cos(elevation),
      ).normalize();
      const tint = base
        .clone()
        .lerp(
          new Color(index % 4 === 0 ? "#ffffff" : "#5f4f8a"),
          index % 4 === 0 ? 0.36 : 0.13,
        );
      return {
        direction: [direction.x, direction.y, direction.z],
        rotation: [
          hash(seed + index * 13) * Math.PI * 2,
          hash(seed + index * 17) * Math.PI * 2,
          hash(seed + index * 23) * Math.PI * 2,
        ],
        size: 0.06 + hash(seed + index * 29) * 0.085,
        speed: 0.72 + hash(seed + index * 31) * 1.35,
        color: `#${tint.getHexString()}`,
      };
    });
  }, [color, seed]);

  if (progress <= 0 || progress >= 1) return null;
  const opacity = Math.pow(1 - progress, 1.35);
  return (
    <group position={position}>
      {fragments.map((fragment, index) => {
        const travel = fragment.speed * (0.18 + progress * 1.78);
        const x = fragment.direction[0] * travel;
        const y =
          fragment.direction[1] * travel +
          0.18 * progress -
          0.62 * progress * progress;
        const z = fragment.direction[2] * travel;
        return (
          <mesh
            key={index}
            position={[x, y, z]}
            rotation={[
              fragment.rotation[0] + progress * (2.4 + index * 0.03),
              fragment.rotation[1] - progress * (1.8 + index * 0.025),
              fragment.rotation[2] + progress * 2.1,
            ]}
            scale={fragment.size * assetScale * (1 - progress * 0.28)}
            castShadow
          >
            {index % 3 === 0 ? (
              <tetrahedronGeometry args={[1, 0]} />
            ) : (
              <boxGeometry args={[1.2, 0.72, 0.58]} />
            )}
            <meshStandardMaterial
              color={fragment.color}
              emissive={fragment.color}
              emissiveIntensity={0.13}
              roughness={0.38}
              transparent
              opacity={opacity}
              depthWrite={opacity > 0.55}
            />
          </mesh>
        );
      })}
    </group>
  );
}
