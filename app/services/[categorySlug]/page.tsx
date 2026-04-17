import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
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

  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <Section className="bg-background">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: category.title },
          ]}
        />

        <SectionHeading
          eyebrow="Services"
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

