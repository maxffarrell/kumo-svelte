import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    "prop": "spacing",
    "type": "'compact' | 'base' | 'relaxed'",
    "required": false,
    "default": "\"base\"",
    "description": "Spacing preset between header rows."
  },
  {
    "prop": "breadcrumbContent",
    "type": "Snippet",
    "required": true,
    "description": "Breadcrumb composition rendered at the top of the header."
  },
  {
    "prop": "title",
    "type": "string",
    "required": false,
    "description": "Optional page title."
  },
  {
    "prop": "description",
    "type": "string",
    "required": false,
    "description": "Optional page description."
  },
  {
    "prop": "tabs",
    "type": "TabsItem[]",
    "required": false,
    "description": "Tabs shown in the lower header row."
  },
  {
    "prop": "defaultTab",
    "type": "string",
    "required": false,
    "description": "Initial selected tab value."
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
    "required": false,
    "description": "Action content rendered on the right side of the tabs row."
  },
  {
    "prop": "onValueChange",
    "type": "(value: string) => void",
    "required": false,
    "description": "Callback fired when the active tab changes."
  }
];

export default rows;
