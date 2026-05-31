<script lang="ts">
  import { Combobox } from 'kumo-svelte';
  import { MagnifyingGlass } from 'phosphor-svelte';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' }
  ];

  let value = $state(languages[0]);
</script>

<Combobox bind:value items={languages}>
  <Combobox.Trigger class="rounded-md px-2 py-1 text-sm hover:bg-kumo-fill-hover">
    <Combobox.Value>
      <span class="truncate">{value.emoji} {value.label}</span>
    </Combobox.Value>
    <MagnifyingGlass class="size-3.5 shrink-0 text-kumo-subtle" />
  </Combobox.Trigger>
  <Combobox.Content>
    <Combobox.Input placeholder="Search languages" />
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item: any)}
        <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
