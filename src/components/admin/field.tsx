import type { FocusEvent, FormEvent, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Field({
  label,
  name,
  defaultValue,
  textarea,
  dir,
  required,
  type = "text",
  min,
  max,
  step,
  inputMode,
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  textarea?: boolean;
  dir?: string;
  required?: boolean;
  type?: string;
  min?: number;
  max?: number;
  step?: number | string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const className = cn(
    "w-full border border-border bg-background px-4 py-3 text-sm",
    textarea ? "min-h-36 rounded-[1.2rem]" : type === "date" || type === "datetime-local" ? "rounded-[1.2rem]" : "rounded-full",
  );

  function keepNumbers(event: FormEvent<HTMLInputElement>) {
    if (type !== "number") return;
    const el = event.currentTarget;
    const next = el.value.replace(/[^\d]/g, "");
    if (next === el.value) return;
    el.value = next;
  }

  function clampRange(event: FocusEvent<HTMLInputElement>) {
    if (type !== "number" || !event.currentTarget.value) return;
    const el = event.currentTarget;
    const value = Number(el.value);
    if (!Number.isFinite(value)) {
      el.value = "";
      return;
    }
    if (min != null && value < min) el.value = String(min);
    if (max != null && value > max) el.value = String(max);
  }

  return (
    <label className="grid gap-2 text-sm">
      <span className="font-medium">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue ?? ""} required={required} dir={dir} className={className} />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue ?? ""}
          required={required}
          dir={dir}
          min={min}
          max={max}
          step={step}
          inputMode={inputMode || (type === "number" ? "numeric" : undefined)}
          onInput={keepNumbers}
          onBlur={clampRange}
          className={className}
        />
      )}
    </label>
  );
}
