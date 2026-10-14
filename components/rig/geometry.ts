import * as k from "../iso/iso-kit";
import { LAND, LAND_LAT0, LAND_STEP } from "./land";
import {
  CICD, CICD_H, CITIES, DB, DEPLOY_KEY, KEYS, LAPTOP, LID, LID_TOP, LOCK, MONITOR, P, ROUTE, ROUTE2, SAT, SCREEN, SWITCH,
  TOWER, TOWER_TOP, UNITS, at, mapX, mapY,
} from "./view";

const path = (points: k.Point3[], closed = false) => k.pathOf(points.map(at), closed);
/** Closed rectangle on the vertical face y = const (facing +y). */
const rectY = (y: number, x0: number, x1: number, z0: number, z1: number) => path([[x0, y, z0], [x1, y, z0], [x1, y, z1], [x0, y, z1]], true);
/** Closed rectangle on the vertical face x = const (facing +x). */
const rectX = (x: number, y0: number, y1: number, z0: number, z1: number) => path([[x, y0, z0], [x, y1, z0], [x, y1, z1], [x, y0, z1]], true);
/** Matrix for text on the +y face (local x right, local y down). */
export const faceY = (y: number) => k.sideMatrix([0, y], 0, P, "left");
/** Matrix for text on the +x face (local x runs toward -y). */
export const faceX = (x: number) => k.sideMatrix([x, 0], 0, P, "right");
/** Many dots as one path: each "M x y h0" is drawn as a round cap. */
const dotPath = (points: k.Flat[]) => points.map(([x, y]) => `M${x.toFixed(1)} ${y.toFixed(1)}h0`).join("");

/* ───────────── dotted world map ───────────── */

const land: k.Flat[] = [];
LAND.forEach((row, r) => {
  for (let c = 0; c < row.length; c++) {
    if (row[c] !== "#") continue;
    const lon = -180 + (c + 0.5) * LAND_STEP;
    const lat = LAND_LAT0 - (r + 0.5) * LAND_STEP;
    land.push(at([mapX(lon), mapY(lat), 0]));
  }
});
export const MAP_DOTS = dotPath(land);

export const CITY_ART = CITIES.map((city) => ({
  ...city,
  ring: k.ring(city.x, city.y, 4.6, 0, P, 28),
  inner: k.ring(city.x, city.y, 2.2, 0, P, 20),
  at: at([city.x, city.y, 0]),
}));
export const cityPing = (city: { x: number; y: number }, r: number) => k.ring(city.x, city.y, r, 0, P, 32);

/* ───────────── floor cables ───────────── */

const floor = (points: k.Plane[]) => points.map(([x, y]) => at([x, y, 0]));
export const CABLES = [
  { id: "a", points: ROUTE.map(at) },
  { id: "b", points: ROUTE2.map(at) },
  { id: "c", points: floor([[6, -12.6], [6, -29.4]]) },
  { id: "d", points: floor([[-43, 27.4], [-43, -5], [-14.6, -5]]) },
  { id: "e", points: floor([[59, 23.4], [59, -5], [26.6, -5]]) },
  { id: "f", points: floor([[48.6, -30], [69.4, -30]]) },
];

/* ───────────── laptop ───────────── */

const keys: string[] = [];
for (let row = 0; row < 3; row++) for (let col = 0; col < 9; col++) keys.push(k.planOutline({ x: LAPTOP.x + 4 + col * 6.2, y: LAPTOP.y + 4 + row * 5.6, w: 5, d: 4.4, r: 0.6 }, 4, P, 2));
const PAD: k.Plan = { x: LAPTOP.x + 8, y: LAPTOP.y + 28, w: 24, d: 12, r: 1.4 };

