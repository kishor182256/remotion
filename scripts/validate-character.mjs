import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
} from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import path from "node:path";

// One bundle and browser for repeatable visual review. No external assets.
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  rspack: true,
});
const chromiumOptions = { gl: "angle" };
const browser = await openBrowser("chrome", { chromiumOptions });
try {
  const composition = await selectComposition({
    serveUrl,
    id: "CharacterIntro",
    puppeteerInstance: browser,
    chromiumOptions,
  });
  await mkdir("out/boy", { recursive: true });
  const poses = [
    ["initial", 0],
    ["blink", 42],
    ["raised-hand", 84],
    ["mid-wave", 99],
    ["final", 179],
  ];
  for (const [name, frame] of poses) {
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `out/boy/${name}.png`,
      imageFormat: "png",
      puppeteerInstance: browser,
      chromiumOptions,
    });
    console.log(`Verified render: ${name}, frame ${frame}`);
  }
} finally {
  await browser.close({ silent: true });
}
