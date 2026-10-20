import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { IconFacebook, IconInstagram, IconTikTok, IconTwitter, IconWhatsApp, IconYouTube } from "@/components/ui/icons";
import { whatsappHref } from "@/lib/utils";
import type { SiteSettings } from "@/lib/types";

export async function Footer({
  settings,
  locale,
}: {
  settings: SiteSettings;
  locale: string;
}) {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();
  const name = locale === "ar" ? settings.companyName.ar : settings.companyName.en;
  const tiktok = settings.tiktokUrl?.trim() || "";
  const youtube = settings.youtubeUrl?.trim() || "";
  const whatsapp = whatsappHref(settings.whatsapp || "");
  const instagram = settings.instagramUrl?.trim() || "";
  const facebook = settings.facebookUrl?.trim() || "";
  const twitter = settings.twitterUrl?.trim() || "";
  const hasSocial = Boolean(tiktok || youtube || whatsapp || instagram || facebook || twitter);

  const serviceLinks = [
    { href: "/about#services", label: t("civilWorks") },
    { href: "/about#services", label: t("buildingMaintenance") },
    { href: "/about#services", label: t("interiorFitout") },
    { href: "/about#services", label: t("infrastructure") },
    { href: "/about#services", label: t("aluminiumGlass") },
  ];
  const companyLinks = [
    { href: "/about", label: t("aboutUs") },
    { href: "/projects", label: t("portfolio") },
    { href: "/articles", label: t("insights") },
    { href: "/#process", label: t("executionStandards") },
    { href: "/documents", label: t("globalCompliance") },
    { href: "/contact", label: t("careers") },
  ];
  const complianceLinks = [
    { href: "/documents", label: t("privacy") },
    { href: "/documents", label: t("terms") },
    { href: "/documents", label: t("mme") },
    { href: "/documents/hse-policy.pdf", label: t("hse") },
    { href: "/documents", label: t("iso") },
  ];

  return (
    <footer className="bg-[#0d0d0d] text-white">
      <div className="container-wide py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Logo name={name} tone="light" />
            <p className="mt-6 text-sm leading-relaxed text-white/55">{t("blurb")}</p>
            {hasSocial ? (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {tiktok ? (
                  <SocialLink href={tiktok} label={t("tiktok")}>
                    <IconTikTok className="size-4" />
                  </SocialLink>
                ) : null}
                {youtube ? (
                  <SocialLink href={youtube} label={t("youtube")}>
                    <IconYouTube className="size-4" />
                  </SocialLink>
                ) : null}
                {instagram ? (
                  <SocialLink href={instagram} label={t("instagram")}>
                    <IconInstagram className="size-4" />
                  </SocialLink>
                ) : null}
                {facebook ? (
                  <SocialLink href={facebook} label={t("facebook")}>
                    <IconFacebook className="size-4" />
                  </SocialLink>
                ) : null}
                {twitter ? (
                  <SocialLink href={twitter} label={t("twitter")}>
                    <IconTwitter className="size-4" />
                  </SocialLink>
                ) : null}
                {whatsapp ? (
                  <SocialLink href={whatsapp} label={t("whatsapp")}>
                    <IconWhatsApp className="size-4" />
                  </SocialLink>
                ) : null}
              </div>
            ) : null}
          </div>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-16">
            <FooterColumn title={t("services")} links={serviceLinks} />
            <FooterColumn title={t("company")} links={companyLinks} />
            <FooterColumn title={t("compliance")} links={complianceLinks} />
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/20 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>{t("rights", { year, company: name })}</p>
          <p>
            {t.rich("broughtToLife", {
              name: (chunks) => (
                <a
                  href="https://qwebdigital.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 underline-offset-2 hover:text-[#FFC72C] hover:underline"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
      {whatsapp ? (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t("whatsapp")}
          className="fixed bottom-5 end-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgb(37_211_102/0.45)] transition hover:scale-105 hover:bg-[#1ebe5d]"
        >
          <IconWhatsApp className="size-7" />
        </a>
      ) : null}
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-[#FFC72C] hover:text-[#FFC72C]"
    >
      {children}
    </a>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#FFC72C]">{title}</p>
      <ul className="space-y-2.5 text-sm text-white/70">
        {links.map((link) => (
          <li key={link.label}>
            {link.href.endsWith(".pdf") ? (
              <a href={link.href} className="hover:text-gold">
                {link.label}
              </a>
            ) : (
              <Link href={link.href} className="hover:text-gold">
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
