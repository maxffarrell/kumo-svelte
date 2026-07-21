import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "size",
    "type": "'xs' | 'sm' | 'base' | 'lg'",
    "required": false,
    "default": "\"base\"",
    "description": "Size preset."
  },
  {
    "prop": "items",
    "type": "unknown[]",
    "required": true,
    "description": "Array of items to display in the dropdown."
  },
  {
    "prop": "value",
    "type": "unknown",
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
    "prop": "onValueChange",
    "type": "(value: unknown) => void",
    "required": false,
    "description": "Called when the value changes."
  },
  {
    "prop": "multiple",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Enables multiple selection."
  },
  {
    "prop": "onOpenChange",
    "type": "(open: boolean) => void",
    "required": false,
    "description": "Called when open state changes."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Prevents interaction with the field."
  },
  {
    "prop": "defaultValue",
    "type": "unknown",
    "required": false,
    "description": "Initial value."
  },
  {
    "prop": "filter",
    "type": "((item: ComboboxItem, query: string) => boolean) | null",
    "required": false,
    "description": "Custom filter function. Set to null to disable filtering."
  },
  {
    "prop": "isItemEqualToValue",
    "type": "(item: unknown, value: unknown) => boolean",
    "required": false,
    "description": "Custom value equality matcher function."
  }
];

export default rows;
