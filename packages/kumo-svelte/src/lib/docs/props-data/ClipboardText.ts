import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'masked', type: 'boolean', required: false, default: 'false', description: 'Hides the display behind eight bullets until revealed; copying retains the original value.' },
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
    "type": "{ copyAction?: string; revealAction?: string; hideAction?: string; }",
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
