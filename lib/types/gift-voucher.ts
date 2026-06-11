import type { Money } from "@/lib/types/services";

export type GiftVoucherOrderStatus = "pending" | "paid" | "redeemed" | "cancelled";

export interface GiftVoucherSettings {
  isEnabled: boolean;
  heroTitle: string;
  heroSubtitle: string;
  termsBlurb: string;
  validityMonths: number;
}

export interface GiftableProcedure {
  slug: string;
  title: string;
  categoryTitle: string;
  price: Money;
}

export interface GiftVoucherCheckoutInput {
  locale: string;
  procedureSlug: string;
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  personalMessage?: string;
}
