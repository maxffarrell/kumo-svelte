export default [
  {
    prop: 'children',
    type: 'Snippet',
    required: true,
    description: 'Toolbar controls rendered as one grouped card.'
  },
  {
    prop: 'size',
    type: '"xs" | "sm" | "base" | "lg"',
    default: '"base"',
    description: 'Locks every supported toolbar item to this size.'
  },
  {
    prop: 'class',
    type: 'string',
    description: 'Additional classes merged onto the toolbar root.'
  }
];
