import SelectRoot, { type KumoSelectPart } from './Select.svelte';

export type { KumoSelectPart };

const part = (part: KumoSelectPart) =>
  ((anchor, props = {}) =>
    SelectRoot(anchor, {
      ...props,
      __part: part
    })) as typeof SelectRoot;

const SelectOption = part('option');
const SelectGroup = part('group');
const SelectGroupLabel = part('group-label');
const SelectSeparator = part('separator');

export const Select = Object.assign(SelectRoot, {
  Option: SelectOption,
  Group: SelectGroup,
  GroupLabel: SelectGroupLabel,
  Separator: SelectSeparator
}) as typeof SelectRoot & {
  Option: typeof SelectRoot;
  Group: typeof SelectRoot;
  GroupLabel: typeof SelectRoot;
  Separator: typeof SelectRoot;
};

export default Select;
