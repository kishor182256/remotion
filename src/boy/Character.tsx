import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Head } from "./Head";
import { Outfit } from "./Outfit";
import { ArmsAndHands } from "./ArmsAndHands";
import { PROPORTIONS, TIMING as T } from "./config";

const ease = Easing.bezier(0.42, 0, 0.25, 1);
const ramp = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
export function Character() {
  const frame = useCurrentFrame(),
    { fps, durationInFrames } = useVideoConfig();
  const t = frame / fps;
  const raise =
    ramp(t, T.raiseStart, T.raiseEnd) * (1 - ramp(t, T.waveEnd, T.lowerEnd));
  const waveEnvelope = ramp(t, 2.85, 3.08) * (1 - ramp(t, 3.78, 4));
  const wave = 0.16 * Math.sin((t - 3) * Math.PI * 5) * waveEnvelope;
  const tilt = ramp(t, 1.1, 1.9) * (1 - ramp(t, 4.8, T.settleEnd));
  const blink = interpolate(
    t,
    [T.blink - T.blinkDuration / 2, T.blink, T.blink + T.blinkDuration / 2],
    [1, 0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const breathing =
    0.012 * Math.sin((frame / (durationInFrames - 1)) * Math.PI * 4);
  return (
    <group position={[0, breathing, 0]}>
      <Outfit />
      <ArmsAndHands raise={raise} wave={wave} />
      <group
        position={[0, PROPORTIONS.headY - 0.7, 0]}
        rotation={[tilt * -0.018, tilt * 0.035, tilt * -0.055]}
      >
        <group position={[0, 0.7, 0]} scale={[1, 0.92, 1]}>
          <Head openness={blink} />
        </group>
      </group>
    </group>
  );
}
