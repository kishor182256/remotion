import { AbsoluteFill, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { ACESFilmicToneMapping, PCFShadowMap } from "three";
import { VIEW } from "./config";
import { Character } from "./Character";
import { Lighting } from "./Lighting";
import { Camera } from "./Camera";
import { AssetSequenceController } from "./AssetSequenceController";

export function MainComposition() {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 76% 18%, #f7d9e4 0%, transparent 58%), radial-gradient(ellipse at 10% 90%, #c4e2ee 0%, transparent 60%), #cec0ef",
      }}
    >
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: VIEW.position, fov: VIEW.fov, near: 0.1, far: 70 }}
        shadows={{ type: PCFShadowMap }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: ACESFilmicToneMapping,
        }}
      >
        <Camera />
        <Lighting />
        <Character />
        <AssetSequenceController />
      </ThreeCanvas>
    </AbsoluteFill>
  );
}
