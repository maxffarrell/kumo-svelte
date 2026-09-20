import type { PropRow } from '../prop-types';
const rows: PropRow[] = [
  { prop: 'children', type: 'Snippet', required: false, description: 'Tightly coupled controls to join.' },
  { prop: 'class', type: 'string', required: false, description: 'Additional classes merged onto the group.' },
  { prop: 'aria-label', type: 'string', required: false, description: 'Accessible name describing the grouped action.' }
];
export default rows;
