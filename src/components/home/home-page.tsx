import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button";
import { IconArrow, IconArrowUpRight } from "@/components/ui/icons";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { CredentialsCards } from "@/components/home/credentials-cards";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { HomeStats } from "@/components/home/home-stats";
import { ServiceCards, type ServiceKey } from "@/components/home/service-cards";
import { StandardsCards } from "@/components/home/standards-cards";
import { localized } from "@/lib/utils";
import type { Article, Category, DocumentItem, Project, SiteSettings, Testimonial } from "@/lib/types";

const VALUE_KEYS = ["quality", "innovation", "speed", "accuracy"] as const;
const SERVICE_KEYS = ["contracting", "designBuild", "projectManagement", "interiorDesign"] as const;

export async function HomePage({
  locale,
  settings,
  projects,
  categories,
}: {
  locale: string;
  settings: SiteSettings;
  projects: Project[];
  ongoing: Project[];
  articles: Article[];
  documents: DocumentItem[];
  testimonials: Testimonial[];
  categories: Category[];
}) {
  const t = await getTranslations();

  return (
    <>
      <section className="bg-[var(--hero-bg)] py-10 md:py-16">
        <div className="container-wide grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">{t("hero.eyebrow")}</p>
            <h1 className="display mt-4 text-5xl md:text-7xl lg:text-[5.4rem]">
              {t("hero.titleLine1")}
              <br />
              <span className="text-[#FFC72C]">{t("hero.titleLine2")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {t("hero.subtitle")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about#services" className={buttonClass("gold", "uppercase tracking-[0.12em]")}>
                {t("hero.ctaPrimary")} <IconArrow className="size-4" />
              </Link>
              <Link href="/contact" className={buttonClass("secondary", "uppercase tracking-[0.12em]")}>
                {t("hero.ctaSecondary")} <IconArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero-media.svg"
              alt={t("hero.coverTitle")}
              className="h-[460px] w-full rounded-[2rem] object-cover md:h-[520px]"
            />
            <div className="absolute inset-x-0 bottom-0 rounded-b-[2rem] bg-ink/85 px-5 py-4 text-white backdrop-blur-sm">
              <p className="text-sm font-semibold">{t("hero.coverTitle")}</p>
              <p className="text-xs text-white/70">{t("hero.coverSubtitle")}</p>
            </div>
          </div>
        </div>
      </section>

      <HomeStats
        items={[
          {
            key: "years",
            value: 5,
            pad: 2,
            label: t("about.stats.years.label"),
            note: t("about.stats.years.note"),
          },
          {
            key: "landmarks",
            value: 34,
            suffix: "+",
            label: t("about.stats.landmarks.label"),
            note: t("about.stats.landmarks.note"),
          },
          {
            key: "clients",
            value: 16,
            suffix: "+",
            label: t("about.stats.clients.label"),
            note: t("about.stats.clients.note"),
          },
        ]}
      />

      <section className="container-wide grid items-center gap-12 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-28">
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/img-left.svg"
            alt={t("about.imageAlt")}
            className="w-[72%] rounded-lg object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/img-top.svg"
            alt={t("about.engineersAlt")}
            className="absolute top-0 end-0 w-[38%] rounded-lg object-cover"
          />
          <div className="absolute end-[4%] bottom-0 flex aspect-square w-[32%] flex-col items-center justify-center rounded-lg bg-[#FFC72C] text-ink">
            <p className="display text-3xl leading-none md:text-4xl lg:text-5xl">{t("about.stats.compliant.value")}</p>
            <p className="mt-2 max-w-[7rem] text-center text-[0.58rem] font-bold uppercase leading-tight tracking-[0.14em]">
              {t("about.stats.compliant.label")}
            </p>
          </div>
        </div>
        <div>
          <p className="eyebrow">{t("about.kicker")}</p>
          <h2 className="display mt-4 max-w-xl text-4xl !normal-case md:text-5xl lg:text-[3.35rem]">
            {t("about.title")}
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">{t("about.lead")}</p>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {VALUE_KEYS.map((key) => (
              <div key={key}>
                <p className="font-semibold text-[#FFC72C]">{t(`about.values.${key}.title`)}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{t(`about.values.${key}.body`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="bg-ink-2 py-20 text-white">
        <div className="container-wide">
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">{t("services.kicker")}</p>
              <h2 className="display mt-3 max-w-3xl text-4xl text-white md:text-6xl">{t("services.title")}</h2>
            </div>
            <a
              href="/documents/company-profile.pdf"
              download
              className={buttonClass("gold", "shrink-0 uppercase tracking-[0.12em]")}
            >
              {t("services.downloadCatalog")} <IconArrowUpRight className="size-4" />
            </a>
          </div>
          <ServiceCards
            ask={t("services.ask")}
            items={SERVICE_KEYS.map((key) => ({
              key: key as ServiceKey,
              title: t(`services.${key}.title`),
              body: t(`services.${key}.body`),
            }))}
          />
        </div>
      </section>

      <FeaturedProjects
        title={t("projects.title")}
        projects={projects}
        categories={categories}
        locale={locale}
      />

      <section id="process" className="container-wide py-20 md:py-28">
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
      </section>

      <section className="bg-[#2a2a2a] py-20 md:py-24">
        <div className="container-wide">
          <div className="text-center">
            <p className="eyebrow">{t("documents.homeKicker")}</p>
            <h2 className="display mt-3 text-3xl text-white !normal-case md:text-5xl">
              {t("documents.homeTitle")}
            </h2>
          </div>
          <div className="mt-12">
            <CredentialsCards
              items={(["gradeA", "iso9001", "iso45001", "gsa"] as const).map((key) => ({
                key,
                title: t(`documents.credentials.${key}.title`),
                body: t(`documents.credentials.${key}.body`),
              }))}
            />
          </div>
        </div>
      </section>

      <div className="bg-[#2a2a2a]">
        <div className="h-px origin-center scale-y-50 bg-white/70" />
      </div>
      <section className="bg-[#2a2a2a]">
        <div className="container-wide grid gap-10 py-16 text-white lg:grid-cols-2 lg:items-start md:py-24">
          <div>
            <p className="eyebrow">{t("contact.kicker")}</p>
            <h2 className="display mt-3 max-w-xl text-4xl text-white !normal-case md:text-6xl">
              {t("contact.title")}
            </h2>
            <p className="mt-5 max-w-md text-white/65">{t("contact.lead")}</p>
            <ContactDetails
              email={settings.email}
              phone={settings.phone}
              address={localized(settings.address, locale)}
              hotlinesLabel={t("contact.officeHotlines")}
              queriesLabel={t("contact.executiveQueries")}
              hqLabel={t("contact.headquarters")}
            />
          </div>
          <ContactForm locale={locale} replyEmail={settings.email} />
        </div>
      </section>
    </>
  );
}
