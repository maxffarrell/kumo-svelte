import Root from './Autocomplete.svelte';
import InputGroup from './AutocompleteInputGroup.svelte';
import Content from './AutocompleteContent.svelte';
import List from './AutocompleteList.svelte';
import Item from './AutocompleteItem.svelte';
import Group from './AutocompleteGroup.svelte';
import GroupLabel from './AutocompleteGroupLabel.svelte';
import Collection from './AutocompleteCollection.svelte';
import Separator from './AutocompleteSeparator.svelte';
import { createKumoFilter } from '../filter';

export const Autocomplete = Object.assign(Root, {
  InputGroup,
  Content,
  List,
  Item,
  Group,
  GroupLabel,
  Collection,
  Separator,
  useFilter: createKumoFilter
});

export {
  Root as AutocompleteRoot,
  InputGroup as AutocompleteInputGroup,
  Content as AutocompleteContent,
  List as AutocompleteList,
  Item as AutocompleteItem,
  Group as AutocompleteGroup,
  GroupLabel as AutocompleteGroupLabel,
  Collection as AutocompleteCollection,
  Separator as AutocompleteSeparator
};

export type { AutocompleteItem as AutocompleteOption, AutocompleteSize } from './context';
