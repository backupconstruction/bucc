"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SLIDES = [
  { src: "/images/hero-villa.jpg", key: "villa" },
  { src: "/images/hero-palace.jpg", key: "palace" },
  { src: "/images/hero-commercial.jpg", key: "commercial" },
] as const;

export function HomeHero() {
  const t = useTranslations("hero");
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPaused(true);
    }
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setCurrent((index) => (index + 1) % SLIDES.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <section className="relative h-[590px] overflow-hidden bg-ink text-white md:h-[660px] xl:h-[760px]">
      {SLIDES.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={t(`slides.${slide.key}`)}
          fill
          priority={index === 0}
          sizes="100vw"
          className={cn(
            "object-cover object-[35%_center] transition-opacity duration-700 md:object-center",
            index === current ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(270deg,rgba(0,0,0,.92),rgba(0,0,0,.53)_45%,rgba(0,0,0,.03)),linear-gradient(0deg,rgba(0,0,0,.65),transparent_40%)] ltr:scale-x-[-1]" />

      <div className="container-wide relative z-10 flex h-full flex-col justify-between py-10 md:py-12 xl:py-16">
        <div className="max-w-xl md:max-w-[650px]">
          <p className="mb-5 flex items-center gap-2.5 text-[11px] font-medium tracking-[0.13em] text-[#FFC72C]">
            <i className="inline-block size-1.5 bg-[#FFC72C]" />
            {t("eyebrow")}
          </p>
          <h1 className="display text-[2.65rem] leading-[1.25] tracking-tight text-white md:text-[3.3rem] xl:text-7xl">
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/90 md:text-lg md:leading-[1.9]">
            {t("subtitle")}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5 md:gap-8">
            <Link href="/contact" className={buttonClass("gold", "uppercase tracking-[0.12em]")}>
              {t("ctaPrimary")}
            </Link>
            <Link href="/about#services" className="text-sm text-white/85 underline-offset-4 hover:text-[#FFC72C] hover:underline">
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-5 flex flex-wrap justify-end gap-2">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.key}
                type="button"
                aria-pressed={index === current}
                onClick={() => {
                  setCurrent(index);
                  setPaused(true);
                }}
                className={cn(
                  "border px-3 py-2 text-[11px] md:px-4 md:text-xs",
                  index === current
                    ? "border-[#FFC72C] bg-[#FFC72C] text-ink"
                    : "border-white/50 bg-black/50 text-white hover:border-white",
                )}
              >
                {t(`slides.${slide.key}`)}
              </button>
            ))}
            <button
              type="button"
              aria-pressed={paused}
              aria-label={paused ? t("play") : t("pause")}
              onClick={() => setPaused((value) => !value)}
              className="border border-white/50 bg-black/50 px-3 py-2 text-xs text-white hover:border-white md:px-4"
            >
              {paused ? "▶" : "Ⅱ"}
            </button>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-white/20 py-5 text-[11px] tracking-[0.16em] text-white/75">
            <span dir="ltr" className="font-medium uppercase">
              {t("location")}
            </span>
            <span className="hidden tracking-normal sm:inline">{t("bottom")}</span>
            <Link href="/#about" className="text-2xl leading-none text-white hover:text-[#FFC72C]" aria-label={t("scroll")}>
              ↓
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
