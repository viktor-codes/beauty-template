import { JsonLd } from "@/components/shared/json-ld";
import { buildSiteGraphJsonLd } from "@/lib/schema-org/build-site-graph";
import type { ContactContent } from "@/lib/types/content";

export interface SiteGraphJsonLdProps {
  contact: ContactContent;
}

export function SiteGraphJsonLd({ contact }: SiteGraphJsonLdProps) {
  return <JsonLd data={buildSiteGraphJsonLd(contact)} />;
}
