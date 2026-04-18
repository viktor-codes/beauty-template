"use client";

import Link from "next/link";

export interface CookieConsentFormPanelsProps {
  analyticsToggle: boolean;
  onAnalyticsChange: (value: boolean) => void;
}

export function CookieConsentFormPanels({
  analyticsToggle,
  onAnalyticsChange,
}: CookieConsentFormPanelsProps) {
  return (
    <>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        We use strictly necessary cookies to remember your choices. With your
        permission, we use Google Analytics to understand how our site is used.
        See our{" "}
        <Link href="/privacy" className="text-accent underline underline-offset-2">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="text-accent underline underline-offset-2">
          Terms
        </Link>
        .
      </p>
      <div className="mt-6 space-y-4 rounded-xl border border-border bg-surface/60 p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-primary">
              Strictly necessary
            </p>
            <p className="mt-2 text-xs text-muted">
              Required to store your consent and run core site features. Always
              on.
            </p>
          </div>
          <span className="text-xs font-medium uppercase tracking-wide text-muted">
            On
          </span>
        </div>
        <div className="border-t border-border pt-4">
          <label className="flex cursor-pointer items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-primary">
                Analytics (Google Analytics)
              </p>
              <p className="mt-2 text-xs text-muted">
                Helps us measure traffic and improve the experience. Optional.
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
