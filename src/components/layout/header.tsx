"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/ui/logo";
import { buttonClass } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/about#services", key: "services" },
  { href: "/projects", key: "projects" },
  { href: "/documents", key: "documents" },
  { href: "/contact", key: "contact" },
] as const;

function normalizePath(pathname: string) {
  const stripped = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return stripped || "/";
}

function isNavActive(pathname: string, href: string, hash = "") {
  const current = normalizePath(pathname);
  if (href === "/") return current === "/";
  if (href === "/about#services") return current === "/about" && hash === "#services";
  if (href === "/about") return current === "/about" && hash !== "#services";
  const path = href.split("#")[0];
  return current === path || current.startsWith(`${path}/`);
}

export function Header({ companyName }: { hours: string; companyName: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hash, setHash] = useState("");

  useEffect(() => {
    setOpen(false);
    setHash(typeof window !== "undefined" ? window.location.hash : "");
  }, [pathname]);

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const scrolled = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrolled / max)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-ink text-white">
      <div className="container-wide relative flex items-center justify-between gap-3 py-3">
        <Link href="/" className="min-w-0 shrink" onClick={() => setOpen(false)}>
          <Logo name={companyName} tone="light" />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Primary">
          {LINKS.map((link) => {
            const active = isNavActive(pathname, link.href, hash);
            return (
              <Link
                key={link.key}
                href={link.href}
                className={
                  active
                    ? "text-[13px] font-semibold tracking-wide text-[#FFC72C]"
                    : "text-[13px] font-medium tracking-wide text-white/70 hover:text-[#FFC72C]"
                }
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle className="text-white hover:bg-white/10" />
            <Link href="/contact" className={buttonClass("gold", "px-4 py-2 text-xs uppercase tracking-[0.14em]")}>
              {t("startProject")}
            </Link>
          </div>
          <button
            type="button"
            className="grid size-10 place-items-center hover:bg-white/10 lg:hidden"
            aria-expanded={open}
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="flex w-4 flex-col gap-1.5">
              <span className={cn("h-px bg-white transition", open && "translate-y-1 rotate-45")} />
              <span className={cn("h-px bg-white transition", open && "-translate-y-1 -rotate-45")} />
            </span>
          </button>
        </div>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-gold"
          style={{ transform: `scaleX(${progress})` }}
          aria-hidden
        />
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ink text-white transition-transform duration-300 ease-out lg:hidden",
          open ? "pointer-events-auto translate-y-0" : "pointer-events-none -translate-y-full",
        )}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/" className="min-w-0" onClick={() => setOpen(false)}>
            <Logo name={companyName} tone="light" />
          </Link>
          <button
            type="button"
            className="grid size-11 place-items-center bg-white/10"
            aria-label={t("closeMenu")}
            onClick={() => setOpen(false)}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 py-4" aria-label="Mobile">
          <div className="grid gap-1">
            {LINKS.map((link) => {
              const active = isNavActive(pathname, link.href, hash);
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={
                    active
                      ? "px-2 py-4 text-2xl font-semibold uppercase tracking-tight text-[#FFC72C]"
                      : "px-2 py-4 text-2xl font-semibold uppercase tracking-tight text-white hover:text-[#FFC72C]"
                  }
                  onClick={() => setOpen(false)}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="border-t border-white/10 px-5 py-5">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="flex items-center justify-between bg-white/5 px-4 py-3">
              <span className="text-sm text-white/60">{t("language")}</span>
              <LanguageSwitcher />
            </div>
            <div className="flex items-center justify-between bg-white/5 px-4 py-3">
              <span className="text-sm text-white/60">{t("theme")}</span>
              <ThemeToggle className="text-white hover:bg-white/10" />
            </div>
          </div>
          <Link
            href="/contact"
            className={buttonClass("gold", "w-full py-3.5 uppercase tracking-[0.14em]")}
            onClick={() => setOpen(false)}
          >
            {t("startProject")}
          </Link>
        </div>
      </div>
    </header>
  );
}
