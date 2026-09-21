import type { CSSProperties } from "react";
import { IconCalendar, IconClipboard, IconShield } from "@/components/ui/icons";

const ITEMS = [
  { key: "safety", icon: IconShield, tone: "gold" },
  { key: "quality", icon: IconClipboard, tone: "dark" },
  { key: "logistics", icon: IconCalendar, tone: "dark" },
] as const;

export function StandardsCards({
  items,
}: {
  items: { key: (typeof ITEMS)[number]["key"]; title: string; subtitle: string; body: string }[];
}) {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {ITEMS.map((meta) => {
        const item = items.find((entry) => entry.key === meta.key);
        if (!item) return null;
        const Icon = meta.icon;
        const gold = meta.tone === "gold";
        return (
          <article
            key={item.key}
            className={`standard-card group relative overflow-hidden rounded-2xl p-7 md:p-8 ${
              gold ? "bg-[#FFC72C] text-ink" : "bg-[#1a1a1a] text-white"
            }`}
            style={{ "--standard-fill": gold ? "#1a1a1a" : "#ffc72c" } as CSSProperties}
          >
            <span className="standard-card-fill" aria-hidden />
            <div className="relative z-10 flex items-start gap-3">
              <Icon
                className={`mt-0.5 size-5 shrink-0 transition-colors duration-300 ${
                  gold ? "text-ink group-hover:text-[#FFC72C]" : "text-[#FFC72C] group-hover:text-ink"
                }`}
              />
              <div>
                <h3
                  className={`text-lg font-semibold tracking-tight transition-colors duration-300 ${
                    gold ? "group-hover:text-white" : "group-hover:text-ink"
                  }`}
                >
                  {item.title}
                </h3>
                <p
                  className={`mt-1 text-sm transition-colors duration-300 ${
                    gold ? "text-ink/70 group-hover:text-white/60" : "text-white/50 group-hover:text-ink/70"
                  }`}
                >
                  {item.subtitle}
                </p>
              </div>
            </div>
            <p
              className={`relative z-10 mt-6 text-sm leading-relaxed transition-colors duration-300 ${
                gold ? "text-ink/85 group-hover:text-white/75" : "text-white/60 group-hover:text-ink/80"
              }`}
            >
              {item.body}
            </p>
          </article>
        );
      })}
    </div>
  );
}
