"use client";

import * as React from "react";
import { useSound } from "./sound";

const listeners = new Set<() => void>();
const subscribe = (changed: () => void) => {
  listeners.add(changed);
  return () => listeners.delete(changed);
};
const isDark = () => document.documentElement.classList.contains("dark");

/** Fixed top-right switch between the dark and light themes. */
export default function ThemeToggle() {
  const dark = React.useSyncExternalStore(subscribe, isDark, () => true);
  const { play } = useSound();

  const toggle = () => {
    const next = !isDark();
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("mz-theme", next ? "dark" : "light");
    } catch {}
    listeners.forEach((changed) => changed());
    play("tick");
  };

  return (
    <div className="frame fixed top-4 right-4 z-50 sm:top-5 sm:right-5">
      <button
        type="button"
        onClick={toggle}
        className="box grid size-11 place-items-center text-text"
        aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {dark ? (
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" strokeLinejoin="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