export const LAPTOP_ART = {
  halo: k.haloOf(LAPTOP, 0, 3, P),
  lid: k.slabOf(LID, 2, LID_TOP - 2, P, 3, 0.4),
  base: k.slabOf(LAPTOP, 0, 4, P, 4, 0.6),
  baseSeam: k.sideSeam(LAPTOP, 1.6, P, 4),
  keys: keys.join(""),
  pad: k.planOutline(PAD, 4, P, 4),
  deployKey: k.slabOf(DEPLOY_KEY, 4, 1.6, P, 3, 0.3),
  deployText: k.topMatrix([DEPLOY_KEY.x + DEPLOY_KEY.w / 2, DEPLOY_KEY.y + 6.6], 5.6, P, "x"),
  vents: [0, 1, 2, 3].map((i) => rectX(LAPTOP.x + LAPTOP.w, LAPTOP.y + 26 + i * 4, LAPTOP.y + 28 + i * 4, 1.2, 2.6)).join(""),
  bezel: rectY(LID.y + LID.d, SCREEN.x0 - 1.2, SCREEN.x1 + 1.2, SCREEN.z0 - 1.2, SCREEN.z1 + 1.2),
  screen: faceY(LID.y + LID.d),
  anchor: at([LAPTOP.x, LAPTOP.y + 14, 2]),
};

/* ───────────── CI/CD block with BUILD / TEST / SHIP keys ───────────── */

const CICD_FRONT = CICD.y + CICD.d;
export const CICD_ART = {
  halo: k.haloOf(CICD, 0, 3, P),
  body: k.slabOf(CICD, 0, CICD_H, P, 3, 0.6),
  seam: k.sideSeam(CICD, 3, P, 3),
  label: faceY(CICD_FRONT),
  labelAt: { x: CICD.x + 4, z: 6.4 },
  dots: k.pointsAt([0, 1, 2].map((i) => [CICD.x + CICD.w - 9 + i * 2.8, CICD_FRONT, 6] as k.Point3), P),
  keys: KEYS.map((key) => {
    const plan: k.Plan = { x: CICD.x + 4, y: key.y, w: 22, d: 6, r: 1 };
    return {
      ...key,
      slab: k.slabOf(plan, CICD_H, 2.4, P, 2, 0.3),
      text: k.topMatrix([plan.x + plan.w / 2, plan.y + 4.4], CICD_H + 2.4, P, "x"),
    };
  }),
};

/* ───────────── NODE-01 tower ───────────── */

const TOWER_FRONT = TOWER.y + TOWER.d;
const TOWER_SIDE = TOWER.x + TOWER.w;
const unitH = (TOWER_TOP - 8) / UNITS;
export const TOWER_ART = {
  halo: k.haloOf(TOWER, 0, 4, P),
  plinth: k.slabOf(k.insetPlan(TOWER, -1.5), 0, 4, P, 3, 0.4),
  body: k.slabOf(TOWER, 4, TOWER_TOP - 4, P, 3, 0.8),
  seams: Array.from({ length: UNITS - 1 }, (_, i) => k.sideSeam(TOWER, 6 + (i + 1) * unitH, P, 3)).join(""),
  units: Array.from({ length: UNITS }, (_, i) => {
    const z0 = 6 + i * unitH;
    return {
      slot: rectY(TOWER_FRONT, TOWER.x + 6, TOWER.x + 26, z0 + 3, z0 + unitH - 3),
      side: rectX(TOWER_SIDE, TOWER.y + 6, TOWER.y + 30, z0 + 3.4, z0 + unitH - 3.4),
      leds: [at([TOWER.x + 32, TOWER_FRONT, z0 + unitH / 2]), at([TOWER.x + 37, TOWER_FRONT, z0 + unitH / 2])],
    };
  }),
  top: k.planOutline(k.insetPlan(TOWER, 3), TOWER_TOP, P, 3),
  vent: k.dotGrid(TOWER.x + 8, TOWER.y + 24, 8, 4, 4, TOWER_TOP, P),
  screws: k.pointsAt(k.corners(TOWER, 1.8).map(([x, y]) => [x, y, TOWER_TOP] as k.Point3), P),
  name: k.topMatrix([TOWER.x + 8, TOWER.y + 15], TOWER_TOP, P, "x"),
  uplink: at([TOWER.x + TOWER.w / 2, TOWER.y + TOWER.d / 2, TOWER_TOP]),
};

/* ───────────── database ───────────── */

