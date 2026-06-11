import type { AppLocale } from "@/i18n/routing";
import type { GiftVoucherCheckoutPayload } from "@/lib/gift-voucher/schemas/checkout-payload";
import { getSanityClient } from "@/lib/sanity/client";
import { giftVoucherProcedureRefQuery } from "@/lib/sanity/queries/gift-voucher";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import type { GiftableProcedure } from "@/lib/types/gift-voucher";

interface CreatePendingOrderInput {
  payload: GiftVoucherCheckoutPayload;
  procedure: GiftableProcedure;
  locale: AppLocale;
}

export async function resolveProcedureDocumentId(
  procedureSlug: string,
): Promise<string | null> {
  const client = getSanityClient();
  if (!client) return null;

  return client.fetch<string | null>(giftVoucherProcedureRefQuery, {
    slug: procedureSlug,
  });
}

export async function createPendingGiftVoucherOrder({
  payload,
  procedure,
  locale,
}: CreatePendingOrderInput): Promise<string | null> {
  const writeClient = getSanityWriteClient();
  if (!writeClient) return null;

  const procedureRef = await resolveProcedureDocumentId(procedure.slug);
  if (!procedureRef) return null;

  const doc = await writeClient.create({
    _type: "giftVoucherOrder",
    status: "pending",
    procedure: { _type: "reference", _ref: procedureRef },
    procedureSlug: procedure.slug,
    procedureTitle: procedure.title,
    amount: procedure.price.amount,
    currency: procedure.price.currency,
    locale,
    recipientName: payload.recipientName,
    recipientEmail: payload.recipientEmail,
    senderName: payload.senderName,
    senderEmail: payload.senderEmail,
    personalMessage: payload.personalMessage?.trim() || undefined,
  });

  return doc._id;
}

export async function attachStripeSessionToOrder(
  orderId: string,
  stripeSessionId: string,
): Promise<void> {
  const writeClient = getSanityWriteClient();
  if (!writeClient) return;

  await writeClient.patch(orderId).set({ stripeSessionId }).commit();
}

interface FulfillOrderInput {
  orderId: string;
  code: string;
  purchasedAt: string;
}

export async function fulfillGiftVoucherOrder({
  orderId,
  code,
  purchasedAt,
}: FulfillOrderInput): Promise<void> {
  const writeClient = getSanityWriteClient();
  if (!writeClient) return;

  await writeClient
    .patch(orderId)
    .set({
      status: "paid",
      code,
      purchasedAt,
    })
    .commit();
}

export async function markGiftVoucherEmailsSent(orderId: string): Promise<void> {
  const writeClient = getSanityWriteClient();
  if (!writeClient) return;

  await writeClient
    .patch(orderId)
    .set({ emailsSentAt: new Date().toISOString() })
    .commit();
}

interface GiftVoucherOrderRecord {
  _id: string;
  status: string;
  code?: string;
  emailsSentAt?: string;
  recipientEmail?: string;
  recipientName?: string;
  senderEmail?: string;
  senderName?: string;
  personalMessage?: string;
  procedureTitle?: string;
  amount?: number;
  currency?: string;
  locale?: string;
}

export async function fetchGiftVoucherOrderBySession(
  sessionId: string,
): Promise<GiftVoucherOrderRecord | null> {
  const client = getSanityClient();
  if (!client) return null;

  return client.fetch<GiftVoucherOrderRecord | null>(
    `*[_type == "giftVoucherOrder" && stripeSessionId == $sessionId][0] {
      _id,
      status,
      code,
      emailsSentAt,
      recipientEmail,
      recipientName,
      senderEmail,
      senderName,
      personalMessage,
      procedureTitle,
      amount,
      currency,
      locale
    }`,
    { sessionId },
  );
}

export async function fetchGiftVoucherOrderById(
  orderId: string,
): Promise<GiftVoucherOrderRecord | null> {
  const client = getSanityClient();
  if (!client) return null;

  return client.fetch<GiftVoucherOrderRecord | null>(
    `*[_type == "giftVoucherOrder" && _id == $id][0] {
      _id,
      status,
      code,
      emailsSentAt,
      recipientEmail,
      recipientName,
      senderEmail,
      senderName,
      personalMessage,
      procedureTitle,
      amount,
      currency,
      locale
    }`,
    { id: orderId },
  );
}

export type { GiftVoucherOrderRecord };
