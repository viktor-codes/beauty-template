import { useCallback, useState } from "react";
import type { DocumentActionComponent } from "sanity";
import { useClient } from "sanity";

interface ReferencedProcedure {
  _id: string;
  title?: { en?: string };
}

export const deleteSubcategoryWithChildrenAction: DocumentActionComponent = (props) => {
  const { id, type, onComplete } = props;
  const client = useClient({ apiVersion: "2025-05-05" });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [childCount, setChildCount] = useState(0);
  const [childIds, setChildIds] = useState<string[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadChildren = useCallback(async () => {
    const procedures = await client.fetch<ReferencedProcedure[]>(
      `*[_type == "serviceProcedure" && references($id)]{ _id, title }`,
      { id },
    );
    setChildIds(procedures.map((doc) => doc._id));
    setChildCount(procedures.length);
    setDialogOpen(true);
  }, [client, id]);

  const deleteAll = useCallback(async () => {
    setIsDeleting(true);
    try {
      const transaction = client.transaction();
      for (const childId of childIds) {
        transaction.delete(childId);
      }
      transaction.delete(id);
      await transaction.commit();
      setDialogOpen(false);
      onComplete();
    } finally {
      setIsDeleting(false);
    }
  }, [childIds, client, id, onComplete]);

  if (type !== "serviceSubcategory") {
    return null;
  }

  return {
    label: isDeleting ? "Deleting…" : "Delete with procedures",
    tone: "critical",
    disabled: isDeleting,
    onHandle: () => {
      void loadChildren();
    },
    dialog:
      isDialogOpen &&
      ({
        type: "confirm",
        tone: "critical",
        message:
          childCount > 0
            ? `Delete this subcategory and ${childCount} linked procedure${childCount === 1 ? "" : "s"} permanently? This cannot be undone. Prefer “Hide on website” to keep data.`
            : "Delete this subcategory permanently? This cannot be undone.",
        onConfirm: () => {
          void deleteAll();
        },
        onCancel: () => setDialogOpen(false),
      } as const),
  };
};
