import { generateVoucherCode } from "@/lib/gift-voucher/generate-voucher-code";
import {
  fetchGiftVoucherOrderById,
  fulfillGiftVoucherOrder,
  markGiftVoucherEmailsSent,
  type GiftVoucherOrderRecord,
} from "@/lib/gift-voucher/order-repository";
import { fetchGiftVoucherSettings } from "@/lib/sanity/fetch/fetch-gift-voucher-settings";
import { sendGiftVoucherEmails } from "@/lib/resend/send-gift-voucher-emails";
import type { AppLocale } from "@/i18n/routing";

const FALLBACK_SETTINGS = {
  heroTitle: "",
  heroSubtitle: "",
  termsBlurb: "",
};

async function sendEmailsForOrder(order: GiftVoucherOrderRecord): Promise<boolean> {
  if (!order.code || !order.recipientEmail || !order.senderEmail) return false;
  if (!order.procedureTitle || order.amount == null || !order.currency) return false;

  const locale = (order.locale ?? "en") as AppLocale;
  const settings = await fetchGiftVoucherSettings(locale, FALLBACK_SETTINGS);

  return sendGiftVoucherEmails({
    code: order.code,
    procedureTitle: order.procedureTitle,
    amount: order.amount,
    currency: order.currency,
    recipientName: order.recipientName ?? "Guest",
    senderName: order.senderName ?? "Guest",
    personalMessage: order.personalMessage,
    validityMonths: settings.validityMonths,
    recipientEmail: order.recipientEmail,
    senderEmail: order.senderEmail,
    contactHref: "/#contact",
  });
}

/** Marks order paid, assigns code, sends voucher emails (idempotent). */
export async function completeGiftVoucherOrder(
  orderId: string,
): Promise<{ ok: boolean; reason?: string }> {
  const order = await fetchGiftVoucherOrderById(orderId);
  if (!order) return { ok: false, reason: "order_not_found" };

  if (order.status === "paid" && order.emailsSentAt) {
    return { ok: true };
  }

  const purchasedAt = new Date().toISOString();
  const code = order.code ?? generateVoucherCode();

  if (order.status !== "paid") {
    await fulfillGiftVoucherOrder({ orderId, code, purchasedAt });
  }

  const refreshed = await fetchGiftVoucherOrderById(orderId);
  if (!refreshed) return { ok: false, reason: "order_not_found" };

  if (!refreshed.emailsSentAt) {
    const sent = await sendEmailsForOrder({ ...refreshed, code: refreshed.code ?? code });
    if (!sent) return { ok: false, reason: "email_failed" };
    await markGiftVoucherEmailsSent(orderId);
  }

  return { ok: true };
}
