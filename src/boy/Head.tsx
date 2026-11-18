import { useMemo } from "react";
import { COLORS } from "./config";
import { Ellipsoid, sculptHead, Stroke } from "./geometry";
import { Eyes } from "./Eyes";
import { Hair } from "./Hair";

export function Head({ openness }: { openness: number }) {
  const geometry = useMemo(sculptHead, []);
  return (
    <group>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshStandardMaterial color={COLORS.skin} roughness={0.73} />
      </mesh>
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 0.8, -0.17, -0.015]}
          rotation={[0, side * -0.25, side * -0.12]}
        >
          <Ellipsoid scale={[0.195, 0.285, 0.145]} color={COLORS.skin} />
          <Ellipsoid
            position={[side * 0.015, 0, 0.105]}
            scale={[0.115, 0.181, 0.035]}
            color={COLORS.innerEar}
          />
          <Ellipsoid
            position={[-side * 0.04, -0.08, 0.13]}
            scale={[0.068, 0.115, 0.045]}
            color={COLORS.skin}
          />
        </group>
      ))}
      <Eyes openness={openness} />
      <Ellipsoid
        position={[0, -0.14, 0.619]}
        scale={[0.085, 0.15, 0.065]}
        color={COLORS.skin}
      />
      <Ellipsoid
        position={[0, -0.255, 0.669]}
        scale={[0.12, 0.078, 0.088]}
        color={COLORS.skin}
      />
      <Ellipsoid
        position={[-0.097, -0.282, 0.672]}
        scale={[0.055, 0.045, 0.05]}
        color={COLORS.skin}
      />
      <Ellipsoid
        position={[0.097, -0.282, 0.672]}
        scale={[0.055, 0.045, 0.05]}
        color={COLORS.skin}
      />
      <Stroke
        points={[
          [-0.27, -0.431, 0.553],
          [-0.16, -0.478, 0.586],
          [0, -0.492, 0.598],
          [0.16, -0.469, 0.586],
          [0.27, -0.417, 0.553],
        ]}
        radius={0.011}
        color={COLORS.lip}
      />
      <Stroke
        points={[
          [-0.21, -0.475, 0.562],
          [0, -0.525, 0.581],
          [0.21, -0.461, 0.562],
        ]}
        radius={0.016}
        color="#ca9473"
      />
      <Hair />
    </group>
  );
}
