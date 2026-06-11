"use client";

import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { GiftVoucherPersonalizationFields } from "@/components/features/gift-voucher-personalization-fields";
import { GiftVoucherPreviewCard } from "@/components/features/gift-voucher-preview-card";
import { GiftVoucherProcedurePicker } from "@/components/features/gift-voucher-procedure-picker";
import { Button } from "@/components/ui/button";
import { findGiftableProcedure } from "@/lib/gift-voucher/build-giftable-procedures";
import type { AppLocale } from "@/i18n/routing";
import type { GiftableProcedure, GiftVoucherSettings } from "@/lib/types/gift-voucher";

interface FormErrors {
  procedureSlug?: string;
  recipientName?: string;
  recipientEmail?: string;
  senderName?: string;
  senderEmail?: string;
  submit?: string;
}

export interface GiftVoucherWizardProps {
  procedures: GiftableProcedure[];
  settings: GiftVoucherSettings;
}

export function GiftVoucherWizard({ procedures, settings }: GiftVoucherWizardProps) {
  const t = useTranslations("GiftVoucher");
  const locale = useLocale() as AppLocale;
  const searchParams = useSearchParams();
  const initialSlug = searchParams.get("procedure") ?? "";

  const [selectedSlug, setSelectedSlug] = useState(
    findGiftableProcedure(procedures, initialSlug)?.slug ?? "",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [personalMessage, setPersonalMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedProcedure = useMemo(
    () => findGiftableProcedure(procedures, selectedSlug),
    [procedures, selectedSlug],
  );

  function validateForm(): FormErrors {
    const next: FormErrors = {};
    if (!selectedSlug) next.procedureSlug = t("validation.procedureRequired");
    if (!recipientName.trim()) next.recipientName = t("validation.recipientNameRequired");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipientEmail.trim())) {
      next.recipientEmail = t("validation.recipientEmailInvalid");
    }
    if (!senderName.trim()) next.senderName = t("validation.senderNameRequired");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail.trim())) {
      next.senderEmail = t("validation.senderEmailInvalid");
    }
    return next;
  }

  async function handleSubmit() {
    const nextErrors = validateForm();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          locale,
          procedureSlug: selectedSlug,
          recipientName: recipientName.trim(),
          recipientEmail: recipientEmail.trim(),
          senderName: senderName.trim(),
          senderEmail: senderEmail.trim(),
          personalMessage: personalMessage.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { url?: string };
      if (!response.ok || !data.url) {
        setErrors({ submit: t("submitError") });
        return;
      }

      window.location.assign(data.url);
    } catch {
      setErrors({ submit: t("submitError") });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
      <div className="space-y-10">
        <GiftVoucherProcedurePicker
          procedures={procedures}
          selectedSlug={selectedSlug}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSelect={setSelectedSlug}
          labels={{
            title: t("procedureStepTitle"),
            searchPlaceholder: t("procedureSearchPlaceholder"),
            empty: t("procedureEmpty"),
          }}
          error={errors.procedureSlug}
        />

        <GiftVoucherPersonalizationFields
          recipientName={recipientName}
          recipientEmail={recipientEmail}
          senderName={senderName}
          senderEmail={senderEmail}
          personalMessage={personalMessage}
          onRecipientNameChange={setRecipientName}
          onRecipientEmailChange={setRecipientEmail}
          onSenderNameChange={setSenderName}
          onSenderEmailChange={setSenderEmail}
          onPersonalMessageChange={setPersonalMessage}
          labels={{
            title: t("personalizationTitle"),
            recipientName: t("recipientNameLabel"),
            recipientEmail: t("recipientEmailLabel"),
            senderName: t("senderNameLabel"),
            senderEmail: t("senderEmailLabel"),
            personalMessage: t("personalMessageLabel"),
            personalMessagePlaceholder: t("personalMessagePlaceholder"),
          }}
          errors={errors}
        />

        {settings.termsBlurb ? (
          <p className="text-sm leading-relaxed text-muted">{settings.termsBlurb}</p>
        ) : null}

        {errors.submit ? (
          <p className="text-sm text-red-700" role="alert">
            {errors.submit}
          </p>
        ) : null}

        <Button type="button" size="lg" isDisabled={isSubmitting} onClick={handleSubmit}>
          {isSubmitting ? t("submittingLabel") : t("submitLabel")}
        </Button>
      </div>

      <GiftVoucherPreviewCard
        procedure={selectedProcedure}
        recipientName={recipientName}
        senderName={senderName}
        personalMessage={personalMessage}
        labels={{
          eyebrow: t("previewEyebrow"),
          for: t("previewForLabel"),
          from: t("previewFromLabel"),
          procedure: t("previewProcedureLabel"),
          value: t("previewValueLabel"),
          codePlaceholder: t("previewCodePlaceholder"),
          validity: t("previewValidity", { months: settings.validityMonths }),
        }}
        className="lg:sticky lg:top-28"
      />
    </div>
  );
}
