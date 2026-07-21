<script lang="ts">
  import Combobox from './Combobox.svelte';
  import ComboboxTriggerInput from './ComboboxTriggerInput.svelte';
  import ComboboxContent from './ComboboxContent.svelte';
  import ComboboxList from './ComboboxList.svelte';
  import ComboboxItem from './ComboboxItem.svelte';

  interface Props {
    value?: unknown;
    items?: string[];
    onValueChange?: (value: unknown) => void;
  }

  let { value = $bindable(null), items = ['Apple', 'Banana', 'Cherry'], onValueChange }: Props = $props();
</script>

<Combobox bind:value {items} {onValueChange}>
  <ComboboxTriggerInput placeholder="Select fruit" />
  <ComboboxContent>
    <ComboboxList>
      {#snippet children(item)}
        <ComboboxItem value={item}>{item}</ComboboxItem>
      {/snippet}
    </ComboboxList>
  </ComboboxContent>
</Combobox>
