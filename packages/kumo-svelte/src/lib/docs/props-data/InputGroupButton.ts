import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "tooltip",
    "type": "string",
    "required": false,
    "description": "Tooltip content."
  },
  {
    "prop": "tooltipSide",
    "type": "string",
    "required": false,
    "description": "tooltipSide prop."
  },
  {
    "prop": "variant",
    "type": "'primary' | 'secondary' | 'ghost' | 'destructive' | 'secondary-destructive' | 'outline'",
    "required": false,
    "default": "\"ghost\"",
    "description": "Visual variant."
  },
  {
    "prop": "size",
    "type": "'xs' | 'sm' | 'base' | 'lg'",
    "required": false,
    "description": "Size preset."
  },
  {
    "prop": "icon",
    "type": "Component",
    "required": false,
    "description": "Icon rendered by the component."
  },
  {
    "prop": "shape",
    "type": "'base' | 'square' | 'circle'",
    "required": false,
    "description": "Shape preset."
  },
  {
    "prop": "disabled",
    "type": "boolean",
    "required": false,
    "description": "Disables the component."
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
  }
];

export default rows;
