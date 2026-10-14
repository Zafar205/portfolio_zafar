import * as k from "../iso/iso-kit";
import { cities } from "@/data/site";

/**
 * World layout in units of about 1 px: x east, y south (toward the viewer), z up.
 * The equipment cluster stands on a dotted world map; the map origin sits at lon -10°, lat -16° (South Atlantic), so every city clears the equipment.
 */
export const W = 1000;
export const H = 640;

export const MAP_K = 2.1;
export const LON0 = -10;
export const LAT0 = -16;
export const mapX = (lon: number) => (lon - LON0) * MAP_K;
export const mapY = (lat: number) => (LAT0 - lat) * MAP_K;

/* Parts are spaced so none of them touch: about 20 units of floor between neighbours. */
export const LAPTOP: k.Plan = { x: -150, y: -6, w: 64, d: 44, r: 3 };
export const LID: k.Plan = { x: -150, y: -9, w: 64, d: 3, r: 1 };
export const LID_TOP = 46;
export const SCREEN = { x0: -145, x1: -91, z0: 8, z1: 42 };
export const DEPLOY_KEY: k.Plan = { x: -114, y: 23, w: 24, d: 10, r: 1.2 };

export const CICD: k.Plan = { x: -64, y: -44, w: 30, d: 28, r: 2 };
export const CICD_H = 10;
export const KEYS = [
  { id: "build", label: "BUILD", y: -41 },
  { id: "test", label: "TEST", y: -33 },
  { id: "ship", label: "SHIP", y: -25 },
] as const;

export const TOWER: k.Plan = { x: 4, y: -74, w: 44, d: 44, r: 2 };
export const TOWER_TOP = 104;
export const UNITS = 9;

export const DB = { cx: 86, cy: -26, r: 17 };
export const SWITCH: k.Plan = { x: -14, y: -12, w: 40, d: 14, r: 1.5 };
export const LOCK: k.Plan = { x: -54, y: 28, w: 22, d: 16, r: 2 };
export const MONITOR = { x0: 44, x1: 74, y: 26, z0: 9, z1: 30 };
export const SAT = { x: 118, y: -104, z: 128 };

/** Floor route the packet travels: laptop → CI/CD → tower. */
export const ROUTE: k.Point3[] = [
  [-85.4, 4, 0],
  [-75, 4, 0],
  [-75, -30, 0],
  [-64.6, -30, 0],
];
export const ROUTE2: k.Point3[] = [
  [-33.4, -36, 0],
  [3.4, -36, 0],
];

export const CITIES = cities.map((city, index) => ({ ...city, index, x: mapX(city.lon), y: mapY(city.lat) }));

/** Label placement in screen px around each marker. */
export const LABEL_AT: Record<string, { dx: number; dy: number; anchor: "start" | "end" | "middle" }> = {
  Karachi: { dx: -4, dy: 17, anchor: "end" },
  Lahore: { dx: 9, dy: 3, anchor: "start" },
  Dubai: { dx: -9, dy: 3, anchor: "end" },
  London: { dx: 0, dy: 16, anchor: "middle" },
  Berlin: { dx: 9, dy: 3, anchor: "start" },
  "New York": { dx: 9, dy: 3, anchor: "start" },
  Toronto: { dx: -9, dy: -4, anchor: "end" },
  "San Francisco": { dx: 9, dy: 3, anchor: "start" },
  Singapore: { dx: -9, dy: 3, anchor: "end" },
};

export const P = k.fitProjection(
  [
    ...k.boxCorners(TOWER, 0, TOWER_TOP),
    ...k.boxCorners(LID, 0, LID_TOP),
    ...k.boxCorners(LOCK, 0, 0),
    [SAT.x + 44, SAT.y, SAT.z + 14],
    [SAT.x - 44, SAT.y, SAT.z + 14],
    ...CITIES.map((c) => [c.x, c.y, 0] as k.Point3),
  ],
  W,
  H,
  { pad: 36, azimuth: 60, elevation: 30 },
);

export const at = (point: k.Point3) => k.iso(point, P);
