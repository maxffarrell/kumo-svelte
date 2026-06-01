import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "children",
    "type": "Snippet",
    "required": true,
    "description": "The label content."
  },
  {
    "prop": "showOptional",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Shows gray optional text after the label."
  },
  {
    "prop": "tooltip",
    "type": "string | Snippet",
    "required": false,
    "description": "Tooltip content displayed next to the label."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "htmlFor",
    "type": "string",
    "required": false,
    "description": "The id of the form element this label is associated with."
  },
  {
    "prop": "asContent",
    "type": "boolean",
    "required": false,
    "default": "false",
    "description": "Renders only the inline label content without the outer label element."
  }
];

export default rows;
