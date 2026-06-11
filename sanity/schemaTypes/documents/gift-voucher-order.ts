import { defineField, defineType } from "sanity";

const ORDER_STATUS_OPTIONS = [
  { title: "Pending payment", value: "pending" },
  { title: "Paid", value: "paid" },
  { title: "Redeemed", value: "redeemed" },
  { title: "Cancelled", value: "cancelled" },
] as const;

/**
 * Created by checkout API (pending) and completed by Stripe webhook (paid).
 * Managed in Studio for redemption tracking.
 */
export const giftVoucherOrder = defineType({
  name: "giftVoucherOrder",
  title: "Gift voucher order",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: [...ORDER_STATUS_OPTIONS], layout: "radio" },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "code",
      title: "Voucher code",
      type: "string",
      description: "Generated after successful payment (e.g. SKIN-A7K2).",
      readOnly: true,
    }),
    defineField({
      name: "stripeSessionId",
      title: "Stripe Checkout session ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "procedure",
      title: "Procedure",
      type: "reference",
      to: [{ type: "serviceProcedure" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "procedureSlug",
      title: "Procedure slug (snapshot)",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "procedureTitle",
      title: "Procedure title (snapshot)",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      readOnly: true,
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "EUR",
      readOnly: true,
    }),
    defineField({
      name: "locale",
      title: "Purchase locale",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "recipientName",
      title: "Recipient name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "recipientEmail",
      title: "Recipient email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "senderName",
      title: "Sender name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "senderEmail",
      title: "Sender email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "personalMessage",
      title: "Personal message",
      type: "text",
      rows: 4,
      readOnly: true,
    }),
    defineField({
      name: "purchasedAt",
      title: "Paid at",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "redeemedAt",
      title: "Redeemed at",
      type: "datetime",
    }),
    defineField({
      name: "emailsSentAt",
      title: "Emails sent at",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      code: "code",
      recipient: "recipientName",
      procedure: "procedureTitle",
      status: "status",
    },
    prepare: ({ code, recipient, procedure, status }) => ({
      title: code ? `${code} — ${recipient ?? "Recipient"}` : `${recipient ?? "Pending"} — ${procedure ?? "Procedure"}`,
      subtitle: status ?? "pending",
    }),
  },
  orderings: [
    {
      title: "Paid date, newest",
      name: "purchasedAtDesc",
      by: [{ field: "purchasedAt", direction: "desc" }],
    },
  ],
});
