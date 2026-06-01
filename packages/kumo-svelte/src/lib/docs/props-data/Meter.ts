import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "customValue",
    "type": "string",
    "required": false,
    "description": "Custom value label."
  },
  {
    "prop": "label",
    "type": "string",
    "required": true,
    "description": "Visible label content."
  },
  {
    "prop": "showValue",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Shows the current value."
  },
  {
    "prop": "trackClassName",
    "type": "string",
    "required": false,
    "description": "Class for the meter track."
  },
  {
    "prop": "indicatorClassName",
    "type": "string",
    "required": false,
    "description": "Class for the meter indicator."
  },
  {
    "prop": "value",
    "type": "number",
    "required": false,
    "default": "0",
    "description": "Controlled value."
  },
  {
    "prop": "max",
    "type": "number",
    "required": false,
    "default": "100",
    "description": "Maximum value."
  },
  {
    "prop": "min",
    "type": "number",
    "required": false,
    "default": "0",
    "description": "Minimum value."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
