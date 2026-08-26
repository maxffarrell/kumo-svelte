import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'itemId', type: 'string', description: 'Anchor id used by useSidebar().scrollToItem().' },
  { prop: 'children', type: 'Snippet', description: 'Menu item content.' },
  { prop: 'class', type: 'string', description: 'Additional classes.' }
];

export default rows;
