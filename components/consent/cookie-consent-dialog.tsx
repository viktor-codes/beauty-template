"use client";

import { XIcon } from "@phosphor-icons/react";
import { useEffect, useId, useState } from "react";

import { CookieConsentFormPanels } from "@/components/consent/cookie-consent-form-panels";
import { useCookieConsent } from "@/components/consent/cookie-consent-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function CookieConsentDialog() {
  const {
    hasAnswered,
    analyticsEnabled,
    isDialogOpen,
    closePreferences,
    acceptAll,
    rejectOptional,
    savePreferences,
  } = useCookieConsent();

  const titleId = useId();
  const [analyticsToggle, setAnalyticsToggle] = useState(analyticsEnabled);

  useEffect(() => {
    if (isDialogOpen) setAnalyticsToggle(analyticsEnabled);
  }, [isDialogOpen, analyticsEnabled]);

  useEffect(() => {
    if (!isDialogOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && hasAnswered) closePreferences();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isDialogOpen, hasAnswered, closePreferences]);

  if (!isDialogOpen) return null;

  const isBlocking = !hasAnswered;

  return (
    <div
      className="fixed inset-0 z-(--z-modal) flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label={isBlocking ? undefined : "Close cookie preferences"}
        disabled={isBlocking}
        onClick={() => !isBlocking && closePreferences()}
        className={cn(
          "absolute inset-0 bg-primary/40 transition-opacity",
          isBlocking ? "cursor-default" : "cursor-pointer",
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-background p-6 shadow-lg"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="type-h4 text-primary">
            Cookie preferences
          </h2>
          {hasAnswered ? (
            <button
              type="button"
              onClick={closePreferences}
              className="rounded-full p-1 text-muted transition-colors hover:bg-surface hover:text-primary"
              aria-label="Close"
            >
              <XIcon className="size-5" weight="thin" aria-hidden />
            </button>
          ) : null}
        </div>

        <CookieConsentFormPanels
          analyticsToggle={analyticsToggle}
          onAnalyticsChange={setAnalyticsToggle}
        />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button type="button" variant="secondary" size="md" onClick={rejectOptional}>
            Reject optional
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => savePreferences(analyticsToggle)}
          >
            Save choices
          </Button>
          <Button type="button" variant="primary" size="md" onClick={acceptAll}>
            Accept all
          </Button>
        </div>
      </div>
    </div>
  );
}
