import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FAQSection } from "@/components/sections/faq-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { HeroSection } from "@/components/sections/hero-section";
import { ReviewsSection } from "@/components/sections/reviews-section";
import { ServicesSection } from "@/components/sections/services-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { content } from "@/lib/content";

export default function Home() {
  return (
    <>
      <SiteHeader content={content.nav} />
      <main id="main-content" className="flex-1 pt-19 md:pt-0">
        <HeroSection content={content.hero} />
        <AboutSection content={content.about} />
        <ServicesSection content={content.services} />
        <GallerySection content={content.gallery} />
        <ReviewsSection content={content.reviews} />
        <FAQSection content={content.faq} />
        <ContactSection content={content.contact} />
      </main>
      <SiteFooter content={content.footer} />
    </>
  );
}
