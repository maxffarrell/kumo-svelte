export default [
  {
    prop: 'children',
    type: 'Snippet',
    description: 'Optional visible button label.'
  },
  {
    prop: 'icon',
    type: 'Component',
    description: 'Optional icon component rendered before the label.'
  },
  {
    prop: 'shape',
    type: '"base" | "square" | "circle"',
    description: 'Button shape. Icon-only toolbar buttons default to square.'
  },
  {
    prop: 'disabled',
    type: 'boolean',
    description: 'Disables the toolbar button.'
  },
  {
    prop: 'loading',
    type: 'boolean',
    description: 'Shows a loading indicator and disables the toolbar button.'
  }
];
