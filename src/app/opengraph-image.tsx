import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

/**
 * Image de partage (Open Graph / Twitter Card), générée à la volée — même
 * fichier sert par défaut à toutes les routes qui n'en définissent pas la
 * leur (comportement standard des conventions de fichiers Next.js, comme
 * icon.tsx pour le favicon).
 *
 * Palette et repères d'angle repris de BlueprintMarks/Hero pour que
 * l'aperçu de partage reconnaisse immédiatement l'identité du site — mais
 * en formes CSS simples (bordures, dégradés radiaux), pas de police
 * externe chargée à la volée : Satori (le moteur qui génère cette image)
 * ne supporte qu'un jeu de CSS limité, et un `fetch` réseau ici serait un
 * point de fragilité inutile pour un simple visuel de partage.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#120e0a",
          backgroundImage:
            "radial-gradient(circle at 12% -10%, rgba(180,83,31,0.45), transparent 55%), radial-gradient(circle at 92% 115%, rgba(199,108,52,0.35), transparent 55%)",
        }}
      >
        {/* Repères d'angle — même motif que BlueprintMarks */}
        <div style={{ position: "absolute", top: 48, left: 48, width: 64, height: 64, borderTop: "2px solid rgba(221,140,87,0.5)", borderLeft: "2px solid rgba(221,140,87,0.5)" }} />
        <div style={{ position: "absolute", top: 48, right: 48, width: 64, height: 64, borderTop: "2px solid rgba(221,140,87,0.5)", borderRight: "2px solid rgba(221,140,87,0.5)" }} />
        <div style={{ position: "absolute", bottom: 48, left: 48, width: 64, height: 64, borderBottom: "2px solid rgba(221,140,87,0.5)", borderLeft: "2px solid rgba(221,140,87,0.5)" }} />
        <div style={{ position: "absolute", bottom: 48, right: 48, width: 64, height: 64, borderBottom: "2px solid rgba(221,140,87,0.5)", borderRight: "2px solid rgba(221,140,87,0.5)" }} />

        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#dd8c57", fontSize: 22, fontWeight: 600, letterSpacing: 4, textTransform: "uppercase" }}>
          <div style={{ width: 40, height: 2, background: "#dd8c57" }} />
          Sites internet pour artisans
        </div>

        <div style={{ display: "flex", marginTop: 28, fontSize: 96, fontWeight: 700, color: "#ffffff", letterSpacing: -2 }}>
          {siteConfig.name}
        </div>

        <div style={{ display: "flex", marginTop: 20, fontSize: 32, color: "#ded4c3", maxWidth: 820, textAlign: "center" }}>
          {siteConfig.tagline}
        </div>
      </div>
    ),
    size,
  );
}
