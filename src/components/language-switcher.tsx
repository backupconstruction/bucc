"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.16em]">
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: "en" })}
        className={cn("px-1.5 py-1", locale === "en" ? "text-gold" : "text-white/60 hover:text-white")}
      >
        EN
      </button>
      <span className="text-white/30">|</span>
      <button
        type="button"
        onClick={() => router.replace(pathname, { locale: "ar" })}
        className={cn("px-1.5 py-1", locale === "ar" ? "text-gold" : "text-white/60 hover:text-white")}
      >
        العربية
      </button>
    </div>
  );
}
