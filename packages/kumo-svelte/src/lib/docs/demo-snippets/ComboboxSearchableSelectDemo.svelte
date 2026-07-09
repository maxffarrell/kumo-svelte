<script lang="ts">
  import { Combobox } from 'kumo-svelte/components/combobox';

  const languages = [
    { value: 'en', label: 'English', emoji: 'GB' },
    { value: 'fr', label: 'French', emoji: 'FR' },
    { value: 'de', label: 'German', emoji: 'DE' },
    { value: 'es', label: 'Spanish', emoji: 'ES' }
  ];

  let value = $state<any>(null);
</script>

<Combobox bind:value items={languages}>
  <Combobox.TriggerValue class="w-[200px]" placeholder="Select a language" />
  <Combobox.Content>
    <Combobox.Input placeholder="Search languages" />
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(item)}
        <Combobox.Item value={item}>{item.emoji} {item.label}</Combobox.Item>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
