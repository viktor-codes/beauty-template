import { Button } from "@/components/ui/button";
import type { ServiceProcedure } from "@/lib/types/services";

export interface TreatmentProcedureListItem {
  procedure: ServiceProcedure;
  href: string;
}

export interface TreatmentProceduresListProps {
  items: TreatmentProcedureListItem[];
  listId: string;
  proceduresSrOnlyLabel: string;
  viewDetailsLabel: string;
}

export function TreatmentProceduresList({
  items,
  listId,
  proceduresSrOnlyLabel,
  viewDetailsLabel,
}: TreatmentProceduresListProps) {
  return (
    <section aria-labelledby={listId}>
      <h2 id={listId} className="sr-only">
        {proceduresSrOnlyLabel}
      </h2>
      <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background">
        {items.map(({ procedure, href }) => {
          const priceLabel = procedure.price
            ? `${procedure.price.amount} ${procedure.price.currency}`
            : null;

          return (
            <li
              key={procedure.id}
              className="group bg-background p-6 transition-colors hover:bg-surface/40"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="min-w-0 font-heading text-lg text-primary">
                      {procedure.title}
                    </h3>
                    {priceLabel ? (
                      <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-primary">
                        {priceLabel}
                      </span>
                    ) : null}
                  </div>
                  <p
                    className="mt-2 max-w-3xl truncate text-sm leading-relaxed text-muted"
                    title={procedure.description}
                  >
                    {procedure.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  <Button href={href} variant="secondary" size="sm" className="whitespace-nowrap">
                    {viewDetailsLabel}
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
