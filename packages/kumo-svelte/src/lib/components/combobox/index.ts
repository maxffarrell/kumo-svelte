import Root, { type KumoComboboxPart } from './Combobox.svelte';
import { createKumoFilter } from '../filter';

export type { KumoComboboxPart };

const part = (part: KumoComboboxPart) =>
  ((anchor: Parameters<typeof Root>[0], props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as any;

const Content = part('content');
const TriggerInput = part('trigger-input');
const TriggerValue = part('trigger-value');
const TriggerMultipleWithInput = part('trigger-multiple-with-input');
const Item = part('item');
const Chip = part('chip');
const Input = part('input');
const Empty = part('empty');
const GroupLabel = part('group-label');
const Group = part('group');
const List = part('list');
const Collection = part('collection');
const Trigger = part('trigger');
const Value = part('value');
const Icon = part('icon');

export const Combobox = Object.assign(Root, {
  Content,
  TriggerInput,
  TriggerValue,
  TriggerMultipleWithInput,
  Chip,
  Item,
  Input,
  Empty,
  GroupLabel,
  Group,
  List,
  Collection,
  Trigger,
  Value,
  Icon,
  useFilter: createKumoFilter
});

export {
  Root as ComboboxRoot,
  Content as ComboboxContent,
  TriggerInput as ComboboxTriggerInput,
  TriggerValue as ComboboxTriggerValue,
  TriggerMultipleWithInput as ComboboxTriggerMultipleWithInput,
  Chip as ComboboxChip,
  Item as ComboboxItem,
  Input as ComboboxInput,
  Empty as ComboboxEmpty,
  GroupLabel as ComboboxGroupLabel,
  Group as ComboboxGroup,
  List as ComboboxList,
  Collection as ComboboxCollection,
  Trigger as ComboboxTrigger,
  Value as ComboboxValue,
  Icon as ComboboxIcon
};

export type {
  ComboboxInputSide,
  ComboboxItem as ComboboxOption,
  ComboboxSize
} from './context';
