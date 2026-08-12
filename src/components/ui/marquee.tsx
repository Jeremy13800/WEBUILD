import { cn } from "@/lib/utils";

/** Bandeau défilant en boucle — repris pour la liste des métiers sous le
 * Hero. Animation CSS pure (pas de JS), coupée par la règle globale
 * `prefers-reduced-motion` de globals.css. */
export function Marquee({ items, className }: { items: readonly string[]; className?: string }) {
  const track = [...items, ...items];

  return (
    <div
      className={cn(
        "flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className,
      )}
    >
      <div className="flex shrink-0 animate-[marquee_26s_linear_infinite] items-center gap-3">
        {track.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm whitespace-nowrap text-sand-faint">
            {item}
            <span className="size-1 rounded-full bg-sand-faint/50" aria-hidden />
          </span>
        ))}
      </div>
    </div>
  );
}
