import { Vector3 } from "three";
import type { Vec3 } from "../boy/config";
import { PROPORTIONS } from "../boy/config";

export const CHARACTER_SCALE = 0.9;

export function getPointingSide(target: Vec3): -1 | 1 {
  return target[0] < 0 ? -1 : 1;
}

export function getShoulderPosition(side: -1 | 1): Vec3 {
  return [
    side * PROPORTIONS.shoulderX * CHARACTER_SCALE,
    PROPORTIONS.shoulderY * CHARACTER_SCALE,
    0,
  ];
}

export function getFingertipPosition(target: Vec3): Vec3 {
  const side = getPointingSide(target);
  const shoulder = new Vector3(...getShoulderPosition(side));
  const direction = new Vector3(...target).sub(shoulder).normalize();
  const fingertip = shoulder.add(direction.multiplyScalar(1.82));
  return [fingertip.x, fingertip.y, fingertip.z];
}
