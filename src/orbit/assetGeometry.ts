import {
  BufferGeometry,
  Color,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Shape,
  TubeGeometry,
  Vector3,
  CatmullRomCurve3,
} from "three";
import { curve } from "../boy/geometry";
import type { Vec3 } from "../boy/config";

export function gradient(
  geometry: BufferGeometry,
  a: string,
  b: string,
  axis: "x" | "y" = "y",
) {
  geometry.computeBoundingBox();
  const bounds = geometry.boundingBox!,
    p = geometry.attributes.position,
    colors: number[] = [];
  const c1 = new Color(a),
    c2 = new Color(b);
  for (let i = 0; i < p.count; i++) {
    const value = axis === "y" ? p.getY(i) : p.getX(i);
    const t =
      (value - bounds.min[axis]) / (bounds.max[axis] - bounds.min[axis] || 1);
    const c = c1.clone().lerp(c2, t);
    colors.push(c.r, c.g, c.b);
  }
  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));
  return geometry;
}
export function extrude(shape: Shape, depth = 0.15, bevel = 0.045) {
  const geometry = new ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSize: bevel,
    bevelThickness: bevel,
    bevelSegments: 4,
    steps: 1,
    curveSegments: 32,
  });
  geometry.center();
  return geometry;
}
export function flowingRibbon() {
  const path = curve([
    [-1.12, -0.55, 0],
    [-0.68, 0.56, 0],
    [-0.36, 0.64, 0],
    [-0.38, -0.31, 0],
    [0.25, 0.6, 0],
    [0.49, 0.63, 0],
    [0.45, -0.45, 0],
    [1.02, 0.55, 0],
  ]);
  const sides: Vec3[][] = [[], []];
  for (let i = 0; i <= 110; i++) {
    const t = i / 110,
      p = path.getPoint(t),
      v = path.getTangent(t);
    const width = 0.11 + 0.055 * Math.sin(Math.PI * t);
    for (let side = 0; side < 2; side++)
      sides[side].push([
        p.x - v.y * width * (side ? 1 : -1),
        p.y + v.x * width * (side ? 1 : -1),
        0,
      ]);
  }
  const shape = new Shape();
  [...sides[0], ...sides[1].reverse()].forEach((p, i) =>
    i ? shape.lineTo(p[0], p[1]) : shape.moveTo(p[0], p[1]),
  );
  shape.closePath();
  return extrude(shape, 0.12, 0.035);
}
export function springGeometry() {
  const points = Array.from({ length: 241 }, (_, i) => {
    const t = i / 240,
      a = t * Math.PI * 7;
    return new Vector3(0.38 * Math.cos(a), t * 1.3 - 0.65, 0.38 * Math.sin(a));
  });
  return new TubeGeometry(new CatmullRomCurve3(points), 240, 0.075, 12, false);
}
