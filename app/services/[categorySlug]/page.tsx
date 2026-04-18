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
import { ItemListJsonLd } from "@/components/shared/item-list-jsonld";
import { getServicesCategoryFaq } from "@/lib/services-faq";
import { servicesCatalog } from "@/lib/services";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

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
    title: `${category.title} — consultations & protocols`,
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

  const pageTitleId = `category-${categorySlug}-title`;

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background" aria-labelledby={pageTitleId}>
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <ItemListJsonLd
          name={category.title}
          description={category.description}
          items={category.subcategories.map((subcategory) => ({
            name: subcategory.title,
            description: subcategory.description,
            url: `/services/${categorySlug}/${subcategory.id}`,
          }))}
        />
        <Breadcrumbs items={breadcrumbs} />

        <SectionHeading
          titleId={pageTitleId}
          titleLevel={1}
          title={category.title}
          subtitle={category.description}
        />

        <section aria-labelledby={`${pageTitleId}-subcategories`}>
          <h2 id={`${pageTitleId}-subcategories`} className="sr-only">
            Subcategories
          </h2>
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
        </section>
      </Section>

      <Section
        className="bg-background"
        aria-labelledby={`${pageTitleId}-faq-heading`}
      >
        <FaqJsonLd items={categoryFaq} />
        <SectionHeading
          titleId={`${pageTitleId}-faq-heading`}
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
