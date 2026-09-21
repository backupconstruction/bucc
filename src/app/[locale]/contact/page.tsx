import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactDetails } from "@/components/contact/contact-details";
import { ContactForm } from "@/components/contact/contact-form";
import { getSettings } from "@/lib/cms";
import { localized, mapsEmbedSrc } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("pageTitle"),
    description: t("pageLead"),
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const settings = await getSettings();
  const mapSrc =
    mapsEmbedSrc(settings.mapEmbedUrl) ||
    (localized(settings.address, locale)
      ? `https://maps.google.com/maps?q=${encodeURIComponent(localized(settings.address, locale))}&output=embed`
      : "");

  return (
    <div className="bg-[#2a2a2a] py-16 md:py-24">
      <div className="container-wide grid gap-10 text-white lg:grid-cols-2 lg:items-start">
        <div>
          <p className="eyebrow">{t("kicker")}</p>
          <h1 className="display mt-3 max-w-xl text-5xl text-white !normal-case md:text-7xl">{t("title")}</h1>
          <p className="mt-5 max-w-md text-lg text-white/65">{t("lead")}</p>
          <ContactDetails
            email={settings.email}
            phone={settings.phone}
            address={localized(settings.address, locale)}
            hotlinesLabel={t("officeHotlines")}
            queriesLabel={t("executiveQueries")}
            hqLabel={t("headquarters")}
          />
        </div>
        <ContactForm locale={locale} replyEmail={settings.email} />
      </div>
      {mapSrc ? (
        <div className="container-wide">
          <iframe
            title={localized(settings.address, locale) || "Map"}
            src={mapSrc}
            className="mt-10 h-80 w-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : null}
    </div>
  );
}
