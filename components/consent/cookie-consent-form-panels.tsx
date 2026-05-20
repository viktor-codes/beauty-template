"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export interface CookieConsentFormPanelsProps {
  analyticsToggle: boolean;
  onAnalyticsChange: (value: boolean) => void;
}

export function CookieConsentFormPanels({
  analyticsToggle,
  onAnalyticsChange,
}: CookieConsentFormPanelsProps) {
  const t = useTranslations("Cookie");

  return (
    <>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        {t("descriptionBeforePrivacy")}{" "}
        <Link href="/privacy" className="text-accent underline underline-offset-2">
          {t("privacyLink")}
        </Link>{" "}
        {t("descriptionBetweenLinks")}{" "}
        <Link href="/terms" className="text-accent underline underline-offset-2">
          {t("termsLink")}
        </Link>
        {t("descriptionAfterTerms")}
      </p>
      <div className="mt-6 space-y-4 rounded-xl border border-border bg-surface/60 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">
              {t("strictlyNecessaryTitle")}
            </p>
            <p className="mt-2 text-xs text-muted">
              {t("strictlyNecessaryDescription")}
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            {t("alwaysOn")}
          </span>
        </div>
        <div className="border-t border-border pt-4">
          <label className="flex cursor-pointer items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">
                {t("analyticsTitle")}
              </p>
              <p className="mt-2 text-xs text-muted">
                {t("analyticsDescription")}
              </p>
            </div>
            <input
              type="checkbox"
              className="size-4 shrink-0 accent-accent"
              checked={analyticsToggle}
              onChange={(e) => onAnalyticsChange(e.target.checked)}
            />
          </label>
        </div>
      </div>
    </>
  );
}
