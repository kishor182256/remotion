import { useMemo } from "react";
import { DoubleSide } from "three";
import { COLORS, PROPORTIONS } from "./config";
import { Box, Ellipsoid, Stroke, jacketShell } from "./geometry";

export function Outfit() {
  const shell = useMemo(jacketShell, []);
  return (
    <group>
      <Ellipsoid
        position={[0, PROPORTIONS.neckY, 0]}
        scale={[0.27, 0.43, 0.25]}
        color={COLORS.skin}
      />
      <Ellipsoid
        position={[0, 1.92, 0]}
        scale={[0.64, 0.94, 0.34]}
        color={COLORS.shirt}
      />
      <mesh geometry={shell} castShadow receiveShadow>
        <meshStandardMaterial
          color={COLORS.jacket}
          roughness={0.78}
          side={DoubleSide}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <Stroke
            points={[
              [side * 0.23, 2.77, 0.25],
              [side * 0.4, 2.5, 0.31],
              [side * 0.39, 1.79, 0.32],
              [side * 0.37, 1.29, 0.3],
            ]}
            radius={0.03}
            color={COLORS.trim}
          />
          <Stroke
            points={[
              [side * 0.36, 1.28, 0.29],
              [side * 0.53, 1.28, 0.2],
              [side * 0.64, 1.28, 0],
            ]}
            radius={0.025}
            color={COLORS.jacket}
          />
          <Box
            position={[side * 0.6, 2.39, 0.294]}
            size={[0.13, 0.23, 0.035]}
            radius={0.015}
            color={COLORS.teal}
            rotation={[0, side * 0.24, -side * 0.08]}
          />
          <Box
            position={[side * 0.3, 2.88, -0.05]}
            size={[0.24, 0.46, 0.54]}
            radius={0.07}
            color={COLORS.jacket}
            rotation={[0, side * -0.36, -side * 0.38]}
          />
          <Stroke
            points={[
              [side * 0.2, 2.7, 0.26],
              [side * 0.39, 2.88, 0.14],
              [side * 0.47, 3.08, -0.12],
              [side * 0.26, 3.13, -0.29],
            ]}
            radius={0.035}
            color={COLORS.trim}
          />
        </group>
      ))}
      <Ellipsoid
        position={[0, 0.88, 0]}
        scale={[0.65, 0.52, 0.35]}
        color={COLORS.trousers}
      />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Ellipsoid
            position={[side * 0.34, 0.12, 0]}
            scale={[0.33, 0.92, 0.33]}
            color={COLORS.trousers}
            rotation={[0, 0, -side * 0.09]}
          />
          <Box
            position={[side * 0.64, 0.64, 0.07]}
            size={[0.24, 0.48, 0.29]}
            radius={0.055}
            color={COLORS.cuff}
            rotation={[0, 0, side * 0.18]}
          />
          <Box
            position={[side * 0.65, 0.77, 0.225]}
            size={[0.23, 0.15, 0.05]}
            radius={0.022}
            color={COLORS.trim}
            rotation={[0, 0, side * 0.18]}
          />
          <Box
            position={[side * 0.65, 0.57, 0.23]}
            size={[0.055, 0.17, 0.025]}
            radius={0.01}
            color={COLORS.teal}
          />
        </group>
      ))}
      <Box
        position={[0, 1.05, 0]}
        size={[1.26, 0.23, 0.69]}
        radius={0.08}
        color={COLORS.cuff}
      />
      {[-1, 1].map((side) => (
        <Box
          key={side}
          position={[side * 0.43, 1.05, 0.365]}
          size={[0.09, 0.29, 0.045]}
          radius={0.015}
          color={COLORS.jacket}
        />
      ))}
      <Box
        position={[0, 1.05, 0.38]}
        size={[0.43, 0.31, 0.085]}
        radius={0.035}
        color={COLORS.silver}
        metalness={0.65}
      />
    </group>
  );
}
