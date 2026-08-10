import { cn } from "@/lib/utils";
import { Kicker } from "@/components/ui/badge";

/**
 * En-tête de section réutilisé partout : kicker + titre display (Fraunces)
 * + sous-titre optionnel. `align` permet de casser la monotonie
 * "tout centré" dénoncée dans le brief (§8).
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
  title: React.ReactNode;
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
          "max-w-2xl font-[family-name:var(--font-display)] text-[2.25rem] leading-[1.08] font-medium tracking-[-0.01em] sm:text-[2.75rem] lg:text-[3.25rem]",
          tone === "dark" ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("max-w-xl text-base sm:text-lg", tone === "dark" ? "text-sand" : "text-ink-soft")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
