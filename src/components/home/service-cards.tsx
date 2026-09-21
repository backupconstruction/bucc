import { Link } from "@/i18n/navigation";
import { IconArrow, IconCheck, IconCircleX, IconPencil, IconSofa } from "@/components/ui/icons";

const ICONS = {
  contracting: IconCircleX,
  designBuild: IconPencil,
  projectManagement: IconCheck,
  interiorDesign: IconSofa,
} as const;

export type ServiceKey = keyof typeof ICONS;

export function ServiceCards({
  items,
  ask,
}: {
  items: { key: ServiceKey; title: string; body: string }[];
  ask: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item, index) => {
        const Icon = ICONS[item.key];
        return (
          <article key={item.key} className="group relative overflow-hidden rounded-[1.75rem] bg-[#111] p-8 md:p-10">
            <span className="service-card-fill" aria-hidden />
            <div className="relative z-10 flex items-start justify-between gap-4">
              <span className="grid size-12 place-items-center rounded-lg bg-[#1a1610] text-[#FFC72C] group-hover:bg-ink/10 group-hover:text-ink">
                <Icon className="size-6" />
              </span>
              <span className="text-sm tabular-nums text-white/35 group-hover:text-ink/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="relative z-10 mt-8 text-2xl font-semibold tracking-tight text-white group-hover:text-ink md:text-[1.7rem]">
              {item.title}
            </h3>
            <p className="relative z-10 mt-4 max-w-md text-sm leading-relaxed text-white/55 group-hover:text-ink/75">
              {item.body}
            </p>
            <Link
              href="/contact"
              className="relative z-10 mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#FFC72C] group-hover:text-ink"
            >
              {ask} <IconArrow className="size-4" />
            </Link>
          </article>
        );
      })}
    </div>
  );
}
