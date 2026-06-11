import { NextRequest, NextResponse } from "next/server";

import type { AppLocale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import {
  buildGiftableProcedures,
  findGiftableProcedure,
} from "@/lib/gift-voucher/build-giftable-procedures";
import {
  attachStripeSessionToOrder,
  createPendingGiftVoucherOrder,
} from "@/lib/gift-voucher/order-repository";
import { GiftVoucherCheckoutSchema } from "@/lib/gift-voucher/schemas/checkout-payload";
import { fetchGiftVoucherSettings } from "@/lib/sanity/fetch/fetch-gift-voucher-settings";
import { resolveServicesCatalog } from "@/lib/services";
import { createGiftVoucherCheckoutSession } from "@/lib/stripe/create-checkout-session";

export const runtime = "nodejs";

function isAppLocale(value: string): value is AppLocale {
  return routing.locales.includes(value as AppLocale);
}

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = GiftVoucherCheckoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const payload = parsed.data;
  if (!isAppLocale(payload.locale)) {
    return NextResponse.json({ message: "Unsupported locale" }, { status: 422 });
  }

  const settings = await fetchGiftVoucherSettings(payload.locale, {
    heroTitle: "",
    heroSubtitle: "",
    termsBlurb: "",
  });

  if (!settings.isEnabled) {
    return NextResponse.json({ message: "Gift vouchers are disabled" }, { status: 503 });
  }

  const catalog = await resolveServicesCatalog(payload.locale);
  const giftable = buildGiftableProcedures(catalog);
  const procedure = findGiftableProcedure(giftable, payload.procedureSlug);

  if (!procedure) {
    return NextResponse.json(
      { message: "Procedure not available for gifting" },
      { status: 404 },
    );
  }

  const orderId = await createPendingGiftVoucherOrder({
    payload,
    procedure,
    locale: payload.locale,
  });

  if (!orderId) {
    return NextResponse.json(
      { message: "Unable to create order. Check Sanity write token." },
      { status: 503 },
    );
  }

  const checkout = await createGiftVoucherCheckoutSession({
    locale: payload.locale,
    payload,
    procedure,
    sanityOrderId: orderId,
  });

  if (!checkout) {
    return NextResponse.json(
      { message: "Unable to start checkout. Check Stripe configuration." },
      { status: 503 },
    );
  }

  await attachStripeSessionToOrder(orderId, checkout.sessionId);

  return NextResponse.json({ url: checkout.url });
}
