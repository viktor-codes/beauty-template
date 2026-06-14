import type { Template } from "sanity";

export const subcategoryInCategoryTemplate: Template = {
  id: "subcategory-in-category",
  title: "Subcategory in category",
  schemaType: "serviceSubcategory",
  parameters: [{ name: "categoryId", type: "string" }],
  value: ({ categoryId }: { categoryId: string }) => ({
    category: { _type: "reference", _ref: categoryId },
  }),
};

export const procedureInSubcategoryTemplate: Template = {
  id: "procedure-in-subcategory",
  title: "Procedure in subcategory",
  schemaType: "serviceProcedure",
  parameters: [{ name: "subcategoryId", type: "string" }],
  value: ({ subcategoryId }: { subcategoryId: string }) => ({
    listedIn: [
      {
        _key: subcategoryId,
        subcategory: { _type: "reference", _ref: subcategoryId },
        sortOrder: 0,
      },
    ],
  }),
};

export const catalogTemplates = [subcategoryInCategoryTemplate, procedureInSubcategoryTemplate];
