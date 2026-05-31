<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' }
  ];
</script>

<div class="flex flex-wrap items-center gap-4">
  <Combobox size="sm" value={languages[0]} items={languages}>
    <Combobox.TriggerValue class="w-[160px]" />
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item: any)}
          <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
  <Combobox size="base" value={languages[1]} items={languages}>
    <Combobox.TriggerValue class="w-[180px]" />
    <Combobox.Content>
      <Combobox.Input placeholder="Search" />
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item: any)}
          <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>
