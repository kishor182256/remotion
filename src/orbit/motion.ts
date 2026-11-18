import { Easing, interpolate } from "remotion";
export const ease = Easing.bezier(0.42, 0, 0.22, 1);
export const ramp = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
export const clamp = (v: number) => Math.max(0, Math.min(1, v));
