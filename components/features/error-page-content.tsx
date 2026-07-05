"use client";

import { ArrowCounterClockwiseIcon, HouseIcon } from "@phosphor-icons/react";

import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";

export interface ErrorPageContentProps {
  code: "404" | "500";
  title: string;
  description: string;
  homeLabel: string;
  retryLabel?: string;
  onRetry?: () => void;
}

export function ErrorPageContent({
  code,
  title,
  description,
  homeLabel,
  retryLabel,
  onRetry,
}: ErrorPageContentProps) {
  return (
    <main id="main-content" className="flex flex-1 flex-col pt-20 md:pt-0">
      <Section className="flex flex-1 items-center py-16 md:py-24">
        <div className="mx-auto flex w-full max-w-xl flex-col items-center text-center">
          <p
            aria-hidden
            className="font-serif text-7xl font-medium tracking-tight text-accent/35 sm:text-8xl"
          >
            {code}
          </p>
          <h1 className="type-h2 mt-4 tracking-tight text-primary">{title}</h1>
          <p className="type-body mt-4 max-w-md text-muted">{description}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="lg">
              <HouseIcon className="size-4" weight="light" aria-hidden />
              {homeLabel}
            </Button>
            {onRetry && retryLabel ? (
              <Button type="button" variant="secondary" size="lg" onClick={onRetry}>
                <ArrowCounterClockwiseIcon className="size-4" weight="light" aria-hidden />
                {retryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Section>
    </main>
  );
}
