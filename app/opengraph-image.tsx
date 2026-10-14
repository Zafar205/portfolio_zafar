import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0b0c0a", color: "#ece7dc", padding: 72, border: "1px solid #272a24" }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#9a9d93", textTransform: "uppercase" }}>
          <span>00 / Portfolio</span>
          <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 12, height: 12, borderRadius: 12, background: "#f2a93b" }} />
            {site.available}
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{site.name}</div>
          <div style={{ fontSize: 56, color: "#9a9d93", marginTop: 12, display: "flex", alignItems: "center", gap: 18 }}>
            {site.role}
            <span style={{ width: 28, height: 50, background: "#f2a93b" }} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, letterSpacing: 4, color: "#9a9d93", textTransform: "uppercase", borderTop: "1px solid #3a3d36", paddingTop: 24 }}>
          <span>{site.ticker.join(" · ")}</span>
          <span>{site.city} · {site.country}</span>
        </div>
      </div>
    ),
    size,
  );
}
