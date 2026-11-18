# Procedural boy introduction

A six-second, 180-frame Remotion composition at **1080 × 1080 / 30 fps**.
`CharacterIntro` is a **procedural approximation** of the supplied reference,
not a recovered or imported character model. Unseen surfaces are interpreted.
The shot contains no typography, scenery, logos, or audio.

## Run

Use Node 22.13+ (or Node 24+) and the checked-in npm lockfile.

```sh
npm ci
npm run preview:boy
npm run lint
npm run validate:boy
npm run render:boy
```

On Windows PowerShell with restricted script execution, use `npm.cmd` instead
of `npm`, and `npx.cmd` instead of `npx`. Direct equivalents:

```sh
npx remotion studio src/index.ts --composition=CharacterIntro
npx remotion render src/index.ts CharacterIntro out/boy/character-intro.mp4 --codec=h264 --crf=18 --pixel-format=yuv420p --concurrency=2
npx remotion still src/index.ts CharacterIntro out/boy/initial.png --frame=0
```

The preview URL is printed by Studio; select `CharacterIntro` if necessary.
ANGLE is configured in [remotion.config.ts](./remotion.config.ts) for WebGL
rendering. The validation script supplies the same renderer explicitly.
Rendered files are under `out/boy/`, already excluded by Git.

## Components and controls

All character source lives in [src/boy/](./src/boy/).

- [CharacterComposition](./src/boy/CharacterComposition.tsx): ThreeCanvas, camera and render settings.
- [Character](./src/boy/Character.tsx): deterministic pose and neck pivot.
- [Head](./src/boy/Head.tsx): sculpted head, ears, nose and smile.
- [Hair](./src/boy/Hair.tsx): eleven smooth, curved, pointed clumps.
- [Eyes](./src/boy/Eyes.tsx): sclera, brown irises, pupils, catchlights, lids and eyebrows.
- [Outfit](./src/boy/Outfit.tsx): thick jacket shell, raised collar, trim, trousers, belt and pouches.
- [ArmsAndHands](./src/boy/ArmsAndHands.tsx): nested shoulder/elbow/wrist pivots and five separate digits per hand.
- [Lighting](./src/boy/Lighting.tsx): warm key, cool fill, rim and ambient fill; shadow-map contact shading.
- [config](./src/boy/config.ts): palette, proportions, camera, lighting and animation timings.
- [geometry](./src/boy/geometry.tsx): custom BufferGeometry sweeps, sculpted face and jacket shell; Drei rounded details.

## Animation

0–1s: relaxed breathing. 1–2s: one blink at 1.4s and a small head tilt.
2–4s: the character's right hand (viewer-left) rises and waves gently.
4–5s: the hand lowers. 5–6s: the head returns to its initial pose.
First and last poses match, including the breathing offset.

Every pose is computed from `useCurrentFrame()` and `useVideoConfig()` using
clamped easing and deterministic trigonometry. No animation state is accumulated,
and no user-authored `useFrame`, clock, interval, or randomness is used.
All geometry is generated synchronously; there are no external models, textures,
fonts, or environment maps to load before rendering. ThreeCanvas handles frame
synchronization and render readiness.

## Visual review

`npm run validate:boy` renders five full-resolution PNGs using one bundle/browser:

| File | Frame | Pose |
| --- | ---: | --- |
| `initial.png` | 0 | Relaxed |
| `blink.png` | 42 | Closed eyes |
| `raised-hand.png` | 84 | Hand raised |
| `mid-wave.png` | 99 | Greeting wave |
| `final.png` | 179 | Returned to rest |

Inspect hair/hand framing, facial attachments, finger separation, elbow clearance,
and clothing intersections after changing proportions or timing.

## API references

The locked dependencies pair React 19.2.3 with R3F 9.8.2, Drei 10.7.9,
Three 0.187.0 and Remotion 4.0.539. All installed Remotion packages match.
Official APIs checked during implementation:
[ThreeCanvas](https://www.remotion.dev/docs/three-canvas),
[React / R3F compatibility](https://r3f.docs.pmnd.rs/getting-started/introduction),
[Drei RoundedBox](https://drei.docs.pmnd.rs/shapes/rounded-box).
