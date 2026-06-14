"use client";

import { Button, Checkbox, Flex, Stack, Text, TextInput } from "@sanity/ui";
import { useMemo, useState } from "react";
import type { StringInputProps } from "sanity";
import { useFormValue } from "sanity";

import { useSubcategoryProcedureLinks } from "../hooks/use-subcategory-procedure-links";
import { filterProcedureOptions } from "../lib/subcategory-procedure-links";

function resolveDocumentId(rawId: unknown): string | undefined {
  if (typeof rawId !== "string" || rawId.length === 0) return undefined;
  return rawId.replace(/^drafts\./, "");
}

export function SubcategoryProcedureLinksInput(_props: StringInputProps) {
  const documentId = resolveDocumentId(useFormValue(["_id"]));
  const [searchQuery, setSearchQuery] = useState("");
  const { options, selectedIds, isLoading, isSaving, isDirty, error, toggleProcedure, save } =
    useSubcategoryProcedureLinks(documentId);

  const visibleOptions = useMemo(
    () => filterProcedureOptions(options, searchQuery),
    [options, searchQuery],
  );

  if (!documentId) {
    return (
      <Text muted size={1}>
        Save this subcategory first, then link procedures here.
      </Text>
    );
  }

  if (isLoading) {
    return (
      <Text muted size={1}>
        Loading procedures…
      </Text>
    );
  }

  return (
    <Stack space={3}>
      <Text size={1} muted>
        Links are stored on each procedure (`Catalog placements`). Changes apply after you publish
        affected procedures.
      </Text>
      <TextInput
        placeholder="Search procedures…"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.currentTarget.value)}
      />
      <Stack space={2}>
        {visibleOptions.map((option) => {
          const isChecked = selectedIds.includes(option._id);
          const label = option.primarySubcategory
            ? `${option.title} · ${option.primarySubcategory}`
            : option.title;

          return (
            <Flex key={option._id} align="center" gap={3}>
              <Checkbox
                checked={isChecked}
                id={`subcategory-link-${option._id}`}
                onChange={() => toggleProcedure(option._id)}
              />
              <Text as="label" htmlFor={`subcategory-link-${option._id}`} size={1}>
                {label}
              </Text>
            </Flex>
          );
        })}
        {visibleOptions.length === 0 ? (
          <Text muted size={1}>
            No procedures match your search.
          </Text>
        ) : null}
      </Stack>
      {error ? (
        <Text size={1} style={{ color: "var(--card-badge-critical-fg-color)" }}>
          {error}
        </Text>
      ) : null}
      <Flex>
        <Button
          text={isSaving ? "Saving…" : "Save procedure links"}
          tone="primary"
          disabled={!isDirty || isSaving}
          onClick={() => void save()}
        />
      </Flex>
    </Stack>
  );
}
