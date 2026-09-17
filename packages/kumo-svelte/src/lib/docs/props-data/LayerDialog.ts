import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'open', type: 'boolean', required: false, description: 'Controlled open state.' },
  { prop: 'onOpenChange', type: '(open: boolean) => void', required: false, description: 'Called when the open state changes.' },
  { prop: 'dismissDisabled', type: 'boolean', required: false, default: 'false', description: 'Prevents user-initiated dismissal while work is pending.' },
  { prop: 'children', type: 'Snippet', required: false, description: 'LayerDialog compound children.' }
];
export default rows;
