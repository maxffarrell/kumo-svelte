import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the dialog content."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": true,
    "description": "Dialog content, typically title, description, close, and action buttons."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "default": "document.body",
    "description": "Portal container for custom roots or Shadow DOM."
  },
  {
    "prop": "size",
    "type": "'sm' | 'base' | 'lg' | 'xl'",
    "required": false,
    "default": "\"base\"",
    "description": "Fixed dialog width preset: sm (288px), base (384px), lg (512px), or xl (768px)."
  },
  {
    "prop": "style",
    "type": "string",
    "required": false,
    "description": "Inline styles for the dialog content."
  }
];

export default rows;
