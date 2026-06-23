<script lang="ts">
  import { Toolbar } from 'kumo-svelte';

  const sizes = ['xs', 'sm', 'base', 'lg'] as const;
</script>

<div class="grid gap-3">
  {#each sizes as size}
    <div class="flex items-center gap-3">
      <span class="w-10 text-sm text-kumo-subtle">{size}</span>
      <Toolbar {size} class="w-fit">
        <Toolbar.Input aria-label={`${size} search`} placeholder="Search..." />
        <Toolbar.Button>Apply</Toolbar.Button>
      </Toolbar>
    </div>
  {/each}
</div>
