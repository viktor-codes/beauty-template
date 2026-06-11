"use client";

import { cn } from "@/lib/cn";
import type { GiftableProcedure } from "@/lib/types/gift-voucher";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export interface GiftVoucherProcedurePickerProps {
  procedures: GiftableProcedure[];
  selectedSlug: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSelect: (slug: string) => void;
  labels: {
    title: string;
    searchPlaceholder: string;
    empty: string;
  };
  error?: string;
}

export function GiftVoucherProcedurePicker({
  procedures,
  selectedSlug,
  searchQuery,
  onSearchChange,
  onSelect,
  labels,
  error,
}: GiftVoucherProcedurePickerProps) {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = normalizedQuery
    ? procedures.filter(
        (item) =>
          item.title.toLowerCase().includes(normalizedQuery) ||
          item.categoryTitle.toLowerCase().includes(normalizedQuery),
      )
    : procedures;

  const grouped = filtered.reduce<Record<string, GiftableProcedure[]>>((acc, item) => {
    const bucket = acc[item.categoryTitle] ?? [];
    bucket.push(item);
    acc[item.categoryTitle] = bucket;
    return acc;
  }, {});

  return (
    <section aria-labelledby="gift-voucher-procedure-heading">
      <h2
        id="gift-voucher-procedure-heading"
        className="font-heading text-xl text-primary"
      >
        {labels.title}
      </h2>

      <label className="mt-4 block">
        <span className="sr-only">{labels.searchPlaceholder}</span>
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={labels.searchPlaceholder}
          className={fieldClass}
          autoComplete="off"
        />
      </label>

      {error ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-4 max-h-72 overflow-y-auto rounded-2xl border border-border bg-background">
        {filtered.length === 0 ? (
          <p className="px-4 py-6 text-sm text-muted">{labels.empty}</p>
        ) : (
          <ul className="divide-y divide-border">
            {Object.entries(grouped).flatMap(([categoryTitle, items]) =>
              items.map((item) => {
                const isSelected = item.slug === selectedSlug;
                const priceLabel = `${item.price.amount} ${item.price.currency}`;

                return (
                  <li key={`${categoryTitle}:${item.slug}`}>
                    <button
                      type="button"
                      onClick={() => onSelect(item.slug)}
                      className={cn(
                        "flex w-full items-start justify-between gap-4 px-4 py-4 text-left transition-colors",
                        isSelected ? "bg-surface" : "hover:bg-surface/50",
                      )}
                      aria-pressed={isSelected}
                    >
                      <span>
                        <span className="block text-sm font-medium text-primary">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-xs text-muted">
                          {categoryTitle}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full border border-border px-3 py-1 text-xs text-primary">
                        {priceLabel}
                      </span>
                    </button>
                  </li>
                );
              }),
            )}
          </ul>
        )}
      </div>
    </section>
  );
}
