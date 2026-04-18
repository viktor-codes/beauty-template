import type { BreadcrumbItem } from "@/components/shared/breadcrumbs";
import { toAbsoluteUrl } from "@/lib/site-url";

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

