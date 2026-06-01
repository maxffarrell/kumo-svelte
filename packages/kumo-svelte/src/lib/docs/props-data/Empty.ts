import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "size",
    "type": "'sm' | 'base' | 'lg'",
    "required": false,
    "default": "\"base\"",
    "description": "Size preset."
  },
  {
    "prop": "icon",
    "type": "Snippet",
    "required": false,
    "description": "Decorative icon displayed above the title."
  },
  {
    "prop": "title",
    "type": "string",
    "required": true,
    "description": "Title content."
  },
  {
    "prop": "description",
    "type": "string",
    "required": false,
    "description": "Supporting description text."
  },
  {
    "prop": "commandLine",
    "type": "string",
    "required": false,
    "description": "Shell command displayed in a copyable code block."
  },
  {
    "prop": "contents",
    "type": "Snippet",
    "required": false,
    "description": "Custom empty-state content."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  }
];

export default rows;
