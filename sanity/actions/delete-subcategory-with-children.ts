import { useCallback, useState } from "react";
import type { DocumentActionComponent } from "sanity";
import { useClient } from "sanity";

interface ProcedureListing {
  _key?: string;
  subcategory?: { _ref?: string };
  sortOrder?: number;
}

interface ReferencedProcedure {
  _id: string;
  title?: { en?: string };
  listedIn?: ProcedureListing[] | null;
}

export const deleteSubcategoryWithChildrenAction: DocumentActionComponent = (props) => {
  const { id, type, onComplete } = props;
  const client = useClient({ apiVersion: "2025-05-05" });
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [linkedProcedures, setLinkedProcedures] = useState<ReferencedProcedure[]>([]);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadChildren = useCallback(async () => {
    const procedures = await client.fetch<ReferencedProcedure[]>(
      `*[_type == "serviceProcedure" && references($id)]{ _id, title, listedIn }`,
      { id },
    );
    setLinkedProcedures(procedures);
    setDialogOpen(true);
  }, [client, id]);

  const deleteAll = useCallback(async () => {
    setIsDeleting(true);
    try {
      const transaction = client.transaction();

      for (const procedure of linkedProcedures) {
        const remainingListings = (procedure.listedIn ?? []).filter(
          (listing) => listing.subcategory?._ref !== id,
        );

        if (remainingListings.length === 0) {
          transaction.delete(procedure._id);
          continue;
        }

        transaction.patch(procedure._id, { set: { listedIn: remainingListings } });
      }

      transaction.delete(id);
      await transaction.commit();
      setDialogOpen(false);
      onComplete();
    } finally {
      setIsDeleting(false);
    }
  }, [client, id, linkedProcedures, onComplete]);

  if (type !== "serviceSubcategory") {
    return null;
  }

  const deleteCount = linkedProcedures.filter(
    (procedure) => (procedure.listedIn ?? []).filter((listing) => listing.subcategory?._ref !== id).length === 0,
  ).length;
  const unlinkCount = linkedProcedures.length - deleteCount;

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
          linkedProcedures.length > 0
            ? [
                `Remove this subcategory from ${linkedProcedures.length} procedure placement${linkedProcedures.length === 1 ? "" : "s"}.`,
                deleteCount > 0
                  ? `${deleteCount} procedure document${deleteCount === 1 ? "" : "s"} will be deleted entirely.`
                  : null,
                unlinkCount > 0
                  ? `${unlinkCount} procedure${unlinkCount === 1 ? "" : "s"} will stay in other subcategories.`
                  : null,
                "This cannot be undone. Prefer “Hide on website” to keep data.",
              ]
                .filter(Boolean)
                .join(" ")
            : "Delete this subcategory permanently? This cannot be undone.",
        onConfirm: () => {
          void deleteAll();
        },
        onCancel: () => setDialogOpen(false),
      } as const),
  };
};
