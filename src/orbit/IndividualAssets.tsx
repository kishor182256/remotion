import { useMemo } from "react";
import { RoundedBox } from "@react-three/drei";
import { Shape, SphereGeometry, TorusGeometry, TubeGeometry } from "three";
import { curve } from "../boy/geometry";
import {
  extrude,
  flowingRibbon,
  gradient,
  springGeometry,
} from "./assetGeometry";
import { PALETTE as P, type AssetKind } from "./config";

function Gloss({
  color,
  vertexColors = false,
  emissive,
}: {
  color?: string;
  vertexColors?: boolean;
  emissive?: string;
}) {
  return (
    <meshPhysicalMaterial
      color={color ?? "#ffffff"}
      vertexColors={vertexColors}
      roughness={0.28}
      metalness={0.12}
      clearcoat={0.5}
      clearcoatRoughness={0.28}
      emissive={emissive ?? "#000000"}
      emissiveIntensity={0.25}
    />
  );
}
export function OrangeRibbon() {
  const geo = useMemo(flowingRibbon, []);
  return (
    <mesh geometry={geo} castShadow>
      <Gloss color={P.orange} />
    </mesh>
  );
}
export function PurpleWedge() {
  const geo = useMemo(() => {
    const s = new Shape();
    s.moveTo(-0.65, -0.58);
    s.lineTo(0.8, -0.58);
    s.lineTo(-0.65, 0.8);
    s.closePath();
    return extrude(s, 0.17, 0.045);
  }, []);
  return (
    <mesh geometry={geo} castShadow>
      <Gloss color={P.purple} />
    </mesh>
  );
}
export function PastelTorus() {
  const geo = useMemo(
    () =>
      gradient(new TorusGeometry(0.58, 0.2, 32, 88), P.lavender, P.pink, "x"),
    [],
  );
  return (
    <mesh geometry={geo} castShadow>
      <Gloss vertexColors />
    </mesh>
  );
}
export function Starburst() {
  const geo = useMemo(() => {
    const s = new Shape();
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2,
        rad = i % 4 < 2 ? 0.75 : 0.19;
      const x = Math.cos(a) * rad,
        y = Math.sin(a) * rad;
      if (i) {
        s.lineTo(x, y);
      } else {
        s.moveTo(x, y);
      }
    }
    s.closePath();
    return extrude(s, 0.12, 0.025);
  }, []);
  return (
    <mesh geometry={geo} castShadow>
      <Gloss color={P.purple} />
    </mesh>
  );
}
export function GlowingRing() {
  return (
    <group>
      <mesh>
        <torusGeometry args={[0.64, 0.1, 24, 80]} />
        <Gloss color={P.cream} emissive={P.cream} />
      </mesh>
      {[P.pink, P.lavender, P.orange].map((color, i) => (
        <mesh key={color} position={[0, 0, 0.06]} rotation={[0, 0, i * 2.15]}>
          <torusGeometry args={[0.51, 0.038, 16, 44, 1.65]} />
          <Gloss color={color} />
        </mesh>
      ))}
    </group>
  );
}
export function BlueCross() {
  return (
    <group>
      <RoundedBox args={[1.1, 0.34, 0.34]} radius={0.12} smoothness={4}>
        <Gloss color={P.blue} />
      </RoundedBox>
      <RoundedBox args={[0.34, 1.1, 0.34]} radius={0.12} smoothness={4}>
        <Gloss color={P.blue} />
      </RoundedBox>
      <mesh position={[0, 0, 0.18]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.23, 40]} />
        <Gloss color={P.blue} />
      </mesh>
    </group>
  );
}
export function BlueSpring() {
  const geo = useMemo(springGeometry, []);
  return (
    <mesh geometry={geo}>
      <Gloss color={P.blue} />
    </mesh>
  );
}
export function PastelSphere({ pink }: { pink: boolean }) {
  return (
    <mesh>
      <sphereGeometry args={[0.48, 48, 32]} />
      <Gloss color={pink ? P.pink : P.lavender} />
    </mesh>
  );
}
export function GradientOval() {
  const geo = useMemo(
    () => gradient(new SphereGeometry(1, 48, 32), P.pink, P.purple),
    [],
  );
  return (
    <mesh geometry={geo} scale={[0.42, 0.76, 0.29]} rotation={[0, 0, -0.4]}>
      <Gloss vertexColors />
    </mesh>
  );
}
export function GradientPebble() {
  const geo = useMemo(() => {
    const g = new SphereGeometry(1, 64, 40),
      p = g.attributes.position;
    for (let i = 0; i < p.count; i++) {
      const y = p.getY(i),
        bulge = 0.8 + 0.16 * Math.cos(y * 5);
      p.setXYZ(i, p.getX(i) * bulge * 0.46, y * 0.69, p.getZ(i) * bulge * 0.4);
    }
    g.computeVertexNormals();
    return gradient(g, P.orange, P.pink);
  }, []);
  return (
    <mesh geometry={geo} rotation={[0.2, 0.2, -0.35]}>
      <Gloss vertexColors />
    </mesh>
  );
}
export function PinkStroke() {
  const geo = useMemo(
    () =>
      new TubeGeometry(
        curve([
          [-0.8, 0.1, 0],
          [-0.68, -0.44, 0],
          [-0.15, -0.05, 0.04],
          [0.32, 0.43, 0.07],
          [0.42, -0.18, 0.02],
          [0.85, 0.5, 0],
        ]),
        90,
        0.045,
        12,
        false,
      ),
    [],
  );
  return (
    <mesh geometry={geo}>
      <Gloss color={P.pink} />
    </mesh>
  );
}
export function WireGrid() {
  return (
    <group>
      {Array.from({ length: 6 }, (_, i) => (
        <group key={i}>
          <mesh position={[-0.8 + i * 0.32, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 1.6, 8]} />
            <Gloss color={P.white} />
          </mesh>
          <mesh
            position={[0, -0.8 + i * 0.32, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.012, 0.012, 1.6, 8]} />
            <Gloss color={P.white} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
export function IndividualAsset({ kind }: { kind: AssetKind }) {
  switch (kind) {
    case "ribbon":
      return <OrangeRibbon />;
    case "wedge":
      return <PurpleWedge />;
    case "torus":
      return <PastelTorus />;
    case "starburst":
      return <Starburst />;
    case "glowing-ring":
      return <GlowingRing />;
    case "cross":
      return <BlueCross />;
    case "spring":
      return <BlueSpring />;
    case "pink-sphere":
      return <PastelSphere pink />;
    case "lavender-sphere":
      return <PastelSphere pink={false} />;
    case "oval":
      return <GradientOval />;
    case "pebble":
      return <GradientPebble />;
    case "stroke":
      return <PinkStroke />;
    case "grid":
      return <WireGrid />;
  }
}
