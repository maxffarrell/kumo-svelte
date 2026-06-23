import type { PropRow } from '../prop-types';

const rows: PropRow[] = [
  {
    prop: 'variant',
    type: "'large' | 'small'",
    required: false,
    default: '"small"',
    description:
      'Svelte variant matching the upstream SmallItem or LargeItem legend layouts.'
  },
  {
    prop: 'name',
    type: 'string',
    required: true,
    description: 'Series name shown as a label.'
  },
  {
    prop: 'color',
    type: 'string',
    required: true,
    description: 'Hex color string for the series indicator dot.'
  },
  {
    prop: 'value',
    type: 'string',
    required: true,
    description: 'Formatted value string to display.'
  },
  {
    prop: 'unit',
    type: 'string',
    required: false,
    description: 'Optional unit label shown after the value.'
  },
  {
    prop: 'inactive',
    type: 'boolean',
    required: false,
    default: 'false',
    description:
      'Renders the item at reduced opacity to indicate a deselected state.'
  },
  {
    prop: 'onpointerenter',
    type: '(event: PointerEvent) => void',
    required: false,
    description:
      'Fired when a pointer enters the legend item, useful for highlighting the corresponding chart series.'
  },
  {
    prop: 'onpointerleave',
    type: '(event: PointerEvent) => void',
    required: false,
    description:
      'Fired when a pointer leaves the legend item, useful for resetting chart series emphasis.'
  },
  {
    prop: 'onclick',
    type: '(event: MouseEvent) => void',
    required: false,
    description:
      'Fired when the legend item is clicked, useful for toggling series visibility.'
  },
  {
    prop: 'class',
    type: 'string',
    required: false,
    description: 'Optional class for customizing legend item presentation.'
  }
];

export default rows;
