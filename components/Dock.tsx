"use client";

import * as React from "react";
import { nav } from "@/data/site";
import { useSound } from "./sound";

const ICONS: Record<(typeof nav)[number]["icon"], React.ReactNode> = {
  home: <path d="M4 10.5 12 4l8 6.5V20H4v-9.5Z" />,
  code: <path d="m9 7-5 5 5 5M15 7l5 5-5 5M13.5 5l-3 14" />,
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="1.5" />
      <path d="M9 7.5V5h6v2.5M3.5 12.5h17" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
};

/** Floating section dock with scroll-spy. */
export default function Dock() {
  const [active, setActive] = React.useState("#top");
  const { play } = useSound();

  React.useEffect(() => {
    const targets = nav.map((item) => document.querySelector(item.href)).filter(Boolean) as Element[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(`#${entry.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="frame fixed bottom-4 left-1/2 z-50 -translate-x-1/2 sm:bottom-6">
      <ol className="box flex items-center gap-1 bg-bg/90 p-1 backdrop-blur-md">
        {nav.map((item) => (
          <li key={item.href}>
            <a href={item.href} className="dock-btn" aria-label={item.label} aria-current={active === item.href ? "true" : undefined} onClick={() => play("tick")}>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {ICONS[item.icon]}
              </svg>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
