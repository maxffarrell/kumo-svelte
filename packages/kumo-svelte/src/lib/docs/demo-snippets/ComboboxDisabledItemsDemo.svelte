<script lang="ts">
  import { Combobox, Text } from 'kumo-svelte';

  const items = [
    { value: 'postgres', label: 'PostgreSQL' },
    { value: 'mysql', label: 'MySQL' },
    { value: 'mariadb', label: 'MariaDB', disabled: true, reason: 'Beta' },
    { value: 'mongodb', label: 'MongoDB' },
    { value: 'cassandra', label: 'Apache Cassandra', disabled: true, reason: 'Coming soon' }
  ];
</script>

<div class="w-80">
  <Combobox items={items}>
    <Combobox.TriggerInput placeholder="Select database" />
    <Combobox.Content>
      <Combobox.Empty />
      <Combobox.List>
        {#snippet children(item: any)}
          <Combobox.Item value={item} disabled={item.disabled}>
            <span>
              {item.label}
              {#if item.reason}
                <Text variant="secondary" size="xs" as="span"> - {item.reason}</Text>
              {/if}
            </span>
          </Combobox.Item>
        {/snippet}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
</div>
