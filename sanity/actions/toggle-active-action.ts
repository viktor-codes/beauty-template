import { useCallback, useState } from "react";
import type { DocumentActionComponent } from "sanity";
import { useDocumentOperation } from "sanity";

const TOGGLE_ACTIVE_TYPES = new Set([
  "serviceCategory",
  "serviceSubcategory",
  "serviceProcedure",
]);

export function isToggleActiveType(schemaType: string): boolean {
  return TOGGLE_ACTIVE_TYPES.has(schemaType);
}

export const toggleActiveAction: DocumentActionComponent = (props) => {
  const { id, type, draft, published, onComplete } = props;
  const { patch, publish } = useDocumentOperation(id, type);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const doc = draft ?? published;
  const isActive = doc?.isActive !== false;
  const isCategory = type === "serviceCategory";

  const applyToggle = useCallback(() => {
    patch.execute([{ set: { isActive: !isActive } }]);

    if (published && !publish.disabled) {
      publish.execute();
    }

    onComplete();
  }, [isActive, onComplete, patch, publish, published]);

  if (!isToggleActiveType(type)) {
    return null;
  }

  return {
    label: isActive ? "Hide on website" : "Show on website",
    tone: isActive ? "caution" : "positive",
    onHandle: () => {
      if (isActive && isCategory) {
        setConfirmOpen(true);
        return;
      }

      applyToggle();
    },
    dialog:
      isConfirmOpen &&
      ({
        type: "confirm",
        tone: "critical",
        message: isCategory
          ? "Hide this entire category on the website? All subcategories and procedures under it will disappear from public pages. The content stays in Studio."
          : "Hide this item on the website?",
        onConfirm: () => {
          setConfirmOpen(false);
          applyToggle();
        },
        onCancel: () => setConfirmOpen(false),
      } as const),
  };
};
