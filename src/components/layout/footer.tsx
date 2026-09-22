import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
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
          </div>
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-16">
            <FooterColumn title={t("services")} links={serviceLinks} />
            <FooterColumn title={t("company")} links={companyLinks} />
            <FooterColumn title={t("compliance")} links={complianceLinks} />
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/20 pt-6 text-xs text-white/45 sm:flex-row sm:justify-between">
          <p>{t("rights", { year, company: name })}</p>
        </div>
      </div>
    </footer>
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
