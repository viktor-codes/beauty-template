import { SITE_BRAND, SITE_NAME_FULL } from "@/lib/site-metadata";
import { toAbsoluteUrl } from "@/lib/site-url";

interface GiftVoucherEmailContent {
  code: string;
  procedureTitle: string;
  amount: number;
  currency: string;
  recipientName: string;
  senderName: string;
  personalMessage?: string;
  validityMonths: number;
  contactHref: string;
}

function formatAmount(amount: number, currency: string): string {
  return `${amount} ${currency}`;
}

function buildEmailHtml(content: GiftVoucherEmailContent, isRecipient: boolean): string {
  const greeting = isRecipient
    ? `Dear ${content.recipientName},`
    : `Dear ${content.senderName},`;

  const intro = isRecipient
    ? `${content.senderName} has gifted you a treatment at ${SITE_NAME_FULL}.`
    : `Thank you for your purchase. Here is a copy of the gift voucher for ${content.recipientName}.`;

  const messageBlock = content.personalMessage
    ? `<p style="margin:24px 0;padding:16px 20px;border-left:3px solid #C4956A;background:#F0EDE8;color:#2C2C2C;font-style:italic;">${escapeHtml(content.personalMessage)}</p>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#FAFAF8;font-family:Montserrat,Arial,sans-serif;color:#2C2C2C;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FAFAF8;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#FFFFFF;border:1px solid #E5E0D8;border-radius:24px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 16px;">
                <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#8A8A8A;">${SITE_BRAND}</p>
                <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:400;">Gift voucher</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 32px;">
                <p style="margin:0 0 16px;line-height:1.6;">${greeting}</p>
                <p style="margin:0 0 24px;line-height:1.6;">${intro}</p>
                ${messageBlock}
                <div style="margin:0 0 24px;padding:24px;border:1px solid #E5E0D8;border-radius:20px;background:#F0EDE8;">
                  <p style="margin:0 0 8px;font-size:14px;color:#8A8A8A;">Treatment</p>
                  <p style="margin:0 0 16px;font-size:20px;font-family:'Playfair Display',Georgia,serif;">${escapeHtml(content.procedureTitle)}</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#8A8A8A;">Value</p>
                  <p style="margin:0 0 16px;font-size:18px;">${formatAmount(content.amount, content.currency)}</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#8A8A8A;">Voucher code</p>
                  <p style="margin:0;font-size:24px;letter-spacing:0.12em;font-weight:600;">${escapeHtml(content.code)}</p>
                </div>
                <p style="margin:0 0 16px;line-height:1.6;font-size:14px;color:#8A8A8A;">
                  Valid for ${content.validityMonths} months from purchase. Present this code when booking your appointment.
                </p>
                <p style="margin:0;line-height:1.6;">
                  <a href="${content.contactHref}" style="color:#2C2C2C;font-weight:600;">Book a consultation</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export interface SendGiftVoucherEmailsInput extends GiftVoucherEmailContent {
  recipientEmail: string;
  senderEmail: string;
}

export function buildGiftVoucherEmailBodies(content: SendGiftVoucherEmailsInput): {
  recipientSubject: string;
  recipientHtml: string;
  senderSubject: string;
  senderHtml: string;
} {
  const contactHref = toAbsoluteUrl(content.contactHref);

  const emailContent: GiftVoucherEmailContent = {
    ...content,
    contactHref,
  };

  return {
    recipientSubject: `Your ${SITE_BRAND} gift voucher — ${content.procedureTitle}`,
    recipientHtml: buildEmailHtml(emailContent, true),
    senderSubject: `Gift voucher sent to ${content.recipientName}`,
    senderHtml: buildEmailHtml(emailContent, false),
  };
}
