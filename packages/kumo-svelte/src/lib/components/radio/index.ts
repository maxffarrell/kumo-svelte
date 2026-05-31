import RadioRoot from './Radio.svelte';
import type { KumoRadioPart } from './Radio.svelte';

const part = (part: KumoRadioPart) =>
  ((anchor, props = {}) =>
    RadioRoot(anchor, {
      ...props,
      __part: part
    })) as typeof RadioRoot;

const RadioGroup = part('group');
const RadioItem = part('item');
const RadioLegend = part('legend');

export const Radio = Object.assign(RadioRoot, {
  Root: RadioRoot,
  Group: RadioGroup,
  Item: RadioItem,
  Legend: RadioLegend
}) as typeof RadioRoot & {
  Root: typeof RadioRoot;
  Group: typeof RadioGroup;
  Item: typeof RadioItem;
  Legend: typeof RadioLegend;
};

export { RadioRoot, RadioGroup, RadioItem, RadioLegend };
export type { RadioAppearance, RadioControlPosition, RadioVariant } from './Radio.svelte';
