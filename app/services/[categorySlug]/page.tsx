import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { getServicesCategoryFaq } from "@/lib/services-faq";
import { servicesCatalog } from "@/lib/services";

function getCategoryOrThrow(categorySlug: string) {
  const category =
    servicesCatalog.categories.find((c) => c.id === categorySlug) ?? null;
  if (!category) notFound();
  return category;
}

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
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryOrThrow(categorySlug);

  return {
    title: `${category.title} — Services`,
    description: category.description,
  };
}

export default async function ServicesCategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}) {
  const { categorySlug } = await params;
  const category = getCategoryOrThrow(categorySlug);
  const categoryFaq = getServicesCategoryFaq(category, 6);
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: category.title, href: `/services/${categorySlug}` },
  ];

  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <Section className="bg-background">
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />

        <SectionHeading
          title={category.title}
          subtitle={category.description}
        />

        <ul className="grid gap-6 sm:grid-cols-2">
          {category.subcategories.map((subcategory) => (
            <li key={subcategory.id}>
              <ServiceCard
                title={subcategory.title}
                description={subcategory.description}
                href={`/services/${categorySlug}/${subcategory.id}`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-12">
          <FaqJsonLd items={categoryFaq} />
          <SectionHeading
            eyebrow="FAQ"
            title={`${category.title}: common questions`}
            subtitle="Focused answers for this direction—plus what to ask during consultation."
            className="mb-6"
          />
          <FaqAccordion items={categoryFaq} />
          <div className="mt-6">
            <Link
              href="/#faq"
              className="text-sm text-muted underline underline-offset-4 hover:text-primary"
            >
              View the full FAQ on the homepage
            </Link>
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

