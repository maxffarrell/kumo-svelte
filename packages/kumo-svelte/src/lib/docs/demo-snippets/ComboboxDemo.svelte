<script lang="ts">
  import { Combobox } from 'kumo-svelte/components/combobox';

  const fruits = [
  'Apple',
  'Apricot',
  'Avocado',
  'Banana',
  'Blackberry',
  'Blueberry',
  'Cantaloupe',
  'Cherry',
  'Coconut',
  'Cranberry',
  'Date',
  'Dragon Fruit',
  'Fig',
  'Grape',
  'Grapefruit',
  'Guava',
  'Honeydew',
  'Kiwi',
  'Lemon',
  'Lime',
  'Lychee',
  'Mango',
  'Nectarine',
  'Orange',
  'Papaya',
  'Passion Fruit',
  'Peach',
  'Pear',
  'Pineapple',
  'Plum',
  'Raspberry',
  'Strawberry',
  'Watermelon'
];

  let value = $state<string | null>('Apple');
</script>

<Combobox bind:value items={fruits}>
  <Combobox.TriggerInput placeholder="Please select" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
