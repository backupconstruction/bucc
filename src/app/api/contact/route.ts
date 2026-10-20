import { NextResponse } from "next/server";
import { addContactMessage } from "@/lib/cms";
import { ContactEmailError, sendContactEmail } from "@/lib/email/send-contact";
import type { ContactEmailAttachment } from "@/lib/email/contact-template";
import {
  contactSchema,
  isAllowedContactAttachment,
  MAX_CONTACT_ATTACHMENTS,
  MAX_CONTACT_ATTACHMENTS_TOTAL,
} from "@/lib/validations";

export const maxDuration = 60;

const windowMs = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((time) => now - time < windowMs);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function safeFilename(name: string) {
  return name.replace(/[/\\]/g, "-").replace(/[^\w.\- ()[\]]+/g, "_").slice(0, 180) || "attachment";
}

async function readAttachments(form: FormData): Promise<ContactEmailAttachment[] | { error: string }> {
  const files = form
    .getAll("attachments")
    .filter((item): item is File => item instanceof File && item.size > 0);
  if (files.length > MAX_CONTACT_ATTACHMENTS) return { error: "attachmentLimit" };
  if (files.some((file) => !isAllowedContactAttachment(file))) return { error: "attachmentInvalid" };
  const total = files.reduce((sum, file) => sum + file.size, 0);
  if (total > MAX_CONTACT_ATTACHMENTS_TOTAL) return { error: "attachmentTooLarge" };

  return Promise.all(
    files.map(async (file) => ({
      filename: safeFilename(file.name),
      content: Buffer.from(await file.arrayBuffer()),
      contentType: file.type || "application/octet-stream",
    })),
  );
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return NextResponse.json({ error: "rateLimit" }, { status: 429 });
  }

  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse({
    name: form.get("name"),
    email: form.get("email"),
    phone: form.get("phone"),
    subject: form.get("subject"),
    message: form.get("message"),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const attachments = await readAttachments(form);
  if ("error" in attachments) {
    return NextResponse.json({ error: attachments.error }, { status: 400 });
  }

  const payload = {
    ...parsed.data,
    locale: String(form.get("locale") || "en"),
    attachments,
  };

  try {
    await sendContactEmail(payload);
  } catch (error) {
    console.error("Contact email failed", error);
    const code = error instanceof ContactEmailError ? error.code : "rejected";
    return NextResponse.json(
      { error: code === "not_configured" ? "emailConfig" : "email" },
      { status: 502 },
    );
  }

  try {
    await addContactMessage({
      name: payload.name,
      email: payload.email,
      phone: payload.phone,
      subject: payload.subject,
      message: payload.attachments.length
        ? `${payload.message}\n\nAttachments: ${payload.attachments.map((item) => item.filename).join(", ")}`
        : payload.message,
      locale: payload.locale,
    });
  } catch (error) {
    console.error("Contact message store failed", error);
  }

  return NextResponse.json({ ok: true });
}
