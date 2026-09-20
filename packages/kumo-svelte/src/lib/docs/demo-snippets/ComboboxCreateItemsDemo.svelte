<script lang="ts">
  import { Combobox } from 'kumo-svelte/components/combobox';

  type Fruit = { id: string; label: string };
  const fruits = Combobox.createItems<Fruit>(
    [
      { id: 'apple', label: 'Apple' },
      { id: 'banana', label: 'Banana' }
    ],
    { getValue: (fruit) => fruit.id, getLabel: (fruit) => fruit.label }
  );
  let value = $state<Fruit | null>(null);
</script>

<Combobox items={fruits} bind:value>
  <Combobox.TriggerInput placeholder="Select a fruit" />
  <Combobox.Content>
    <Combobox.List>
      {#snippet children(fruit)}
        <Combobox.Item value={fruit}>{fruit.label}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
