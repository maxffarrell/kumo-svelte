import type { PropRow } from "../prop-types";

const rows: PropRow[] = [
  {
    prop: "mode",
    type: "DatePickerMode",
    required: false,
    default: '"single"',
    description: "mode prop.",
  },
  {
    prop: "selected",
    type: "DatePickerSelection",
    required: false,
    description: "selected prop.",
  },
  {
    prop: "onChange",
    type: "(selection: DatePickerSelection) => void",
    required: false,
    description: "onChange prop.",
  },
  {
    prop: "month",
    type: "Date",
    required: false,
    description: "month prop.",
  },
  {
    prop: "onMonthChange",
    type: "(month: Date) => void",
    required: false,
    description: "onMonthChange prop.",
  },
  {
    prop: "numberOfMonths",
    type: "number",
    required: false,
    default: "1",
    description: "numberOfMonths prop.",
  },
  {
    prop: "min",
    type: "number",
    required: false,
    description: "Minimum value.",
  },
  {
    prop: "max",
    type: "number",
    required: false,
    description: "Maximum value.",
  },
  {
    prop: "disabled",
    type: "boolean | DisabledMatcher",
    required: false,
    default: "false",
    description: "Disables the component.",
  },
  {
    prop: "footer",
    type: "Snippet | string",
    required: false,
    description: "footer prop.",
  },
  {
    prop: "fixedWeeks",
    type: "boolean",
    required: false,
    default: "true",
    description: "fixedWeeks prop.",
  },
  {
    prop: "locale",
    type: "string",
    required: false,
    default: '"en-US"',
    description: "locale prop.",
  },
  {
    prop: "class",
    type: "string",
    required: false,
    description: "Additional classes merged onto the root element.",
  },
  {
    prop: "className",
    type: "string",
    required: false,
    description: "Additional classes merged onto the root element.",
  },
  {
    prop: "classNames",
    type: "Record<string, string | undefined>",
    required: false,
    description: "classNames prop.",
  },
  {
    prop: "showOutsideDays",
    type: "boolean",
    description:
      "Show outside-month dates; defaults to false when multiple months are visible.",
  },
];

export default rows;
