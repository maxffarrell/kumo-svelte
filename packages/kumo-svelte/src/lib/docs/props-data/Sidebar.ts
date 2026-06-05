import type { PropRow } from "../prop-types";

const rows: PropRow[] = [
  {
    prop: "variant",
    type: '"sidebar" | "floating" | "inset"',
    default: '"sidebar"',
    required: false,
    description: "Sidebar layout variant inherited from Provider.",
  },
  {
    prop: "side",
    type: '"left" | "right"',
    default: '"left"',
    required: false,
    description: "Side of the viewport or layout where the sidebar renders.",
  },
  {
    prop: "collapsible",
    type: '"icon" | "offcanvas" | "none"',
    default: '"icon"',
    required: false,
    description: "Collapse behavior inherited from Provider.",
  },
  {
    prop: "children",
    type: "Snippet",
    required: true,
    description:
      "Sidebar content — Header, Content, Footer, groups, menus, and related slots.",
  },
  {
    prop: "contentClass",
    type: "string",
    required: false,
    description: "Additional classes for the desktop content container.",
  },
  {
    prop: "class",
    type: "string",
    required: false,
    description: "Additional classes for the sidebar element.",
  },
];

export default rows;
