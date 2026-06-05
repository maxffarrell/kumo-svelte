import type { PropRow } from "../prop-types";

const rows: PropRow[] = [
  {
    prop: "defaultOpen",
    type: "boolean",
    default: "true",
    description: "Initial open state when uncontrolled.",
  },
  { prop: "open", type: "boolean", description: "Controlled open state." },
  {
    prop: "onOpenChange",
    type: "(open: boolean) => void",
    description: "Callback when open state changes.",
  },
  {
    prop: "variant",
    type: '"sidebar" | "floating" | "inset"',
    default: '"sidebar"',
    description: "Sidebar layout variant.",
  },
  {
    prop: "side",
    type: '"left" | "right"',
    default: '"left"',
    description: "Which side the sidebar is on.",
  },
  {
    prop: "collapsible",
    type: '"icon" | "offcanvas" | "none"',
    default: '"icon"',
    description: "Collapse behavior for the sidebar.",
  },
  {
    prop: "resizable",
    type: "boolean",
    default: "false",
    description: "Enable drag-to-resize on the sidebar edge.",
  },
  {
    prop: "defaultWidth",
    type: "number",
    default: "256",
    description: "Initial width in pixels when resizable.",
  },
  {
    prop: "minWidth",
    type: "number",
    default: "200",
    description: "Minimum width in pixels when resizing.",
  },
  {
    prop: "maxWidth",
    type: "number",
    default: "480",
    description: "Maximum width in pixels when resizing.",
  },
  {
    prop: "onWidthChange",
    type: "(width: number) => void",
    description: "Callback when width changes during resize.",
  },
  {
    prop: "contained",
    type: "boolean",
    default: "false",
    description:
      "Keeps the provider scoped to its parent container instead of using full viewport height.",
  },
  {
    prop: "peekable",
    type: "boolean",
    default: "false",
    description:
      "Allows collapsed sidebars to temporarily reveal full content while hovered or focused.",
  },
  {
    prop: "animationDuration",
    type: "number",
    default: "250",
    description:
      "Transition duration in milliseconds for width and peek animations.",
  },
  {
    prop: "mobileBreakpoint",
    type: "number",
    default: "768",
    description:
      "Viewport width below which the sidebar renders as a mobile navigation drawer.",
  },
  {
    prop: "children",
    type: "Snippet",
    required: true,
    description: "Content, typically Sidebar plus main content.",
  },
  {
    prop: "class",
    type: "string",
    description: "Additional classes for the wrapper div.",
  },
];

export default rows;
