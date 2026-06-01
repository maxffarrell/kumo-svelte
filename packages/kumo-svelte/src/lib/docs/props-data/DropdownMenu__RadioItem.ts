import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "value",
    "type": "string",
    "required": true,
    "description": "Controlled value."
  },
  {
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon rendered by the component."
  },
  {
    "prop": "inset",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Indents the item content."
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
