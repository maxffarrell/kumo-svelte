import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "variant",
    "type": "'default' | 'error'",
    "required": false,
    "default": "\"default\"",
    "description": "Visual variant."
  },
  {
    "prop": "label",
    "type": "string",
    "required": false,
    "description": "Visible label content."
  },
  {
    "prop": "labelTooltip",
    "type": "Snippet",
    "required": false,
    "description": "Optional help content for the label."
  },
  {
    "prop": "controlFirst",
    "type": "boolean",
    "required": false,
    "default": "true",
    "description": "Renders the control before label content."
  },
  {
    "prop": "checked",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Checked state."
  },
  {
    "prop": "indeterminate",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Indeterminate checked state."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "name",
    "type": "string",
    "required": false,
    "description": "Form field name."
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
    "prop": "value",
    "type": "string",
    "required": false,
    "description": "Controlled value."
  },
  {
    "prop": "id",
    "type": "string",
    "required": false,
    "description": "Element id."
  },
  {
    "prop": "aria-label",
    "type": "string",
    "required": false,
    "description": "Accessible label."
  },
  {
    "prop": "aria-labelledby",
    "type": "string",
    "required": false,
    "description": "Accessible labelled-by reference."
  },
  {
    "prop": "onCheckedChange",
    "type": "(checked: boolean) => void",
    "required": false,
    "description": "Called when checked changes."
  },
  {
    "prop": "onIndeterminateChange",
    "type": "(indeterminate: boolean) => void",
    "required": false,
    "description": "Called when indeterminate changes."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Child snippet rendered by the component."
  }
];

export default rows;
