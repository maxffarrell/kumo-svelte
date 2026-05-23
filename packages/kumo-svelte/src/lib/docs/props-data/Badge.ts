import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "variant",
    "type": "'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'destructive' | 'info' | 'beta' | 'outline' | 'red' | 'green' | 'neutral' | 'orange' | 'purple' | 'teal' | 'teal-subtle' | 'blue'",
    "required": false,
    "default": "\"primary\"",
    "description": "Visual variant."
  },
  {
    "prop": "appearance",
    "type": "'filled' | 'dot'",
    "required": false,
    "default": "\"filled\"",
    "description": "Visual appearance. Dot renders an outlined badge with a small status indicator for success, warning, error, or neutral variants."
  },
  {
    "prop": "class",
    "type": "string",
    "required": false,
    "description": "Additional classes merged onto the root element."
  },
  {
    "prop": "children",
    "type": "Snippet",
    "required": true,
    "description": "Content rendered inside the badge."
  }
];

export default rows;
