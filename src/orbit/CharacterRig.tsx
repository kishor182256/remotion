import { useCurrentFrame, useVideoConfig } from "remotion";
import { Outfit } from "../boy/Outfit";
import { Head } from "../boy/Head";
import { ArmsAndHands } from "../boy/ArmsAndHands";
import { Box } from "../boy/geometry";
import { COLORS, PROPORTIONS } from "../boy/config";
import { getTargetState } from "./TargetSequence";
import { getPointingSide } from "./pointing";

export function CharacterRig() {
  const frame = useCurrentFrame(),
    { fps } = useVideoConfig(),
    t = frame / fps;
  const targetState = getTargetState(t);
  const target = targetState?.asset.position;
  const point = targetState?.pointAmount ?? 0;
  const pointSide = target ? getPointingSide(target) : -1;
  const tilt = target ? -Math.sign(target[0]) * 0.018 * point : 0;
  let openness = 1;
  for (const at of [1.1, 5.4, 9.8, 12.3, 17.6])
    openness = Math.min(openness, Math.min(1, Math.abs(t - at) / 0.12));
  return (
    <group
      position={[0, 0.01 * Math.sin(t * Math.PI), 0]}
      rotation={[0, target ? Math.sign(target[0]) * 0.018 * point : 0, 0]}
    >
      <Outfit />
      {[-1, 1].map((side) => (
        <Box
          key={side}
          position={[side * 0.4, -0.71, 0.11]}
          size={[0.55, 0.31, 0.79]}
          radius={0.13}
          color={COLORS.cuff}
        />
      ))}
      <ArmsAndHands
        raise={0}
        signal={point}
        point={point}
        aimTarget={target}
        pointSide={pointSide}
        wave={0}
      />
      <group
        position={[0, PROPORTIONS.headY - 0.7, 0]}
        rotation={[point * 0.025, 0, tilt]}
      >
        <group position={[0, 0.7, 0]} scale={[1, 0.92, 1]}>
          <Head openness={openness} />
        </group>
      </group>
    </group>
  );
}
