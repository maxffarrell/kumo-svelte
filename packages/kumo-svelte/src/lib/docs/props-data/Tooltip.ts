import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "side",
    "type": "'top' | 'right' | 'bottom' | 'left'",
    "required": false,
    "description": "Preferred floating side.",
    "default": "\"top\""
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the tooltip popup."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "content",
    "type": "string | Snippet",
    "required": true,
    "description": "Content to display inside the tooltip popup."
  },
  {
    "prop": "trigger",
    "type": "Snippet<[Record<string, unknown>]>",
    "required": false,
    "description": "trigger prop."
  },
  {
    "prop": "open",
    "type": "boolean",
    "required": false,
    "description": "Controlled open state."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "required": false,
    "description": "Called when open state changes."
  },
  {
    "prop": "align",
    "type": "'start' | 'center' | 'end'",
    "required": false,
    "description": "Floating alignment."
  },
  {
    "prop": "delay",
    "type": "number",
    "required": false,
    "default": "600",
    "description": "How long to wait before opening the tooltip, in milliseconds."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "default": "document.body",
    "description": "Portal container for custom roots or Shadow DOM."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the component."
  }
];

export default rows;
