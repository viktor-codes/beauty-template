import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";

type CategorySlug =
  | "aesthetic-treatments"
  | "aesthetic-injections"
  | "advanced-aesthetic-treatments"
  | "laser-hair-removal";

const categoryTitles: Record<CategorySlug, string> = {
  "aesthetic-treatments": "Aesthetic treatments",
  "aesthetic-injections": "Aesthetic injections",
  "advanced-aesthetic-treatments": "Advanced aesthetic treatments",
  "laser-hair-removal": "Laser hair removal",
};

const subcategoryTitles: Record<
  CategorySlug,
  Record<string, { title: string; description: string }>
> = {
  "aesthetic-treatments": {
    facials: {
      title: "Facials",
      description:
        "Professional, medical-grade facials selected for glow, clarity, acne control, or visible aging—based on your skin goals.",
    },
    "chemical-peels": {
      title: "Chemical peels",
      description:
        "Clinician-controlled exfoliation to improve texture and tone. Depth is chosen based on skin needs and downtime preference.",
    },
  },
  "aesthetic-injections": {
    "lip-fillers": {
      title: "Lip fillers",
      description:
        "HA fillers designed to enhance shape and definition while keeping proportions balanced.",
    },
    "collagen-stimulators": {
      title: "Collagen stimulators",
      description:
        "Biostimulatory injectables designed to activate collagen remodeling with gradual, natural-looking improvement.",
    },
    biorevitalisation: {
      title: "Biorevitalisation",
      description:
        "Hydrating and regenerative injectables aimed at elasticity, glow, and skin comfort—ideal for dryness and fine lines.",
    },
    "mesotherapy-for-hair-loss": {
      title: "Mesotherapy for hair loss",
      description:
        "Scalp microinjections of supportive ingredients designed to nourish follicles and improve the look of density.",
    },
    "plasma-therapy": {
      title: "Plasma therapy",
      description:
        "Autologous regenerative treatments using platelet concentrates to support healing and collagen remodeling.",
    },
    sclerotherapy: {
      title: "Sclerotherapy",
      description:
        "Minimally invasive vein treatment using injections to close targeted spider veins or small varicose veins.",
    },
  },
  "advanced-aesthetic-treatments": {
    "hifu-face-lift": {
      title: "HIFU face lift",
      description:
        "Focused ultrasound to stimulate collagen remodeling and improve the look of lift and firmness—without needles or downtime.",
    },
    "rf-microneedling": {
      title: "RF microneedling",
      description:
        "Radiofrequency microneedling for pores, texture, fine lines, and acne-scar appearance with controlled downtime.",
    },
    "black-doll-facial-carbon-peel": {
      title: "Black Doll Facial (carbon peel)",
      description:
        "Laser-activated carbon peel to cleanse pores and gently resurface—popular for oil control and quick glow.",
    },
    "skin-tag-papilloma-removal": {
      title: "Skin tag / papilloma removal",
      description:
        "Quick in-clinic removal of benign skin tags or papillomas with aftercare selected for clean healing.",
    },
    "laser-tattoo-pmu-removal": {
      title: "Laser tattoo / PMU removal",
      description:
        "Laser sessions designed to break down pigment gradually. Protocols are adjusted for depth and skin type.",
    },
  },
  "laser-hair-removal": {
    "laser-hair-removal-sets": {
      title: "Laser hair removal — sets",
      description:
        "Curated combinations for popular areas to streamline planning and value. Best results come from a timed course.",
    },
  },
};

function assertCategorySlug(value: string): asserts value is CategorySlug {
  if (!Object.hasOwn(categoryTitles, value)) notFound();
}

function assertSubcategorySlug(categorySlug: CategorySlug, subcategorySlug: string) {
  if (!Object.hasOwn(subcategoryTitles[categorySlug], subcategorySlug)) notFound();
}

export async function generateStaticParams(): Promise<
  Array<{ categorySlug: CategorySlug; subcategorySlug: string }>
> {
  const params: Array<{ categorySlug: CategorySlug; subcategorySlug: string }> = [];
  (Object.keys(subcategoryTitles) as CategorySlug[]).forEach((categorySlug) => {
    Object.keys(subcategoryTitles[categorySlug]).forEach((subcategorySlug) => {
      params.push({ categorySlug, subcategorySlug });
    });
  });
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}): Promise<Metadata> {
  const { categorySlug, subcategorySlug } = await params;
  assertCategorySlug(categorySlug);
  assertSubcategorySlug(categorySlug, subcategorySlug);

  const categoryTitle = categoryTitles[categorySlug];
  const subcategory = subcategoryTitles[categorySlug][subcategorySlug];

  return {
    title: `${subcategory.title} — ${categoryTitle}`,
    description: subcategory.description,
  };
}

export default async function ServicesSubcategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) {
  const { categorySlug, subcategorySlug } = await params;
  assertCategorySlug(categorySlug);
  assertSubcategorySlug(categorySlug, subcategorySlug);

  const categoryTitle = categoryTitles[categorySlug];
  const subcategory = subcategoryTitles[categorySlug][subcategorySlug];

  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <Section className="bg-background">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: categoryTitle, href: `/services/${categorySlug}` },
            { label: subcategory.title },
          ]}
        />

        <SectionHeading
          eyebrow={categoryTitle}
          title={subcategory.title}
          subtitle={subcategory.description}
        />

        <div className="rounded-2xl border border-border bg-surface/50 p-6">
          <p className="text-sm leading-relaxed text-muted">
            Procedure pages will live at{" "}
            <code className="rounded bg-background px-2 py-1 text-xs text-primary">
              /services/{categorySlug}/{subcategorySlug}/[procedureSlug]
            </code>
            . Next we’ll list the procedures here and add individual pages for SEO.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/#contact" size="lg">
              Book a consultation
            </Button>
            <Button href={`/services/${categorySlug}`} variant="secondary" size="lg">
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

