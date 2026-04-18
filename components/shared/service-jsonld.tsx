import { JsonLd } from "@/components/shared/json-ld";
import { getSchemaOrgOrganizationId } from "@/lib/schema-org/ids";
import { SITE_NAME_FULL } from "@/lib/site-metadata";
import { toAbsoluteUrl } from "@/lib/site-url";
import type { ServiceProcedure } from "@/lib/types/services";

export interface ServiceJsonLdProps {
  procedure: ServiceProcedure;
  procedurePath: string;
  categoryLabel: string;
  subcategoryLabel: string;
}

function resolveImageUrl(src: string): string {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  return toAbsoluteUrl(src);
}

export function ServiceJsonLd({
  procedure,
  procedurePath,
  categoryLabel,
  subcategoryLabel,
}: ServiceJsonLdProps) {
  const orgId = getSchemaOrgOrganizationId();
  const pageUrl = toAbsoluteUrl(procedurePath);

  const offers =
    procedure.price != null
      ? {
          "@type": "Offer",
          price: procedure.price.amount,
          priceCurrency: procedure.price.currency,
          url: pageUrl,
        }
      : undefined;

  const image =
    procedure.image != null ? resolveImageUrl(procedure.image.src) : undefined;

  const provider = orgId
    ? { "@id": orgId }
    : {
        "@type": "HealthAndBeautyBusiness",
        name: SITE_NAME_FULL,
        url: toAbsoluteUrl("/"),
      };

  const payload: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: procedure.title,
    description: procedure.description,
    url: pageUrl,
    provider,
    category: categoryLabel,
    serviceType: subcategoryLabel,
  };

  if (image) payload.image = image;
  if (offers) payload.offers = offers;

  return <JsonLd data={payload} />;
}
