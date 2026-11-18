import { LIGHTS } from "./config";
export function Lighting() {
  return (
    <>
      <ambientLight intensity={LIGHTS.ambient} />
      <hemisphereLight args={["#e7eff2", "#666b75", 0.65]} />
      <directionalLight
        position={[-3, 7, 5]}
        intensity={LIGHTS.key}
        color="#ffe9d4"
        castShadow
        shadow-mapSize={[4096, 4096]}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={6}
        shadow-camera-bottom={-2}
        shadow-normalBias={0.012}
        shadow-bias={-0.0001}
        shadow-radius={4}
      />
      <directionalLight
        position={[4, 3, 5]}
        intensity={LIGHTS.fill}
        color="#d2e5f6"
      />
      <directionalLight
        position={[1, 5, -4]}
        intensity={LIGHTS.rim}
        color="#d4e1ed"
      />
    </>
  );
}
