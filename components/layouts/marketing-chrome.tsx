import type { ReactNode } from "react";

import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { content } from "@/lib/content";

function buildSubpageNav() {
  return {
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
}

export function MarketingChrome({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <>
      <SiteHeader content={buildSubpageNav()} homeHref="/" />
      {children}
      <SiteFooter content={content.footer} />
    </>
  );
}
