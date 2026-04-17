import type { HTMLAttributes } from "react";

import { FaqJsonLd } from "@/components/shared/faq-jsonld";
import { FaqLanding } from "@/components/sections/faq-landing";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import type { FAQContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface FAQSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  content: FAQContent;
}

export function FAQSection({
  content,
  className,
  id = "faq",
  ...rest
}: FAQSectionProps) {
  return (
    <Section id={id} className={cn("bg-background", className)} {...rest}>
      <FaqJsonLd items={content.items} />
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.description}
      />
      {content.groups && content.groups.length > 0 ? (
        <FaqLanding content={content} />
      ) : (
        <FaqAccordion items={content.items} />
      )}
    </Section>
  );
}
