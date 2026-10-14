"use client";

import * as React from "react";
import { site } from "@/data/site";

/**
 * Karachi on CARTO's free vector basemaps, drawn with MapLibre GL.
 * MapLibre (and its CSS) is only downloaded once the map scrolls near the viewport.
 * Basemap © CARTO, data © OpenStreetMap contributors; keep the attribution visible.
 */
const CENTER: [number, number] = [67.0311, 24.8607];
const STYLE: Record<"dark" | "light", string> = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

export default function KarachiMap() {
  const box = React.useRef<HTMLDivElement>(null);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    const node = box.current;
    if (!node) return;
    let map: import("maplibre-gl").Map | null = null;
    let themeWatch: MutationObserver | null = null;
    let cancelled = false;
    const themeOf = (): "dark" | "light" => (document.documentElement.classList.contains("dark") ? "dark" : "light");

    const start = async () => {
      const [{ Map, setWorkerUrl }] = await Promise.all([import("maplibre-gl"), import("maplibre-gl/dist/maplibre-gl.css")]);
      if (cancelled) return;
      // The worker is copied to public/ by `npm run sync:maplibre` (runs before dev and build).
      setWorkerUrl("/maplibre-gl-worker.mjs");
      let theme = themeOf();
      map = new Map({
        container: node,
        style: STYLE[theme],
        center: CENTER,
        zoom: 10.4,
        interactive: false,
        attributionControl: false,
        fadeDuration: 0,
      });
      map.once("load", () => setReady(true));
      themeWatch = new MutationObserver(() => {
        const next = themeOf();
        if (next !== theme) {
          theme = next;
          map?.setStyle(STYLE[next]);
        }
      });
      themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    };

    const seen = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          seen.disconnect();
          void start();
        }
      },
      { rootMargin: "300px 0px" },
    );
    seen.observe(node);
    return () => {
      cancelled = true;
      seen.disconnect();
      themeWatch?.disconnect();
      map?.remove();
    };
  }, []);

  return (
    <div className="relative h-full min-h-[300px] overflow-hidden bg-field">
      <div
        ref={box}
        className={`absolute inset-0 transition-opacity duration-500 motion-reduce:transition-none ${ready ? "opacity-100" : "opacity-0"}`}
        role="img"
        aria-label={`Street map of ${site.city}, ${site.country}`}
      />
      <span className="absolute top-1/2 left-1/2 size-3 -translate-1/2 border-2 border-bg bg-text" aria-hidden="true" />
      <p className="label absolute top-4 left-4 flex items-center gap-3 border border-line bg-bg px-3 py-2 text-[11px]">
        <span className="size-2 bg-text" aria-hidden="true" />
        <span>
          <b>08</b> / {site.city}, {site.country}
        </span>
      </p>
      <p className="absolute right-3 bottom-3 rounded-full bg-white px-3 py-1 text-[11px] text-black">
        ©{" "}
        <a href="https://carto.com/attributions" className="underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
          CARTO
        </a>
        , ©{" "}
        <a href="https://www.openstreetmap.org/copyright" className="underline-offset-2 hover:underline" target="_blank" rel="noopener noreferrer">
          OpenStreetMap
        </a>{" "}
        contributors
      </p>
    </div>
  );
}
