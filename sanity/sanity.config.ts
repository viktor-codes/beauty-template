import { documentInternationalization } from "@sanity/document-internationalization";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";

export default defineConfig({
  name: "skinbar",
  title: "Skinbar",
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
      schemaTypes: ["landingPage", "siteSettings"],
    }),
  ],
  schema: { types: schemaTypes },
});
