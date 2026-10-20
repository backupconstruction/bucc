"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconArrow } from "@/components/ui/icons";
import { SelectDropdown } from "@/components/ui/select-dropdown";
import { pushSiteToast } from "@/components/ui/site-toast";
import { contactRecipients } from "@/lib/email/contact-routing";
import {
  CONTACT_ATTACHMENT_ACCEPT,
  isAllowedContactAttachment,
  MAX_CONTACT_ATTACHMENTS,
  MAX_CONTACT_ATTACHMENTS_TOTAL,
} from "@/lib/validations";

const SUBJECTS = ["generalInquiry", "general", "designBuild", "projectManagement", "interiorDesign"] as const;

const field =
  "w-full rounded-md border border-white/10 bg-[#111] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30 focus:border-[#FFC72C]";

export function ContactForm({ locale }: { locale: string; replyEmail?: string }) {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [subject, setSubject] = useState<(typeof SUBJECTS)[number]>("generalInquiry");
  const [files, setFiles] = useState<File[]>([]);
  const replyTo = contactRecipients(subject).join(", ");

  function addFiles(list: FileList | null) {
    const incoming = Array.from(list || []);
    if (!incoming.length) return;
    const next = [...files];
    for (const file of incoming) {
      if (!isAllowedContactAttachment(file)) {
        pushSiteToast(t("attachmentInvalid"), "error");
        continue;
      }
      if (next.length >= MAX_CONTACT_ATTACHMENTS) {
        pushSiteToast(t("attachmentLimit"), "error");
        break;
      }
      if (next.some((item) => item.name === file.name && item.size === file.size)) continue;
      next.push(file);
    }
    const total = next.reduce((sum, file) => sum + file.size, 0);
    if (total > MAX_CONTACT_ATTACHMENTS_TOTAL) {
      pushSiteToast(t("attachmentTooLarge"), "error");
      return;
    }
    setFiles(next);
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      pushSiteToast(t("error"), "error");
      return;
    }

    const data = new FormData(form);
    data.set("locale", locale);
    data.delete("attachments");
    for (const file of files) data.append("attachments", file);

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });
      const result = (await response.json().catch(() => null)) as { error?: string; ok?: boolean } | null;
      if (response.status === 429) {
        pushSiteToast(t("rateLimit"), "error");
        return;
      }
      if (!response.ok) {
        const messages = {
          emailConfig: t("emailConfig"),
          attachmentInvalid: t("attachmentInvalid"),
          attachmentLimit: t("attachmentLimit"),
          attachmentTooLarge: t("attachmentTooLarge"),
        } as const;
        pushSiteToast(
          messages[result?.error as keyof typeof messages] || t("emailFailed"),
          "error",
        );
        return;
      }
      form.reset();
      setSubject("generalInquiry");
      setFiles([]);
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
            value={subject}
            onChange={(next) => setSubject(next as (typeof SUBJECTS)[number])}
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
        <div className="grid gap-2 text-sm">
          <span>{t("attachments")}</span>
          <p className="text-xs text-white/45">{t("attachmentsHint")}</p>
          <label className={`${field} cursor-pointer`}>
            <input
              type="file"
              multiple
              accept={CONTACT_ATTACHMENT_ACCEPT}
              className="sr-only"
              onChange={(event) => {
                addFiles(event.target.files);
                event.target.value = "";
              }}
            />
            <span className="text-white/70">{t("attachmentsChoose")}</span>
          </label>
          {files.length ? (
            <ul className="grid gap-2">
              {files.map((file) => (
                <li
                  key={`${file.name}-${file.size}`}
                  className="flex items-center justify-between gap-3 rounded-md border border-white/10 bg-[#111] px-4 py-2 text-xs text-white/80"
                >
                  <span className="min-w-0 truncate" dir="ltr">
                    {file.name}
                  </span>
                  <button
                    type="button"
                    className="shrink-0 text-white/45 hover:text-white"
                    onClick={() => setFiles((current) => current.filter((item) => item !== file))}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xs text-xs leading-relaxed text-white/45">{t("note", { email: replyTo })}</p>
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
