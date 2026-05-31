import type { ReactNode } from "react";

import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { enrichNavWithTreatmentCategories } from "@/lib/nav/build-nav-links";
import type { LandingContent } from "@/lib/types/content";

function buildSubpageNav(content: LandingContent) {
  const navWithAbsoluteHashes = {
    ...content.nav,
    links: content.nav.links.map((link) => ({
      ...link,
      href: link.href.startsWith("#") ? `/${link.href}` : link.href,
    })),
    cta: {
      ...content.nav.cta,
      href: content.nav.cta.href.startsWith("#")
        ? `/${content.nav.cta.href}`
        : content.nav.cta.href,
    },
  };

  return enrichNavWithTreatmentCategories(
    navWithAbsoluteHashes,
    content.services.categories,
  );
}

export interface MarketingChromeProps {
  children: ReactNode;
  content: LandingContent;
}

export function MarketingChrome({ children, content }: MarketingChromeProps) {
  return (
    <>
      <SiteHeader content={buildSubpageNav(content)} homeHref="/" />
      {children}
      <SiteFooter content={content.footer} />
    </>
  );
}
