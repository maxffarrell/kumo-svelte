import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "code",
    "type": "string",
    "required": true,
    "description": "Code string to render."
  },
  {
    "prop": "lang",
    "type": "CodeHighlightedLang",
    "required": false,
    "default": "\"typescript\"",
    "description": "Code language."
  },
  {
    "prop": "highlightLines",
    "type": "number[]",
    "required": false,
    "default": "[]",
    "description": "One-indexed line numbers to emphasize."
  },
  {
    "prop": "showLineNumbers",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Displays line numbers."
  },
  {
    "prop": "showCopyButton",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Shows the copy button."
  },
  {
    "prop": "labels",
    "type": "{ copy?: string; copied?: string }",
    "required": false,
    "description": "Accessible copy button labels."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "style",
    "type": "string",
    "required": false,
    "description": "Inline style string."
  }
];

export default rows;
