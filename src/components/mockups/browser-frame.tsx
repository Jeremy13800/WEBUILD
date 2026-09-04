import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Aperçu "desktop" d'un projet du portfolio. Si `project.screenshots.desktop`
 * existe, affiche la vraie capture du site dans le cadre navigateur (brief :
 * "le screenshot doit devenir le contenu du mockup"). Sinon, retombe sur un
 * aperçu simulé construit à partir de la vraie palette de couleurs
 * (data/projects.ts) — pour un projet qui n'a pas encore de capture. La
 * structure de la carte ne change pas d'un cas à l'autre.
 *
 * Les barres décoratives du fallback CSS utilisent des hauteurs fixes (pas
 * de `h-[%]`) : une hauteur en pourcentage ne se résout que si son parent
 * direct a une hauteur définie, ce qui n'est pas le cas ici (parents en
 * `auto`, dictés par leur padding) — des `h-[%]` s'y écraseraient
 * silencieusement à 0.
 */
export function BrowserFrame({
  project,
  className,
  priority,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  const { fond, fondSombre, accent } = project.palette;
  const shot = project.screenshots?.desktop;
  const shotWidth = project.screenshots?.desktopWidth;
  const shotHeight = project.screenshots?.desktopHeight;
  // Le cadre adopte exactement le ratio du fichier réel : aucun crop du
  // Hero, aucune déformation. Fallback 16/10 uniquement si un projet a une
  // capture sans dimensions connues (ne devrait pas arriver en pratique).
  const shotAspectStyle =
    shot && shotWidth && shotHeight ? { aspectRatio: `${shotWidth} / ${shotHeight}` } : undefined;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--radius-lg)] border border-line shadow-[var(--shadow-lg)]",
        className,
      )}
    >
      {/* Barre de navigateur */}
      <div className="flex items-center gap-2 border-b border-black/[0.06] bg-[#efeae1] px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="size-2.5 rounded-full bg-black/15" />
        <span className="size-2.5 rounded-full bg-black/15" />
        <div className="ml-3 flex h-6 flex-1 items-center rounded-full bg-white/70 px-3 text-[11px] font-medium text-black/40">
          {project.name.toLowerCase().replace(/\s+/g, "")}.fr
        </div>
      </div>

      {shot ? (
        /* Vraie capture du site — le conteneur adopte le ratio exact du
           fichier (voir shotAspectStyle) : le Hero s'affiche donc en
           entier, sans crop ni déformation, quelle que soit la taille du
           cadre qui l'accueille (homepage, liste, page projet). */
        <div
          className={cn("relative w-full overflow-hidden bg-[#f4f1ea]", !shotAspectStyle && "aspect-16/10")}
          style={shotAspectStyle}
        >
          <Image
            src={shot}
            alt={`Aperçu du site ${project.name}`}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-top"
            priority={priority}
          />
        </div>
      ) : (
      /* Contenu simulé */
      <div className="relative aspect-[16/13.2] w-full overflow-hidden" style={{ backgroundColor: fond.color }}>
        {/* Nav simulée */}
        <div className="flex items-center justify-between px-[6%] pt-[6%]">
          <div className="h-2.5 w-[16%] rounded-sm" style={{ backgroundColor: fondSombre.color, opacity: 0.85 }} />
          <div className="flex gap-[4%]">
            <div className="h-1.5 w-[7%] rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.25 }} />
            <div className="h-1.5 w-[7%] rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.25 }} />
            <div className="h-1.5 w-[7%] rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.25 }} />
          </div>
        </div>

        {/* Bloc "hero" — dégradé radial (au lieu d'une teinte plate) : une
            impression de lumière et de profondeur, sans simuler une fausse
            capture d'écran — toujours un aplat de couleur, jamais une image
            inventée (voir data/projects.ts). */}
        <div
          className={cn(
            "mx-[6%] mt-[7%] flex flex-col gap-3 rounded-[6px] px-[6%] py-[9%]",
            project.typeStyle === "serif" ? "items-center text-center" : "items-start text-left",
          )}
          style={{
            backgroundImage: `radial-gradient(130% 160% at ${
              project.typeStyle === "serif" ? "50% -10%" : "10% 0%"
            }, color-mix(in srgb, ${accent.color} 35%, ${fondSombre.color}), ${fondSombre.color} 70%)`,
          }}
        >
          <div
            className={cn(
              "font-[family-name:var(--font-display)] leading-none font-normal",
              project.typeStyle === "serif" && "text-xl italic sm:text-2xl",
              project.typeStyle === "sans-bold" && "text-lg not-italic sm:text-xl",
              project.typeStyle === "sans-condensed" && "text-lg tracking-tight not-italic sm:text-xl",
            )}
            style={{ color: fond.color }}
          >
            {project.name}
          </div>
          <div className="h-2 w-[70%] rounded-full" style={{ backgroundColor: fond.color, opacity: 0.35 }} />
          <div className="h-2 w-[50%] rounded-full" style={{ backgroundColor: fond.color, opacity: 0.25 }} />
          <div className="mt-1 h-7 w-[34%] rounded-full sm:h-8" style={{ backgroundColor: accent.color }} />
        </div>

        {/* Bande de contenu sous le hero — trois blocs abstraits (icône +
            deux lignes de texte) pour que le mockup se lise comme la suite
            d'une vraie page plutôt qu'un unique bandeau isolé. */}
        <div className="mx-[6%] mt-[6%] grid grid-cols-3 gap-[4%]">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex flex-col gap-[10%] rounded-[5px] p-[9%]"
              style={{ backgroundColor: `color-mix(in srgb, ${fondSombre.color} 6%, transparent)` }}
            >
              <div className="size-3 rounded-full" style={{ backgroundColor: accent.color, opacity: 0.75 }} />
              <div className="h-1.5 w-[85%] rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.3 }} />
              <div className="h-1.5 w-[55%] rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.18 }} />
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}
