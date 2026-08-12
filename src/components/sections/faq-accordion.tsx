import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types";

/**
 * Accordéon FAQ en `<details>/<summary>` natif : accessible et navigable
 * au clavier sans JavaScript, conforme WCAG AA sans effort supplémentaire.
 *
 * L'ouverture/fermeture est animée en CSS pur (classe `.faq-panel`, voir
 * globals.css) sans rien perdre de ce natif : `<details>` masque son
 * contenu via `display:none` quand fermé, ce qui empêche toute transition
 * fluide — on reprend la main sur la hauteur via `grid-template-rows`
 * plutôt que de remplacer l'élément par un accordéon piloté en JS.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-line border-t border-b border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
            <span className="font-medium text-ink transition-colors duration-200 group-hover:text-clay-600">
              {item.question}
            </span>
            <span className="grid size-7 shrink-0 place-items-center rounded-full text-ink-faint transition-colors duration-200 group-hover:bg-clay-50 group-hover:text-clay-600">
              <ChevronDown
                className="size-4 transition-transform duration-300 group-open:rotate-180"
                strokeWidth={2}
              />
            </span>
          </summary>
          <div className="faq-panel">
            <div className="overflow-hidden">
              <p className="max-w-2xl pt-3 text-sm leading-relaxed text-ink-soft">{item.answer}</p>
            </div>
          </div>
        </details>
      ))}
    </div>
  );
}
