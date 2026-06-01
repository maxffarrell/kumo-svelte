import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
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
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "passwordManagerIgnore",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Adds password-manager ignore attributes."
  },
  {
    "prop": "required",
    "type": "boolean",
    "required": false,
    "description": "Marks the field as required."
  }
];

export default rows;
