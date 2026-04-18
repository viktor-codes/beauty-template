import { JsonLd } from "@/components/shared/json-ld";
import { getSchemaOrgOrganizationId } from "@/lib/schema-org/ids";
import { SITE_NAME_FULL } from "@/lib/site-metadata";
import type { ReviewItem } from "@/lib/types/content";

export interface ReviewsJsonLdProps {
  items: ReviewItem[];
}

export function ReviewsJsonLd({ items }: ReviewsJsonLdProps) {
  if (items.length === 0) return null;

  const orgId = getSchemaOrgOrganizationId();
  const itemReviewed = orgId
    ? { "@id": orgId }
    : { "@type": "HealthAndBeautyBusiness", name: SITE_NAME_FULL };

  const graph = items.map((item) => ({
    "@type": "Review",
    author: {
      "@type": "Person",
      name: item.authorName,
    },
    reviewBody: item.quote,
    itemReviewed,
  }));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}
