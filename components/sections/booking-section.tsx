import type { HTMLAttributes } from "react";

import { CalendlyEmbed } from "@/components/shared/calendly-embed";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import type { BookingContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface BookingSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  content: BookingContent;
}

export function BookingSection({
  content,
  className,
  id = "booking",
  ...rest
}: BookingSectionProps) {
  return (
    <Section id={id} className={cn("bg-background", className)} {...rest}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.description}
      />
      <CalendlyEmbed calendlyUrl={content.calendlyUrl} />
    </Section>
  );
}
