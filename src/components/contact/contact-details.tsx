import type { ReactNode } from "react";
import { IconMail, IconPhone, IconPin } from "@/components/ui/icons";

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

export function ContactDetails({
  email,
  phone,
  address,
  hotlinesLabel,
  queriesLabel,
  hqLabel,
}: {
  email: string;
  phone: string;
  address: string;
  hotlinesLabel: string;
  queriesLabel: string;
  hqLabel: string;
}) {
  return (
    <div className="mt-10 space-y-5 rounded-2xl bg-[#111] px-6 py-6">
      <Row icon={<IconPhone />} label={hotlinesLabel}>
        <a href={`tel:${phone.replace(/\s/g, "")}`} dir="ltr" className="inline-block">
          {phone}
        </a>
      </Row>
      <Row icon={<IconMail />} label={queriesLabel}>
        <a href={`mailto:${email}`}>{email}</a>
      </Row>
      <Row icon={<IconPin className="size-5" />} label={hqLabel}>
        <p>{address}</p>
      </Row>
    </div>
  );
}
