import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

export interface TestimonialCardProps extends HTMLAttributes<HTMLElement> {
  quote: string;
  authorName: string;
  authorRole?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
}

export function TestimonialCard({
  quote,
  authorName,
  authorRole,
  rating,
  className,
  ...rest
}: TestimonialCardProps) {
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
      <blockquote className="flex-1 text-base leading-relaxed text-primary">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 text-sm">
        <span className="font-medium text-primary">{authorName}</span>
        {authorRole ? (
          <span className="block text-muted">{authorRole}</span>
        ) : null}
      </figcaption>
    </figure>
  );
}
