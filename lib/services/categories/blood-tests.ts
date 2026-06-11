import type { ServiceCategory } from "@/lib/types/services";

import { bloodTestsCategoryImage, proc } from "@/lib/services/helpers";

export const bloodTestsCategory: ServiceCategory = {
  id: "blood-tests",
  title: "Blood tests",
  description:
    "Laboratory blood panels for energy, fertility, hormones, nutrition, and general wellness—results guide personalised care.",
  image: bloodTestsCategoryImage,
  isFlatCategory: true,
  subcategories: [
    {
      id: "wellness-panels",
      title: "Wellness panels",
      description: "Comprehensive and targeted blood panels interpreted to support your treatment plan.",
      procedures: [
        proc(
          "tired-all-the-time",
          "Tired All The Time",
          "If persistent fatigue is affecting daily life, this panel helps uncover underlying causes. Includes: Full blood count, Kidney health, Nutritional health, Thyroid health, Bone health, Iron status, Diabetes health, Infection & inflammation.",
          199,
        ),
        proc(
          "basic-female-fertility",
          "Basic Female Fertility",
          "Key hormone levels for reproductive health assessment. Includes: Oestradiol, Follicle stimulating hormone, Luteinising hormone, Progesterone, Prolactin, Testosterone, Sex hormone binding globulin, Free androgen index. Optional add-on: AMH (no separate price).",
          99,
        ),
        proc(
          "comprehensive-female-fertility",
          "Comprehensive Female Fertility",
          "Extended fertility and wellness panel including ovarian reserve markers. Includes: AMH, Hormonal Health Panel, Thyroid Health, Nutritional Health, Full Blood Count, Iron Status, Liver Health, Diabetes Health, Stress, Heart Health, Kidney Health, Infection & Inflammation.",
          250,
        ),
        proc(
          "vitamins-minerals",
          "Vitamins & Minerals",
          "Assesses essential vitamin and mineral levels to identify deficiencies affecting energy and well-being. Includes: Albumin, Calcium (adjusted), Magnesium, Folic Acid, Vitamin B12, Zinc, Vitamin D, Iron, Ferritin, Total Iron Binding Capacity, Transferrin, Transferrin Saturation.",
          110,
        ),
        proc(
          "male-testosterone",
          "Male Testosterone",
          "Measures testosterone and related markers impacting mood, libido, and energy. Includes: Testosterone, Sex hormone binding globulin, Free androgen index, Free testosterone, Albumin.",
          69,
        ),
        proc(
          "wellness-man-women",
          "Wellness Man | Women",
          "General health overview to proactively manage well-being. Includes: Heart health, Diabetes health, Iron status, Kidney health, Metabolic syndrome, Nutritional health, Muscle and joint health, Infection & inflammation.",
          290,
        ),
      ],
    },
  ],
};
