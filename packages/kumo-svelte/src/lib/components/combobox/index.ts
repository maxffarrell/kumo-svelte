import Root from './Combobox.svelte';
import Content from './ComboboxContent.svelte';
import TriggerInput from './ComboboxTriggerInput.svelte';
import TriggerValue from './ComboboxTriggerValue.svelte';
import TriggerMultipleWithInput from './ComboboxTriggerMultipleWithInput.svelte';
import Item from './ComboboxItem.svelte';
import Chip from './ComboboxChip.svelte';
import Input from './ComboboxInput.svelte';
import Empty from './ComboboxEmpty.svelte';
import GroupLabel from './ComboboxGroupLabel.svelte';
import Group from './ComboboxGroup.svelte';
import List from './ComboboxList.svelte';
import Collection from './ComboboxCollection.svelte';
import Trigger from './ComboboxTrigger.svelte';
import Value from './ComboboxValue.svelte';
import Icon from './ComboboxIcon.svelte';
import { createKumoFilter } from '../filter';

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

export type { ComboboxInputSide, ComboboxItem as ComboboxOption, ComboboxSize } from './context';
