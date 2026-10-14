"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import { H, W } from "./view";

function Placeholder() {
  return <div style={{ aspectRatio: `${W} / ${H}` }} aria-hidden="true" />;
}

const Rig = dynamic(() => import("./Rig"), { ssr: false, loading: Placeholder });

const STATIC_QUERY = "(prefers-reduced-motion: reduce)";

/** Lazy-loads the figure. Visitors who ask for reduced motion get the still version. */
export default function RigLoader() {
  const still = React.useSyncExternalStore(
    (changed) => {
      const query = window.matchMedia(STATIC_QUERY);
      query.addEventListener("change", changed);
      return () => query.removeEventListener("change", changed);
    },
    () => window.matchMedia(STATIC_QUERY).matches,
    () => true,
  );
  return <Rig key={still ? "still" : "live"} still={still} />;
}
