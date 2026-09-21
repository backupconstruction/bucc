import { Link } from "@/i18n/navigation";
import { IconFile, IconGlobe, IconSeal, IconShield } from "@/components/ui/icons";

const ITEMS = [
  { key: "gradeA", icon: IconSeal },
  { key: "iso9001", icon: IconFile },
  { key: "iso45001", icon: IconShield },
  { key: "gsa", icon: IconGlobe },
] as const;

export function CredentialsCards({
  items,
}: {
  items: { key: (typeof ITEMS)[number]["key"]; title: string; body: string }[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {ITEMS.map((meta) => {
        const item = items.find((entry) => entry.key === meta.key);
        if (!item) return null;
        const Icon = meta.icon;
        return (
          <Link
            key={item.key}
            href="/documents"
            className="flex items-start gap-3 rounded-xl border border-[#FFC72C] bg-[#F7F4EE] px-5 py-4 text-ink transition hover:-translate-y-0.5"
          >
            <Icon className="mt-0.5 size-5 shrink-0 text-[#FFC72C]" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-tight">{item.title}</span>
              <span className="mt-1 block truncate text-xs text-ink/55">{item.body}</span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
