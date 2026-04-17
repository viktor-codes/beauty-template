import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { getServicesSubcategoryFaq } from "@/lib/services-faq";
import {
  getServicesCategory,
  getServicesSubcategory,
  servicesCatalog,
} from "@/lib/services";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

function getCategoryOrThrow(categorySlug: string) {
  const category = getServicesCategory(categorySlug);
  if (!category) notFound();
  return category;
}

function getSubcategoryOrThrow(categorySlug: string, subcategorySlug: string) {
  const subcategory = getServicesSubcategory(categorySlug, subcategorySlug);
  if (!subcategory) notFound();
  return subcategory;
}

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
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params;
  const category = getCategoryOrThrow(categorySlug);
  const subcategory = getSubcategoryOrThrow(categorySlug, subcategorySlug);

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
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) {
  const { categorySlug, subcategorySlug } = await params;
  const category = getCategoryOrThrow(categorySlug);
  const subcategory = getSubcategoryOrThrow(categorySlug, subcategorySlug);
  const subcategoryFaq = getServicesSubcategoryFaq(category, subcategory, 6);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: category.title, href: `/services/${categorySlug}` },
    {
      label: subcategory.title,
      href: `/services/${categorySlug}/${subcategorySlug}`,
    },
  ];

  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <Section className="bg-background">
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />

        <SectionHeading
          title={subcategory.title}
          subtitle={subcategory.description}
        />

        <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
          {subcategory.procedures.map((procedure) => {
            const priceLabel = procedure.price
              ? `${procedure.price.amount} ${procedure.price.currency}`
              : null;

            return (
              <li
                key={procedure.id}
                className="group bg-background p-5 transition-colors hover:bg-surface/40"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="min-w-0 font-heading text-lg text-primary">
                        {procedure.title}
                      </h3>
                      {priceLabel ? (
                        <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
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
                      href={`/services/${categorySlug}/${subcategorySlug}/${procedure.id}`}
                      variant="secondary"
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      View details
                    </Button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12">
          <FaqJsonLd items={subcategoryFaq} />
          <SectionHeading
            eyebrow="FAQ"
            title={`${subcategory.title}: what clients ask`}
            subtitle="Practical guidance for planning, downtime, and safety—tailored to this treatment group."
            className="mb-6"
          />
          <FaqAccordion items={subcategoryFaq} />
          <div className="mt-6">
            <Link
              href="/#faq"
              className="text-sm text-muted underline underline-offset-4 hover:text-primary"
            >
              View the full FAQ on the homepage
            </Link>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6">
          <p className="text-sm leading-relaxed text-muted">
            Not sure where to start? Book a consultation and I’ll map out the safest,
            most effective plan for your goal and timeline.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/#contact" size="lg">
              Book a consultation
            </Button>
            <Button
              href={`/services/${categorySlug}`}
              variant="secondary"
              size="lg"
            >
              Back to category
            </Button>
          </div>
        </div>

        <div className="mt-10">
          <Link
            href="/services"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            Back to all categories
          </Link>
        </div>
      </Section>
    </main>
  );
}

