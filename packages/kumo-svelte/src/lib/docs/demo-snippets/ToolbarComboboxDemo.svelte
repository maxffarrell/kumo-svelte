<script lang="ts">
  import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';
  import { Combobox } from 'kumo-svelte/components/combobox';
  import { Toolbar } from 'kumo-svelte/components/toolbar';

  const items = ['All records', 'Active', 'Paused', 'Failed'];
</script>

<Toolbar class="w-full max-w-md">
  <Toolbar.Button icon={FunnelSimple}>Status</Toolbar.Button>
  <Combobox {items}>
    <Combobox.TriggerInput aria-label="Filter status" class="flex-1" placeholder="Filter status…">
      {#snippet child({ props })}
        <Toolbar.Input {...props} />
      {/snippet}
    </Combobox.TriggerInput>
    <Combobox.Content>
      <Combobox.List>
        {#snippet children(item)}
          <Combobox.Item value={item}>{item}</Combobox.Item>
        {/snippet}
      </Combobox.List>
      <Combobox.Empty>No matching statuses.</Combobox.Empty>
    </Combobox.Content>
  </Combobox>
</Toolbar>
