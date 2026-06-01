export function validateTelHref(value: string | undefined) {
  if (!value?.trim()) return true;
  const trimmed = value.trim();
  if (!trimmed.startsWith("tel:")) {
    return 'Use a tel: link (e.g. tel:+353861234567).';
  }
  if (trimmed.length < 8) {
    return "tel: link looks too short.";
  }
  return true;
}

export function validateEmailAddress(value: string | undefined) {
  if (!value?.trim()) return true;
  const trimmed = value.trim();
  if (trimmed.includes(" ")) {
    return "Email must not contain spaces.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email address (without mailto:).";
  }
  return true;
}

/** Sanity `url` fields — allow empty; when set, require http(s). */
export function validateHttpUrl(value: string | undefined) {
  if (!value?.trim()) return true;
  try {
    const parsed = new URL(value.trim());
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "URL must start with http:// or https://";
    }
    return true;
  } catch {
    return "Enter a valid URL.";
  }
}
