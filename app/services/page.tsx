import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/shared/service-card";
import { content } from "@/lib/content";

export default function ServicesPage() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  return (
    <main id="main-content" className="flex-1 pt-19 md:pt-0">
      <Section className="bg-background">
        <BreadcrumbsJsonLd items={breadcrumbs} />
        <Breadcrumbs items={breadcrumbs} />
        <SectionHeading
          eyebrow="Services"
          title="Explore services by category"
          subtitle="Start with a direction or choose a goal. We'll keep it clear and calm—no overwhelming menus."
        />

        <ul className="grid gap-6 sm:grid-cols-2">
          {content.services.categories.map((category) => (
            <li key={category.id}>
              <ServiceCard
                title={category.title}
                description={category.description}
                href={category.href}
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-border bg-surface/50 p-6">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            Choose by goal
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {content.services.goals.map((goal) => (
              <li key={goal.id}>
                <Link href={goal.href} className="no-underline">
                  <Badge variant="outline">{goal.title}</Badge>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button href="/#contact" size="lg">
              Book a consultation
            </Button>
            <Button href="/#services" variant="secondary" size="lg">
              Back to landing
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}

