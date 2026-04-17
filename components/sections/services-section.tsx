import type { CSSProperties, HTMLAttributes } from "react";

import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/shared/service-card";
import { getServicesCategory } from "@/lib/services";
import type { ServicesContent } from "@/lib/types/content";
import { cn } from "@/lib/cn";

export interface ServicesSectionProps extends Omit<
  HTMLAttributes<HTMLElement>,
  "content"
> {
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
        align="center"
        eyebrow={content.eyebrow}
        title={content.title}
        subtitle={content.description}
      />
      <ul className="grid gap-6 sm:grid-cols-2">
        {content.categories.map((category, index) => (
          <li key={category.id}>
            {(() => {
              const categorySlug = category.href
                .split("/")
                .filter(Boolean)
                .at(-1);
              const catalogCategory = categorySlug
                ? getServicesCategory(categorySlug)
                : null;

              const isImageLeft = index % 2 === 1;
              const bottomRowClipRight =
                "polygon(0% 0%, 100% 0%, 100% 100%, 32% 100%)";
              const bottomRowClipLeft =
                "polygon(100% 0%, 0% 0%, 0% 100%, 68% 100%)";

              return (
                <ServiceCard
                  title={category.title}
                  description={category.description}
                  href={category.href}
                  imageSide={isImageLeft ? "left" : "right"}
                  style={
                    index >= 2
                      ? ({
                          ["--service-card-image-clip" as unknown as never]:
                            isImageLeft
                              ? bottomRowClipLeft
                              : bottomRowClipRight,
                        } as unknown as CSSProperties)
                      : undefined
                  }
                  image={catalogCategory?.image}
                />
              );
            })()}
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-col items-center gap-10">
        <Button href={content.cta.href} variant="secondary" size="lg">
          {content.cta.label}
        </Button>

        <div className="w-full max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            or choose by your goal
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-2">
            {content.goals.map((goal) => (
              <li key={goal.id}>
                <a href={goal.href} className="no-underline">
                  <Badge variant="outline">{goal.title}</Badge>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
