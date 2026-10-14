/** Pure model for the rig: the deploy timeline and drifting metrics. No DOM. */

/** Deploy run, in seconds: key press → packet to CI/CD → BUILD/TEST/SHIP → packet to NODE-01. */
export const RUN = { press: 0.3, toCicd: 1.0, keys: [1.15, 1.65, 2.15], out: 2.6, end: 3.2 };
export const BEAM_SECONDS = 1.1;
export const PING_SECONDS = 1.7;
export const REST_SECONDS = 1.2;
/** Ambient uplink signals: a new one every SIGNAL_GAP seconds (plus jitter), several in flight at once. */
export const SIGNAL_SLOTS = 6;
export const SIGNAL_GAP = 0.45;
export const SIGNAL_TRAVEL = 0.85;
export const SIGNAL_FADE = 1.1;

export interface Metrics {
  p95: number;
  rps: number;
  uptime: number;
  deploys: number;
}

export const REST_METRICS: Metrics = { p95: 38, rps: 1204, uptime: 99.98, deploys: 128 };
export const REST_SPARK = [36, 38, 41, 37, 35, 39, 44, 40, 38, 36, 42, 39, 37, 41, 38, 36, 39, 38, 40, 37, 38, 39, 41, 38];

/** Next value of a bounded random walk around a slow wave. */
export function drift(m: Metrics, t: number, busy: boolean): Metrics {
  const wave = Math.sin(t / 7) * 5 + Math.sin(t / 2.3) * 1.6;
  const p95 = Math.round(Math.min(64, Math.max(24, 38 + wave + (Math.random() - 0.5) * 4 + (busy ? 10 : 0))));
  const rps = Math.round(1180 + Math.sin(t / 5) * 140 + (Math.random() - 0.5) * 60 + (busy ? 160 : 0));
  return { ...m, p95, rps };
}

export const terminalFor = (phase: string, since: number, city: string, ms: number) => {
  if (phase === "run") {
    if (since < RUN.keys[0]) return "$ ~/portfolio> git push origin main";
    if (since < RUN.keys[1]) return "$ ~/portfolio> build · compiling";
    if (since < RUN.keys[2]) return "$ ~/portfolio> test · 128/128 passed";
    return "$ ~/portfolio> ship · node-01";
  }
  if (phase === "beam") return `$ ~/portfolio> uplink → ${city}`;
  if (phase === "ping") return `$ ~/portfolio> live in ${city} · ${ms}ms`;
  return "$ ~/portfolio> ready to deploy";
};
