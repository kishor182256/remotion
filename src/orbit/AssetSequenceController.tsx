import { useCurrentFrame, useVideoConfig } from "remotion";
import { ASSETS } from "./config";
import { IndividualAsset } from "./IndividualAssets";
import { getAssetPhase, getTargetState } from "./TargetSequence";
import { getFingertipPosition } from "./pointing";
import { LightningArc, ImpactFlash } from "./LightningArc";
import { ExplosionFragments } from "./ExplosionFragments";

export function AssetSequenceController() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const targetState = getTargetState(time);

  return (
    <group>
      {ASSETS.map((asset, index) => {
        const phase = getAssetPhase(index, time);
        const isCurrent = targetState?.index === index;
        const reaction = isCurrent ? targetState.lightningAmount : 0;
        const shake = reaction * Math.sin(frame * 1.9 + index * 2.4);
        const flashProgress = (time - phase.impactTime) / 0.18;

        return (
          <group key={asset.kind}>
            {!phase.isHit ? (
              <group
                name={asset.kind}
                position={asset.position}
                rotation={[
                  asset.rotation[0] + shake * 0.045,
                  asset.rotation[1] - shake * 0.06,
                  asset.rotation[2] + shake * 0.075,
                ]}
                scale={asset.scale * (1 + reaction * 0.075)}
              >
                <IndividualAsset kind={asset.kind} />
              </group>
            ) : null}
            <ExplosionFragments
              position={asset.position}
              progress={phase.fragmentProgress}
              seed={index + 1}
              color={asset.fragmentColor}
              assetScale={asset.scale}
            />
            <ImpactFlash position={asset.position} progress={flashProgress} />
          </group>
        );
      })}

      {targetState && targetState.lightningAmount > 0 ? (
        <LightningArc
          start={getFingertipPosition(targetState.asset.position)}
          end={targetState.asset.position}
          amount={targetState.lightningAmount}
          seed={targetState.index * 1000 + frame}
        />
      ) : null}
    </group>
  );
}
