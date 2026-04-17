import type { HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import type { ReviewItem, ReviewsContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface ReviewsSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  content: ReviewsContent;
}

function reviewStableKey(item: ReviewItem, index: number): string {
  return item.authorRole
    ? `review-${item.authorRole}`
    : `review-${index}-${item.quote.slice(0, 24)}`;
}

export function ReviewsSection({
  content,
  className,
  id = "reviews",
  ...rest
}: ReviewsSectionProps) {
  const { items } = content;

  return (
    <Section id={id} className={cn("bg-surface", className)} {...rest}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        align="center"
        className="mx-auto max-w-2xl"
      />
      <div className="marquee-viewport mt-10 -mx-1 px-1 [--marquee-duration:80s] [--marquee-edge:var(--color-surface)] sm:-mx-2 sm:px-2">
        <div className="marquee-inner">
          <ul className="marquee-track list-none gap-5 py-1">
            {items.map((item, index) => (
              <li
                key={reviewStableKey(item, index)}
                className="w-[min(88vw,22rem)] shrink-0 sm:w-80"
              >
                <TestimonialCard
                  quote={item.quote}
                  authorName={item.authorName}
                  authorRole={item.authorRole}
                />
              </li>
            ))}
            {items.map((item, index) => (
              <li
                key={`${reviewStableKey(item, index)}-clone`}
                className="marquee-item--clone w-[min(88vw,22rem)] shrink-0 sm:w-80"
                aria-hidden
              >
                <TestimonialCard
                  quote={item.quote}
                  authorName={item.authorName}
                  authorRole={item.authorRole}
                  tabIndex={-1}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
