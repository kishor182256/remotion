import { bundle } from "@remotion/bundler";
import {
  openBrowser,
  selectComposition,
  renderStill,
} from "@remotion/renderer";
import { mkdir } from "node:fs/promises";
import path from "node:path";
const serveUrl = await bundle({
  entryPoint: path.resolve("src/index.ts"),
  rspack: true,
});
const chromiumOptions = { gl: "angle" };
const browser = await openBrowser("chrome", { chromiumOptions });
try {
  const composition = await selectComposition({
    serveUrl,
    id: "GestureOrbit",
    puppeteerInstance: browser,
    chromiumOptions,
  });
  await mkdir("out/orbit", { recursive: true });
  for (const [name, frame] of [
    ["first-lightning", 31],
    ["first-explosion", 40],
    ["mid-sequence-lightning", 291],
    ["last-explosion", 565],
    ["final", 599],
  ]) {
    await renderStill({
      serveUrl,
      composition,
      frame,
      output: `out/orbit/${name}.png`,
      imageFormat: "png",
      puppeteerInstance: browser,
      chromiumOptions,
    });
    console.log(`Rendered ${name}: ${frame}`);
  }
} finally {
  await browser.close({ silent: true });
}
