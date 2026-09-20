import type { PropRow } from "../prop-types";

const rows: PropRow[] = [
  {
    prop: "value",
    type: "string[]",
    required: false,
    description: "Controlled tag values.",
  },
  {
    prop: "defaultValue",
    type: "string[]",
    required: false,
    default: "[]",
    description: "Initial uncontrolled tag values.",
  },
  {
    prop: "onValueChange",
    type: "(value: string[]) => void",
    required: false,
    description: "Called whenever the tag list changes.",
  },
  {
    prop: "validateValue",
    type: "(value: string, acceptedValues: string[]) => boolean",
    required: false,
    description: "Validates each candidate tag.",
  },
  {
    prop: "maxValues",
    type: "number",
    required: false,
    description: "Maximum accepted tag count.",
  },
  {
    prop: "labels",
    type: "TagInputLabels",
    required: false,
    description: "Localized generated labels and validation messages.",
  },
  {
    prop: "label",
    type: "string | Snippet",
    required: false,
    description: "Visible label content.",
  },
  {
    prop: "description",
    type: "string | Snippet",
    required: false,
    description: "Supporting description text.",
  },
  {
    prop: "error",
    type: "TagInputError",
    required: false,
    description: "Validation error content.",
  },
  {
    prop: "disabled",
    type: "boolean",
    required: false,
    default: "false",
    description: "Disables entry and tag removal.",
  },
];

export default rows;
