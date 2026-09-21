"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { buttonClass, goldHoverClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

export function ProjectFilters({
  categories,
  locale,
}: {
  categories: Category[];
  locale: string;
}) {
  const t = useTranslations("projects");
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("category") || "all";
  const status = params.get("status") || "all";
  const query = params.get("q") || "";

  function update(next: Record<string, string>) {
    const search = new URLSearchParams(params.toString());
    Object.entries(next).forEach(([key, value]) => {
      if (!value || value === "all") search.delete(key);
      else search.set(key, value);
    });
    search.delete("page");
    const qs = search.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {[{ slug: "all", name: { en: t("all"), ar: t("all") } }, ...categories].map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => update({ category: item.slug })}
            className={cn(
              "border border-border px-4 py-2 text-sm uppercase tracking-[0.08em]",
              current === item.slug ? "bg-ink text-white dark:bg-gold dark:text-ink" : "hover:bg-surface",
            )}
          >
            {locale === "ar" ? item.name.ar : item.name.en}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <form
          className="flex min-w-0 flex-1 flex-wrap gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            update({ q: String(data.get("q") || "").trim() });
          }}
        >
          <label className="sr-only" htmlFor="project-search">
            {t("search")}
          </label>
          <input
            id="project-search"
            name="q"
            key={query}
            defaultValue={query}
            placeholder={t("search")}
            className="min-w-0 flex-1 border border-border bg-background px-4 py-2 text-sm sm:max-w-md"
          />
          <button type="submit" className={buttonClass("dark", cn(goldHoverClass, "px-4 py-2"))}>
            {t("searchAction")}
          </button>
        </form>
        <select
          value={status}
          onChange={(event) => update({ status: event.target.value })}
          className="border border-border bg-background px-4 py-2 text-sm"
          aria-label={t("status")}
        >
          <option value="all">{t("status")}</option>
          <option value="planning">{t("planning")}</option>
          <option value="in_progress">{t("in_progress")}</option>
          <option value="completed">{t("completed")}</option>
        </select>
      </div>
    </div>
  );
}
