import type { HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/shared/service-card";
import type { ServicesContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface ServicesSectionProps
  extends Omit<HTMLAttributes<HTMLElement>, "content"> {
  content: ServicesContent;
}

export function ServicesSection({
  content,
  className,
  id = "services",
  ...rest
}: ServicesSectionProps) {
  return (
    <Section id={id} className={cn("bg-surface", className)} {...rest}>
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.description}
      />
      <ul className="grid gap-6 sm:grid-cols-2">
        {content.categories.map((category) => (
          <li key={category.id}>
            <ServiceCard
              title={category.title}
              description={category.description}
              href={category.href}
            />
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Choose by goal
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {content.goals.map((goal) => (
              <li key={goal.id}>
                <a href={goal.href} className="no-underline">
                  <Badge variant="outline">{goal.title}</Badge>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Button href={content.cta.href} variant="secondary" size="lg">
          {content.cta.label}
        </Button>
      </div>
    </Section>
  );
}
