<script lang="ts">
  import { FunnelSimple, Gear, MagnifyingGlass } from 'phosphor-svelte';
  import { InputGroup, Toolbar } from 'kumo-svelte';
</script>

<Toolbar class="w-full max-w-md">
  <Toolbar.InputGroup aria-label="Search DNS records" class="flex-1">
    <InputGroup.Addon>
      <MagnifyingGlass />
    </InputGroup.Addon>
    <InputGroup.Input placeholder="Search DNS records" />
  </Toolbar.InputGroup>
  <Toolbar.Button icon={FunnelSimple} aria-label="Filter" />
  <Toolbar.Button icon={Gear} aria-label="Settings" />
</Toolbar>