const viewer = k.towardViewer(P);
const PLATTERS = 3;
export const DB_ART = {
  halo: k.haloOf({ x: DB.cx - 19, y: DB.cy - 19, w: 38, d: 38, r: 19 }, 0, 3, P),
  plinth: k.cylinder(DB.cx, DB.cy, DB.r + 2, 0, 3, P, 48, 0.4),
  platters: Array.from({ length: PLATTERS }, (_, i) => {
    const z0 = 3 + i * 11;
    return {
      body: k.cylinder(DB.cx, DB.cy, DB.r, z0, 9.4, P, 56, 0.5),
      band: k.sideArc(DB.cx, DB.cy, DB.r, z0 + 3.2, P, 40),
      spacer: i < PLATTERS - 1 ? k.cylinder(DB.cx, DB.cy, DB.r - 1.6, z0 + 9.4, 1.6, P, 48) : null,
      led: at([DB.cx + viewer[0] * DB.r, DB.cy + viewer[1] * DB.r, z0 + 6]),
      top: i === PLATTERS - 1 ? [k.ring(DB.cx, DB.cy, DB.r - 3, z0 + 9.4, P, 48), k.ring(DB.cx, DB.cy, 7, z0 + 9.4, P, 32)].join("") : null,
      hub: i === PLATTERS - 1 ? at([DB.cx, DB.cy, z0 + 9.4]) : null,
    };
  }),
};

/* ───────────── SW-01 switch ───────────── */

const SW_FRONT = SWITCH.y + SWITCH.d;
export const SWITCH_ART = {
  halo: k.haloOf(SWITCH, 0, 2, P),
  body: k.slabOf(SWITCH, 0, 6, P, 3, 0.4),
  ports: Array.from({ length: 7 }, (_, i) => rectY(SW_FRONT, SWITCH.x + 4 + i * 4.6, SWITCH.x + 7.2 + i * 4.6, 1.4, 4)).join(""),
  leds: Array.from({ length: 7 }, (_, i) => at([SWITCH.x + 5.6 + i * 4.6, SW_FRONT, 5])),
  name: k.topMatrix([SWITCH.x + 4, SWITCH.y + 9], 6, P, "x"),
};

/* ───────────── TLS padlock ───────────── */

const LOCK_FRONT = LOCK.y + LOCK.d;
const shackleY = LOCK.y + LOCK.d / 2;
export const LOCK_ART = {
  halo: k.haloOf(LOCK, 0, 3, P),
  posts: [LOCK.x + 5, LOCK.x + LOCK.w - 5].map((x) => k.cylinder(x, shackleY, 1.8, 17, 10, P, 18)),
  bar: k.slabOf({ x: LOCK.x + 3.2, y: shackleY - 1.8, w: LOCK.w - 6.4, d: 3.6, r: 1.6 }, 26, 3.4, P, 3, 0.3),
  body: k.slabOf(LOCK, 0, 18, P, 4, 0.6),
  seam: k.sideSeam(LOCK, 14, P, 4),
  keyhole: k.sideRing([LOCK.x + LOCK.w / 2, LOCK_FRONT, 8.6], 1.6, "y", P, 16),
  keySlot: path([[LOCK.x + LOCK.w / 2, LOCK_FRONT, 7], [LOCK.x + LOCK.w / 2, LOCK_FRONT, 4]]),
  label: faceY(LOCK_FRONT),
  labelAt: { x: LOCK.x + 3, z: 4.2 },
};

/* ───────────── P95 monitor ───────────── */

