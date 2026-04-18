import { PrivacyPolicySectionsPrimary } from "@/components/sections/privacy-policy-sections-primary";
import { PrivacyPolicySectionsSecondary } from "@/components/sections/privacy-policy-sections-secondary";
import { cn } from "@/lib/cn";

export interface PrivacyPolicyDocumentProps {
  email: string;
  phone: string;
  className?: string;
}

export function PrivacyPolicyDocument({
  email,
  phone,
  className,
}: PrivacyPolicyDocumentProps) {
  return (
    <div className={cn("space-y-10", className)}>
      <PrivacyPolicySectionsPrimary email={email} phone={phone} />
      <PrivacyPolicySectionsSecondary email={email} phone={phone} />
    </div>
  );
}
