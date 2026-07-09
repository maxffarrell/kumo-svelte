<script lang="ts">
  import { Autocomplete } from 'kumo-svelte/components/autocomplete';

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
</script>

<div class="flex flex-wrap items-center gap-4">
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="xs" placeholder="xs" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="sm" placeholder="sm" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="base" placeholder="base (default)" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
  <Autocomplete items={fruits.slice(0, 10)}>
    <Autocomplete.InputGroup size="lg" placeholder="lg" />
    <Autocomplete.Content>
      <Autocomplete.List>
        {#snippet children(item)}
          <Autocomplete.Item value={item}>{item}</Autocomplete.Item>
        {/snippet}
      </Autocomplete.List>
    </Autocomplete.Content>
  </Autocomplete>
</div>
