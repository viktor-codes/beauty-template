import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";
import { enrichNavWithTreatmentCategories } from "@/lib/nav/build-nav-links";
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_DEFAULT_TITLE,
} from "@/lib/site-metadata";

export const metadata: Metadata = {
  title: { absolute: SITE_DEFAULT_TITLE },
  description: SITE_DEFAULT_DESCRIPTION,
  openGraph: {
    title: SITE_DEFAULT_TITLE,
    description: SITE_DEFAULT_DESCRIPTION,
    url: "/",
  },
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const landingContent = await getLandingContent(locale as AppLocale);
  const nav = enrichNavWithTreatmentCategories(
    landingContent.nav,
    landingContent.services.categories,
    landingContent.services.cta,
  );

  return (
    <>
      <SiteHeader content={nav} />
      <main id="main-content" className="flex-1 pt-20 md:pt-0">
        <HeroSection content={landingContent.hero} />
        <AboutSection content={landingContent.about} />
        <ServicesSection content={landingContent.services} />
        <GallerySection content={landingContent.gallery} />
        <ReviewsSection content={landingContent.reviews} />
        <FAQSection
          content={landingContent.faq}
          consultationCtaLabel={landingContent.nav.cta.label}
        />
        <ContactSection content={landingContent.contact} />
      </main>
      <SiteFooter content={landingContent.footer} />
    </>
  );
}
