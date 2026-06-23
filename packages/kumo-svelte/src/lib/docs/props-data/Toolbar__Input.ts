export default [
  {
    prop: 'value',
    type: 'string | number',
    description: 'Input value, bindable with `bind:value`.'
  },
  {
    prop: 'onValueChange',
    type: '(value: string) => void',
    description: 'Called when the input value changes.'
  },
  {
    prop: 'class',
    type: 'string',
    description: 'Additional classes merged onto the toolbar input.'
  }
];
