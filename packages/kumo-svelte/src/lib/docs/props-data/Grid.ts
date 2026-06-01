import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": false,
    "description": "Grid items to render."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "mobileDivider",
    "type": "boolean",
    "required": false,
    "description": "Show dividers between grid items on mobile. Only applies with the 4up variant."
  },
  {
    "prop": "gap",
    "type": "'none' | 'sm' | 'base' | 'lg'",
    "required": false,
    "description": "Gap size between grid items.",
    "default": "\"base\""
  },
  {
    "prop": "variant",
    "type": "'2up' | 'side-by-side' | '2-1' | '1-2' | '1-3up' | '3up' | '4up' | '6up' | '1-2-4up'",
    "required": false,
    "description": "Responsive column layout variant."
  }
];

export default rows;
