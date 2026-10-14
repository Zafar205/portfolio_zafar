"use client";

import * as React from "react";

type Cue = "tick" | "tap" | "ship" | "send";

interface SoundApi {
  on: boolean;
  toggle: () => void;
  play: (cue: Cue) => void;
}

const SoundContext = React.createContext<SoundApi>({ on: false, toggle: () => {}, play: () => {} });
const KEY = "mz-sound";
const listeners = new Set<() => void>();
const readStored = () => {
  try {
    return localStorage.getItem(KEY) === "on";
  } catch {
    return false;
  }
};
const subscribe = (changed: () => void) => {
  listeners.add(changed);
  return () => listeners.delete(changed);
};

/** Tiny synthesized UI sounds. Nothing plays until the visitor turns sound on. */
export function SoundProvider({ children }: { children: React.ReactNode }) {
  // The stored preference is restored, but the AudioContext still waits for a gesture.
  const on = React.useSyncExternalStore(subscribe, readStored, () => false);
  const ctx = React.useRef<AudioContext | null>(null);
  const onRef = React.useRef(on);
  React.useEffect(() => {
    onRef.current = on;
  }, [on]);

  const play = React.useCallback((cue: Cue) => {
    if (!onRef.current) return;
    try {
      ctx.current ??= new AudioContext();
      const audio = ctx.current;
      if (audio.state === "suspended") void audio.resume();
      const now = audio.currentTime;
      const notes: Record<Cue, [number, number, number][]> = {
        tick: [[1760, 0, 0.03]],
        tap: [[880, 0, 0.05]],
        ship: [[660, 0, 0.07], [990, 0.08, 0.09]],
        send: [[520, 0, 0.06], [780, 0.07, 0.06], [1040, 0.14, 0.1]],
      };
      for (const [freq, at, length] of notes[cue]) {
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.0001, now + at);
        gain.gain.exponentialRampToValueAtTime(0.06, now + at + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + at + length);
        osc.connect(gain).connect(audio.destination);
        osc.start(now + at);
        osc.stop(now + at + length + 0.02);
      }
    } catch {}
  }, []);

  const toggle = React.useCallback(() => {
    const next = !onRef.current;
    onRef.current = next;
    try {
      localStorage.setItem(KEY, next ? "on" : "off");
    } catch {}
    listeners.forEach((changed) => changed());
    if (next) play("tap");
  }, [play]);

  const api = React.useMemo(() => ({ on, toggle, play }), [on, toggle, play]);
  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}

export const useSound = () => React.useContext(SoundContext);

export function SoundToggle() {
  const { on, toggle } = useSound();
  return (
    <div className="frame">
      <button type="button" onClick={toggle} className="box flex min-h-11 items-center gap-3 px-4 text-[12px] tracking-[.16em] uppercase" data-on={on ? "" : undefined}>
        <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden="true">
          <path d="M4 9.5h3.5L12 6v12l-4.5-3.5H4Z" />
          {on ? <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" /> : <path d="m16 10 4 4m0-4-4 4" />}
        </svg>
        <span>Sound · {on ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
