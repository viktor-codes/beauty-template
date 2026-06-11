import { Button } from "@/components/ui/button";
import { isFlatCategory } from "@/lib/services/flat-categories";
import type { ProcedureHit } from "@/lib/services-goals";
import type { TreatmentsHubUi } from "@/lib/types/services";

export interface ConcernProceduresListProps {
  hits: ProcedureHit[];
  hubUi: TreatmentsHubUi;
  listId: string;
  emptyDescription: string;
}

export function ConcernProceduresList({
  hits,
  hubUi,
  listId,
  emptyDescription,
}: ConcernProceduresListProps) {
  if (hits.length === 0) {
    return (
      <p className="rounded-2xl border border-border bg-surface/40 px-6 py-8 text-center text-sm leading-relaxed text-muted">
        {emptyDescription}
      </p>
    );
  }

  return (
    <ul
      id={listId}
      className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-background"
    >
      {hits.map((hit) => {
        const priceLabel = hit.procedure.price
          ? `${hit.procedure.price.amount} ${hit.procedure.price.currency}`
          : null;

        return (
          <li
            key={`${hit.category.id}-${hit.subcategory.id}-${hit.procedure.id}`}
            className="group bg-background p-6 transition-colors hover:bg-surface/40"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="min-w-0 font-heading text-lg text-primary">
                    {hit.procedure.title}
                  </h2>
                  {priceLabel ? (
                    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-2 text-xs font-medium text-primary">
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
                  {isFlatCategory(hit.category)
                    ? hit.category.title
                    : `${hit.category.title} · ${hit.subcategory.title}`}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <Button
                  href={hit.href}
                  variant="secondary"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  {hubUi.viewDetailsLabel}
                </Button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
