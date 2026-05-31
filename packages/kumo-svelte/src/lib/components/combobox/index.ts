import Root from './Combobox.svelte';
import {
  Chip as ChipSnippet,
  Collection as CollectionSnippet,
  Content as ContentSnippet,
  Empty as EmptySnippet,
  Group as GroupSnippet,
  GroupLabel as GroupLabelSnippet,
  Icon as IconSnippet,
  Input as InputSnippet,
  Item as ItemSnippet,
  List as ListSnippet,
  Trigger as TriggerSnippet,
  TriggerInput as TriggerInputSnippet,
  TriggerMultipleWithInput as TriggerMultipleWithInputSnippet,
  TriggerValue as TriggerValueSnippet,
  Value as ValueSnippet
} from './Combobox.svelte';
import { createKumoFilter } from '../filter';

const Content = ContentSnippet as any;
const TriggerInput = TriggerInputSnippet as any;
const TriggerValue = TriggerValueSnippet as any;
const TriggerMultipleWithInput = TriggerMultipleWithInputSnippet as any;
const Item = ItemSnippet as any;
const Chip = ChipSnippet as any;
const Input = InputSnippet as any;
const Empty = EmptySnippet as any;
const GroupLabel = GroupLabelSnippet as any;
const Group = GroupSnippet as any;
const List = ListSnippet as any;
const Collection = CollectionSnippet as any;
const Trigger = TriggerSnippet as any;
const Value = ValueSnippet as any;
const Icon = IconSnippet as any;

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
