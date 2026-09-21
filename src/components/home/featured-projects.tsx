"use client";

import { useTranslations } from "next-intl";
import { MediaImage } from "@/components/ui/media-image";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button";
import { IconArrowUpRight } from "@/components/ui/icons";
import { localized } from "@/lib/utils";
import type { Category, Project } from "@/lib/types";

function categoryName(categories: Category[], id: string, locale: string) {
  const match = categories.find((item) => item.id === id);
  return match ? localized(match.name, locale) : "";
}

export function FeaturedProjects({
  title,
  projects,
  categories,
  locale,
}: {
  title: string;
  projects: Project[];
  categories: Category[];
  locale: string;
}) {
  const t = useTranslations("projects");

  return (
    <section className="container-wide py-20 md:py-28">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">{t("kicker")}</p>
          <h2 className="display mt-3 max-w-xl text-4xl md:text-6xl">{title}</h2>
        </div>
        <Link href="/projects" className={buttonClass("gold", "shrink-0 uppercase tracking-[0.12em]")}>
          {t("viewAll")} <IconArrowUpRight className="size-4" />
        </Link>
      </div>

      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`} className="w-[min(82vw,400px)] shrink-0 snap-start">
            <article className="overflow-hidden rounded-2xl border border-border">
              <div className="relative overflow-hidden">
                <MediaImage
                  src={project.featuredImageUrl}
                  alt={localized(project.title, locale)}
                  width={720}
                  height={420}
                  sizes="(min-width: 768px) 400px, 82vw"
                  className="h-56 w-full object-cover"
                />
                {project.isFeatured ? (
                  <span className="absolute start-3 top-3 rounded-md bg-gold px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-ink">
                    {t("featured")}
                  </span>
                ) : null}
              </div>
              <div className="grid gap-3 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">
                  {localized(project.location, locale)} · {categoryName(categories, project.categoryId, locale)}
                </p>
                <h3 className="text-xl font-semibold tracking-tight">{localized(project.title, locale)}</h3>
                <div className="flex items-center justify-between border-t border-border pt-3 text-xs uppercase tracking-[0.12em] text-muted">
                  <span>{t("status")}</span>
                  <span className="text-foreground">{t(project.status)}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}
