import type { HTMLAttributes } from "react";

import { AccordionItem } from "@/components/shared/accordion-item";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
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
      <SectionHeading eyebrow={content.eyebrow} title={content.title} />
      <div className="mx-auto max-w-3xl">
        {content.items.map((item, index) => (
          <AccordionItem
            key={item.question}
            itemId={`faq-${index}`}
            title={item.question}
          >
            {item.answer}
          </AccordionItem>
        ))}
      </div>
    </Section>
  );
}
