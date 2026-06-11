import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { ConcernProceduresList } from "@/components/sections/concern-procedures-list";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { getLandingContent } from "@/lib/content";
import type { AppLocale } from "@/i18n/routing";
import { ItemListJsonLd } from "@/components/shared/item-list-jsonld";
import { buildLandingConcernChips } from "@/lib/services/concern-chips";
import { resolveConcernCardImage } from "@/lib/services/concern-card-image";
import { buildConcernPath } from "@/lib/services/concern-path";
import { getConcernRecommendations } from "@/lib/services/concern-recommendations";
import { resolveServicesCatalog } from "@/lib/services";
import { findConcern } from "@/lib/services/page-helpers";
import { CONCERN_ORDER } from "@/lib/services/static-treatment-concerns";
import { buildTreatmentsBreadcrumbs } from "@/lib/services/treatments-breadcrumbs";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";
import { cn } from "@/lib/cn";

export async function generateStaticParams(): Promise<Array<{ concernSlug: string }>> {
  return CONCERN_ORDER.map((concernSlug) => ({ concernSlug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; concernSlug: string }>;
}): Promise<Metadata> {
  const { locale, concernSlug } = await params;
  const catalog = await resolveServicesCatalog(locale as AppLocale);
  const concern = findConcern(catalog, concernSlug);
  const { hubUi } = catalog;
  const description =
    concern.shortDescription?.trim() || hubUi.concernCardFallbackDescription;

  return {
    title: `${concern.title} — ${hubUi.categoryMetaTitleSuffix}`,
    description,
    openGraph: {
      title: `${concern.title} | ${SITE_BRAND}`,
      description,
      type: "website",
      siteName: `${SITE_BRAND} · ${SITE_PRACTITIONER}`,
      url: buildConcernPath(concernSlug),
    },
  };
}

export default async function TreatmentsConcernPage({
  params,
}: {
  params: Promise<{ locale: string; concernSlug: string }>;
}) {
  const { locale, concernSlug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const catalog = await resolveServicesCatalog(appLocale);
  const concern = findConcern(catalog, concernSlug);
  const landingContent = await getLandingContent(appLocale);
  const { hubUi } = catalog;
  const concernPath = buildConcernPath(concernSlug);
  const breadcrumbs = buildTreatmentsBreadcrumbs(hubUi, [
    { label: concern.title, href: concernPath },
  ]);
  const procedures = getConcernRecommendations(concernSlug, catalog);
  const otherConcerns = buildLandingConcernChips(catalog).filter(
    (chip) => chip.id !== concernSlug,
  );
  const pageTitleId = `concern-${concernSlug}-title`;
  const proceduresListId = `${pageTitleId}-procedures`;
  const heroImage = resolveConcernCardImage(concern);
  const subtitle =
    concern.shortDescription?.trim() || hubUi.concernCardFallbackDescription;

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background" aria-labelledby={pageTitleId}>
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <ItemListJsonLd
          name={concern.title}
          description={subtitle}
          items={procedures.map((hit) => ({
            name: hit.procedure.title,
            description: hit.procedure.description,
            url: hit.href,
          }))}
        />
        <Breadcrumbs items={breadcrumbs} />

        {heroImage ? (
          <div className="mb-8 overflow-hidden rounded-2xl border border-border">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              className="h-48 w-full object-cover sm:h-56"
              sizes="(min-width: 768px) 896px, 100vw"
            />
          </div>
        ) : null}

        <SectionHeading
          titleId={pageTitleId}
          titleLevel={1}
          title={concern.title}
          subtitle={subtitle}
        />

        <section className="mt-8" aria-labelledby={proceduresListId}>
          <h2 id={proceduresListId} className="sr-only">
            {hubUi.proceduresSrOnlyLabel}
          </h2>
          <ConcernProceduresList
            hits={procedures}
            hubUi={hubUi}
            listId={proceduresListId}
            emptyDescription={hubUi.subcategoryConsultationBlurb}
          />
        </section>

        <div className="mt-8 flex justify-end md:justify-start">
          <Button href="/#contact" size="lg">
            {landingContent.nav.cta.label}
          </Button>
        </div>
      </Section>

      {otherConcerns.length > 0 ? (
        <Section className="bg-surface/40" aria-labelledby={`${pageTitleId}-other-concerns`}>
          <h2
            id={`${pageTitleId}-other-concerns`}
            className="type-caption font-semibold uppercase tracking-[0.22em] text-muted"
          >
            {hubUi.goalsSectionTitle}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2 sm:gap-4">
            {otherConcerns.map((chip) => (
              <li key={chip.id}>
                <Link
                  href={chip.href}
                  className={cn(
                    "no-underline",
                    "inline-flex min-h-9 items-center rounded-full border border-border bg-background px-4 py-2",
                    "text-xs font-medium uppercase tracking-[0.14em] text-primary",
                    "shadow-[0_2px_10px_-4px_rgba(44,44,44,0.09)]",
                    "transition-[color,background-color,border-color,box-shadow] duration-200",
                    "hover:border-accent/35 hover:bg-surface hover:shadow-[0_8px_22px_-10px_rgba(44,44,44,0.13)]",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  )}
                >
                  {chip.title}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Section className="bg-background">
        <Link
          href="/treatments"
          className="text-sm text-muted underline underline-offset-4 hover:text-primary"
        >
          ← {hubUi.breadcrumbTreatments}
        </Link>
      </Section>
    </main>
  );
}
