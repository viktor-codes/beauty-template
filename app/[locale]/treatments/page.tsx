import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/shared/service-card";
import { resolveConcernCardImage } from "@/lib/services/concern-card-image";
import { buildTreatmentsBreadcrumbs } from "@/lib/services/treatments-breadcrumbs";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { ItemListJsonLd } from "@/components/shared/item-list-jsonld";
import { getServicesHubFaq } from "@/lib/services-faq";
import { resolveServicesCatalog } from "@/lib/services";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const appLocale = locale as AppLocale;
  const catalog = await resolveServicesCatalog(appLocale);

  return {
    title: catalog.title,
    description: catalog.description,
    openGraph: {
      title: `${catalog.title} | ${SITE_BRAND} · ${SITE_PRACTITIONER}`,
      description: catalog.description,
      type: "website",
      url: "/treatments",
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;

  const catalog = await resolveServicesCatalog(appLocale);
  const landingContent = await getLandingContent(appLocale);
  const { hubUi } = catalog;
  const breadcrumbs = buildTreatmentsBreadcrumbs(hubUi);
  const hubFaq = await getServicesHubFaq(appLocale, 6);
  const activeConcerns = catalog.concerns.filter((c) => c.isActive !== false);

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background" aria-labelledby="services-hub-title">
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <ItemListJsonLd
          name={catalog.title}
          description={catalog.description}
          items={catalog.categories.map((category) => ({
            name: category.title,
            description: category.description,
            url: `/treatments/${category.id}`,
          }))}
        />
        <Breadcrumbs items={breadcrumbs} />
        <SectionHeading
          titleId="services-hub-title"
          titleLevel={1}
          title={catalog.title}
          subtitle={catalog.description}
        />

        <section aria-labelledby="hub-categories-heading">
          <h2
            id="hub-categories-heading"
            className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted"
          >
            {hubUi.breadcrumbTreatments}
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2">
            {catalog.categories.map((category) => (
              <li key={category.id}>
                <ServiceCard
                  title={category.title}
                  description={category.description}
                  href={`/treatments/${category.id}`}
                  image={category.image}
                />
              </li>
            ))}
          </ul>
          <div className="mt-8 flex justify-end gap-4 md:justify-start">
            <Button href="/#contact" size="lg">
              {landingContent.nav.cta.label}
            </Button>
          </div>
        </section>

        {activeConcerns.length > 0 ? (
          <section className="mt-12" aria-labelledby="hub-concerns-heading">
            <h2
              id="hub-concerns-heading"
              className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted"
            >
              {hubUi.goalsSectionTitle}
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {activeConcerns.map((concern) => (
                <li key={concern.id}>
                  <ServiceCard
                    title={concern.title}
                    description={
                      concern.shortDescription?.trim() ||
                      hubUi.concernCardFallbackDescription
                    }
                    href={concern.href}
                    image={resolveConcernCardImage(concern)}
                  />
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-end gap-4 md:justify-start">
              <Button href="/#contact" size="lg">
                {landingContent.nav.cta.label}
              </Button>
            </div>
          </section>
        ) : null}
      </Section>

      <Section
        className="bg-background"
        aria-labelledby="services-hub-faq-heading"
      >
        <FaqJsonLd items={hubFaq} />
        <SectionHeading
          titleId="services-hub-faq-heading"
          eyebrow={hubUi.faqEyebrow}
          title={hubUi.faqTitle}
          subtitle={hubUi.faqSubtitle}
          className="mb-6"
        />
        <FaqAccordion items={hubFaq} />
        <div className="mt-6">
          <Link
            href="/#faq"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            {hubUi.viewFullFaqLabel}
          </Link>
        </div>
      </Section>
    </main>
  );
}
