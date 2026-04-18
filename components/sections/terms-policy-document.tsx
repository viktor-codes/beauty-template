import { TermsPolicySectionsPrimary } from "@/components/sections/terms-policy-sections-primary";
import { TermsPolicySectionsSecondary } from "@/components/sections/terms-policy-sections-secondary";
import { cn } from "@/lib/cn";

export interface TermsPolicyDocumentProps {
  className?: string;
}

export function TermsPolicyDocument({ className }: TermsPolicyDocumentProps) {
  return (
    <div className={cn("space-y-10", className)}>
      <TermsPolicySectionsPrimary />
      <TermsPolicySectionsSecondary />
    </div>
  );
}
