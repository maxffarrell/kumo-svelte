import type { PropRow } from "../prop-types";

const rows: PropRow[] = [
  {
    prop: "trigger",
    type: "Snippet",
    required: false,
    description: "trigger prop.",
  },
  {
    prop: "children",
    type: "Snippet",
    required: false,
    description: "Child snippet rendered by the component.",
  },
  {
    prop: "class",
    type: "string",
    required: false,
    description: "Additional classes merged onto the root element.",
  },
  {
    prop: "open",
    type: "boolean",
    required: false,
    description: "Controlled open state.",
  },
  {
    prop: "defaultOpen",
    type: "boolean",
    required: false,
    default: "false",
    description: "Initial uncontrolled open state.",
  },
  {
    prop: "title",
    type: "string",
    required: false,
    description: "Title content.",
  },
  {
    prop: "disabled",
    type: "boolean",
    required: false,
    default: "false",
    description: "Disables the component.",
  },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    required: false,
    description: "Called when open state changes.",
  },
  {
    prop: "autoScrollOnOpen",
    type: "boolean",
    required: false,
    default: "false",
    description:
      "Scrolls newly expanded sidebar content into view after opening.",
  },
  {
    prop: "onOpenChangeComplete",
    type: "(open: boolean) => void",
    required: false,
    description: "Called after the open-state transition completes.",
  },
];

export default rows;
