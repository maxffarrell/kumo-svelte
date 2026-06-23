<script lang="ts">
  import { MagnifyingGlass } from 'phosphor-svelte';
  import { Toolbar } from 'kumo-svelte';
</script>

<Toolbar class="w-full max-w-lg">
  <Toolbar.Input aria-label="Search records" class="flex-1" placeholder="Search" />
  <Toolbar.Button icon={MagnifyingGlass} aria-label="Search" />
</Toolbar>
