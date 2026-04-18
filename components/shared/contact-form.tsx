"use client";

import { type ComponentPropsWithoutRef, type FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import {
  ContactFormSchema,
  type ContactFormValues,
} from "@/lib/schemas/contact-form";

export type ContactFormProps = Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;

const fieldClass =
  "w-full rounded-xl border border-border bg-background px-4 py-4 text-sm text-primary placeholder:text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent";

type FieldErrors = Partial<Record<keyof ContactFormValues, string>>;

function readFormPayload(form: HTMLFormElement): ContactFormValues {
  const fd = new FormData(form);
  return {
    name: String(fd.get("name") ?? ""),
    email: String(fd.get("email") ?? ""),
    message: String(fd.get("message") ?? ""),
  };
}

function fieldErrorsFromIssues(
  issues: readonly { path: readonly PropertyKey[]; message: string }[],
): FieldErrors {
  const next: FieldErrors = {};
  for (const issue of issues) {
    const segment = issue.path[0];
    if (
      typeof segment === "string" &&
      (segment === "name" || segment === "email" || segment === "message")
    ) {
      if (!next[segment]) next[segment] = issue.message;
    }
  }
  return next;
}

export function ContactForm({ className, ...rest }: ContactFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = ContactFormSchema.safeParse(readFormPayload(form));
    if (!parsed.success) {
      setErrors(fieldErrorsFromIssues(parsed.error.issues));
      return;
    }
    setErrors({});
    form.reset();
  }

  return (
    <form
      className={cn("flex flex-col gap-4", className)}
      onSubmit={handleSubmit}
      noValidate
      {...rest}
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-sm font-medium text-primary">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Alex Morgan"
          className={cn(fieldClass, errors.name && "border-red-700/60 focus:border-red-700 focus:ring-red-700/40")}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className="text-sm text-red-700" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-sm font-medium text-primary">
          Email
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={cn(fieldClass, errors.email && "border-red-700/60 focus:border-red-700 focus:ring-red-700/40")}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
        />
        {errors.email ? (
          <p id="contact-email-error" className="text-sm text-red-700" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-sm font-medium text-primary">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="What would you like me to know?"
          className={cn(
            fieldClass,
            "resize-y min-h-[120px]",
            errors.message && "border-red-700/60 focus:border-red-700 focus:ring-red-700/40",
          )}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className="text-sm text-red-700" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>
      <Button type="submit" className="self-start">
        Send message
      </Button>
    </form>
  );
}
