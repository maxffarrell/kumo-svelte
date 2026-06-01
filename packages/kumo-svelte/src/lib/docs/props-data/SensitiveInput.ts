import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "autoComplete",
    "type": "string",
    "required": false,
    "default": "\"off\"",
    "description": "Autocomplete attribute."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "readOnly",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Makes the input read-only."
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as required."
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
    "prop": "value",
    "type": "string",
    "required": false,
    "description": "Controlled value."
  },
  {
    "prop": "size",
    "type": "'xs' | 'sm' | 'base' | 'lg'",
    "required": false,
    "description": "Size preset.",
    "default": "\"base\""
  },
  {
    "prop": "variant",
    "type": "'default' | 'error'",
    "required": false,
    "description": "Visual variant.",
    "default": "\"default\""
  },
  {
    "prop": "label",
    "type": "FieldText",
    "required": false,
    "description": "Visible label content."
  },
  {
    "prop": "labelTooltip",
    "type": "FieldText",
    "required": false,
    "description": "Optional help content for the label."
  },
  {
    "prop": "description",
    "type": "FieldText",
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
    "type": "string",
    "required": false,
    "default": "\"\"",
    "description": "Initial uncontrolled value."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string) => void",
    "required": false,
    "description": "Called when the value changes."
  },
  {
    "prop": "onCopy",
    "type": "() => void",
    "required": false,
    "description": "Called after copying succeeds."
  },
  {
    "prop": "readonly",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Makes the input read-only."
  },
  {
    "prop": "autocomplete",
    "type": "string",
    "required": false,
    "description": "Autocomplete attribute."
  },
  {
    "prop": "oninput",
    "type": "(event: Event) => void",
    "required": false,
    "description": "Input event handler."
  },
  {
    "prop": "onchange",
    "type": "(event: Event) => void",
    "required": false,
    "description": "Change event handler."
  },
  {
    "prop": "onblur",
    "type": "(event: FocusEvent) => void",
    "required": false,
    "description": "Blur event handler."
  },
  {
    "prop": "onkeydown",
    "type": "(event: KeyboardEvent) => void",
    "required": false,
    "description": "Keydown event handler."
  }
];

export default rows;
