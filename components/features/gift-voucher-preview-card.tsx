import { GiftIcon } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/cn";
import { SITE_BRAND } from "@/lib/site-metadata";
import type { GiftableProcedure } from "@/lib/types/gift-voucher";

export interface GiftVoucherPreviewCardProps {
  procedure: GiftableProcedure | null;
  recipientName: string;
  senderName: string;
  personalMessage: string;
  labels: {
    eyebrow: string;
    for: string;
    from: string;
    procedure: string;
    value: string;
    codePlaceholder: string;
    validity: string;
  };
  className?: string;
}

export function GiftVoucherPreviewCard({
  procedure,
  recipientName,
  senderName,
  personalMessage,
  labels,
  className,
}: GiftVoucherPreviewCardProps) {
  const priceLabel = procedure
    ? `${procedure.price.amount} ${procedure.price.currency}`
    : "—";

  return (
    <aside
      className={cn(
        "rounded-3xl border border-border bg-surface/60 p-6 md:p-8",
        className,
      )}
      aria-label={labels.eyebrow}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
            {labels.eyebrow}
          </p>
          <p className="mt-2 font-heading text-2xl text-primary">{SITE_BRAND}</p>
        </div>
        <GiftIcon className="h-8 w-8 shrink-0 text-accent" weight="light" aria-hidden />
      </div>

      <div className="mt-8 space-y-5">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">{labels.for}</p>
          <p className="mt-1 font-heading text-xl text-primary">
            {recipientName.trim() || "—"}
          </p>
        </div>

        {personalMessage.trim() ? (
          <blockquote className="border-l-2 border-accent/70 pl-4 text-sm italic leading-relaxed text-primary/90">
            {personalMessage.trim()}
          </blockquote>
        ) : null}

        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {labels.procedure}
          </p>
          <p className="mt-1 text-base text-primary">
            {procedure?.title ?? "—"}
          </p>
        </div>

        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{labels.value}</p>
            <p className="mt-1 text-base font-medium text-primary">{priceLabel}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{labels.from}</p>
            <p className="mt-1 text-base text-primary">{senderName.trim() || "—"}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-dashed border-accent/40 bg-background px-4 py-5 text-center">
          <p className="text-xs uppercase tracking-[0.16em] text-muted">
            {labels.codePlaceholder}
          </p>
        </div>

        <p className="text-xs leading-relaxed text-muted">{labels.validity}</p>
      </div>
    </aside>
  );
}
