import type { Vec3 } from "../boy/config";
export const SCENE = { fps: 30, duration: 20, width: 1920, height: 1080 };
export const SEQUENCE_TIMING = {
  firstTarget: 0.28,
  slotDuration: 1.45,
  aimDuration: 0.34,
  holdEnd: 0.63,
  lightningStart: 0.63,
  impact: 0.89,
  releaseStart: 1.16,
  fragmentDuration: 0.72,
};
export const VIEW = {
  position: [0, 2.3, 15] as Vec3,
  target: [0, 2.3, 0] as Vec3,
  fov: 30,
};
export const PALETTE = {
  orange: "#ffb868",
  purple: "#a676d4",
  lavender: "#bea0f2",
  pink: "#f68cbf",
  blue: "#737dea",
  cream: "#fff4d1",
  white: "#fffaff",
};
export type AssetKind =
  | "ribbon"
  | "wedge"
  | "torus"
  | "starburst"
  | "glowing-ring"
  | "cross"
  | "spring"
  | "pink-sphere"
  | "lavender-sphere"
  | "oval"
  | "pebble"
  | "stroke"
  | "grid";
export type AssetConfig = {
  kind: AssetKind;
  scale: number;
  position: Vec3;
  rotation: Vec3;
  fragmentColor: string;
};

// These explicit transforms preserve the assets' established scene layout.
// Array order is also the editable targeting/explosion order.
export const ASSETS: AssetConfig[] = [
  {
    kind: "ribbon",
    scale: 0.68,
    position: [4.553, 2.747, 0.304],
    rotation: [0.18, 0.254, 0.187],
    fragmentColor: PALETTE.orange,
  },
  {
    kind: "glowing-ring",
    scale: 0.76,
    position: [3.636, 3.878, 1.136],
    rotation: [0.18, 0.337, -0.106],
    fragmentColor: PALETTE.cream,
  },
  {
    kind: "cross",
    scale: 0.65,
    position: [2.272, 4.853, -0.352],
    rotation: [0.18, 0.343, 0.481],
    fragmentColor: PALETTE.blue,
  },
  {
    kind: "pink-sphere",
    scale: 0.65,
    position: [-0.143, 5.281, -0.697],
    rotation: [0.18, 0.27, 0.128],
    fragmentColor: PALETTE.pink,
  },
  {
    kind: "grid",
    scale: 0.8,
    position: [-2.399, 4.727, -0.04],
    rotation: [0.18, 0.136, 0.595],
    fragmentColor: PALETTE.white,
  },
  {
    kind: "oval",
    scale: 0.74,
    position: [-3.771, 3.697, 1.68],
    rotation: [0.18, -0.03, 0.182],
    fragmentColor: PALETTE.pink,
  },
  {
    kind: "spring",
    scale: 0.7,
    position: [-4.621, 2.595, 0.19],
    rotation: [0.18, -0.188, 0.709],
    fragmentColor: PALETTE.blue,
  },
  {
    kind: "wedge",
    scale: 0.76,
    position: [-4.843, 1.206, -1.107],
    rotation: [0.18, -0.304, 0.416],
    fragmentColor: PALETTE.purple,
  },
  {
    kind: "torus",
    scale: 0.83,
    position: [-3.425, 0.148, -0.84],
    rotation: [0.18, -0.35, 1.003],
    fragmentColor: PALETTE.pink,
  },
  {
    kind: "pebble",
    scale: 0.68,
    position: [-0.954, -0.286, 0.563],
    rotation: [0.18, -0.316, 0.65],
    fragmentColor: PALETTE.orange,
  },
  {
    kind: "stroke",
    scale: 0.85,
    position: [1.234, -0.129, 0.825],
    rotation: [0.18, -0.209, 1.117],
    fragmentColor: PALETTE.pink,
  },
  {
    kind: "lavender-sphere",
    scale: 0.57,
    position: [3.715, 0.165, -1.084],
    rotation: [0.18, -0.055, 0.704],
    fragmentColor: PALETTE.lavender,
  },
  {
    kind: "starburst",
    scale: 0.8,
    position: [4.616, 1.427, -0.589],
    rotation: [0.18, 0.112, 1.231],
    fragmentColor: PALETTE.purple,
  },
];
