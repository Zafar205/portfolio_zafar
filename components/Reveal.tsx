"use client";

import * as React from "react";

/** Adds data-shown to every [data-reveal] element as it scrolls into view. */
export default function Reveal() {
  React.useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])");
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.setAttribute("data-shown", ""));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-shown", "");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
  return null;
}
