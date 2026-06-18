/**
 * Canonical absolute URL helpers for metadata, JSON-LD, emails, and Stripe redirects.
 * Set NEXT_PUBLIC_SITE_URL in production; VERCEL_URL/local fallback keeps dev usable.
 */

const localSiteUrl = "http://localhost:3000";

function normalizeSiteUrl(value: string): string {
  const trimmed = value.trim();
  return trimmed.endsWith("/") ? trimmed.slice(0, -1) : trimmed;
}

export function getSiteUrl(): string {
  const publicUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (publicUrl) return normalizeSiteUrl(publicUrl);

  const vercelUrl = process.env.VERCEL_URL?.trim();
  if (vercelUrl) return normalizeSiteUrl(`https://${vercelUrl}`);

  return localSiteUrl;
}

export function toAbsoluteUrl(path: string): string {
  const baseUrl = getSiteUrl();
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${baseUrl}${path}`;
  return `${baseUrl}/${path}`;
}
