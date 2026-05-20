import type { ReactNode } from "react";

import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import type { LandingContent } from "@/lib/types/content";

function buildSubpageNav(nav: LandingContent["nav"]) {
  return {
    ...nav,
    links: nav.links.map((link) => ({
      ...link,
      href: link.href.startsWith("#") ? `/${link.href}` : link.href,
    })),
    cta: {
      ...nav.cta,
      href: nav.cta.href.startsWith("#") ? `/${nav.cta.href}` : nav.cta.href,
    },
  };
}

export interface MarketingChromeProps {
  children: ReactNode;
  content: LandingContent;
}

export function MarketingChrome({ children, content }: MarketingChromeProps) {
  return (
    <>
      <SiteHeader content={buildSubpageNav(content.nav)} homeHref="/" />
      {children}
      <SiteFooter content={content.footer} />
    </>
  );
}
