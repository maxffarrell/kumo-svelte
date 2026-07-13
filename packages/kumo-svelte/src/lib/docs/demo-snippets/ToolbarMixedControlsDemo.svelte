<script lang="ts">
  import FunnelSimple from 'phosphor-svelte/lib/FunnelSimple';
  import Gear from 'phosphor-svelte/lib/Gear';
  import { Toolbar } from 'kumo-svelte/components/toolbar';
</script>

<Toolbar class="w-full max-w-md">
  <Toolbar.Input aria-label="Search DNS records" placeholder="Search DNS records" class="flex-1" />
  <Toolbar.Button icon={FunnelSimple} aria-label="Filter" />
  <Toolbar.Button icon={Gear} aria-label="Settings" />
</Toolbar>
