import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "size",
    "type": "'sm' | 'base' | 'lg'",
    "required": false,
    "description": "Size preset.",
    "default": "\"lg\""
  },
  {
    "prop": "text",
    "type": "string",
    "required": true,
    "description": "Text to display and copy to the clipboard."
  },
  {
    "prop": "textToCopy",
    "type": "string",
    "required": false,
    "description": "Alternate text copied to the clipboard."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "tooltip",
    "type": "{ text?: string; copiedText?: string; side?: TooltipSide; }",
    "required": false,
    "description": "Tooltip content."
  },
  {
    "prop": "labels",
    "type": "{ copyAction?: string; }",
    "required": false,
    "description": "Accessible labels for internationalization."
  },
  {
    "prop": "onCopy",
    "type": "() => void",
    "required": false,
    "description": "Called after copying succeeds."
  }
];

export default rows;
