import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'icon', type: 'Component | Snippet', description: 'Icon rendered before the label.' },
  { prop: 'active', type: 'boolean', default: 'false', description: 'Marks this item as currently active.' },
  { prop: 'size', type: '"base" | "sm"', default: '"base"', description: 'Button size.' },
  { prop: 'href', type: 'string', description: 'Navigation URL. When set, renders as a link.' },
  { prop: 'tooltip', type: 'string', description: 'Tooltip label shown when the sidebar is collapsed.' },
  { prop: 'itemId', type: 'string', description: 'Anchor id used by useSidebar().scrollToItem().' },
  { prop: 'children', type: 'Snippet', description: 'Menu button label and inline content.' },
  { prop: 'class', type: 'string', description: 'Additional classes.' }
];

export default rows;
