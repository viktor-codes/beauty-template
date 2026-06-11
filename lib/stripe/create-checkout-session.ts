import type { AppLocale } from "@/i18n/routing";
import {
  buildLocalizedAbsoluteUrl,
} from "@/lib/i18n/build-localized-path";
import type { GiftVoucherCheckoutPayload } from "@/lib/gift-voucher/schemas/checkout-payload";
import type { GiftableProcedure } from "@/lib/types/gift-voucher";
import { getStripeClient } from "@/lib/stripe/client";

interface CreateCheckoutSessionInput {
  locale: AppLocale;
  payload: GiftVoucherCheckoutPayload;
  procedure: GiftableProcedure;
  sanityOrderId: string;
}

export async function createGiftVoucherCheckoutSession({
  locale,
  payload,
  procedure,
  sanityOrderId,
}: CreateCheckoutSessionInput): Promise<{ url: string; sessionId: string } | null> {
  const stripe = getStripeClient();
  if (!stripe) return null;

  const unitAmount = Math.round(procedure.price.amount * 100);
  if (unitAmount <= 0) return null;

  const successUrl = `${buildLocalizedAbsoluteUrl(locale, "/gift-voucher/success")}?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${buildLocalizedAbsoluteUrl(locale, "/gift-voucher")}?procedure=${encodeURIComponent(procedure.slug)}`;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: payload.senderEmail,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: procedure.price.currency.toLowerCase(),
          unit_amount: unitAmount,
          product_data: {
            name: `Gift voucher — ${procedure.title}`,
            description: `For ${payload.recipientName}`,
          },
        },
      },
    ],
    metadata: {
      sanityOrderId,
      procedureSlug: procedure.slug,
      locale,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  if (!session.url || !session.id) return null;

  return { url: session.url, sessionId: session.id };
}

export async function retrieveCheckoutSession(sessionId: string) {
  const stripe = getStripeClient();
  if (!stripe) return null;

  return stripe.checkout.sessions.retrieve(sessionId);
}
