"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container, wideContainer } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/**
 * Pages qui démarrent directement sur un fond clair (`bg-paper`), sans
 * bandeau sombre en haut — le header doit y rester plein (fond crème,
 * texte encre) même tout en haut de page, sinon le texte clair du header
 * transparent devient illisible sur fond clair. Partout ailleurs, la
 * première section est sombre (photo du Hero ou bandeau `bg-ink-950`) et
 * remonte sous le header via `-mt-18` (voir ces sections) : le header
 * transparent s'y fond naturellement.
 */
const LIGHT_TOP_ROUTES = ["/mentions-legales", "/politique-de-confidentialite"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const forceSolid = LIGHT_TOP_ROUTES.includes(pathname);
  // `lightHeader` : fond crème plein + texte encre — nécessaire sur les
  // pages qui démarrent clair (`forceSolid`) et pour le panneau mobile
  // ouvert (`open`, plein écran clair en dessous). Distinct de l'état
  // "scrollé" : au scroll sur une page à Hero sombre, le header ne bascule
  // plus en crème, seulement en fond sombre translucide + flou (voir plus
  // bas) — le texte y reste donc blanc.
  const lightHeader = forceSolid || open;
  const scrolledDark = scrolled && !open && !forceSolid;
  const solid = lightHeader;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-colors duration-300",
        lightHeader
          ? "border-b border-line bg-paper/90"
          : scrolledDark
            ? // Fond sombre très subtil au scroll (pas le crème plein de
              // `lightHeader`) : la page reste sur son thème Hero sombre,
              // seul un léger voile + flou signale qu'on a défilé.
              "border-b border-white/10 bg-ink-950/70"
            : "border-b border-transparent",
        // `backdrop-blur` sur le header crée un nouveau "containing block"
        // pour le panneau mobile `fixed` qui en est l'enfant DOM (voir plus
        // bas) : sa hauteur se retrouverait bornée à celle du header (72px)
        // au lieu de toute la hauteur de l'écran. `scrolledDark` exclut déjà
        // `open`, donc ce risque ne se présente pas ici.
        scrolledDark && "backdrop-blur-md",
      )}
    >
      {/* `wideContainer` uniquement sur l'accueil : le Hero y utilise ce
          même conteneur élargi pour sa colonne de texte (voir hero.tsx),
          et le logo doit démarrer exactement au même niveau que le H1 —
          sinon les deux dérivent chacun sur leur propre grille (1240px
          par défaut) au-delà de 1416px. Ailleurs sur le site, le contenu
          garde la grille standard à 1240px, donc le header aussi. */}
      <Container
        className={cn(
          "grid h-18 grid-cols-[auto_1fr_auto] items-center gap-4 py-4",
          pathname === "/" && wideContainer,
        )}
      >
        {/* Logo fourni par le client (icône + "WeBuild" gravés dans
            l'image, halo lumineux inclus) — remplace l'ancien pictogramme
            CSS + texte séparé. `priority` : toujours visible au premier
            écran sur chaque page.

            Ce PNG est pensé pour un fond sombre : le "Build" blanc et son
            halo fumé n'ont presque aucun contraste sur `lightHeader` (fond
            crème — vérifié, quasi illisible). Plutôt que d'imposer ce
            défaut sur les pages concernées (mentions légales,
            confidentialité, panneau mobile ouvert), on y garde un texte
            simple en encre, parfaitement lisible, en attendant une
            variante du logo pensée pour fond clair si besoin. */}
        <Link href="/" className="flex items-center">
          {lightHeader ? (
            <span className="font-[family-name:var(--font-display)] text-[1.375rem] font-normal tracking-tight text-ink">
              {siteConfig.name}
            </span>
          ) : (
            // Le PNG a une marge transparente d'environ 13% avant le début
            // réel du pictogramme (halo lumineux du fichier source) —
            // vérifié en scannant le canal alpha colonne par colonne.
            // Alignée au conteneur, l'image plaçait donc le hexagone visible
            // trop à droite par rapport au texte en dessous. La marge
            // négative compense cet écart pour que le pictogramme (pas la
            // boîte de l'image) démarre au même niveau que le H1.
            // Largeur visée : ~127px mobile / ~140px desktop (retour client :
            // "+25 à 35%", cible 130-150px sur desktop).
            <Image
              src="/images/logo-webuild.png"
              alt={siteConfig.name}
              width={326}
              height={109}
              priority
              className="ml-[-16.8px] h-[42.2px] w-[126.6px] max-w-none shrink-0 sm:ml-[-18.6px] sm:h-[46.7px] sm:w-35"
            />
          )}
        </Link>

        {/* Colonne centrale en 1fr, flanquée de deux colonnes `auto` : la
            nav reste visuellement centrée sur toute la largeur du header,
            même si le logo et le CTA n'ont pas la même largeur.
            `text-[15px]` (+1px) et `lg:gap-10` (+4px) : liens un peu plus
            lisibles et mieux respirés. */}
        <nav className="hidden items-center justify-self-center lg:flex lg:gap-10">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-[15px] font-medium transition-colors duration-300",
                solid ? "text-ink-soft hover:text-ink" : "text-white/80 hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-self-end">
          {/* `size="sm"` (40px/16px/14px) override en +~12% : h-11/px-5/15px
              — le CTA du header doit se voir davantage, sans pour autant
              rivaliser avec les CTA "lg" des sections de contenu. */}
          <div className="hidden lg:block">
            <ButtonLink href={siteConfig.ctaSecondary.href} size="sm" className="h-11 px-5 text-[15px]">
              {siteConfig.ctaSecondary.label}
            </ButtonLink>
          </div>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "grid size-11 place-items-center rounded-md transition-colors duration-300 lg:hidden",
              solid ? "text-ink" : "text-white",
            )}
          >
            {open ? <X className="size-6" strokeWidth={1.75} /> : <Menu className="size-6" strokeWidth={1.75} />}
          </button>
        </div>
      </Container>

      {/* Menu mobile plein écran */}
      <div
        className={cn(
          "fixed inset-x-0 top-18 bottom-0 z-40 flex flex-col justify-between bg-paper px-6 pt-8 pb-10 transition-all duration-300 lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1">
          {siteConfig.nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
              className={cn(
                "border-b border-line py-5 font-[family-name:var(--font-display)] text-3xl font-normal text-ink transition-all duration-300",
                open ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <ButtonLink href={siteConfig.ctaSecondary.href} size="lg" className="w-full">
          {siteConfig.ctaSecondary.label}
        </ButtonLink>
      </div>
    </header>
  );
}
