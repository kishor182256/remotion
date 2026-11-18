import { ThreeCanvas } from "@remotion/three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { BlendFunction } from "postprocessing";
import { ACESFilmicToneMapping, PCFShadowMap } from "three";
import { CAMERA, COLORS } from "./config";
import { Character } from "./Character";
import { Lighting } from "./Lighting";

export function CharacterComposition() {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <ThreeCanvas
        width={width}
        height={height}
        shadows={{ type: PCFShadowMap }}
        camera={{
          position: CAMERA.position,
          fov: CAMERA.fov,
          near: 0.1,
          far: 50,
        }}
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: ACESFilmicToneMapping,
          toneMappingExposure: 1,
        }}
        onCreated={({ camera }) => {
          camera.lookAt(...CAMERA.target);
        }}
      >
        <color attach="background" args={[COLORS.background]} />
        <Lighting />
        <Character />
        <EffectComposer multisampling={0}>
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.35}
            radius={0.85}
            luminanceThreshold={0.58}
            luminanceSmoothing={0.2}
            mipmapBlur
          />
        </EffectComposer>
      </ThreeCanvas>
    </AbsoluteFill>
  );
}
