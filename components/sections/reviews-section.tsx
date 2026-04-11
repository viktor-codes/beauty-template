import type { HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TestimonialCard } from "@/components/shared/testimonial-card";
import type { ReviewsContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface ReviewsSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  content: ReviewsContent;
}

export function ReviewsSection({
  content,
  className,
  id = "reviews",
  ...rest
}: ReviewsSectionProps) {
  return (
    <Section id={id} className={cn("bg-surface", className)} {...rest}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        align="center"
        className="mx-auto max-w-2xl"
      />
      <ul className="mt-4 grid gap-6 md:grid-cols-3">
        {content.items.map((item, index) => (
          <li key={`review-${index}`}>
            <TestimonialCard
              quote={item.quote}
              authorName={item.authorName}
              authorRole={item.authorRole}
            />
          </li>
        ))}
      </ul>
    </Section>
  );
}
