<script lang="ts">
  import { Combobox } from 'kumo-svelte';

  const servers = [
    { value: 'Asia', items: [{ label: 'Japan', value: 'japan' }, { label: 'Singapore', value: 'singapore' }] },
    { value: 'Europe', items: [{ label: 'Germany', value: 'germany' }, { label: 'France', value: 'france' }] }
  ];
</script>

<Combobox items={servers}>
  <Combobox.TriggerInput class="w-[200px]" placeholder="Select server" />
  <Combobox.Content>
    <Combobox.Empty />
    <Combobox.List>
      {#snippet children(group: any)}
        <Combobox.Group items={group.items}>
          <Combobox.GroupLabel>{group.value}</Combobox.GroupLabel>
          <Combobox.Collection>
            {#snippet children(item: any)}
              <Combobox.Item value={item}>{item.label}</Combobox.Item>
            {/snippet}
          </Combobox.Collection>
        </Combobox.Group>
      {/snippet}
    </Combobox.List>
  </Combobox.Content>
</Combobox>
