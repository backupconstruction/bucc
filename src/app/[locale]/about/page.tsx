import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button";
import { ServiceCards, type ServiceKey } from "@/components/home/service-cards";
import { StandardsCards } from "@/components/home/standards-cards";
import { getSettings } from "@/lib/cms";
import { localized } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === "ar" ? "من نحن" : "About";
  return { title, alternates: { canonical: `/${locale}/about` } };
}

const VALUE_KEYS = ["quality", "innovation", "speed", "accuracy"] as const;
const SERVICE_KEYS = ["contracting", "designBuild", "projectManagement", "interiorDesign"] as const;

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  const settings = await getSettings();

  return (
    <div>
      <section className="container-wide py-16 md:py-24">
        <p className="eyebrow">{t("about.kicker")}</p>
        <h1 className="display mt-3 max-w-4xl text-5xl md:text-7xl">{t("about.title")}</h1>
        <p className="mt-6 max-w-2xl text-lg text-muted">{localized(settings.about, locale)}</p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-media.svg"
            alt={t("about.imageAlt")}
            className="h-[420px] w-full object-cover"
          />
          <div className="flex flex-col justify-center">
            <p className="text-muted">{t("about.lead")}</p>
            <p className="mt-4 text-muted">{t("about.body1")}</p>
            <p className="mt-4 text-muted">{t("about.body2")}</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="bg-gold p-6 text-ink">
                <p className="display text-4xl">{t("about.statProjects")}</p>
                <p className="mt-2 text-sm">{t("about.statProjectsLabel")}</p>
              </div>
              <div className="bg-ink p-6 text-white">
                <p className="display text-4xl">{t("about.statSatisfaction")}</p>
                <p className="mt-2 text-sm">{t("about.statSatisfactionLabel")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface">
        <div className="container-wide grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {(["years", "landmarks", "clients", "compliant"] as const).map((stat) => (
            <div key={stat}>
              <p className="display text-5xl text-ink dark:text-gold">{t(`about.stats.${stat}.value`)}</p>
              <p className="mt-2 text-sm font-semibold">{t(`about.stats.${stat}.label`)}</p>
              <p className="mt-1 text-xs text-muted">{t(`about.stats.${stat}.note`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-wide grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {VALUE_KEYS.map((key) => (
          <article key={key} className="border border-border bg-background p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
              {t(`about.values.${key}.title`)}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">{t(`about.values.${key}.body`)}</p>
          </article>
        ))}
      </section>

      <section id="services" className="bg-ink-2 py-20 text-white">
        <div className="container-wide">
          <p className="eyebrow">{t("services.kicker")}</p>
          <h2 className="display mt-3 max-w-3xl text-4xl text-white md:text-6xl">{t("services.title")}</h2>
          <p className="mt-4 max-w-xl text-white/70">{t("services.lead")}</p>
          <div className="mt-10">
            <ServiceCards
              ask={t("services.ask")}
              items={SERVICE_KEYS.map((key) => ({
                key: key as ServiceKey,
                title: t(`services.${key}.title`),
                body: t(`services.${key}.body`),
              }))}
            />
          </div>
        </div>
      </section>

      <section id="process" className="container-wide py-20">
        <p className="eyebrow">{t("process.kicker")}</p>
        <h2 className="display mt-3 max-w-4xl text-4xl !normal-case md:text-6xl">{t("process.title")}</h2>
        <div className="mt-12">
          <StandardsCards
            items={(["safety", "quality", "logistics"] as const).map((key) => ({
              key,
              title: t(`process.standards.${key}.title`),
              subtitle: t(`process.standards.${key}.subtitle`),
              body: t(`process.standards.${key}.body`),
            }))}
          />
        </div>
        <Link href="/contact" className={buttonClass("dark", "mt-10 uppercase tracking-[0.12em]")}>
          {t("process.cta")}
        </Link>
      </section>
    </div>
  );
}
