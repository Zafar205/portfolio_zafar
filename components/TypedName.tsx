"use client";

import * as React from "react";

const useIsoLayoutEffect = typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

/**
 * Types each phrase, holds, erases, and moves to the next. Starts after the loading plate lifts.
 * The box is sized to the longest phrase (monospace), so typing never shifts the layout.
 */
export default function TypedName({ phrases, still }: { phrases: string[]; still: string }) {
  const [text, setText] = React.useState(still);
  const longest = Math.max(...phrases.map((p) => p.length), still.length);

  useIsoLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setText("");
    let timer = 0;
    let phrase = 0;
    let n = 0;
    let erasing = false;
    const step = () => {
      const target = phrases[phrase];
      if (!erasing) {
        n += 1;
        setText(target.slice(0, n));
        if (n >= target.length) {
          erasing = true;
          timer = window.setTimeout(step, 2400);
          return;
        }
        timer = window.setTimeout(step, 60 + Math.random() * 60);
      } else {
        n -= 1;
        setText(target.slice(0, n));
        if (n <= 0) {
          erasing = false;
          phrase = (phrase + 1) % phrases.length;
          timer = window.setTimeout(step, 360);
          return;
        }
        timer = window.setTimeout(step, 32);
      }
    };
    const start = () => (timer = window.setTimeout(step, 240));
    if ("loaded" in document.documentElement.dataset) start();
    else window.addEventListener("mz:loaded", start, { once: true });
    return () => {
      window.removeEventListener("mz:loaded", start);
      window.clearTimeout(timer);
    };
  }, [phrases]);

  return (
    <span className="inline-flex max-w-full items-center justify-center whitespace-nowrap lg:justify-start" style={{ minWidth: `min(${longest + 1}ch, 100%)` }} aria-hidden="true">
      {text}
      <span className="block-cursor" />
    </span>
  );
}
