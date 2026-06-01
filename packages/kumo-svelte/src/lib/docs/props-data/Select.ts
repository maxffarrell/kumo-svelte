import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "size",
    "type": "'xs' | 'sm' | 'base' | 'lg'",
    "required": false,
    "default": "\"base\"",
    "description": "Size preset."
  },
  {
    "prop": "label",
    "type": "string | Snippet",
    "required": false,
    "description": "Visible label content."
  },
  {
    "prop": "hideLabel",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "hideLabel prop."
  },
  {
    "prop": "placeholder",
    "type": "string",
    "required": false,
    "default": "\"Select...\"",
    "description": "Placeholder text."
  },
  {
    "prop": "loading",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Loading state."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Marks the field as required."
  },
  {
    "prop": "labelTooltip",
    "type": "string | Snippet",
    "required": false,
    "description": "Optional help content for the label."
  },
  {
    "prop": "value",
    "type": "Value",
    "required": false,
    "description": "Controlled value."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
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
    "type": "Value",
    "required": false,
    "description": "Initial uncontrolled value."
  },
  {
    "prop": "renderValue",
    "type": "(value: Value) => unknown",
    "required": false,
    "description": "Custom selected-value renderer."
  },
  {
    "prop": "items",
    "type": "Record<string, SelectItemValue> | { label: Snippet | string; value: Value }[]",
    "required": false,
    "description": "Items rendered by the component."
  },
  {
    "prop": "options",
    "type": "Option[]",
    "required": false,
    "default": "[]",
    "description": "Options rendered by the component."
  },
  {
    "prop": "multiple",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Enables multiple selection."
  },
  {
    "prop": "name",
    "type": "string",
    "required": false,
    "description": "Form field name."
  },
  {
    "prop": "container",
    "type": "HTMLElement | string",
    "required": false,
    "description": "Container element for the portal."
  }
];

export default rows;
