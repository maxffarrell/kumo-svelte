import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "shape",
    "type": "'base' | 'square' | 'circle'",
    "required": false,
    "default": "\"base\"",
    "description": "Shape preset."
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
    "type": "'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline'",
    "required": false,
    "default": "\"secondary\"",
    "description": "Visual variant."
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
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon rendered by the component."
  },
  {
    "prop": "loading",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Loading state."
  },
  {
    "prop": "title",
    "type": "string",
    "required": false,
    "description": "Tooltip content shown when hovering the button."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Disables the component."
  },
  {
    "prop": "type",
    "type": "'button' | 'submit' | 'reset'",
    "required": false,
    "default": "\"button\"",
    "description": "Native button type."
  }
];

export default rows;
