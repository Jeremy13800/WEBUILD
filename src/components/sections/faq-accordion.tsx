import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types";

/**
 * Accordéon FAQ en `<details>/<summary>` natif : accessible et navigable
 * au clavier sans JavaScript, conforme WCAG AA sans effort supplémentaire.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col divide-y divide-line border-t border-b border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
            <span className="font-medium text-ink">{item.question}</span>
            <ChevronDown
              className="size-4 shrink-0 text-ink-faint transition-transform duration-200 group-open:rotate-180"
              strokeWidth={2}
            />
          </summary>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
