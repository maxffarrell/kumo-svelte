<script lang="ts">
  import { Combobox } from './index';

  interface Props {
    items?: string[];
    value?: string | null;
    disabled?: boolean;
    error?: string;
    onValueChange?: (value: unknown) => void;
  }

  let {
    items = [],
    value = $bindable(null),
    disabled = false,
    error,
    onValueChange
  }: Props = $props();
</script>

<Combobox bind:value {items} {disabled} {error} {onValueChange} class="w-[220px]">
  <Combobox.TriggerInput placeholder="Pick a fruit…" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
