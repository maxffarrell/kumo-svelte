import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'size', type: "'sm' | 'base' | 'lg' | 'xl'", required: false, default: '"base"', description: 'Desktop dialog width.' },
  { prop: 'verticalAlign', type: "'top' | 'center'", required: false, default: '"center"', description: 'Desktop vertical alignment.' },
  { prop: 'container', type: 'HTMLElement | string', required: false, description: 'Portal destination.' },
  { prop: 'closeLabel', type: 'string', required: false, default: '"Close"', description: 'Accessible label for the automatic close control.' }
];
export default rows;
