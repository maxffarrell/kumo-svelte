export default [
  {
    prop: 'children',
    type: 'Snippet',
    description: 'Optional visible link label.'
  },
  {
    prop: 'href',
    type: 'string',
    description: 'Navigation destination.'
  },
  {
    prop: 'icon',
    type: 'Component',
    description: 'Optional icon component rendered before the label.'
  },
  {
    prop: 'shape',
    type: '"base" | "square" | "circle"',
    description: 'Link shape. Icon-only toolbar links default to square.'
  },
  {
    prop: 'external',
    type: 'boolean',
    description: 'Opens the link in a new tab with safe rel attributes.'
  },
  {
    prop: 'disabled',
    type: 'boolean',
    description: 'Disables navigation and exposes disabled semantics.'
  }
];
