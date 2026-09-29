import nodemailer from "nodemailer";
import {
  CONTACT_TO_EMAIL,
  contactEmailHtml,
  contactEmailSubject,
  contactEmailText,
  type ContactEmailPayload,
} from "./contact-template";

const DEFAULT_FROM = "Back Up Construction <info@bucc.qa>";
const RESEND_TIMEOUT_MS = 15000;

export type ContactEmailErrorCode = "not_configured" | "rejected" | "network";

export class ContactEmailError extends Error {
  constructor(
    message: string,
    public readonly code: ContactEmailErrorCode,
  ) {
    super(message);
    this.name = "ContactEmailError";
  }
}

function fromAddress() {
  const configured = process.env.CONTACT_FROM_EMAIL?.trim();
  if (configured && /<[^@\s>]+@[^@\s>]+\.[^@\s>]+>/.test(configured)) {
    return configured;
  }
  if (configured && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(configured)) {
    return `Back Up Construction <${configured}>`;
  }
  return DEFAULT_FROM;
}

function resendDetail(body: string) {
  try {
    const parsed = JSON.parse(body) as { message?: string };
    return parsed.message?.trim() || body;
  } catch {
    return body;
  }
}

async function sendWithResend(payload: ContactEmailPayload) {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return false;

  let response: Response;
  try {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: [CONTACT_TO_EMAIL],
        reply_to: payload.email,
        subject: contactEmailSubject(payload),
        html: contactEmailHtml(payload),
        text: contactEmailText(payload),
      }),
      signal: AbortSignal.timeout(RESEND_TIMEOUT_MS),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Resend request failed.";
    throw new ContactEmailError(message, "network");
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new ContactEmailError(resendDetail(detail) || "Resend rejected the email.", "rejected");
  }
  return true;
}

async function sendWithSmtp(payload: ContactEmailPayload) {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return false;

  try {
    const port = Number(process.env.SMTP_PORT || 587);
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: fromAddress(),
      to: CONTACT_TO_EMAIL,
      replyTo: `${payload.name} <${payload.email}>`,
      subject: contactEmailSubject(payload),
      html: contactEmailHtml(payload),
      text: contactEmailText(payload),
    });
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : "SMTP delivery failed.";
    throw new ContactEmailError(message, "network");
  }
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  if (!CONTACT_TO_EMAIL) {
    throw new ContactEmailError("CONTACT_TO_EMAIL is not set.", "not_configured");
  }
  if (await sendWithResend(payload)) return;
  if (await sendWithSmtp(payload)) return;
  throw new ContactEmailError("Email is not configured.", "not_configured");
}
