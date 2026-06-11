import Image from "next/image";
import { Link } from "@/i18n/navigation";

import {
  Breadcrumbs,
  type BreadcrumbItem,
} from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceJsonLd } from "@/components/shared/service-jsonld";
import { Button } from "@/components/ui/button";
import type { FAQItem } from "@/lib/types/content";
import type {
  ServiceCategory,
  ServiceProcedure,
  ServiceSubcategory,
  TreatmentsHubUi,
} from "@/lib/types/services";

export interface TreatmentProcedureDetailProps {
  category: ServiceCategory;
  subcategory: ServiceSubcategory;
  procedure: ServiceProcedure;
  procedurePath: string;
  breadcrumbs: BreadcrumbItem[];
  hubUi: TreatmentsHubUi;
  procedureFaq: FAQItem[];
  contactCtaLabel: string;
  isFlatCategory: boolean;
  categorySlug: string;
  pageTitleId: string;
}

export function TreatmentProcedureDetail({
  category,
  subcategory,
  procedure,
  procedurePath,
  breadcrumbs,
  hubUi,
  procedureFaq,
  contactCtaLabel,
  isFlatCategory: isFlat,
  categorySlug,
  pageTitleId,
}: TreatmentProcedureDetailProps) {
  const priceLabel = procedure.price
    ? `${procedure.price.amount} ${procedure.price.currency}`
    : null;

  const backHref = isFlat
    ? `/treatments/${categorySlug}`
    : `/treatments/${categorySlug}/${subcategory.id}`;
  const backLabel = isFlat
    ? `${hubUi.backToCategoryPrefix} ${category.title}`
    : `${hubUi.backToCategoryPrefix} ${subcategory.title}`;

  return (
    <main id="main-content" className="flex-1 pt-20 md:pt-0">
      <Section className="bg-background">
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <ServiceJsonLd
          procedure={procedure}
          procedurePath={procedurePath}
          categoryLabel={category.title}
          subcategoryLabel={isFlat ? category.title : subcategory.title}
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
                  {hubUi.consultationRecommendedLabel}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/#contact" size="lg">
                  {contactCtaLabel}
                </Button>
                <Button href={backHref} variant="secondary" size="lg">
                  {backLabel}
                </Button>
              </div>

              <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6">
                <p className="text-sm leading-relaxed text-muted">
                  {hubUi.procedureConsultationBlurb}
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/treatments"
                  className="text-sm text-muted underline underline-offset-4 hover:text-primary"
                >
                  {hubUi.backToAllCategoriesLabel}
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
          eyebrow={hubUi.faqEyebrow}
          title={hubUi.procedureFaqTitleTemplate.replace(
            "{title}",
            procedure.title,
          )}
          subtitle={hubUi.procedureFaqSubtitle}
          className="mb-6"
        />
        <FaqAccordion items={procedureFaq} />
        <div className="mt-6">
          <Link
            href="/#faq"
            className="text-sm text-muted underline underline-offset-4 hover:text-primary"
          >
            {hubUi.viewFullFaqLabel}
          </Link>
        </div>
      </Section>
    </main>
  );
}
