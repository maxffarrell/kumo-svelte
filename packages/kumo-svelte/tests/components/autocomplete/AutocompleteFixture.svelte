<script lang="ts">
  import { Autocomplete } from '$lib/components/autocomplete';

  type Item = string | number | { label: string; value: string | number; disabled?: boolean };
  type Group = { label: string; items: Item[] };

  interface Props {
    items?: Item[];
    groups?: Group[];
    value?: string | number | string[];
    defaultValue?: string | number | string[];
    open?: boolean;
    disabled?: boolean;
    error?: string;
    placeholder?: string;
    inputClass?: string;
    contentClass?: string;
    itemClass?: string;
    rootClass?: string;
    filter?: ((item: Item, query: string) => boolean) | null;
    onValueChange?: (value: string | number | string[]) => void;
    onOpenChange?: (open: boolean) => void;
  }

  let {
    items = [],
    groups = [],
    value = $bindable(''),
    defaultValue,
    open = $bindable(false),
    disabled = false,
    error,
    placeholder = 'Search items',
    inputClass,
    contentClass,
    itemClass,
    rootClass,
    filter,
    onValueChange,
    onOpenChange
  }: Props = $props();

  function getItemLabel(item: Item) {
    return typeof item === 'object' && item !== null && 'label' in item ? item.label : String(item);
  }

  function getItemValue(item: Item) {
    return typeof item === 'object' && item !== null && 'value' in item ? item.value : item;
  }

  let rootItems = $derived(items.length ? items : groups.flatMap((group) => group.items));
</script>

<Autocomplete
  items={rootItems}
  {defaultValue}
  bind:value
  bind:open
  {disabled}
  {error}
  {filter}
  {onValueChange}
  {onOpenChange}
  class={rootClass}
  data-testid="autocomplete-root"
>
  <Autocomplete.InputGroup
    {placeholder}
    class={inputClass}
    aria-label={placeholder}
    data-testid="autocomplete-input"
  />
  <Autocomplete.Content class={contentClass} data-testid="autocomplete-content">
    {#if groups.length}
      <Autocomplete.List data-testid="autocomplete-list">
        {#snippet children()}
          {undefined}
        {/snippet}
      </Autocomplete.List>
      {#each groups as group (group.label)}
        <Autocomplete.Group items={group.items}>
          <Autocomplete.GroupLabel>{group.label}</Autocomplete.GroupLabel>
          <Autocomplete.Collection>
            {#snippet children(item: Item)}
              <Autocomplete.Item
                value={item}
                class={itemClass}
                data-testid={`autocomplete-item-${getItemValue(item)}`}
              >
                {getItemLabel(item)}
              </Autocomplete.Item>
            {/snippet}
          </Autocomplete.Collection>
        </Autocomplete.Group>
      {/each}
    {:else}
      <Autocomplete.List data-testid="autocomplete-list">
        {#snippet children(item: Item)}
          <Autocomplete.Item
            value={item}
            class={itemClass}
            data-testid={`autocomplete-item-${getItemValue(item)}`}
          >
            {getItemLabel(item)}
          </Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    {/if}
  </Autocomplete.Content>
</Autocomplete>
