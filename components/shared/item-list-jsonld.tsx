import { JsonLd } from "@/components/shared/json-ld";
import { toAbsoluteUrl } from "@/lib/site-url";

export interface ItemListJsonLdEntry {
  name: string;
  url: string;
  description?: string;
}

export interface ItemListJsonLdProps {
  name: string;
  description?: string;
  items: ItemListJsonLdEntry[];
}

export function ItemListJsonLd({ name, description, items }: ItemListJsonLdProps) {
  if (items.length === 0) return null;

  const payload: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      description: item.description,
      item: toAbsoluteUrl(item.url),
    })),
  };

  if (description) payload.description = description;

  return <JsonLd data={payload} />;
}
