import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "gold" | "dark";

const variants: Record<Variant, string> = {
  primary: "bg-foreground text-background hover:bg-ink-2",
  secondary: "border border-current bg-transparent hover:bg-gold hover:text-ink hover:border-gold",
  ghost: "bg-transparent text-foreground hover:bg-surface",
  gold: "bg-gold text-ink hover:brightness-105",
  dark: "bg-ink text-white hover:bg-ink-2",
};

export const goldHoverClass =
  "hover:bg-gold hover:text-ink dark:hover:bg-gold dark:hover:text-ink";

export function buttonClass(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60",
    variants[variant],
    className,
  );
}
