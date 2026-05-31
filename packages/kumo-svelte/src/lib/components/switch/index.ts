import Root from './Switch.svelte';
import type { KumoSwitchPart } from './Switch.svelte';

const part = (part: KumoSwitchPart) =>
  ((anchor, props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as typeof Root;

const Group = part('group');
const Item = part('item');
const Legend = part('legend');

const Switch = Object.assign(Root, {
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

export { Switch, Group as SwitchGroup, Item as SwitchItem, Legend as SwitchLegend };
export type { SwitchSize, SwitchVariant } from './Switch.svelte';
