/**
 * Single source of truth for the studio phone — tel: and messenger deep links derive here.
 */

export const STUDIO_PHONE_E164 = "+353873744393";

/** Human-readable label (spaces only; tel / messengers use digits from E164). */
export const STUDIO_PHONE_DISPLAY = "+353 87 374 4393";

/** Digits only, including country code (e.g. 353… for WhatsApp / Viber). */
export function studioPhoneDigits(): string {
  return STUDIO_PHONE_E164.replace(/\D/g, "");
}

export function studioPhoneTelHref(): string {
  return `tel:${STUDIO_PHONE_E164.replace(/\s/g, "")}`;
}

export function studioPhoneTelegramHref(): string {
  return `https://t.me/+${studioPhoneDigits()}`;
}

export function studioPhoneWhatsAppHref(): string {
  return `https://wa.me/${studioPhoneDigits()}`;
}

export function studioPhoneViberHref(): string {
  const digits = studioPhoneDigits();
  // Trailing slash + %2B (+E.164) matches common Viber examples; digits-only `chat?number=` fails on some iOS builds.
  return `viber://chat/?number=%2B${digits}`;
}
