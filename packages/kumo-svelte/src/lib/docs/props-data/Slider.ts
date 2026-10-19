import type { PropRow } from "../prop-types";
const rows: PropRow[] = [
  {
    prop: "value",
    type: "number | readonly number[]",
    description: "Bindable scalar or range value.",
  },
  {
    prop: "defaultValue",
    type: "number | readonly number[]",
    description: "Initial value.",
  },
  {
    prop: "label",
    type: "string | Snippet",
    description: "Visible label.",
  },
  {
    prop: "getAriaLabel",
    type: "(index: number) => string",
    description: "Accessible name for each thumb.",
  },
  {
    prop: "min",
    type: "number",
    description: "Minimum; defaults to 0.",
  },
  {
    prop: "max",
    type: "number",
    description: "Maximum; defaults to 100.",
  },
  {
    prop: "step",
    type: "number",
    description: "Step; defaults to 1.",
  },
  {
    prop: "size",
    type: "'sm' | 'base'",
    description: "Track size.",
  },
  {
    prop: "disabled",
    type: "boolean",
    description: "Disable interaction.",
  },
  {
    prop: "name",
    type: "string",
    description: "Hidden form input name.",
  },
  {
    prop: "format",
    type: "Intl.NumberFormatOptions",
    description: "Number format options.",
  },
  {
    prop: "locale",
    type: "string",
    description: "Number formatting locale.",
  },
  {
    prop: "onValueChange",
    type: "(value: number | number[]) => void",
    description: "Called while changing.",
  },
  {
    prop: "onValueCommitted",
    type: "(value: number | number[]) => void",
    description: "Called when committed.",
  },
];
export default rows;
