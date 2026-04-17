import Link from "next/link";

import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { BreadcrumbsJsonLd } from "@/components/shared/breadcrumbs-jsonld";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ServiceCard } from "@/components/shared/service-card";
import { content } from "@/lib/content";
import {
  getGoalLabel,
  getGoalRecommendations,
  isGoalSlug,
  type GoalSlug,
} from "@/lib/services-goals";

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
  ];

  const resolvedSearchParams = await searchParams;
  const rawGoal = resolvedSearchParams.goal;
  const goalValue = Array.isArray(rawGoal) ? rawGoal[0] : rawGoal;
  const selectedGoal: GoalSlug | null =
    goalValue && isGoalSlug(goalValue) ? goalValue : null;
  const recommended = selectedGoal
    ? getGoalRecommendations(selectedGoal, 10)
    : [];

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

        {selectedGoal ? (
          <div className="mb-10 rounded-2xl border border-border bg-surface/50 p-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Recommended for {getGoalLabel(selectedGoal)}
            </p>
            <ul className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
              {recommended.map((hit) => {
                const priceLabel = hit.procedure.price
                  ? `${hit.procedure.price.amount} ${hit.procedure.price.currency}`
                  : null;

                return (
                  <li
                    key={`${hit.category.id}-${hit.subcategory.id}-${hit.procedure.id}`}
                    className="group bg-background p-5 transition-colors hover:bg-surface/40"
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="min-w-0 font-heading text-lg text-primary">
                            {hit.procedure.title}
                          </h3>
                          {priceLabel ? (
                            <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-primary">
                              {priceLabel}
                            </span>
                          ) : null}
                        </div>
                        <p
                          className="mt-2 max-w-3xl truncate text-sm leading-relaxed text-muted"
                          title={hit.procedure.description}
                        >
                          {hit.procedure.description}
                        </p>
                        <p className="mt-2 text-xs text-muted">
                          {hit.category.title} · {hit.subcategory.title}
                        </p>
                      </div>

                      <div className="flex shrink-0 items-center gap-3">
                        <Button
                          href={hit.href}
                          variant="secondary"
                          size="sm"
                          className="whitespace-nowrap"
                        >
                          View details
                        </Button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

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

