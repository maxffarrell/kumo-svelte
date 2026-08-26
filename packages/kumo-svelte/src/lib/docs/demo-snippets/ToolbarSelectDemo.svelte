<script lang="ts">
  import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';
  import GearSix from 'phosphor-svelte/lib/GearSix';
  import { Select } from 'kumo-svelte/components/select';
  import { Toolbar } from 'kumo-svelte/components/toolbar';
</script>

<Toolbar>
  <Toolbar.Button icon={FunnelSimple}>Filter</Toolbar.Button>
  <Select
    aria-label="Sort records"
    value="name"
    items={{ name: 'Name', created: 'Created date', status: 'Status' }}
  >
    {#snippet trigger({ props, value })}
      <Toolbar.Button {...props}>{value}</Toolbar.Button>
    {/snippet}
  </Select>
  <Toolbar.Button icon={GearSix} aria-label="View settings" />
</Toolbar>
