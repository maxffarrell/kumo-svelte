import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "open",
    "type": "boolean",
    "required": false,
    "description": "Controlled open state."
  },
  {
    "prop": "defaultOpen",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Initial uncontrolled open state."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "required": false,
    "description": "Called when open state changes."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "onOpenChangeComplete",
    "type": "(open: boolean) => void",
    "required": false,
    "description": "Called after the open-state transition completes."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
