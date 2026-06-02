import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { ItemListJsonLd } from "@/components/shared/item-list-jsonld";
import { getServicesSubcategoryFaq } from "@/lib/services-faq";
import type { AppLocale } from "@/i18n/routing";
import { resolveServicesCatalog } from "@/lib/services";
import { servicesCatalog } from "@/lib/services/catalog";
import { findSubcategory } from "@/lib/services/page-helpers";
import { buildTreatmentsBreadcrumbs } from "@/lib/services/treatments-breadcrumbs";
import { getLandingContent } from "@/lib/content";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

export async function generateStaticParams(): Promise<
  Array<{ categorySlug: string; subcategorySlug: string }>
> {
  return servicesCatalog.categories.flatMap((category) =>
    category.subcategories.map((subcategory) => ({
      categorySlug: category.id,
      subcategorySlug: subcategory.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string; subcategorySlug: string }>;
}): Promise<Metadata> {
  const { locale, categorySlug, subcategorySlug } = await params;
  const catalog = await resolveServicesCatalog(locale as AppLocale);
  const { category, subcategory } = findSubcategory(catalog, categorySlug, subcategorySlug);

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
  const { category, subcategory } = findSubcategory(catalog, categorySlug, subcategorySlug);
  const { hubUi } = catalog;
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
            url: `/treatments/${categorySlug}/${subcategorySlug}/${procedure.id}`,
          }))}
        />
        <Breadcrumbs items={breadcrumbs} />

        <SectionHeading
          titleId={pageTitleId}
          titleLevel={1}
          title={subcategory.title}
          subtitle={subcategory.description}
        />

        <section aria-labelledby={`${pageTitleId}-procedures`}>
          <h2 id={`${pageTitleId}-procedures`} className="sr-only">
            {hubUi.proceduresSrOnlyLabel}
          </h2>
          <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
            {subcategory.procedures.map((procedure) => {
              const priceLabel = procedure.price
                ? `${procedure.price.amount} ${procedure.price.currency}`
                : null;

              return (
                <li
                  key={procedure.id}
                  className="group bg-background p-6 transition-colors hover:bg-surface/40"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="min-w-0 font-heading text-lg text-primary">
                          {procedure.title}
                        </h3>
                        {priceLabel ? (
                          <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-primary">
                            {priceLabel}
                          </span>
                        ) : null}
                      </div>
                      <p
                        className="mt-2 max-w-3xl truncate text-sm leading-relaxed text-muted"
                        title={procedure.description}
                      >
                        {procedure.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-3">
                      <Button
                        href={`/treatments/${categorySlug}/${subcategorySlug}/${procedure.id}`}
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
