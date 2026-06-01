import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "legend",
    "type": "string",
    "required": false,
    "description": "legend prop."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  },
  {
    "prop": "error",
    "type": "string",
    "required": false,
    "description": "Validation error message or matcher."
  },
  {
    "prop": "description",
    "type": "string",
    "required": false,
    "description": "Supporting description text."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "controlFirst",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Renders the control before label content."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
