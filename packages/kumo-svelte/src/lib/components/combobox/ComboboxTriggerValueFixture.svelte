<script lang="ts">
  import { Combobox } from './index';

  interface Props {
    items?: string[];
    value?: string | null;
    disabled?: boolean;
  }

  let { items = [], value = null, disabled = false }: Props = $props();
</script>

<Combobox {value} {items} {disabled} class="w-[220px]">
  <Combobox.TriggerValue placeholder="Select a fruit…" />
  <Combobox.Content>
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
