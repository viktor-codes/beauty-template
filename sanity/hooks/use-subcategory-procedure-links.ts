import { useCallback, useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";

import {
  appendSubcategoryListing,
  computeLinkDiff,
  type ProcedureCatalogListing,
  type ProcedureOption,
  removeSubcategoryListing,
  resolveNextSortOrder,
} from "../lib/subcategory-procedure-links";

const API_VERSION = "2025-05-05";

const ALL_PROCEDURES_QUERY = /* groq */ `
  *[_type == "serviceProcedure" && isActive != false]
    | order(title.en asc) {
      _id,
      "title": title.en,
      "primarySubcategory": listedIn[0].subcategory->title.en
    }
`;

const LINKED_PROCEDURE_IDS_QUERY = /* groq */ `
  *[_type == "serviceProcedure" && references($subcategoryId) && isActive != false]._id
`;

interface ProcedureDocumentLike {
  _id: string;
  listedIn?: ProcedureCatalogListing[] | null;
}

export function useSubcategoryProcedureLinks(subcategoryDocumentId: string | undefined) {
  const client = useClient({ apiVersion: API_VERSION });
  const [options, setOptions] = useState<ProcedureOption[]>([]);
  const [linkedIds, setLinkedIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isDirty = useMemo(() => {
    if (selectedIds.length !== linkedIds.length) return true;
    const linked = new Set(linkedIds);
    return selectedIds.some((id) => !linked.has(id));
  }, [linkedIds, selectedIds]);

  const load = useCallback(async () => {
    if (!subcategoryDocumentId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [allProcedures, linkedProcedureIds] = await Promise.all([
        client.fetch<ProcedureOption[]>(ALL_PROCEDURES_QUERY),
        client.fetch<string[]>(LINKED_PROCEDURE_IDS_QUERY, { subcategoryId: subcategoryDocumentId }),
      ]);

      setOptions(allProcedures);
      setLinkedIds(linkedProcedureIds);
      setSelectedIds(linkedProcedureIds);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load procedures");
    } finally {
      setIsLoading(false);
    }
  }, [client, subcategoryDocumentId]);

  useEffect(() => {
    void load();
  }, [load]);

  const toggleProcedure = useCallback((procedureId: string) => {
    setSelectedIds((current) =>
      current.includes(procedureId)
        ? current.filter((id) => id !== procedureId)
        : [...current, procedureId],
    );
  }, []);

  const save = useCallback(async () => {
    if (!subcategoryDocumentId || !isDirty) return;

    setIsSaving(true);
    setError(null);

    const { added, removed } = computeLinkDiff(linkedIds, selectedIds);

    try {
      const transaction = client.transaction();

      for (const procedureId of added) {
        const document = await client.fetch<ProcedureDocumentLike>(
          `*[_id == $id][0]{ _id, listedIn }`,
          { id: procedureId },
        );
        if (!document?._id) continue;

        const listedIn = appendSubcategoryListing(
          document.listedIn,
          subcategoryDocumentId,
          resolveNextSortOrder(document.listedIn),
        );
        transaction.patch(procedureId, { set: { listedIn } });
      }

      for (const procedureId of removed) {
        const document = await client.fetch<ProcedureDocumentLike>(
          `*[_id == $id][0]{ _id, listedIn }`,
          { id: procedureId },
        );
        if (!document?._id) continue;

        const listedIn = removeSubcategoryListing(document.listedIn, subcategoryDocumentId);
        if (listedIn.length === 0) {
          setError("Each procedure must stay in at least one subcategory. Add another placement first.");
          setIsSaving(false);
          return;
        }

        transaction.patch(procedureId, { set: { listedIn } });
      }

      await transaction.commit();
      setLinkedIds(selectedIds);
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Failed to save links");
    } finally {
      setIsSaving(false);
    }
  }, [client, isDirty, linkedIds, selectedIds, subcategoryDocumentId]);

  return {
    options,
    selectedIds,
    isLoading,
    isSaving,
    isDirty,
    error,
    toggleProcedure,
    save,
    reload: load,
  };
}
