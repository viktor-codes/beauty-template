import type { BreadcrumbItem } from "@/components/shared/breadcrumbs";

function getSiteUrl(): string | null {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return null;
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

function toAbsoluteUrl(path: string): string {
  const baseUrl = getSiteUrl();
  if (!baseUrl) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  if (path.startsWith("/")) return `${baseUrl}${path}`;
  return `${baseUrl}/${path}`;
}

export interface BreadcrumbsJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbsJsonLd({ items }: BreadcrumbsJsonLdProps) {
  const visibleItems = items.filter((item) => item.href);

  if (visibleItems.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: visibleItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: toAbsoluteUrl(item.href as string),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be embedded as raw JSON string.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

