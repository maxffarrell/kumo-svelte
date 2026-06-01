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
    "description": "Size of the autocomplete input. Matches Input component sizes."
  },
  {
    "prop": "placeholder",
    "type": "string",
    "required": false,
    "description": "Placeholder text."
  }
];

export default rows;
