export const CONTACT_GENERAL_EMAIL =
  process.env.CONTACT_GENERAL_TO?.trim() || process.env.CONTACT_TO_EMAIL?.trim() || "info@bucc.qa";

export const CONTACT_QUOTE_EMAILS = (
  process.env.CONTACT_QUOTE_TO?.trim() || "seedahmed@bucc.qa,Shahil@bucc.qa"
)
  .split(/[,;]/)
  .map((value) => value.trim())
  .filter(Boolean);

export const GENERAL_CONTACT_PHONES = ["+974 4444 0683"];
export const QUOTE_CONTACT_PHONES = ["+974 4444 0683", "+974 7095 8889"];

const GENERAL_INQUIRY_SUBJECTS = new Set([
  "generalinquiry",
  "general inquiry",
  "general enquiry",
  "استفسار عام",
]);

export function isGeneralInquiry(subject: string) {
  return GENERAL_INQUIRY_SUBJECTS.has(subject.trim().toLowerCase());
}

export function contactRecipients(subject: string) {
  return isGeneralInquiry(subject) ? [CONTACT_GENERAL_EMAIL] : CONTACT_QUOTE_EMAILS;
}
