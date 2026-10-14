"use client";

import * as React from "react";
import { useSound } from "./sound";

interface Tab {
  id: string;
  label: string;
}

/** Vertical WAI-ARIA tabs; panels are rendered on the server and passed in. The open tab lives in ?stack=. */
export default function SkillTabs({ tabs, panels }: { tabs: Tab[]; panels: React.ReactNode[] }) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const { play } = useSound();

  React.useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("stack");
    const index = tabs.findIndex((tab) => tab.id === id);
    if (index > 0) React.startTransition(() => setActive(index));
  }, [tabs]);

  const select = (index: number, focus = false) => {
    const next = (index + tabs.length) % tabs.length;
    setActive(next);
    play("tick");
    const url = new URL(window.location.href);
    if (next === 0) url.searchParams.delete("stack");
    else url.searchParams.set("stack", tabs[next].id);
    window.history.replaceState(window.history.state, "", url);
    if (focus) refs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    const moves: Record<string, number> = { ArrowDown: active + 1, ArrowRight: active + 1, ArrowUp: active - 1, ArrowLeft: active - 1, Home: 0, End: tabs.length - 1 };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key], true);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14">
      <div role="tablist" aria-label="Skill groups" aria-orientation="vertical" className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-1 lg:content-start" onKeyDown={onKeyDown}>
        {tabs.map((tab, i) => (
          <div key={tab.id} className={active === i ? "frame" : "p-1"}>
            <button
              ref={(el) => { refs.current[i] = el; }}
              id={`tab-${tab.id}`}
              role="tab"
              type="button"
              aria-selected={active === i}
              aria-controls={`panel-${tab.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => select(i)}
              className="vtab"
            >
              <span>{String(i + 1).padStart(2, "0")} /</span>
              {tab.label}
            </button>
          </div>
        ))}
      </div>
      {tabs.map((tab, i) => (
        <div key={tab.id} id={`panel-${tab.id}`} role="tabpanel" aria-labelledby={`tab-${tab.id}`} hidden={active !== i} tabIndex={0} className="min-w-0 focus-visible:outline-offset-8">
          {panels[i]}
        </div>
      ))}
    </div>
  );
}
