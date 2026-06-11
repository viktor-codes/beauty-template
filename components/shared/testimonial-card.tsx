"use client";

import type { HTMLAttributes } from "react";
import { QuotesIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export interface TestimonialCardProps extends HTMLAttributes<HTMLElement> {
  quote: string;
  authorName: string;
  authorRole?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  instagramSourceUrl?: string;
  instagramLinkLabel?: string;
}

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  rating,
  instagramSourceUrl,
  instagramLinkLabel = "View on Instagram",
  className,
  ...rest
}: TestimonialCardProps) {
  const hasInstagramLink = Boolean(instagramSourceUrl?.trim());

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-border bg-background p-6",
        className,
      )}
      {...rest}
    >
      {rating ? (
        <p className="mb-4 text-sm text-accent">
          <span aria-hidden>{"★".repeat(rating)}</span>
          <span className="sr-only">{rating} out of 5 stars</span>
        </p>
      ) : null}
      <QuotesIcon
        aria-hidden
        className="absolute top-1 left-0 -z-10 size-8 rotate-180 text-accent opacity-40"
      />
      <blockquote className="relative flex-1 text-base leading-relaxed text-primary before:content-none after:content-none">
        {quote}
      </blockquote>
      <QuotesIcon className="size-36 text-accent absolute bottom-0 right-0  opacity-40 " />
      <figcaption className="mt-4 text-sm">
        <span className="font-medium text-primary">{authorName}</span>
        {authorRole ? (
          <span className="block text-muted">{authorRole}</span>
        ) : null}
        {hasInstagramLink ? (
          <a
            href={instagramSourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-sm font-medium text-accent underline-offset-2 hover:underline"
          >
            {instagramLinkLabel}
          </a>
        ) : null}
      </figcaption>
    </figure>
  );
}
