export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#fff2fa", "#9390b2", 0.8]} />
      <directionalLight
        position={[-4, 7, 6]}
        intensity={2.0}
        color="#fff0dc"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={8}
        shadow-camera-bottom={-4}
        shadow-normalBias={0.02}
        shadow-bias={-0.0001}
        shadow-radius={5}
      />
      <directionalLight position={[5, 3, 7]} intensity={1.7} color="#e2e9ff" />
      <directionalLight position={[1, 6, -4]} intensity={2.1} color="#f5d8ff" />
    </>
  );
}
