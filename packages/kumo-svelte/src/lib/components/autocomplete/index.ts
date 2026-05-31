import Root, { type KumoAutocompletePart } from './Autocomplete.svelte';
import { createKumoFilter } from '../filter';

const part = (part: KumoAutocompletePart) =>
  ((anchor, props = {}) =>
    Root(anchor, {
      ...props,
      __part: part
    })) as typeof Root;

const InputGroup = part('input-group');
const Content = part('content');
const List = part('list');
const Item = part('item');
const Group = part('group');
const GroupLabel = part('group-label');
const Collection = part('collection');
const Separator = part('separator');

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
export type { KumoAutocompletePart } from './Autocomplete.svelte';
