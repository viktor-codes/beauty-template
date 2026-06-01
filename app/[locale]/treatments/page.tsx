import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/shared/service-card";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { ItemListJsonLd } from "@/components/shared/item-list-jsonld";
import { getServicesHubFaq } from "@/lib/services-faq";
import {
  getConcernRecommendations,
  getConcernTitle,
  isConcernSlug,
} from "@/lib/services/concern-recommendations";
import { resolveServicesCatalog } from "@/lib/services";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

function resolveConcernFromSearchParams(
  searchParams: Record<string, string | string[] | undefined>,
): string | null {
  const rawConcern = searchParams.concern ?? searchParams.goal;
  const value = Array.isArray(rawConcern) ? rawConcern[0] : rawConcern;
  if (!value || !isConcernSlug(value)) return null;
  return value;
}

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
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const catalog = await resolveServicesCatalog(appLocale);
  const landingContent = await getLandingContent(appLocale);
  const { hubUi } = catalog;

  const breadcrumbs = [
    { label: hubUi.breadcrumbHome, href: "/" },
    { label: hubUi.breadcrumbTreatments, href: "/treatments" },
  ];

  const resolvedSearchParams = await searchParams;
  const selectedConcern = resolveConcernFromSearchParams(resolvedSearchParams);
  const recommended = selectedConcern
    ? getConcernRecommendations(selectedConcern, catalog, 10)
    : [];
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

        {selectedConcern ? (
          <section className="mb-10" aria-labelledby="hub-recommended-heading">
            <h2
              id="hub-recommended-heading"
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted"
            >
              {hubUi.recommendedForPrefix}{" "}
              {getConcernTitle(selectedConcern, catalog)}
            </h2>
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
              {recommended.map((hit) => {
                const priceLabel = hit.procedure.price
                  ? `${hit.procedure.price.amount} ${hit.procedure.price.currency}`
                  : null;

                return (
                  <li
                    key={`${hit.category.id}-${hit.subcategory.id}-${hit.procedure.id}`}
                    className="group bg-background p-6 transition-colors hover:bg-surface/40"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="min-w-0 font-heading text-lg text-primary">
                            {hit.procedure.title}
                          </h3>
                          {priceLabel ? (
                            <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-primary">
                              {priceLabel}
                            </span>
                          ) : null}
                        </div>
                        <p
                          className="mt-2 max-w-3xl truncate text-sm leading-relaxed text-muted"
                          title={hit.procedure.description}
                        >
                          {hit.procedure.description}
                        </p>
                        <p className="mt-2 text-xs text-muted">
                          {hit.category.title} · {hit.subcategory.title}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <Button
                          href={hit.href}
                          variant="secondary"
                          size="sm"
                          className="whitespace-nowrap"
                        >
                          {hubUi.viewDetailsLabel}
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="hub-categories-heading">
          <h2 id="hub-categories-heading" className="sr-only">
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
        </section>

        {activeConcerns.length > 0 ? (
          <section
            className="mt-10 rounded-2xl border border-border bg-surface/50 p-6"
            aria-labelledby="hub-goals-heading"
          >
            <h2
              id="hub-goals-heading"
              className="text-xs font-medium uppercase tracking-[0.2em] text-muted"
            >
              {hubUi.goalsSectionTitle}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {activeConcerns.map((concern) => (
                <li key={concern.id}>
                  <Link href={concern.href} className="no-underline">
                    <Badge variant="outline">{concern.title}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-4">
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
