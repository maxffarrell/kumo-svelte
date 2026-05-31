<script lang="ts">
  import { Button, Combobox, Text } from 'kumo-svelte';

  const bots = [
    { value: 'googlebot', label: 'Googlebot', author: 'Google' },
    { value: 'bingbot', label: 'Bingbot', author: 'Microsoft' }
  ];

  let value = $state<any[]>([]);
</script>

<div class="flex gap-2">
  <Combobox bind:value items={bots} multiple>
    <Combobox.TriggerMultipleWithInput class="w-[400px]" placeholder="Select bots">
      {#snippet children(selected: any)}
        <Combobox.Chip value={selected}>{selected.label}</Combobox.Chip>
      {/snippet}
    </Combobox.TriggerMultipleWithInput>
    <Combobox.Content class="max-h-[200px] min-w-auto overflow-y-auto">
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item: any)}
          <Combobox.Item value={item}>
            <div class="flex gap-2">
              <Text>{item.label}</Text>
              <Text variant="secondary">{item.author}</Text>
            </div>
          </Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
  <Button variant="primary">Submit</Button>
</div>
