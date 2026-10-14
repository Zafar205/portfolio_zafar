"use client";

import * as React from "react";
import * as k from "../iso/iso-kit";
import { Dots, Line, Solid, Wire } from "../iso/react/draw";
import { follow, useInView, useLoop } from "../iso/react/live";
import { useSound } from "../sound";
import "../iso/iso.css";
import "./rig.css";
import {
  CABLES, CICD_ART, CITY_ART, DB_ART, LAPTOP_ART, LOCK_ART, MAP_DOTS, MONITOR_ART, PACKET, PACKET_ORIGIN, SAT_ART, SAT_LINK, SWITCH_ART,
  TOWER_ART, beamPoints, cityPing, sparkline,
} from "./geometry";
import { BEAM_SECONDS, PING_SECONDS, REST_METRICS, REST_SECONDS, REST_SPARK, RUN, SIGNAL_FADE, SIGNAL_GAP, SIGNAL_SLOTS, SIGNAL_TRAVEL, drift, terminalFor, type Metrics } from "./model";
import { CITIES, H, LABEL_AT, P, ROUTE, ROUTE2, SCREEN, W } from "./view";

type Part = "laptop" | "cicd" | "tower" | "db" | "switch" | "lock" | "monitor" | "sat";
type Phase = "idle" | "run" | "beam" | "ping";

const PART_INFO: Record<Part, string> = {
  laptop: "dev machine · press deploy",
  cicd: "ci/cd · build → test → ship",
  tower: "node-01 · 9 services healthy",
  db: "postgres · 3 replicas in sync",
  switch: "sw-01 · 7 ports up",
  lock: "tls 1.3 · cert valid 84 days",
  monitor: "p95 latency · last 24 samples",
  sat: "uplink · 9 edge cities",
};

const TARGETS = CITIES.filter((city) => city.index !== 0);
const STILL_CITY = TARGETS.find((city) => city.name === "London") ?? TARGETS[0];
const fmt = new Intl.NumberFormat("en-US");
const HINT = "Click the rig or press Enter to deploy";

/** Point at fraction t along a 3D polyline. */
function along(points: k.Point3[], t: number): k.Point3 {
  const lengths = points.slice(1).map((p, i) => Math.hypot(p[0] - points[i][0], p[1] - points[i][1]));
  let d = Math.min(1, Math.max(0, t)) * lengths.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (d <= lengths[i] || i === lengths.length - 1) {
      const f = lengths[i] ? Math.min(1, d / lengths[i]) : 0;
      const a = points[i];
      const b = points[i + 1];
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, 0];
    }
    d -= lengths[i];
  }
  return points[points.length - 1];
}
const moveTo = (point: k.Point3) => {
  const [x, y] = k.iso(point, P);
  return `translate(${(x - PACKET_ORIGIN[0]).toFixed(2)} ${(y - PACKET_ORIGIN[1]).toFixed(2)})`;
};

/** Face-local text: x along the face, y = -z. */
function FaceLabel({ transform, x, z, size = 3.6, className = "rig-label", children }: { transform: string; x: number; z: number; size?: number; className?: string; children: React.ReactNode }) {
  return (
    <text transform={transform} x={x} y={-z} fontSize={size} className={className}>
      {children}
    </text>
  );
}

