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

/** Grille en mosaïque plutôt que des cartes identiques (brief §8) : deux
 * cellules mises en avant cassent la répétition visuelle. */
const largeIndexes = new Set([0, 5]);

export function Benefits() {
  return (
    <section className="bg-paper-dim py-24 sm:py-32">
      <Container>
        <SectionHeading
          kicker="Ce que ça change"
          title="Pas des fonctionnalités. Des résultats concrets pour votre entreprise."
          subtitle="Un site n'a de valeur que par ce qu'il vous apporte au quotidien."
        />

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefitItems.map((benefit, i) => {
            const Icon = iconMap[benefit.icon];
            const large = largeIndexes.has(i);
            return (
              <Reveal
                key={benefit.title}
                delay={(i % 4) * 0.05}
                className={cn(
                  "flex flex-col justify-between gap-6 rounded-[var(--radius-lg)] border border-line bg-card p-7",
                  large && "sm:col-span-2",
                )}
              >
                <div className="grid size-11 place-items-center rounded-[var(--radius-sm)] bg-clay-50 text-clay-600">
                  <Icon className="size-5" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-medium text-ink">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{benefit.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
