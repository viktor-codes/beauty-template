import type { Metadata } from "next";
import { permanentRedirect } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";

import { TreatmentProcedureDetail } from "@/components/features/treatment-procedure-detail";
import { getLandingContent } from "@/lib/content";
import { getServicesProcedureFaq } from "@/lib/services-faq";
import type { AppLocale } from "@/i18n/routing";
import { resolveServicesCatalog } from "@/lib/services";
import { servicesCatalog } from "@/lib/services/catalog";
import { isFlatCategory } from "@/lib/services/flat-categories";
import { findCategory, findProcedure } from "@/lib/services/page-helpers";
import { buildProcedurePath } from "@/lib/services/procedure-path";
import { buildTreatmentsBreadcrumbs } from "@/lib/services/treatments-breadcrumbs";
import { SITE_BRAND, SITE_PRACTITIONER } from "@/lib/site-metadata";

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
    locale: string;
    categorySlug: string;
    subcategorySlug: string;
    procedureSlug: string;
  }>;
}): Promise<Metadata> {
  const { locale, categorySlug, subcategorySlug, procedureSlug } = await params;
  const catalog = await resolveServicesCatalog(locale as AppLocale);
  const category = findCategory(catalog, categorySlug);

  if (isFlatCategory(category)) {
    const { procedure } = findProcedure(
      catalog,
      categorySlug,
      subcategorySlug,
      procedureSlug,
    );
    const priceLabel = procedure.price
      ? `${procedure.price.amount} ${procedure.price.currency}`
      : null;

    return {
      title: priceLabel
        ? `${procedure.title} (${priceLabel}) — ${category.title}`
        : `${procedure.title} — ${category.title}`,
      description: procedure.description,
    };
  }

  const { subcategory, procedure } = findProcedure(
    catalog,
    categorySlug,
    subcategorySlug,
    procedureSlug,
  );

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
    locale: string;
    categorySlug: string;
    subcategorySlug: string;
    procedureSlug: string;
  }>;
}) {
  const { locale, categorySlug, subcategorySlug, procedureSlug } = await params;
  setRequestLocale(locale);
  const appLocale = locale as AppLocale;
  const catalog = await resolveServicesCatalog(appLocale);
  const category = findCategory(catalog, categorySlug);

  if (isFlatCategory(category)) {
    permanentRedirect(`/treatments/${categorySlug}/${procedureSlug}`);
  }

  const { subcategory, procedure } = findProcedure(
    catalog,
    categorySlug,
    subcategorySlug,
    procedureSlug,
  );
  const { hubUi } = catalog;
  const landingContent = await getLandingContent(appLocale);
  const giftT = await getTranslations("GiftVoucher");
  const procedureFaq = await getServicesProcedureFaq(
    category,
    subcategory,
    procedure,
    appLocale,
    5,
  );
  const procedurePath = buildProcedurePath({ category, subcategory, procedure });
  const breadcrumbs = buildTreatmentsBreadcrumbs(hubUi, [
    { label: category.title, href: `/treatments/${categorySlug}` },
    {
      label: subcategory.title,
      href: `/treatments/${categorySlug}/${subcategorySlug}`,
    },
    {
      label: procedure.title,
      href: procedurePath,
    },
  ]);
  const pageTitleId = `procedure-${categorySlug}-${subcategorySlug}-${procedureSlug}-title`;

  return (
    <TreatmentProcedureDetail
      category={category}
      subcategory={subcategory}
      procedure={procedure}
      procedurePath={procedurePath}
      breadcrumbs={breadcrumbs}
      hubUi={hubUi}
      procedureFaq={procedureFaq}
      contactCtaLabel={landingContent.nav.cta.label}
      giftVoucherHref={
        procedure.price
          ? `/gift-voucher?procedure=${encodeURIComponent(procedure.id)}`
          : undefined
      }
      giftVoucherLabel={procedure.price ? giftT("giftProcedureCta") : undefined}
      isFlatCategory={false}
      categorySlug={categorySlug}
      pageTitleId={pageTitleId}
    />
  );
}
