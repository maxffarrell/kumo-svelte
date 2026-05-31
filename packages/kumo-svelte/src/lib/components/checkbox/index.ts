import Root, { type KumoCheckboxPart } from './Checkbox.svelte';

export type { KumoCheckboxPart };

const part = (part: KumoCheckboxPart) =>
  ((anchor: Parameters<typeof Root>[0], props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as any;

const Group = part('group');
const Item = part('item');
const Legend = part('legend');

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
