import Image from "next/image";
import { cn } from "@/lib/utils";

const FALLBACK_NAME = "Back Up Construction";

function companyLockup(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    return { primary: words.join(" "), secondary: "" };
  }
  if (words.length === 3) {
    return { primary: words.slice(0, 2).join(" "), secondary: words[2] };
  }
  return {
    primary: words.slice(0, -2).join(" "),
    secondary: words.slice(-2).join(" "),
  };
}

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
  const { primary, secondary } = companyLockup(displayName);
  const arabic = /[\u0600-\u06FF]/.test(displayName);
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
        <span className={cn("min-w-0", arabic ? "leading-[1.25]" : "leading-[1.15]")}>
          <span
            className={cn(
              "block font-bold",
              arabic ? "text-[1.05rem] tracking-normal" : "text-[0.78rem] uppercase tracking-[0.18em]",
              light ? "text-white" : "text-foreground",
            )}
          >
            {primary}
          </span>
          {secondary ? (
            <span
              className={cn(
                "block font-semibold",
                arabic ? "text-[0.82rem] tracking-normal" : "text-[0.62rem] uppercase tracking-[0.16em]",
                light ? "text-white/70" : "text-muted",
              )}
            >
              {secondary}
            </span>
          ) : null}
        </span>
      )}
    </span>
  );
}
