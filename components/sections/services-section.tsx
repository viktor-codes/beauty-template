import { Drop, Flower, HandHeart, Sparkle } from "@phosphor-icons/react/ssr";
import type { HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ServiceCard } from "@/components/shared/service-card";
import type { ServicesContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

const icons = [Sparkle, Drop, Flower, HandHeart];

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
        {content.items.map((item, index) => {
          const Icon = icons[index % icons.length] ?? Sparkle;
          return (
            <li key={item.title}>
              <ServiceCard
                title={item.title}
                description={item.description}
                icon={
                  <Icon className="h-8 w-8" weight="light" aria-hidden />
                }
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
