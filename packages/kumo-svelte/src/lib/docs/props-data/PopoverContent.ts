import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "side",
    "type": "'top' | 'right' | 'bottom' | 'left'",
    "required": false,
    "default": "\"bottom\"",
    "description": "Preferred side of the trigger."
  },
  {
    "prop": "anchor",
    "type": "HTMLElement | { getBoundingClientRect: () => DOMRect } | null",
    "required": false,
    "description": "Element or virtual element to position the popover against."
  },
  {
    "prop": "align",
    "type": "'start' | 'center' | 'end'",
    "required": false,
    "default": "\"center\"",
    "description": "Alignment relative to the anchor."
  },
  {
    "prop": "sideOffset",
    "type": "number",
    "required": false,
    "default": "0",
    "description": "Distance from the anchor side."
  },
  {
    "prop": "alignOffset",
    "type": "number",
    "required": false,
    "default": "0",
    "description": "Offset along the alignment axis."
  },
  {
    "prop": "positionMethod",
    "type": "'absolute' | 'fixed'",
    "required": false,
    "default": "\"absolute\"",
    "description": "CSS positioning strategy."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the content."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Popover content."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "default": "document.body",
    "description": "Portal container for custom roots or Shadow DOM."
  }
];

export default rows;
