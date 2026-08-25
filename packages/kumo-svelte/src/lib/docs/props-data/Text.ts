import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "variant",
    "type": "'heading' | 'heading1' | 'heading2' | 'heading3' | 'body' | 'secondary' | 'mono' | 'mono-secondary' | 'success' | 'error'",
    "required": false,
    "description": "Visual variant. Numbered heading variants are deprecated; use heading with size and as.",
    "default": "\"body\""
  },
  {
    "prop": "size",
    "type": "'xs' | 'sm' | 'base' | 'lg'",
    "required": false,
    "description": "Size preset. Heading accepts lg for a 20px heading; its default is 16px.",
    "default": "\"base\""
  },
  {
    "prop": "bold",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Whether to use medium font weight for copy variants."
  },
  {
    "prop": "truncate",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Truncates overflowing text with an ellipsis."
  },
  {
    "prop": "as",
    "type": "TextElement",
    "required": false,
    "description": "HTML element to render."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Text content."
  },
  {
    "prop": "DANGEROUS_className",
    "type": "string",
    "required": false,
    "description": "Escape hatch for additional classes."
  },
  {
    "prop": "DANGEROUS_style",
    "type": "string",
    "required": false,
    "description": "Escape hatch for inline styles."
  }
];

export default rows;
