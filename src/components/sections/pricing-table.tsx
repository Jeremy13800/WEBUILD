import { Check, Minus } from "lucide-react";
import { pricingTiers, maintenancePlan } from "@/data/pricing";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

/** Grille tarifaire complète — utilisée sur /offres. Toute donnée vient de data/pricing.ts. */
export function PricingTable() {
  return (
    <div className="flex flex-col gap-12">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier, i) => (
          <Reveal
            key={tier.slug}
            delay={i * 0.06}
            className={cn(
              "flex flex-col gap-7 rounded-[var(--radius-lg)] border p-8",
              tier.recommended
                ? "border-clay-600 bg-ink-950 text-white shadow-[var(--shadow-lg)] lg:-translate-y-3"
                : "border-line bg-card",
            )}
          >
            <div>
              {tier.recommended && (
                <span className="mb-4 inline-block rounded-full bg-clay-600 px-3 py-1 text-xs font-semibold text-white">
                  Offre recommandée
                </span>
              )}
              <h3
                className={cn(
                  "font-[family-name:var(--font-display)] text-2xl font-medium",
                  tier.recommended ? "text-white" : "text-ink",
                )}
              >
                {tier.name}
              </h3>
              <p className={cn("mt-3 text-sm leading-relaxed", tier.recommended ? "text-sand" : "text-ink-soft")}>
                {tier.description}
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className={cn("text-xs", tier.recommended ? "text-sand-faint" : "text-ink-faint")}>
                à partir de
              </span>
              <span
                className={cn(
                  "font-[family-name:var(--font-display)] text-4xl font-medium",
                  tier.recommended ? "text-white" : "text-ink",
                )}
              >
                {tier.fromPrice} €
              </span>
            </div>

            <ul className="flex flex-1 flex-col gap-3">
              {tier.features.map((f) => (
                <li
                  key={f.label}
                  className={cn(
                    "flex items-start gap-2.5 text-sm",
                    f.included
                      ? tier.recommended
                        ? "text-sand"
                        : "text-ink-soft"
                      : tier.recommended
                        ? "text-sand-faint/50"
                        : "text-ink-faint/60",
                  )}
                >
                  {f.included ? (
                    <Check
                      className={cn("mt-0.5 size-4 shrink-0", tier.recommended ? "text-clay-400" : "text-clay-600")}
                      strokeWidth={2.5}
                    />
                  ) : (
                    <Minus className="mt-0.5 size-4 shrink-0 opacity-50" strokeWidth={2.5} />
                  )}
                  <span>{f.label}</span>
                </li>
              ))}
            </ul>

            <ButtonLink
              href={`/contact?offre=${tier.slug}`}
              variant={tier.recommended ? "primary" : "secondary-light"}
              className="w-full"
            >
              Démarrer mon projet
            </ButtonLink>
          </Reveal>
        ))}
      </div>

      <Reveal className="flex flex-col items-start gap-4 rounded-[var(--radius-lg)] border border-line bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">
            {maintenancePlan.name}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-soft">{maintenancePlan.description}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {maintenancePlan.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-xs text-ink-soft">
                <Check className="size-3.5 text-clay-600" strokeWidth={2.5} />
                {f}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
          <span className="font-[family-name:var(--font-display)] text-2xl font-medium text-ink">
            à partir de {maintenancePlan.fromPrice} €<span className="text-base text-ink-faint">/{maintenancePlan.period}</span>
          </span>
          <ButtonLink href={siteConfig.ctaSecondary.href} variant="secondary-light" size="sm">
            En discuter
          </ButtonLink>
        </div>
      </Reveal>
    </div>
  );
}
