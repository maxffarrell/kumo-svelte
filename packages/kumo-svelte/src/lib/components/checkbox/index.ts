import Root, {
  Group as GroupSnippet,
  Item as ItemSnippet,
  Legend as LegendSnippet
} from './Checkbox.svelte';

const Group = GroupSnippet as unknown as typeof Root;
const Item = ItemSnippet as unknown as typeof Root;
const Legend = LegendSnippet as unknown as typeof Root;

const Checkbox = Object.assign(Root, {
  Root,
  Group,
  Item,
  Legend
}) as typeof Root & {
  Root: typeof Root;
  Group: typeof Group;
  Item: typeof Item;
  Legend: typeof Legend;
};

export {
  Checkbox,
  Group as CheckboxGroup,
  Item as CheckboxItem,
  Legend as CheckboxLegend
};
export type { CheckboxVariant } from './Checkbox.svelte';
