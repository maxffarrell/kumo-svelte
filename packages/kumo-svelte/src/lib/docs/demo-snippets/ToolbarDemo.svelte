<script lang="ts">
  import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';
  import Gear from 'phosphor-svelte/lib/Gear';
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import { InputGroup } from 'kumo-svelte/components/input-group';
  import { Toolbar } from 'kumo-svelte/components/toolbar';
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
