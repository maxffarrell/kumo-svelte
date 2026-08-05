<script lang="ts">
  import Autocomplete from './Autocomplete.svelte';
  import AutocompleteInputGroup from './AutocompleteInputGroup.svelte';
  import AutocompleteContent from './AutocompleteContent.svelte';
  import AutocompleteList from './AutocompleteList.svelte';
  import AutocompleteItem from './AutocompleteItem.svelte';

  interface Props {
    value?: string | number | string[];
    items?: string[];
    onValueChange?: (value: any) => void;
  }

  let { value = $bindable(''), items = ['Apple', 'Banana', 'Cherry'], onValueChange }: Props = $props();
</script>

<Autocomplete bind:value {items} {onValueChange}>
  <AutocompleteInputGroup placeholder="Search fruit" />
  <AutocompleteContent>
    <AutocompleteList>
      {#snippet children(item)}
        <AutocompleteItem value={item}>{item}</AutocompleteItem>
      {/snippet}
    </AutocompleteList>
  </AutocompleteContent>
</Autocomplete>
