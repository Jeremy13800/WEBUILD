import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Bouton du Design System WEBUILD.
 *
 * `primary` (argile) est réservé aux actions de conversion — parler d'un
 * projet, démarrer. Il ne doit jamais y avoir deux boutons `primary`
 * visibles en même temps dans une même zone : l'argile perd son pouvoir de
 * signal si elle est partout (voir brief §33).
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md font-semibold transition-all",
    "duration-200 ease-[var(--ease-standard)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-clay-600 text-white shadow-[var(--shadow-sm)]",
          "hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-clay)]",
          "active:translate-y-0",
        ].join(" "),
        secondary: [
          "border border-white/30 text-white bg-white/0",
          "hover:bg-white/10 hover:-translate-y-0.5",
        ].join(" "),
        "secondary-light": [
          "border border-line-strong text-ink bg-transparent",
          "hover:bg-paper-dim hover:-translate-y-0.5",
        ].join(" "),
        ghost: ["text-ink-soft hover:text-ink hover:bg-black/5"].join(" "),
      },
      size: {
        default: "h-12 px-6 text-[0.95rem]",
        lg: "h-14 px-7 text-base",
        sm: "h-10 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = "Button";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants> & { href: string };

/** Variante lien — `next/link` pour la navigation interne, ancre classique pour `tel:`/`mailto:`/externes. */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, href, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <Link ref={ref} href={href} className={classes} {...props}>
          {props.children}
        </Link>
      );
    }
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {props.children}
      </a>
    );
  },
);
ButtonLink.displayName = "ButtonLink";
