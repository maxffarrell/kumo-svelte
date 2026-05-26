<script lang="ts">
  import { Button, Combobox, Empty, Input, Select, Text } from '$lib';
  import { Database, MagnifyingGlass as Search } from 'phosphor-svelte';

  let comboboxValue = $state<any>('Apple');

  let comboboxLanguage = $state<any>({ value: 'en', label: 'English', emoji: 'GB' });

  let comboboxNullable = $state<any>(null);

  let comboboxMultiple = $state<any[]>([]);

  const comboboxFruits = [
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

<div class="flex min-h-24 w-full items-center justify-center">

      <Combobox bind:value={comboboxValue} items={comboboxFruits}>
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
    
</div>
