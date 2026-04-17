import type { Metadata } from "next";

import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services — Studio",
  description: "Explore services by category and goal.",
};

export default function ServicesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const nav = {
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

  return (
    <>
      <SiteHeader content={nav} homeHref="/" />
      {children}
      <SiteFooter content={content.footer} />
    </>
  );
}

