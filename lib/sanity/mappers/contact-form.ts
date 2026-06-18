import type { ContactFormCopy } from "@/lib/types/content";

interface SanityContactFormValidationLike {
  nameRequired?: string;
  nameTooLong?: string;
  emailInvalid?: string;
  messageMin?: string;
  messageTooLong?: string;
}

export interface SanityContactFormLike {
  nameLabel?: string;
  namePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submit?: string;
  submitPending?: string;
  successMessage?: string;
  errorMessage?: string;
  validation?: SanityContactFormValidationLike | null;
}

function mapValidationSafe(
  raw: SanityContactFormValidationLike | null | undefined,
  fallback: ContactFormCopy["validation"],
): ContactFormCopy["validation"] {
  if (!raw) return fallback;

  return {
    nameRequired: raw.nameRequired?.trim() || fallback.nameRequired,
    nameTooLong: raw.nameTooLong?.trim() || fallback.nameTooLong,
    emailInvalid: raw.emailInvalid?.trim() || fallback.emailInvalid,
    messageMin: raw.messageMin?.trim() || fallback.messageMin,
    messageTooLong: raw.messageTooLong?.trim() || fallback.messageTooLong,
  };
}

export function mapContactFormSafe(
  raw: SanityContactFormLike | null | undefined,
  fallback: ContactFormCopy,
): ContactFormCopy {
  if (!raw?.nameLabel?.trim() || !raw.submit?.trim()) return fallback;

  return {
    nameLabel: raw.nameLabel.trim(),
    namePlaceholder: raw.namePlaceholder?.trim() || fallback.namePlaceholder,
    emailLabel: raw.emailLabel?.trim() || fallback.emailLabel,
    emailPlaceholder: raw.emailPlaceholder?.trim() || fallback.emailPlaceholder,
    messageLabel: raw.messageLabel?.trim() || fallback.messageLabel,
    messagePlaceholder: raw.messagePlaceholder?.trim() || fallback.messagePlaceholder,
    submit: raw.submit.trim(),
    submitPending: raw.submitPending?.trim() || fallback.submitPending,
    successMessage: raw.successMessage?.trim() || fallback.successMessage,
    errorMessage: raw.errorMessage?.trim() || fallback.errorMessage,
    validation: mapValidationSafe(raw.validation, fallback.validation),
  };
}
