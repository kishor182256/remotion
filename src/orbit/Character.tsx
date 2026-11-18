import { CharacterRig } from "./CharacterRig";
// Reuses the same procedural boy assets and palette as CharacterIntro.
export function Character() {
  return (
    <group scale={0.9}>
      <CharacterRig />
    </group>
  );
}
