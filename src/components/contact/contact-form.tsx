"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconArrow } from "@/components/ui/icons";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { pushSiteToast } from "@/components/ui/site-toast";

const SUBJECTS = ["general", "designBuild", "projectManagement", "interiorDesign"] as const;

const field =
  "w-full rounded-md border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#FFC72C]";

export function ContactForm({ locale, replyEmail }: { locale: string; replyEmail?: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      pushSiteToast(t("error"), "error");
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null;
      if (response.status === 429) {
        pushSiteToast(t("rateLimit"), "error");
        return;
      }
      if (!response.ok) {
        pushSiteToast(result?.error === "emailConfig" ? t("emailConfig") : t("emailFailed"), "error");
        return;
      }
      form.reset();
      pushSiteToast(t("success"));
    } catch {
      pushSiteToast(t("emailFailed"), "error");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl bg-[#0d0d0d] p-6 text-white md:p-8" noValidate>
      <h3 className="text-xl font-semibold tracking-tight">{t("formTitle")}</h3>
      <div className="mt-6 grid gap-4">
        <label className="grid gap-2 text-sm">
          <span>
            {t("name")} <span className="text-[#FFC72C]">*</span>
          </span>
          <input name="name" required minLength={2} placeholder={t("namePlaceholder")} className={field} />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm">
            <span>
              {t("email")} <span className="text-[#FFC72C]">*</span>
            </span>
            <input name="email" type="email" required placeholder={t("emailPlaceholder")} className={field} />
          </label>
          <label className="grid gap-2 text-sm">
            <span>
              {t("phone")} <span className="text-[#FFC72C]">*</span>
            </span>
            <input
              name="phone"
              required
              minLength={6}
              dir="ltr"
              placeholder={t("phonePlaceholder")}
              className={field}
            />
          </label>
        </div>
        <label className="grid gap-2 text-sm">
          <span>
            {t("subject")} <span className="text-[#FFC72C]">*</span>
          </span>
          <SelectDropdown
            name="subject"
            label={t("subject")}
            required
            defaultValue="general"
            triggerClassName={field}
            menuClassName="overflow-hidden rounded-md border border-white/10 bg-[#111] text-white shadow-[var(--shadow)]"
            optionClassName="text-white hover:bg-white/10"
            selectedClassName="bg-[#FFC72C] font-medium text-ink"
            options={SUBJECTS.map((value) => ({
              value,
              label: t(`subjects.${value}`),
            }))}
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span>{t("message")}</span>
          <textarea
            name="message"
            required
            minLength={10}
            rows={4}
            placeholder={t("messagePlaceholder")}
            className={`${field} min-h-28 resize-y`}
          />
        </label>
        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-white/45">{t("note", { email: replyEmail || "info@bucc.qa" })}</p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#FFC72C] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-ink transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? t("sending") : t("submit")} <IconArrow className="size-4" />
          </button>
        </div>
      </div>
    </form>
  );
}
