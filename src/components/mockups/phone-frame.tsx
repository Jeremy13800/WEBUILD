import Image from "next/image";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

/** Aperçu "mobile" d'un projet — même logique que BrowserFrame : si
 * `project.screenshots.mobile` existe, affiche la vraie capture mobile du
 * site ; sinon retombe sur l'aperçu simulé (mêmes hauteurs fixes, même
 * raison — voir BrowserFrame). Le cadre adopte le ratio exact du fichier
 * réel (comme BrowserFrame) : un ratio fixe générique coupait le contenu
 * dès que l'aspect d'une vraie capture s'en écartait un peu. */
export function PhoneFrame({ project, className }: { project: Project; className?: string }) {
  const { fond, fondSombre, accent } = project.palette;
  const shot = project.screenshots?.mobile;
  const shotWidth = project.screenshots?.mobileWidth;
  const shotHeight = project.screenshots?.mobileHeight;
  const shotAspectStyle =
    shot && shotWidth && shotHeight ? { aspectRatio: `${shotWidth} / ${shotHeight}` } : undefined;

  return (
    <div
      className={cn(
        "w-[46%] shrink-0 overflow-hidden rounded-[20px] border-[6px] border-[#171310] shadow-[var(--shadow-lg)]",
        className,
      )}
      style={{ backgroundColor: fond.color }}
    >
      {shot ? (
        <div
          className={cn("relative w-full overflow-hidden", !shotAspectStyle && "aspect-9/18.5")}
          style={shotAspectStyle}
        >
          <Image
            src={shot}
            alt={`Version mobile du site ${project.name}`}
            fill
            sizes="24vw"
            className="object-cover object-top"
          />
        </div>
      ) : (
      <div className="aspect-[9/18.5] w-full">
        <div className="flex items-center justify-between px-[10%] pt-[8%]">
          <div className="h-2 w-[26%] rounded-sm" style={{ backgroundColor: fondSombre.color, opacity: 0.85 }} />
          <div className="flex flex-col gap-1">
            <span className="block h-[1.5px] w-3 rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.5 }} />
            <span className="block h-[1.5px] w-3 rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.5 }} />
            <span className="block h-[1.5px] w-3 rounded-full" style={{ backgroundColor: fondSombre.color, opacity: 0.5 }} />
          </div>
        </div>
        <div
          className="mx-[8%] mt-[6%] flex flex-col gap-2 rounded-[10px] px-[8%] py-[12%]"
          style={{ backgroundColor: fondSombre.color }}
        >
          <div className="h-1.5 w-[80%] rounded-full" style={{ backgroundColor: fond.color, opacity: 0.4 }} />
          <div className="h-1.5 w-[55%] rounded-full" style={{ backgroundColor: fond.color, opacity: 0.25 }} />
          <div className="mt-1.5 h-5 w-[62%] rounded-full" style={{ backgroundColor: accent.color }} />
        </div>
      </div>
      )}
    </div>
  );
}
