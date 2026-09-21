import Image from "next/image";
import { cn } from "@/lib/utils";

const FALLBACK_NAME = "Back Up Construction";

export function Logo({
  className,
  compact = false,
  name = FALLBACK_NAME,
  tone = "dark",
}: {
  className?: string;
  compact?: boolean;
  name?: string;
  tone?: "dark" | "light";
}) {
  const displayName = name.trim() || FALLBACK_NAME;
  const light = tone === "light";

  return (
    <span className={cn("inline-flex min-w-0 items-center gap-2.5", className)}>
      <Image
        src="/brand/bucc_logo.png"
        alt={displayName}
        width={64}
        height={64}
        className="size-14 shrink-0 object-contain sm:size-16"
        priority
      />
      {!compact && (
        <span className="min-w-0 leading-[1.05]">
          <span
            className={cn(
              "block text-[0.78rem] font-bold uppercase tracking-[0.18em]",
              light ? "text-white" : "text-foreground",
            )}
          >
            Back Up
          </span>
          <span
            className={cn(
              "block text-[0.62rem] font-semibold uppercase tracking-[0.16em]",
              light ? "text-white/70" : "text-muted",
            )}
          >
            Construction
          </span>
        </span>
      )}
    </span>
  );
}
