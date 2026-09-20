import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  { prop: 'children', type: 'Snippet', required: true, description: 'Inline content to display.' },
  { prop: 'value', type: 'string', required: false, description: 'Value copied to the clipboard. Defaults to rendered text content.' },
  { prop: 'variant', type: 'InlineCopyTextVariant', required: false, default: 'mono-secondary', description: 'Text style; heading variants are excluded.' },
  { prop: 'size', type: 'KumoTextSize', required: false, description: 'Text size.' },
  { prop: 'bold', type: 'boolean', required: false, description: 'Uses medium-weight copy text.' },
  { prop: 'truncate', type: 'boolean', required: false, default: 'true', description: 'Truncates overflowing text.' },
  { prop: 'as', type: 'TextElement', required: false, default: 'span', description: 'Element used for displayed text.' },
  { prop: 'onCopy', type: '() => void', required: false, description: 'Called after a successful clipboard write.' },
  { prop: 'labels', type: 'InlineCopyTextLabels', required: false, description: 'Localized copy and copied accessible labels.' },
  { prop: 'class', type: 'string', required: false, description: 'Additional button classes.' }
];

export default rows;
