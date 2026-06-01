import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "legend",
    "type": "string",
    "required": false,
    "description": "legend prop."
  },
  {
    "prop": "error",
    "type": "string",
    "required": false,
    "description": "Validation error message or matcher."
  },
  {
    "prop": "description",
    "type": "string | Snippet",
    "required": false,
    "description": "Supporting description text."
  },
  {
    "prop": "value",
    "type": "string[]",
    "required": false,
    "default": "[]",
    "description": "Controlled value."
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
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as required."
  },
  {
    "prop": "name",
    "type": "string",
    "required": false,
    "description": "Form field name."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string[]) => void",
    "required": false,
    "description": "Called when the value changes."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  }
];

export default rows;
