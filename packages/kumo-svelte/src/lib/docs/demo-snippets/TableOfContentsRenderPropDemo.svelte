<script lang="ts">
  import { TableOfContents } from 'kumo-svelte/components/table-of-contents';

  let clicked = $state<string | null>(null);
</script>

<div class="min-w-48 space-y-3">
  <TableOfContents>
    <TableOfContents.List>
      {#each ['Introduction', 'Installation', 'Usage'] as heading (heading)}
        <TableOfContents.Item
          as="button"
          type="button"
          active={heading === 'Introduction'}
          onclick={() => (clicked = heading)}
        >
          {heading}
        </TableOfContents.Item>
      {/each}
    </TableOfContents.List>
  </TableOfContents>
  {#if clicked}
    <p class="text-xs text-kumo-subtle">Clicked: {clicked}</p>
  {/if}
</div>
