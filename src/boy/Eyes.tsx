import { COLORS } from "./config";
import { Ellipsoid, Stroke } from "./geometry";

export function Eyes({ openness }: { openness: number }) {
  return (
    <group>
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * 0.325, 0.075, 0.598]}
          rotation={[0, side * 0.16, 0]}
        >
          <group scale={[1, 0.86 * Math.max(0.025, openness), 1]}>
            <Ellipsoid
              scale={[0.228, 0.257, 0.107]}
              color={COLORS.white}
              roughness={0.36}
            />
            <Ellipsoid
              position={[-side * 0.012, -0.005, 0.091]}
              scale={[0.151, 0.192, 0.043]}
              color={COLORS.iris}
              roughness={0.35}
            />
            <Ellipsoid
              position={[-side * 0.012, -0.005, 0.127]}
              scale={[0.101, 0.142, 0.022]}
              color={COLORS.pupil}
              roughness={0.3}
            />
            <Ellipsoid
              position={[-0.055, 0.085, 0.149]}
              scale={[0.04, 0.047, 0.012]}
              color="#ffffff"
              roughness={0.2}
            />
            <Ellipsoid
              position={[0.04, -0.062, 0.149]}
              scale={[0.016, 0.019, 0.008]}
              color="#c6bdb1"
            />
            <Stroke
              points={[
                [-0.221, 0, 0.018],
                [-0.16, 0.2, 0.05],
                [0, 0.255, 0.045],
                [0.16, 0.19, 0.05],
                [0.22, 0, 0.018],
              ]}
              radius={0.024}
              color={COLORS.skin}
            />
            <Stroke
              points={[
                [-0.21, -0.02, 0.016],
                [-0.13, -0.21, 0.028],
                [0.04, -0.25, 0.025],
                [0.2, -0.08, 0.025],
              ]}
              radius={0.018}
              color={COLORS.skin}
            />
          </group>
          {openness < 0.2 && (
            <Stroke
              points={[
                [-0.21, 0.002, 0.05],
                [0, -0.025, 0.105],
                [0.21, 0.002, 0.05],
              ]}
              radius={0.021}
              color={COLORS.lip}
            />
          )}
          <Stroke
            points={[
              [-0.21, 0.335, -0.025],
              [-0.09, 0.369, 0.012],
              [0.07, 0.365, 0.02],
              [0.21, 0.325, -0.015],
            ]}
            radius={0.041}
            color={COLORS.hair}
          />
        </group>
      ))}
    </group>
  );
}
