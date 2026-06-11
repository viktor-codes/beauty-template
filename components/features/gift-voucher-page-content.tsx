import { Suspense } from "react";

import { GiftVoucherWizard } from "@/components/features/gift-voucher-wizard";
import type { GiftableProcedure, GiftVoucherSettings } from "@/lib/types/gift-voucher";

export interface GiftVoucherPageContentProps {
  procedures: GiftableProcedure[];
  settings: GiftVoucherSettings;
}

function GiftVoucherWizardFallback() {
  return (
    <div className="mt-10 h-96 animate-pulse rounded-3xl border border-border bg-surface/40" />
  );
}

export function GiftVoucherPageContent({
  procedures,
  settings,
}: GiftVoucherPageContentProps) {
  return (
    <Suspense fallback={<GiftVoucherWizardFallback />}>
      <GiftVoucherWizard procedures={procedures} settings={settings} />
    </Suspense>
  );
}
