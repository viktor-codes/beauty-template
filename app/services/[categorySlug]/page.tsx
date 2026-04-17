import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";

type CategorySlug =
  | "aesthetic-treatments"
  | "aesthetic-injections"
  | "advanced-aesthetic-treatments"
  | "laser-hair-removal";

const categoryModel: Record<
  CategorySlug,
  {
    title: string;
    description: string;
    subcategories: Array<{ slug: string; title: string; description: string }>;
  }
> = {
  "aesthetic-treatments": {
    title: "Aesthetic treatments",
    description:
      "Non-invasive and minimally invasive treatments focused on texture, clarity, and glow—ideal for ongoing skin maintenance and targeted correction.",
    subcategories: [
      {
        slug: "facials",
        title: "Facials",
        description:
          "Medical-grade facials selected for glow, clarity, acne control, or visible aging—based on your skin goals.",
      },
      {
        slug: "chemical-peels",
        title: "Chemical peels",
        description:
          "Clinician-controlled exfoliation to refine texture and tone. Depth is chosen based on skin needs and downtime preference.",
      },
    ],
  },
  "aesthetic-injections": {
    title: "Aesthetic injections",
    description:
      "Injectable treatments aimed at hydration, structure, and skin quality—planned with a natural-result philosophy and an emphasis on safety.",
    subcategories: [
      {
        slug: "lip-fillers",
        title: "Lip fillers",
        description:
          "HA fillers to enhance shape and definition while keeping proportions balanced. Swelling is temporary and typically settles within days.",
      },
      {
        slug: "collagen-stimulators",
        title: "Collagen stimulators",
        description:
          "Biostimulatory injectables designed to activate your own collagen remodeling. Results develop gradually and look natural.",
      },
      {
        slug: "biorevitalisation",
        title: "Biorevitalisation",
        description:
          "Hydrating and regenerative injectables aimed at elasticity, glow, and comfort—ideal for dryness, fine lines, and tired-looking skin.",
      },
      {
        slug: "mesotherapy-for-hair-loss",
        title: "Mesotherapy for hair loss",
        description:
          "Scalp microinjections designed to nourish follicles and improve the look of density—best as part of a structured hair plan.",
      },
      {
        slug: "plasma-therapy",
        title: "Plasma therapy",
        description:
          "Autologous regenerative treatments using blood-derived platelet concentrates to support healing and collagen remodeling.",
      },
      {
        slug: "sclerotherapy",
        title: "Sclerotherapy",
        description:
          "A minimally invasive vein treatment where a sclerosant is injected to close targeted spider veins or small varicose veins.",
      },
    ],
  },
  "advanced-aesthetic-treatments": {
    title: "Advanced aesthetic treatments",
    description:
      "Device-based and advanced clinic treatments designed for tightening, resurfacing, and targeted correction—ideal when you want more visible change with structured protocols.",
    subcategories: [
      {
        slug: "hifu-face-lift",
        title: "HIFU face lift",
        description:
          "High-intensity focused ultrasound to target deeper support layers and stimulate collagen remodeling—without needles or downtime.",
      },
      {
        slug: "rf-microneedling",
        title: "RF microneedling",
        description:
          "Radiofrequency microneedling for pores, texture, fine lines, and acne-scar appearance with controlled downtime.",
      },
      {
        slug: "black-doll-facial-carbon-peel",
        title: "Black Doll Facial (carbon peel)",
        description:
          "Laser-activated carbon peel designed to cleanse pores and gently resurface—popular for oil control and event-ready glow.",
      },
      {
        slug: "skin-tag-papilloma-removal",
        title: "Skin tag / papilloma removal",
        description:
          "Quick in-clinic removal of benign skin tags or papillomas with aftercare selected for clean healing and a smooth finish.",
      },
      {
        slug: "laser-tattoo-pmu-removal",
        title: "Laser tattoo / PMU removal",
        description:
          "Laser sessions designed to break down pigment gradually. Protocols are adjusted for depth, pigment type, and skin.",
      },
    ],
  },
  "laser-hair-removal": {
    title: "Laser hair removal",
    description:
      "Laser treatments designed to reduce unwanted hair by targeting follicles. Results build over a course of sessions, tailored to skin tone and hair thickness.",
    subcategories: [
      {
        slug: "laser-hair-removal-sets",
        title: "Laser hair removal — sets",
        description:
          "Curated combinations for popular areas to streamline planning. Best results come from a timed course aligned to growth cycles.",
      },
    ],
  },
};

function assertCategorySlug(value: string): asserts value is CategorySlug {
  if (!Object.hasOwn(categoryModel, value)) notFound();
}

export async function generateStaticParams(): Promise<Array<{ categorySlug: CategorySlug }>> {
  return (Object.keys(categoryModel) as CategorySlug[]).map((categorySlug) => ({
    categorySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug } = await params;
  assertCategorySlug(categorySlug);
  const category = categoryModel[categorySlug];

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
  assertCategorySlug(categorySlug);
  const category = categoryModel[categorySlug];

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
            <li key={subcategory.slug}>
              <ServiceCard
                title={subcategory.title}
                description={subcategory.description}
                href={`/services/${categorySlug}/${subcategory.slug}`}
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

