import { getTranslations } from "next-intl/server";

import { ErrorPageContent } from "@/components/features/error-page-content";

export default async function NotFoundPage() {
  const t = await getTranslations("Errors");

  return (
    <ErrorPageContent
      code="404"
      title={t("notFoundTitle")}
      description={t("notFoundDescription")}
      homeLabel={t("homeCta")}
    />
  );
}
