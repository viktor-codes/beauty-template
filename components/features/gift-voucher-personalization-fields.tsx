"use client";

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

export interface GiftVoucherPersonalizationFieldsProps {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  personalMessage: string;
  onRecipientNameChange: (value: string) => void;
  onRecipientEmailChange: (value: string) => void;
  onSenderNameChange: (value: string) => void;
  onSenderEmailChange: (value: string) => void;
  onPersonalMessageChange: (value: string) => void;
  labels: {
    title: string;
    recipientName: string;
    recipientEmail: string;
    senderName: string;
    senderEmail: string;
    personalMessage: string;
    personalMessagePlaceholder: string;
  };
  errors: {
    recipientName?: string;
    recipientEmail?: string;
    senderName?: string;
    senderEmail?: string;
  };
}

export function GiftVoucherPersonalizationFields({
  recipientName,
  recipientEmail,
  senderName,
  senderEmail,
  personalMessage,
  onRecipientNameChange,
  onRecipientEmailChange,
  onSenderNameChange,
  onSenderEmailChange,
  onPersonalMessageChange,
  labels,
  errors,
}: GiftVoucherPersonalizationFieldsProps) {
  return (
    <section aria-labelledby="gift-voucher-personalization-heading">
      <h2
        id="gift-voucher-personalization-heading"
        className="font-heading text-xl text-primary"
      >
        {labels.title}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className="mb-2 block text-sm text-muted">{labels.recipientName}</span>
          <input
            type="text"
            value={recipientName}
            onChange={(event) => onRecipientNameChange(event.target.value)}
            className={fieldClass}
            autoComplete="name"
          />
          {errors.recipientName ? (
            <span className="mt-1 block text-sm text-red-700">{errors.recipientName}</span>
          ) : null}
        </label>

        <label className="block sm:col-span-1">
          <span className="mb-2 block text-sm text-muted">{labels.recipientEmail}</span>
          <input
            type="email"
            value={recipientEmail}
            onChange={(event) => onRecipientEmailChange(event.target.value)}
            className={fieldClass}
            autoComplete="email"
          />
          {errors.recipientEmail ? (
            <span className="mt-1 block text-sm text-red-700">{errors.recipientEmail}</span>
          ) : null}
        </label>

        <label className="block sm:col-span-1">
          <span className="mb-2 block text-sm text-muted">{labels.senderName}</span>
          <input
            type="text"
            value={senderName}
            onChange={(event) => onSenderNameChange(event.target.value)}
            className={fieldClass}
            autoComplete="name"
          />
          {errors.senderName ? (
            <span className="mt-1 block text-sm text-red-700">{errors.senderName}</span>
          ) : null}
        </label>

        <label className="block sm:col-span-1">
          <span className="mb-2 block text-sm text-muted">{labels.senderEmail}</span>
          <input
            type="email"
            value={senderEmail}
            onChange={(event) => onSenderEmailChange(event.target.value)}
            className={fieldClass}
            autoComplete="email"
          />
          {errors.senderEmail ? (
            <span className="mt-1 block text-sm text-red-700">{errors.senderEmail}</span>
          ) : null}
        </label>

        <label className="block sm:col-span-2">
          <span className="mb-2 block text-sm text-muted">{labels.personalMessage}</span>
          <textarea
            value={personalMessage}
            onChange={(event) => onPersonalMessageChange(event.target.value)}
            className={`${fieldClass} min-h-28 resize-y`}
            placeholder={labels.personalMessagePlaceholder}
            maxLength={500}
          />
        </label>
      </div>
    </section>
  );
}
