"use client";

import * as React from "react";
import { site } from "@/data/site";

const MIN_MS = 650;
const MAX_MS = 1500;

/** Full-screen loading plate. Lifts when fonts and the page are ready, never later than 1.5 s. */
export default function Loader() {
  const [done, setDone] = React.useState(false);

  React.useEffect(() => {
    const started = performance.now();
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      const wait = Math.max(0, MIN_MS - (performance.now() - started));
      window.setTimeout(() => {
        setDone(true);
        document.documentElement.dataset.loaded = "";
        window.dispatchEvent(new Event("mz:loaded"));
      }, wait);
    };
    const cap = window.setTimeout(finish, MAX_MS - MIN_MS);
    const pageReady = document.readyState === "complete" ? Promise.resolve() : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
    Promise.all([document.fonts?.ready, pageReady]).then(finish, finish);
    return () => window.clearTimeout(cap);
  }, []);

  return (
    <div className="loader" data-done={done ? "" : undefined} aria-hidden={done} role="status" aria-live="polite">
      <div className="w-[min(320px,80vw)]">
        <div className="label flex justify-between">
          <span>
            <b>00</b> / Loading
          </span>
          <span className="tnum">{site.city.slice(0, 3).toUpperCase()}</span>
        </div>
        <p className="mt-6 text-[22px] font-bold tracking-[.1em] uppercase">Loading portfolio</p>
        <div className="loader-bar mt-6">
          <i />
        </div>
        <p className="label mt-3">
          {site.city} · {site.country}
        </p>
      </div>
    </div>
  );
}
