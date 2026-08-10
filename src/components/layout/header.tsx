"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
        scrolled || open ? "border-b border-line bg-paper/90 backdrop-blur-md" : "border-b border-transparent",
      )}
    >
      <Container className="flex h-18 items-center justify-between py-4">
        <Link href="/" className="font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-ink">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={siteConfig.ctaSecondary.href} size="sm">
            {siteConfig.ctaSecondary.label}
          </ButtonLink>
        </div>

        <button
          type="button"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="grid size-11 place-items-center rounded-md text-ink lg:hidden"
        >
          {open ? <X className="size-6" strokeWidth={1.75} /> : <Menu className="size-6" strokeWidth={1.75} />}
        </button>
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
                "border-b border-line py-5 font-[family-name:var(--font-display)] text-3xl font-medium text-ink transition-all duration-300",
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
