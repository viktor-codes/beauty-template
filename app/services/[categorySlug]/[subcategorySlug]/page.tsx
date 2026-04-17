import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/shared/service-card";
import {
  getServicesCategory,
  getServicesSubcategory,
  servicesCatalog,
} from "@/lib/services";

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

  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <Section className="bg-background">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: category.title, href: `/services/${categorySlug}` },
            { label: subcategory.title },
          ]}
        />

        <SectionHeading
          eyebrow={category.title}
          title={subcategory.title}
          subtitle={subcategory.description}
        />

        <ul className="grid gap-6 sm:grid-cols-2">
          {subcategory.procedures.map((procedure) => {
            const priceLabel = procedure.price
              ? `${procedure.price.amount} ${procedure.price.currency}`
              : null;

            return (
              <li key={procedure.id}>
                <ServiceCard
                  title={priceLabel ? `${procedure.title} — ${priceLabel}` : procedure.title}
                  description={procedure.description}
                  href={`/services/${categorySlug}/${subcategorySlug}/${procedure.id}`}
                />
              </li>
            );
          })}
        </ul>

        <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6">
          <p className="text-sm leading-relaxed text-muted">
            Not sure where to start? Book a consultation and we’ll map out the safest,
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

