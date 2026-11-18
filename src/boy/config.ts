export type Vec3 = [number, number, number];
export const COLORS = {
  background: "#aabdc3",
  skin: "#c68e67",
  innerEar: "#bc8463",
  lip: "#9c6b52",
  hair: "#30241f",
  hairLight: "#382a24",
  iris: "#58331e",
  pupil: "#17110e",
  white: "#eee9de",
  jacket: "#202b42",
  trim: "#626b7c",
  shirt: "#292d3c",
  trousers: "#252d40",
  cuff: "#1d2b32",
  teal: "#218d91",
  silver: "#a5aeba",
};
export const PROPORTIONS = {
  headY: 3.94,
  neckY: 2.98,
  shoulderY: 2.67,
  shoulderX: 0.76,
  upperArm: 0.73,
  forearm: 0.68,
};
export const CAMERA = {
  position: [0, 2.6, 11.5] as Vec3,
  target: [0, 2.6, 0] as Vec3,
  fov: 28,
};
export const LIGHTS = { ambient: 0.85, key: 2.3, fill: 1.4, rim: 2.0 };
export const TIMING = {
  blink: 1.4,
  blinkDuration: 0.24,
  raiseStart: 2,
  raiseEnd: 2.8,
  waveEnd: 4,
  lowerEnd: 5,
  settleEnd: 5.8,
};
