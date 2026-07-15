<script lang="ts">
  import { Autocomplete } from './index';

  interface Props {
    items?: { label: string; value: string }[];
    value?: string;
    error?: string;
    onValueChange?: (value: unknown) => void;
  }

  let {
    items = [],
    value = $bindable(''),
    error,
    onValueChange
  }: Props = $props();
</script>

<Autocomplete bind:value {items} {error} {onValueChange} class="w-[220px]">
  <Autocomplete.InputGroup placeholder="Search countries…" />
  <Autocomplete.Content>
    <Autocomplete.List>
      {#snippet children(item)}
        <Autocomplete.Item value={item}>{item.label}</Autocomplete.Item>
      {/snippet}
    </Autocomplete.List>
  </Autocomplete.Content>
</Autocomplete>
