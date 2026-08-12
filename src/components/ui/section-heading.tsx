import { cn } from "@/lib/utils";
import { Kicker } from "@/components/ui/badge";
import { SplitText } from "@/components/motion/split-text";

/**
 * En-tête de section réutilisé partout : kicker + titre display (Instrument
 * Serif) + sous-titre optionnel. `align` permet de casser la monotonie
 * "tout centré" dénoncée dans le brief (§8).
 *
 * Le titre passe par `<SplitText>` — le même effet de révélation mot par
 * mot que le Hero et le CTA final, pour que toute la page partage une
 * seule signature de mouvement au lieu d'un simple fondu générique.
 * `title` est typé `string` (pas `ReactNode`) : SplitText a besoin de texte
 * brut à découper en mots, pas de JSX arbitraire.
 */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  tone = "light",
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {kicker && <Kicker>{kicker}</Kicker>}
      <h2
        className={cn(
          "max-w-2xl font-[family-name:var(--font-display)] text-[2.5rem] leading-[1.08] font-normal tracking-[-0.01em] sm:text-[3.1rem] lg:text-[3.6rem]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        <SplitText trigger="inView" segments={[{ text: title }]} />
      </h2>
      {subtitle && (
        <p className={cn("max-w-xl text-base sm:text-lg", tone === "dark" ? "text-sand" : "text-ink-soft")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
