import { Smartphone, Search, Zap, Shield, Phone, Trophy, Clock, Sparkles, type LucideIcon } from "lucide-react";
import { benefitItems } from "@/data/benefits";
import type { BenefitItem } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

const iconMap: Record<BenefitItem["icon"], LucideIcon> = {
  smartphone: Smartphone,
  search: Search,
  zap: Zap,
  shield: Shield,
  phone: Phone,
  trophy: Trophy,
  clock: Clock,
  sparkles: Sparkles,
};

const [featured, ...rest] = benefitItems;

/** Deux cartes sombres parmi les six, en écho à la carte vedette — assez
 * pour casser le mur de blanc, pas assez pour lui faire concurrence. */
const darkIndexes = new Set([1, 4]);

/**
 * Un bénéfice mis en avant avec une composition entièrement différente
 * (panneau sombre, silhouette de téléphone décorative) plutôt qu'une
 * carte "juste plus large" — la largeur seule ne suffit pas à casser la
 * répétition d'une grille de cartes identiques (retour utilisateur : la
 * version précédente "faisait blog"). Le reste passe en liste compacte,
 * clairement secondaire, pour ne pas rivaliser avec la carte vedette.
 */
export function Benefits() {
  const FeaturedIcon = iconMap[featured.icon];

  return (
    <section className="relative overflow-hidden bg-paper-dim py-24 sm:py-32">
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 z-0 size-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-clay-400/10 blur-[140px]"
        aria-hidden
      />
      <Container className="relative">
        <SectionHeading
          kicker="Ce que ça change"
          title="Pas des fonctionnalités. Des résultats concrets pour votre entreprise."
          subtitle="Un site n'a de valeur que par ce qu'il vous apporte au quotidien."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="group relative flex flex-col justify-between gap-10 overflow-hidden rounded-[var(--radius-lg)] border border-clay-600/25 bg-ink-950 p-8 text-white shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1 sm:p-10">
            <div className="pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-clay-500/20 blur-[90px]" aria-hidden />

            <div className="relative">
              <div className="grid size-12 place-items-center rounded-[var(--radius-sm)] bg-clay-500/15 text-clay-400">
                <FeaturedIcon className="size-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-[family-name:var(--font-display)] text-3xl font-normal">{featured.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-sand">{featured.description}</p>
            </div>

            {/* Silhouette de téléphone décorative — abstraite, pas une
                fausse capture d'écran : deux barres et un bouton, assez
                pour évoquer "mobile" sans prétendre montrer un vrai site. */}
            <div className="relative flex justify-end">
              <div className="w-28 origin-bottom-right rotate-6 rounded-[20px] border-2 border-white/10 bg-white/[0.03] p-1.5 shadow-2xl transition-transform duration-500 group-hover:rotate-3">
                <div className="flex aspect-[9/18.5] flex-col gap-2 rounded-[13px] bg-gradient-to-b from-clay-500/25 via-ink-900 to-ink-950 p-3">
                  <div className="h-1.5 w-8 rounded-full bg-white/15" />
                  <div className="h-1.5 w-12 rounded-full bg-white/10" />
                  <div className="mt-auto h-6 w-14 rounded-full bg-clay-500" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {rest.map((benefit, i) => {
              const Icon = iconMap[benefit.icon];
              const dark = darkIndexes.has(i);
              return (
                <Reveal
                  key={benefit.title}
                  delay={(i % 4) * 0.05}
                  className={cn(
                    "group relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius-lg)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-[var(--shadow-lg)]",
                    i % 2 === 0 ? "lg:-rotate-1" : "lg:rotate-1",
                    dark
                      ? "border border-clay-600/25 bg-ink-950 text-white shadow-[var(--shadow-md)]"
                      : "border border-line bg-card shadow-[var(--shadow-sm)] hover:border-clay-200",
                  )}
                >
                  {dark && (
                    <div
                      className="pointer-events-none absolute -top-10 -right-10 size-32 rounded-full bg-clay-500/25 blur-[60px]"
                      aria-hidden
                    />
                  )}
                  <div
                    className={cn(
                      "relative grid size-12 place-items-center rounded-full text-white shadow-[var(--shadow-sm)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6",
                      dark ? "bg-clay-500" : "bg-clay-600",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.75} />
                  </div>
                  <div className="relative">
                    <h3 className={cn("font-[family-name:var(--font-display)] text-lg font-normal", dark ? "text-white" : "text-ink")}>
                      {benefit.title}
                    </h3>
                    <p className={cn("mt-1.5 text-sm leading-relaxed", dark ? "text-sand" : "text-ink-soft")}>
                      {benefit.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
