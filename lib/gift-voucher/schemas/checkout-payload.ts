import { z } from "zod";

import { routing } from "@/i18n/routing";

export const GiftVoucherCheckoutSchema = z.object({
  locale: z.enum(routing.locales),
  procedureSlug: z.string().trim().min(1).max(96),
  recipientName: z.string().trim().min(1).max(120),
  recipientEmail: z.string().trim().email().max(254),
  senderName: z.string().trim().min(1).max(120),
  senderEmail: z.string().trim().email().max(254),
  personalMessage: z.string().trim().max(500).optional(),
});

export type GiftVoucherCheckoutPayload = z.infer<typeof GiftVoucherCheckoutSchema>;
