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
  const onDark = tone === "light";

  return (
    <span className={cn("inline-flex min-w-0 items-center", className)}>
      <Image
        src={onDark ? "/brand/bucc_logo.png" : "/brand/bucc_logo_dark.png"}
        alt={displayName}
        width={724}
        height={706}
        className={cn("w-auto object-contain", compact ? "h-11" : "h-16 sm:h-[4.75rem]")}
        priority
      />
    </span>
  );
}
