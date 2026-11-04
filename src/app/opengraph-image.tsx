import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Typography-only social card (no photo).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "linear-gradient(135deg, #FFFFFF 0%, #F3FAFF 45%, #CBE9FF 100%)",
          color: "#172C42",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "linear-gradient(135deg, #A5D8FF, #1D6FAE)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            KR
          </div>
          <div style={{ fontSize: 28, fontWeight: 600 }}>{profile.name}</div>
          <div style={{ fontSize: 26, color: "#52677A" }}>{`· ${profile.title}`}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>Building products</div>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02, color: "#1D6FAE" }}>that make an impact.</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#52677A" }}>{profile.subline}</div>
        </div>
        <div style={{ display: "flex", gap: 40, fontSize: 24, color: "#172C42" }}>
          <span>+5% company revenue</span>
          <span>≈5× faster listing</span>
          <span>~22% → ~0% fake leads</span>
        </div>
      </div>
    ),
    size,
  );
}
