import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { ServiceJsonLd } from "@/components/shared/service-jsonld";
import { getServicesProcedureFaq } from "@/lib/services-faq";
import {
  getServicesCategory,
  getServicesProcedure,
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

function getProcedureOrThrow(
  categorySlug: string,
  subcategorySlug: string,
  procedureSlug: string,
) {
  const procedure = getServicesProcedure(categorySlug, subcategorySlug, procedureSlug);
  if (!procedure) notFound();
  return procedure;
}

export async function generateStaticParams(): Promise<
  Array<{ categorySlug: string; subcategorySlug: string; procedureSlug: string }>
> {
  return servicesCatalog.categories.flatMap((category) =>
    category.subcategories.flatMap((subcategory) =>
      subcategory.procedures.map((procedure) => ({
        categorySlug: category.id,
        subcategorySlug: subcategory.id,
        procedureSlug: procedure.id,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
    procedureSlug: string;
  }>;
}): Promise<Metadata> {
  const { categorySlug, subcategorySlug, procedureSlug } = await params;
  getCategoryOrThrow(categorySlug);
  const subcategory = getSubcategoryOrThrow(categorySlug, subcategorySlug);
  const procedure = getProcedureOrThrow(categorySlug, subcategorySlug, procedureSlug);

  const priceLabel = procedure.price
    ? `${procedure.price.amount} ${procedure.price.currency}`
    : null;

  return {
    title: priceLabel
      ? `${procedure.title} (${priceLabel}) — ${subcategory.title}`
      : `${procedure.title} — ${subcategory.title}`,
    description: procedure.description,
    openGraph: {
      title: procedure.title,
      description: procedure.description,
      type: "article",
      siteName: `${SITE_BRAND} · ${SITE_PRACTITIONER}`,
    },
  };
}

export default async function ServiceProcedurePage({
  params,
}: {
  params: Promise<{
    categorySlug: string;
    subcategorySlug: string;
    procedureSlug: string;
  }>;
}) {
  const { categorySlug, subcategorySlug, procedureSlug } = await params;

  const category = getCategoryOrThrow(categorySlug);
  const subcategory = getSubcategoryOrThrow(categorySlug, subcategorySlug);
  const procedure = getProcedureOrThrow(categorySlug, subcategorySlug, procedureSlug);
  const procedureFaq = getServicesProcedureFaq(category, subcategory, procedure, 5);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: category.title, href: `/services/${categorySlug}` },
    {
      label: subcategory.title,
      href: `/services/${categorySlug}/${subcategorySlug}`,
    },
    { label: procedure.title, href: `/services/${categorySlug}/${subcategorySlug}/${procedureSlug}` },
  ];

  const priceLabel = procedure.price
    ? `${procedure.price.amount} ${procedure.price.currency}`
    : null;

  const procedurePath = `/services/${categorySlug}/${subcategorySlug}/${procedureSlug}`;
  const pageTitleId = `procedure-${categorySlug}-${subcategorySlug}-${procedureSlug}-title`;

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background">
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <ServiceJsonLd
          procedure={procedure}
          procedurePath={procedurePath}
          categoryLabel={category.title}
          subcategoryLabel={subcategory.title}
        />
        <Breadcrumbs items={breadcrumbs} />

        <article aria-labelledby={pageTitleId}>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:items-start">
            <div>
              <SectionHeading
                titleId={pageTitleId}
                titleLevel={1}
                title={procedure.title}
                subtitle={procedure.description}
                className="mb-0"
              />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {priceLabel ? (
                  <div className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-primary">
                    {priceLabel}
                  </div>
                ) : null}
                <div className="inline-flex items-center rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted">
                  Consultation recommended
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/#contact" size="lg">
                  Book a consultation
                </Button>
                <Button
                  href={`/services/${categorySlug}/${subcategorySlug}`}
                  variant="secondary"
                  size="lg"
                >
                  Back to list
                </Button>
              </div>

              <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6">
                <p className="text-sm leading-relaxed text-muted">
                  I’ll confirm suitability, expected downtime, and aftercare during your
                  consultation. If you have upcoming events or active skincare (retinoids,
                  peels), mention it so I can plan safely.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/services"
                  className="text-sm text-muted underline underline-offset-4 hover:text-primary"
                >
                  Back to all categories
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xl md:mx-0">
              <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-surface/50">
                {procedure.image ? (
                  <Image
                    src={procedure.image.src}
                    alt={procedure.image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-surface" />
                )}
              </div>
            </div>
          </div>
        </article>
      </Section>

      <Section
        className="bg-background"
        aria-labelledby={`${pageTitleId}-faq-heading`}
      >
        <FaqJsonLd items={procedureFaq} />
        <SectionHeading
          titleId={`${pageTitleId}-faq-heading`}
          eyebrow="FAQ"
          title={`Before you book: ${procedure.title}`}
          subtitle="A shortlist of the most relevant questions—plus the full FAQ library on the homepage."
          className="mb-6"
        />
        <FaqAccordion items={procedureFaq} />
        <div className="mt-6">
          <Link
            href="/#faq"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            View the full FAQ on the homepage
          </Link>
        </div>
      </Section>
    </main>
  );
}
