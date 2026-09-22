"use client";

import { useEffect, useRef, useState } from "react";

type Stat = {
  key: string;
  value: number;
  prefix?: string;
  suffix?: string;
  pad?: number;
  label: string;
  note: string;
};

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatItem({ stat, active }: { stat: Stat; active: boolean }) {
  const counted = useCountUp(stat.value, active);
  const display = `${stat.prefix || ""}${stat.pad ? String(counted).padStart(stat.pad, "0") : counted}${stat.suffix || ""}`;

  return (
    <div className="text-center md:text-start">
      <p className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 md:justify-start">
        <span className="display text-5xl leading-none tabular-nums text-[#FFC72C] md:text-6xl">{display}</span>
        <span className="max-w-[12rem] text-[0.7rem] font-bold uppercase leading-tight tracking-[0.16em] text-white">
          {stat.label}
        </span>
      </p>
      <p className="mx-auto mt-3 max-w-xs text-sm text-white md:mx-0">{stat.note}</p>
    </div>
  );
}

export function HomeStats({ items }: { items: Stat[] }) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-[#0b0b0b]">
      <div className="container-wide grid gap-10 py-14 md:grid-cols-3 md:gap-8 md:py-16">
        {items.map((stat) => (
          <StatItem key={stat.key} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}
