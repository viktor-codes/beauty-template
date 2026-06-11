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

export async function generateStaticParams(): Promise<
  Array<{ concernSlug: string }>
> {
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

        <div className="mt-6 flex w-full flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <SectionHeading
            titleId={pageTitleId}
            titleLevel={1}
            title={concern.title}
            subtitle={subtitle}
            className="mb-0 min-w-0 md:max-w-xl lg:max-w-2xl"
          />
          {heroImage ? (
            <div className="relative mx-auto w-full max-w-xl md:mx-0 md:w-auto md:max-w-none md:shrink-0">
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                width={heroImage.width}
                height={heroImage.height}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  "rounded-2xl border border-border bg-surface/50 object-cover",
                  "aspect-5/4 w-full sm:aspect-4/3",
                  "md:aspect-auto md:h-48 md:w-auto lg:h-52",
                )}
                priority
              />
              <div className="absolute inset-0 bg-linear-to-b from-background/10 to-background/60 backdrop-blur-[0.4px]" />
            </div>
          ) : null}
        </div>

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

        <div className="mt-8 flex flex-col items-end gap-8 md:items-start">
          <Button href="/#contact" size="lg">
            {landingContent.nav.cta.label}
          </Button>
          <Link
            href="/treatments"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            ← {hubUi.breadcrumbTreatments}
          </Link>
        </div>
      </Section>
    </main>
  );
}
