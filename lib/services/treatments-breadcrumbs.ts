import type { BreadcrumbItem } from "@/components/shared/breadcrumbs";
import type { TreatmentsHubUi } from "@/lib/types/services";

export function buildTreatmentsBreadcrumbs(
  hubUi: TreatmentsHubUi,
  tail: BreadcrumbItem[] = [],
): BreadcrumbItem[] {
  return [
    { label: hubUi.breadcrumbHome, href: "/" },
    { label: hubUi.breadcrumbTreatments, href: "/treatments" },
    ...tail,
  ];
}
