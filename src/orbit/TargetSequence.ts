import { ASSETS, SEQUENCE_TIMING as T, type AssetConfig } from "./config";
import { ramp } from "./motion";

export type TargetState = {
  asset: AssetConfig;
  index: number;
  localTime: number;
  pointAmount: number;
  lightningAmount: number;
  impactTime: number;
};

export const getAssetStart = (index: number) =>
  T.firstTarget + index * T.slotDuration;

export const getAssetImpactTime = (index: number) =>
  getAssetStart(index) + T.impact;

export function getTargetState(time: number): TargetState | null {
  const index = Math.floor((time - T.firstTarget) / T.slotDuration);
  if (index < 0 || index >= ASSETS.length) return null;
  const localTime = time - getAssetStart(index);
  const pointAmount =
    ramp(localTime, 0, T.aimDuration) *
    (1 - ramp(localTime, T.releaseStart, T.slotDuration - 0.04));
  const lightningAmount =
    ramp(localTime, T.lightningStart, T.lightningStart + 0.055) *
    (1 - ramp(localTime, T.impact - 0.025, T.impact));

  return {
    asset: ASSETS[index],
    index,
    localTime,
    pointAmount,
    lightningAmount,
    impactTime: getAssetImpactTime(index),
  };
}

export function getAssetPhase(index: number, time: number) {
  const impactTime = getAssetImpactTime(index);
  return {
    localTime: time - getAssetStart(index),
    impactTime,
    fragmentProgress: Math.max(
      0,
      Math.min(1, (time - impactTime) / T.fragmentDuration),
    ),
    isHit: time >= impactTime,
  };
}
