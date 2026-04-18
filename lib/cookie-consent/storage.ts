export const CONSENT_COOKIE_NAME = "skinbar_cookie_consent_v1";

/** ~12 months (RFC 6265 max-age in seconds). */
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export interface ParsedConsent {
  v: 1;
  analytics: boolean;
}

export function serializeConsent(data: ParsedConsent): string {
  return JSON.stringify(data);
}

export function parseConsentCookie(raw: string | undefined): ParsedConsent | null {
  if (!raw) return null;
  try {
    const decoded = decodeURIComponent(raw);
    const parsed: unknown = JSON.parse(decoded);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "v" in parsed &&
      (parsed as ParsedConsent).v === 1 &&
      "analytics" in parsed &&
      typeof (parsed as ParsedConsent).analytics === "boolean"
    ) {
      return parsed as ParsedConsent;
    }
  } catch {
    return null;
  }
  return null;
}

export function readConsentFromDocumentCookie(): ParsedConsent | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));
  if (!match) return null;
  const value = match.slice(CONSENT_COOKIE_NAME.length + 1);
  return parseConsentCookie(value);
}

export function writeConsentToDocumentCookie(data: ParsedConsent): void {
  if (typeof document === "undefined") return;
  const secure =
    typeof window !== "undefined" && window.location.protocol === "https:"
      ? ";Secure"
      : "";
  const value = encodeURIComponent(serializeConsent(data));
  document.cookie = `${CONSENT_COOKIE_NAME}=${value};path=/;max-age=${CONSENT_MAX_AGE_SECONDS};SameSite=Lax${secure}`;
}
