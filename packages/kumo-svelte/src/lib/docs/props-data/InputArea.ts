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
    "prop": "variant",
    "type": "'default' | 'error'",
    "required": false,
    "default": "\"default\"",
    "description": "Visual variant."
  },
  {
    "prop": "label",
    "type": "string | Snippet",
    "required": false,
    "description": "Visible label content."
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
    "prop": "autoResize",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Automatically resize the textarea based on its content."
  },
  {
    "prop": "minRows",
    "type": "number",
    "required": false,
    "default": "1",
    "description": "Minimum number of rows when auto-resizing."
  },
  {
    "prop": "maxRows",
    "type": "number",
    "required": false,
    "description": "Maximum number of rows before the textarea scrolls."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string) => void",
    "required": false,
    "description": "Called when the value changes."
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as required."
  }
];

export default rows;
