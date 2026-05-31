<script lang="ts">
  import { Autocomplete } from 'kumo-svelte';

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

  let value = $state('');
</script>

<div class="flex w-80 flex-col gap-3">
  <Autocomplete bind:value items={fruits}>
    <Autocomplete.InputGroup placeholder="Type a fruit…" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item: any)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  {#if value}
    <p class="text-sm text-kumo-subtle">
      Value: <span class="font-medium text-kumo-default">{value}</span>
    </p>
  {/if}
</div>
