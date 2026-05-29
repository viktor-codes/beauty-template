import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { StudioIcon } from "./components/studio-icon";
import { schemaTypes } from "./schemaTypes";
import { skinbarStudioTheme } from "./studio-theme";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "the-skinbar",
  title: "The Skinbar",
  icon: StudioIcon,
  theme: skinbarStudioTheme,
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "uk", title: "Ukrainian" },
        { id: "ru", title: "Russian" },
      ],
      // legalPage is excluded: two documents per locale (privacy + terms) are not mutual translations.
      schemaTypes: ["landingPage", "siteSettings"],
    }),
  ],
  schema: { types: schemaTypes },
});
