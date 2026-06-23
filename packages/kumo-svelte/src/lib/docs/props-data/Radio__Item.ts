import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
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
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "variant",
    "type": "'default' | 'error'",
    "required": false,
    "default": "\"default\"",
    "description": "Visual variant."
  },
  {
    "prop": "appearance",
    "type": "'default' | 'card'",
    "required": false,
    "description": "Visual appearance preset."
  },
  {
    "prop": "label",
    "type": "string | Snippet",
    "required": true,
    "description": "Visible label content."
  },
  {
    "prop": "description",
    "type": "string | Snippet",
    "required": false,
    "description": "Supporting description text."
  },
  {
    "prop": "value",
    "type": "Value",
    "required": true,
    "description": "Controlled value."
  }
];

export default rows;
