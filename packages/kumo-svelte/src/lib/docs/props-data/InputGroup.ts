import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "label",
    "type": "string | Snippet",
    "required": false,
    "description": "Visible label content."
  },
  {
    "prop": "description",
    "type": "string",
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
    "prop": "id",
    "type": "string",
    "required": false,
    "description": "Element id."
  },
  {
    "prop": "size",
    "type": "'xs' | 'sm' | 'base' | 'lg'",
    "required": false,
    "default": "\"base\"",
    "description": "Size preset."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "focusMode",
    "type": "InputGroupFocusMode",
    "required": false,
    "default": "\"container\"",
    "description": "focusMode prop."
  }
];

export default rows;
