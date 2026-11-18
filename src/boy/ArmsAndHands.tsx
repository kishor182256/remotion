import { COLORS, PROPORTIONS as P } from "./config";
import { Box, Ellipsoid, Stroke } from "./geometry";
import type { Vec3 } from "./config";

function Hand({
  side,
  spread,
  signal = 0,
}: {
  side: number;
  spread: number;
  signal?: number;
}) {
  return (
    <group scale={1.12}>
      <Ellipsoid
        position={[0, -0.16, 0]}
        scale={[0.145, 0.22, 0.095]}
        color={COLORS.jacket}
      />
      <Box
        position={[0, -0.12, -0.07]}
        size={[0.2, 0.18, 0.055]}
        color={COLORS.trim}
        radius={0.025}
      />
      {[0, 1, 2, 3].map((i) => {
        const isIndex = i === (side === -1 ? 0 : 3);
        const curl = isIndex ? 0 : signal;
        const x = (i - 1.5) * 0.069,
          length = isIndex
            ? 0.2 + 0.18 * signal
            : [0.2, 0.26, 0.245, 0.19][i] * (1 - 0.3 * curl);
        return (
          <group
            key={i}
            position={[x, -0.3 + 0.04 * curl, 0]}
            rotation={[
              0.2 * (1 - spread) - 1.8 * curl,
              0,
              (i - 1.5) * 0.12 * spread * (1 - signal),
            ]}
          >
            <Ellipsoid
              position={[0, -length * 0.32, 0]}
              scale={[0.038, length * 0.65, 0.043]}
              color={COLORS.jacket}
            />
            <group
              position={[0, -length * 0.67, 0]}
              rotation={[0.4 * (1 - spread) - 1.3 * curl, 0, 0]}
            >
              <Ellipsoid
                position={[0, -length * 0.2, 0]}
                scale={[0.036, length * 0.33, 0.042]}
                color={COLORS.trim}
              />
            </group>
          </group>
        );
      })}
      <group
        position={[side * (0.12 - 0.025 * signal), -0.12, 0.015]}
        rotation={[0, 0, side * (0.5 + spread * 0.24) * (1 - 0.45 * signal)]}
      >
        <Ellipsoid
          position={[0, -0.075, 0.01]}
          scale={[0.057, 0.105, 0.057]}
          color={COLORS.jacket}
        />
        <Ellipsoid
          position={[0, -0.159, 0.03]}
          scale={[0.05, 0.069, 0.052]}
          color={COLORS.trim}
        />
      </group>
    </group>
  );
}

export function ArmsAndHands({
  raise,
  wave,
  signal = 0,
  point = 0,
  aimTarget,
  pointSide,
}: {
  raise: number;
  wave: number;
  signal?: number;
  point?: number;
  aimTarget?: Vec3;
  pointSide?: -1 | 1;
}) {
  const activeSide = pointSide ?? -1;
  return (
    <group>
      {[-1, 1].map((side) => {
        const directional = Boolean(aimTarget && side === activeSide);
        const active = side === activeSide ? (directional ? point : raise) : 0;
        const pointing = side === activeSide ? point : 0;
        const restRoll = side * 0.24;
        const localTarget = aimTarget
          ? [aimTarget[0] / 0.9, aimTarget[1] / 0.9, aimTarget[2] / 0.9]
          : null;
        const dx = localTarget ? localTarget[0] - side * P.shoulderX : 0;
        const dy = localTarget ? localTarget[1] - P.shoulderY : -1;
        const dz = localTarget ? localTarget[2] : 0;
        const targetRoll = Math.atan2(dx, -dy);
        const targetPitch = -Math.atan2(dz, Math.hypot(dx, dy));
        return (
          <group
            key={side}
            position={[side * P.shoulderX, P.shoulderY, 0]}
            rotation={[
              directional ? targetPitch * pointing : -1.15 * pointing,
              0,
              directional
                ? restRoll + (targetRoll - restRoll) * pointing
                : side * (0.24 + active * 0.83) * (1 - pointing) +
                  0.32 * pointing,
            ]}
          >
            <Ellipsoid
              position={[0, -0.27, 0]}
              scale={[0.29, 0.45, 0.29]}
              color={COLORS.jacket}
            />
            <Box
              position={[side * 0.23, -0.23, 0.09]}
              size={[0.09, 0.22, 0.19]}
              color={COLORS.trim}
              rotation={[0, 0, side * 0.1]}
            />
            <mesh position={[0, -0.55, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.28, 0.3, 0.24, 40]} />
              <meshStandardMaterial color={COLORS.jacket} roughness={0.72} />
            </mesh>
            <Stroke
              points={[
                [-0.22, -0.65, 0.18],
                [0, -0.65, 0.28],
                [0.22, -0.65, 0.18],
              ]}
              radius={0.018}
              color="#303b50"
            />
            <Ellipsoid
              position={[0, -0.68, 0]}
              scale={[0.17, 0.2, 0.18]}
              color={COLORS.skin}
            />
            <group
              position={[0, -P.upperArm, 0]}
              rotation={[
                directional ? 0 : -0.33 * pointing,
                directional ? 0 : active * -0.12 * (1 - pointing),
                directional
                  ? side * 0.08 * (1 - pointing)
                  : side * (0.04 + active * 1.94) * (1 - 0.96 * pointing),
              ]}
            >
              <Ellipsoid
                position={[0, -0.28, 0]}
                scale={[0.165, 0.38, 0.17]}
                color={COLORS.skin}
              />
              <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.19, 0.19, 0.23, 40]} />
                <meshStandardMaterial color={COLORS.cuff} roughness={0.55} />
              </mesh>
              <Box
                position={[0, -0.59, 0.187]}
                size={[0.1, 0.065, 0.025]}
                radius={0.012}
                color={COLORS.teal}
              />
              <group
                position={[0, -P.forearm, 0]}
                scale={directional ? 1 : 1 + 0.25 * pointing}
                rotation={[
                  directional ? 0 : active * -0.06 - 0.1 * pointing,
                  directional ? 0 : (1 - active + pointing) * Math.PI,
                  directional
                    ? 0
                    : side * active * 0.1 + (side === -1 ? wave : 0),
                ]}
              >
                <Hand
                  side={side}
                  spread={active}
                  signal={side === activeSide ? signal : 0}
                />
              </group>
            </group>
          </group>
        );
      })}
    </group>
  );
}
