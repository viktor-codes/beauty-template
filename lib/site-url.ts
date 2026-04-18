/**
 * Canonical absolute URL helpers for metadata and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL in production for valid absolute identifiers.
 */

export function getSiteUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return null;
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function toAbsoluteUrl(path: string): string {
  const baseUrl = getSiteUrl();
  if (!baseUrl) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${baseUrl}${path}`;
  return `${baseUrl}/${path}`;
}
