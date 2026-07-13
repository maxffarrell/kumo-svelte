<script lang="ts">
  import MagnifyingGlass from 'phosphor-svelte/lib/MagnifyingGlass';
  import { Toolbar } from 'kumo-svelte/components/toolbar';
</script>

<Toolbar class="w-full max-w-lg">
  <Toolbar.Input aria-label="Search records" class="flex-1" placeholder="Search" />
  <Toolbar.Button icon={MagnifyingGlass} aria-label="Search" />
</Toolbar>
