import type { ReactNode } from "react";
import { IconMail, IconPhone, IconPin } from "@/components/ui/icons";
import {
  CONTACT_GENERAL_EMAIL,
  CONTACT_QUOTE_EMAILS,
  GENERAL_CONTACT_PHONES,
  QUOTE_CONTACT_PHONES,
} from "@/lib/email/contact-routing";

function Row({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 shrink-0 text-[#FFC72C]">{icon}</span>
      <div>
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/45">{label}</p>
        <div className="mt-1 text-sm text-white">{children}</div>
      </div>
    </div>
  );
}

function PhoneList({ numbers }: { numbers: string[] }) {
  return (
    <div className="flex flex-col gap-1">
      {numbers.map((number) => (
        <a key={number} href={`tel:${number.replace(/\s/g, "")}`} dir="ltr" className="inline-block">
          {number}
        </a>
      ))}
    </div>
  );
}

export function ContactDetails({
  address,
  generalLabel,
  quoteLabel,
  queriesLabel,
  hqLabel,
}: {
  address: string;
  generalLabel: string;
  quoteLabel: string;
  queriesLabel: string;
  hqLabel: string;
}) {
  return (
    <div className="mt-10 space-y-5 rounded-2xl bg-[#111] px-6 py-6">
      <Row icon={<IconPhone />} label={generalLabel}>
        <PhoneList numbers={GENERAL_CONTACT_PHONES} />
      </Row>
      <Row icon={<IconPhone />} label={quoteLabel}>
        <PhoneList numbers={QUOTE_CONTACT_PHONES} />
      </Row>
      <Row icon={<IconMail />} label={queriesLabel}>
        <div className="flex flex-col gap-1">
          <a href={`mailto:${CONTACT_GENERAL_EMAIL}`}>{CONTACT_GENERAL_EMAIL}</a>
          {CONTACT_QUOTE_EMAILS.map((email) => (
            <a key={email} href={`mailto:${email}`}>
              {email}
            </a>
          ))}
        </div>
      </Row>
      <Row icon={<IconPin className="size-5" />} label={hqLabel}>
        <p>{address}</p>
      </Row>
    </div>
  );
}
