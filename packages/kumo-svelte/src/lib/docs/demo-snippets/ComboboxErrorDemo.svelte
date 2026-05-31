<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const databases = [
    { value: 'postgres', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'redis', label: 'Redis' }
  ];
</script>

<div class="w-80">
  <Combobox
    items={databases}
    label="Database"
    error={{ message: "Please select a database", match: true }}
  >
    <Combobox.TriggerInput placeholder="Select database" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item: any)}
          <Combobox.Item value={item}>{item.label}</Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>
