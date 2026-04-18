import { JsonLd } from "@/components/shared/json-ld";
import { getSchemaOrgWebsiteId } from "@/lib/schema-org/ids";
import { toAbsoluteUrl } from "@/lib/site-url";

export interface WebPageJsonLdProps {
  title: string;
  description: string;
  path: string;
}

export function WebPageJsonLd({ title, description, path }: WebPageJsonLdProps) {
  const websiteId = getSchemaOrgWebsiteId();
  const pageUrl = toAbsoluteUrl(path);

  const payload: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: pageUrl,
    inLanguage: "en",
  };

  if (websiteId) {
    payload.isPartOf = { "@id": websiteId };
  }

  return <JsonLd data={payload} />;
}
