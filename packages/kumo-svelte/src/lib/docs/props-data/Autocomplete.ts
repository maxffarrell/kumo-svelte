import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "items",
    "type": "unknown[]",
    "required": true,
    "description": "Array of items to display in the dropdown."
  },
  {
    "prop": "value",
    "type": "string | number | string[]",
    "required": false,
    "description": "Controlled input value."
  },
  {
    "prop": "open",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Controlled open state."
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
  },
  {
    "prop": "label",
    "type": "string | Snippet",
    "required": false,
    "description": "Visible label content."
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as required."
  },
  {
    "prop": "labelTooltip",
    "type": "string | Snippet",
    "required": false,
    "description": "Optional help content for the label."
  },
  {
    "prop": "description",
    "type": "string | Snippet",
    "required": false,
    "description": "Supporting description text."
  },
  {
    "prop": "error",
    "type": "FieldError",
    "required": false,
    "description": "Validation error message or matcher."
  },
  {
    "prop": "defaultValue",
    "type": "string | number | string[]",
    "required": false,
    "description": "Uncontrolled default input value."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string | number | string[]) => void",
    "required": false,
    "description": "Called when the value changes."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "required": false,
    "description": "Called when open state changes."
  }
];

export default rows;
