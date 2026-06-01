"use client";

import { Box, Tab, TabList, TabPanel, TextArea, TextInput } from "@sanity/ui";
import { useCallback, useState } from "react";
import { ObjectInputProps, set, unset } from "sanity";

const TABS = [
  { id: "en", title: "EN" },
  { id: "uk", title: "UK" },
  { id: "ru", title: "RU" },
] as const;

type LocaleKey = (typeof TABS)[number]["id"];

/**
 * Tabbed EN | UK | RU editor for `localeString` / `localeText` objects.
 */
export function LocaleTabsInput(props: ObjectInputProps) {
  const { value, onChange, schemaType } = props;
  const [activeTab, setActiveTab] = useState<LocaleKey>("en");
  const isText = schemaType.name === "localeText";
  const fields = (value ?? {}) as Record<string, string | undefined>;

  const handleChange = useCallback(
    (locale: LocaleKey, nextValue: string) => {
      const trimmed = nextValue.trim();

      if (locale === "en") {
        onChange(set(trimmed, ["en"]));
        return;
      }

      if (!trimmed) {
        onChange(unset([locale]));
        return;
      }

      onChange(set(nextValue, [locale]));
    },
    [onChange],
  );

  return (
    <Box paddingTop={2}>
      <TabList space={2}>
        {TABS.map((tab) => (
          <Tab
            key={tab.id}
            aria-controls={`locale-panel-${tab.id}`}
            id={`locale-tab-${tab.id}`}
            label={tab.title}
            onClick={() => setActiveTab(tab.id)}
            selected={activeTab === tab.id}
          />
        ))}
      </TabList>
      {TABS.map((tab) => (
        <TabPanel
          key={tab.id}
          aria-labelledby={`locale-tab-${tab.id}`}
          hidden={activeTab !== tab.id}
          id={`locale-panel-${tab.id}`}
          paddingTop={3}
        >
          {isText ? (
            <TextArea
              value={fields[tab.id] ?? ""}
              onChange={(event) => handleChange(tab.id, event.currentTarget.value)}
              rows={4}
            />
          ) : (
            <TextInput
              value={fields[tab.id] ?? ""}
              onChange={(event) => handleChange(tab.id, event.currentTarget.value)}
            />
          )}
        </TabPanel>
      ))}
    </Box>
  );
}