const MON_FRONT = MONITOR.y + 3;
export const MONITOR_ART = {
  base: k.slabOf({ x: MONITOR.x0 + 6, y: MONITOR.y - 2, w: 18, d: 10, r: 1.5 }, 0, 1.4, P, 3, 0.3),
  neck: k.slabOf({ x: MONITOR.x0 + 13, y: MONITOR.y - 1.5, w: 4, d: 2, r: 0.5 }, 1.4, MONITOR.z0 - 1.4, P, 2),
  panel: k.slabOf({ x: MONITOR.x0, y: MONITOR.y, w: MONITOR.x1 - MONITOR.x0, d: 3, r: 0.8 }, MONITOR.z0, MONITOR.z1 - MONITOR.z0, P, 2, 0.3),
  face: faceY(MON_FRONT),
  /** screen rectangle in face-local coordinates (x, -z) */
  screen: { x: MONITOR.x0 + 1.6, y: -(MONITOR.z1 - 1.6), w: MONITOR.x1 - MONITOR.x0 - 3.2, h: MONITOR.z1 - MONITOR.z0 - 3.2 },
};
/** Sparkline points in face-local coordinates for the monitor graph. */
export function sparkline(values: number[]) {
  const { x, y, w, h } = MONITOR_ART.screen;
  const lo = 20;
  const hi = 70;
  const top = y + 8;
  const span = h - 10;
  return values
    .map((v, i) => {
      const px = x + 2 + (i / (values.length - 1)) * (w - 4);
      const py = top + span - ((Math.min(hi, Math.max(lo, v)) - lo) / (hi - lo)) * span;
      return `${i ? "L" : "M"}${px.toFixed(2)} ${py.toFixed(2)}`;
    })
    .join("");
}

/* ───────────── satellite ───────────── */

const panel = (x: number): k.Plan => ({ x, y: SAT.y - 7, w: 32, d: 14, r: 0.6 });
const panelLines = (plan: k.Plan, z: number) =>
  [
    ...[1, 2, 3].map((i) => k.lineOnTop([plan.x + (plan.w / 4) * i, plan.y], [plan.x + (plan.w / 4) * i, plan.y + plan.d], z, P)),
    k.lineOnTop([plan.x, plan.y + plan.d / 2], [plan.x + plan.w, plan.y + plan.d / 2], z, P),
  ].join("");
const LEFT = panel(SAT.x - 46);
const RIGHT = panel(SAT.x + 14);
const BODY: k.Plan = { x: SAT.x - 8, y: SAT.y - 8, w: 16, d: 16, r: 1.2 };
export const SAT_ART = {
  left: k.slabOf(LEFT, SAT.z + 6, 1.2, P, 2, 0.2),
  leftLines: panelLines(LEFT, SAT.z + 7.2),
  right: k.slabOf(RIGHT, SAT.z + 6, 1.2, P, 2, 0.2),
  rightLines: panelLines(RIGHT, SAT.z + 7.2),
  arms: [k.slabOf({ x: SAT.x - 14, y: SAT.y - 1, w: 6, d: 2, r: 0.4 }, SAT.z + 6, 1.2, P, 2), k.slabOf({ x: SAT.x + 8, y: SAT.y - 1, w: 6, d: 2, r: 0.4 }, SAT.z + 6, 1.2, P, 2)],
  body: k.slabOf(BODY, SAT.z, 14, P, 3, 0.5),
  hatch: k.planOutline(k.insetPlan(BODY, 3), SAT.z + 14, P, 3),
  lens: k.cylinder(SAT.x, SAT.y, 3, SAT.z - 4, 4, P, 20),
  eye: at([SAT.x + 8, SAT.y + 2, SAT.z + 6]),
  tip: at([SAT.x, SAT.y, SAT.z - 4]),
};

/** Dotted link from the satellite down to the tower. */
export const SAT_LINK = k.pathOf([SAT_ART.tip, TOWER_ART.uplink]);

/** Beam from the satellite to a city: a straight descent that bows slightly. */
export function beamPoints(city: { x: number; y: number }, upTo = 1, steps = 40): k.Flat[] {
  const from: k.Point3 = [SAT.x, SAT.y, SAT.z - 4];
  const to: k.Point3 = [city.x, city.y, 0];
  const points: k.Flat[] = [];
  const last = Math.max(1, Math.round(steps * upTo));
  for (let i = 0; i <= last; i++) {
    const t = i / steps;
    const bow = 18 * Math.sin(Math.PI * t);
    points.push(at([from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, from[2] + (to[2] - from[2]) * t + bow]));
  }
  return points;
}

/* ───────────── packet ───────────── */

export const PACKET = k.slabOf({ x: -1.8, y: -1.8, w: 3.6, d: 3.6, r: 0.6 }, 0, 3, P, 2, 0.3);
export const PACKET_ORIGIN = at([0, 0, 0]);
