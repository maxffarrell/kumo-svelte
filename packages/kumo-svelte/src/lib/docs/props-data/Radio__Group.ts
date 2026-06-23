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
    "prop": "orientation",
    "type": "'vertical' | 'horizontal'",
    "required": false,
    "default": "\"vertical\"",
    "description": "Layout orientation."
  },
  {
    "prop": "appearance",
    "type": "'default' | 'card'",
    "required": false,
    "default": "\"default\"",
    "description": "Visual appearance preset."
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
    "type": "Value",
    "required": false,
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
    "prop": "controlPosition",
    "type": "'start' | 'end'",
    "required": false,
    "description": "Control position relative to label."
  },
  {
    "prop": "name",
    "type": "string",
    "required": false,
    "description": "Form field name."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "defaultValue",
    "type": "Value",
    "required": false,
    "description": "Initial uncontrolled value."
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as required."
  },
  {
    "prop": "onValueChange",
    "type": "(value: Value, eventDetails?: unknown) => void",
    "required": false,
    "description": "Called when the value changes."
  }
];

export default rows;
