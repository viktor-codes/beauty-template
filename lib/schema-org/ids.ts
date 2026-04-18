import { getSiteUrl } from "@/lib/site-url";

export function getSchemaOrgOrganizationId(): string | null {
  const base = getSiteUrl();
  return base ? `${base}/#organization` : null;
}

export function getSchemaOrgWebsiteId(): string | null {
  const base = getSiteUrl();
  return base ? `${base}/#website` : null;
}
