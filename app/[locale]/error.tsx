"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { ErrorPageContent } from "@/components/features/error-page-content";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations("Errors");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorPageContent
      code="500"
      title={t("serverErrorTitle")}
      description={t("serverErrorDescription")}
      homeLabel={t("homeCta")}
      retryLabel={t("retryCta")}
      onRetry={reset}
    />
  );
}
