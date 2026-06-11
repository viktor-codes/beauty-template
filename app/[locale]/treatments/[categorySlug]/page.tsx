import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

import { TreatmentProceduresList } from "@/components/features/treatment-procedures-list";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { ItemListJsonLd } from "@/components/shared/item-list-jsonld";
import type { AppLocale } from "@/i18n/routing";
import { getServicesCategoryFaq } from "@/lib/services-faq";
import { resolveServicesCatalog } from "@/lib/services";
import { servicesCatalog } from "@/lib/services/catalog";
import { getCategoryProcedures, isFlatCategory } from "@/lib/services/flat-categories";
import { findCategory } from "@/lib/services/page-helpers";
import { buildProcedurePath } from "@/lib/services/procedure-path";
import { buildTreatmentsBreadcrumbs } from "@/lib/services/treatments-breadcrumbs";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

export async function generateStaticParams(): Promise<
  Array<{ categorySlug: string }>
> {
  return servicesCatalog.categories.map((category) => ({
    categorySlug: category.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { locale, categorySlug } = await params;
  const catalog = await resolveServicesCatalog(locale as AppLocale);
  const category = findCategory(catalog, categorySlug);
  const { hubUi } = catalog;

  return {
    title: `${category.title} — ${hubUi.categoryMetaTitleSuffix}`,
    description: category.description,
    openGraph: {
      title: `${category.title} | ${SITE_BRAND}`,
      description: category.description,
      type: "website",
      siteName: `${SITE_BRAND} · ${SITE_PRACTITIONER}`,
    },
  };
}

export default async function ServicesCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; categorySlug: string }>;
}) {
  const { locale, categorySlug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const catalog = await resolveServicesCatalog(appLocale);
  const category = findCategory(catalog, categorySlug);
  const { hubUi } = catalog;
  const categoryFaq = await getServicesCategoryFaq(category, appLocale, 6);
  const breadcrumbs = buildTreatmentsBreadcrumbs(hubUi, [
    { label: category.title, href: `/treatments/${categorySlug}` },
  ]);

  const pageTitleId = `category-${categorySlug}-title`;
  const isFlat = isFlatCategory(category);
  const procedureEntries = isFlat ? getCategoryProcedures(category) : [];

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background" aria-labelledby={pageTitleId}>
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <ItemListJsonLd
          name={category.title}
          description={category.description}
          items={
            isFlat
              ? procedureEntries.map(({ subcategory, procedure }) => ({
                  name: procedure.title,
                  description: procedure.description,
                  url: buildProcedurePath({ category, subcategory, procedure }),
                }))
              : category.subcategories.map((subcategory) => ({
                  name: subcategory.title,
                  description: subcategory.description,
                  url: `/treatments/${categorySlug}/${subcategory.id}`,
                }))
          }
        />
        <Breadcrumbs items={breadcrumbs} />

        <SectionHeading
          titleId={pageTitleId}
          titleLevel={1}
          title={category.title}
          subtitle={category.description}
        />

        {isFlat ? (
          <TreatmentProceduresList
            items={procedureEntries.map(({ subcategory, procedure }) => ({
              procedure,
              href: buildProcedurePath({ category, subcategory, procedure }),
            }))}
            listId={`${pageTitleId}-procedures`}
            proceduresSrOnlyLabel={hubUi.proceduresSrOnlyLabel}
            viewDetailsLabel={hubUi.viewDetailsLabel}
          />
        ) : (
          <section aria-labelledby={`${pageTitleId}-subcategories`}>
            <h2 id={`${pageTitleId}-subcategories`} className="sr-only">
              {hubUi.subcategoriesSrOnlyLabel}
            </h2>
            <ul className="grid gap-6 sm:grid-cols-2">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <ServiceCard
                    title={subcategory.title}
                    description={subcategory.description}
                    href={`/treatments/${categorySlug}/${subcategory.id}`}
                  />
                </li>
              ))}
            </ul>
          </section>
        )}
      </Section>

      <Section
        className="bg-background"
        aria-labelledby={`${pageTitleId}-faq-heading`}
      >
        <FaqJsonLd items={categoryFaq} />
        <SectionHeading
          titleId={`${pageTitleId}-faq-heading`}
          eyebrow={hubUi.faqEyebrow}
          title={hubUi.categoryFaqTitleTemplate.replace("{title}", category.title)}
          subtitle={hubUi.categoryFaqSubtitle}
          className="mb-6"
        />
        <FaqAccordion items={categoryFaq} />
        <div className="mt-6">
          <Link
            href="/#faq"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            {hubUi.viewFullFaqLabel}
          </Link>
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