export default function Rig({ still = false }: { still?: boolean }) {
  const root = React.useRef<HTMLDivElement>(null);
  const packetA = React.useRef<SVGGElement>(null);
  const packetB = React.useRef<SVGGElement>(null);
  const deployKey = React.useRef<SVGGElement>(null);
  const keyRefs = React.useRef<(SVGGElement | null)[]>([]);
  const beam = React.useRef<SVGPathElement>(null);
  const ping = React.useRef<SVGPathElement>(null);
  const signalBeams = React.useRef<(SVGPathElement | null)[]>([]);
  const signalPings = React.useRef<(SVGPathElement | null)[]>([]);
  const signalHeads = React.useRef<(SVGCircleElement | null)[]>([]);
  const spark = React.useRef<SVGPathElement>(null);
  const p95Face = React.useRef<SVGTextElement>(null);
  const screenLog = React.useRef<SVGTextElement>(null);
  const terminal = React.useRef<HTMLSpanElement>(null);
  const hint = React.useRef<HTMLSpanElement>(null);
  const rps = React.useRef<HTMLSpanElement>(null);
  const deploys = React.useRef<HTMLSpanElement>(null);
  const p95 = React.useRef<HTMLSpanElement>(null);
  const platters = React.useRef<(SVGGElement | null)[]>([]);
  const inView = useInView(root);
  const { play } = useSound();

  const state = React.useRef({
    phase: "idle" as Phase,
    clock: 0,
    phaseAt: 0,
    target: still ? TARGETS.indexOf(STILL_CITY) : 0,
    lastInput: -10,
    hover: null as Part | null,
    focused: false,
    lift: 0,
    metricAt: 0,
    metrics: { ...REST_METRICS } as Metrics,
    spark: [...REST_SPARK],
    keyState: ["", "", ""],
    /** Ambient signals: which city each slot is flying to, and when it left (-1 = free). */
    signals: Array.from({ length: SIGNAL_SLOTS }, () => ({ city: 0, at: -1 })),
    nextSignal: 0.3,
    ms: 0,
  });

  const setPhase = React.useCallback((phase: Phase) => {
    const s = state.current;
    s.phase = phase;
    s.phaseAt = s.clock;
  }, []);

  const deploy = React.useCallback(() => {
    const s = state.current;
    if (s.phase === "run" || s.phase === "beam") return;
    s.target = (s.target + 1) % TARGETS.length;
    setPhase("run");
    play("tap");
  }, [play, setPhase]);

  const running = inView && !still;

  const kick = useLoop((dt, calm) => {
    const s = state.current;
    s.clock += dt;
    const since = s.clock - s.phaseAt;
    const city = TARGETS[s.target];

    // Timeline. The idle tour pauses while the figure is hovered or focused.
    if (s.phase === "idle" && s.clock - s.lastInput > 2 && since > REST_SECONDS && !s.hover && !s.focused) deploy();
    if (s.phase === "run" && since >= RUN.end) {
      s.ms = 120 + Math.round(Math.hypot(city.x - 124, city.y + 110) * 0.9);
      setPhase("beam");
    } else if (s.phase === "beam" && since >= BEAM_SECONDS) {
      s.metrics.deploys += 1;
      if (deploys.current) deploys.current.textContent = String(s.metrics.deploys);
      setPhase("ping");
      play("ship");
    } else if (s.phase === "ping" && since >= PING_SECONDS) setPhase("idle");
    const run = s.phase === "run" ? s.clock - s.phaseAt : -1;

    // Deploy key, packet A (laptop → CI/CD), keys, packet B (CI/CD → NODE-01)
    deployKey.current?.toggleAttribute("data-on", run >= 0 && run < RUN.press + 0.2);
    const a = run >= RUN.press && run < RUN.toCicd ? (run - RUN.press) / (RUN.toCicd - RUN.press) : -1;
    if (packetA.current) {
      packetA.current.style.opacity = a >= 0 ? "1" : "0";
      if (a >= 0) packetA.current.setAttribute("transform", moveTo(along(ROUTE, a)));
    }
    const b = run >= RUN.out && run < RUN.end ? (run - RUN.out) / (RUN.end - RUN.out) : -1;
    if (packetB.current) {
      packetB.current.style.opacity = b >= 0 ? "1" : "0";
      if (b >= 0) packetB.current.setAttribute("transform", moveTo(along(ROUTE2, b)));
    }
    RUN.keys.forEach((at, i) => {
      const next = RUN.keys[i + 1] ?? RUN.out;
      const value = run < 0 ? (s.phase === "idle" ? "" : "done") : run >= next ? "done" : run >= at ? "on" : "";
      if (value !== s.keyState[i]) {
        s.keyState[i] = value;
        const el = keyRefs.current[i];
        el?.toggleAttribute("data-on", value === "on");
        el?.toggleAttribute("data-done", value === "done");
        if (value === "on") play("tick");
      }
    });
    root.current?.toggleAttribute("data-busy", s.phase === "run");

    // Beam and ping
    if (beam.current && ping.current) {
      if (s.phase === "beam" || s.phase === "ping") {
        const t = s.phase === "beam" ? Math.min(1, since / BEAM_SECONDS) : 1;
        beam.current.setAttribute("d", k.pathOf(beamPoints(city, 1 - Math.pow(1 - t, 2))));
        const fade = s.phase === "ping" ? Math.max(0, 1 - since / PING_SECONDS) : 1;
        beam.current.style.opacity = String(fade);
        ping.current.setAttribute("d", s.phase === "ping" ? cityPing(city, 4 + (since / PING_SECONDS) * 14) : "");
        ping.current.style.opacity = String(fade);
      } else if (beam.current.getAttribute("d")) {
        beam.current.setAttribute("d", "");
        ping.current.setAttribute("d", "");
      }
    }
    // Ambient uplink signals to random cities, several in flight at once.
    if (s.clock >= s.nextSignal) {
      const free = s.signals.findIndex((sig) => sig.at < 0);
      if (free >= 0) {
        const busy = new Set(s.signals.filter((sig) => sig.at >= 0).map((sig) => sig.city));
        const options = CITIES.map((_, i) => i).filter((i) => !busy.has(i));
        s.signals[free] = { city: options[Math.floor(Math.random() * options.length)] ?? 0, at: s.clock };
      }
      s.nextSignal = s.clock + SIGNAL_GAP + Math.random() * SIGNAL_GAP;
    }
    s.signals.forEach((sig, i) => {
      const beamEl = signalBeams.current[i];
      const pingEl = signalPings.current[i];
      const head = signalHeads.current[i];
      if (!beamEl || !pingEl || !head) return;
      if (sig.at < 0) return;
      const age = s.clock - sig.at;
      const target = CITIES[sig.city];
      if (age >= SIGNAL_TRAVEL + SIGNAL_FADE) {
        sig.at = -1;
        beamEl.setAttribute("d", "");
        pingEl.setAttribute("d", "");
        head.style.opacity = "0";
        return;
      }
      const t = Math.min(1, age / SIGNAL_TRAVEL);
      const points = beamPoints(target, 1 - Math.pow(1 - t, 2));
      beamEl.setAttribute("d", k.pathOf(points));
      const fade = age > SIGNAL_TRAVEL ? Math.max(0, 1 - (age - SIGNAL_TRAVEL) / SIGNAL_FADE) : 1;
      beamEl.style.opacity = String(fade * 0.7);
      const tip = points[points.length - 1];
      head.setAttribute("cx", tip[0].toFixed(1));
      head.setAttribute("cy", tip[1].toFixed(1));
      head.style.opacity = age < SIGNAL_TRAVEL ? "1" : "0";
      pingEl.setAttribute("d", age > SIGNAL_TRAVEL ? cityPing(target, 3 + ((age - SIGNAL_TRAVEL) / SIGNAL_FADE) * 11) : "");
      pingEl.style.opacity = String(fade);
    });

    root.current?.setAttribute("data-target", s.phase === "beam" || s.phase === "ping" ? city.name : "");

    // Hover: database platters lift apart.
    s.lift = follow(s.lift, s.hover === "db" ? 3.4 : 0, dt, 0.18, calm);
    platters.current.forEach((g, i) => g?.setAttribute("transform", k.translateAlong(P, [0, 0, s.lift * i])));

    // Terminal, metrics and the monitor graph
    const line = terminalFor(s.phase, since, city.name, s.ms);
    if (terminal.current && terminal.current.textContent !== line) terminal.current.textContent = line;
    const screenLine = s.phase === "idle" ? "> ready_" : s.phase === "run" ? "> deploying…" : "> live ✓";
    if (screenLog.current && screenLog.current.textContent !== screenLine) screenLog.current.textContent = screenLine;
    if (s.clock - s.metricAt > 0.8) {
      s.metricAt = s.clock;
      s.metrics = drift(s.metrics, s.clock, s.phase === "run");
      s.spark = [...s.spark.slice(1), s.metrics.p95];
      spark.current?.setAttribute("d", sparkline(s.spark));
      if (p95Face.current) p95Face.current.textContent = `P95 ${s.metrics.p95}MS`;
      if (p95.current) p95.current.textContent = String(s.metrics.p95);
      if (rps.current) rps.current.textContent = fmt.format(s.metrics.rps);
    }
    return true;
  }, running);

  const onPointerOver = (event: React.PointerEvent) => {
    const part = (event.target as Element).closest("[data-part]")?.getAttribute("data-part") as Part | null;
    const s = state.current;
    if (part === s.hover) return;
    s.hover = part;
    root.current?.setAttribute("data-hover", part ?? "");
    if (hint.current) hint.current.textContent = part ? PART_INFO[part] : HINT;
  };
  const onPointerLeave = () => {
    state.current.hover = null;
    root.current?.setAttribute("data-hover", "");
    if (hint.current) hint.current.textContent = HINT;
  };
  const onClick = () => {
    state.current.lastInput = state.current.clock;
    deploy();
    kick();
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const solid = (paths: k.SolidPaths, tone: k.Tone = "hi", extra: Partial<React.ComponentProps<typeof Solid>> = {}) => <Solid paths={paths} tone={tone} {...extra} />;

  return (
    <div ref={root} className="rig iso" data-still={still ? "" : undefined} data-target={still ? STILL_CITY.name : undefined}>
      <div
        className="rig-stage"
        tabIndex={still ? undefined : 0}
        role={still ? undefined : "button"}
        aria-label={still ? undefined : "Run a deploy on the production rig"}
        onPointerOver={still ? undefined : onPointerOver}
        onPointerLeave={still ? undefined : onPointerLeave}
        onClick={still ? undefined : onClick}
        onKeyDown={still ? undefined : onKeyDown}
        onFocus={() => { state.current.focused = true; }}
        onBlur={() => { state.current.focused = false; }}
      >
      <svg className="rig-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Isometric production rig on a world map: a laptop with a deploy key, a CI/CD unit with build, test and ship keys, the NODE-01 server, a database, a network switch, a TLS padlock, a latency monitor and a satellite uplink serving ${CITIES.map((c) => c.name).join(", ")}.`}>
        <defs>
          <clipPath id="rig-screen">
            <rect x={SCREEN.x0} y={-SCREEN.z1} width={SCREEN.x1 - SCREEN.x0} height={SCREEN.z1 - SCREEN.z0} />
          </clipPath>
        </defs>

        {/* world map */}
        <path className="rig-land" d={MAP_DOTS} />
        {CITY_ART.map((city) => {
          const label = LABEL_AT[city.name];
          const home = city.index === 0;
          return (
            <g key={city.name} className="rig-city" data-city={city.name} data-home={home ? "" : undefined}>
              <path className="rig-city-ring" d={city.ring} />
              <path className="rig-city-inner" d={city.inner} />
              {home ? <path className="rig-home-ping" d={city.ring} /> : null}
              <text className="rig-city-label" x={city.at[0] + label.dx} y={city.at[1] + label.dy} textAnchor={label.anchor}>
                {home ? `${city.name} · home` : city.name}
              </text>
            </g>
          );
        })}

        {/* floor cables */}
        <g className="rig-cables">
          {CABLES.map((cable) => (
            <Wire key={cable.id} from={cable.points[0]} via={cable.points.slice(1, -1)} to={cable.points.at(-1)!} tone="mid" size={0.9} />
          ))}
        </g>

        {/* laptop */}
        <g data-part="laptop" className="rig-part">
          <path className="iso-halo" d={LAPTOP_ART.halo} />
          {solid(LAPTOP_ART.lid, "hi")}
          <Line d={LAPTOP_ART.bezel} tone="mid" />
          <g transform={LAPTOP_ART.screen}>
            <rect className="rig-screen" x={SCREEN.x0} y={-SCREEN.z1} width={SCREEN.x1 - SCREEN.x0} height={SCREEN.z1 - SCREEN.z0} />
            <g clipPath="url(#rig-screen)" className="rig-screen-text">
              <text x={SCREEN.x0 + 3} y={-SCREEN.z1 + 7} fontSize="4.2">$ ~/portfolio</text>
              <text x={SCREEN.x0 + 3} y={-SCREEN.z1 + 13} fontSize="4.2" className="rig-dim">git push</text>
              <text x={SCREEN.x0 + 3} y={-SCREEN.z1 + 19} fontSize="4.2" className="rig-dim">build ok 42s</text>
              <text x={SCREEN.x0 + 3} y={-SCREEN.z1 + 25} fontSize="4.2" className="rig-dim">tests 128/128</text>
              <text ref={screenLog} x={SCREEN.x0 + 3} y={-SCREEN.z1 + 31} fontSize="4.2">&gt; ready_</text>
            </g>
          </g>
          {solid(LAPTOP_ART.base, "hi", { inner: <Line d={LAPTOP_ART.baseSeam} tone="faint" /> })}
          <Line d={LAPTOP_ART.keys} tone="mid" />
          <Line d={LAPTOP_ART.pad} tone="mid" />
          <Line d={LAPTOP_ART.vents} tone="mid" />
          <g ref={deployKey} className="rig-deploy-key">
            {solid(LAPTOP_ART.deployKey, "hi")}
            <text transform={LAPTOP_ART.deployText} fontSize="4" textAnchor="middle" className="rig-label rig-key-label">DEPLOY</text>
          </g>
          <circle className="rig-anchor" data-anchor="" cx={LAPTOP_ART.anchor[0]} cy={LAPTOP_ART.anchor[1]} r="1.2" />
        </g>

        {/* packet A: laptop → CI/CD (behind the CI/CD unit) */}
        <g ref={packetA} className="rig-packet" style={{ opacity: 0 }}>
          {solid(PACKET, "hi", { lit: true })}
        </g>

        {/* CI/CD */}
        <g data-part="cicd" className="rig-part">
          <path className="iso-halo" d={CICD_ART.halo} />
          {solid(CICD_ART.body, "hi", { inner: <Line d={CICD_ART.seam} tone="faint" /> })}
          <FaceLabel transform={CICD_ART.label} x={CICD_ART.labelAt.x} z={CICD_ART.labelAt.z} size={4.2}>CI/CD</FaceLabel>
          <Dots points={CICD_ART.dots} size={0.6} tone="hi" />
          {CICD_ART.keys.map((key, i) => (
            <g key={key.id} ref={(el) => { keyRefs.current[i] = el; }} className="rig-key" data-done={still ? "" : undefined}>
              {solid(key.slab, "hi")}
              <text transform={key.text} fontSize="3.8" textAnchor="middle" className="rig-label rig-key-label">{key.label}</text>
            </g>
          ))}
        </g>

        {/* packet B: CI/CD → NODE-01 */}
        <g ref={packetB} className="rig-packet" style={{ opacity: 0 }}>
          {solid(PACKET, "hi", { lit: true })}
        </g>

        {/* NODE-01 */}
        <g data-part="tower" className="rig-part">
          <path className="iso-halo" d={TOWER_ART.halo} />
          {solid(TOWER_ART.plinth, "mid")}
          {solid(TOWER_ART.body, "hi", { inner: <Line d={TOWER_ART.seams} tone="lo" /> })}
          {TOWER_ART.units.map((unit, i) => (
            <g key={i}>
              <Line d={unit.slot} tone="mid" />
              <Line d={unit.side} tone="lo" />
              {unit.leds.map(([x, y], j) => (
                <circle key={j} className="rig-led" cx={x} cy={y} r="0.95" style={{ animationDelay: `${((i * 2 + j) * 0.23) % 2}s` }} />
              ))}
            </g>
          ))}
          <Line d={TOWER_ART.top} tone="mid" />
          <Dots points={TOWER_ART.vent} size={0.6} tone="lo" />
          <Dots points={TOWER_ART.screws} size={0.55} tone="mid" />
          <text transform={TOWER_ART.name} fontSize="5.4" className="rig-label rig-strong">NODE-01</text>
        </g>

        {/* SW-01 */}
        <g data-part="switch" className="rig-part">
          <path className="iso-halo" d={SWITCH_ART.halo} />
          {solid(SWITCH_ART.body, "hi")}
          <Line d={SWITCH_ART.ports} tone="mid" />
          {SWITCH_ART.leds.map(([x, y], i) => (
            <circle key={i} className="rig-led" cx={x} cy={y} r="0.6" style={{ animationDelay: `${(i * 0.31) % 2}s` }} />
          ))}
          <text transform={SWITCH_ART.name} fontSize="4.2" className="rig-label rig-strong">SW-01</text>
        </g>

        {/* TLS padlock */}
        <g data-part="lock" className="rig-part">
          <path className="iso-halo" d={LOCK_ART.halo} />
          {LOCK_ART.posts.map((post, i) => (
            <React.Fragment key={i}>{solid(post, "hi")}</React.Fragment>
          ))}
          {solid(LOCK_ART.bar, "hi")}
          {solid(LOCK_ART.body, "hi", { inner: <Line d={LOCK_ART.seam} tone="faint" /> })}
          <Line d={LOCK_ART.keyhole} tone="hi" />
          <Line d={LOCK_ART.keySlot} tone="hi" />
          <FaceLabel transform={LOCK_ART.label} x={LOCK_ART.labelAt.x} z={LOCK_ART.labelAt.z} size={4.4} className="rig-label rig-strong">TLS</FaceLabel>
        </g>

        {/* database */}
        <g data-part="db" className="rig-part">
          <path className="iso-halo" d={DB_ART.halo} />
          {solid(DB_ART.plinth, "mid")}
          {DB_ART.platters.map((platter, i) => (
            <g key={i} ref={(el) => { platters.current[i] = el; }}>
              {solid(platter.body, "hi", { inner: <Line d={platter.band} tone="faint" /> })}
              <circle className="rig-led" cx={platter.led[0]} cy={platter.led[1]} r="1" style={{ animationDelay: `${i * 0.41}s` }} />
              {platter.spacer ? solid(platter.spacer, "mid") : null}
              {platter.top ? <Line d={platter.top} tone="mid" /> : null}
              {platter.hub ? <Dots points={[platter.hub]} size={0.8} tone="hi" /> : null}
            </g>
          ))}
        </g>

        {/* P95 monitor */}
        <g data-part="monitor" className="rig-part">
          {solid(MONITOR_ART.base, "mid")}
          {solid(MONITOR_ART.neck, "mid")}
          {solid(MONITOR_ART.panel, "hi")}
          <g transform={MONITOR_ART.face}>
            <rect className="rig-screen" x={MONITOR_ART.screen.x} y={MONITOR_ART.screen.y} width={MONITOR_ART.screen.w} height={MONITOR_ART.screen.h} />
            <text ref={p95Face} x={MONITOR_ART.screen.x + 2} y={MONITOR_ART.screen.y + 5} fontSize="3.4" className="rig-screen-text">P95 {REST_METRICS.p95}MS</text>
            <path ref={spark} className="rig-spark" d={sparkline(REST_SPARK)} />
          </g>
        </g>

        {/* satellite */}
        <path className="rig-link" d={SAT_LINK} />
        <g data-part="sat" className="rig-part rig-sat">
          {solid(SAT_ART.left, "hi")}
          <Line d={SAT_ART.leftLines} tone="mid" />
          {solid(SAT_ART.arms[0], "mid")}
          {solid(SAT_ART.lens, "mid")}
          {solid(SAT_ART.body, "hi")}
          <Line d={SAT_ART.hatch} tone="mid" />
          <circle className="rig-led" cx={SAT_ART.eye[0]} cy={SAT_ART.eye[1]} r="1.1" />
          {solid(SAT_ART.arms[1], "mid")}
          {solid(SAT_ART.right, "hi")}
          <Line d={SAT_ART.rightLines} tone="mid" />
        </g>

        {/* ambient uplink signals */}
        {Array.from({ length: SIGNAL_SLOTS }, (_, i) => (
          <g key={i} className="rig-signal">
            <path ref={(el) => { signalPings.current[i] = el; }} className="rig-ping" d="" />
            <path ref={(el) => { signalBeams.current[i] = el; }} className="rig-beam rig-beam-faint" d="" />
            <circle ref={(el) => { signalHeads.current[i] = el; }} className="rig-signal-head" r="2" cx="0" cy="0" style={{ opacity: 0 }} />
          </g>
        ))}

        {/* beam and ping */}
        <path ref={ping} className="rig-ping" d={still ? cityPing(STILL_CITY, 10) : ""} />
        <path ref={beam} className="rig-beam" d={still ? k.pathOf(beamPoints(STILL_CITY)) : ""} />
        <circle className="rig-home-dot" cx={CITY_ART[0].at[0]} cy={CITY_ART[0].at[1]} r="2" />
      </svg>
      </div>

      <div className="rig-hud" aria-hidden="true">
        <span className="rig-terminal">
          <span ref={terminal}>$ ~/portfolio&gt; ready to deploy</span>
          <span className="block-cursor" />
        </span>
        <span className="rig-metrics tnum">
          <span>P95 <b ref={p95}>{REST_METRICS.p95}</b>ms</span>
          <span><b ref={rps}>{fmt.format(REST_METRICS.rps)}</b> rps</span>
          <span><b>{REST_METRICS.uptime}</b>% up</span>
          <span><b ref={deploys}>{REST_METRICS.deploys}</b> deploys</span>
        </span>
        {still ? null : <span className="rig-hint" ref={hint}>{HINT}</span>}
      </div>
    </div>
  );
}

