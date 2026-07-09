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

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' }
  ];
</script>

<div class="flex flex-wrap items-start gap-4">
  <Combobox value="Apple" items={fruits} disabled>
    <Combobox.TriggerInput class="w-[200px]" placeholder="Select fruit" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>

  <Combobox value={languages[0]} items={languages} disabled>
    <Combobox.TriggerValue class="w-[200px]" />
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>
