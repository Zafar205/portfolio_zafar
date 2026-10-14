"use client";

import * as React from "react";

/**
 * The thin wire from the operator photo to the laptop in the rig.
 * Drawn in section coordinates and re-measured when the layout changes.
 */
export default function HeroWire() {
  const svg = React.useRef<SVGSVGElement>(null);
  const [d, setD] = React.useState<{ path: string; start: [number, number] } | null>(null);

  React.useEffect(() => {
    const section = svg.current?.parentElement;
    if (!section) return;
    let frame = 0;
    const measure = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const photo = section.querySelector("[data-hero-photo]");
        const anchor = section.querySelector("[data-anchor]");
        if (!photo || !anchor || window.innerWidth < 1024) return setD(null);
        const box = section.getBoundingClientRect();
        const p = photo.getBoundingClientRect();
        const a = anchor.getBoundingClientRect();
        const sx = p.right - box.left + 4;
        const sy = p.top + p.height / 2 - box.top;
        const ax = a.left + a.width / 2 - box.left;
        const ay = a.top + a.height / 2 - box.top;
        if (ax - sx < 80) return setD(null);
        const mx = Math.round(Math.max(sx + 60, ax - Math.min(140, (ax - sx) * 0.3)));
        setD({ path: `M${sx} ${sy}H${mx}V${ay}H${ax}`, start: [sx, sy] });
      });
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(section);
    const mutations = new MutationObserver(measure);
    mutations.observe(section, { childList: true, subtree: true });
    window.addEventListener("mz:loaded", measure);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      mutations.disconnect();
      window.removeEventListener("mz:loaded", measure);
    };
  }, []);

  return (
    <svg ref={svg} className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
      {d ? (
        <>
          <path d={d.path} fill="none" stroke="var(--line-strong)" strokeWidth="1" />
          <circle cx={d.start[0]} cy={d.start[1]} r="2.5" fill="var(--text)" />
        </>
      ) : null}
    </svg>
  );
}
