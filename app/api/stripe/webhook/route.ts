import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { completeGiftVoucherOrder } from "@/lib/gift-voucher/complete-order";
import { getStripeClient, getStripeWebhookSecret } from "@/lib/stripe/client";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const stripe = getStripeClient();
  const webhookSecret = getStripeWebhookSecret();

  if (!stripe || !webhookSecret) {
    return NextResponse.json(
      { message: "Stripe webhook is not configured" },
      { status: 501 },
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ message: "Missing stripe-signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ message: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    return NextResponse.json({ received: true });
  }

  const orderId = session.metadata?.sanityOrderId?.trim();
  if (!orderId) {
    return NextResponse.json({ message: "Missing sanityOrderId metadata" }, { status: 422 });
  }

  const result = await completeGiftVoucherOrder(orderId);
  if (!result.ok) {
    return NextResponse.json(
      { message: "Order fulfillment failed", reason: result.reason },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true, orderId });
}
