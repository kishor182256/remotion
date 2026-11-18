# Gesture Lightning — 20-second procedural 3D film

One continuous **1920 × 1080, 30 fps, 600-frame** composition named
`GestureOrbit` (the composition ID is retained for compatibility).

The boy is a **procedural approximation**, not an imported or rigged GLB. His
existing face, hair, clothes, materials, proportions, and articulated
shoulder–elbow–wrist–finger rig are preserved. The thirteen existing abstract
assets and their original components, geometries, materials, lighting, camera,
background, and fixed scene layout are also preserved.

## Install, preview, validate, render

Use Node 22.13+ or Node 24+ with the checked-in npm lockfile.

```sh
npm ci
npm run preview:orbit
npm run lint
npm run validate:orbit
npm run render:orbit
```

Choose `GestureOrbit` in Studio. With the default port, its direct URL is
http://localhost:3000/GestureOrbit. The server prints its actual port at startup.

Equivalent MP4 command:

```sh
npx remotion render src/index.ts GestureOrbit out/orbit/gesture-orbit.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p --concurrency=2
```

On Windows PowerShell with script restrictions, use `npm.cmd` and `npx.cmd`.
The renderer uses ANGLE for WebGL. No models, textures, fonts, HDRIs, physics
engines, postprocessing packages, or lightning packages are required. Output
lives in Git-ignored `out/orbit/`.

## Sequence

The order is the `ASSETS` array in [config](./src/orbit/config.ts). It is also
the single place to edit fixed transforms and fragment colors. Timing is grouped
under `SEQUENCE_TIMING` in the same file.

Each 1.45-second slot performs the same deterministic cycle:

1. The nearer arm turns from rest and the distinct index finger aligns with the
   asset's actual world position.
2. The pose holds briefly while every unhit asset remains intact.
3. A white/cyan jagged electric arc runs from the calculated fingertip position
   to the target, with a restrained additive outer glow.
4. The target shakes, flashes, disappears, and becomes 24 small 3D fragments.
5. Fragments scatter with deterministic velocity, spin, gravity, and opacity;
   the arm then moves to the next target.

Only the selected asset reacts. Earlier targets remain destroyed and later
targets remain intact. The final fragments clear by about 19.3 seconds, leaving
the character visible for the clean final frame.

## Source

- [MainComposition](./src/orbit/MainComposition.tsx): preserved ThreeCanvas scene, camera, lighting, background, and character.
- [AssetSequenceController](./src/orbit/AssetSequenceController.tsx): intact/reaction/impact/destroyed state for each asset.
- [TargetSequence](./src/orbit/TargetSequence.ts): editable slot timing and active-target calculation.
- [pointing](./src/orbit/pointing.ts): pointing-side selection and shared fingertip position calculation.
- [LightningArc](./src/orbit/LightningArc.tsx): deterministic jagged core/glow tubes plus reusable impact flash.
- [ExplosionFragments](./src/orbit/ExplosionFragments.tsx): deterministic 3D fragment direction, spin, gravity, and fade.
- [CharacterRig](./src/orbit/CharacterRig.tsx): schedules the existing character rig against the current target.
- [ArmsAndHands](./src/boy/ArmsAndHands.tsx): preserved articulated geometry with target-aware directional controls.
- [IndividualAssets](./src/orbit/IndividualAssets.tsx): unchanged existing asset components and materials.
- [assetGeometry](./src/orbit/assetGeometry.ts): unchanged existing asset geometry helpers.
- [Lighting](./src/orbit/Lighting.tsx) / [Camera](./src/orbit/Camera.tsx): unchanged scene lighting and perspective.

The old orbit and forward-throw controllers are removed and no longer run under
the sequence. All motion and effects derive from `useCurrentFrame()` and
`useVideoConfig()`. Deterministic hash functions replace randomness, so seeking
or rendering the same frame produces the same pose, bolt, and fragments. There
are no user-authored real-time clocks, `useFrame` loops, intervals, or simulation
state. R3F may emit a harmless internal `THREE.Clock` deprecation notice; it is
not used by this animation.

## Validation

`npm run validate:orbit` renders these full-resolution PNGs:

| PNG | Frame | Review |
| --- | ---: | --- |
| `first-lightning.png` | 31 | First fingertip-to-ribbon alignment and future assets intact |
| `first-explosion.png` | 40 | First asset replaced by fragments only |
| `mid-sequence-lightning.png` | 291 | Opposite-side pointing and cumulative destruction state |
| `last-explosion.png` | 565 | Last target fragment burst |
| `final.png` | 599 | Clean final frame with character retained |

The earlier `CharacterIntro` composition and its commands remain available.
