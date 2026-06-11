import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { TreatmentProcedureDetail } from "@/components/features/treatment-procedure-detail";
import { TreatmentProceduresList } from "@/components/features/treatment-procedures-list";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { ItemListJsonLd } from "@/components/shared/item-list-jsonld";
import { getLandingContent } from "@/lib/content";
import { getServicesProcedureFaq, getServicesSubcategoryFaq } from "@/lib/services-faq";
import type { AppLocale } from "@/i18n/routing";
import { resolveServicesCatalog } from "@/lib/services";
import { servicesCatalog } from "@/lib/services/catalog";
import {
  findProcedureInCategory,
  getCategoryProcedures,
  isFlatCategory,
} from "@/lib/services/flat-categories";
import { findCategory, findFlatProcedure, findSubcategory } from "@/lib/services/page-helpers";
import { buildProcedurePath } from "@/lib/services/procedure-path";
import { buildTreatmentsBreadcrumbs } from "@/lib/services/treatments-breadcrumbs";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

export async function generateStaticParams(): Promise<
  Array<{ categorySlug: string; subcategorySlug: string }>
> {
  return servicesCatalog.categories.flatMap((category) => {
    if (isFlatCategory(category)) {
      return getCategoryProcedures(category).map(({ procedure }) => ({
        categorySlug: category.id,
        subcategorySlug: procedure.id,
      }));
    }

    return category.subcategories.map((subcategory) => ({
      categorySlug: category.id,
      subcategorySlug: subcategory.id,
    }));
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string; subcategorySlug: string }>;
}): Promise<Metadata> {
  const { locale, categorySlug, subcategorySlug } = await params;
  const catalog = await resolveServicesCatalog(locale as AppLocale);
  const category = findCategory(catalog, categorySlug);

  if (isFlatCategory(category)) {
    const match = findProcedureInCategory(category, subcategorySlug);
    if (!match) {
      return { title: category.title };
    }

    const { subcategory, procedure } = match;
    const priceLabel = procedure.price
      ? `${procedure.price.amount} ${procedure.price.currency}`
      : null;

    return {
      title: priceLabel
        ? `${procedure.title} (${priceLabel}) — ${category.title}`
        : `${procedure.title} — ${category.title}`,
      description: procedure.description,
      openGraph: {
        title: procedure.title,
        description: procedure.description,
        type: "article",
        siteName: `${SITE_BRAND} · ${SITE_PRACTITIONER}`,
      },
    };
  }

  const { subcategory } = findSubcategory(catalog, categorySlug, subcategorySlug);

  return {
    title: `${subcategory.title} — ${category.title}`,
    description: subcategory.description,
    openGraph: {
      title: `${subcategory.title} | ${SITE_BRAND}`,
      description: subcategory.description,
      type: "website",
      siteName: `${SITE_BRAND} · ${SITE_PRACTITIONER}`,
    },
  };
}

export default async function ServicesSubcategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string; subcategorySlug: string }>;
}) {
  const { locale, categorySlug, subcategorySlug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const catalog = await resolveServicesCatalog(appLocale);
  const category = findCategory(catalog, categorySlug);
  const { hubUi } = catalog;

  if (isFlatCategory(category)) {
    const isLegacySubcategory = category.subcategories.some(
      (subcategory) => subcategory.id === subcategorySlug,
    );
    if (isLegacySubcategory) {
      permanentRedirect(`/treatments/${categorySlug}`);
    }

    const { subcategory, procedure } = findFlatProcedure(
      catalog,
      categorySlug,
      subcategorySlug,
    );
    const landingContent = await getLandingContent(appLocale);
    const procedureFaq = await getServicesProcedureFaq(
      category,
      subcategory,
      procedure,
      appLocale,
      5,
    );
    const procedurePath = buildProcedurePath({ category, subcategory, procedure });
    const breadcrumbs = buildTreatmentsBreadcrumbs(hubUi, [
      { label: category.title, href: `/treatments/${categorySlug}` },
      { label: procedure.title, href: procedurePath },
    ]);
    const pageTitleId = `procedure-${categorySlug}-${subcategorySlug}-title`;

    return (
      <TreatmentProcedureDetail
        category={category}
        subcategory={subcategory}
        procedure={procedure}
        procedurePath={procedurePath}
        breadcrumbs={breadcrumbs}
        hubUi={hubUi}
        procedureFaq={procedureFaq}
        contactCtaLabel={landingContent.nav.cta.label}
        isFlatCategory
        categorySlug={categorySlug}
        pageTitleId={pageTitleId}
      />
    );
  }

  const { subcategory } = findSubcategory(catalog, categorySlug, subcategorySlug);
  const landingContent = await getLandingContent(appLocale);
  const subcategoryFaq = await getServicesSubcategoryFaq(
    category,
    subcategory,
    appLocale,
    6,
  );
  const breadcrumbs = buildTreatmentsBreadcrumbs(hubUi, [
    { label: category.title, href: `/treatments/${categorySlug}` },
    {
      label: subcategory.title,
      href: `/treatments/${categorySlug}/${subcategorySlug}`,
    },
  ]);

  const pageTitleId = `subcategory-${categorySlug}-${subcategorySlug}-title`;

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background" aria-labelledby={pageTitleId}>
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <ItemListJsonLd
          name={subcategory.title}
          description={subcategory.description}
          items={subcategory.procedures.map((procedure) => ({
            name: procedure.title,
            description: procedure.description,
            url: buildProcedurePath({ category, subcategory, procedure }),
          }))}
        />
        <Breadcrumbs items={breadcrumbs} />

        <SectionHeading
          titleId={pageTitleId}
          titleLevel={1}
          title={subcategory.title}
          subtitle={subcategory.description}
        />

        <TreatmentProceduresList
          items={subcategory.procedures.map((procedure) => ({
            procedure,
            href: buildProcedurePath({ category, subcategory, procedure }),
          }))}
          listId={`${pageTitleId}-procedures`}
          proceduresSrOnlyLabel={hubUi.proceduresSrOnlyLabel}
          viewDetailsLabel={hubUi.viewDetailsLabel}
        />
      </Section>

      <Section
        className="bg-background"
        aria-labelledby={`${pageTitleId}-faq-heading`}
      >
        <FaqJsonLd items={subcategoryFaq} />
        <SectionHeading
          titleId={`${pageTitleId}-faq-heading`}
          eyebrow={hubUi.faqEyebrow}
          title={hubUi.subcategoryFaqTitleTemplate.replace("{title}", subcategory.title)}
          subtitle={hubUi.subcategoryFaqSubtitle}
          className="mb-6"
        />
        <FaqAccordion items={subcategoryFaq} />
        <div className="mt-6">
          <Link
            href="/#faq"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            {hubUi.viewFullFaqLabel}
          </Link>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6">
          <p className="text-sm leading-relaxed text-muted">
            {hubUi.subcategoryConsultationBlurb}
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/#contact" size="lg">
              {landingContent.nav.cta.label}
            </Button>
            <Button
              href={`/treatments/${categorySlug}`}
              variant="secondary"
              size="lg"
            >
              {hubUi.backToCategoryPrefix} {category.title}
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/treatments"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            {hubUi.backToAllCategoriesLabel}
          </Link>
        </div>
      </Section>
    </main>
  );
}
